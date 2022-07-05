import { Layout } from '../components/layouts'
import {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/AuthContext';
import { useSession } from 'next-auth/react'
import { instance } from '../api'
import { newSubmission } from '../components/routes/routes';
import Link from 'next/link';
import { Pending, InProgress, Ready } from '../components/tags';
import { useRouter } from 'next/router'

export interface iSubmission {
    id: number, 
    patient: iPatient,
    prescriptions: string,
    state: string,
    symptoms: string, 
    doctor?: iDoctor,
}

export interface iPatient {
    id: number, 
    email: string, 
    name: string, 
    role: string,
    patientInformation: iPatientInformation,
}

export interface iPatientInformation {
    id: number,
    birth: string,
    diseases: string,
    gender: "male" | "female",
    height: number, 
    previous_treatments: string,
    weight: number,
}

export interface iDoctor {
    id: number, 
    email: string, 
    name: string, 
    role: string,
    doctorInformation: iDoctorInformation,
}

export interface iDoctorInformation {
    id: number,
    grade: number,
    speciality: string,
}

const HomePage = () => {
    const { user, isLoggedIn, token, logout, id, name, email_verified_at } = useContext(  AuthContext );
    const router = useRouter();
    const [filter, setFilter] = useState("");
    const [submissionsMade, setSubmissionsMade] = useState<iSubmission[]>([]);
    const [sendMessage, setSendMessage] = useState('');

    const array = {"pending": <Pending/>, 'inProgress': <InProgress/>, 'ready': <Ready/>};
    // i have to get all the submissions made by this patient and render them in a table
    useEffect(() => {

        if (isLoggedIn){
            // console.log(`state: ${filter}`)
            const submissionsMade = instance.get(`/submission/?state=${filter}`, {
            headers: {
                    'Authorization': `Bearer ${token}`
            }
            }).then(
                (response) => {
                    // console.log("Submissions:", response.data.data);
                    setSubmissionsMade(response.data.data)
                }
            ).catch(
                (error) => {
                }
            )
        }
    },[isLoggedIn, filter])

    if (! isLoggedIn){
        return (<Layout/>);
    }

    const resendEmail = () => {
        console.log("resending");
        instance.post(`/email/verification-notification`,{} ,{
            headers: {
                    'Authorization': `Bearer ${token}`
            }
            }).then(
                (response) => {
                    console.log(response);
                    setSendMessage(response.data.message);
                }
            ).catch(
                (error) => {
                }
            )
    }

    if (!email_verified_at){
        // esto en realidad deberia ser un componente asi lo puedo poner en todas las paginas sin copiar el codigo
        return (
        <Layout>
            <div className='w-full flex justify-center pt-10'>
                <div className='w-11/12'>
                    <h4>
                        You must verify your email prior to start using this app.
                    </h4>
                    { sendMessage.length > 0 &&
                    <div>
                        <h5 className='text-green-700'> {sendMessage} </h5>
                        <p> You must verify your email and then log in again to access all the features.</p> 
                    </div>}
                    <button className='bg-green-100 text-green-800 w-50 h-14 rounded-full px-4' onClick={resendEmail}> Resend email</button>
                </div>
            </div>
        </Layout>);
    }

    const handleFilterChange = (event:any) => {
        // console.log(event.target.value);
        if (event.target.value == "allSubmissions"){
            setFilter("");
        } else {
            setFilter(event.target.value);
        }
        // console.log(filter);
    }

    return (
        <Layout>
            <div className='w-full flex mt-2 justify-end pr-5'>
                <div className='mb-2 pl-2 pr-2 border-2 h-10 border-slate-300 rounded-lg flex justify-center items-center'>
                    <label>
                        Filter by state:     
                        <select className="" value={filter} onChange={(event) => handleFilterChange(event)}>
                            <option value="allSubmissions">All submissions</option>
                            <option value="pending">Pending</option>
                            <option value="inProgress">In progress</option>
                            <option value="ready">Ready</option>
                        </select>
                    </label>
                </div>
            </div>
            { router.query.delete == "yes" && 
                <h4 className=' pl-16 text-green-500'> Submission deleted succesfully! </h4> 
            }
            <div className="w-full flex justify-center">
                <table className='table-auto border-2 h-10 border-slate-100 rounded-2xl w-11/12 '>
                    <thead>
                        <tr className='bg-gray-50'>
                            <th scope="col" className='text-left pl-3'>Submission ID</th>
                            <th scope="col" className='text-left pl-3'>Doctor assigned</th>
                            <th scope="col" className='text-left pl-3'>Status</th>
                            <th scope="col" className='text-left pl-3'>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* {submission.state.replace( /([A-Z])/g, " $1" ).charAt(0).toUpperCase() + submission.state.replace( /([A-Z])/g, " $1" ).slice(1)} */}
                        {submissionsMade.map((submission) => {
                            return (
                                <tr key={submission.id} className="odd:bg-white even:bg-gray-50 h-10">
                                    <td className='pl-3'>{submission.id}</td>
                                    { submission.doctor ? <td className='pl-3'>{submission.doctor.name}</td> : <td></td>}
                                    {/* @ts-ignore */}
                                    <td>{array[submission.state]}</td>
                                    <td className='pl-3'><Link href={'/submission/'+submission.id} passHref><a className="text-blue-500 hover:text-blue-800">View more</a></Link></td>
                                </tr>);
                            }
                        )}
                    </tbody>
                </table>
            </div>
            
        </Layout>
    )
}

export default HomePage
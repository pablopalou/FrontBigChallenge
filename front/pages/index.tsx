import { Layout } from '../components/layouts'
import {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/AuthContext';
import { useSession } from 'next-auth/react'
import { instance } from '../api'
import { newSubmission } from '../components/routes/routes';
import Link from 'next/link';
import { AnyTag } from '../components/tags';
import { useRouter } from 'next/router'
import { NotVerfiedEmail } from '../components/email/NotVerified';
import { NotSubmissions } from '../components/submission/NotSubmissions'

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

    // i have to get all the submissions made by this patient and render them in a table
    useEffect(() => {

        if (isLoggedIn && email_verified_at){
            instance.get(`/submission/?state=${filter}`, {
                headers: {
                        'Authorization': `Bearer ${token}`
                }
                }).then(
                    (response) => {
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


    if (!email_verified_at){
        return (
            <NotVerfiedEmail token={token}></NotVerfiedEmail>
        );
    }

    // if (submissionsMade.length == 0){
    //     return (
    //         <NotSubmissions></NotSubmissions>
    //     )
    // }

    const handleFilterChange = (event:any) => {
        if (event.target.value == "allSubmissions"){
            setFilter("");
        } else {
            setFilter(event.target.value);
        }
    }

    return (
        <Layout>
            <div className='ml-14 pt-4'>
                {submissionsMade.length == 0 && 
                    <h4>
                        There are no submissions to show in this section. 
                    </h4>
                }
            </div>
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
                                    <td>{<AnyTag status={submission?.state}></AnyTag>}</td>
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
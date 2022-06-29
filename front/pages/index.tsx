import { Layout } from '../components/layouts'
import {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/AuthContext';
import { useSession } from 'next-auth/react'
import { instance } from '../api'
import { newSubmission } from '../components/routes/routes';
import Link from 'next/link';

interface iSubmission {
    id: number, 
    patient: Object,
    prescriptions: File,
    state: string,
    symptoms: string, 
    doctor?: Object,
}

const HomePage = () => {
    const { user, isLoggedIn, token, logout, id, name } = useContext(  AuthContext );
    const [filter, setFilter] = useState("");
    const [submissionsMade, setSubmissionsMade] = useState<iSubmission[]>([]);

    // i have to get all the submissions made by this patient and render them in a table
    useEffect(() => {

        if (isLoggedIn){
            const submissionsMade = instance.get('/submission', {
            params: {
                role: "patient", filter:{filter}
            }, 
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
    },[isLoggedIn])

    if (! isLoggedIn){
        return (<Layout/>);
    }
    return (
        <Layout>
            <div className='w-full flex mt-2 justify-end pr-5'>
                <div className='mb-2 pl-2 pr-2 border-2 h-10 border-slate-300 rounded-lg flex justify-center items-center'>
                    <label>
                        Filter by state:     
                        <select className="" value={filter} onChange={(event) => (setFilter(event.target.value))}>
                            <option value="pending">Pending</option>
                            <option value="inProgress">In progress</option>
                            <option value="ready">Ready</option>
                        </select>
                    </label>
                </div>
            </div>
            <div className="w-full flex justify-center">
                <table className='table-auto border-2 h-10 border-slate-100 rounded-2xl w-11/12 '>
                    <thead>
                        <tr className='bg-gray-50'>
                            <th scope="col">Submission ID</th>
                            <th scope="col">Doctor assigned</th>
                            <th scope="col">Status</th>
                            <th scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {submissionsMade.map((submission) => {
                            return (
                                <tr key={submission.id} className="odd:bg-white even:bg-gray-50">
                                    <td className='pl-3'>{submission.id}</td>
                                    { submission.doctor ? <td className='pl-3'>submission.doctor.name</td> : <td></td>}
                                    <td className='pl-3'>{submission.state.replace( /([A-Z])/g, " $1" ).charAt(0).toUpperCase() + submission.state.replace( /([A-Z])/g, " $1" ).slice(1)}</td>
                                    <td className='pl-3'><Link href='/submission/${submission.id}' passHref><a className="text-blue-500 hover:text-blue-800">View more</a></Link></td>
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
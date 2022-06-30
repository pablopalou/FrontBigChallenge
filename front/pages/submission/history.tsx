import { Layout } from '../../components/layouts'
import {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useSession } from 'next-auth/react'
import { instance } from '../../api'
import { newSubmission } from '../../components/routes/routes';
import Link from 'next/link';
import { Pending, InProgress, Ready } from '../../components/tags';
import { iSubmission } from '../index';
import SubmissionAPI from '../../utils/Services/SubmissionAPI';

const TaskHistoryPage = () => {
    // Page of all the submissions taken by the doctor

    const { user, isLoggedIn, token, logout, id, name } = useContext(  AuthContext );
    const [filter, setFilter] = useState("");
    const [submissionsTaken, setSubmissionsTaken] = useState<iSubmission[]>([]);
    
    const array = {"pending": <Pending/>, 'inProgress': <InProgress/>, 'ready': <Ready/>};
    // i have to get all the submissions Taken by this patient and render them in a table
    
    const api = new SubmissionAPI();
    

    useEffect(() => {
        if (isLoggedIn){
            console.log(`state: ${filter}`);
            api.getSubmissionsTaken({filter,token}).then(
                (response) => {
                    console.log("Submissions:", response);
                    setSubmissionsTaken(response.data.data)
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

    const handleFilterChange = (event:any) => {
        if (event.target.value == "allSubmissions"){
            setFilter("");
        } else {
            setFilter(event.target.value);
        }
    }

    return (
        <Layout>
            <div className='w-full flex mt-2 justify-end pr-5'>
                <div className='mb-2 pl-2 pr-2 border-2 h-10 border-slate-300 rounded-lg flex justify-center items-center'>
                    <label>
                        Filter by state:     
                        <select className="" value={filter} onChange={(event) => handleFilterChange(event)}>
                            <option value="allSubmissions">All submissions</option>
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
                            <th scope="col" className='text-left pl-3'>Submission ID</th>
                            <th scope="col" className='text-left pl-3'>Patient Name</th>
                            <th scope="col" className='text-left pl-3'>Status</th>
                            <th scope="col" className='text-left pl-3'>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissionsTaken.map((submission) => {
                            return (
                                <tr key={submission.id} className="odd:bg-white even:bg-gray-50 h-10">
                                    <td className='pl-3'>{submission.id}</td>
                                    <td className='pl-3'>{submission.patient.name}</td>
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

export default TaskHistoryPage
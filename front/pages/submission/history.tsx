import { Layout } from '../../components/layouts'
import {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useSession } from 'next-auth/react'
import { instance } from '../../api'
import { newSubmission } from '../../components/routes/routes';
import Link from 'next/link';
// import { Pending, InProgress, Ready } from '../../components/tags';
import { iSubmission } from '../index';
import SubmissionAPI from '../../utils/Services/SubmissionAPI';
import { Table } from '../../components/Table';
import { NotVerfiedEmail } from '../../components/email/NotVerified';
import { NotSubmissions } from '../../components/submission/NotSubmissions';

const TaskHistoryPage = () => {
    // Page of all the submissions taken by the doctor

    const { user, isLoggedIn, token, logout, id, name, role, email_verified_at } = useContext(  AuthContext );
    const [filter, setFilter] = useState("");
    const [submissionsTaken, setSubmissionsTaken] = useState<iSubmission[]>([]);
    
    // i have to get all the submissions Taken by this patient and render them in a table
    
    const api = new SubmissionAPI();

    useEffect(() => {
        if (isLoggedIn && email_verified_at) {
            console.log(`state: ${filter}`);
            let all=""
            api.getSubmissions({filter,token, all}).then(
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

    if (! isLoggedIn || role != "doctor"){
        return (<Layout>
                    <div className="flex justify-center w-full pt-10">
                        <div className=" justify-center w-11/12 bg-red-100 text-red-800">
                            You are not authorized to access this view.
                        </div>
                    </div>
                </Layout>);
    }

    if (!email_verified_at){
        return (
            <NotVerfiedEmail token={token}></NotVerfiedEmail>
        );
    }

    if (submissionsTaken.length == 0){
        return (
            <NotSubmissions></NotSubmissions>
        )
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
            <div className="w-full flex justify-center pb-8">
                <Table submissions={submissionsTaken}></Table>
            </div>
            
        </Layout>
    )
}

export default TaskHistoryPage
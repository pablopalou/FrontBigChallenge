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
import { Table } from '../../components/Table';

const AllPendingPage = () => {
    // Page of all the submissions pending

    const { user, isLoggedIn, token, logout, id, name } = useContext(  AuthContext );
    const [filter, setFilter] = useState("");
    const [submissions, setSubmissions] = useState<iSubmission[]>([]);
    
    const array = {"pending": <Pending/>, 'inProgress': <InProgress/>, 'ready': <Ready/>};
    
    const api = new SubmissionAPI();

    useEffect(() => {
        if (isLoggedIn){
            let all="yes";
            let filter="";
            api.getSubmissions({filter,token, all}).then(
                (response) => {
                    console.log("Submissions:", response);
                    setSubmissions(response.data.data)
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
            <div className="w-full flex justify-center mt-10 pb-8">
                <Table submissions={submissions}></Table>
            </div>
        </Layout>
    )
}

export default AllPendingPage
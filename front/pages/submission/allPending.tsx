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
import * as routes from '../../components/routes'
import {useRouter} from "next/router"

const AllPendingPage = () => {
    // Page of all the submissions pending

    const { user, isLoggedIn, token, logout, id, name } = useContext(  AuthContext );
    const [filter, setFilter] = useState("");
    const [submissions, setSubmissions] = useState<iSubmission[]>([]);
    const router = useRouter();
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

    const handleTake = (id:string) => {
        api.takeSubmission({id,token}).then(
            (response) => {
                console.log(response);
                router.push(routes.allSubmissions+'?take=yes');
                window.location.reload();
            }
        ).catch(
            (error) => {
                console.log("error",error)
            }
        )
    }

    return (
        <Layout>
            { router.query.take == "yes" && 
                <h4 className=' pl-16 text-green-500'> Submission taken successfully! </h4> 
            }
            <div className="w-full flex justify-center mt-10 pb-8">
                <Table submissions={submissions} column="Take" handleTake={handleTake}></Table>
            </div>
        </Layout>
    )
}

export default AllPendingPage
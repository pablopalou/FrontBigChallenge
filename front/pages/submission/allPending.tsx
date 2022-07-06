import { Layout } from '../../components/layouts'
import {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../../context/AuthContext';
import { iSubmission } from '../index';
import SubmissionAPI from '../../utils/Services/SubmissionAPI';
import { Table } from '../../components/Table';
import * as routes from '../../components/routes'
import {useRouter} from "next/router"
import { NotVerfiedEmail } from '../../components/email/NotVerified';
import { NotSubmissions } from '../../components/submission/NotSubmissions';

const AllPendingPage = () => {
    // Page of all the submissions pending

    const { user, isLoggedIn, token, logout, id, name, role, email_verified_at } = useContext(  AuthContext );
    const [filter, setFilter] = useState("");
    const [submissions, setSubmissions] = useState<iSubmission[]>([]);
    const router = useRouter();
    
    const api = new SubmissionAPI();

    useEffect(() => {
        if (isLoggedIn && email_verified_at){
            let all="yes";
            let filter="";
            api.getSubmissions({filter,token, all}).then(
                (response) => {
                    // console.log("Submissions:", response);
                    setSubmissions(response.data.data)
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

    if (submissions.length == 0){
        return (
            <NotSubmissions></NotSubmissions>
        )
    }

    const handleTake = (idSubmission:string) => {
        api.takeSubmission({idSubmission,token}).then(
            (response) => {
                // console.log(response);
                router.push(routes.allSubmissions+'?take=yes');
                window.location.reload();
            }
        ).catch(
            (error) => {
                // console.log("error",error)
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
import { Layout } from '../../components/layouts'
import {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useSession } from 'next-auth/react'
import { instance } from '../../api'
import { newSubmission } from '../../components/routes/routes';
import Link from 'next/link';
import { iSubmission } from '../index';
import { NextPage } from 'next';
import {useRouter} from "next/router"

const SubmissionDetailPage:NextPage = () => {
    const router = useRouter();
    const query = router.query;
    const id = router.query.id;
    const { user, isLoggedIn, token, logout, name } = useContext(  AuthContext );
    const [submission, setSubmission] = useState<iSubmission>();

    // i have to get all the information from the submission
    useEffect(() => {

        if (isLoggedIn){
            const submissionsMade = instance.get(`/submission/${id}`, {
            headers: {
                    'Authorization': `Bearer ${token}`
            }
            }).then(
                (response) => {
                    console.log("Submission:", response.data.data);
                    setSubmission(response.data.data)
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
            <div>
                <h1>Submission: {submission?.id}</h1>
            </div>
        </Layout>
    )
}

export default SubmissionDetailPage
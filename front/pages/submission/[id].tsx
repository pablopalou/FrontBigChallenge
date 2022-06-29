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
import { Pending, InProgress, Ready } from '../../components/tags';
import * as routes from '../../components/routes'

const SubmissionDetailPage:NextPage = () => {
    const router = useRouter();
    const query = router.query;
    const id = router.query.id;
    const { user, isLoggedIn, token, logout, name } = useContext(  AuthContext );
    const [submission, setSubmission] = useState<iSubmission>();
    const array = {"pending": <Pending/>, 'inProgress': <InProgress/>, 'ready': <Ready/>};
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
            <div className='w-full flex justify-center'>
                <div className='w-11/12 flex flex-col mt-10'>
                    <Link href={routes.home} passHref><a className="text-blue-500 hover:text-blue-800 mb-8"> <img src="../icons/backarrow.svg" alt="" /></a></Link>
                    {/* div for id, status and doctor*/}
                    <div className='flex flex-col mb-4 border-b-2 pb-4'>
                        <div className='flex items-center mb-2'>
                            <h4 className='mr-4 mb-0'>Submission: {submission?.id}</h4>
                            {/* @ts-ignore */}
                            <div>{array[submission?.state]}</div>
                        </div>
                        {submission?.doctor ? <div>submission?.doctor?.name</div> : <div>A doctor will take this submission soon</div>}
                    </div>

                    {/* patient info */}
                    <div>

                    </div>

                    {/* symptoms */}
                    <div className='flex flex-col mb-4'>
                        <h5 className='mb-0'> Symptoms </h5>
                        <p> {submission?.symptoms}</p>
                    </div>
                    {/* prescriptions */}
                    <div className='flex flex-col w-full'>
                        <h5 className='mb-0'> Prescriptions </h5>
                        { submission?.prescriptions ? 
                            (<div className='bg-gray-50'> <p>submission?.prescriptions </p></div>) :
                            (<div className='bg-gray-50'>
                                No prescriptions have been added yet
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SubmissionDetailPage
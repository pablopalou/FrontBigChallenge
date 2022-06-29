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
            <div className='w-full flex justify-center pb-10'>
                <div className='w-11/12 flex flex-col mt-10'>
                    <Link href={routes.home} passHref><a className="text-blue-500 hover:text-blue-800 mb-8"> <img src="../icons/backarrow.svg" alt="" /></a></Link>
                    {/* div for id, status and doctor*/}
                    <div className='flex flex-col mb-4 border-b-2 pb-4'>
                        <div className='flex items-center mb-2'>
                            <h4 className='mr-4 mb-0'>Submission: {submission?.id}</h4>
                            {/* @ts-ignore */}
                            <div>{array[submission?.state]}</div>
                        </div>
                        {submission?.doctor ? <div>Assigned doctor: {submission?.doctor?.name}. Grade: {submission.doctor.doctorInformation.grade}. Speciality: {submission.doctor.doctorInformation.speciality}</div> : <div>A doctor will take this submission soon</div>}
                    </div>

                    {/* patient info */}
                    <div className='flex flex-col mb-4'>
                        <h5> Patient Information:</h5>
                        <div className='flex w-full'>
                            <p className='w-1/2'> Email </p>
                            <p className='w-1/2'> Name </p>
                        </div>
                        <div className='flex mb-3'>
                            <div className='w-1/2'> {submission?.patient.email} </div>
                            <div className='w-1/2'> {submission?.patient.name} </div>
                        </div>
                        <div className='flex w-full'>
                            <p className='w-1/2'> Birth </p>
                            <p className='w-1/2'> Gender </p>
                        </div>
                        <div className='flex mb-3'>
                            <div className='w-1/2'> {submission?.patient.patientInformation.birth} </div>
                            <div className='w-1/2'> {submission?.patient.patientInformation.gender} </div>
                        </div>
                        <div className='flex w-full'>
                            <p className='w-1/2'> Height </p>
                            <p className='w-1/2'> Weight </p>
                        </div>
                        <div className='flex mb-3'>
                            <div className='w-1/2'> {submission?.patient.patientInformation.height} </div>
                            <div className='w-1/2'> {submission?.patient.patientInformation.weight} </div>
                        </div>

                        <div className=' mb-3'>
                            <p> Diseases </p>
                            <div>{submission?.patient.patientInformation.diseases}</div>
                        </div>
                        <div>
                            <p> Previous treatments </p>
                            <div>{submission?.patient.patientInformation.previous_treatments}</div>
                        </div>
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
                            (<div className='bg-gray-200 py-3 flex pl-4'> <p>{submission?.prescriptions} </p></div>) :
                            (<div className='bg-gray-200 py-3 flex pl-4 '>
                                <img src="../icons/notavailable.svg" alt="" />
                                <p className='text-lg pl-3'>No prescriptions have been added yet</p>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SubmissionDetailPage
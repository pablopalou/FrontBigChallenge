import { Layout } from '../../../components/layouts'
import {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../../../context/AuthContext';
import { useSession } from 'next-auth/react'
import { instance } from '../../../api'
import Link from 'next/link';
import { iSubmission } from '../../index';
import { NextPage } from 'next';
import {useRouter} from "next/router"
import { AnyTag} from '../../../components/tags';
import * as routes from '../../../components/routes'
import { ShowInformation } from '../../../components/ShowInformation';
import { editSubmission } from '../../../components/routes/routes';
import SubmissionAPI from '../../../utils/Services/SubmissionAPI';
import { Loading } from '@nextui-org/react';

const SubmissionEditPage:NextPage = () => {
    const router = useRouter();
    const query = router.query;
    const id = router.query.id as string;
    const { user, isLoggedIn, token, logout, name } = useContext(  AuthContext );
    const [submission, setSubmission] = useState<iSubmission | undefined>();
    // const array = {"pending": <Pending/>, 'inProgress': <InProgress/>, 'ready': <Ready/>};
    const [symptoms, setSymptoms] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (isLoggedIn){
            instance.get(`/submission/${id}`, {
            headers: {
                    'Authorization': `Bearer ${token}`
            }
            }).then(
                (response) => {
                    setSubmission(response.data.data)
                    setSymptoms(response.data.data.symptoms)
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
    const api = new SubmissionAPI();

    const handleEditSymptoms = () => {
        api.editSymptoms({id, token, symptoms}).then(
            (response) => {
                console.log(response);
                setError(false);
                setErrorMessage('');
                setSuccessMessage(response.data.message);
                setLoading(false);
            }
        ).catch(
            (error)=> {
                console.log("error", error);
                setLoading(false);
                setError(true);
                setSuccessMessage('');
                setErrorMessage(error.response.data.message);
            }
        )
    }

    return (
        <Layout>
            <div className='w-full flex justify-center pb-10'>
                <div className='w-11/12 flex flex-col mt-10'>
                    {/* make link to go back to submission view and then input and button to confirm changes*/}
                    <Link href={routes.submission + `/${id}`} passHref><a className="text-blue-500 hover:text-blue-800 mb-8"> <img src="/icons/backarrow.svg" alt="" /></a></Link>
                    {/* div for id, status and doctor*/}
                    <div className='flex flex-col mb-4 border-b-2 pb-4'>
                        <div className='flex items-center mb-2'>
                            <h4 className='mr-4 mb-0'>Submission: {submission?.id}</h4>
                            <div>{<AnyTag status={submission?.state}></AnyTag>}</div>
                        </div>
                        {submission?.doctor ? <div>Assigned doctor: {submission?.doctor?.name}. Grade: {submission.doctor.doctorInformation.grade}. Speciality: {submission.doctor.doctorInformation.speciality}</div> : <div>A doctor will take this submission soon</div>}
                    </div>


                    {/* symptoms */}
                    <div className='flex w-1/2 flex-col mb-4'>
                        <label className='mb-3'>Edit your symptoms </label>
                        <textarea value={symptoms} className='border-2 border-slate-300 rounded-lg h-48 ' onChange={(event:any) => {setSymptoms(event.target.value); }}
                        name="previousTreatments" placeholder='' title='fd'
                        />
                    </div>
                    {!error && successMessage.length > 0 && <div className='mb-2'> <h4 className='text-green-500'> {successMessage} </h4> </div>}
                    {error && 
                        <div className='mb-2'>
                            <h4 className='text-red-500'>{errorMessage}</h4>
                        </div>
                    }
                    <button className='w-32 rounded-xl bg-blue-100 text-blue-800' onClick={handleEditSymptoms}>Save changes</button>
                    {loading && <Loading></Loading>}
                </div>
            </div>
        </Layout>
    )
}

export default SubmissionEditPage
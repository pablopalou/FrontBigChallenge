import { Layout } from '../../components/layouts'
import {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useSession } from 'next-auth/react'
import { instance } from '../../api'
import { newSubmission, createSubmission } from '../../components/routes/routes';
import Link from 'next/link';
import { iSubmission } from '../index';
import { NextPage } from 'next';
import {useRouter} from "next/router"
import { Pending, InProgress, Ready } from '../../components/tags';
import * as routes from '../../components/routes'
import { Loading } from '@nextui-org/react';

const NewSubmissionPage:NextPage = () => {
    const { user, isLoggedIn, token, logout, name } = useContext(  AuthContext );
    const [symptoms, setSymptoms] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    
    const headers = {'Authorization': `Bearer ${token}`}

    const createSubmission = async () => {
        setLoading(true);
        instance.post(routes.createSubmission, {symptoms}, {headers: headers}).then(
            (response)=> {
                setError(false);
                setErrorMessage('');
                setSuccess(true);
                setSuccessMessage(response.data.message);
                setLoading(false);
            }
        ).catch(
            (error)=> {
                setLoading(false);
                setError(true);
                setSuccess(false);
                setErrorMessage(error.response.data.message);
            }
        )
    }

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
                            <h4 className='mr-4 mb-0'>New Submission</h4>
                        </div>
                    </div>
                    <div className='flex w-1/2 flex-col mb-4'>
                        <label className='mb-3'>Symptoms </label>
                        <textarea className='border-2 border-slate-300 rounded-lg h-48 ' onChange={(event:any) => {setSymptoms(event.target.value); }}
                        name="previousTreatments" placeholder='' title='fd'
                        />
                    </div>
                    {success && <div className='mb-2'> <h4 className='text-green-500'> {successMessage} </h4> </div>}
                    {error && 
                        <div className='mb-2'>
                            <h4 className='text-red-500'>{errorMessage}</h4>
                        </div>
                    }
                    <button disabled={loading} title='signupButton' type="button" onClick={createSubmission} className="disabled:bg-white mt-5 h-10 rounded-xl bg-blue-500 text-white w-1/6 mb-8"> 
                        <p hidden={loading}>Send Submission</p>
                    </button>
                    {loading && <Loading></Loading>}
                </div>
            </div>
        </Layout>
    )
}

export default NewSubmissionPage
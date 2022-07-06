import Router from 'next/router'
import React, { ReactNode } from 'react'
import {Button} from '../Button'
import {useRouter} from 'next/router'
import * as routes from '../routes'
import {useContext} from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useSession } from 'next-auth/react'

export const AuthSideBar = () => {
    const router = useRouter();

    const { user, isLoggedIn, logout } = useContext(  AuthContext );

    const handleHome = () => {
        router.push(routes.home);
    }

    const handleTaskHistory = () => {
        router.push(routes.taskHistory);
    }

    const handleNewSubmission = () => {
        router.push(routes.newSubmission);
    }

    const handleAllSubmissions = () => {
        router.push(routes.allSubmissions);
    }

    let taskHistory = <></>
    let allSubmissions = <></>
    const session = useSession();
    if (session.data?.user?.role  == "doctor"){
        taskHistory = <Button handle={handleTaskHistory} text="Task History" route="taskhistory.svg" />
        allSubmissions = <Button handle={handleAllSubmissions} text="All Submissions" route="allsubmissions.svg"/>
    }

    const handleEditPersonalinformation = () => {
        router.push('/edit');
    }

    return (
        <>
            <Button handle={handleHome} text="Home" route="home.svg"/>
            <Button handle={handleNewSubmission} text="New Submission" route="newsubmission.svg"/>
            {allSubmissions}
            {taskHistory}
            { isLoggedIn && 
                <div className='bg-gray-700 flex w-full h-16 items-center content-end absolute inset-x-0 bottom-0'>
                    <div className="rounded-full bg-gray-400 h-10 w-10 ml-3 mr-3 flex justify-center items-center"> 
                        <div className='text-white text-xl'>{session.data?.user?.name.charAt(0)}</div>
                    </div>
                    <div className="flex flex-col">
                        <div className='text-white text-sm'> {session.data?.user?.name.split(' ').slice(0,2).join(' ')} </div>
                        <button type="button" onClick={handleEditPersonalinformation} className='text-zinc-300 text-xs text-left'> 
                            Edit my personal info
                        </button>
                        <button type="button" onClick={logout} className='text-zinc-300 text-xs text-left'> 
                            Sign out
                        </button>
                    </div>
                </div>
            }
        </>
    );
}
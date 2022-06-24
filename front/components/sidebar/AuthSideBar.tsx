import Router from 'next/router'
import React, { ReactNode } from 'react'
import {Button} from '../Button'
import {useRouter} from 'next/router'
import * as routes from '../routes'

export const AuthSideBar = () => {
    const router = useRouter();

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
    // if (doctor ){
    taskHistory = <Button handle={handleTaskHistory} text="Task History" route="taskhistory.svg" />
    allSubmissions = <Button handle={handleAllSubmissions} text="All Submissions" route="allsubmissions.svg"/>
    // }

    return (
        <>
            <Button handle={handleHome} text="Home" route="home.svg"/>
            <Button handle={handleNewSubmission} text="New Submission" route="newsubmission.svg"/>
            {allSubmissions}
            {taskHistory}
            <div className='bg-gray-700 flex w-full h-14 items-center content-end absolute inset-x-0 bottom-0'>
                <div className="rounded-full bg-gray-400 h-10 w-10 ml-3 mr-3"></div>
                <div className="flex flex-col">
                    <div className='text-white text-sm'> Name LastName</div>
                    <div className='text-zinc-300 text-xs'> Sign out</div>
                </div>
            </div>
        </>
    );
}
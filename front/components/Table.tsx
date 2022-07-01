import React, { ReactNode } from 'react'
import Link from 'next/link'
import { NextPage } from 'next'
import { Pending, InProgress, Ready } from './tags'
import { iSubmission } from '../pages'

interface Props {
    submissions: iSubmission[]
}

export const Table = ({submissions}:Props) => {
    const array = {"pending": <Pending/>, 'inProgress': <InProgress/>, 'ready': <Ready/>};

    return(
        <table className='table-auto border-2 h-10 border-slate-100 rounded-2xl w-11/12 '>
            <thead>
                <tr className='bg-gray-50'>
                    <th scope="col" className='text-left pl-3'>Submission ID</th>
                    <th scope="col" className='text-left pl-3'>Patient Name</th>
                    <th scope="col" className='text-left pl-3'>Status</th>
                    <th scope="col" className='text-left pl-3'>Details</th>
                </tr>
            </thead>
            <tbody>
                {submissions.map((submission) => {
                    return (
                        <tr key={submission.id} className="odd:bg-white even:bg-gray-50 h-10">
                            <td className='pl-3'>{submission.id}</td>
                            <td className='pl-3'>{submission.patient.name}</td>
                            {/* @ts-ignore */}
                            <td>{array[submission.state]}</td>
                            <td className='pl-3'><Link href={'/submission/'+submission.id} passHref><a className="text-blue-500 hover:text-blue-800">View more</a></Link></td>
                        </tr>);
                    }
                )}
            </tbody>
        </table>
        
    )
}
import React, { ReactNode } from 'react'
import Link from 'next/link'
import { NextPage } from 'next'
import { AnyTag } from './tags'
import { iSubmission } from '../pages'

interface Props {
    submissions: iSubmission[],
    column?: string,
    handleTake?: (id: string) => void,
}

export const Table = ({submissions, column, handleTake}:Props) => {

    return(
        <table className='table-auto border-2 h-10 border-slate-100 rounded-2xl w-11/12 '>
            <thead>
                <tr className='bg-gray-50'>
                    <th scope="col" className='text-left pl-3'>Submission ID</th>
                    <th scope="col" className='text-left pl-3'>Patient Name</th>
                    <th scope="col" className='text-left pl-3'>Status</th>
                    <th scope="col" className='text-left pl-3'>Details</th>
                    {column == "Take" && 
                        <th scope="col" className='text-left pl-3'>{column}</th>
                    }
                </tr>
            </thead>
            <tbody>
                {submissions.map((submission) => {
                    return (
                        <tr key={submission.id} className="odd:bg-white even:bg-gray-50 h-10">
                            <td className='pl-3'>{submission.id}</td>
                            <td className='pl-3'>{submission.patient.name}</td>
                            <td>{<AnyTag status={submission?.state}></AnyTag>}</td>
                            <td className='pl-3'><Link href={'/submission/'+submission.id} passHref><a className="text-blue-500 hover:text-blue-800">View more</a></Link></td>
                            {column == "Take" && submission && handleTake && 
                                <td className='pl-3'><button className='w-32 h-8 rounded-xl bg-green-100 text-green-800' onClick={() => handleTake(submission.id as unknown as string)}>Take</button></td>
                            }
                        </tr>);
                    }
                )}
            </tbody>
        </table>
        
    )
}
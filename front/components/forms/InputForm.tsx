import React, { ReactNode } from 'react'
import Link from 'next/link'
import { NextPage } from 'next'

interface Props {
    text: string,
    placeholder:string,
    value: string,
    handleChange: Function,
}

export const InputForm:NextPage<Props> = ({text, placeholder, value, handleChange }:Props) => {

    return(
        <>
            <label className="mb-2"> {text} </label>
            <input className="mb-4 border-2 h-10 border-slate-300 rounded-lg" type={text.toLowerCase()} value={value} placeholder={placeholder} onChange={(event) => handleChange(event)} required></input>
        </>
        
    )
}
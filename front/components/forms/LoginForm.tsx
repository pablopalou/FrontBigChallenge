import React, { ReactNode } from 'react'
import Link from 'next/link'
import { InputForm } from './InputForm'
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // @TODO: handle errors and loading
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleChangeEmail = (event:any) => {
        setEmail(event.target.value);
    }

    const handleChangePassword = (event:any) => {
        setPassword(event.target.value);
    }

    // how can i put the callbackUrl: 'http://localhost:3000'?
    const onLoginUser = async() => {
        await signIn('credentials',{ email, password });
    }

    return(
        <div className="w-full h-screen flex flex-col items-center mt-16">
            <h2> Welcome to the best healthcare app!</h2>
            <h5 className='text-gray-700'> Log in to access unique features</h5>
            <div className="flex flex-col w-3/12 mb-6">
                <InputForm value={email} text="Email" type="email" placeholder='mail@example.com' handleChange={handleChangeEmail}></InputForm>
                <InputForm value={password} text="Password" type="password" placeholder='*******' handleChange={handleChangePassword}></InputForm>
                
                <button type="button" onClick={onLoginUser} className="disabled:bg-white mt-5 h-10 rounded-xl bg-blue-500 text-white "> 
                    <p>Login</p>
                </button>
            </div>
            <p>
                Don't have an account yet?  
                <Link href="/register" passHref><a className="text-blue-500 hover:text-blue-800"> Sign up</a></Link>
            </p>
        </div>
    )
}
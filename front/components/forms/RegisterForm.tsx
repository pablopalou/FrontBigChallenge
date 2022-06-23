import React, { ReactNode } from 'react'
import Link from 'next/link'
import { InputForm } from './InputForm'
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChangeName = (event:any) => {setName(event.target.value);}
    const handleChangeEmail = (event:any) => {setEmail(event.target.value);}
    const handleChangePassword = (event:any) => {setPassword(event.target.value);}
    const handleChangePasswordConfirmation = (event:any) => {setPasswordConfirmation(event.target.value);}
    

    // how can i put the callbackUrl: 'http://localhost:3000'?
    const onRegisterUser = async() => {
        // await signIn('credentials',{ email, password });
    }

    return(
        <div className="w-full h-screen flex flex-col items-center mt-4">
            <h2> Welcome to the best healthcare app!</h2>
            <h5 className='text-gray-700'> Sign up to access unique features</h5>
            <div className="flex w-1/2 ">
                <div className='flex flex-col w-full'>
                    <InputForm value={name} text="Name" type="text" placeholder='' handleChange={handleChangeName} mr={true}></InputForm>
                    <InputForm value={password} text="Password" type="password" placeholder='*******' handleChange={handleChangePassword} mr={true}></InputForm>
                </div>
                <div className='flex flex-col w-full'>
                    <InputForm value={email} text="Email" type="email" placeholder='mail@example.com' handleChange={handleChangeEmail}></InputForm>
                    <InputForm value={passwordConfirmation} text="Password confirmation" type="password" placeholder='*******' handleChange={handleChangePasswordConfirmation}></InputForm>
                </div>
            </div>
            <div className='flex w-1/2 flex-col w-full mb-4'>
                <label className="mb-2"> Role </label>
                <div className='flex w-full'>
                    <div className='flex w-full border-2 h-10 border-slate-300 rounded-lg'>
                        <div className='w-1/2 flex items-center border-r-2 border-slate-300'>
                            <input className="ml-2 border-4 h-10 border-slate-300 rounded-lg mr-4 border-r-2" type="radio" value="patient" name="gender" placeholder='' title='fd'/> Patient
                        </div>
                        <div className='w-1/2 flex items-center'>
                            <input className="ml-2 border-2 h-10 border-slate-300 rounded-lg mr-4" type="radio" value="doctor" name="gender" placeholder='' title='dfs'/> Doctor 
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-1/2 ">
                <div className='flex flex-col w-full'>
                    <InputForm value={name} text="Name" type="text" placeholder='' handleChange={handleChangeName} mr={true}></InputForm>
                    <InputForm value={password} text="Password" type="password" placeholder='*******' handleChange={handleChangePassword} mr={true}></InputForm>
                </div>
                <div className='flex flex-col w-full'>
                    <InputForm value={email} text="Email" type="email" placeholder='mail@example.com' handleChange={handleChangeEmail}></InputForm>
                    <InputForm value={passwordConfirmation} text="Password confirmation" type="password" placeholder='*******' handleChange={handleChangePasswordConfirmation}></InputForm>
                </div>
            </div>
            <div>
                <label>Enter value : </label>
                <input type="textarea" 
                name="textValue" placeholder='' title='fd'
                />
            </div>
            <button type="button" onClick={onRegisterUser} className="disabled:bg-white mt-5 h-10 rounded-xl bg-blue-500 text-white w-1/2 mb-8"> 
                <p>Sign up</p>
            </button>
            <p>
                Already have an account yet?  
                <Link href="/login" passHref><a className="text-blue-500 hover:text-blue-800"> Log in</a></Link>
            </p>
        </div>
    )
}

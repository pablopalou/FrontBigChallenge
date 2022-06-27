import React, { ReactNode } from 'react'
import Link from 'next/link'
import { InputForm } from './InputForm'
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { instance } from '../../api';

export const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');

    const [gender, setGender] = useState('');
    const [role, setRole] = useState('');
    const [birth, setBirth] = useState('');
    const [diseases, setDiseases] = useState('');
    const [previousTreatments, setPreviousTreatments] = useState('');
    const [grade, setGrade] = useState(1);
    const [speciality, setSpeciality] = useState('general');
    // const [isDoctor, setIsDoctor] = useState(false);

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChangeName = (event:any) => {setName(event.target.value);}
    const handleChangeEmail = (event:any) => {setEmail(event.target.value);}
    const handleChangePassword = (event:any) => {setPassword(event.target.value);}
    const handleChangePasswordConfirmation = (event:any) => {setPasswordConfirmation(event.target.value);}
    const handleChangeHeight = (event:any) => {setHeight(event.target.value);}
    const handleChangeWeight = (event:any) => {setWeight(event.target.value);}

    const handleChangeGender = (event:any) => {console.log(event.target.value) ;setRole(event.target.value); console.log(gender);}
    const handleChangeRole = (event:any) => {
        console.log(event.target.value) ;
        setRole(event.target.value);
        console.log(role); 
        // setIsDoctor((prev) => !prev);
        // console.log(isDoctor);
    }
    const handleChangeBirth = (event:any) => {setBirth(event.target.value); console.log(birth);}
    const handleChangeDiseases = (event:any) => {setDiseases(event.target.value); console.log(diseases);}
    const handleChangePreviousTreatments = (event:any) => {setPreviousTreatments(event.target.value); console.log(previousTreatments)}
    const handleChangeGrade = (event:any) => {setGrade(event.target.value); console.log(grade);}
    const handleChangeSpeciality = (event:any) => {setSpeciality(event.target.value); console.log(speciality)}

    // how can i put the callbackUrl: 'http://localhost:3000'?
    const onRegisterUser = async () => {
        console.log("entro  a registrar");
        instance.post('/register', {name, email, password, passwordConfirmation, height, weight, gender, birth, diseases, previousTreatments, grade, speciality})
        // var x = await signIn('credentials',{ email, password });
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
                            <input className=" ml-2 border-4 h-10 border-slate-300 rounded-lg mr-4 border-r-2" type="radio" value="patient" name="gender" placeholder='' title='fd' onChange={handleChangeRole}/> Patient
                        </div>
                        <div className='w-1/2 flex items-center'>
                            <input className=" ml-2 border-2 h-10 border-slate-300 rounded-lg mr-4" type="radio" value="doctor" name="gender" placeholder='' title='dfs' onChange={handleChangeRole}/> Doctor 
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-1/2 ">
                <div className='flex flex-col w-full'>
                    <InputForm value={height} text="Height" type="number" placeholder='' handleChange={handleChangeHeight} mr={true}></InputForm>
                    <InputForm value={weight} text="Weight" type="number" placeholder='' handleChange={handleChangeWeight} mr={true}></InputForm>
                </div>
                <div className='flex flex-col w-full'>
                    <label className="mb-2">Gender</label>
                    <select className="border-2 border-slate-300 rounded-lg h-10 mb-4" title="gender" name="cars" id="cars" onChange={handleChangeGender}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <label className="mb-2">Birth date:</label>
                    <input className="border-2 border-slate-300 rounded-lg h-10 mb-4" type="date" id="start" name="trip-start" onChange={handleChangeBirth}
                        value={birth} placeholder=''
                        min="1900-01-01" max="2023-1-1"></input>
                    
                </div>
            </div>
            <div className='flex w-1/2 flex-col mb-4'>
                <label>Diseases : </label>
                <textarea className='border-2 border-slate-300 rounded-lg h-20 ' onChange={handleChangeDiseases}
                name="diseases" placeholder='' title='fd'
                />
            </div>
            <div className='flex w-1/2 flex-col mb-4'>
                <label>Previous treatments : </label>
                <textarea className='border-2 border-slate-300 rounded-lg h-20 ' onChange={handleChangePreviousTreatments}
                name="previousTreatments" placeholder='' title='fd'
                />
            </div>
            {role=="doctor" && 
                <div className="flex flex-col w-1/2 ">
                    <div className='flex flex-row w-full'>
                        <label className="mb-2 w-1/2">Grade</label>
                        <label className="mb-2 w-1/2">Speciality</label>
                    </div>
                    <div className='flex flex-row w-full'>
                        <select className="border-2 border-slate-300 rounded-lg h-10 mb-4 w-1/2 mr-4" title="gender" name="cars" id="cars" onChange={handleChangeGrade}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <select className="border-2 border-slate-300 rounded-lg h-10 mb-4 w-1/2" title="gender" name="cars" id="cars" onChange={handleChangeSpeciality}>
                            <option value="general">General</option>
                            <option value="cardiology">Cardiology</option>
                            <option value="dermatology">Dermatology</option>
                            <option value="neurology">Neurology</option>
                            <option value="pathology">Pathology</option>
                            <option value="pediatrics">Pediatrics</option>
                            <option value="psychiatry">Psychiatry</option>
                            <option value="radiationOncology">Radiation oncology</option>
                            <option value="surgery">Surgery</option>
                            <option value="urology">Urology</option>
                        </select>
                    </div>
                </div>
            }
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

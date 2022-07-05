import { Layout } from '../components/layouts'
import {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/AuthContext';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import UserAPI from '../utils/Services/UserAPI';
import { InputForm, RegisterForm } from '../components/forms';
import { Loading } from '@nextui-org/react';
import * as routes from '../components/routes'
import { NotVerfiedEmail } from '../components/email/notVerified';

const specialities = [ 'Cardiology', 'Dermatology','Neurology','Pediatrics','Psychiatry','Radiation oncology', 'surgery']

const EditPage = () => {
    const { isLoggedIn, token, logout, id, role, email_verified_at } = useContext( AuthContext );
    const router = useRouter();

    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');

    const [gender, setGender] = useState('');
    const [birth, setBirth] = useState('');
    const [diseases, setDiseases] = useState('');
    const [previousTreatments, setPreviousTreatments] = useState('');
    const [grade, setGrade] = useState(1);
    const [speciality, setSpeciality] = useState('general');
    
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const api = new UserAPI();

    useEffect(() => {
        if (isLoggedIn){
                api.getPatientInformation({id, token}).then(
                    (response) => {
                        // console.log("user patient: ", response.data);
                        // setName(response.data.name);
                        // setEmail(response.data.email);
                        setHeight(response.data.data.height);
                        setWeight(response.data.data.weight);
                        setGender(response.data.data.gender);
                        setDiseases(response.data.data.diseases);
                        setBirth(response.data.data.birth);
                        setPreviousTreatments(response.data.data.previous_treatments);
                        if (role=="doctor"){
                            api.getDoctorInformation({id,token}).then(
                                (response) => {
                                    // console.log("doctorr", response.data.data.grade)
                                    setGrade(response.data.data.grade);
                                    setSpeciality(response.data.data.speciality);
                                }
                            )
                        }
                    }
                ).catch(
                    (error) => {
                        console.log(error);
                    }
                )
        }
    },[isLoggedIn])

    if (! isLoggedIn){
        return (<Layout/>);
    }

    if (!email_verified_at){
        return (
            <NotVerfiedEmail token={token}></NotVerfiedEmail>
        );
    }

    const handleUpdateInformation = () => {
        // console.log("update info");
        api.updatePatientInformation({birth, weight, height, gender, token}).then(
            (response)=>{
                // console.log(response.data);
                setError(false);
                setErrorMessage('');
                setSuccessMessage(response.data.message);
                setLoading(false);
                if (role == "doctor"){
                    api.updateDoctorInformation({grade, speciality, token}).then(
                        (response)=>{
                            // console.log(response.data.message);
                            setError(false);
                            setErrorMessage('');
                            setSuccessMessage(response.data.message);
                            setLoading(false);
                        }
                    ).catch((error) => {
                        setLoading(false);
                        setError(true);
                        setSuccessMessage('');
                        setErrorMessage(error.response.data.message);
                    })
                }
            }
        ).catch((error) => {
            setLoading(false);
            setError(true);
            setSuccessMessage('');
            setErrorMessage(error.response.data.message);
        })

    } 

    return (
        <Layout>
            <div className="w-full h-fit flex flex-col items-center mt-4">
                <h2> Edit your personal information</h2>
                {/* <div className="flex w-4/6 ">
                    <div className='flex flex-col w-full'>
                        <InputForm value={name} text="Name" type="text" placeholder='' handleChange={(event:any) => {setName(event.target.value);}} mr={true}></InputForm>
                        <InputForm value={password} text="Password" type="password" placeholder='*******' handleChange={(event:any) => {setPassword(event.target.value);}} mr={true}></InputForm>
                    </div>
                    <div className='flex flex-col w-full'>
                        <InputForm value={email} text="Email" type="email" placeholder='mail@example.com' handleChange={(event:any) => {setEmail(event.target.value);}}></InputForm>
                        <InputForm value={passwordConfirmation} text="Password confirmation" type="password" placeholder='*******' handleChange={(event:any) => {setPasswordConfirmation(event.target.value);}}></InputForm>
                    </div>
                </div> */}
                <div className="flex w-4/6 ">
                    <div className='flex flex-col w-full'>
                        <InputForm value={height} text="Height" type="number" placeholder='' handleChange={(event:any) => {setHeight(event.target.value);}} mr={true}></InputForm>
                        <InputForm value={weight} text="Weight" type="number" placeholder='' handleChange={(event:any) => {setWeight(event.target.value);}} mr={true}></InputForm>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className="mb-2">Gender</label>
                        <select className="border-2 border-slate-300 rounded-lg h-10 mb-4" title="gender" name="gender" id="gender" onChange={(event:any) => {setGender(event.target.value)}}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <label className="mb-2">Birth date:</label>
                        <input className="border-2 border-slate-300 rounded-lg h-10 mb-4" type="date" id="start" name="trip-start" onChange={(event:any) => {setBirth(event.target.value); }}
                            value={birth} placeholder=''
                            min="1900-01-01" max="2023-1-1"></input>
                        
                    </div>
                </div>
                <div className='flex w-4/6 flex-col mb-4'>
                    <label>Diseases : </label>
                    <textarea value={diseases} className='border-2 border-slate-300 rounded-lg h-20 ' onChange={(event:any) => {setDiseases(event.target.value); }}
                    name="diseases" placeholder='' title='fd'
                    />
                </div>
                <div className='flex w-4/6 flex-col mb-4'>
                    <label>Previous treatments : </label>
                    <textarea value={previousTreatments} className='border-2 border-slate-300 rounded-lg h-20 ' onChange={(event:any) => {setPreviousTreatments(event.target.value); }}
                    name="previousTreatments" placeholder='' title='fd'
                    />
                </div>
                {role=="doctor" && 
                    <div className="flex flex-col w-4/6 ">
                        <div className='flex flex-row w-full'>
                            <label className="mb-2 w-1/2">Grade</label>
                            <label className="mb-2 w-1/2">Speciality</label>
                        </div>
                        <div className='flex flex-row w-full'>
                            <select value={grade} className="border-2 border-slate-300 rounded-lg h-10 mb-4 w-1/2 mr-4" title="gender" name="grade" id="grade" onChange={(event:any) => {setGrade(event.target.value); }}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <select value={speciality} className="border-2 border-slate-300 rounded-lg h-10 mb-4 w-1/2" title="gender" name="speciality" id="speciality" onChange={(event:any) => {setSpeciality(event.target.value); }}>
                                <option value="general">General</option>
                                {specialities.map((speciality) => (
                                    <option value={speciality.split(' ').join('')} key={speciality}>{speciality}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                }
                {!error && successMessage.length > 0 && <div className='mb-2'> <h4 className='text-green-500'> {successMessage} </h4> </div>}
                {error && 
                    <div className='mb-2'>
                        <h4 className='text-red-500'>{errorMessage}</h4>
                    </div>
                }
                <button onClick={handleUpdateInformation} disabled={loading} title='editInfo' type="button" className="disabled:bg-white mt-5 h-10 rounded-xl bg-blue-500 text-white w-4/6 mb-8"> 
                    <p hidden={loading}>Save changes</p>
                </button>
                {loading && <Loading></Loading>}
            </div>
        </Layout>
    )
}

export default EditPage
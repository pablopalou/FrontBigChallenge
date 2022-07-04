import { Layout } from '../components/layouts'
import {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/AuthContext';
import { useSession } from 'next-auth/react'
import { instance } from '../api'
import { newSubmission } from '../components/routes/routes';
import Link from 'next/link';
import { Pending, InProgress, Ready } from '../components/tags';
import { useRouter } from 'next/router'
import { iPatient, iUser, iDoctor } from './index';
import UserAPI from '../utils/Services/UserAPI';
import { RegisterForm } from '../components/forms';

const EditPage = () => {
    const { isLoggedIn, token, logout, id, name, role } = useContext( AuthContext );
    const [user, setUser] = useState<any>();

    const api = new UserAPI();

    useEffect(() => {
        if (isLoggedIn){
                api.getPatientInformation({id, token}).then(
                    (response) => {
                        console.log("user patient: ", response.data);
                        setUser(response.data)
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

    const handleUpdateInformation = () => {
        console.log("update info");
    } 

    return (
        <Layout>
            <RegisterForm iName={user?.name} iEmail={user?.email}
            iBirth={user?.data.birth} iDiseases={user?.data.diseases}
            iGender={user?.data.gender} iHeight={user?.data.height}
            iPreviousTreatments={user?.data.previous_treatments} iWeight={user?.data.weight}
            />
        </Layout>
    )
}

export default EditPage
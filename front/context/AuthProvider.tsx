import {FC, useReducer, useEffect, useState} from 'react';
import Router, { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import axios from 'axios';
import {AuthContext} from './AuthContext'
import * as routes from '../components/routes'
import { iDoctor, iPatient } from '../pages';

export interface AuthState {
    isLoggedIn: boolean;
    user?: Object;
    role: string;
    id: number;
    name: string,
    token: string,
    email_verified_at: string,
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
    role: 'guest',
    id: 0,
    name: "",
    token: "",
    email_verified_at: '',
}

interface Props {
    children: React.ReactNode;
}

export const AuthProvider:FC<Props> = ({ children }) => {

    const [state, setState] = useState( AUTH_INITIAL_STATE );
    const { data, status } = useSession();

    useEffect(() => {
        if ( status === 'authenticated' ) {
            setState({
                isLoggedIn: true,
                user: data?.user,
                role: data?.user.role,
                id: data?.user.id,
                name: data?.user.name,
                token: data?.user.token,
                email_verified_at: data?.user.email_verified_at,
            })
        }

    }, [ status, data ])



    const logout = async () => {
        signOut();
        setState({
            isLoggedIn: false,
            user: undefined,
            role: "undefined",
            id: 0,
            name: "",
            token: '',
            email_verified_at:''
        });
        // Router.push(routes.login);
    }



    return (
        <AuthContext.Provider value={{
            ...state,
            logout,
        }}>
            { children }
        </AuthContext.Provider>
    )
};
import {FC, useReducer, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import axios from 'axios';
import {AuthContext} from './AuthContext'

export interface AuthState {
    isLoggedIn: boolean;
    user?: Object;
    role: string;
}


const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
    role: 'guest',
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
                role: "undefined",
            })
        }

    }, [ status, data ])



    const logout = async () => {
        signOut();
        setState({
            isLoggedIn: false,
            user: undefined,
            role: "undefined",
        })
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
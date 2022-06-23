import {FC, useReducer, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
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
    children: React.ReactNode
}

export const AuthProvider:FC<Props> = ({ children }) => {

    const [state, setState] = useState( AUTH_INITIAL_STATE );
    const { data, status } = useSession();
    
    useEffect(() => {
        if ( status === 'authenticated' ) {
            setState({
                isLoggedIn: true,
                user: data?.user,
                role: "data?.user?.role"
            })
        }

    }, [ status, data ])



    const logout = async () => {
        //await laravelApi().post('/logout')
        signOut();
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


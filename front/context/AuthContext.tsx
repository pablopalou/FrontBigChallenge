import { createContext } from 'react';


interface ContextProps {
    isLoggedIn: boolean;
    user?: Object;
    logout: () => void;
    role: string,
    id: number,
    name: string,
    token: string,
    email_verified_at: string,
}


export const AuthContext = createContext({} as ContextProps );

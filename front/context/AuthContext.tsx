import { createContext } from 'react';


interface ContextProps {
    isLoggedIn: boolean;
    user?: Object;
    logout: () => void;
    role: string
}


export const AuthContext = createContext({} as ContextProps );

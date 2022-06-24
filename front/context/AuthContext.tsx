import { createContext } from 'react';

interface ContextProps {
    isLoggedIn: boolean;
    user?: Object;
    // id: string;
    logout: () => void;
    role: string
}

export const AuthContext = createContext({} as ContextProps );

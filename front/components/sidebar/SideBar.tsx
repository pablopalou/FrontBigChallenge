import React, { ReactNode } from 'react'
import { GuestSideBar } from './GuestSideBar';
import { AuthSideBar } from './AuthSideBar';
import {useContext} from 'react'
import { AuthContext } from '../../context/AuthContext';

let sidebar = <GuestSideBar></GuestSideBar>

export const SideBar = () => {
    const { user, isLoggedIn, logout } = useContext(  AuthContext );
    if (isLoggedIn){
        sidebar = <AuthSideBar></AuthSideBar>;
    }
    return (
        sidebar
    );
}
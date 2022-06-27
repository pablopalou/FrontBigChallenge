import React, { ReactNode } from 'react'
import { GuestSideBar } from './GuestSideBar';
import { AuthSideBar } from './AuthSideBar';
import {useContext} from 'react'
import { AuthContext } from '../../context/AuthContext';

let sidebar = <GuestSideBar></GuestSideBar>

export const SideBar = () => {
    // @ts-ignore
    const { user, isLoggedIn, logout } = useContext(  AuthContext );
    if (isLoggedIn){
        sidebar = <AuthSideBar></AuthSideBar>;
        console.log("hay alguien loggeado");
    } else {
        console.log("no hay nadie");
    }
    return (
        <AuthSideBar></AuthSideBar>
    );
}
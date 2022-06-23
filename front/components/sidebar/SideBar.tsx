import React, { ReactNode } from 'react'
import { GuestSideBar } from './GuestSideBar';
import { AuthSideBar } from './AuthSideBar';

let sidebar = <GuestSideBar></GuestSideBar>

export const SideBar = () => {
    // @TODO: see who is logged
    // if ( ...  "patient" or ... ""dcotor){
    //     sidebar = AuthSidebar
    // } 

    return (
        sidebar
    );
}
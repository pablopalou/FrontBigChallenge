import Router from 'next/router'
import React, { ReactNode } from 'react'
import {Button} from '../Button'
import {useRouter} from 'next/router'

export const GuestSideBar = () => {
    const router = useRouter();

    const handleHome = () => {
        router.push(`/`);
    }

    const handleLogin = () => {
        router.push(`/login`);
    }

    const handleRegister = () => {
        router.push(`/register`);
    }

    return (
        <>
            <Button handle={handleHome} text="Home"/>
            <Button handle={handleLogin} text="Login"/>
            <Button handle={handleRegister} text="Register"/>
        </>
    );
}
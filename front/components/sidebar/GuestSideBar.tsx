import Router from 'next/router'
import React, { ReactNode } from 'react'
import {Button} from '../Button'
import {useRouter} from 'next/router'
import * as routes from '../routes'

export const GuestSideBar = () => {
    const router = useRouter();

    const handleHome = () => {
        router.push(routes.home);
    }

    const handleLogin = () => {
        router.push(routes.login);
    }

    const handleRegister = () => {
        router.push(routes.register);
    }

    return (
        <>
            <Button handle={handleHome} text="Home" route="home.svg"/>
            <Button handle={handleLogin} text="Login" route="login.svg"/>
            <Button handle={handleRegister} text="Register" route="register.svg"/>
        </>
    );
}
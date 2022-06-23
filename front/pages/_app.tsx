import React from 'react'
import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import { NextUIProvider } from "@nextui-org/react";
import '../styles/globals.css'
import { AuthProvider } from '../context/AuthProvider';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider>
            <NextUIProvider>
                <AuthProvider> 
                    <Component {...pageProps}></Component>
                </AuthProvider> 
            </NextUIProvider>
        </SessionProvider>
    )
}

export default MyApp;
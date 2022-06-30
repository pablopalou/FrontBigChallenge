import React, { ReactNode } from 'react'
import { SideBar } from '../sidebar'

type Props = {
    children?: ReactNode
}

export const Layout = ({ children }: Props) => (
    <div className="w-full h-fit flex min-h-screen">
        <div className="w-64 h-full bg-gray-800 flex flex-col items-center pt-4 relative h-auto">
            <SideBar></SideBar>
        </div>
        <div className="w-full h-full">{children}</div>
    </div>
)


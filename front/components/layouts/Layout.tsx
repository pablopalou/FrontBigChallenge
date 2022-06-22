import React, { ReactNode } from 'react'
import { SideBar } from '../sidebar'

type Props = {
    children?: ReactNode
}

export const Layout = ({ children }: Props) => (
    <div className="w-full h-screen flex">
        <div className="w-48 h-full bg-gray-800">
            <SideBar></SideBar>
        </div>
        <div className="w-full h-full">aca iria el content fjdsfk sd jfdks fjdsk fjdfdjsf kjdf sk jfesj kfkds fdjsk fkjs dkj fdskj fdsjk fkjs dkfj dsd fskj</div>
    </div>
)


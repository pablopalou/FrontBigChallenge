import { useState } from "react";
import { instance } from "../../api";
import { Layout } from "../layouts"

interface Props {
    token: string, 
}
// {token}:Props
export const NotSubmissions= () => {

    return (
        <Layout>
            <div className='w-full flex justify-center pt-10'>
                <div className='w-11/12'>
                    <h4>
                        There are no submissions to show in this section. 
                    </h4>
                </div>
            </div>
        </Layout>
    )
}
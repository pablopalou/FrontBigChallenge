import { useState } from "react";
import { instance } from "../../api";
import { Layout } from "../layouts"

interface Props {
    token: string, 
}


export const NotVerfiedEmail= ({token}:Props) => {
    const [sendMessage, setSendMessage] = useState('');

    const resendEmail = () => {
        // console.log("resending");
        instance.post(`/email/verification-notification`,{} ,{
            headers: {
                    'Authorization': `Bearer ${token}`
            }
            }).then(
                (response) => {
                    // console.log(response);
                    setSendMessage(response.data.message);
                }
            ).catch(
                (error) => {
                }
            )
    }

    return (
        <Layout>
            <div className='w-full flex justify-center pt-10'>
                <div className='w-11/12'>
                    <h4>
                        You must verify your email prior to start using this app.
                    </h4>
                    { sendMessage && sendMessage.length > 0 &&
                    <div>
                        <h5 className='text-green-700'> {sendMessage} </h5>
                        <p> You must verify your email and then log in again to access all the features.</p> 
                    </div>}
                    <button className='bg-green-100 text-green-800 w-50 h-14 rounded-full px-4' onClick={resendEmail}> Resend email</button>
                </div>
            </div>
        </Layout>
    )
}
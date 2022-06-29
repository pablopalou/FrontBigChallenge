import { NextUIProvider } from '@nextui-org/react';
import { NextPage } from 'next';
import { RegisterForm } from '../components/forms'
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

const RegisterPage: NextPage = () => {
    return (
        <NextUIProvider>
            <RegisterForm />
        </NextUIProvider>
    );
}


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
    const session = await getSession({ req });
    // console.log({session});

    const { p = '/' } = query;

    if ( session ) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }


    return {
        props: { }
    }
}


export default RegisterPage
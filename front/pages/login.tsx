
import { NextUIProvider } from '@nextui-org/react';
import { GetServerSideProps, NextPage } from 'next'
import { signIn, getSession, getProviders } from 'next-auth/react';
import { LoginForm } from '../components/forms'

const LoginPage: NextPage = () => {
    return (
        <NextUIProvider>
            <LoginForm />
        </NextUIProvider>
    );
}



// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// if we have a session, we redirect to home page if login is pressed
export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const session = await getSession({ req });
    // console.log({session});

    const { p = '/' } = query;

    if (session) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }


    return {
        props: {}
    }
}



export default LoginPage
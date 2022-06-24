import { NextUIProvider } from '@nextui-org/react';
import { NextPage } from 'next';
import { RegisterForm } from '../components/forms'

const RegisterPage: NextPage = () => {
    return (
        <NextUIProvider>
            <RegisterForm />
        </NextUIProvider>
    );
}

export default RegisterPage
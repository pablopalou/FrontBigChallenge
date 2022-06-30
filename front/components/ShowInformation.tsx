import { iSubmission } from '../pages/index';

interface Props {
    title1: string,
    title2: string, 
    property1?: string | undefined | number,
    property2: string | undefined | number,
}

export const  ShowInformation = ({title1, title2, property1, property2}: Props) => {
    return (
        <>
            <div className='flex w-full'>
                <p className='w-1/2'> {title1} </p>
                <p className='w-1/2'> {title2} </p>
            </div>
            <div className='flex mb-3'>
                <div className='w-1/2'> {property1} </div> 
                <div className='w-1/2'> {property2} </div>
            </div>
        </>
    )
}

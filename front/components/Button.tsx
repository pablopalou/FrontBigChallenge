import React, { ReactNode } from 'react'
// import { fingerPrint } from '@heroicons/react'

interface Props {
    text: string,
    handle: () => void,
    route: string,
}

{/* If I use Image from next, the classes are not applied
<Image
    src="/icons/home.svg"
    alt="Home"
    className="pr-4"
    width={18}
    height={18}
></Image> */}

export const Button = ({handle, text, route}:Props) => {
    // let logo = text.replace(/\s/g, '').toLowerCase();
    return (
        <button className="p-2 m-2 w-11/12 text-lg rounded-lg text-white font-bold bg-gray-700 flex items-center" type="button" onClick={() => handle()}>
            <img
                src={`../icons/${route}`}
                alt="Home"
                className="pr-4 ml-2"
                style={{ height: "53%", width: "36%" }}
            ></img>
            {text}
        </button>
    );
}
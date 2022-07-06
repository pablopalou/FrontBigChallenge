import { InProgress } from "./InProgress"
import { Pending } from "./Pending"
import { Ready } from "./Ready"

interface Props {
    status: string
}

export const  AnyTag = ({status}:Props) => {
    let call = <Pending></Pending>
    if (status == "inProgress"){
        call = <InProgress></InProgress>
    } else if (status == "ready"){
        call = <Ready></Ready>
    }
    return (
        call
    )
}
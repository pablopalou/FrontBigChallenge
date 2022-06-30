import { instance } from '../../api'
interface Props {
    filter: string,
    token: string,
}

export default class SubmissionAPI {

    getSubmissionsTaken = ({filter, token}:Props) => {
        return instance.get(`/submission?role=doctor&state=${filter}`, {
            headers: {
                    'Authorization': `Bearer ${token}`
            }
            })
    };
}
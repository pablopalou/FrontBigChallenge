import { instance } from '../../api'
interface Props {
    filter: string,
    token: string,
    all: string,
}

export default class SubmissionAPI {

    getSubmissions = ({filter, token, all}:Props) => {
        return instance.get(`/submission?role=doctor&state=${filter}&all=${all}`, {
            headers: {
                    'Authorization': `Bearer ${token}`
            }
            })
    };

}
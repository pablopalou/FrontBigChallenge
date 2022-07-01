import { instance } from '../../api'
interface PropsGet {
    filter: string,
    token: string,
    all: string,
}

interface PropsEdit {
    id: string,
    token: string,
    symptoms: string,
}

export default class SubmissionAPI {

    getSubmissions = ({filter, token, all}:PropsGet) => {
        return instance.get(`/submission?role=doctor&state=${filter}&all=${all}`, {
            headers: {
                    'Authorization': `Bearer ${token}`
            }
            })
    };

    editSymptoms = ({id, token, symptoms}:PropsEdit) => {
        return instance.put(`/submission/${id}/patient`, {
                symptoms: symptoms
            },{
            headers: {
                    'Authorization': `Bearer ${token}`
            }
            })
    };

}
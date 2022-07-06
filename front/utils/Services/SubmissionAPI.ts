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

interface Props {
    idSubmission: string,
    token: string,
}

interface PropsPrescription {
    idSubmission: string,
    formData: FormData,
    token: string,
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

    takeSubmission = ({idSubmission, token}:Props) => {
        // console.log("tokenTake",token);
        return instance.post(`/submission/${idSubmission}/take`,{},{
            headers: {
                'Authorization': `Bearer ${token}`
            }
            })
    };

    deleteSubmission = ({idSubmission, token}:Props) => {
        // console.log("tokenDelete",token);
        return instance.delete(`/submission/${idSubmission}`,{
            headers: {
                    'Authorization': `Bearer ${token}`
            }
            })
    };

    uploadPrescription = ({idSubmission, formData, token}:PropsPrescription) => {
        // console.log("Uploading file...");
        return instance.post(`/submission/${idSubmission}/prescription`,
            formData,{
            headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type':'multipart/form-data'
            }
            })
    };

    deletePrescription = ({idSubmission, token}:Props) => {
        // console.log("Deleting file...");
        return instance.delete(`/submission/${idSubmission}/prescription`,{
            headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type':'multipart/form-data'
            }
            })
    };
}
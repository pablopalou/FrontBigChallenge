import {instance} from '../../api'

interface Props {
    id: number,
    token: string,
}

interface PropsToken {
    token: string,
}

export default class UserAPI {

    getPatientInformation = ({id, token}:Props) => {
        return instance.get(`/getPatientInformation/${id}`, {
            headers: {
                    'Authorization': `Bearer ${token}`
            }
            })
    }

    getDoctorInformation = ({id, token}:Props) => {
        return instance.get(`/getDoctorInformation/${id}`, {
            headers: {
                    'Authorization': `Bearer ${token}`
            }
            })
    }

    updateInformation = ({token}:PropsToken) => {
        return instance.get(`/updatePatientInformation`, {
            headers: {
                    'Authorization': `Bearer ${token}`
            }
            })
    }

}

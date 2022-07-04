import {instance} from '../../api'

interface Props {
    id: number,
    token: string,
}

interface PropsToken {
    token: string,
}

interface PropsUpdatePatient {
    birth: string,
    weight: string,
    height: string, 
    gender: string, 
    token: string,
}

interface PropsUpdateDoctor {
    grade: number,
    speciality: string, 
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

    updatePatientInformation = ({birth, weight, height, gender, token}:PropsUpdatePatient) => {
        return instance.post(`/updatePatientInformation`, {
                birth: birth,
                weight: weight,
                height: height,
                gender: gender
            }, {
            headers: {
                    'Authorization': `Bearer ${token}`
            }
            })
    }

    updateDoctorInformation = ({token, grade, speciality}:PropsUpdateDoctor) => {
        return instance.post(`/updateDoctorInformation`, {
            grade: grade,
            speciality: speciality,
        },{ 
            headers: {
                    'Authorization': `Bearer ${token}`
            }
            })
    }

}

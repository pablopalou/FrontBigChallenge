import { Layout } from '../../components/layouts'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useSession } from 'next-auth/react'
import { instance } from '../../api'
import Link from 'next/link';
import { iSubmission } from '../index';
import { NextPage } from 'next';
import { useRouter } from "next/router"
import { AnyTag } from '../../components/tags';
import * as routes from '../../components/routes'
import { ShowInformation } from '../../components/ShowInformation';
import { editSubmission } from '../../components/routes/routes';
import SubmissionAPI from '../../utils/Services/SubmissionAPI';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios'
import fileDownload from 'js-file-download'

const SubmissionDetailPage: NextPage = () => {
    const router = useRouter();
    const query = router.query;
    const idSubmission = router.query.id as string;
    const { user, isLoggedIn, token, logout, name, id } = useContext(AuthContext);
    const [submission, setSubmission] = useState<iSubmission | undefined>();
    const [prescription, setPrescription] = useState('');
    const [file, setFile] = useState(null);

    // i have to get all the information from the submission
    useEffect(() => {

        if (isLoggedIn) {
            instance.get(`/submission/${idSubmission}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(
                (response) => {
                    // console.log("Submission:", response.data.data);
                    setSubmission(response.data.data)
                }
            ).catch(
                (error) => {
                }
            )

            if (submission?.doctor?.id == id || submission?.patient.id == id) {
                instance.get(`/submission/prescription/${idSubmission}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(
                    (response) => {
                        // console.log("Prescription:", response.data.url);
                        setPrescription(response.data.url);
                    }
                ).catch(
                    (error) => {
                    }
                )
            }

        }


    }, [isLoggedIn])

    if (!isLoggedIn) {
        return (<Layout />);
    }

    const propertyGender = (gender: string | undefined) => {
        if (gender) {
            return gender.charAt(0).toUpperCase() + gender.slice(1);
        }
        return "";
    }

    const handleEdit = () => {
        router.push(routes.editSubmission + `/${idSubmission}`);
    }

    const api = new SubmissionAPI();

    const handleDelete = () => {
        api.deleteSubmission({ idSubmission, token }).then(
            (response) => {
                // console.log(response);
                router.push(routes.home + '?delete=yes');
            }
        ).catch(
            (error) => {
            }
        )
    }

    const handleDeletePrescription = () => {
        api.deletePrescription({ idSubmission, token }).then(
            (response) => {
                // console.log(response);
                window.location.reload();
            }
        ).catch(
            (error) => {
                // console.log(error);
            }
        )
    }

    const uploadPrescription = () => {
        if (file) {
            const formData = new FormData();
            formData.append('prescriptions', file);
            // console.log("file",file);
            // console.log("formdata",formData);
            api.uploadPrescription({ idSubmission, formData, token }).then(
                (response) => {
                    // console.log(response);
                    window.location.reload();
                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            )
        }
        // formData.append(setFile);
        // refresh
    }

    const onFileChange = (event: any) => {
        setFile(event.target.files[0]);
    }

    const handleDownload = (url: string) => {
        axios.get(url, {
            responseType: 'blob',
        })
            .then((res) => {
                fileDownload(res.data, "prescription")
            })
    }

    return (
        <Layout>
            <div className='w-full flex justify-center pb-10'>
                <div className='w-11/12 flex flex-col mt-10'>
                    <Link href={routes.home} passHref><a className="text-blue-500 hover:text-blue-800 mb-8"> <img src="../icons/backarrow.svg" alt="" /></a></Link>
                    {/* div for id, status and doctor*/}
                    <div className='flex flex-col mb-4 border-b-2 pb-4'>
                        <div className='flex items-center mb-2'>
                            <h4 className='pr-4 mb-0 w-1/5'>{`Submission: ${submission?.id}`}</h4>
                            <div className='w-1/6'>{<AnyTag status={submission?.state}></AnyTag>}</div>
                            {submission?.patient.id == id &&
                                <div className='flex w-full justify-end'>
                                    <Popup className="" trigger={<button className='w-32 h-8 rounded-xl bg-red-100 text-red-800'>Delete</button>}
                                        position="left center">
                                        <div className="flex flex-col items-center">
                                            <h5>Are you sure you want to delete this submission? </h5>
                                            <p>If you want to cancel, click outside the pop up</p>
                                            <button className='w-32 h-8 rounded-xl bg-red-100 text-red-800' onClick={handleDelete}>Yes, delete</button>
                                        </div>
                                    </Popup>
                                </div>
                            }
                            {submission?.doctor?.id == id &&
                                <div className='flex w-full justify-end'>
                                    <input title="a" placeholder="" type="file" onChange={onFileChange} />
                                    <button className='w-48 h-8 rounded-xl bg-gray-100 text-gray-800' onClick={uploadPrescription}>Upload Prescription</button>
                                </div>
                            }
                        </div>
                        {submission?.doctor ? <div>Assigned doctor: {submission?.doctor?.name}. Grade: {submission.doctor.doctorInformation.grade}. Speciality: {submission.doctor.doctorInformation.speciality}</div> : <div>A doctor will take this submission soon</div>}
                    </div>

                    {/* patient info */}
                    <div className='flex flex-col mb-4'>
                        <h5> Patient Information:</h5>
                        <ShowInformation title1="Email" title2='Name' property1={submission?.patient.email} property2={submission?.patient.name}></ShowInformation>
                        <ShowInformation title1="Birth" title2='Gender' property1={submission?.patient.patientInformation.birth} property2={propertyGender(submission?.patient.patientInformation.gender)}></ShowInformation>
                        <ShowInformation title1="Height" title2='Weight' property1={submission?.patient.patientInformation.height} property2={submission?.patient.patientInformation.weight}></ShowInformation>

                        <div className=' mb-3'>
                            <p> Diseases </p>
                            <div>{submission?.patient.patientInformation.diseases}</div>
                        </div>
                        <div>
                            <p> Previous treatments </p>
                            <div>{submission?.patient.patientInformation.previous_treatments}</div>
                        </div>
                    </div>

                    {/* symptoms */}
                    <div className='flex flex-col mb-4'>
                        <h5 className='mb-0'> Symptoms </h5>
                        <div className='flex'>
                            <p className='mr-4'> {submission?.symptoms}</p>
                            {submission?.state == "pending" && submission?.patient.id == id &&
                                <button className='w-40 rounded-xl bg-blue-100 text-blue-800' onClick={handleEdit}>Edit symptoms</button>
                            }
                        </div>
                    </div>
                    {/* prescriptions */}
                    <div className='flex flex-col w-full'>
                        <h5 className='mb-0'> Prescriptions </h5>
                        {submission?.prescriptions ?
                            (<div className='bg-gray-200 py-3 flex pl-4'>
                                <a onClick={() => {handleDownload(submission?.prescriptions)}} className="pr-10 text-blue-500 hover:text-blue-800"> Download your prescription</a>
                                {submission?.doctor?.id == id &&
                                    <Popup className="" trigger={<button className='w-24 h-6 rounded-xl bg-red-100 text-red-800'>Delete</button>}
                                        position="left center">
                                        <div className="flex flex-col items-center">
                                            <h5>Are you sure you want to delete this prescription? </h5>
                                            <p>If you want to cancel, click outside the pop up</p>
                                            <button className='w-32 h-8 rounded-xl bg-red-100 text-red-800' onClick={handleDeletePrescription}>Yes, delete</button>
                                        </div>
                                    </Popup>
                                }
                            </div>) :
                            (<div className='bg-gray-200 py-3 flex pl-4 '>
                                <img src="../icons/notavailable.svg" alt="" />
                                <p className='text-lg pl-3'>No prescriptions have been added yet</p>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SubmissionDetailPage
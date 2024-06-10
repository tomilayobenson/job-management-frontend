import React, { useEffect, useState } from 'react'
import { baseURL } from '../data/baseUrl'
import { Alert, Button } from 'reactstrap'
import ViewModal from './ViewModal'
import EditForm from './EditForm'
import DeleteItem from './DeleteItem'
import { useNavigate } from 'react-router-dom'

const BrowseJobs = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([])
    const [failure, setFailure] = useState("")
    const [viewModal, setViewModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [currentJob, setCurrentJob] = useState(null)

    useEffect(()=> {
        async function getJobs() {
            const response = await fetch(baseURL +"/jobs");
            if (!response.ok){
                setFailure("There was an error fetching from the database")
                return
            }
            const data = await response.json();
            // console.log(data)
            setFailure("")
            setJobs(data);
        }
        getJobs();
    },[editModal, viewModal, deleteModal])
    return (
        <div className='container browsejob'>
        <Button className='mb-4' color="primary" onClick={()=>navigate('/create-job')}>Create New Job</Button>
        
        {failure ? (
            <Alert color="danger">{failure}</Alert>
        ): null
        }
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Job Type</th>
                        <th scope="col">Status</th>
                        <th scope="col">Technician</th>
                        <th scope="col">Action</th>

                    </tr>
                </thead>
                <tbody>
                {jobs.length ? (jobs.map((job,index)=>{
                    return (
                        <tr key={job.id}>
                            <th scope="row">{job.id}</th>
                            <td>{job.customerName}</td>
                            <td>{job.jobType}</td>
                            <td>{job.status}</td>
                            <td>{job.technician}</td>
                            <td>
                                <Button color="success" onClick={()=>{
                                    setCurrentJob(job)
                                    setViewModal(true)
                                }}>View</Button>
                                <Button className='mx-3' color='warning' onClick={()=>{
                                    setCurrentJob(job)
                                    setEditModal(true)
                                }}>Edit</Button>
                                <Button  color='danger' onClick={()=>{
                                    setCurrentJob(job)
                                    setDeleteModal(true)
                                }}>Delete</Button>
                            </td>
                            <ViewModal modal={viewModal} setModal={setViewModal} job={currentJob} />
                            <EditForm modal={editModal} setModal={setEditModal} job={currentJob} />
                            <DeleteItem modal={deleteModal} setModal={setDeleteModal} job={currentJob} />
                        </tr>
                    )}
                )   
                ):
                (<Alert color="secondary">
                    There are currently no jobs
                </Alert>
                )} 
                </tbody>
            </table>
                
        </div>

    )
}

export default BrowseJobs
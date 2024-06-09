import React, { useEffect, useState } from 'react'
import { baseURL } from '../data/baseUrl'
import { Alert, Button } from 'reactstrap'
import ViewModal from './ViewModal'

const BrowseJobs = () => {
    const [jobs, setJobs] = useState([])
    const [viewModal, setViewModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [currentJob, setCurrentJob] = useState(null)

    useEffect(()=> {
        async function getJobs() {
            const response = await fetch(baseURL +"/jobs");
            if (!response.ok) throw Error(response.message);
            const data = await response.json();
            // console.log(data)
            setJobs(data);
        }
        getJobs();
    },[])
    return (
        <div className='container browsejob'>

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
                                <span>Edit</span>
                                <span className='px-3'>Delete</span>
                                <Button onClick={()=>{
                                    setCurrentJob(job)
                                    setViewModal(true)
                                }
                                    }
                                    >
                                    View
                                </Button>
                            </td>
                            <ViewModal modal={viewModal} setModal={setViewModal} job={currentJob} />
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
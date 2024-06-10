import React, { useState } from 'react'
import { Modal, ModalHeader,ModalBody, List, ModalFooter,Button, Alert } from 'reactstrap'
import { baseURL } from '../data/baseUrl';

const DeleteItem = ({modal, setModal, job}) => {
    const toggle = () => setModal(!modal)
    const [success, setSuccess] = useState("")
    const [failure, setFailure] = useState("")

    const handleSubmit = async() => {
        const response = await fetch(`${baseURL}/jobs/${job.id}`,{
            method:'DELETE' });
        if (!response.ok) {
            setSuccess("")
            setFailure("Unable to delete item")
            // throw Error(response.message);
        }
        const data = await response.json();
        setFailure("")
        setSuccess("Job successfully deleted")
        setTimeout(() => {
            toggle()
        }, 1000);
    }

  return (
    <Modal isOpen={modal} toggle={toggle} centered="true" backdropClassName='custom-modal-backdrop' backdrop={true}>
    {job ? (<>
        <ModalHeader toggle={toggle}>Job Details</ModalHeader>
        <ModalBody>
            {success ? (<Alert>The job has been successfully deleted.</Alert>): null}
            {failure ? (<Alert color="warning">There was a problem deleting the item</Alert>): null}
            {(success || failure) ? null : (<Alert color="warning">Are you sure you want to delete the job?</Alert>)}
        </ModalBody>
        <ModalFooter>
        {(success || failure) ? null: (<>
            <Button color="primary" onClick={handleSubmit}>
            Yes
          </Button>{' '}
        </>)}
          <Button color="secondary" onClick={toggle}>
            No
          </Button>
        </ModalFooter>
    </>     
    ):(<div>There are no details to display</div>)} 
      </Modal>
  )
}

export default DeleteItem
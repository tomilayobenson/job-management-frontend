import React from 'react'
import { Modal, ModalHeader,ModalBody, List, ModalFooter,Button } from 'reactstrap'

const ViewModal = ({modal, setModal, job}) => {
    const toggle = () => setModal(!modal)
  return (
    <Modal isOpen={modal} toggle={toggle} centered="true" backdropClassName='custom-modal-backdrop' backdrop={true}>
    {job ? (<>
        <ModalHeader toggle={toggle}>Job Details</ModalHeader>
        <ModalBody>
            <List type="unstyled">
                <li>
                    <strong>Customer Name: </strong>{job.customerName}
                </li>
                <li>
                    <strong>Job Type: </strong>{job.jobType}
                </li>
                <li>
                    <strong>Status: </strong>{job.status}
                </li>
                <li>
                    <strong>Technicial: </strong>{job.technician}
                </li>
                <li>
                    <strong>Appointment Date: </strong>{job.appointmentDate}
                </li>
            </List>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
    </>     
    ):(<div>There are no details to display</div>)} 
      </Modal>
  )
}

export default ViewModal
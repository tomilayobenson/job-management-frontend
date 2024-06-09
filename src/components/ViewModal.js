import React from 'react'
import { Modal, ModalHeader,ModalBody, List, ModalFooter,Button } from 'reactstrap'

const ViewModal = ({modal, setModal, job}) => {
    const toggle = () => setModal(!modal)
  return (
    <Modal isOpen={modal} toggle={toggle} className="custom-modal"
    backdropClassName="custom-modal-backdrop">
    {job ? (<>
        <ModalHeader toggle={toggle}>{job.customerName}</ModalHeader>
        <ModalBody>
            <List type="unstyled">
                <li>
                    Job Type: {job.jobType}
                </li>
                <li>
                    Status: {job.status}
                </li>
                <li>
                    Technicial: {job.technician}
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
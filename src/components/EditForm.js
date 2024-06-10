import React, { useState } from 'react'
import { Modal, ModalHeader,ModalBody, List, ModalFooter,Button,Input, FormGroup, Label, Alert  } from 'reactstrap'
import {Formik, Form, ErrorMessage, Field} from 'formik'
import { baseURL } from '../data/baseUrl';

const EditForm= ({modal, setModal, job}) => {

const [success, setSuccess] = useState("")
const [failure, setFailure] = useState("")

const toggle = () => setModal(!modal)

const isoToDateTimeLocal = (isoString) => {
    const date = new Date(isoString);
    const dateTimeLocal = date.toISOString().slice(0, 16);
    return dateTimeLocal;
};

const formatDateToISO = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString();
};

const handleSubmit = async (values, {resetForm}) => {
    const cleanedValues = {...values, appointmentDate: formatDateToISO(values.appointmentDate)}
    const response = await fetch(`${baseURL}/jobs/${job.id}`,{
        method:'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(cleanedValues)
    });
    if (!response.ok) {
        setSuccess("")
        setFailure("Unable to update job")
        // throw Error(response.message);
    }
    const data = await response.json();
    setFailure("")
    setSuccess("Job successfully updated")
}

  return (
    <Modal isOpen={modal} toggle={toggle} centered="true" backdropClassName='custom-modal-backdrop' backdrop={true}>
    {job ? (<>
        <ModalHeader toggle={toggle}>Edit Job Details</ModalHeader>
        <ModalBody>
            {
                success ? (
                    <Alert>{success}</Alert>
                ): null
            }
            {
                failure ? (
                    <Alert color="danger">{failure}</Alert>
                ): null
            }
            <Formik
                initialValues={{
                customerName: job.customerName,
                jobType: job.jobType,
                status: job.status,
                technician: job.technician,
                appointmentDate: isoToDateTimeLocal(job.appointmentDate)
                }}
                onSubmit={handleSubmit}
            >
            {({isSubmitting }) => (
                <Form>
                    <FormGroup>
                    <Label for="customerName">Customer Name</Label>
                    <Field name="customerName" required as={Input}/>
                    </FormGroup>

                    <FormGroup>
                    <Label for="jobType">Job Type</Label>
                    <Field name="jobType" required as={Input} />
                    </FormGroup>

                    <FormGroup>
                    <Label for="technician">Technician</Label>
                    <Field name="technician" as={Input} required/>
                    </FormGroup>

                    <FormGroup>
                    <Label for="status">Status</Label>
                    <Field name="status" as={Input} type="select" required>
                        <option value="" label="Select Status" />
                        <option value="Scheduled" label="Scheduled" />
                        <option value="In Progress" label="In Proress" />
                        <option value="Completed" label="Completed" />
                    </Field>
                    </FormGroup>

                    <FormGroup>
                    <Label for="appointmentDate">Appointment Date </Label>
                    <Field name="appointmentDate" type="datetime-local" as={Input} required/>
                    </FormGroup>

                    <Button type="submit" color="primary" disabled={isSubmitting}>
                    Submit
                    </Button>
                </Form>
            )}
            </Formik>
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

export default EditForm
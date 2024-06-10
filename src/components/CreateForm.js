import React, { useState } from 'react'
import {Formik, Form, ErrorMessage, Field} from 'formik'
import { Input, FormGroup, Label, Button, Alert } from 'reactstrap'
import { baseURL } from '../data/baseUrl';

const CreateForm = () => {
const [success, setSuccess] = useState("")
const [failure, setFailure] = useState("")

const formatDateToISO = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString();
};

const handleSubmit = async (values, {resetForm}) => {
    const cleanedValues = {...values, appointmentDate: formatDateToISO(values.appointmentDate)}
    const response = await fetch(baseURL +"/jobs",{
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(cleanedValues)
    });
    if (!response.ok) {
        setSuccess("")
        setFailure("Unable to submit form")
        // throw Error(response.message);
        return
    }
    const data = await response.json();
    resetForm()
    setFailure("")
    setSuccess("Form successfully submitted")
}
  return (<>
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
      customerName: '',
      jobType: '',
      status: '',
      technician: '',
      appointmentDate: ''
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
          <Label for="appointmentDate">Appointment Date</Label>
          <Field name="appointmentDate" type="datetime-local" as={Input} required/>
        </FormGroup>

        <Button type="submit" color="primary" disabled={isSubmitting}>
          Submit
        </Button>
      </Form>
  )}
  </Formik>
  </>
  )
}

export default CreateForm
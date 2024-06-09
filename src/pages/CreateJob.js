import React from 'react'
import CreateForm from '../components/CreateForm'
import { Col, Row } from 'reactstrap'

const CreateJob = () => {
  return (
    <div className="container-wrapper">
        <div className="form-container">
            <div className='container'>
                <Row className="justify-content-center">
                    <Col sm="8">
                        <h1 className="display-5 mb-4 text-center">Create New Job</h1>
                        <CreateForm />
                    </Col>
                </Row>
            </div>
        </div>
    </div>
    
    
  )
}

export default CreateJob
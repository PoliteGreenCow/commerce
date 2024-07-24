import { Spinner } from "react-bootstrap";

import React from 'react'

const LoadingBox = () => {
  return (
    <div>
     <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
    </Spinner> 
    </div>
  )
}

export default LoadingBox

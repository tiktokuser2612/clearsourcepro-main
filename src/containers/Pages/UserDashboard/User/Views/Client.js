import React from 'react'

const Client = ({data}) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="d-flex justify-content-between">
          <div className="health_card">
              <label>First Name</label>
              <p>{data?.firstname}</p>
          </div>
          <div className="health_card">
              <label>Middle Name</label>
              <p>{data?.middlename}</p>
          </div>
          <div className="health_card">
              <label>Last Name</label>
              <p>{data?.lastname}</p>
          </div>
        </div>


        <div className="d-flex justify-content-between">
          <div className="health_card">
              <label>User Name</label>
              <p>{data?.username}</p>
          </div>
          <div className="health_card">
              <label>Phone</label>
              <p>{data?.phone}</p>
          </div>
          <div className="health_card">
              <label>Email</label>
              <p>{data?.email}</p>
          </div>                              
        </div>

        <div className="d-md-flex justify-content-between">
          <h3>Mailing Address</h3>
          
          <div className="health_card">
              <label>Status</label>
              <p>{data?.client_status}</p>
          </div>
          <div className="health_card">
              <label>Contacted</label>
              <p>{data?.contacted}</p>
          </div>
          <div className="health_card">
              <label>Years in Business</label>
              <p>{data?.years_in_business}</p>
          </div>
          
        </div>

        <div className="d-md-flex justify-content-between">
          <h3>Mailing Address</h3>
          
          <div className="health_card">
              <label>City</label>
              <p>{data?.city}</p>
          </div>
          <div className="health_card">
              <label>State/Region</label>
              <p>{data?.state}</p>
          </div>
          <div className="health_card">
              <label>Zip/Postal Code</label>
              <p>{data?.zip}</p>
          </div>
          
        </div>
        <div className="d-md-flex justify-content-between">
          <div className="health_card">
            <label>User Role</label>
            <p className='text-capitalize'>{data?.user_role.replace("_", " ")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Client;
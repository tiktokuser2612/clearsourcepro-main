import React from 'react'

const Candidate = ({data}) => {
  return (
    <div className="row">
            <div className="col-md-12">
                
                <div className="add_profile_img">{data?.photo_url ? <img src={data.photo_url} alt="" style={{ maxWidth: 77, maxHeight: 77 }}/>: <img src="/images/no_img.png" alt="" />}</div>
                <div className="d-md-flex justify-content-between">
                    <div className="health_card">
                        <label>First Name</label>
                        <p>{data?.firstname}</p>
                    </div>
                    <div className="health_card">
                        <label>Last Name</label>
                        <p>{data?.lastname}</p>
                    </div>
                    <div className="health_card">
                        <label>User Name</label>
                        <p>{data?.username}</p>
                    </div>
                                            
                </div>
                <div className="d-md-flex justify-content-between">
                    <div className="health_card">
                        <label>Phone</label>
                        <p>{data?.phone}</p>
                    </div>
                    <div className="health_card">
                        <label>Email</label>
                        <p>{data?.email}</p>
                    </div>
                    <div className="health_card">
                        <label>Address</label>
                        <p>{data?.address}</p>
                    </div>                                
                </div>
                <div className="d-md-flex justify-content-between">
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
                    <h3>Emergency Contact</h3>
                    <div className="health_card">
                        <label>Name</label>
                        <p className='text-capitalize'>{data?.name}</p>
                    </div>
                    <div className="health_card">
                        <label>Contact Number</label>
                        <p className='text-capitalize'>{data?.emergency_contact}</p>
                    </div>
                    <div className="health_card">
                        <label>Country</label>  
                        <p className='text-capitalize'>{data?.country}</p>
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

export default Candidate;
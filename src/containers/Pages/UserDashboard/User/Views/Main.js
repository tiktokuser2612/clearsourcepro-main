import React from 'react'

const Main = ({data}) => {
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="add_profile_img">
                    {
                        data?.photo_url 
                            ? <img src={data.photo_url} alt="" style={{ maxWidth: 77, maxHeight: 77 }}/>
                            : <img src="/images/no_img.png" alt="" />
                    }
                </div>
                
                <div className="row">
                    <div className="col-4 health_card">
                        <label>First Name</label>
                        <p>{data?.firstname}</p>
                    </div>
                    <div className="col-4 health_card">
                        <label>Middle Name</label>
                        <p>{data?.middlename}</p>
                    </div>
                    <div className="col-4 health_card">
                        <label>Last Name</label>
                        <p>{data?.lastname}</p>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-4 health_card">
                        <label>User Name</label>
                        <p>{data?.username}</p>
                    </div>
                    <div className="col-4 health_card">
                        <label>Phone</label>
                        <p>{data?.phone}</p>
                    </div>
                    <div className="col-4 health_card">
                        <label>Email</label>
                        <p>{data?.email}</p>
                    </div>                              
                </div>

                <div className="row">
                    <div className="col-4 health_card">
                        <label>User Role</label>
                        <p className='text-capitalize'>{data?.user_role.replace("_", " ")}</p>
                    </div>
                    <div className=" col-4 health_card">
                        <label>Address</label>
                        <p>{data?.address}</p>
                    </div>
                    <div className=" col-4 health_card">
                        <label>Location</label>
                        <p>{data?.locations}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4 health_card">
                        <label>Manager</label>
                        <p className='text-capitalize'>{data?.manager}</p>
                    </div>
                    <div className="col-4 health_card">
                        <label>Title</label>
                        <p className='text-capitalize'>{data?.title}</p>
                    </div>
                    <div className="col-4 health_card">
                        <label>Date of Birth</label>
                        <p>{data?.dob}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4 health_card">
                        <label>Evaluation Date</label>
                        <p className='text-capitalize'>{data?.evaluation_date}</p>
                    </div>
                    <div className="col-4 health_card">
                        <label>Start Date</label>
                        <p className='text-capitalize'>{data?.start_date}</p>
                    </div>
                    <div className="col-4 health_card">
                        <label>Termination Date</label>
                        <p className='text-capitalize'>{data?.termination_date}</p>
                    </div>
                </div>
                <hr/>

                <div className="row">
                    <div className='col-12'><h3>Mailing Address</h3></div>
                    
                    <div className="col-4 health_card">
                        <label>City</label>
                        <p>{data?.city}</p>
                    </div>
                    <div className="col-4 health_card">
                        <label>State/Region</label>
                        <p>{data?.state}</p>
                    </div>
                    <div className="col-4 health_card">
                        <label>Zip/Postal Code</label>
                        <p>{data?.zip}</p>
                    </div>
                </div>
                <hr/>

                <div className="row">
                    <div className='col-12'><h3>Emergency Contact</h3></div>
                    <div className="col-4 health_card">
                        <label>Name</label>
                        <p className='text-capitalize'>{data?.name}</p>
                    </div>
                    <div className="col-4 health_card">
                        <label>Contact Number</label>
                        <p className='text-capitalize'>{data?.contact_number}</p>
                    </div>
                    <div className="col-4 health_card">
                        <label>Relationship</label>
                        <p className='text-capitalize'>{data?.relationship}</p>
                    </div>
                </div>
                <hr/>

                <div className="row">
                    <div className="col-4 health_card">
                        <label>Time Zone</label>
                        <p className='text-capitalize'>{data?.time_zone}</p>
                    </div>
                    <div className="col-4 health_card">
                        <label>Country</label>
                        <p className='text-capitalize'>{data?.country}</p>
                    </div>
                    <div className="col-4 health_card">
                        <label></label>
                        <p className='text-capitalize'></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;
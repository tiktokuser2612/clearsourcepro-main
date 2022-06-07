import React from 'react'

const Admin = ({data}) => {
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
                        <p>{data?.middle_initial}</p>
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
                </div>
            </div>
        </div>
    )
}

export default Admin;
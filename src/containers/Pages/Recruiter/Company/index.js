import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getRecruiterCompanyDetails} from 'store/actions/recuiterCompanyDeatils';

const Index = ({
    data,getRecruiterCompanyDetails
  })=> {
    useEffect(() => {
         
        getRecruiterCompanyDetails();
    }, [getRecruiterCompanyDetails]);
    console.log("datadata",data);
        return (
            <div className="health_insurance_main">
                <div className="health_card w-100 d-flex justify-content-between mt-0">
                    {/* <h1>Review Recruiter <a href="/recruiter/dashboard/edit">Edit</a></h1> */}
                </div>
                <div id="accordion" className="record_accordion">
                    <div className="card">
                        
                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                            <div className="d-md-flex justify-content-between">


                                 <div className="health_card">
                                    <label>Company Name</label>
                                    <p>{data?.company_name}</p>
                                </div>
                                 <div className="health_card">
                                    <label>Company Type/Industry</label>
                                    <p>{data?.company_type}</p>
                                </div>
                                <div className="health_card">
                                    <label>Company Website</label>
                                    <p>{data?.company_website}</p>
                                </div>
                                </div>
                                <div className="d-md-flex justify-content-between">
                                <div className="health_card">
                                    <label>Hours of Operation</label>
                                    <p>{data?.hours_of_operations}</p>
                                </div>
                                <div className="health_card">
                                    <label>Years in Business</label>
                                    <p>{data?.year_in_business}</p>
                                </div>
                                <div className="health_card">
                                    <label>Primary Contact Name</label>
                                    <p>{data?.name}</p>
                                </div>
                                </div>
                                <div className="d-md-flex justify-content-between">
                                <div className="health_card">
                                    <label>Primary Contact Title</label>
                                    <p>{data?.primary_contact_title}</p>
                                </div>
                                <div className="health_card">
                                    <label>Primary Phone</label>
                                    <p>{data?.phone}</p>
                                </div>
                                <div className="health_card">
                                    <label>Primary Email</label>
                                    <p>{data?.email}</p>
                                </div>
                                </div>
                                <div className="d-md-flex justify-content-between">
                                <div className="health_card">
                                    <label>Corp/Primary Address</label>
                                    <p>{data?.address_type}</p>
                                </div>
                                <div className="health_card">
                                    <label>Locations</label>
                                    <p>{data?.locations}</p>
                                </div>
                                <div className="health_card">
                                    <label></label>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
  }


const mapStateToProps = store => ({
    data: store.rootReducer.recruiterCompanyDetail.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getRecruiterCompanyDetails
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Index);




import React, {  useEffect, useState } from 'react';

import moment from 'moment';
import { Link } from 'react-router-dom';
import LoadingIndicator from 'components/Common/LoadingIndicator';

import Notes from '../../../containers/Pages/UserDashboard/Notes/index';
  
const RequisitionReview = ({
    data,
    isFetching,
    
  }) => {
    const [Active,setActive] = useState([]);
    const addSections =(sectionID)=>{
        let sections =[...Active];

        console.log("sections::", sections);

        if(sections.includes(sectionID)){
            sections.splice(sections.indexOf(sectionID),1)
        }
        else{
            sections.push(sectionID);
        }
        setActive(sections);

        console.log("sections-----", sections);
    }
   

    return (
        <div id="accordion" className="record_accordion">
            <LoadingIndicator isLoading={isFetching} /> 
            <div className="card">
            <div className="card-header" id="headingOne">
                <h2 className="mb-0">
                    <button className="d-flex align-items-center justify-content-between btn btn-link" onClick={()=>{addSections(1)}}>
                    <span>Details <img src="/images/edit_icon.png" alt=""/></span> 
                    <span className="fa-stack fa-sm">
                        <i className={Active.includes(1)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                    </span>
                    </button>
                </h2>
            </div>
            <div id="collapseOne" className={Active.includes(1)?"collapse show":"collapse"} aria-labelledby="headingOne" data-parent="#accordion">
                <div className="card-body p-0">
                    <div className="d-md-flex justify-content-between">
                        <div className="health_card elite_health">
                            <label>Title</label>
                            <p>{data.title}</p>
                        </div>
                        <div className="health_card elite_health">
                            <label>Job Type</label>
                            <p>{data.job_type}</p>
                        </div>
                        <div className="health_card elite_health">
                            <label>Compensation</label>
                            <p>{data.compensation}</p>
                        </div>
                    </div>
                    <div className="d-md-flex justify-content-between">
                        <div className="health_card elite_health">
                            <label>Category</label>
                            <p>{data.category}</p>
                        </div>
                        <div className="health_card elite_health">
                            <label>Deparment</label>
                            <p>{data.department}</p>
                        </div>
                        <div className="health_card elite_health">
                            <label>Location</label>
                            <p>{data.location}</p>
                        </div>
                    </div>
                    <div className="d-md-flex justify-content-between">
                        <div className="health_card elite_health">
                            <label>Evaluation Form</label>
                            <p>{data.evaluation_form}</p>
                        </div>
                        <div className="health_card elite_health">
                            <label>Pre-Interview Form</label>
                            <p>{data.pre_interview_form}</p>
                        </div>
                        <div className="health_card elite_health">
                            <label>Recruiter Name</label>
                            <p>{data.get_recruiter ? data.get_recruiter.firstname : ''}</p>
                        </div>
                    </div>
                    <div className="d-md-flex justify-content-between">
                        <div className="health_card elite_health">
                            <label>Hiring Manager</label>
                            <p>{data.hiring_manager}</p>
                        </div>
                        <div className="health_card elite_health">
                            <label>Other Recruiter</label>
                            <p>{data.other_recruiter}</p>
                        </div>
                        <div className="health_card elite_health">
                            <label>Salary</label>
                            <p>{data.salary}</p>
                        </div>
                    </div>
                    <div className="d-md-flex justify-content-between">
                        <div className="health_card elite_health">
                            <label>Hiring Dates</label>
                            <p>{data.hiring_dates}</p>
                        </div>
                        <div className="health_card elite_health">
                            <label>Status</label>
                            <p>{data.status}</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className="card">
                <div className="card-header" id="headingTwo">
                    <h2 className="mb-0">
                        <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={()=>{addSections(2)}}>
                        <span>Analytics Summary <img src="/images/edit_icon.png" alt=""/></span>
                        <span className="fa-stack">
                        <i className={Active.includes(2)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                        </span>
                        </button>
                    </h2>
                </div>
                <div id="collapseTwo" className={Active.includes(2)?"collapse show":"collapse"} aria-labelledby="headingTwo" data-parent="#accordion" >
                    <div className="card-body px-0">
                        <div className="analytics_tab_card border-0 p-0">
                            <div className="">
                            <div className="row">
                                <div className="col-md-7">
                                    <div className="row">
                                        <div className="col-md-8">
                                        <ul className="navbar-nav mr-auto">
                                            
                                            <li className="nav-item dropdown">
                                                <a className="nav-link bk dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Requisitions
                                                </a>
                                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    <a className="dropdown-item" href="#">Action</a>
                                                    <a className="dropdown-item" href="#">Another action</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a className="dropdown-item" href="#">Something else here</a>
                                                </div>
                                            </li>
                                        </ul>
                                        </div>
                                        <div className="col-md-4">
                                        <ul className="navbar-nav mr-auto">
                                            <li className="nav-item dropdown">
                                                <a className="nav-link bk  " href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Jobvite Sent
                                                </a>
                                            </li>
                                        </ul>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-8">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="analytics_card">
                                                    <span className="job_category_icon"><img src="/images/cat_icon1.png" alt=""/></span>
                                                    <h5>Filled Positions</h5>
                                                    <p>( 1 open position )</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="analytics_card">
                                                    <span className="job_category_icon"><img src="/images/cat_icon2.png" alt=""/></span>
                                                    <h5>Days Open</h5>
                                                    <p>( 1 open position )</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="analytics_card">
                                                    <span className="job_category_icon"><img src="/images/cat_icon3.png" alt=""/></span>
                                                    <h5>Direct</h5>
                                                    <p>( 1 open position )</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="analytics_card">
                                                    <span className="job_category_icon"><img src="/images/cat_icon4.png" alt=""/></span>
                                                    <h5>Active Candidates</h5>
                                                    <p>( 1 open position )</p>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="col-md-4">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="analytics_card">
                                                    <span className="job_category_icon"><img src="/images/cat_icon5.png" alt=""/></span>
                                                    <h5>Total Candidates</h5>
                                                    <p>( 1 open position )</p>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="analytics_card">
                                                    <span className="job_category_icon"><img src="/images/cat_icon6.png" alt=""/></span>
                                                    <h5>Broadcast</h5>
                                                    <p>( 1 open position )</p>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div>
                                        <h3>Filled Positions</h3>
                                    </div>
                                    <div className="pie_chart_box">
                                        <img src="/images/pie_chart_2.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            <div className="card">
                <div className="card-header" id="headingFive">
                    <h2 className="mb-0">
                    <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={()=>{addSections(3)}}>
                        <span>Candidates by Workflow Step <img src="/images/edit_icon.png" alt=""/></span>
                        <span className="fa-stack">
                            <i className={Active.includes(3)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                        </span>
                    </button>
                    </h2>
                </div>
                
                <div id="collapseFive" className={Active.includes(3)?"collapse show":"collapse"} aria-labelledby="headingFive" data-parent="#accordion">
                    {data.get_candidate_jobs && data.get_candidate_jobs.length != 0 ? 
                        <div className="card-body px-0">
                            <div className="status_bar_section d-flex align-items-center justify-content-between">
                                <ul className="d-md-flex">
                                    <li className="done"><a href="#">New</a></li>                                                
                                    <li className="done"><a href="#"> Lorem</a></li>
                                    <li className="process"><a href="#">Lpsum text</a></li>
                                    <li><a href="#">Lpsum text</a></li>
                                    <li><a href="#">Lorem Ipsum is simply</a></li>
                                    <li><a href="#">Lpsum text</a></li>
                                    <li><a href="#">Lpsum text</a></li>
                                </ul>
                                <button className="all_btn_style" type="button">All</button>
                            </div>
                            <div className="my_coustomer_table">
                                <div className="table-responsive w_bg">
                                    <table className="table table-condensed mb-0" style={{borderCollapse:"collapse"}}>
                                        <thead>
                                            <tr>
                                                <th>Candidates</th>
                                                <th>Applied On</th>
                                                <th>Interview Dates</th>
                                                <th>Current Workflow </th>
                                                <th>Willing Branch</th>
                                                <th>Experience</th>
                                            </tr>
                                            
                                        </thead>

                                        <tbody>
                                        {!!data.get_candidate_jobs && data?.get_candidate_jobs.map((candidate) => {
                                            return (
                                                <tr>
                                                <td><i className="fa fa-plus-circle" aria-hidden="true"></i> {candidate?.get_candidate?.name}</td>
                                                <td>{moment(candidate.created_at).format("MM/DD/YYYY")}</td>
                                                <td>{candidate?.get_candidate?.hiring_dates}</td>                                                
                                                <td>{candidate.full_time_part_time}</td>
                                                <td>{candidate.Are_you_willing_to}</td>
                                                <td>{candidate?.get_candidate?.year_in_business}</td>
                                            </tr>
                                            )


                                        })}
                                            
                                            
                                        </tbody>
                                    </table>
                                </div> 
                            </div>
                        </div>
                        : <label className='ml-3'>No candidate applied this job</label>
                    }
                </div>
                
            </div>
            <div className="card">
                <div className="card-header" id="headingThree">
                    <h2 className="mb-0">
                    <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={()=>{addSections(4)}}>
                        <span>Description <img src="/images/edit_icon.png" alt=""/></span>
                        <span className="fa-stack">
                            <i className={Active.includes(4)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                        </span>
                    </button>
                    </h2>
                </div>
                <div id="collapseThree" className={Active.includes(4)?"collapse show":"collapse"} aria-labelledby="headingThree" data-parent="#accordion">
                    <div className="card-body p-0">
                        <div className="health_card w-100 mb-4">
                        <h5>Brief Description</h5>
                            <p><span >
                            {data.brief_description}
                                </span>
                            </p>
                            
                        </div>  
                        <div className="health_card w-100 mb-4">
                        <h5>Description</h5>
                            <p><span >
                            {data.description}
                                </span>
                            </p>
                        </div>  
                        <div className="col-md-12">
                            <div className="file_docmt">
                            <ul>
                                        {
                                            data.requisition_doc && data.requisition_doc.map((fileKey) => {
                                                    
                                                return (
                                                    
                                                    <li>
                                                        <Link to={'/storage/images/'+fileKey.filename } download target="_blank"> {fileKey.filename}</Link>
                                                    </li>
                                                )
                                                
                                            })
                                        }
                                        </ul>
                                {/* <div className="file_cut">
                                    <img src="/images/file.png" alt=""/>
                                    <img className="cross_icon" src="/images/cross.png" alt=""/>
                                </div>
                                <div className="file_cut">
                                    <img src="/images/file.png" alt=""/>
                                    <img className="cross_icon" src="/images/cross.png" alt=""/>
                                </div>
                                <div className="file_cut">
                                    <img src="/images/file.png" alt=""/>
                                    <img className="cross_icon" src="/images/cross.png" alt=""/>
                                </div> */}
                            </div>
                        </div>                          
                    </div>
                </div>
            </div>
            { data.client_requisitions ?
             <div className="card">
                <div className="card-header" id="headingFour">
                    <h2 className="mb-0">
                    <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={()=>{addSections(5)}}>
                        <span>General Details <img src="/images/edit_icon.png" alt=""/></span>
                        <span className="fa-stack">
                            <i className={Active.includes(5)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                        </span>
                    </button>
                    </h2>
                </div>
                <div id="collapseFour" className={Active.includes(5)?"collapse show":"collapse"} aria-labelledby="headingFour" data-parent="#accordion">
                    <div className="card-body p-0">
                        <div className="d-md-flex justify-content-between">
                            <div className="health_card elite_health">
                                <label>Primary Address</label>
                                <p>{data.client_requisitions.general_primary_address ? data.client_requisitions.general_primary_address : null}</p>
                            </div>
                            <div className="health_card elite_health">
                                <label>Phone</label>
                                <p>{data.client_requisitions.client_phone ? data.client_requisitions.client_phone : null}</p>
                            </div>
                            <div className="health_card elite_health">
                                <label>Email</label>
                                <p>{data.client_requisitions.client_email ? data.client_requisitions.client_email : null}</p>
                            </div>
                        </div>
                        <div className="d-md-flex justify-content-between">
                            <div className="health_card elite_health">
                                <label>Non-Residents </label>
                                <p>{data.client_requisitions.general_non_residents ? data.client_requisitions.general_non_residents : null}</p>
                            </div>
                            <div className="health_card elite_health">
                                <label>Need to have AHIP?</label>
                                <p>{data.client_requisitions.general_need_AHIP ? data.client_requisitions.general_need_AHIP : null}</p>
                            </div>
                            <div className="health_card elite_health">
                                <label>Type of Insurance Sales</label>
                                <p>{data.client_requisitions.general_type_of_insurance_licensed_needed ? data.client_requisitions.general_type_of_insurance_licensed_needed : null}</p>
                            </div>
                        </div>
                        <div className="d-md-flex justify-content-between">
                            <div className="health_card elite_health">
                                <label>Appointment Info</label>
                                <p>{data.client_requisitions.general_appointment_info ? data.client_requisitions.general_appointment_info : null}</p>
                            </div>
                            <div className="health_card elite_health">
                                <label>Hours/Schedule</label>
                                <p>{data.client_requisitions.general_hours_schedule ? data.client_requisitions.general_hours_schedule : null}</p>
                            </div>
                            <div className="health_card elite_health">
                                <label>Which Products &amp; Carriers </label>
                                <p>{data.client_requisitions.general_products_carriers ? data.client_requisitions.general_products_carriers : null}</p>
                            </div>
                        </div>
                        <div className="d-md-flex justify-content-between">
                            <div className="health_card elite_health">
                                <label>Bonus Plan</label>
                                <p>{data.client_requisitions.general_bonus_plan ? data.client_requisitions.general_bonus_plan : null}</p>
                            </div>
                            
                            <div className="health_card elite_health">
                                <label>Minimum Experience</label>
                                <p>{data.client_requisitions.general_minimum_experience ? data.client_requisitions.general_minimum_experience : null}</p>
                            </div>
                            <div className="health_card elite_health">
                                <label>Base Pay</label>
                                <p>{data.client_requisitions.general_base_pay ? data.client_requisitions.general_base_pay : null}</p>
                            </div>
                        </div>
                        
                        <div className="d-md-flex justify-content-between">
                            <div className="health_card elite_health">
                                <label>Training</label>
                                <p>{data.client_requisitions.general_training ? data.client_requisitions.general_training : null}</p>
                            </div>
                            
                            <div className="health_card elite_health">
                                <label>Inbound/Outbound</label>
                                <p>{data.client_requisitions.general_inbound_outbound ? data.client_requisitions.general_inbound_outbound : null}</p>
                            </div>
                            <div className="health_card elite_health">
                                <label>Technology</label>
                                <p>{data.client_requisitions.general_technology ? data.client_requisitions.general_technology : null}</p>
                            </div>
                        </div>
                        
                        <div className="d-md-flex justify-content-between">
                            <div className="health_card elite_health">
                                <label>Openings</label>
                                <p>{data.client_requisitions.general_openings ? data.client_requisitions.general_openings : null}</p>
                            </div>
                            
                            <div className="health_card elite_health">
                                <label>Apply Form (Preview)</label>
                                <p>{data.client_requisitions.general_apply_form ? data.client_requisitions.general_apply_form : null}</p>
                            </div>
                            <div className="health_card elite_health">
                                <label>Schedule for Phone Interview</label>
                                <p>{data.client_requisitions.general_schedule_phone_interview ? data.client_requisitions.general_schedule_phone_interview : null}</p>

                            </div>
                        </div>
                        <div className="d-md-flex justify-content-between">
                            <div className="health_card elite_health">
                                <label>Time off Requested</label>
                                <p>{data.client_requisitions.general_time_off_requested ? data.client_requisitions.general_time_off_requested : null}</p>
                            </div>
                            
                            <div className="health_card elite_health">
                                
                            </div>
                            <div className="health_card elite_health">
                                

                            </div>
                        </div>
                        
                    </div>
                </div>
            </div> : "" 
            }
            
            
            {/* <div className="card">
                <div className="card-header" id="headingSix">
                    <h2 className="mb-0">
                    <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={()=>{addSections(6)}}>
                        <span>Posting Option <img src="/images/edit_icon.png" alt=""/></span>
                        <span className="fa-stack">
                            <i className={Active.includes(6)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                        </span>
                    </button>
                    </h2>
                </div>
                <div id="collapseSix" className={Active.includes(6)?"collapse show":"collapse"} aria-labelledby="headingSix" data-parent="#accordion">
                    <div className="card-body p-0">
                        <div className="d-md-flex justify-content-between">
                            <div className="health_card elite_health">
                                <label>Posting Type</label>
                                <p>Limited Access</p>
                            </div>
                            <div className="health_card elite_health">
                                <label>Publishing Options</label>
                                <p>Carer Site (External and Internal) and job board</p>
                            </div>
                            <div className="health_card elite_health"></div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="card">
                <div className="card-header" id="headingSeven">
                    <h2 className="mb-0">
                    <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={()=>{addSections(7)}}>
                        <span>Notes <img src="/images/edit_icon.png" alt=""/></span>
                        <span className="fa-stack">
                            <i className={Active.includes(7)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                        </span>
                    </button>
                    </h2>
                </div>                        

                <div id="collapseSeven" className={Active.includes(7)?"collapse show":"collapse"} aria-labelledby="headingSeven" data-parent="#accordion">
                    <div className="card-body p-0">

                        <div className="notes_tab_card">
                            {data.id != '' &&<Notes data_id={data.id} model_id={1}/>}
                        </div>
                        
                    </div>
                </div>
            </div>
    </div>
    )
}

export default RequisitionReview;
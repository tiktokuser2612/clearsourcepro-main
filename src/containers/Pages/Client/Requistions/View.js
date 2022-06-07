import React, {  useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import {
    initClientRequisition,
    getRequisition,
  } from 'store/actions/clientRequisition';
  import Notes from '../../UserDashboard/Notes';
  import { Link } from 'react-router-dom';
import LoadingIndicator from 'components/Common/LoadingIndicator';

const View = ({
    isFetching,
    data,
    getRequisition,
    initClientRequisition,
  }) => {
    const { id } = useParams();
    const [Active,setActive] = useState([]);
    const addSections =(sectionID)=>{
        let sections =[...Active];

        if(sections.includes(sectionID)){
            sections.splice(sections.indexOf(sectionID),1)
        }
        else{
            sections.push(sectionID);
        }
        setActive(sections);

    }
    const [createNote, setCreateNote] = useState(false);
    useEffect(() => {
      initClientRequisition();
      getRequisition(id);
    }, [getRequisition, initClientRequisition, id]);

    console.log('helo',data);                                            

    return (
        <div className="health_insurance_main">
            <div className="">
                <LoadingIndicator isLoading={isFetching } /> 
                <h1>Requisition: Life Insurance Agent </h1>
                <div className="requ_list">
                    <ul>
                        <li><span>Quantity Needed:</span> 40</li>
                        <li><span>Client:</span> Insurance, Inc.</li>
                        <li><span>Posted:</span> 10/28/2021</li>
                    </ul>
                </div>
            </div>                    
            <div id="accordion" className="record_accordion">
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
                                    <p>{data.get_recruiter ? data.get_recruiter.username : ''}</p>
                                </div>
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card elite_health">
                                    <label>Hiring Manager</label>
                                    <p>{data.hiring_manager}</p>
                                </div>
                                <div className="health_card elite_health">
                                    <label>Other Recruiter</label>
                                    <p>{data?.get_other_recruiter ? data.get_other_recruiter.username : ''}</p>
                                </div>
                                <div className="health_card elite_health"></div>
                                
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="card">
                        <div class="card-header" id="headingTwo">
                            <h2 class="mb-0">
                                <button class="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={()=>{addSections(2)}}>
                                <span>Analytics Summary <a href="requisition-edit.html"><img src="/images/edit_icon.png" alt=""/></a></span>
                                <span class="fa-stack">
                                <i class={Active.includes(2)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                                </span>
                                </button>
                            </h2>
                        </div>
                        <div id="collapseTwo" class={Active.includes(2)?"collapse show":"collapse"} aria-labelledby="headingTwo" data-parent="#accordion" >
                            <div class="card-body px-0">
                                <div class="analytics_tab_card border-0 p-0">
                                    <div class="">
                                    <div class="row">
                                        <div class="col-md-7">
                                            <div class="row">
                                                <div class="col-md-8">
                                                <ul class="navbar-nav mr-auto">
                                                    
                                                    <li class="nav-item dropdown">
                                                        <a class="nav-link bk dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Requisitions
                                                        </a>
                                                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                                            <a class="dropdown-item" href="#">Action</a>
                                                            <a class="dropdown-item" href="#">Another action</a>
                                                            <div class="dropdown-divider"></div>
                                                            <a class="dropdown-item" href="#">Something else here</a>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </div>
                                                <div class="col-md-4">
                                                <ul class="navbar-nav mr-auto">
                                                    <li class="nav-item dropdown">
                                                        <a class="nav-link bk  " href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Jobvite Sent
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-8">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="analytics_card">
                                                            <span class="job_category_icon"><img src="/images/cat_icon1.png" alt=""/></span>
                                                            <h5>Filled Positions</h5>
                                                            <p>( 1 open position )</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="analytics_card">
                                                            <span class="job_category_icon"><img src="/images/cat_icon2.png" alt=""/></span>
                                                            <h5>Days Open</h5>
                                                            <p>( 1 open position )</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="analytics_card">
                                                            <span class="job_category_icon"><img src="/images/cat_icon3.png" alt=""/></span>
                                                            <h5>Direct</h5>
                                                            <p>( 1 open position )</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="analytics_card">
                                                            <span class="job_category_icon"><img src="/images/cat_icon4.png" alt=""/></span>
                                                            <h5>Active Candidates</h5>
                                                            <p>( 1 open position )</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                                <div class="col-md-4">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="analytics_card">
                                                            <span class="job_category_icon"><img src="/images/cat_icon5.png" alt=""/></span>
                                                            <h5>Total Candidates</h5>
                                                            <p>( 1 open position )</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="analytics_card">
                                                            <span class="job_category_icon"><img src="/images/cat_icon6.png" alt=""/></span>
                                                            <h5>Broadcast</h5>
                                                            <p>( 1 open position )</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-5">
                                            <div>
                                                <h3>Filled Positions</h3>
                                            </div>
                                            <div class="pie_chart_box">
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
                                                    <th>Candidate Name</th>
                                                    <th>Job Title</th>
                                                    <th>Job Applied Date</th>
                                                    <th>Year of Experience</th>
                                                    <th>Employeement Type </th>
                                                    <th>Candidate Email</th>
                                                </tr>
                                                
                                            </thead>

                                            <tbody>
                                            
                                                {
                                                    
                                                    data.get_candidate_id_applied_for_requisition && data.get_candidate_id_applied_for_requisition.map((candidate) =>
                                                       { 
                                                       return(<tr>
                                                            <td><i className="fa fa-plus-circle" aria-hidden="true"></i>{candidate.get_candidate_detail.name}</td>
                                                            <td>{candidate.job_title} </td>
                                                            <td> {moment(candidate.created_at).format('MM/DD/YYYY')} </td>
                                                            <td>{candidate.year_of_experience} </td>
                                                            <td>{candidate.full_time_part_time} </td>
                                                            <td>{candidate.email} </td>
                                                        </tr>)}
                                                    )
                                                    
                                                } 
                                                    
                                                
                                            </tbody>
                                        </table>
                                    </div> 
                                </div>
                            </div>
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
                                    </div>
                                </div>                          
                            </div>
                        </div>
                    </div>
                    
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
                                        <p>{data.general_primary_address}</p>
                                    </div>
                                    <div className="health_card elite_health">
                                        <label>Phone</label>
                                        <p>{data.company_phone}</p>
                                    </div>
                                    <div className="health_card elite_health">
                                        <label>Email</label>
                                        <p>{data.company_email}</p>
                                    </div>
                                </div>
                                <div className="d-md-flex justify-content-between">
                                    <div className="health_card elite_health">
                                        <label>Non-Residents </label>
                                        <p>{data.general_non_residents}</p>
                                    </div>
                                    <div className="health_card elite_health">
                                        <label>Need to have AHIP?</label>
                                        <p>{data.general_need_AHIP}</p>
                                    </div>
                                    <div className="health_card elite_health">
                                        <label>Type of Insurance Sales</label>
                                        <p>{data.general_products_carriers}</p>
                                    </div>
                                </div>
                                <div className="d-md-flex justify-content-between">
                                    <div className="health_card elite_health">
                                        <label>Appointment Info</label>
                                        <p>{data.general_appointment_info}</p>
                                    </div>
                                    <div className="health_card elite_health">
                                        <label>Hours/Schedule</label>
                                        <p>{data.general_hours_schedule}</p>
                                    </div>
                                    <div className="health_card elite_health">
                                        <label>Which Products &amp; Carriers </label>
                                        <p>{data.general_base_pay}</p>
                                    </div>
                                </div>
                                <div className="d-md-flex justify-content-between">
                                    <div className="health_card elite_health">
                                        <label>Bonus Plan</label>
                                        <p>{data.general_bonus_plan}</p>
                                    </div>
                                    
                                    <div className="health_card elite_health">
                                        <label>Minimum Experience</label>
                                        <p>{data.general_minimum_experience}</p>
                                    </div>
                                    <div className="health_card elite_health">
                                        <label>Base Pay</label>
                                        <p>{data.general_base_pay}</p>
                                    </div>
                                </div>
                                
                                <div className="d-md-flex justify-content-between">
                                    <div className="health_card elite_health">
                                        <label>Training</label>
                                        <p>{data.general_training}</p>
                                    </div>
                                    
                                    <div className="health_card elite_health">
                                        <label>Inbound/Outbound</label>
                                        <p>{data.general_inbound_outbound}</p>
                                    </div>
                                    <div className="health_card elite_health">
                                        <label>Technology</label>
                                        <p>{data.general_technology}</p>
                                    </div>
                                </div>
                                
                                <div className="d-md-flex justify-content-between">
                                    <div className="health_card elite_health">
                                        <label>Openings</label>
                                        <p>{data.general_openings}</p>
                                    </div>
                                    
                                    <div className="health_card elite_health">
                                        <label>Apply Form (Preview)</label>
                                        <p>{data.general_apply_form}</p>
                                    </div>
                                    <div className="health_card elite_health">
                                        <label>Schedule for Phone Interview</label>
                                        <p>{data.general_schedule_phone_interview}</p>

                                    </div>
                                </div>
                                <div className="d-md-flex justify-content-between">
                                    <div className="health_card elite_health">
                                        <label>Time off Requested</label>
                                        <p>{data.general_time_off_requested}</p>
                                    </div>
                                    
                                    <div className="health_card elite_health">
                                        
                                    </div>
                                    <div className="health_card elite_health">
                                        

                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div> 
                    
                    
                    
                    <div className="card">
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
                    </div>
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
        </div>
    )
}

const mapStateToProps = store => ({
        data: store.rootReducer.clientRequisitions.data,
        isFetching: store.rootReducer.clientRequisitions.isFetching,
    });
    
const mapDispatchToProps = dispatch => bindActionCreators({
    initClientRequisition,
    getRequisition,
}, dispatch);
    
  
export default connect(mapStateToProps, mapDispatchToProps)(View);
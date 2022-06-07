import React, { useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { getJobDetail } from 'store/actions/jobSearch';

import LoadingIndicator from 'components/Common/LoadingIndicator';
  
const JobDetail = ({
    isFetchingList,
    items,
    data,
    getJobDetail,
    
  }) => {
    const
     { id } = useParams();

    useEffect(() => {      
       getJobDetail(id);
    }, [getJobDetail, id]);

    return (
        <>
            <h4 className="style_h4 mt-4">Assistant Bank Manager</h4>
            <LoadingIndicator isLoading={isFetchingList} /> 
            <div className="out_border_wrapper">
                <div className="row ">
                    <div className="col-md-3">
                        <div className="assistant_details pt-0">
                            <img src="/images/assistant_icon_6.png" alt=""/>
                            <h6><strong>Location: </strong>{data.location}</h6>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="assistant_details pt-md-0">
                            <img src="/images/assistant_icon_5.png" alt=""/>
                            <h6><strong>Job Type: </strong>{data.job_type}</h6>
                            
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="assistant_details pt-md-0">
                            <img src="/images/assistant_icon_8.png" alt=""/>
                            <h6><strong>Post Date: </strong>
                            {" " + new Date(data.updated_at).toLocaleString('default', { month: 'short' }) +" "+ new Date(data.updated_at).getDate() +", "+ new Date(data.updated_at).getFullYear() }
                            </h6>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="assistant_details pt-md-0">
                            <img src="/images/assistant_icon_1.png" alt=""/>
                            <h6><strong>Job Title: </strong>{data.title}</h6>
                            
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="assistant_details">
                            <img src="/images/assistant_icon_3.png" alt=""/>
                            <h6><strong>Offered Salary: </strong>$ 50 - 70k</h6>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="assistant_details">
                            <img src="/images/assistant_icon_2.png" alt=""/>
                            <h6><strong>Industry: </strong>Bank</h6>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="assistant_details">
                            <img src="/images/assistant_icon_7.png" alt=""/>
                            <h6><strong>Qualification: </strong>Bachelor’s Degree</h6>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="assistant_details">
                        <img src="/images/assistant_icon_4.png" alt=""/>
                            <h6><strong>Experience: </strong>2 Years</h6>
                        </div>
                    </div>
                </div>
                <div className="assistant_manager_section job_detail_body mt-0">
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Job Description:</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia derunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritati.
                                
                                <br/><br/>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium. <a href="#"> More
View job posting</a>
                            </p>
                            <h3>Recommended Skills:</h3>
                            <ul className="skilltags m-0">
                                <li>Accounting</li>
                                <li>Tally</li>
                                <li>Database managment</li>
                                <li>Accounting</li>
                                <li>Tally</li>
                            </ul>
                            <h3>Our Values</h3>
                            <ul className="Responsibilit_list">
                                <li>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna exercitation ullamco laboris nisi ut aliquip ex ea commodo aliqua. 
                                </li>
                                <li>
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                </li>
                                <li>                                        
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat exercitation ullamco laboris nisi ut aliquip ex ea commodo cupidatat.
                                </li>
                                <li>
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
                                    
                                </li>
                                <li>
                                    Totam rem aperiam, eaque ipsa quae ab illo exercitation ullamco laboris nisi ut aliquip ex ea commodo inventore veritati.
                                
                                </li>
                            </ul>
                            <h3>Hiring Process</h3>
                            <ul className="Responsibilit_list">
                                <li>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna exercitation ullamco laboris nisi ut aliquip ex ea commodo aliqua. 
                                </li>
                                <li>
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                </li>
                                <li>                                        
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat exercitation ullamco laboris nisi ut aliquip ex ea commodo cupidatat.
                                </li>
                                <li>
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
                                    
                                </li>
                                <li>
                                    Totam rem aperiam, eaque ipsa quae ab illo exercitation ullamco laboris nisi ut aliquip ex ea commodo inventore veritati.
                                
                                </li>
                            </ul>
                            <div className="apply_job_card d-md-flex justify-content-between align-items-center">
                                <div>
                                    <h3 className="mt-0 pt-0">Apply to this job</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing esse cillum dolore eu fugiat nulla pariatur elit.</p>
                                </div>
                                <Link to={`/admin/job/application/start/${id}`} ><button className="apply_btn" type="button">Apply Now</button></Link>
                            </div>
                            <div className="job_share_card d-md-flex align-items-center">
                                <h3 className="mt-0 py-0">Share it:</h3>
                                <ul className="social_icons">
                                    <li><a href="#"><img src="/images/fb_icon_2.png" alt=""/></a></li>
                                    <li><a href="#"><img src="/images/insta_icon_2.png" alt=""/></a></li>
                                    <li><a href="#"><img src="/images/twitter_icon_2.png" alt=""/></a></li>
                                    <li><a href="#"><img src="/images/linkedin_icon_2.png" alt=""/></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="map_section">
                    <div className="d-flex justify-content-between">
                        <h6>Similar Jobs</h6>
                    </div>
                </div>
                <div className="assistant_manager_section job_detail_body mt-0">
                    <div className="assistant_body p-0">                        
                        <div className="row">
                            <div className="col-md-12">                                
                                

                                {
                                    !!data.requisition_category && data.requisition_category.map((requisition, index) => {

                                        return (
                                            <div key={index} className="account_form_section">
                                                <div className="job_list_card d-md-flex justify-content-between align-items-center">
                                                    <div className="d-md-flex align-items-center">
                                                        <span className="job_icon"><img src="/images/job_logo.png" alt=""/></span>
                                                        <div className="job_info">
                                                            <h6>{   moment(requisition.created_at).fromNow()}</h6>
                                                        

                                                            <h3><a href="#">{requisition.title}</a></h3>
                                                            <div className="bank_details">
                                                                <p><img src="/images/bag_icon_2.png" alt=""/>ABCD Bank</p>
                                                                <p><img src="/images/clock_icon.png" alt=""/> {requisition.job_type} <span>$ 22k/M</span></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Link className="apply_btn" to={`/admin/job/details/${requisition.id}`} type="button">View Details</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </div>    
        </>
    )
}


const mapStateToProps = store => ({
    data: store.rootReducer.jobSearch.data,
    isFetchingList: store.rootReducer.jobSearch.isFetchingList,
    
}); 

const mapDispatchToProps = dispatch => bindActionCreators({
    getJobDetail,
    
}, dispatch);


   
export default connect(mapStateToProps, mapDispatchToProps)(JobDetail);
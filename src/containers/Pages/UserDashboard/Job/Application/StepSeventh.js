import React from 'react'

export default function StepSeventh({setStep , data, editApplyJob, handlePost}) {
    
    return (
        <>
            <h4 className="style_h4 mt-4">Job Application - Bank Manager</h4>
            <div className="out_border_wrapper">
                    <div className="status_bar_section d-flex align-items-center justify-content-between">
                        <ul className="d-md-flex">
                            <li className="done"><a href="#">Autofill with Resume</a></li>                                                
                            <li className="done"><a href="#">My Information</a></li>
                            <li className="done"><a href="#">My Experience</a></li>
                            <li className="done"><a href="#">Application Questions</a></li>
                            <li className="done"><a href="#">Voluntary Disclosure</a></li>
                            <li className="done"><a href="#">Self Identify</a></li>

                        </ul>
                        <button className="all_btn_style" type="button">Review</button>
                    </div>
                    <div className="assistant_manager_section job_detail_body mt-3">
                        <h3 className="text-center">Review</h3>
                    </div>
                    <div id="accordion" className="record_accordion">
                        <div className="card">
                            <div className="card-header" id="headingOne">
                              <h2 className="mb-0">
                                
                                 <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                  <span>My Information <a href="job-application-step2.html"><img src="/images/edit_icon.png" alt=""/></a></span>
                                  <span className="fa-stack">
                                      <i className="fa fa-minus" aria-hidden="true"></i>
                                  </span>
                                </button>
                              </h2>
                            </div>
                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion" >
                            
                                 <div className="d-md-flex justify-content-between">
                                    <div className="health_card">
                                        <label>Name</label>
                                        <p>{data.name}</p>
                                    </div>
                                    <div className="health_card">
                                        <label>Phone</label>
                                        <p>{data.phone}</p>
                                    </div>
                                    <div className="health_card">
                                        <label>Email</label>
                                        <p>{data.email}</p>
                                        
                                    </div>                                
                                </div>
                                <div className="d-md-flex justify-content-between">
                                    <div className="health_card">
                                        <label>Address</label>
                                        <p>{data.address}</p>
                                    </div>
                                    <div className="health_card">
                                        <label>City</label>
                                        <p>{data.city}</p>
                                    </div>
                                    <div className="health_card">
                                        <label>State</label>
                                        <p>{data.state} </p>
                                    </div>                                
                                </div>
								<div className="d-md-flex justify-content-between">
                                    <div className="health_card">
                                        <label>How did you hear about us?</label>
                                        <p>{data.how_did_you_hear_about_us}</p>
                                    </div>
                                
                                </div>

                                <div className="health_card w-100">
                                    <label>Have you ever worked for ABCD Bank Inc. and/or affiliates or subsidiaries before as an Associate, Intern, or Contractor?</label>
                                    <p>{data.how_did_you_hear_about_us == 'on'? data.how_did_you_hear_about_us : 'No' }</p>
                                </div>
                            </div>
                            
                        </div>
                          <div className="card">
                            <div className="card-header" id="headingTwo">
                              <h2 className="mb-0">
                                <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    <span>My Experience<a href="job-application-step3.html"><img src="/images/edit_icon.png" alt=""/></a></span>
                                  <span className="fa-stack">
                                      <i className="fa fa-plus" aria-hidden="true"></i>
                                  </span>
                                </button>
                              </h2>
                            </div>
                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion" >
                            
                              <div className="card-body px-0">
                                <div className="d-md-flex justify-content-between">
                                    <div className="health_card">
                                        <label>Company Name</label>
                                        <p>{data.company_name}</p>
                                    </div>
                                    <div className="health_card">
                                        <label>Job Title</label>
                                        <p>{data.job_title}</p>
                                    </div>
                                    <div className="health_card">
                                        <label>Years of Experience</label>
                                        <p>{data.year_of_experience}</p>
                                        
                                    </div>                                
                                </div>
                                <div className="health_card w-100">
                                    <label>Key Achievements</label>
                                    <p className="font-weight-normal">
                                      {data.key_achievments}  
                                    </p>
                                </div>
                                <div className="health_card w-100">
                                    <label>Resume</label>
                                    <div className="file_docmt">
                                        <div className="file_cut">
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
                                        </div>
                                    </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header" id="headingFive">
                              <h2 className="mb-0">
                                <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                    <span>Application Questions <a href="job-application-step4.html"><img src="/images/edit_icon.png" alt=""/></a></span>
                                  <span className="fa-stack">
                                      <i className="fa fa-plus" aria-hidden="true"></i>
                                  </span>
                                </button>
                              </h2>
                            </div>
                            <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#accordion">
                              <div className="card-body px-0">
                                <div className="health_card w-100">
                                    <label>How did you hear about us?</label>
                                    <p>{data.how_did_you_hear_about_us}</p>
                                </div>
                                <div className="health_card w-100">
                                    <label>Have you ever worked for ABCD Bank Inc. and/or affiliates or subsidiaries before as an Associate, Intern, or Contractor?</label>
                                    <p>{data.how_did_you_hear_about_us == 'on' ? data.how_did_you_hear_about_us : 'No'}</p>
                                </div>
                                <div className="health_card w-100">
                                    <label>Are you interested in full-time employment, part-time or either?</label>
                                    <p>{data.full_time_part_time}</p>
                                </div>
                                <div className="health_card w-100">
                                    <label>When’s the earliest you can start working with us?</label>
                                    <p>{data.When_the_earliest_you_can_start_working_with_us}</p>
                                </div>
                                <div className="health_card w-100">
                                    <label>Are you willing to undertake a drug test as part of this hiring process?</label>
                                    <p>{data.Are_you_willing_to_undertake_a_drug_test_as_part_of_this_hiring_process == 'on' ?
                                      data.Are_you_willing_to_undertake_a_drug_test_as_part_of_this_hiring_process :
                                      'No' }</p>
                                </div>
                                <div className="health_card w-100">
                                    <label>Why did you apply for this position?</label>
                                    <p className="font-weight-normal">
                                      {data.Why_did_you_apply_for_this_position}   
                                    </p>
                                </div>
                                <div className="health_card w-100">
                                    <label>Why would you like to work with our company?</label>
                                    <p className="font-weight-normal">
                                      {data.Why_would_you_like_to_work_with_our_company}  
                                    </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header" id="headingThree">
                              <h2 className="mb-0">
                                <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    <span>Voluntary Disclosures <a href="job-application-step5.html"><img src="/images/edit_icon.png" alt=""/></a></span>
                                  <span className="fa-stack">
                                      <i className="fa fa-plus" aria-hidden="true"></i>
                                  </span>
                                </button>
                              </h2>
                            </div>
                            <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                <div className="card-body p-0">
                                    <div className="health_card w-100">
                                        <p className="font-weight-normal">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accultrices gravida. Risus cus vel facilisis. I dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. 
                                        </p>
                                    </div>    
                                    <div className="add_profile_img"><h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h6></div> 
                                    <div className="recruiter_check">
                                        
                                          <div className="custom-control custom-checkbox">
                                          
                                            <label className="custom-control-label font-weight-normal" for="customCheck4">{data.disclosure}</label>
                                          </div>
                                          
                                    </div>                 
                                </div>
                            </div>
                          </div>
                          <div className="card">
                                <div className="card-header" id="headingfour">
                                  <h2 className="mb-0">
                                    <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapsefour" aria-expanded="false" aria-controls="collapsefour">
                                        <span>Self Identify <a href="job-application-step6.html"><img src="/images/edit_icon.png" alt=""/></a></span>
                                      <span className="fa-stack">
                                          <i className="fa fa-plus" aria-hidden="true"></i>
                                      </span>
                                    </button>
                                  </h2>
                                </div>
                                <div id="collapsefour" className="collapse" aria-labelledby="headingfour" data-parent="#accordion">
                                  <div className="card-body">
                                    <div className="health_card w-100">
                                        <p className="font-weight-normal">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accultrices gravida. Risus cus vel facilisis. I dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. 
                                        </p>
                                    </div>
                                    <div className="d-md-flex justify-content-between">
                                        <div className="health_card">
                                            <label>Sex</label>
                                            <p>{data.gender}</p>
                                        </div>
                                        <div className="health_card">
                                            <label>DOB</label>
                                            <p>{data.dob}</p>
                                        </div>
                                        <div className="health_card"></div>                                
                                    </div>
                                    <div className="health_card">
                                        <label>Ethnic Background :</label>
                                           
                                        <p className="" for="">
                                          {data.ethnic_background}
                                        </p>
                                            
                                    </div>
                                  </div>
                                </div>
                              </div>
                             
                        </div>
                    
                    <div className="d-flex justify-content-center ">
                        <div className="account_form_style d-flex align-items-center mt-4">
                            <button className="cancel m-0 mr-3" onClick={() => {setStep(6)}} type="button">Cancel</button>
                            <button className="m-0" onClick={handlePost} type="button">Submit</button>                            
                        </div>
                    </div>
                </div>  
        </>
    )
}

import React from 'react'

export default function Second() {
    return (
        <div className="analytics_content_main">
                    <div>
                        <nav>
                            <div className="nav nav-tabs ml-2" id="nav-tab" role="tablist">
                              <a className="nav-item nav-link" id="nav-home-tab" data-toggle="tab" href="#nav-Summary" role="tab" aria-controls="nav-Summary" aria-selected="true">Summary</a>
                              <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-Details" role="tab" aria-controls="nav-Details" aria-selected="false">Details</a>
                              <a className="nav-item nav-link" id="nav-Notes-tab" data-toggle="tab" href="#nav-Notes" role="tab" aria-controls="nav-Notes" aria-selected="false">Notes</a>
                              <a className="nav-item nav-link" id="nav-Activity-tab" data-toggle="tab" href="#nav-Activity" role="tab" aria-controls="nav-Activity" aria-selected="false">Activity</a>
                              <a className="nav-item nav-link active" id="nav-Classes-tab" data-toggle="tab" href="#nav-Classes" role="tab" aria-controls="nav-Classes" aria-selected="false">Classes</a>
                            </div>
                          </nav>
                          <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade" id="nav-Summary" role="tabpanel" aria-labelledby="nav-home-tab">
                                <div className="analytics_tab_card">
                                    <div className="row">
                                        <div className="col-md-7">
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <h3 className="d-flex align-items-center">Requisition Analytics Summary <i className="fa fa-caret-down ml-2" aria-hidden="true"></i></h3>
                                                </div>
                                                <div className="col-md-4">
                                                    <h3>Jobvite Sent</h3>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <div className="row mr-1">
                                                        <div className="col-md-6">
                                                            <div className="analytics_card">
                                                                <span><img src="/images/filled_icon.png" alt=""/></span>
                                                                <h5>1/3</h5>
                                                                <h6 className="green">Filled Positions</h6>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="analytics_card">
                                                                <span><img src="/images/job_icon.png" alt=""/></span>
                                                                <h5>5</h5>
                                                                <h6>Days Open</h6>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="analytics_card">
                                                                <span><img src="/images/job_icon.png" alt=""/></span>
                                                                <h5>1/3</h5>
                                                                <h6>Active Candidates</h6>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="analytics_card">
                                                                <span><img src="/images/filled_icon.png" alt=""/></span>
                                                                <h5>5</h5>
                                                                <h6 className="blue">Total Candidate</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="row mr-1">
                                                        <div className="col-md-12">
                                                            <div className="analytics_card">
                                                                <span><img src="/images/filled_icon.png" alt=""/></span>
                                                                <h5>0/3</h5>
                                                                <h6>Direct</h6>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="analytics_card">
                                                                <span><img src="/images/job_icon.png" alt=""/></span>
                                                                <h5>0/3</h5>
                                                                <h6 className="green">Broadcast</h6>
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
                                                <img src="/images/pie_chart.png" alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="workflow_step_section">
                                        <h3>Candidates by Workflow Step</h3>
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
                                    </div>
                                    <div className="my_coustomer_table">
                                        <div className="table-responsive w_bg">
                                            <table className="table table-condensed mb-0" style={{borderCollapse:"collapse"}}>
                                                <thead>
                                                    <tr>
                                                        <th>Candidates</th>
                                                        <th>Current Workflow</th>
                                                        <th>Interview Dates</th>
                                                        <th>Current Workflow </th>
                                                        <th>Interview Dates</th>
                                                        <th>Interview Dates</th>
                                                    </tr>
													
                                                </thead>

                                                <tbody>
                                                    <tr>
                                                        <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021</td>                                                
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021</td>
                                                        <td>10/04/2021</td>
                                                    </tr>
                                                    <tr>
                                                        <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021</td>                                                
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021</td>
                                                        <td>10/04/2021</td>
                                                    </tr>
                                                    <tr>
                                                        <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021</td>                                                
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021</td>
                                                        <td>10/04/2021</td>
                                                    </tr>
                                                    <tr>
                                                        <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021</td>                                                
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021</td>
                                                        <td>10/04/2021</td>
                                                    </tr>
                                                    <tr>
                                                        <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021</td>                                                
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021</td>
                                                        <td>10/04/2021</td>
                                                    </tr>
                                                    <tr>
                                                        <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021</td>                                                
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021</td>
                                                        <td>10/04/2021</td>
                                                    </tr>
                                                    <tr>
                                                        <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021</td>                                                
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021</td>
                                                        <td>10/04/2021</td>
                                                    </tr>
                                                    <tr>
                                                        <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021</td>                                                
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021</td>
                                                        <td>10/04/2021</td>
                                                    </tr>
                                                    <tr>
                                                        <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021</td>                                                
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021</td>
                                                        <td>10/04/2021</td>
                                                    </tr>
                                                    <tr>
                                                        <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021</td>                                                
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021</td>
                                                        <td>10/04/2021</td>
                                                    </tr>
                                                    <tr>
                                                        <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021</td>                                                
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021</td>
                                                        <td>10/04/2021</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="nav-Details" role="tabpanel" aria-labelledby="nav-profile-tab">
                                <div className="health_insurance_main mt-0 details_text">
								<div className="d-flex justify-content-end mb-2">
								
								 <button className="apply_btn" onclick="document.location='client_details_edit.html'">Edit</button> 
								</div>
                                    <h4 className="mt-0">Requisition Posting Options</h4>
                                    <div className="d-md-flex justify-content-between">
                                        <div className="health_card">
                                            <label>Posting Type</label>
                                        </div>
                                        <div className="health_card">
                                            <label>Limited Acess</label>
                                        </div>
                                        <div className="health_card">
                                            <label>Pulishing Options</label>
                                        </div>
                                    </div>
                                    <h4>Requisition Details</h4>
                                    <div className="d-md-flex justify-content-between">
                                        <div className="health_card">
                                            <label>Title</label>
                                            <p>Elite Health Insurance</p>
                                        </div>
                                        <div className="health_card">
                                            <label>Job Type</label>
                                            <p>Fill-Time</p>
                                        </div>
                                        <div className="health_card">
                                            <label>Compensation</label>
                                            <p>343</p>
                                        </div>
                                    </div>
                                    <div className="d-md-flex justify-content-between">
                                        <div className="health_card">
                                            <label>Category</label>
                                            <p>Sale</p>
                                        </div>
                                        <div className="health_card">
                                            <label>Deparment</label>
                                            <p>General Sale</p>
                                        </div>
                                        <div className="health_card">
                                            <label>Location</label>
                                            <p>Clearwater, FL (Primary)</p>
                                        </div>
                                    </div>
                                    <div className="d-md-flex justify-content-between">
                                        <div className="health_card">
                                            <label>City</label>
                                            <p>Clearwater</p>
                                        </div>
                                        <div className="health_card">
                                            <label>State / Region</label>
                                            <p>Florida</p>
                                        </div>
                                        <div className="health_card">
                                            <label>Zip / Postal Code</label>
                                            <p>33763</p>
                                        </div>
                                    </div>
                                    <div className="d-md-flex justify-content-between">
                                        <div className="health_card">
                                            <label>Start Date</label>
                                            <p>05/10/2021</p>
                                        </div>
                                        <div className="health_card">
                                            <label>End Date</label>
                                            <p>25/10/2021</p>
                                        </div>
                                        <div className="health_card">
                                            <label>Evaluation Form</label>
                                            <p>Elite Phone Interview</p>
                                        </div>
                                    </div>
                                    <div className="d-md-flex justify-content-between">
                                        <div className="health_card">
                                            <label>Pre-Interview Form</label>
                                            <p>Employment Application</p>
                                        </div>
                                        <div className="health_card">
                                            <label></label>
                                            <p></p>
                                        </div>
                                        <div className="health_card">
                                            <label></label>
                                            <p></p>
                                        </div>
                                    </div>
                                    <h4>Recruiter Details</h4>
                                    <div className="d-md-flex justify-content-between">
                                        <div className="health_card">
                                            <label>Recruiter Name</label>
                                            <p>
                                                Rani Jones (Primary) <br></br>
                                                Casie Rahe<br></br>
                                                Emma Beitton-Kant<br></br>
                                                Gina DeLello
                                            </p>
                                        </div>
                                       
                                        <div className="health_card">
                                            <label></label>
                                            <p></p>
                                        </div>
                                    </div>
                                    <h4>Description</h4>
                                    <div className="health_card w-100">
                                        <label>
                                            Kevin and his brother Aaron have owned a successful P&amp; C agency for 14+ years. They have decided to start a health agency, so this is a 
new operation with experience Insurance agency owners at the top.
                                        </label>
                                    </div>
                                    <div className="d-md-flex justify-content-between">
                                        <div className="health_card">
                                            <label>Company Name</label>
                                            <p>Elite Health Insurance</p>
                                        </div>
                                        <div className="health_card">
                                            <label>Phone</label>
                                            <p>727-247-5219</p>
                                        </div>
                                        <div className="health_card">
                                            <label>Email</label>
                                            <p>Kevin@mail.com</p>
                                        </div>
                                    </div>
                                    <div className="d-md-flex justify-content-between">
                                        <div className="health_card">
                                            <label>Primary Address</label>
                                            <p>24600 US HWY 19, Clearwater, Florida 33763</p>
                                        </div>
                                        <div className="health_card">
                                            <label>Contact</label>
                                            <p>Kevin Penny</p>
                                        </div>
                                        <div className="health_card">
                                            <label>Benefits</label>
                                            <p>None currently. We add next year.</p>
                                        </div>
                                    </div>
                                    <div className="d-md-flex justify-content-between">
                                        <div className="health_card">
                                            <label>Base Pay</label>
                                            <p>$20 per hour</p>
                                        </div>
                                        <div className="health_card">
                                            <label>Bonus Plan</label>
                                            <p> $50 per policy sold</p>
                                        </div>
                                        <div className="health_card">
                                            <label>Benefits</label>
                                            <p>None currently. We add next year.</p>
                                        </div>
                                    </div>
                                    <div className="d-md-flex justify-content-between">
                                        <div className="health_card">
                                            <label>Training</label>
                                            <p>Online</p>
                                        </div>
                                        <div className="health_card">
                                            <label>Minim # years of exp in health?</label>
                                            <p>U65 exp but not required</p>
                                        </div>
                                        <div className="health_card">
                                            <label>Benefits</label>
                                            <p>None currently. We add next year.</p>
                                        </div>
                                    </div>
                                    <div className="d-md-flex justify-content-between">
                                        <div className="health_card">
                                            <label>Type of insurance Sales &amp; License</label>
                                            <p>U65, Ministry Plan &amp; Ancillaries<br></br>
                                                No AHIP needed. Heath License 2-40, 2-15</p>
                                        </div>
                                        <div className="health_card">
                                            <label>Hours / Schedules</label>
                                            <p>M-F-10AM-6PM <br></br>
                                                Flexibe on schedules</p>
                                        </div>
                                        <div className="health_card">
                                            <label>States</label>
                                            <p>Currently sell in 7 states <br></br>
                                                FL, AL, KY, NY, NC, SC, PA</p>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="d-md-flex justify-content-between">
                                        <div className="health_card">
                                            <label>Openings</label>
                                            <p>55</p>
                                        </div>
                                        <div className="health_card">
                                            <label>Apply Form <a className="ml-3" href="#">Preview</a></label>
                                            <p>Default form</p>
                                        </div>
                                        <div className="health_card">
                                            <label></label>
                                            <p></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                             <div className="tab-pane" id="nav-Notes" role="tabpanel" aria-labelledby="nav-Notes-tab">
                                <div className="notes_tab_info">
								<div className="d-flex justify-content-end mb-2"><div className="health_card">
                                            <label className="d-flex justify-content-end"><a className="text-decoration-none" href="client_notes_create.html"><i className="fa fa-plus-circle" aria-hidden="true"></i> Create New Notes</a></label>
                                            
                                            
                                        </div></div>
                                    <div className="notes_tab_card">
                                        <h4>Lorem Ipsum is simply dummy text    <span>0/11/2021 1:33 PM </span><a href="#">&nbsp;&nbsp;&nbsp; Edit</a></h4>
                                        <p>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of it to make a type specimen book.
                                        </p>
                                    </div>
                                    <div className="notes_tab_card">
                                        <h4>Lorem Ipsum is simply dummy text    <span>0/11/2021 1:33 PM</span><a href="#">&nbsp;&nbsp;&nbsp; Edit</a></h4>
                                        <p>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of it to make a type specimen book.
                                        </p>
                                    </div>
                                    <div className="notes_tab_card">
                                        <h4>Lorem Ipsum is simply dummy text    <span>0/11/2021 1:33 PM</span><a href="#">&nbsp;&nbsp;&nbsp; Edit</a></h4>
                                        <p>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of it to make a type specimen book.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="nav-Activity" role="tabpanel" aria-labelledby="nav-Activity-tab">
                                <div className="activity_tab_info">
                                    <h4 className="d-flex justify-content-between">Activities <small>1 - 15 of 15</small></h4>
                                    <div className="activity_tab_card d-flex justify-content-between">
                                        <p>Casie sent a message Re: Your Application with Clear Source, to John for Lorem Ipsum is simply dummy text of the printing <a href="#">Elite Health Insurance</a></p>
                                        <p><span>10/11/2021 1:33 PM</span></p>
                                    </div>
                                    <div className="activity_tab_card d-flex justify-content-between">
                                        <p>Casie sent a message Re: Your Application with Clear Source, to John for Lorem Ipsum is simply dummy text of the printing <a href="#">Elite Health Insurance</a></p>
                                        <p><span>10/11/2021 1:33 PM</span></p>
                                    </div>
                                    <div className="activity_tab_card d-flex justify-content-between">
                                        <p>Casie sent a message Re: Your Application with Clear Source, to John for Lorem Ipsum is simply dummy text of the printing <a href="#">Elite Health Insurance</a></p>
                                        <p><span>10/11/2021 1:33 PM</span></p>
                                    </div>
                                    <div className="activity_tab_card d-flex justify-content-between">
                                        <p>Casie sent a message Re: Your Application with Clear Source, to John for Lorem Ipsum is simply dummy text of the printing <a href="#">Elite Health Insurance</a></p>
                                        <p><span>10/11/2021 1:33 PM</span></p>
                                    </div>
                                    <div className="activity_tab_card d-flex justify-content-between">
                                        <p>Casie sent a message Re: Your Application with Clear Source, to John for Lorem Ipsum is simply dummy text of the printing <a href="#">Elite Health Insurance</a></p>
                                        <p><span>10/11/2021 1:33 PM</span></p>
                                    </div>
                                    <div className="activity_tab_card d-flex justify-content-between">
                                        <p>Casie sent a message Re: Your Application with Clear Source, to John for Lorem Ipsum is simply dummy text of the printing <a href="#">Elite Health Insurance</a></p>
                                        <p><span>10/11/2021 1:33 PM</span></p>
                                    </div>
                                    <div className="activity_tab_card d-flex justify-content-between">
                                        <p>Casie sent a message Re: Your Application with Clear Source, to John for Lorem Ipsum is simply dummy text of the printing <a href="#">Elite Health Insurance</a></p>
                                        <p><span>10/11/2021 1:33 PM</span></p>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="tab-pane fade show active" id="nav-Classes" role="tabpanel" aria-labelledby="nav-Classes-tab">
                                <div className="classes_tab_info">
                                    
                                    <div className="row">
                                        <div className="col-md-6">
										
										<h4>Calendar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a className="text-decoration-none" href="#"><i className="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;Create New Class</a></h4>
                                            <div className="calendar_area">
                                            <div className="calendar">
        
                                              <header>
                                          
                                                <h2>April 2021</h2>
                                          
                                                <a className="btn-prev" href="#"><img src="/images/left_arrow_3.png" alt=""/></a>
                                                <a className="btn-next" href="#"><img src="/images/right_arrow_3.png" alt=""/></a>
                                          
                                              </header>
                                          
                                              <table className="w-100">
                                          
                                                <thead>
                                          
                                                  <tr>
                                          
                                                    <td>MON</td>
                                                    <td>TUE</td>
                                                    <td>WED</td>
                                                    <td>THU</td>
                                                    <td>FRI</td>
                                                    <td>SAT</td>
                                                    <td>SUN</td>
                                          
                                                  </tr>
                                          
                                                </thead>
                                          
                                                <tbody>
                                          
                                                  <tr>
                                                    <td className="prev-month"><span>26</span> </td>
                                                    <td className="prev-month"><span>27</span></td>
                                                    <td className="prev-month"><span>28</span></td>
                                                    <td className="prev-month"><span>29</span></td>
                                                    <td className="prev-month"><span>30</span></td>
                                                    <td className="prev-month"><span>31</span></td>
                                                    <td><span>1</span></td>
                                                  </tr>
                                                  <tr>
                                                    <td><span>2</span></td>
                                                    <td><span>3</span></td>
                                                    <td><span>4</span></td>
                                                    <td><span>5</span></td>
                                                    <td><span>6</span></td>
                                                    <td><span>7</span></td>
                                                    <td><span>8</span></td>
                                                  </tr>
                                                  <tr>
                                                    <td><span>9</span></td>
                                                    <td className="event"><span>10</span></td>
                                                    <td><span>11</span></td>
                                                    <td><span>12</span></td>
                                                    <td><span>13</span></td>
                                                    <td><span>14</span></td>
                                                    <td><span>15</span></td>
                                                  </tr>
                                                  <tr>
                                                    <td><span>16</span></td>
                                                    <td><span>17</span></td>
                                                    <td><span>18</span></td>
                                                    <td><span>19</span></td>
                                                    <td><span>20</span></td>
                                                    <td className="event"><span>21</span></td>
                                                    <td><span>22</span></td>
                                                  </tr>
                                          
                                                  <tr>
                                                    <td className="current-day event mob_d_none"><span><a href="complimentary_meeting_step1.html">23</a></span></td>
                                                    <td className="current-day event dsk_d_none"><span><a href="complimentary_meeting_step1-mob.html">23</a></span></td>
                                                    <td><span>24</span></td>
                                                    <td><span>25</span></td>
                                                    <td><span>26</span></td>
                                                    <td><span>27</span></td>
                                                    <td><span>28</span></td>
                                                    <td><span>29</span></td>
                                                  </tr>
                                                  <tr>
                                                    <td><span>30</span></td>
                                                    <td className="next-month"><span>1</span></td>
                                                    <td className="next-month"><span>2</span></td>
                                                    <td className="next-month"><span>3</span></td>
                                                    <td className="next-month"><span>4</span></td>
                                                    <td className="next-month"><span>5</span></td>
                                                    <td className="next-month"><span>6</span></td>
                                                  </tr>
                                          
                                                </tbody>
                                          
                                              </table>
                                          
                                            </div> 
                                          </div>
                                        </div>
                                        <div className="col-md-6">
										<h4> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a className="text-decoration-none" href="add_candidate.html"><i className="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;Add a Candidate</a></h4>
                                            <div className="my_coustomer_table m-0">
                                                <div className="table-responsive w_bg">
                                                    <table className="table table-condensed mb-0" style={{borderCollapse:"collapse"}}>
                                                        <thead>
                                                            <tr>
                                                                <th>Candidates</th>
                                                                <th>Current <br></br>Workflow</th>
                                                                <th>Interview <br></br>Date/Time</th>
																<th>Interviewing<br></br> With</th>
																
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                 <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td> 
															   <td>Britney Williamsss</td>
                                                                <td>Phone Interview</td>
                                                                <td>10/04/2021<br></br> 10:00 AM</td> 
																<td>Jhone Smith</td>																
                                                            </tr>
                                                            <tr>
                                                                <td>Britney Williams</td>
                                                                <td>Phone Interview</td>
                                                                <td>10/04/2021<br></br> 10:00 AM</td> 
																<td>Jhone Smith</td>																
																
                                                            </tr>
                                                            <tr>
                                                                <td>Britney Williams</td>
                                                                <td>Phone Interview</td>
                                                                <td>10/04/2021<br></br> 10:00 AM</td>  
																<td>Jhone Smith</td>																
                                                            </tr>
                                                            <tr>
                                                                <td>Britney Williams</td>
                                                                <td>Phone Interview</td>
                                                                <td>10/04/2021<br></br> 10:00 AM</td> 
																<td>Jhone Smith</td>																
                                                            </tr>
                                                            <tr>
                                                               <td>Britney Williams</td>
                                                                <td>Phone Interview</td>
                                                                <td>10/04/2021<br></br> 10:00 AM</td>  
																<td>Jhone Smith</td>																
                                                            </tr>
                                                            <tr>
                                                                <td>Britney Williams</td>
                                                                <td>Phone Interview</td>
                                                                <td>10/04/2021<br></br> 10:00 AM</td> 
																	<td>Jhone Smith</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Britney Williams</td>
                                                                <td>Phone Interview</td>
                                                                <td>10/04/2021<br></br> 10:00 AM</td> 
																	<td>Jhone Smith</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Britney Williams</td>
                                                                <td>Phone Interview</td>
                                                                <td>10/04/2021<br></br> 10:00 AM</td> 
																	<td>Jhone Smith</td>
                                                            </tr>
															 <tr>
                                                                <td>Britney Williams</td>
                                                                <td>Phone Interview</td>
                                                                <td>10/04/2021<br></br> 10:00 AM</td> 
																	<td>Jhone Smith</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Britney Williams</td>
                                                                <td>Phone Interview</td>
                                                                <td>10/04/2021<br></br> 10:00 AM</td> 
																<td>Jhone Smith</td>																
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          </div>
                    </div>
                </div>
    )
}

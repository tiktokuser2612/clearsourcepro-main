import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import NoteCreate from './LowerInner/Notes/Create'
import NoteList from './LowerInner/Notes/List'

export default function LowerPart() {
    const [createNote, setCreateNote] = useState(false);
    const [listNote, setListNote] = useState(true);
    const openCreateNote = () => {
        
        setListNote(false);
        setCreateNote(true);
    }
    return (
        <div className="analytics_content_main">
            <div>
                <nav>
                    <div className="nav nav-tabs ml-2" id="nav-tab" role="tablist">
                        <a className="nav-item nav-link" id="nav-home-tab" data-toggle="tab" href="#nav-Summary" role="tab" aria-controls="nav-Summary" aria-selected="true">Summary</a>
                        <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-Details" role="tab" aria-controls="nav-Details" aria-selected="false">Details</a>
                        <a className="nav-item nav-link" id="nav-Notes-tab" data-toggle="tab" href="#nav-Notes" role="tab" aria-controls="nav-Notes" aria-selected="false">Notes</a>
                        <a className="nav-item nav-link active" id="nav-Activity-tab" data-toggle="tab" href="#nav-Activity" role="tab" aria-controls="nav-Activity" aria-selected="true">Activity</a>
                        <a className="nav-item nav-link " id="nav-Classes-tab" data-toggle="tab" href="#nav-Classes" role="tab" aria-controls="nav-Classes" aria-selected="false">Classes</a>
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
                                                        <span><img src="/images/cat_icon1.png" alt=""/></span>
                                                        <h5>Total Candidate</h5>
                                                        <p>( 1 open position )</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="analytics_card">
                                                        <span><img src="/images/cat_icon2.png" alt=""/></span>
                                                        <h5>Broadcast</h5>
                                                        <p>( 1 open position )</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="analytics_card">
                                                        <span><img src="/images/cat_icon3.png" alt=""/></span>
                                                        <h5>Active Candidates</h5>
                                                        <h6>Active Candidates</h6>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="analytics_card">
                                                        <span><img src="/images/cat_icon4.png" alt=""/></span>
                                                        <h5>Direct</h5>
                                                        <h6 className="blue">Total Candidate</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="row mr-1">
                                                <div className="col-md-12">
                                                    <div className="analytics_card">
                                                        <span><img src="/images/cat_icon5.png" alt=""/></span>
                                                        <h5>Days Open</h5>
                                                        <p>( 1 open position )</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="analytics_card">
                                                        <span><img src="/images/cat_icon6.png" alt=""/></span>
                                                        <h5>Filled Positions</h5>
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
                                    <table className="table table-condensed mb-0" style={{ borderCollapse: "collapse"}}>
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
                                    <input type="text"/>
                                </div>
                                <div className="health_card">
                                    <label>Limited Acess</label>
                                    <input type="text"/>
                                </div>
                                <div className="health_card">
                                    <label>Pulishing Options</label>
                                    <input type="text"/>
                                </div>
                            </div>
                            <h4>Requisition Details</h4>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card">
                                    <label>Title</label>
                                    <input type="text"/>
                                </div>
                                <div className="health_card">
                                    <label>Job Type</label>
                                    <input type="text"/>
                                </div>
                                <div className="health_card">
                                    <label>Compensation</label>
                                    <input type="text"/>
                                </div>
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card">
                                    <label>Category</label>
                                    <input type="text"/>
                                </div>
                                <div className="health_card">
                                    <label>Deparment</label>
                                    <input type="text"/>
                                </div>
                                <div className="health_card">
                                    <label>Location</label>
                                    <input type="text"/>
                                </div>
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card">
                                    <label>City</label>
                                    <input type="text"/>
                                </div>
                                <div className="health_card">
                                    <label>State / Region</label>
                                    <input type="text"/>
                                </div>
                                <div className="health_card">
                                    <label>Zip / Postal Code</label>
                                    <input type="text"/>
                                </div>
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card">
                                    <label>Start Date</label>
                                    <input type="text"/>
                                </div>
                                <div className="health_card">
                                    <label>End Date</label>
                                    <input type="text"/>
                                </div>
                                <div className="health_card">
                                    <label>Evaluation Form</label>
                                    <input type="text"/>
                                </div>
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card">
                                    <label>Pre-Interview Form</label>
                                    <input type="text"/>
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
                                    <label className="d-flex justify-content-between">Recruiter Name <a className="text-decoration-none" href="#"><i className="fa fa-plus-circle" aria-hidden="true"></i> Add More</a></label>
                                    <input type="text"/>
                                    <p>
                                        Rani Jones (Primary) <br/>
                                        Casie Rahe <br/>
                                        
                                    </p>
                                </div>
                                
                                <div className="health_card">
                                    <label></label>
                                    <p></p>
                                </div>
                            </div>
                            <h4>Description</h4>
                            <div className="health_card w-100">
                                <label> Description</label>
                                <textarea>Kevin and his brother Aaron have owned a successful P&amp; C agency for 14+ years. They have decided to start a health agency, so this is a new operation with experience Insurance agency owners at the top.</textarea>
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card">
                                    <label>Company Name</label>
                                    <input type="text"/>
                                </div>
                                <div className="health_card">
                                    <label>Phone</label>
                                    <input type="text"/>
                                </div>
                                <div className="health_card">
                                    <label>Email</label>
                                    <input type="text"/>
                                </div>
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card">
                                    <label>Primary Address</label>
                                    <input type="text"/>
                                </div>
                                <div className="health_card">
                                    <label>Contact</label>
                                    <input type="text"/>
                                </div>
                                <div className="health_card">
                                    <label>Benefits</label>
                                    <input type="text"/>
                                </div>
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card">
                                    <label>Base Pay</label>
                                    <input type="text"/>
                                </div>
                                <div className="health_card">
                                    <label>Bonus Plan</label>
                                    <input type="text"/>
                                </div>
                                <div className="health_card">
                                    <label>Benefits</label>
                                    <input type="text"/>
                                </div>
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card">
                                    <label>Training</label>
                                    <input type="text"/>
                                </div>
                                <div className="health_card">
                                    <label>Minim # years of exp in health?</label>
                                    <input type="text"/>
                                </div>
                                <div className="health_card">
                                    <label>Benefits</label>
                                    <input type="text"/>
                                </div>
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card">
                                    <label>Type of insurance Sales &amp; License</label>
                                    <input type="text"/>
                                </div>
                                <div className="health_card">
                                    <label>Hours / Schedules</label>
                                    <input type="text"/>
                                </div>
                                <div className="health_card">
                                    <label className="d-flex justify-content-between">States <a className="text-decoration-none" href="#"><i className="fa fa-plus-circle" aria-hidden="true"></i> Add More</a></label>
                                    <input placeholder="FL" type="text"/>
                                    <p>AL, KY, NY,NC <i className="fa fa-times-circle" aria-hidden="true"></i>
                                    </p>
                                </div>
                                
                            </div>
                            
                        <div className="d-md-flex justify-content-between">
                                
                                <div className="health_card">
                                    <label className="d-flex justify-content-between">Bonus Plan <a className="text-decoration-none" href="#"><i className="fa fa-upload" aria-hidden="true"></i> Upload Docs</a></label>
                                    <input placeholder="$50 per policy sold" type="text"/>
                                    <p></p><div className="d-flex align-items-center justify-content-around mt-3">
                                <div className="text-center">
                                    <img src="/images/report-img.png" alt=""/> <br/>
                                    
                                </div>
                                <div className="text-center">
                                    <img src="/images/report-img.png" alt=""/><br/>
                                    
                                </div>
                                <div className="text-center">
                                    <img src="/images/report-img.png" alt=""/><br/>
                                    
                                </div>
                                <div className="text-center">
                                    <img src="/images/report-img.png" alt=""/><br/>
                                    
                                </div>
                            </div>
                                    <p></p>
                                </div>
                                
                            </div>
                            <hr/>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card">
                                    <label>Openings</label>
                                    <input type="text"/>
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
                            <div className="d-flex justify-content-end mb-2">
                                <div className="health_card">
                                    <label className="d-flex justify-content-end">
                                        <Link to="/admin/clients/create" className="text-decoration-none" onClick={openCreateNote} ><i className="fa fa-plus-circle" aria-hidden="true"></i> Create New Notes</Link>
                                    </label>
                                    
                                </div>
                            </div>
                            {createNote ?  <NoteCreate/> : <NoteList />}
                         

                        </div>
                    </div>
                    <div className="tab-pane fade active show" id="nav-Activity" role="tabpanel" aria-labelledby="nav-Activity-tab">
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
                    <div className="tab-pane fade" id="nav-Classes" role="tabpanel" aria-labelledby="nav-Classes-tab">
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
                                    <div className="my_coustomer_table m-0">
                                        <div className="table-responsive w_bg">
                                            <table className="table table-condensed mb-0" style={{ borderCollapse:"collapse" }}>
                                                <thead>
                                                    <tr>
                                                        <th>Candidates</th>
                                                        <th>Current <br/>Workflow</th>
                                                        <th>Interview <br/>Date/Time</th>
                                                        <th>Interviewing<br/> With</th>
                                                        
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        
                                                        <td>Britney Williamsss</td>
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021<br/> 10:00 AM</td> 
                                                        <td>Jhone Smith</td>																
                                                    </tr>
                                                    <tr>
                                                        <td>Britney Williams</td>
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021<br/> 10:00 AM</td> 
                                                        <td>Jhone Smith</td>																
                                                        
                                                    </tr>
                                                    <tr>
                                                        <td>Britney Williams</td>
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021<br/> 10:00 AM</td>  
                                                        <td>Jhone Smith</td>																
                                                    </tr>
                                                    <tr>
                                                        <td>Britney Williams</td>
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021<br/> 10:00 AM</td> 
                                                        <td>Jhone Smith</td>																
                                                    </tr>
                                                    <tr>
                                                        <td>Britney Williams</td>
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021<br/> 10:00 AM</td>  
                                                        <td>Jhone Smith</td>																
                                                    </tr>
                                                    <tr>
                                                        <td>Britney Williams</td>
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021<br/> 10:00 AM</td> 
                                                            <td>Jhone Smith</td>															<td>Jhone Smith</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Britney Williams</td>
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021<br/> 10:00 AM</td> 
                                                            <td>Jhone Smith</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Britney Williams</td>
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021<br/> 10:00 AM</td> 
                                                            <td>Jhone Smith</td>
                                                    </tr>
                                                        <tr>
                                                        <td>Britney Williams</td>
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021<br/> 10:00 AM</td> 
                                                            <td>Jhone Smith</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Britney Williams</td>
                                                        <td>Phone Interview</td>
                                                        <td>10/04/2021<br/> 10:00 AM</td> 
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

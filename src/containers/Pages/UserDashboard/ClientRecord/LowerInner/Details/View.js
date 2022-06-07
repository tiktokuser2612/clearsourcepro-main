import React from 'react'

export default function View() {
    return (
        <div className="tab-pane fade active show" id="nav-Details" role="tabpanel" aria-labelledby="nav-profile-tab">
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
                        Rani Jones (Primary) <br/>
                        Casie Rahe<br/>
                        Emma Beitton-Kant<br/>
                        Gina DeLello
                        </p>
                    </div>
                    <div className="health_card">
                        <label>Hiring Manager</label>
                        <p>Rani Jones (Primary) <br/>
                        Emma Britton-Kant
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
                        <p>U65, Ministry Plan &amp; Ancillaries<br/>
                        No AHIP needed. Heath License 2-40, 2-15
                        </p>
                    </div>
                    <div className="health_card">
                        <label>Hours / Schedules</label>
                        <p>M-F-10AM-6PM <br/>
                        Flexibe on schedules
                        </p>
                    </div>
                    <div className="health_card">
                        <label>States</label>
                        <p>Currently sell in 7 states <br/>
                        FL, AL, KY, NY, NC, SC, PA
                        </p>
                    </div>
                </div>
                <hr/>
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
    )
}

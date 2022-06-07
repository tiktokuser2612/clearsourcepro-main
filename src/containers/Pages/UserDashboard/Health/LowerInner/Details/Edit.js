import React from 'react'

export default function Edit() {
    return (
        <div className="tab-pane fade active show" id="nav-Details" role="tabpanel" aria-labelledby="nav-profile-tab">
            <div className="health_insurance_main mt-0 details_text">
                <div className="d-flex justify-content-end mb-2"><button className="apply_btn">Edit</button></div>
                <h4 className="mt-0">Requisition Posting Options</h4>
                <div className="d-md-flex justify-content-between">
                    <div className="health_card"><label>Posting Type</label><input type="text"/></div>
                    <div className="health_card"><label>Limited Acess</label><input type="text"/></div>
                    <div className="health_card"><label>Pulishing Options</label><input type="text"/></div>
                </div>
                <h4>Requisition Details</h4>
                <div className="d-md-flex justify-content-between">
                    <div className="health_card"><label>Title</label><input type="text"/></div>
                    <div className="health_card"><label>Job Type</label><input type="text"/></div>
                    <div className="health_card"><label>Compensation</label><input type="text"/></div>
                </div>
                <div className="d-md-flex justify-content-between">
                    <div className="health_card"><label>Category</label><input type="text"/></div>
                    <div className="health_card"><label>Deparment</label><input type="text"/></div>
                    <div className="health_card"><label>Location</label><input type="text"/></div>
                </div>
                <div className="d-md-flex justify-content-between">
                    <div className="health_card"><label>City</label><input type="text"/></div>
                    <div className="health_card"><label>State / Region</label><input type="text"/></div>
                    <div className="health_card"><label>Zip / Postal Code</label><input type="text"/></div>
                </div>
                <div className="d-md-flex justify-content-between">
                    <div className="health_card"><label>Start Date</label><input type="text"/></div>
                    <div className="health_card"><label>End Date</label><input type="text"/></div>
                    <div className="health_card"><label>Evaluation Form</label><input type="text"/></div>
                </div>
                <div className="d-md-flex justify-content-between">
                    <div className="health_card"><label>Pre-Interview Form</label><input type="text"/></div>
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
                        <label className="d-flex justify-content-between">Recruiter Name <a className="text-decoration-none" href="#"><i className="fa fa-plus-circle" aria-hidden="true"></i> Add More</a></label><input type="text"/>
                        <p>Rani Jones (Primary) <br/>Casie Rahe <br/></p>
                    </div>
                    <div className="health_card">
                        <label></label>
                        <p></p>
                    </div>
                </div>
                <h4>Description</h4>
                <div className="health_card w-100"><label> Description</label><textarea>Kevin and his brother Aaron have owned a successful P&amp; C agency for 14+ years. They have decided to start a health agency, so this is a new operation with experience Insurance agency owners at the top.</textarea></div>
                <div className="d-md-flex justify-content-between">
                    <div className="health_card"><label>Company Name</label><input type="text"/></div>
                    <div className="health_card"><label>Phone</label><input type="text"/></div>
                    <div className="health_card"><label>Email</label><input type="text"/></div>
                </div>
                <div className="d-md-flex justify-content-between">
                    <div className="health_card"><label>Primary Address</label><input type="text"/></div>
                    <div className="health_card"><label>Contact</label><input type="text"/></div>
                    <div className="health_card"><label>Benefits</label><input type="text"/></div>
                </div>
                <div className="d-md-flex justify-content-between">
                    <div className="health_card"><label>Base Pay</label><input type="text"/></div>
                    <div className="health_card"><label>Bonus Plan</label><input type="text"/></div>
                    <div className="health_card"><label>Benefits</label><input type="text"/></div>
                </div>
                <div className="d-md-flex justify-content-between">
                    <div className="health_card"><label>Training</label><input type="text"/></div>
                    <div className="health_card"><label>Minim # years of exp in health?</label><input type="text"/></div>
                    <div className="health_card"><label>Benefits</label><input type="text"/></div>
                </div>
                <div className="d-md-flex justify-content-between">
                    <div className="health_card"><label>Type of insurance Sales &amp; License</label><input type="text"/></div>
                    <div className="health_card"><label>Hours / Schedules</label><input type="text"/></div>
                    <div className="health_card">
                        <label className="d-flex justify-content-between">States <a className="text-decoration-none" href="#"><i className="fa fa-plus-circle" aria-hidden="true"></i> Add More</a></label><input placeholder="FL" type="text"/>
                        <p>AL, KY, NY,NC <i className="fa fa-times-circle" aria-hidden="true"></i></p>
                    </div>
                </div>
                <div className="d-md-flex justify-content-between">
                    <div className="health_card">
                        <label className="d-flex justify-content-between">Bonus Plan <a className="text-decoration-none" href="#"><i className="fa fa-upload" aria-hidden="true"></i> Upload Docs</a></label><input placeholder="$50 per policy sold" type="text"/>
                        <p></p>
                        <div className="d-flex align-items-center justify-content-around mt-3">
                        <div className="text-center"><img src="/images/report-img.png" alt=""/> <br/></div>
                        <div className="text-center"><img src="/images/report-img.png" alt=""/><br/></div>
                        <div className="text-center"><img src="/images/report-img.png" alt=""/><br/></div>
                        <div className="text-center"><img src="/images/report-img.png" alt=""/><br/></div>
                        </div>
                        <p></p>
                    </div>
                </div>
                <hr/>
                <div className="d-md-flex justify-content-between">
                    <div className="health_card"><label>Openings</label><input type="text"/></div>
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

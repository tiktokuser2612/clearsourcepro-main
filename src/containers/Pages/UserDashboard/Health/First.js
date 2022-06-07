import React from 'react'

export default function First() {
    return (
        <div className="health_insurance_main">
            <h1>Elite Health Insurance <a href="client_summary_edit.html">Edit</a></h1>
            <div className="d-md-flex justify-content-between">
                <div className="health_card">
                    <label>Current Status</label>
                    <p className="green">Open</p>
                </div>
                <div className="health_card">
                    <label>Locations (s)</label>
                    <p> Clearwater, FL</p>
                </div>
                <div className="health_card">
                    <label>Posting Type</label>
                    <p>Limited Access</p>
                </div>
                <div className="health_card">
                    <label>Created 09/10/2021</label>
                    <label>Updated 09/10/2021</label>
                </div>
                <div className="health_card text-right mt-0">
                    <button className="button" type="button">Add Candidate</button> <br></br>
                    <button className="button green" type="button">Help for this Page</button>
                </div>
            </div>
            <div className="d-md-flex">
                <div className="health_card">
                    <label>Role Title</label>
                    <p>Administrator</p>
                </div>
                <div className="health_card">
                    <label>Salary Range</label>
                    <p>60k - 70k</p>
                </div>
                <div className="health_card">
                    <label>Base Pay</label>
                    <p>$20 per hour</p>
                </div>
                
            </div>
                <div className="d-md-flex">
                
                <div className="health_card">
                    <label>Hour / Schedule</label>
                    <p>M-F-10AM-6PM</p>
                </div>
                <div className="health_card">
                    <label>Bonus Plan</label>
                    <p>$50 per policy sold</p>
                </div>
            </div>
            <div>
                <div className="health_card w-100">
                    <label>Role Summary for Ideal Candidate.</label>
                    <p className="body_text">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                         Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                         when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                        It was popularised in the 1960s with the release of Letraset 
                        sheets containing Lorem Ipsum passages,
                         and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div> 
                <div className="header_top_section my-3">
                    <ul className="header_top_links">
                        <li className="m-0"><a href="#">Select Hires</a></li>
                        <li><a href="#">Close</a></li>
                        <li><a href="#">Hold</a></li>
                        <li><a href="#">Copy</a></li>
                    </ul>
                </div>
                <button className="apply_btn" type="button">View all candidates</button>
            </div>
        </div>
    )
}

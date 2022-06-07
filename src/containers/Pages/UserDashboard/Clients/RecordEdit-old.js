import React from 'react'

export default function EditView() {
    return (
        <div className="health_insurance_main">
            <h1>Client Record</h1>
            <div className="d-md-flex justify-content-between">
                <div className="health_card elite_health">
                    <label>Company Name</label>
                
                    <input placeholder="Elite Health Insurance" type="text"/>
                </div>
                <div className="health_card elite_health">
                    <label>Company Type/Industry</label>
                    <div className="custom-select">
                        <select>
                            <option>Finance</option>
                            <option>Finance</option>
                            <option>Finance</option>
                        </select>
                    <div className="select-selected">Finance</div><div className="select-items select-hide"><div>Finance</div><div>Finance</div></div></div> 
                </div>
                <div className="health_card elite_health">
                    <label>Company Website</label>
                    <input placeholder="Company Website" type="text"/>
                </div>
            </div>
            <div className="d-md-flex justify-content-between">
                <div className="health_card elite_health">
                    <label>Hours of Operation</label>
                    <input placeholder="9AM-6PM-M-F" type="text"/>
                    
                </div>
                <div className="health_card elite_health">
                    <label>Years in Business</label>
                
                    <input placeholder="10 years" type="text"/>
                </div>
                <div className="health_card elite_health">
                    <label>Primary Contact Name</label>
                    
                    <input placeholder="John Smith" type="text"/>
                </div>
            </div>
            <div className="d-md-flex justify-content-between">
                <div className="health_card elite_health">
                    <label>Primary Contact Title</label>
                
                    <input placeholder="Admin" type="text"/>
                </div>
                <div className="health_card elite_health">
                    <label>Primary Phone</label>
                    
                    <input placeholder="888-777-2345" type="text"/>
                </div>
                <div className="health_card elite_health">
                    <label>Primary Email</label>
                    <input placeholder="contact@email.com" type="text"/>
                    
                </div>
            </div>
            <div className="d-md-flex justify-content-between">
                <div className="health_card elite_health">
                    <label>Corp/Primary Address</label>
                    <div className="custom-select">
                        <select>
                            <option>Clearwaater, FI (Primary)</option>
                            <option>Clearwaater, FI (Primary)</option>
                            <option>Clearwaater, FI (Primary)</option>
                        </select>
                    <div className="select-selected">Clearwaater, FI (Primary)</div><div className="select-items select-hide"><div>Clearwaater, FI (Primary)</div><div>Clearwaater, FI (Primary)</div></div></div> 
                </div>
                <div className="health_card elite_health">
                    <label>Locations</label>
                    <input placeholder="Clearwaater, FI (Primary)" type="text"/>
                </div>
                <div className="health_card elite_health">
                    <label></label>
                    <p></p>
                </div>
            </div>
            <div id="accordion" className="record_accordion">
                <div className="card">
                    <div className="card-header" id="headingOne">
                        <h2 className="mb-0">
                            <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            <span>Requisitions <img src="./images/edit_icon.png" alt=""/> </span> 
                            <span className="fa-stack fa-sm">
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </span>
                            </button>
                        </h2>
                    </div>
                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
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
                            <div className="my_coustomer_table requisition_table">
                                <div className="table-responsive w_bg">
                                    <table className="table table-condensed mb-0" style={{borderCollapse:"collapse"}}>
                                        <thead>
                                            <tr>
                                                <th>Requisition title</th>
                                                <th>New</th>
                                                <th>Submitted to hiring manager</th>
                                                <th>Offer Sent</th>
                                                <th>Rejected</th>
                                                <th>Active</th>
                                            </tr>
                                            
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                                <td>24</td>
                                                <td>0</td>                                                
                                                <td>87</td>
                                                <td>9</td>
                                                <td>6</td>
                                            </tr>
                                            <tr>
                                                <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                                <td>24</td>
                                                <td>0</td>                                                
                                                <td>87</td>
                                                <td>9</td>
                                                <td>6</td>
                                            </tr>
                                            <tr>
                                                <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                                <td>24</td>
                                                <td>0</td>                                                
                                                <td>87</td>
                                                <td>9</td>
                                                <td>6</td>
                                            </tr>
                                            <tr>
                                                <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                                <td>24</td>
                                                <td>0</td>                                                
                                                <td>87</td>
                                                <td>9</td>
                                                <td>6</td>
                                            </tr>
                                            <tr>
                                                <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                                <td>24</td>
                                                <td>0</td>                                                
                                                <td>87</td>
                                                <td>9</td>
                                                <td>6</td>
                                            </tr>
                                            <tr>
                                                <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                                <td>24</td>
                                                <td>0</td>                                                
                                                <td>87</td>
                                                <td>9</td>
                                                <td>6</td>
                                            </tr>
                                            <tr>
                                                <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                                <td>24</td>
                                                <td>0</td>                                                
                                                <td>87</td>
                                                <td>9</td>
                                                <td>6</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="headingTwo">
                        <h2 className="mb-0">
                            <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                <span>Hiring Manager(s) <img src="./images/edit_icon.png" alt=""/></span>
                            <span className="fa-stack">
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </span>
                            </button>
                        </h2>
                    </div>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body">
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card elite_health">
                                    <label>Name</label>
                                    <input placeholder="John Smith" type="text"/>
                                    
                                </div>
                                <div className="health_card elite_health">
                                    <label>Title</label>
                                    <input placeholder="Admin" type="text"/>
                                
                                </div>
                                <div className="health_card elite_health">
                                    <label>Phone</label>
                                    <input placeholder="888-777-2345" type="text" />
                                    
                                </div>
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card elite_health">
                                    <label>Email</label>
                                    <input placeholder="contact@email.com" type="text" />
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="headingThree">
                        <h2 className="mb-0">
                            <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                <span>Accounting/Billing Contact Info <img src="./images/edit_icon.png" alt=""/></span>
                            <span className="fa-stack">
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </span>
                            </button>
                        </h2>
                    </div>
                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                        <div className="card-body">
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card elite_health">
                                    <label>Contact Name</label>
                                    <input placeholder="John Smith" type="text" />
                                    <p></p>
                                </div>
                                <div className="health_card elite_health">
                                    <label>Phone</label>
                                    <input placeholder="888-777-2345" type="text"/>
                                    <p></p>
                                </div>
                                <div className="health_card elite_health">
                                    <label>Email</label>
                                    <input placeholder="contact@email.com" type="text" />
                                    
                                </div>
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card elite_health">
                                    <label>Address</label>
                                    <input placeholder="Clearwater, FI (Primary)" type="text"/>
                                    <p></p>
                                </div>
                                <div className="health_card elite_health">
                                    <label>City</label>
                                    <input placeholder="Clearwater" type="text"/>
                                    <p></p>
                                </div>
                                <div className="health_card elite_health">
                                    <label>State</label>
                                    <div className="custom-select">
                            <select>
                                <option>Select State</option>
                                <option>State</option>
                                <option>State</option>
                            </select>
                            <div className="select-selected">Select State</div><div className="select-items select-hide"><div>State</div><div>State</div></div></div> 
                                    
                                </div>
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card elite_health">
                                
                                    <label>Zip</label>
                                    <input placeholder="Clearwater, FI (Primary)" type="text"/>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="headingfour">
                        <h2 className="mb-0">
                            <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapsefour" aria-expanded="false" aria-controls="collapsefour">
                                <span>Description of Business <img src="./images/edit_icon.png" alt=""/></span>
                            <span className="fa-stack">
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </span>
                            </button>
                        </h2>
                    </div>
                    <div id="collapsefour" className="collapse" aria-labelledby="headingfour" data-parent="#accordion">
                        <div className="card-body px-0">
                            <div className="health_card w-100">
                                <div className="health_card w-100">
                                    <label>Role Summary for Ideal Candidate.</label>
                                    <textarea></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="headingfive">
                        <h2 className="mb-0">
                            <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapsefive" aria-expanded="false" aria-controls="collapsefive">
                                <span>Contacts <img src="./images/edit_icon.png" alt=""/></span>
                            <span className="fa-stack">
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </span>
                            </button>
                        </h2>
                    </div>
                    <div id="collapsefive" className="collapse" aria-labelledby="headingfive" data-parent="#accordion">
                        <div className="card-body px-0">
                            <div className="health_card w-100 d-flex justify-content-between mt-0">
                                <label>Contact List</label>
                                <a className="text-decoration-none" href="add_candidate.html"><i className="fa fa-upload" aria-hidden="true"></i>&nbsp;&nbsp;Upload Contact</a>
                            </div>
                            <div className="my_coustomer_table requisition_table">
                                <div className="table-responsive w_bg">
                                    <table className="table table-condensed mb-0" style={{borderCollapse:"collapse"}}>
                                        <thead>
                                            <tr>
                                                <th>Requisition title</th>
                                                <th>New</th>
                                                <th>Submitted to hiring manager</th>
                                                <th>Offer Sent</th>
                                                <th>Rejected</th>
                                                <th>Active</th>
                                            </tr>
                                            
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                                <td>24</td>
                                                <td>0</td>                                                
                                                <td>87</td>
                                                <td>9</td>
                                                <td>6</td>
                                            </tr>
                                            <tr>
                                                <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                                <td>24</td>
                                                <td>0</td>                                                
                                                <td>87</td>
                                                <td>9</td>
                                                <td>6</td>
                                            </tr>
                                            <tr>
                                                <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                                <td>24</td>
                                                <td>0</td>                                                
                                                <td>87</td>
                                                <td>9</td>
                                                <td>6</td>
                                            </tr>
                                            <tr>
                                                <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                                <td>24</td>
                                                <td>0</td>                                                
                                                <td>87</td>
                                                <td>9</td>
                                                <td>6</td>
                                            </tr>
                                            <tr>
                                                <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                                <td>24</td>
                                                <td>0</td>                                                
                                                <td>87</td>
                                                <td>9</td>
                                                <td>6</td>
                                            </tr>
                                            <tr>
                                                <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                                <td>24</td>
                                                <td>0</td>                                                
                                                <td>87</td>
                                                <td>9</td>
                                                <td>6</td>
                                            </tr>
                                            <tr>
                                                <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                                <td>24</td>
                                                <td>0</td>                                                
                                                <td>87</td>
                                                <td>9</td>
                                                <td>6</td>
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
    )
}

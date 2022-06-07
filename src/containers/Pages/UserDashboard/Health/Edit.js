import React from 'react'
import LowerPart from './LowerPart'

export default function Edit() {
    return (
        <>
            
            <div className="health_insurance_main">
                <h1>Edit Elite Health Insurance</h1>
                <div className="d-md-flex justify-content-between">
                    <div className="health_card elite_health">
                        <label>Current Status</label>
                        <div className="custom-select">
                            <select>
                                <option>Choose status</option>
                                <option>Open</option>
                                <option>Close</option>
                            </select>
                        <div className="select-selected">Choose status</div><div className="select-items select-hide"><div>Open</div><div>Close</div></div></div> 
                    </div>
                    <div className="health_card elite_health">
                        <label>Locations (s)</label>
                        <input type="text"/>
                    </div>
                    <div className="health_card elite_health">
                        <label>Posting Type</label>
                        <div className="custom-select">
                            <select>
                                <option>Choose posting type</option>
                                <option>Limited Access</option>
                                <option>Limited Access</option>
                            </select>
                        <div className="select-selected">Choose posting type</div><div className="select-items select-hide"><div>Limited Access</div><div>Limited Access</div></div></div> 
                    </div>
                
                </div>
                <div className="d-md-flex  justify-content-between">
                    <div className="health_card elite_health">
                        <label>Role Title</label>
                        <div className="custom-select">
                            <select>
                                <option>Choose role title</option>
                                <option>Admin</option>
                                <option>Admin</option>
                            </select>
                        <div className="select-selected">Choose role title</div><div className="select-items select-hide"><div>Admin</div><div>Admin</div></div></div> 
                    </div>
                    <div className="health_card elite_health">
                        <label>Salary Range</label>
                        <div className="custom-select">
                            <select>
                                <option>Choose salary range</option>
                                <option>$40K-$50K</option>
                                <option>$50K-$60K</option>
                            </select>
                        <div className="select-selected">Choose salary range</div><div className="select-items select-hide"><div>$40K-$50K</div><div>$50K-$60K</div></div></div> 
                    </div>
                    <div className="health_card elite_health">
                        <label> Base Pay  </label>
                        <input type="text"/>
                    </div>
                    
                </div>
                
                <div className="d-md-flex  justify-content-between">
                    <div className="health_card elite_health">
                        <label>  Hour / Schedule   </label>
                        <input type="text"/>
                    </div>
                    <div className="health_card elite_health">
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
                <div className="health_card elite_health"></div>
                </div>
                
                                    
                                    
                                
                <div>
                    <div className="health_card w-100">
                        <label>Role Summary for Ideal Candidate</label>
                        <textarea></textarea>
                    </div> 
                    <div className="account_form_style d-flex align-items-center mt-4">
                        <button className="update m-0" type="button">Update</button>
                        <button className=" m-0 ml-3" type="button">Cancel</button>
                    </div>
                </div>
            </div>
            <LowerPart/>                    
        </>
    )
}

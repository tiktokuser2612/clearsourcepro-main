import React from 'react'
import DatePicker from "react-datepicker";    
import "react-datepicker/dist/react-datepicker.css";  
import  {useState } from 'react';
import moment from 'moment';
import notifier from 'utils/notifier';

export default function StepThird( { setStep, data, editApplyJob , formData }) {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleChange = (key, value) => {
        
        if(startDate != null && endDate != null){

            let a = moment(endDate);
            let b = moment(startDate);
            a.diff(b, 'years');       // 1
            let years = a.diff(b, 'years', true);
            
            editApplyJob({ ['year_of_experience'] : Math.round(years * 10) / 10 });
        }
        editApplyJob({ [key] : value});
    };

    const handleNext = () => {
        // your validation here
        
        if(data.company_name == null|| data.company_name == ''){
            notifier.error('Please fill Company name');
            return;
        }
        if(data.job_title == null || data.job_title == ''){
            notifier.error('Please fill job Title');
            return;
        }
        if(data.key_achievments == null || data.key_achievments == ''){
            notifier.error('Please fill achievements');
            return;
        }
        if(data.year_of_experience == null || data.year_of_experience == ''){
            notifier.error('Please fill experience date');
            return;
        }       

        setStep(4)
    }

    return (
        <>          
            <h4 className="style_h4 mt-4">Job Application - Bank Manager</h4>
            <div className="out_border_wrapper" id="other_page_inputs">
                <div className="status_bar_section d-flex align-items-center justify-content-between">
                    <ul className="d-md-flex">
                        <li className="done"><a href="#">Autofill with Resume</a></li>                                                
                        <li className="done"><a href="#"> My Information</a></li>
                        <li className="process"><a href="#">My Experience</a></li>
                        <li><a href="#">Application Questions</a></li>
                        <li><a href="#">Voluntary Disclosure</a></li>
                        <li><a href="#">Self Identify</a></li>

                    </ul>
                    <button className="all_btn_style" type="button">Review</button>
                </div>
                <div className="assistant_manager_section job_detail_body mt-3">
                    <h3 className="text-center">My Experience</h3>
                </div>
                <div className="add_profile_img"><h6>* Indicates a requred fields</h6></div>
                <div className="d-md-flex justify-content-between">
                    <div className="health_card elite_health">
                        <label>Company Name *</label>
                        
                        <input 
                            placeholder="Enter Name" 
                            onChange={e => handleChange('company_name', e.target.value)} 
                            name='company_name' 
                            type="text"
                            defaultValue={data.company_name}    
                        />
                    </div>
                    <div className="health_card elite_health">
                        <label>Job Title *</label>
                        <input
                            placeholder="Enter Job Title" 
                            onChange={e => handleChange('job_title', e.target.value)}
                            name='job_title' 
                            type="text"
                            defaultValue={data.job_title}    
                        />
                    </div>
                    <div className="health_card elite_health">
                        <label>Years Experiences *</label>
                        <div className="d-flex align-items-center justify-content-between ">
                            <div className="health_card elite_health mt-0 w-50">
                                
                                <DatePicker 
                                    selected={startDate} 
                                    onChange={(date) => setStartDate(date)} 
                                    // onChange={(date) => handleChange('end_date', setEndDate(date))}
                                    maxDate={new Date()} 
                                    name='start_date'
                                    value={startDate}    
                                /> 
                                
                            </div>
                            <div className="px-2">to</div>
                                <div className="health_card elite_health mt-0 w-50">
                                    <DatePicker 
                                        selected={endDate} 
                                        // onChange={(date) => handleChange('end_date', setEndDate(date))}
                                        onChange={(date) => setEndDate(date)} 
                                        maxDate={new Date()} 
                                        name='end_date'
                                        defaultValue={endDate}
                                    />
                                </div>
                        </div>
                    </div>
                </div>
                
                <div className="d-md-flex justify-content-between">
                    <div className="health_card elite_health w-100">
                        <label>Key Achievments</label>
                        <textarea 
                            onChange={e => handleChange('key_achievments', e.target.value)} 
                            name='key_achievments'
                            defaultValue={data.key_achievments}    
                            /> 
                        {/* <a className="text-primary" href="#"><i className="fa fa-plus-circle" aria-hidden="true"></i> Add More Experiences</a> */}
                    </div>
                </div>
                <div className="d-flex justify-content-center" >
                    <div className="account_form_style d-flex align-items-center mt-4">
                        <button className="cancel m-0 mr-3" onClick={() => {setStep(2)}} type="button">Back</button>
                        <button className="m-0" onClick={handleNext} type="button">Save and Continue</button>                            
                    </div>
                </div>
            </div>
        
        </>
    )
}

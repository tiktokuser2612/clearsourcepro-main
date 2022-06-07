import React from 'react'
import DatePicker from "react-datepicker";    
import "react-datepicker/dist/react-datepicker.css";  
import  {useState } from 'react';
import moment from 'moment';
import notifier from 'utils/notifier';


export default function StepSixth({setStep  , data, editApplyJob , formData}) {

    const [startDate, setStartDate] = useState(new Date());

    const handleChange = (key, value) => {
        if(startDate) {
            editApplyJob({ ['dob'] : moment(startDate).format('MM/DD/YYYY')});
        }
        editApplyJob({ [key] : value});
    };


    const handleNext = () => {
        // your validation here
        
        if( data.gender == ''){
            notifier.error('Please select your Gender');
            return;
        }
        if( data.dob == ''){
            notifier.error('Please select Date of Birth');
            return;
        }
        if( data.ethnic_background == ''){
            notifier.error('Please select your Ethnic Background');
            return;
        }

        setStep(7)
    }

    const ethicBackground = [
        "Hispanic or Latino",
        "American Indian or Alaska Native",
        "Black or American African",
        "Asia (Not Hispanic or Latino)",
        "White (Not Hispanic or Latino)",
        "Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino)",
        "Two or more races (Not Hispanic or Latino)",
        "I choose not to provide race information",
    ]

    const gender = [
        'Male',
        'Female',
        'I choose not to provide my gender.',
    ]

    return (
        <>
            <h4 className="style_h4 mt-4">Job Application - Bank Manager</h4>
            <div className="out_border_wrapper">
                <div className="status_bar_section d-flex align-items-center justify-content-between">
                    <ul className="d-md-flex">
                        <li className="done"><a href="#">Autofill with Resume</a></li>                                                
                        <li className="done"><a href="#"> My Information</a></li>
                        <li className="done"><a href="#">My Experience</a></li>
                        <li className="done"><a href="#">Application Questions</a></li>
                        <li className="done"><a href="#">Voluntary Disclosure</a></li>
                        <li className="process"><a href="#">Self Identify</a></li>
                    </ul>
                    <button className="all_btn_style" type="button">Review</button>
                </div>
                <div className="assistant_manager_section job_detail_body mt-3">
                    <h3 className="text-center">Self Identify</h3>
                </div>
                <div className="add_profile_img"><h6>* Indicates a requred fields</h6></div>
                <div className="assistant_manager_section job_detail_body mt-0">
                    <p>
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic.
                    </p>
                </div>
                <div className="add_profile_img"><h6>Please check the appropriate boxes and complete the following entries.</h6></div>
                <div className="health_card elite_health w-100">
                    <div className="d-flex">
                        <div>
                            <label>Sex *</label>
                            <div className="recruiter_check d-flex">
                                

                            {
                                gender.map((item,index) => {
                                    return <div className="custom-control custom-checkbox" key={index}>
                                        <input type="checkbox" 
                                            onClick={v => {v.target.checked && handleChange('gender', item);}}
                                            checked={data.gender === item}
                                            className="custom-control-input" 
                                            id={`gender_${index}`}
                                        />
                                        <label className="custom-control-label" for={`gender_${index}`}>{item}</label>
                                    </div>
                                })
                            }
                                                                 
                            </div>
                        </div>
                        <div>
                            <label>DOB *</label>
                            <div className="health_card elite_health mt-0 w-100">
                                <DatePicker name='dob' format='yyyy-MM-dd' onChange={e => handleChange('dob', e.target.value)} selected={startDate} onChange={(date) => setStartDate(date)} maxDate={new Date()} /> 
                                
                                <img className="icon" src="/images/calander_icon_3.png" alt=""/>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="add_profile_img"><h6>Ethnic Background *</h6></div>
                <div className="recruiter_check">
                    {
                        ethicBackground.map((item,index) => {
                            return <div className="custom-control custom-checkbox" key={index}>
                                <input type="checkbox" 
                                    onClick={v => {v.target.checked && handleChange('ethnic_background', item);}}
                                    checked={data.ethnic_background === item}
                                    className="custom-control-input" 
                                    id={`eb_check_${index}`}
                                />
                                <label className="custom-control-label" for={`eb_check_${index}`}>{item}</label>
                            </div>
                        })
                    }
                </div>
                <div className="d-flex justify-content-center ">
                    <div className="account_form_style d-flex align-items-center mt-4">
                        <button className="cancel m-0 mr-3" onClick={() => {setStep(5)}} type="button">Back</button>
                        <button className="m-0" onClick={handleNext} type="button">Save and Continue</button>                            
                    </div>
                </div>
            </div>  
        </>
    )
}

import React , { useState } from 'react'
import notifier from 'utils/notifier';

export default function StepFourth({setStep , data, editApplyJob , formData}) {

    const handleChange = (key, value) => {
        editApplyJob({ [key] : value});
    };

    const handleNext = () => {
        // your validation here
        
        if(data.how_did_you_hear_about_us_four == null|| data.how_did_you_hear_about_us_four == ''){
            notifier.error('Please select first field');
            return;
        }
        if(data.contractor_four == null || data.contractor == ''){
            notifier.error('Please select second field');
            return;
        }
        if(data.full_time_part_time == null || data.full_time_part_time == ''){
            notifier.error('Please select employment option');
            return;
        }
        if(data.When_the_earliest_you_can_start_working_with_us == null || data.When_the_earliest_you_can_start_working_with_us == ''){
            notifier.error('Please select fourth field');
            return;
        }
        if(data.Are_you_willing_to_undertake_a_drug_test_as_part_of_this_hiring_process == null || data.Are_you_willing_to_undertake_a_drug_test_as_part_of_this_hiring_process == ''){
            notifier.error('Please choose Are you willing to undertake a drug test as part of this hiring process?');
            return;
        }
        if(data.Why_did_you_apply_for_this_position == null || data.Why_did_you_apply_for_this_position == ''){
            notifier.error('Please fill Why_did_you_apply_for_this_position');
            return;
        }
        if(data.Why_would_you_like_to_work_with_our_company == null || data.Why_would_you_like_to_work_with_our_company == ''){
            notifier.error('Please fill Why_would_you_like_to_work_with_our_company');
            return;
        }       

        setStep(5)
    }


    return (
        <>
            <h4 className="style_h4 mt-4">Job Application - Bank Manager</h4>
            <div className="out_border_wrapper">
                <div className="status_bar_section d-flex align-items-center justify-content-between">
                    <ul className="d-md-flex">
                        <li className="done"><a href="#">Autofill with Resume</a></li>                                                
                        <li className="done"><a href="#"> My Information</a></li>
                        <li className="done"><a href="#">My Experience</a></li>
                        <li className="process"><a href="#">Application Questions</a></li>
                        <li><a href="#">Voluntary Disclosure</a></li>
                        <li><a href="#">Self Identify</a></li>

                    </ul>
                    <button className="all_btn_style" type="button">Review</button>
                </div>
                <div className="assistant_manager_section job_detail_body mt-3">
                    <h3 className="text-center">Application Questions</h3>
                </div>
                <div className="add_profile_img"><h6>* Indicates a requred fields</h6></div>
                <div className="d-md-flex justify-content-between">
                    <div className="health_card elite_health">
                        <label>How did you hear about us? * </label>
                        
                        <div className="stateDropdown">
                            <select
                                defaultValue={data.how_did_you_hear_about_us_four} 
                                name='how_did_you_hear_about_us_four'
                                onChange={e => handleChange('how_did_you_hear_about_us_four', e.target.value)}
                                className="w-100 new_select so_dropdown" 
                                style={{ width: '100%' }}
                            >
                                <option value="null" >-- choose Option --</option>
                                <option value="Caree Fair - Branch" >Caree Fair - Branch</option>
                                <option value="Caree Fair - Branch" >Caree Fair - Branch</option>
                                <option value="Caree Fair - Branch" >Caree Fair - Branch</option>
                            </select>
                        </div>
                    </div>
                    <div className="health_card elite_health"></div>
                    <div className="health_card elite_health"></div>
                </div>
                <div className="health_card elite_health w-100">
                    <label>Have you ever worked for ABCD Bank Inc. and/or affiliates or subsidiaries before as an Associate, Intern, or contractor_four? *</label>
                    <div className="recruiter_check d-flex">
                        <div className="custom-control custom-radio">
                            
                            <input type="radio" 
                                onChange={e => e.target.checked && handleChange('contractor_four', 'Yes')}
                                className="custom-control-input" id="customCheck1" 
                                name="contractor_four"
                                checked={data.contractor_four === 'Yes'}
                                defaultValue={data.contractor_four} 
                            />

                            <label className="custom-control-label" for="customCheck1">Yes</label>
                            </div>
                            <div className="custom-control custom-radio">
                            
                            <input type="radio" 
                                onChange={e => e.target.checked && handleChange('contractor_four', 'No')}
                                className="custom-control-input" id="customCheck2" 
                                name="contractor_four"
                                checked={data.contractor_four === 'No'}
                                defaultValue={data.contractor_four} 
                            />

                            <label className="custom-control-label" for="customCheck2">No</label>
                            </div> 
                    </div>
                </div>
                <div className="d-md-flex justify-content-between">
                    <div className="health_card elite_health">
                        <label>Are you interested in full-time employment, part-time or either? *</label>
                        <div className="stateDropdown">
                            <select 
                                name='full_time_part_time' 
                                className="w-100 new_select so_dropdown"
                                onChange={e => handleChange('full_time_part_time', e.target.value)} 
                                style={{ width: '100%' }}
                                defaultValue={data.full_time_part_time}
                            >
                                <option value="null" >-- choose Option --</option>
                                <option value="Caree Fair - Branch" >Full-Time Employement</option>
                                <option value="Caree Fair - Branch" >Part-Time</option>
                                <option value="Caree Fair - Branch" >Either</option>
                            </select>
                        </div>
                    </div>
                    <div className="health_card elite_health"></div>
                    <div className="health_card elite_health"></div>
                </div>
                <div className="d-md-flex justify-content-between">
                    <div className="health_card elite_health">
                        <label>When’s the earliest you can start working with us? *</label>
                        <div className="stateDropdown">
                            <select 
                                name='When_the_earliest_you_can_start_working_with_us' 
                                className="w-100 new_select so_dropdown" 
                                style={{ width: '100%' }} 
                                onChange={e => handleChange('When_the_earliest_you_can_start_working_with_us', e.target.value)}
                                defaultValue={data.When_the_earliest_you_can_start_working_with_us}
                            >
                                <option value="null" >-- choose Option --</option>
                                <option value="Yesterday" >Yesterday</option>
                                <option value="Today" >Today</option>
                                <option value="Caree Fair - Branch" >Within a Week</option>
                            </select>
                        </div>
                    </div>
                    <div className="health_card elite_health"></div>
                    <div className="health_card elite_health"></div>
                </div>
                <div className="health_card elite_health w-100">
                    <label>Are you willing to undertake a drug test as part of this hiring process? *</label>
                    <div className="recruiter_check d-flex">
                        <div className="custom-control custom-radio">
                        <input 
                            type="radio" 
                            value="No"
                            onChange={e => e.target.checked && handleChange('Are_you_willing_to_undertake_a_drug_test_as_part_of_this_hiring_process', 'Yes')}
                            className="custom-control-input" id="customCheck_1" 
                            name="Are_you_willing_to_undertake_a_drug_test_as_part_of_this_hiring_process"
                            checked={data.Are_you_willing_to_undertake_a_drug_test_as_part_of_this_hiring_process === 'Yes'}
                        />
                            <label className="custom-control-label" for="customCheck_1">Yes</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input 
                                type="radio" 
                                value="No"
                                onChange={e => e.target.checked && handleChange('Are_you_willing_to_undertake_a_drug_test_as_part_of_this_hiring_process', 'No')}
                                className="custom-control-input" id="customCheck_2" 
                                name="Are_you_willing_to_undertake_a_drug_test_as_part_of_this_hiring_process"
                                checked={data.Are_you_willing_to_undertake_a_drug_test_as_part_of_this_hiring_process === 'No'}
                            />
                            <label className="custom-control-label" for="customCheck_2">No</label>
                        </div>
                    </div>
                </div>
                <div className="health_card elite_health w-100">
                    <label>Why did you apply for this position? *</label>
                    <textarea 
                        onChange={e => handleChange('Why_did_you_apply_for_this_position', e.target.value)} 
                        name='Why_did_you_apply_for_this_position'
                        defaultValue={data.Why_did_you_apply_for_this_position}    
                    />
                </div>
                <div className="health_card elite_health w-100">
                    <label>Why would you like to work with our company? *</label>
                    <textarea 
                        onChange={e => handleChange('Why_would_you_like_to_work_with_our_company', e.target.value)}
                        defaultValue={data.Why_would_you_like_to_work_with_our_company}    
                        name='Why_would_you_like_to_work_with_our_company'
                    />
                </div>
                <div className="d-flex justify-content-center ">
                    <div className="account_form_style d-flex align-items-center mt-4">
                        <button className="cancel m-0 mr-3" onClick={() => {setStep(3)}} type="button">Back</button>
                        <button className="m-0" onClick={handleNext} type="button">Save and Continue</button>                            
                    </div>
                </div>
            </div>  
        </>
    )
}

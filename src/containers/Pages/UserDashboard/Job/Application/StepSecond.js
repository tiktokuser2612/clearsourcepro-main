import React, { useState } from 'react'
import notifier from 'utils/notifier';

const StepSecond = ({setStep , data, editApplyJob , formData} ) => {

    console.log('step_second',formData)
    const [errors, setErrors] = useState({});
    // const [errors, setErrors] = useState({});

    const handleChange = (key, value) => {
        editApplyJob({ [key] : value});
    };


    const handleNext = () => {
        // your validation here
        
        // console.log('in_handle',data.how_did_you_hear_about_us)
        if(data.how_did_you_hear_about_us == null || data.how_did_you_hear_about_us == ''){
            notifier.error('How did you hear about us field cannot be empty');
            return;
        }
        

        let phoneno = /^\d{10}$/;

        if(!phoneno.test(data.phone)){
            notifier.error(`Phone number should be 10 digits and doesn't contain letters`);
            return;
        }

        let pattern =  /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        
        if(!pattern.test(data.email)){
            notifier.error(`Email is not valid`);
            return;
        }

        if(data.address == null || data.address == ''){
            notifier.error('Address cannot be empty');
            return;
        }
        if(data.city == null || data.city == ''){
            notifier.error('City cannot be empty');
            return;
        }

    
        if(data.contractor == null|| data.contractor == ''){
            notifier.error('Contractor cannot be empty');
            return;
        }
        if(data.country == null || data.country == ''){
            notifier.error('Country cannot be empty');
            return;
        }
        if(data.email == null || data.email == ''){
            notifier.error('Email cannot be empty');
            return;
        }
        if(data.zip == null || data.zip == ''){
            notifier.error('Zip cannot be empty');
            return;
        }
        if(data.phone == null || data.phone == ''){
            notifier.error('Phone cannot be empty');
            return;
        }
        if(data.name == null || data.name == ''){
            notifier.error('Name cannot be empty');
            return;
        }        
        

        setStep(3)
     }


    return (
        <>            
            <h4 className="style_h4 mt-4">Job Application - Bank Manager</h4>
            <div className="out_border_wrapper" id="other_page_inputs">
                <div className="status_bar_section d-flex align-items-center justify-content-between">
                    <ul className="d-md-flex">
                        <li className="done"><a href="#">Autofill with Resume</a></li>                                                
                        <li className="process"><a href="#"> My Information</a></li>
                        <li><a href="#">My Experience</a></li>
                        <li><a href="#">Application Questions</a></li>
                        <li><a href="#">Voluntary Disclosure</a></li>
                        <li><a href="#">Self Identify</a></li>
                    </ul>
                    <button className="all_btn_style" type="button">Review</button>
                </div>
                <div className="assistant_manager_section job_detail_body mt-3">
                    <h3 className="text-center">My Information</h3>
                </div>
                <div className="add_profile_img"><h6>* Indicates a requred fields</h6></div>
                <div className="d-md-flex justify-content-between">
                    <div className="health_card elite_health">
                        <label>How did you hear about us? * </label>
                        <div >
                            <select name='how_did_you_hear_about_us' 
                                onChange={e => handleChange('how_did_you_hear_about_us', e.target.value)} 
                                className='form-control'
                                value={data.how_did_you_hear_about_us}
                            >
                                <option value="null" >-- choose Option --</option>
                                <option value="Caree Fair - Branch" >Caree Fair - Branch</option>
                                <option value="Caree Fair - Branch" >Caree Fair - Branch</option>
                                <option value="Caree Fair - Branch" >Caree Fair - Branch</option>
                            </select>
                        </div> 
                    </div>
                    <div className="health_card elite_health">
                        <label>Country *</label>
                        
                        <select 
                            name='country' 
                            value={data.country} 
                            className='form-control' 
                            onChange={e => handleChange('country', e.target.value)}
                        >
                            <option value="null" >Choose country</option>
                            <option value="India" >India</option>
                            <option value="USA" >USA</option>
                            <option value="China" >China</option>
                        </select>
                         
                    </div>
                    <div className="health_card elite_health"></div>
                </div>
                <div className="health_card elite_health w-100">
                    <label>Have you ever worked for ABCD inc. and/or affiliates or subsidiaries before as an Associate, Intern, or Contractor? *</label>
                    <div className="recruiter_check d-flex">
                        <div className="custom-control custom-radio">

                        <input type="radio" 
                        
                            onChange={e => e.target.checked && handleChange('contractor', 'Yes')}
                            className="custom-control-input" id="customCheck1" 
                            name="contractor"
                            checked={data.contractor === 'Yes'}
                            defaultValue={data.contractor} 
                        />


                            <label className="custom-control-label" for="customCheck1">Yes</label>
                            </div>
                            <div className="custom-control custom-radio">
                            {/* <input type="radio" defaultValue={data.contractor} onChange={e => handleChange('contractor', e.target.value)} className="custom-control-input" id="customCheck2" name="contractor"/> */}
                           
                            <input type="radio" 
                                onChange={e => e.target.checked && handleChange('contractor', 'No')}
                                className="custom-control-input" id="customCheck2" 
                                name="contractor"
                                checked={data.contractor === 'No'}
                                defaultValue={data.contractor} 
                            />

                            <label className="custom-control-label" for="customCheck2">No</label>
                            </div>
                    </div>
                </div>
                <div className="d-md-flex justify-content-between">
                    <div className="health_card elite_health">
                        <label>Name *</label>
                        
                        <input defaultValue={data.name} onChange={e => handleChange('name', e.target.value)} placeholder="Enter name" type="text" name='name'/>
                    </div>
                    <div className="health_card elite_health">
                        <label>Phone *</label>
                        <input defaultValue={data.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="Enter Phone" type="text" name='phone'/>
                    </div>
                    <div className="health_card elite_health">
                        <label>Email *</label>
                        <input defaultValue={data.email} onChange={e => handleChange('email', e.target.value)} placeholder="Enter Email" type="text" name='email' />
                        
                    </div>
                </div>
                <div className="d-md-flex justify-content-between">
                    <div className="health_card elite_health">
                        <label>Address</label>
                        
                        <input defaultValue={data.address} onChange={e => handleChange('address', e.target.value)} placeholder="Enter Address" type="text" name='address'/>
                    </div>
                    <div className="health_card elite_health">
                        <label>City</label>
                        <input defaultValue={data.city} onChange={e => handleChange('city', e.target.value)} placeholder="Enter City" type="text" name='city' />
                    </div>
                    <div className="health_card elite_health">
                        <label>State</label>
                        <div className="stateDropdown">
                            <select defaultValue={data.state} onChange={e => handleChange('state', e.target.value)} className="w-100 new_select so_dropdown" name='state' style={{ width: '100%' }}>
                                <option>Choose State</option>
                                <option>NY</option> 
                                <option>FL</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="d-md-flex justify-content-between">
                    <div className="health_card elite_health">
                        <label>Zip</label>
                        
                        <input defaultValue={data.zip} onChange={e => handleChange('zip', e.target.value)} name='zip' placeholder="Enter Zip" type="text"/>
                    </div>
                    <div className="health_card elite_health"></div>
                    <div className="health_card elite_health"></div>
                </div>
                <div className="d-flex justify-content-center ">
                    <div className="account_form_style d-flex align-items-center mt-4">
                        <button className="cancel m-0 mr-3" onClick={() => {setStep(1)}} type="button">Back</button>
                        <button className="m-0" onClick={handleNext} type="button">Save and Continue</button>                            
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default StepSecond;


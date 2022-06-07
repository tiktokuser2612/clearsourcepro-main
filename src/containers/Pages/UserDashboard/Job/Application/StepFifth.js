import React , { useState } from 'react'
import notifier from 'utils/notifier';

export default function StepFifth({setStep , data, editApplyJob}) {

  const handleChange = (key, value) => {
      editApplyJob({ [key] : value});
  };

  const handleNext = () => {
      // your validation here
      
      if( data.disclosure == ''){
          notifier.error('Please select your options');
          return;
      }
      setStep(6)
  }

  const disclosure = [
    `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
    `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer`,
    `Lorem Ipsum has been the industry's standard dummy text`,
    `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to`,
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
                            <li className="process"><a href="#">Voluntary Disclosure</a></li>
                            <li><a href="#">Self Identify</a></li>

                        </ul>
                        <button className="all_btn_style" type="button">Review</button>
                    </div>
                    <div className="assistant_manager_section job_detail_body mt-3">
                        <h3 className="text-center">Voluntary Disclosures</h3>
                    </div>
                    <div className="add_profile_img"><h6>* Indicates a requred fields</h6></div>
                    <div className="assistant_manager_section job_detail_body mt-0">
                        <p>
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic.
                        </p>
                    </div>
                    <div className="add_profile_img"><h6>Please check the appropriate boxes and complete the following entries. *</h6></div>
                    
                    <div className="recruiter_check">
                       
                    {
                        disclosure.map((item,index) => {
                            return <div className="custom-control custom-checkbox" key={index}>
                                <input type="checkbox" 
                                    onClick={v => {v.target.checked && handleChange('disclosure', item);}}
                                    checked={data.disclosure === item}
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
                            <button className="cancel m-0 mr-3" onClick={() => {setStep(4)}} type="button">Back</button>
                            <button className="m-0" onClick={handleNext} type="button">Save and Continue</button>                            
                        </div>
                    </div>
                </div> 
        </>
    )
}

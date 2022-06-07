import React, { useState } from 'react'
import notifier from 'utils/notifier';

const StepFirst = ({ setStep, data, editApplyJob , formData }) => {

    const changeHandler = (selectedFile) => {
        if(selectedFile){
            let i = 0
            const [pluginName, fileExtension] = selectedFile[i].name.split(/\.(?=[^\.]+$)/);

            const extensionArr = new Array('pdf','doc','docx','odt','txt','ods');
            const fileSize = selectedFile[i].size / 1024 / 1024;
            
            if(!extensionArr.includes(fileExtension)){
                notifier.error('`Please select pdf, doc, docx, odt, txt, ods file format`');
                return; 
            }
            if(fileSize > 2){
                notifier.error('File size should not greater than 2 MB');
                return;
            }
            editApplyJob({['resume'] : selectedFile[i]});
        }
    };

    return (
        <>            
            <h4 className="style_h4 mt-4">Job Application - Bank Manager</h4>
            <div className="out_border_wrapper">
                <div className="status_bar_section d-flex align-items-center justify-content-between">
                    <ul className="d-md-flex">
                        <li className="done"><a href="#">Autofill with Resume</a></li>                                                
                        <li><a href="#"> My Information</a></li>
                        <li><a href="#">My Experience</a></li>
                        <li><a href="#">Application Questions</a></li>
                        <li><a href="#">Voluntary Disclosure</a></li>
                        <li><a href="#">Self Identify</a></li>
                    </ul>

                    <button className="all_btn_style" type="button">Review</button>
                </div>
                <div className="assistant_manager_section job_detail_body mt-3">
                    <h3 className="text-center">Autofill with Resume</h3>
                </div>
                <div className="add_profile_img"><h6>* Indicates a requred fields</h6></div>
                <div className="assistant_manager_section job_detail_body mt-0">
                    <p>
                        Hello <br/><br/>
                        To automatically fill in your application, add your resume below. <br/><br/> To complete the application manually, continue to the next step. There will be another opportunity to add resume or additional documents in the My Experience section of the application as noted in the Tips section below. <br/><br/> The application will automatically save when advanced. You may return to complete the application later, but please be aware the job may close and no longer be available, so we recommend completion as soon as possible.
                    </p> <br/>
                    <p><i className="fa fa-angle-double-right" aria-hidden="true"></i> &nbsp; Add a resume or other document on the My Experience page in the Resume section.</p>
                    <p><i className="fa fa-angle-double-right" aria-hidden="true"></i> &nbsp; Confirm your information is correct on the Review page before submitting. This will be your final opportunity to edit application.</p>
                    <p><i className="fa fa-angle-double-right" aria-hidden="true"></i> &nbsp; To check the status of your application later, select Candidate in Home.</p>
                </div>
                
                <div className="add_profile_img"><h6>Upload Resume *</h6></div>
                <div className="docs_drag_area mt-0">
                    <img className="mr-3" src="/images/add_file_icon.png" alt=""/>
                    {/* <input type="file" name='files' multiple onChange={changeHandler} /> */}

                    <input type="file" onChange={ (e) => changeHandler(e.target.files) } />
                    <p>Drag &amp; Drop, or Browse to Upload Resume</p>
                </div>
                <div className="d-flex justify-content-center ">
                    <div className="account_form_style d-flex align-items-center mt-4">
                        <button className="m-0" type="button" onClick={() => { setStep(2) }}>continue</button>                            
                    </div>
                </div>
            </div>            
        </>
    )
}

export default StepFirst;
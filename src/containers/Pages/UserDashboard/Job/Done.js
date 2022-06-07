import React from 'react'
import { Link } from 'react-router-dom';

export default function Done() {
    return (
        <div>
            <div className="tab-content w_bg" id="myTabContent">
                <div className="tab-pane mt-5 fade show active" id="tab_3" role="tabpanel" aria-labelledby="home-tab">
                    

                    <div className="submit_case_form mb-5 py-3">                                
                        <div className="row">
        
                        </div>
                        <div className="submit_case_form1 pt-5">
                            <div className="row">
                                
                                <div className="col-md-12">
                                <div className="text-center mb-4">
                                        <img src="./images/tick_icon_gn.png" alt=""/>
                                        
                                    </div>
                                <p className="text-center">Your job application has been submitted successfully and it is being reviewed by the concerned department. 
                                <br/> You will get a confirmation message shortly. Thank You!</p>
                                
                                </div>

                            </div>
                        <div className="col-md-12 text-center  py-5">
                            <Link to='/admin/job/search' className=""  data-toggle="modal" data-target="#">Done</Link>
                        </div>
                    </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

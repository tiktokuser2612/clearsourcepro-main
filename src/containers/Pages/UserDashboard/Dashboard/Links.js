import React from 'react'
import {
    Form,
  } from 'antd';
  
import Dropdown from 'components/Common/Dropdown';
const departmentList = [
    {
      id: 'Action',
      name: 'Action',
    },
    {
      id: 'Another Action',
      name: 'Another Action',
    },
    
    {
      id: 'Something Else here',
      name: 'Something Else here',
    },
    
  ];

export default function Links() {
    return (
        <div className="col-md-7">
            <div className="row">
                <div class="analytic_sm">
                <Form.Item
            //   validateStatus={Joi.getFirstPlainError(errors, 'department') ? 'error' : ''}
            //   help={Joi.getFirstPlainError(errors, 'department')}
            //   label="Department"
            >
              <Dropdown
                // setCurrentId={handleDepartmentInput}
                dataList={departmentList}
                placeHolder="Analytics Summary"
                // currentId={(data.department == "")? -1:data.department}
              />
            </Form.Item>
                </div>
                
                
            </div>
            <div className="row">
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="analytics_card">
                                <span className="job_category_icon"><img src="/images/cat_icon1.png" alt=""/></span>
                                <h5>Filled Positions</h5>
                                <p className="green">( 1 open position )</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="analytics_card">
                                <span className="job_category_icon"><img src="/images/cat_icon2.png" alt=""/></span>
                                <h5>Days Open</h5>
                                <p className="green">( 1 open position )</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="analytics_card">
                                <span className="job_category_icon" ><img src="/images/cat_icon3.png" alt=""/></span>
                                <h5>Direct</h5>
                                <p className="green">( 1 open position )</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="analytics_card">
                                <span><img src="/images/cat_icon4.png" alt="" /></span>
                                <h5>Active Candidates</h5>
                                <p className="green">( 1 open position )</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="analytics_card">
                                <span><img src="/images/cat_icon5.png" alt=""/></span>
                                <h5>Total Candidate</h5>
                                <p className="green">( 1 open position )</p>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="analytics_card">
                                <span><img src="/images/cat_icon6.png" alt=""/></span>
                                <h5>Broadcast</h5>
                                <p className="green">( 1 open position )</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

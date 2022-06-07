import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Select,Form, Input} from 'antd';
import {
    initAdminCandidate,
    editAdminCandidate,
    postAdminCandidate,
  } from 'store/actions/adminCandidate';
import notifier from 'utils/notifier';
import Joi from 'utils/validator';

import PhoneInput from 'react-phone-number-input/input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import ZipcodeInput from 'components/Common/ZipcodeInput';


const { Option } = Select;

const CREATE_CANDIDATE_SCHEMA = {
    firstname: Joi.string().label('First Name').required(),
    lastname: Joi.string().label('Last Name').required(),
    username: Joi.string().label('User Name').required(),
    password: Joi.string().label('Password').required(),
    
    phone: Joi.required().error(() => ({
      message: 'Please provide phone number',
    })),
    email: Joi.string().email().label('Email').required(),
    address: Joi.string().label('Address').required(),
    city: Joi.string().label('City').required() ,
    state: Joi.string().label('State').required().error(() => ({
        message: 'Please select state',
    })), 
    zip: Joi.string().regex(/^[0-9]*$/).error(() => ({
        message: 'Please enter digits only and should not be empty',
    })),
    note_description : Joi.string().label('Note Description').required(),
    note_title : Joi.string().label('Note Title').required(),
};


const Create = ({initAdminCandidate, data,  postAdminCandidate,  editAdminCandidate , user}) => {
  const [Active,SetActive] = useState([]);

  const onCancel =()=>{
    history.push('/admin/candidates')
  }

  //Candidate Create accordion Permission
  const [accordion, setAccordion] = useState({
    'Details': false,
    'Resume': false,
    'Reqs': false,
    'Classes': false,
    'Notes': false,
  });


  const addSection=(sectionId)=>{
    let sections =[...Active];
    if(sections.includes(sectionId)){
      sections.splice(sections.indexOf(sectionId),1)
    }
    else{
      sections.push(sectionId)
    }
    SetActive(sections);

  }
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [noteError, setNoteError] = useState(false);

    useEffect(() => {
        initAdminCandidate()

        //get candidate permission from user key resposne 
        let acc = {...accordion}
        user.candidate_permissions.filter(p => p.status == 1 && p.permission == 'C').map(p=>{
            acc[p.details.permission] = true
        })

        setAccordion(acc)

    }, [initAdminCandidate , user]);

    const [selectedFile, setSelectedFile] = useState();
    const [preview,setPreview] = useState('');
    // const [isFilePicked, setIsFilePicked] = useState(null);

    const changeHandler = (event) => {
      setSelectedFile(event.target.files);
    };

    const handlePost = (e) => {
        if (e && e.preventDefault) {
          e.preventDefault();
        }
        
        // Validate all fields
        const errors = Joi.validateToPlainErrors(data, (['client', 'admin'].indexOf(data.user_role) === -1) ? CREATE_CANDIDATE_SCHEMA : CREATE_CANDIDATE_SCHEMA);
        setErrors(errors);

        if (Joi.hasPlainError(errors)) {
          notifier.error('Please fix errors');

          if(errors.note_title != null || errors.note_description != null){
            setNoteError(true);
        }
          return;
        }
        
        //Form Data code Start
        const formData = new FormData();

        formData.append('File', selectedFile);
        
        if(selectedFile){
          for (let i = 0 ; i < selectedFile.length ; i++) {
            
            
            const [pluginName, fileExtension] = selectedFile[i].name.split(/\.(?=[^\.]+$)/);
          

            const extensionArr = new Array('pdf','doc','docx','odt','txt','ods');
            const fileSize = selectedFile[i].size / 1024 / 1024;
            
            if(!extensionArr.includes(fileExtension)){
              notifier.error(`Please select pdf, doc, docx, odt, txt, ods file format`);
              return; 
            }
            if(fileSize > 2){
              notifier.error('File size should not greater than 2 MB');
              return;
            }
            formData.append(`File[${i}]`, selectedFile[i]);
          }
        }

        for (const [key, value] of Object.entries(data)) {
          formData.append(key, value);
        }
        console.log('formData',formData);
        
        //Form Data code End

        postAdminCandidate(formData)
            .then(res => {
                notifier.success('Create candidate success!');
                initAdminCandidate();
                history.push('/admin/candidates');
            })
            .catch(err => {
                notifier.error('Create candidate failed!');
                setErrors(err.errors || {});
        });
    };


    const handleZipcodeSearchComplete = (city, state, country) => {
      handleChange('city', city);
      handleChange('state', state);
    };

    const handlePhoneChange = (key, value) => {
        if(value != undefined){
        
            setErrors({
            [key]: isValidPhoneNumber(value) ? null : ['Phone number format invalid'],
            });
            editAdminCandidate({ [key]: value });
        }
    };

    const handleChange = (key, val) => {
        // Validate individual
        if(key === 'confirm_password'){
          if(val.length === 0) {
            setErrors({
              ...errors,
              [key]: "'Confirm Password' is not allowed to be empty",
            });
          } else if(data.password !== val){
            setErrors({
              ...errors,
              [key]: "'Confirm Password' must match password",
            });
          } else {
            setErrors({
              ...errors,
              [key]: null,
            });
          }
        } else {
          setErrors({
            ...errors,
            [key]: Joi.validateToPlainErrors(val, CREATE_CANDIDATE_SCHEMA[key]),
          });
        }
        if(errors.note_title == null && errors.note_description == null){
          setNoteError(false);
      }
       
        editAdminCandidate({ [key]: val });
    };
    console.log('errors', errors)

    // const onDateChange = (date, dateString, key) => {
    //     handleChange(key, dateString);
    // };

    return (
      <div className="health_insurance_main">
        { 
            accordion['Details'] &&  <div>
            <div className="d-md-flex justify-content-between align-items-center">
                <h1>Create Candidate Record</h1>
            </div>                    
            <div className="d-md-flex justify-content-between">
              <div className="health_card elite_health">
                <Form.Item
                  validateStatus={Joi.getFirstPlainError(errors, 'firstname') ? 'error' : ''}
                  help={Joi.getFirstPlainError(errors, 'firstname')}
                  label="First Name"
                  className="w-100"
                  >
                  <Input
                      type="text"
                      placeholder="John Smith"
                      value={data.firstname}
                      //defaultValue="Hello!"
                      className="client_input"
                      onChange={e => handleChange('firstname', e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className="health_card elite_health">
                <Form.Item
                    validateStatus={Joi.getFirstPlainError(errors, 'lastname') ? 'error' : ''}
                    help={Joi.getFirstPlainError(errors, 'lastname')}
                    label="Last Name"
                    className="w-100"
                    >
                    <Input
                      type="text"
                      placeholder="Last name"
                      value={data.lastname}
                      //defaultValue="Hello!"
                      className="client_input"
                      onChange={e => handleChange('lastname', e.target.value)}
                    />
                </Form.Item>
              </div>
              <div className="health_card elite_health">
                <Form.Item
                    validateStatus={Joi.getFirstPlainError(errors, 'User Name') ? 'error' : ''}
                    help={Joi.getFirstPlainError(errors, 'username')}
                    label="User Name"
                    className="w-100"
                    >
                    <Input
                      type="text"
                      placeholder="User12345"
                      value={data.username}
                      //defaultValue="Hello!"
                      className="client_input"
                      onChange={e => handleChange('username', e.target.value)}
                    />
                </Form.Item>
              </div>
            </div>
            <div className="d-md-flex justify-content-between">
              <div className="health_card elite_health">
                <Form.Item
                  validateStatus={Joi.getFirstPlainError(errors, 'Password') ? 'error' : ''}
                  help={Joi.getFirstPlainError(errors, 'password')}
                  
                  label="Password"
                  className="w-100"
                  >
                  <Input
                      type="password"
                      placeholder="*****"
                      value={data.password}
                      className="client_input"
                      onChange={e => handleChange('password', e.target.value)}
                  />
                </Form.Item>  
                
              </div>
              <div className="health_card elite_health">
                <Form.Item
                  validateStatus={Joi.getFirstPlainError(errors, 'Confirm Password') ? 'error' : ''}
                  help={Joi.getFirstPlainError(errors, 'confirm_password')}
                  label="Confirm Password"
                  className="w-100"
                  >
                  <Input
                      type="password"
                      placeholder="*****"
                      value={data.confirm_password}
                      className="client_input"
                      onChange={e => handleChange('confirm_password', e.target.value)}
                  />
                </Form.Item>  
              </div>
              <div className="health_card elite_health">
                <Form.Item
                  validateStatus={Joi.getFirstPlainError(errors, 'phone') ? 'error' : ''}
                  help={Joi.getFirstPlainError(errors, 'phone')}
                  label="Phone"
                  className="w-100"
                  >
                    <PhoneInput
                        type="text"
                        placeholder="Phone Number"
                        value={data.phone}
                        country="US"
                        minlength="14"
                        maxlength="14"
                        //defaultValue="Hello!"
                        
                        onChange={e => handlePhoneChange('phone', e)}
                    />
                </Form.Item>
              </div>
              
            </div>
            <div className="d-md-flex justify-content-between">
              <div className="health_card elite_health">
                
                <Form.Item
                  validateStatus={Joi.getFirstPlainError(errors, 'Email') ? 'error' : ''}
                  help={Joi.getFirstPlainError(errors, 'email')}
                  label="Email"
                  className="w-100"
                  >
                  <Input
                      type="text"
                      placeholder="email@gmail.com"
                      value={data.email}
                      //defaultValue="Hello!"
                      className="client_input"
                      onChange={e => handleChange('email', e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className="health_card elite_health">
                <Form.Item
                  validateStatus={Joi.getFirstPlainError(errors, 'Address') ? 'error' : ''}
                  help={Joi.getFirstPlainError(errors, 'address')}
                  label="Address"
                  className="w-100"
                  >
                  <Input
                      type="text"
                      placeholder="Clearwater, FL (Primary)"
                      value={data.address}
                      //defaultValue="Hello!"
                      className="client_input"
                      onChange={e => handleChange('address', e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className="health_card elite_health">
                <ZipcodeInput
                      validateStatus={Joi.getFirstPlainError(errors, 'zip') ? 'error' : ''}
                      help={Joi.getFirstPlainError(errors, 'zip')}
                      placeholder="Zip code"
                      label="Zip / Postal Code"
                      value={data.zip}
                      onChange={e => handleChange('zip', e.target.value)}
                      onSearchComplete={handleZipcodeSearchComplete}
                  />

                  
              </div>
              
            </div>
            <div className="d-md-flex justify-content-between">
              <div className="health_card elite_health">

                <Form.Item
                  // validateStatus={Joi.getFirstPlainError(errors, 'City') ? 'error' : ''}
                  // help={Joi.getFirstPlainError(errors, 'city')}
                  label="City"
                  className="w-100"
                  >
                  <Input
                      type="text"
                      placeholder="City"
                      value={data.city}
                      readOnly
                      //defaultValue="Hello!"
                      className="client_input"
                      onChange={e => handleChange('city', e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className="health_card elite_health">
                <label>State / Region</label>
                <div className="">
                  <Form.Item
                    // validateStatus={Joi.getFirstPlainError(errors, 'state') ? 'error' : ''}
                    // help={Joi.getFirstPlainError(errors, 'state')}
                    >
                    <Input
                      type="text"
                      placeholder="State"
                      value={data.state}
                      readOnly
                      //defaultValue="Hello!"
                      className="client_input"
                      onChange={e => handleChange('state', e.target.value)}
                  />
                  </Form.Item>  
                </div>
              </div>
              
            
              <div className="health_card elite_health"></div>
            </div>
          </div>
        }
        <div class="account_form_style d-flex align-items-center mt-4">
          {/* <button class="update m-0" type="button" onClick={handlePost}>Create Candidate</button> */}
        </div>
        <div id="accordion" className="record_accordion mt-4">
          { 
              accordion['Resume'] &&  <div className="card">
              <div className="card-header" id="headingfive">
                <h2 className="mb-0">
                  <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={()=>addSection(1)}>
                      <span>Resume Upload <img src="/images/edit_icon.png" alt=""/></span>
                    <span className="fa-stack">
                        <i className={Active.includes(1)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                    </span>
                  </button>
                </h2>
              </div>
              <div id="collapsefive" className={Active.includes(1)?"collapse show ":"collapse"}RF aria-labelledby="headingfive" data-parent="#accordion">
                <div className="card-body p-0">
                  <div className="docs_drag_area">
                      <img className="mr-3" src="/images/add_file_icon.png" alt=""/>
                      <input type="file" multiple onChange={changeHandler}/>
                      <p>Drag &amp; Drop, or Browse to Upload Resume</p><br />
                  </div>
                </div>
              </div>
            </div>
          }

          { 
            accordion['Reqs'] &&  <div className="card">
              <div className="card-header" id="headingOne">
                <h2 className="mb-0">
                  <button className="d-flex align-items-center justify-content-between btn btn-link" onClick={()=>{addSection(2)}}>
                    <span>Requisitions - Qualified <img src="/images/edit_icon.png" alt=""/> </span> 
                    <span className="fa-stack fa-sm">
                        <i className={Active.includes(2)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                    </span>
                  </button>
                </h2>
              </div>
              <div id="collapseOne" className={Active.includes(2)?"collapse show":"collapse"} aria-labelledby="headingOne" data-parent="#accordion" >
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
                                <th>Requisition Title</th>
                                <th>Info</th>
                                <th>Recruiter</th>
                                <th>Status</th>
                                <th>Updated</th>
                                <th>Candidates</th>
                            </tr>
                            
                        </thead>

                        <tbody>
                          <tr>
                              <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                              <td>Info</td>                                           
                              <td>Rani Jones</td>
                              <td>Open</td>
                              <td>10/22/2021</td>
                              <td>21 Active</td>
                          </tr>
                          <tr>
                              <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                              <td>Info</td>                                       
                              <td>Rani Jones</td>
                              <td>Open</td>
                              <td>10/22/2021</td>
                              <td>21 Active</td>
                          </tr>
                          <tr>
                              <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                              <td>Info</td>                                          
                              <td>Rani Jones</td>
                              <td>Open</td>
                              <td>10/22/2021</td>
                              <td>21 Active</td>
                          </tr>
                          <tr>
                              <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                              <td>Info</td>                                           
                              <td>Rani Jones</td>
                              <td>Open</td>
                              <td>10/22/2021</td>
                              <td>21 Active</td>
                          </tr>
                          <tr>
                              <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                              <td>Info</td>                                           
                              <td>Rani Jones</td>
                              <td>Open</td>
                              <td>10/22/2021</td>
                              <td>21 Active</td>
                          </tr>
                          <tr>
                              <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                              <td>Info</td>                                         
                              <td>Rani Jones</td>
                              <td>Open</td>
                              <td>10/22/2021</td>
                              <td>21 Active</td>
                          </tr>
                          <tr>
                              <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                              <td>Info</td>                                            
                              <td>Rani Jones</td>
                              <td>Open</td>
                              <td>10/22/2021</td>
                              <td>21 Active</td>
                          </tr>
                        </tbody>
                      </table>
                    </div> 
                  </div>
                </div>
              </div>
            </div>
          }
          
          { 
            accordion['Classes'] && <div className="card">
              <div className="card-header" id="headingTwo">
                <h2 className="mb-0">
                  <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={()=>{addSection(3)}}>
                      <span>Classes <img src="/images/edit_icon.png" alt=""/></span>
                    <span className="fa-stack">
                        <i className={Active.includes(3)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                    </span>
                  </button>
                </h2>
              </div>
              <div id="collapseTwo" className={Active.includes(3)?"collapse show":"collapse"} aria-labelledby="headingTwo" data-parent="#accordion">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="calendar_area">
                        <div className="calendar">

                          <header>
                      
                            <h2>April 2021</h2>
                      
                            <a className="btn-prev" href="#"><img src="/images/left_arrow_3.png" alt=""/></a>
                            <a className="btn-next" href="#"><img src="/images/right_arrow_3.png" alt=""/></a>
                      
                          </header>
                      
                          <table className="w-100">
                      
                            <thead>
                      
                              <tr>
                      
                                <td>MON</td>
                                <td>TUE</td>
                                <td>WED</td>
                                <td>THU</td>
                                <td>FRI</td>
                                <td>SAT</td>
                                <td>SUN</td>
                      
                              </tr>
                      
                            </thead>
                      
                            <tbody>
                      
                              <tr>
                                <td className="prev-month"><span>26</span> </td>
                                <td className="prev-month"><span>27</span></td>
                                <td className="prev-month"><span>28</span></td>
                                <td className="prev-month"><span>29</span></td>
                                <td className="prev-month"><span>30</span></td>
                                <td className="prev-month"><span>31</span></td>
                                <td><span>1</span></td>
                              </tr>
                              <tr>
                                <td><span>2</span></td>
                                <td><span>3</span></td>
                                <td><span>4</span></td>
                                <td><span>5</span></td>
                                <td><span>6</span></td>
                                <td><span>7</span></td>
                                <td><span>8</span></td>
                              </tr>
                              <tr>
                                <td><span>9</span></td>
                                <td className="event"><span>10</span></td>
                                <td><span>11</span></td>
                                <td><span>12</span></td>
                                <td><span>13</span></td>
                                <td><span>14</span></td>
                                <td><span>15</span></td>
                              </tr>
                              <tr>
                                <td><span>16</span></td>
                                <td><span>17</span></td>
                                <td><span>18</span></td>
                                <td><span>19</span></td>
                                <td><span>20</span></td>
                                <td className="event"><span>21</span></td>
                                <td><span>22</span></td>
                              </tr>
                      
                              <tr>
                                <td className="current-day event mob_d_none"><span><a href="complimentary_meeting_step1.html">23</a></span></td>
                                <td className="current-day event dsk_d_none"><span><a href="complimentary_meeting_step1-mob.html">23</a></span></td>
                                <td><span>24</span></td>
                                <td><span>25</span></td>
                                <td><span>26</span></td>
                                <td><span>27</span></td>
                                <td><span>28</span></td>
                                <td><span>29</span></td>
                              </tr>
                              <tr>
                                <td><span>30</span></td>
                                <td className="next-month"><span>1</span></td>
                                <td className="next-month"><span>2</span></td>
                                <td className="next-month"><span>3</span></td>
                                <td className="next-month"><span>4</span></td>
                                <td className="next-month"><span>5</span></td>
                                <td className="next-month"><span>6</span></td>
                              </tr>
                      
                            </tbody>
                          </table>
                        </div> 
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="my_coustomer_table m-0">
                        <div className="table-responsive w_bg">
                          <table className="table table-condensed mb-0" style={{borderCollapse:"collapse"}}>
                            <thead>
                              <tr>
                                  <th>Candidates</th>
                                  <th>Current </th>
                                  <th>Interview </th>
                                  
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                  <td>Britney Williamsss</td>
                                  <td>Phone Interview</td>
                                  <td>10/04/2021</td> 																
                              </tr>
                              <tr>
                                <td>Britney Williamsss</td>
                                  <td>Phone Interview</td>
                                  <td>10/04/2021</td> 																
                              </tr>
                              <tr>
                                <td>Britney Williamsss</td>
                                  <td>Phone Interview</td>
                                  <td>10/04/2021</td> 																
                              </tr>
                              <tr>
                                <td>Britney Williamsss</td>
                                  <td>Phone Interview</td>
                                  <td>10/04/2021</td> 																
                              </tr>
                              <tr>
                                <td>Britney Williamsss</td>
                                  <td>Phone Interview</td>
                                  <td>10/04/2021</td> 																
                              </tr>
                              <tr>
                                <td>Britney Williamsss</td>
                                  <td>Phone Interview</td>
                                  <td>10/04/2021</td> 																
                              </tr>
                              <tr>
                                <td>Britney Williamsss</td>
                                  <td>Phone Interview</td>
                                  <td>10/04/2021</td> 																
                              </tr>
                              <tr>
                                <td>Britney Williamsss</td>
                                  <td>Phone Interview</td>
                                  <td>10/04/2021</td> 																
                              </tr>
                              <tr>
                                <td>Britney Williamsss</td>
                                  <td>Phone Interview</td>
                                  <td>10/04/2021</td> 																
                              </tr>
                              <tr>
                                <td>Britney Williamsss</td>
                                  <td>Phone Interview</td>
                                  <td>10/04/2021</td> 																
                              </tr>
                              <tr>
                                <td>Britney Williamsss</td>
                                  <td>Phone Interview</td>
                                  <td>10/04/2021</td> 																
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
          }
          { 
            accordion['Notes'] &&  <div className="card">
            <div className="card-header" id="headingThree" style={ noteError ? {border:'0.5px dotted red'}: {border:'0.5px red'} }>
              <h2 className="mb-0">
                <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={()=>{addSection(4)}}>
                    <span>Notes <img src="/images/edit_icon.png" alt=""/></span>
                  <span className="fa-stack">
                      <i className={Active.includes(4)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                  </span>
                </button>
              </h2>
            </div>
            <div id="collapseThree" className={Active.includes(4)?"collapse show":"collapse"} aria-labelledby="headingThree" data-parent="#accordion">
              <div className="card-body p-0">
                <div className="notes_tab_card">
                  <div className="health_card w-100">
                    <Form.Item
                      validateStatus={Joi.getFirstPlainError(errors, 'Note Title') ? 'error' : ''}
                      help={Joi.getFirstPlainError(errors, 'note_title')}
                      label="Title"
                      className="w-100"
                      >
                      <Input
                          type="text"
                          //defaultValue="Hello!"
                          className="client_input"
                          onChange={e => handleChange('note_title', e.target.value)}
                      />
                    </Form.Item>
                  </div>
                  <div className="health_card w-100">
                      
                      <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Note Description') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'note_description')}
                        label="Description"
                        className="w-100"
                        >
                        <textarea
                            className="client_input"
                            onChange={e => handleChange('note_description', e.target.value)}
                        />
                      </Form.Item>
                  </div>
                </div>
              </div>
            </div>
            
            </div>
          }
          <div className="account_form_style d-flex align-items-center mt-4">
              <button class="update m-0" type="button" onClick={handlePost}>Create</button>
              <button className=" m-0 ml-3" type="button" onClick={onCancel}>Cancel</button>
            </div>
        </div>
      </div>
    )
}


const mapStateToProps = store => ({
  data: store.rootReducer.adminCandidate.data,
  user: store.rootReducer.auth.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  initAdminCandidate,
  editAdminCandidate,
  postAdminCandidate,
}, dispatch);


 
export default connect(mapStateToProps, mapDispatchToProps)(Create);

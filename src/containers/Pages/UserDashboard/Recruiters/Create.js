import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { DatePicker, Select,Form, Input} from 'antd';
import { Link } from 'react-router-dom';
import api from 'constants/api';
import {
    initAdminRecruiter,
    editAdminRecruiter,
    postAdminRecruiter,
  } from 'store/actions/adminRecruiter';
import moment from 'moment';

import notifier from 'utils/notifier';
import Joi from 'utils/validator';

import PhoneInput from 'react-phone-number-input/input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import ZipcodeInput from 'components/Common/ZipcodeInput';



const { Option } = Select;

const CREATE_RECRUITER_SCHEMA = {
    firstname : Joi.string().label('First Name').required(),
    lastname : Joi.string().label('Last Name').required(),
    phone: Joi.required().error(() => ({
        message: 'Please provide phone number',
    })),
    user_name: Joi.string().label('User Name').required(),
    password: Joi.string().label('Password').required(),
    email: Joi.string().email().label('Email').required(),
    address: Joi.string().label('Address').required(),
    // city: Joi.string().label('City').required() ,
    // state: Joi.string().label('State').required().error(() => ({
    //     message: 'Please select state',
    // })), 
    zip: Joi.string().regex(/^[0-9]*$/).error(() => ({
        message: 'Please enter digits only and should not be empty',
    })),
    hiring_dates : Joi.string().label('Hiring Dates').required(),
    // permissions : Joi.label('permissions').required(),
    salary : Joi.string().label('Salary').required() ,
    note_title: Joi.string().label('Title').required(),
    note_description: Joi.string().label('Description').required(),
    // client_company_id: Joi.string().label('Select Company').required(),
};

const Create = ({initAdminRecruiter, data, user, postAdminRecruiter,  editAdminRecruiter}) => {
    const [Show,setShow] =useState([]);
    const [permissionList, setPermissionList] = useState([]);
    const [permissionError, setPermissionError] = useState(false);
    const [detailError, setDetailError] = useState(false);
    const [companiesList, setCompaniesList] = useState([]);
    // const [descriptionError, setDescriptionError] = useState(false);
    const [noteError, setNoteError] = useState(false);

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState('');
    const [previewFile, setPreviewFile] = useState(null);

    //Permission State
    const [accordion, setAccordion] = useState({
        'Details': false,
        // 'Analytics Summary': false,
        'Resume': false,
        'Permissions': false,
        'Notes': false,
    });

    const addSegments =(sectionId)=>{
        let sections =[...Show];
        if(sections.includes(sectionId)){
            sections.splice(sections.indexOf(sectionId),1)
        }
        else{
            sections.push(sectionId)
        }
        setShow(sections);
    }

    const history = useHistory();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        initAdminRecruiter();
        data.permissions = [];
        api.admin.clients.getListCompanies()
            .then(res => {

                setCompaniesList(res.data);
                //notifier.success('get Client success!');
               
            })
            .catch(err => {
                notifier.error('get Companies failed!');
                setErrors(err.errors || {});
            });

        // Get Recruiter permission list
        api.public.getPermissionList()
        .then(res => {
            setPermissionList(res.permissionList);
        })
        .catch(err => {
            notifier.error('get Permission failed!');
            setErrors(err.errors || {});
        });

        //Recruiter permission 
        let acc = {...accordion}

        user.recruiter_permissions.filter(p => p.status == 1).map(p=>{
            acc[p.details.permission] = true
        })

        setAccordion(acc)

    }, [initAdminRecruiter , user]);


    const handlePost = (e) => {
        if (e && e.preventDefault) {
          e.preventDefault();
        }
    
        // Validate all fields
        const errors = Joi.validateToPlainErrors(data, (['client', 'admin'].indexOf(data.user_role) === -1) ? CREATE_RECRUITER_SCHEMA : CREATE_RECRUITER_SCHEMA);
        //  if(data.permissions == ''){
        
        //     errors['permissions'] = ['Please select permissions from Permissions section'];
            
        //  }
        setErrors(errors);
        
        if (Joi.hasPlainError(errors)) {
          notifier.error('Please fix errors');

          if(errors.firstname != null || 
            errors.lastname != null ||
            errors.phone != null ||
            errors.user_name != null ||
            errors.password != null ||
            errors.email != null ||
            errors.address != null ||
            errors.zip != null ||
            errors.hiring_dates != null ||
            errors.salary != null
           
            ){
                setDetailError(true);
        }
        

        if(errors.permissions != null){
            setPermissionError(true);
        }

        if(errors.note_title != null || errors.note_description != null){
            setNoteError(true);
        }


          return;
        }


         //Form Data code Start
         const formData = new FormData();

         if(isFilePicked){
             console.log('isFilePicked',isFilePicked)
             formData.append(`File`, isFilePicked);
         }        
 
         for (const [key, value] of Object.entries(data)) {
             formData.append(key, value);
         }
    
        postAdminRecruiter(formData)
            .then(res => {
                notifier.success('Create recruiter success!');
                initAdminRecruiter();
                history.push('/admin/recruiters');
            })
            .catch(err => {
                notifier.error('Create recruiters failed!');
                setErrors(err.errors || {});
        });
    };

    const onCancel=()=>{
        history.push('/admin/recruiters')
    }


    const handleZipcodeSearchComplete = (city, state, country) => {
        handleChange('city', city);
        handleChange('state', state);
    };

    const handlePhoneChange = (key, value) => {
        if(value != undefined){
        
            setErrors({
            [key]: isValidPhoneNumber(value) ? null : ['Phone number format invalid'],
            });
            editAdminRecruiter({ [key]: value });
        }
    };


    const handleChange = (key, val) => {
        
        // Validate individual
        
        setErrors({
            ...errors,
            [key]: Joi.validateToPlainErrors(val, CREATE_RECRUITER_SCHEMA[key]),
        });
        
        if(data.firstname != '' && 
        data.lastname != '' &&
        data.phone != '' &&
        data.user_name != '' &&
        data.password != '' &&
        data.email != '' &&
        data.address != '' &&
        data.zip != '' &&
        data.hiring_dates != '' &&
        data.salary != ''
       
        ){
            setDetailError(false);
        }

        if(errors.note_title == null && errors.note_description == null){
            setNoteError(false);
        }
        editAdminRecruiter({ [key]: val });

        

        
    };

    const changeHandler = (event) => {
        setSelectedFile(event.target.files);
           
        if(event.target.files){
            const fileSize = event.target.files[0].size / 1024 / 1024;
            if(fileSize > 2){
                notifier.error('File size should not greater than 2 MB');
                return;
            }
            setPreviewFile(URL.createObjectURL(event.target.files[0]));
            setIsFilePicked(event.target.files[0]);               
        }

    };

    const onDateChange = (date, dateString, key) => {
        handleChange(key, dateString);
    };

    const handleChangePermission = (e) => {

        
        // current array of options
    const options = data.permissions;
    let index

    // check if the check box is checked or unchecked
    if (e.target.checked) {
      // add the numerical value of the checkbox to options array
      
      options.push(+e.target.value)
      if(data.permissions != ""){
        errors['permissions'] = null;
        setErrors(errors);
        setPermissionError(false);
    }
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = options.indexOf(+e.target.value)
      options.splice(index, 1)
    }

    }

    return (
        <div className="health_insurance_main">
            <div className="">
                <h1>Create Recruiter</h1>
            </div>                    
            <div id="accordion" className="record_accordion">
            { accordion['Details'] && <div className="card">
                    <div className="card-header" id="headingOne" style={ detailError ? {border:'0.5px dotted red'}: {border:'0.5px red'} }>
                        <h2 className="mb-0">
                        
                            <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={()=>{addSegments(1)}}>
                            <span>Details</span> 
                            <span className="fa-stack">
                                <i className={Show.includes(1)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                            </span>
                        </button>
                        </h2>
                    </div>
                    <div id="collapseOne" className={Show.includes(1)?"collapse show":"collapse"} aria-labelledby="headingOne" data-parent="#accordion">
                    
                        <div className="card-body px-0">
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
                                            placeholder="John Smith"
                                            value={data.lastname}
                                            //defaultValue="Hello!"
                                            className="client_input"
                                            onChange={e => handleChange('lastname', e.target.value)}
                                        />
                                    </Form.Item>

                                </div>
                                <div className="health_card elite_health">
                                     
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'user_name') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'user_name')}
                                        label="User Name"
                                        className="w-100"
                                        >
                                        <Input
                                            type="text"
                                            placeholder="User12345"
                                            value={data.user_name}
                                            //defaultValue="Hello!"
                                            className="client_input"
                                            onChange={e => handleChange('user_name', e.target.value)}
                                        />
                                    </Form.Item>

                                </div>
                                
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card elite_health">
                                    
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'password') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'password')}
                                        label="Password"
                                        className="w-100"
                                        >
                                        <Input
                                            type="password"
                                            placeholder="*****"
                                            value={data.password}
                                            //defaultValue="Hello!"
                                            className="client_input"
                                            onChange={e => handleChange('password', e.target.value)}
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
                                            minLength="14"
                                            maxLength="14"
                                            className="client_input"
                                            //defaultValue="Hello!"
                                            
                                            onChange={e => handlePhoneChange('phone', e)}
                                        />
                                    </Form.Item>

                                </div>
                                <div className="health_card elite_health">
                                    
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'email') ? 'error' : ''}
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
                                
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card elite_health">
                                    
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'address') ? 'error' : ''}
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
                                        label="Zip code"
                                        value={data.zip}
                                        onChange={e => handleChange('zip', e.target.value)}
                                        onSearchComplete={handleZipcodeSearchComplete}
                                    />
                                </div>
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
                                
                                
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card elite_health">
                                    
                                    <div className="state_salary">
                                    <label>State</label>
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
                                <div className="health_card elite_health">
                                <label>Salary</label>
                                     <div className="state_salary">
                                        <Form.Item
                                                validateStatus={Joi.getFirstPlainError(errors, 'salary') ? 'error' : ''}
                                                help={Joi.getFirstPlainError(errors, 'salary')}>
                                                <Select value={data.salary} 
                                                    style={{ width: '100%' }}
                                                    placeholder="Choose salary Range"
                                                    className="w-100 sal_input"
                                                    // onChange={v => handleChangeSearch(v)}
                                                    onChange={e => handleChange('salary', e)}

                                                >
                                                    <Option value="">Choose Salary</Option>
                                                    <Option value="$40K-$50K">$40K-$50K</Option>
                                                    <Option value="$60K-$70K">$60K-$70K</Option>
                                                    <Option value="$80K-$90K">$80K-$90K</Option>
                                                </Select>
                                        </Form.Item>   
                                    </div>
                                </div>
                                <div className="health_card elite_health">
                    

                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'hiring_dates') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'hiring_dates')}
                                        label="Hiring Dates"
                                        className=""
                                    >
                                        <DatePicker
                                            format="DD/MM/YYYY"
                                            value={data.hiring_dates && moment(data.hiring_dates, 'DD/MM/YYYY')}
                                            placeholder="11/01/2021"
                                            suffixIcon={<i className="far fa-calendar-alt" />}
                                            onChange={(date, dateString) => onDateChange(date, dateString, 'hiring_dates')}
                                            className={'date-picker-style d-block t_date date_hiring'}
                                        />
                                    
                                    </Form.Item>

                                    <img className="icon" src="/images/calander_icon_3.png" alt=""/>
                                </div>
                                
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card elite_health">
                                <label>Select Company</label>
                                     <div className="state_salary">
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'client_company_id') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'client_company_id')}>
                                          
                                        <Select defaultValue="Select Company" style={{ width: '100%' }} onChange={e => handleChange('client_company_id', e)}>
                                            {companiesList ?
                                                companiesList.map((company) =>
                                                (
                                                <Option value={`${company.id}`} > {company.company_name}</Option>
                                                ))

                                                : <Option value="0" disabled selected> No company</Option>}

                                        </Select>
                                    </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div className="account_form_style d-flex align-items-center mt-4">
                                {/* <button className="update m-0" type="button" onClick={handlePost}>Create Recruiter</button> */}
                            </div>
                        </div>
                    </div>
                </div> }
            
                {/* { accordion['Resume'] && <div className="card">
                    <div className="card-header" id="headingFive">
                        <h2 className="mb-0">
                        <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={()=>addSegments(3)}>
                            <span>Requisitions</span>
                            <span className="fa-stack">
                                <i className={Show.includes(3)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                            </span>
                        </button>
                        </h2>
                    </div>
                    <div id="collapseFive" className={Show.includes(3)?"collapse show":"collapse"} aria-labelledby="headingFive" data-parent="#accordion">
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
                            <div className="my_coustomer_table">
                                <div className="table-responsive w_bg">
                                    <table className="table table-condensed mb-0" style={{borderCollapse:"collapse"}}>
                                        <thead>
                                            <tr>
                                                <th>Candidates</th>
                                                <th>Current Workflow</th>
                                                <th>Interview Dates</th>
                                                <th>Current Workflow </th>
                                                <th>Interview Dates</th>
                                                <th>Interview Dates</th>
                                            </tr>
                                            
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                <td>Phone Interview</td>
                                                <td>10/04/2021</td>                                                
                                                <td>Phone Interview</td>
                                                <td>10/04/2021</td>
                                                <td>10/04/2021</td>
                                            </tr>
                                            <tr>
                                                <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                <td>Phone Interview</td>
                                                <td>10/04/2021</td>                                                
                                                <td>Phone Interview</td>
                                                <td>10/04/2021</td>
                                                <td>10/04/2021</td>
                                            </tr>
                                            <tr>
                                                <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                <td>Phone Interview</td>
                                                <td>10/04/2021</td>                                                
                                                <td>Phone Interview</td>
                                                <td>10/04/2021</td>
                                                <td>10/04/2021</td>
                                            </tr>
                                            <tr>
                                                <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                <td>Phone Interview</td>
                                                <td>10/04/2021</td>                                                
                                                <td>Phone Interview</td>
                                                <td>10/04/2021</td>
                                                <td>10/04/2021</td>
                                            </tr>
                                            <tr>
                                                <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                <td>Phone Interview</td>
                                                <td>10/04/2021</td>                                                
                                                <td>Phone Interview</td>
                                                <td>10/04/2021</td>
                                                <td>10/04/2021</td>
                                            </tr>
                                            <tr>
                                                <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                <td>Phone Interview</td>
                                                <td>10/04/2021</td>                                                
                                                <td>Phone Interview</td>
                                                <td>10/04/2021</td>
                                                <td>10/04/2021</td>
                                            </tr>
                                            <tr>
                                                <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                <td>Phone Interview</td>
                                                <td>10/04/2021</td>                                                
                                                <td>Phone Interview</td>
                                                <td>10/04/2021</td>
                                                <td>10/04/2021</td>
                                            </tr>
                                            <tr>
                                                <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                <td>Phone Interview</td>
                                                <td>10/04/2021</td>                                                
                                                <td>Phone Interview</td>
                                                <td>10/04/2021</td>
                                                <td>10/04/2021</td>
                                            </tr>
                                            <tr>
                                                <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                <td>Phone Interview</td>
                                                <td>10/04/2021</td>                                                
                                                <td>Phone Interview</td>
                                                <td>10/04/2021</td>
                                                <td>10/04/2021</td>
                                            </tr>
                                            <tr>
                                                <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                <td>Phone Interview</td>
                                                <td>10/04/2021</td>                                                
                                                <td>Phone Interview</td>
                                                <td>10/04/2021</td>
                                                <td>10/04/2021</td>
                                            </tr>
                                            <tr>
                                                <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                <td>Phone Interview</td>
                                                <td>10/04/2021</td>                                                
                                                <td>Phone Interview</td>
                                                <td>10/04/2021</td>
                                                <td>10/04/2021</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div> } */}
                { accordion['Resume'] && <div className="card">
                    <div className="card-header" id="headingThree">
                        <h2 className="mb-0">
                        <button className="d-flex align-items-center justify-content-between btn btn-link collapsed"onClick={()=>addSegments(4)}>
                            <span>Resume</span>
                            <span className="fa-stack"> 
                                <i className={Show.includes(4)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                            </span>
                        </button>
                        </h2>
                    </div>
                    <div id="collapseThree" className={Show.includes(4)?"collapse show":"collapse"} aria-labelledby="headingThree" data-parent="#accordion">
                        <div className="card-body p-0">
                            <div className="docs_drag_area">
                                <input type="file" accept=".pdf, .doc, .docx, .odt, .ods" onChange={changeHandler}/>
                                <p>Drag &amp; Drop, or Browse to Upload Resume</p>
                            </div>  
                            <div className="col-md-12">
                                <div className="file_docmt">
                                    {
                                        previewFile ? <iframe src={previewFile} style={{width: 80, height: 100 }}/>    
                                        :
                                        ''
                                    }
                                    
                                </div>
                            </div>                          
                        </div>
                    </div>
                </div> }
                { accordion['Permissions'] && <div className="card">
                    <div className="card-header" id="headingSix" style={ permissionError ? {border:'0.5px dotted red'}: {border:'0.5px red'} }>
                        <h2 className="mb-0">
                        <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={()=>addSegments(5)}>
                            <span>Permissions</span>
                            <span className="fa-stack">
                                <i className={Show.includes(5)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                            </span>
                        </button>
                        </h2>
                    </div>
                    <div id="collapseSix" className={Show.includes(5)?"collapse show":"collapse"} aria-labelledby="headingSix" data-parent="#accordion">
                        <div className="card-body">
                            <div className="recruiter_check d-flex">
                                { permissionList ? 
                                permissionList.map((permission) => (
                                        
                                        <div className="custom-control custom-radio">

                                    <Form.Item validateStatus={Joi.getFirstPlainError(errors, 'permissions') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'permissions')}>
                                        <Input 
                                        type="checkbox" 
                                        className="custom-control-input" 
                                        id={`customCheck${permission.id}`} 
                                        value={permission.id} 
                                        onChange={e => handleChangePermission(e)}/>
                                        <label className="custom-control-label" htmlFor={`customCheck${permission.id}`}>{permission.name}</label>
                                    </Form.Item>
                                        </div>
                                        
                                        
                                        ))
                                        : ''
                                    }
                                    
                            </div>
                        </div>
                    </div>
                </div> }
                { accordion['Notes'] && <div className="card">
                    <div className="card-header" id="headingSeven" style={ noteError ? {border:'0.5px dotted red'}: {border:'0.5px red'} }>
                        <h2 className="mb-0">
                        <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={()=>{addSegments(6)}}>
                            <span>Notes</span>
                            <span className="fa-stack">
                                <i className={Show.includes(6)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                            </span>
                        </button>
                        </h2>
                    </div>
                    <div id="collapseSeven" className={Show.includes(6)?"collapse show":"collapse"} aria-labelledby="headingSeven" data-parent="#accordion">
                        <div className="card-body p-0">
                            <div className="notes_tab_card">
                                <div className="health_card w-100">
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'Title') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'note_title')}
                                        label="Title"
                                        className="w-100"
                                        >
                                        <Input
                                            type="text"
                                            
                                            className="client_input"
                                            onChange={e => handleChange('note_title', e.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="health_card w-100">
                                    
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'Description') ? 'error' : ''}
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
                </div> }
                <div className="account_form_style d-flex align-items-center mt-4">
                    {/* <button className="update m-0" type="button">Create</button> */}
                    <button className="update m-0" type="button" onClick={handlePost}>Create</button>
                    <button className=" m-0 mml-3" type="button"onClick={onCancel}>Cancel</button>
                    <button className="cancel m-0 mml-3" type="button">Submit for Approval</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = store => ({
    data: store.rootReducer.adminRecruiter.data,
    user: store.rootReducer.auth.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    initAdminRecruiter,
    editAdminRecruiter,
    postAdminRecruiter,
}, dispatch);


   
export default connect(mapStateToProps, mapDispatchToProps)(Create);

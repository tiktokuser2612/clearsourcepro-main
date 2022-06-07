import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { DatePicker, Select,Form, Input} from 'antd';
import {
    initClientDashboardRecruiter,
    editClientDashboardRecruiter,
    postClientDashboardRecruiter,
  } from 'store/actions/clientDashboardRecruiter';
import moment from 'moment';

import notifier from 'utils/notifier';
import Joi from 'utils/validator';

import PhoneInput from 'react-phone-number-input/input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import ZipcodeInput from 'components/Common/ZipcodeInput';



const { Option } = Select;

const CREATE_CLIENT_DASHBAORD_RECRUITER_SCHEMA = {
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
    salary : Joi.string().label('Salary').required() ,
};

const Create = ({initClientDashboardRecruiter, data, user, postClientDashboardRecruiter,  editClientDashboardRecruiter}) => {
    const [Show,setShow] =useState([]);
    
    const [detailError, setDetailError] = useState(false);
    
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState('');
    const [previewFile, setPreviewFile] = useState(null);

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
        initClientDashboardRecruiter();

    }, [initClientDashboardRecruiter]);


    const handlePost = (e) => {
        if (e && e.preventDefault) {
          e.preventDefault();
        }
    
        // Validate all fields
        const errors = Joi.validateToPlainErrors(data, (['client', 'admin'].indexOf(data.user_role) === -1) ? CREATE_CLIENT_DASHBAORD_RECRUITER_SCHEMA : CREATE_CLIENT_DASHBAORD_RECRUITER_SCHEMA);
         
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

          return;
        }


         //Form Data code Start
         const formData = new FormData();

         if(isFilePicked){
             formData.append(`File`, isFilePicked);
         }        
         
         data.company_id = user?.get_client_company?.id;

         for (const [key, value] of Object.entries(data)) {
             formData.append(key, value);
         }
    
        postClientDashboardRecruiter(formData)
            .then(res => {
                notifier.success('Create recruiter success!');
                initClientDashboardRecruiter();
                history.push('/client/recruiters');
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


        if(key === 'confirm_password'){
            if(value.length == 0) {
              setErrors({
                ...errors,
                [key]: "'Confirm Password' is not allowed to be empty",
              });
            } else if(data.password != value){
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
        } 

        if(value != undefined){
        
            setErrors({
            [key]: isValidPhoneNumber(value) ? null : ['Phone number format invalid'],
            });
            editClientDashboardRecruiter({ [key]: value });
        }
    };


    const handleChange = (key, val) => {
        
        // Validate individual
        setErrors({
            ...errors,
            [key]: Joi.validateToPlainErrors(val, CREATE_CLIENT_DASHBAORD_RECRUITER_SCHEMA[key]),
        });
        
        // if(data.firstname != '' && 
        // data.lastname != '' &&
        // data.phone != '' &&
        // data.user_name != '' &&
        // data.password != '' &&
        // data.email != '' &&
        // data.address != '' &&
        // data.zip != '' &&
        // data.hiring_dates != '' &&
        // data.salary != ''
       
        // ){
        //     setDetailError(false);
        // }

        editClientDashboardRecruiter({ [key]: val });

        

        
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
    
    return (
        <div className="health_insurance_main">
            <div className="">
                <h1>Create Recruiter</h1>
            </div>                    
            <div id="accordion" className="record_accordion">
                <div className="card">
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
                                            // readOnly
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
                                            minLength="14"
                                            maxLength="14"
                                            className="client_input"
                                            //defaultValue="Hello!"
                                            
                                            onChange={e => handlePhoneChange('phone', e)}
                                        />
                                    </Form.Item>

                                </div>
                                
                                
                            </div>
                            
                            <div className="d-md-flex justify-content-between">

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
                                
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card elite_health">
                                    
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'City') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'city')}
                                        label="City"
                                        className="w-100"
                                        >
                                        <Input
                                            type="text"
                                            placeholder="Clearwater"
                                            value={data.city}
                                            readOnly
                                            //defaultValue="Hello!"
                                            className="client_input"
                                            onChange={e => handleChange('city', e.target.value)}
                                        />
                                    </Form.Item>

                                </div>
                                <div className="health_card elite_health">
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
                                            className=""
                                            onChange={e => handleChange('state', e.target.value)}
                                        />
                                        </Form.Item>     
                                    
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
                                
                                
                            </div>
                            <div className="d-md-flex justify-content-between">
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
                            
                            <div className="account_form_style d-flex align-items-center mt-4">
                                {/* <button className="update m-0" type="button" onClick={handlePost}>Create Recruiter</button> */}
                            </div>
                        </div>
                    </div>
                    </div>
                   
                    <div className="card">
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
                    </div>
                    
                    
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
    data: store.rootReducer.clientDashboardRecruiter.data,
    user : store.rootReducer.auth.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    initClientDashboardRecruiter,
    editClientDashboardRecruiter,
    postClientDashboardRecruiter,
}, dispatch);


   
export default connect(mapStateToProps, mapDispatchToProps)(Create);

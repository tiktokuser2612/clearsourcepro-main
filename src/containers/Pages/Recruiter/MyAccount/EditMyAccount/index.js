import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { DatePicker,Select,Form, Input, Upload,Button} from 'antd';
import PhoneInput from 'react-phone-number-input/input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import moment from 'moment';
import DocUploader from 'components/Common/DocUploader';
import api from 'constants/api';

import ZipcodeInput from 'components/Common/ZipcodeInput';
import {
  initMe,
  editMe,
  putMe,
} from 'store/actions/auth';
import Joi from 'utils/validator';

import notifier from 'utils/notifier';
import { useParams } from 'react-router-dom';
import LoadingIndicator from 'components/Common/LoadingIndicator';
import Notes from 'containers/Pages/UserDashboard/Notes';

const { Option } = Select;

const CREATE_RECRUITER_SCHEMA = {
    firstname : Joi.string().label('First Name').required(),
    lastname : Joi.string().label('Last Name').required(),
    
    phone: Joi.required().error(() => ({
        message: 'Please provide phone number',
    })),
    username: Joi.string().label('Username').required(),
    email: Joi.string().email().label('Email').required(),
    address: Joi.string().label('Address').required(),
    
    zip: Joi.string().regex(/^[0-9]*$/).error(() => ({
        message: 'Please enter digits only and should not be empty',
    })),
    hiring_dates : Joi.string().label('Hiring Dates').required(),
    salary : Joi.string().label('Salary').required() ,
};

const RecruiterEditMyAccount = ({isPuttingMe, edited, data, initMe, editMe, putMe}) => {

    const history = useHistory();
    const { id } = useParams();
    const [errors, setErrors] = useState({});

    const [editNote, setEditNote] = useState(false);
    const [idNote, setIdNote] = useState(null);
    const [noteTitle, setNoteTitle] = useState(null);
    const [noteDescription, setNoteDescription] = useState(null);
    const [permissionList, setPermissionList] = useState([]);
    const [Active,setActive] = useState([]);
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState('');
    const [previewFile, setPreviewFile] = useState(null);

    const [companiesList, setCompaniesList] = useState([]);

     const addSubmit=(sectionID)=>{
         let section =[...Active];
         if(section.includes(sectionID)){
             section.splice(section.indexOf(sectionID));
         }
         else{
             section.push(sectionID);
         }
         setActive(section);
     }

    
    const openEditNote = (id, title, description) => {    
        
        setEditNote(true);
        setIdNote(id);
        setNoteTitle(title);
        setNoteDescription(description);
    }

    const getCompeny = ()=>{
        api.admin.clients.getListCompanies()
        .then(res => {

            setCompaniesList(res.data);
            //notifier.success('get Client success!');
        })
        .catch(err => {
            notifier.error('get Companies failed!');
            setErrors(err.errors || {});
        });
    }

    useEffect(() => {
        initMe();
        getCompeny();
        api.public.getPermissionList()
        .then(res => {
            setPermissionList(res.permissionList);
        })
        .catch(err => {
            notifier.error('get Permission failed!');
            setErrors(err.errors || {});
        });
       
    }, [initMe]);
    const permissionIds = data?.get_permissions?.map(permis => permis.permission);
    const handlePost = (e) => {
        if (e && e.preventDefault) {
          e.preventDefault();
        }
    
        // Validate all fields
        const errors = Joi.validateToPlainErrors(data, CREATE_RECRUITER_SCHEMA);
        errors['phone'] = isValidPhoneNumber(data['phone']) ? null : ['Phone number format invalid'];
        setErrors(errors);
        
        
        if (Joi.hasPlainError(errors)) {
          notifier.error('Please fix errors');
          return;
        }
        
        if(idNote != null){
            data.note_id = idNote;
        }
         //Form Data code Start
         const formData = new FormData();

         if(isFilePicked){    
             formData.append(`File`, isFilePicked);
         }   
 
         console.log('requistion_descrip_update',data);
         for (const [key, value] of Object.entries(data)) {
             formData.append(key, value);
         }
        
        putMe(formData)
            .then(res => {
                notifier.success('Update recruiter success!');
                initMe();
                history.push('/recruiter/dashboard/'); 
            })
            .catch(err => {
                
                notifier.error('Update recruiter failed!', err.msg);
                setErrors(err.errors || {});
        });

        return false;
    };

    const onDateChange = (date, dateString, key) => {
        handleChange(key, dateString);
    };
    const handlePhoneChange = (key, value) => {
        if(value != undefined){
            console.log('key>>>>', key, '---value>>>', value)
        setErrors({
          [key]: isValidPhoneNumber(value) ? null : ['Phone number format invalid'],
        });
        editMe({ [key]: value });
        }
      };

      const handleZipcodeSearchComplete = (city, state, country) => {
        handleChange('city', city);
        handleChange('state', state);
      };

    const handleChange = (key, val) => {
        // Validate individual
        setErrors({
            ...errors,
            [key]: Joi.validateToPlainErrors(val, CREATE_RECRUITER_SCHEMA[key]),
        });
       
        editMe({ [key]: val });
    };

    const onCancel = () =>{
        history.push('/recruiter/dashboard');
      }

       //Image state variable    
    

    const changeHandler = (event) => {
        setSelectedFile(event.target.files);
           
        if(event.target.files){
            // const [pluginName, fileExtension] = selectedFile.name.split(/\.(?=[^\.]+$)/);  

            // const extensionArr = new Array('pdf', 'doc', 'docx', 'odt', 'ods');
            const fileSize = event.target.files[0].size / 1024 / 1024;
            
            if(fileSize > 2){
                notifier.error('File size should not greater than 2 MB');
                return;
            }
            
            setPreviewFile(URL.createObjectURL(event.target.files[0]));
            setIsFilePicked(event.target.files[0]);
                            
        }

    };
    console.log('errors->>',errors)    
    return (
        <div className="health_insurance_main">
            <LoadingIndicator isLoading={isPuttingMe} />
            <div className="">
                <h1>Update Recruiter <Link to="/recruiter/dashboard">Back</Link></h1>
            </div>                    
            <div id="accordion" className="record_accordion">
                <div className="card">
                    <div className="card-header" id="headingOne">
                        <h2 className="mb-0">
                        
                            <button className="d-flex align-items-center justify-content-between btn btn-link"  onClick={()=>{addSubmit(1)}}>
                            <span>Details</span> 
                            <span className="fa-stack">
                                <i className={Active.includes(1)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                            </span>
                        </button>
                        </h2>
                    </div>
                    <div id="collapseOne" className={Active.includes(1)?"collapse show":"collapse"} aria-labelledby="headingOne" data-parent="#accordion" >
                    
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
                                        validateStatus={Joi.getFirstPlainError(errors, 'username') ? 'error' : ''}
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
                                            minlength="14"
                                            maxlength="14"
                                            //defaultValue="Hello!"
                                            
                                            onChange={e => handlePhoneChange('phone', e)}
                                        />
                                    </Form.Item>

                                </div>
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
                                
                            </div>
                            <div className="d-md-flex justify-content-between">
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
                                        label="Zip code"
                                        value={data.zip}
                                        onChange={e => handleChange('zip', e.target.value)}
                                        onSearchComplete={handleZipcodeSearchComplete}
                                    />
                                </div>
                                <div className="health_card elite_health">
                                    
                                    <Form.Item
                                        
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
                                
                                
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card elite_health">
                                    <div className="state_salary">
                                        <label>State</label>
                                        <Form.Item
                                           
                                            >
                                            <Input
                                            type="text"
                                            placeholder="state"
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

                                        <Select value={`${data.client_company_id}`}  style={{ width: '100%' }} onChange={e => handleChange('client_company_id', e)}>
                                            {companiesList ?
                                                companiesList.map((company) =>
                                            (
                                                <Option value={`${company.id}`}> {company.company_name}</Option>
                                                ))

                                                : <Option value="0" disabled selected> No company</Option>}

                                        </Select>
                                    </Form.Item>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="account_form_style d-flex align-items-center mt-4">
                                {/* <button class="update m-0" type="button" onClick={handlePost}>Create Recruiter</button> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="headingTwo">
                        <h2 className="mb-0">
                            <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={()=>{addSubmit(2)}}>
                                <span>Analytics Summary</span>
                                <span className="fa-stack">
                                <i className={Active.includes(2)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                                </span>
                            </button>
                        </h2>
                    </div>
                    <div id="collapseTwo" className={Active.includes(2)?"collapse show":"collapse"} aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body px-0">
                            <div className="analytics_tab_card border-0 p-0">
                                <div className="row">
                                    <div className="col-md-7">
                                        <div className="row">
                                            
                                            <div className="col-md-8">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="analytics_card">
                                                        <span className="job_category_icon"><img src="/images/filled_icon.png" alt=""/></span>
                                                        <h5>1/3</h5>
                                                        <h6 className='green'>Filled Positions</h6>
                                                        
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="analytics_card">
                                                        <span className="job_category_icon"><img src="/images/job_icon.png" alt=""/></span>
                                                        <h5>5</h5>
                                                        <h6>Time to Hire</h6>
                                                       
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="analytics_card">
                                                        <span className="job_category_icon"><img src="/images/filled_icon.png" alt=""/></span>
                                                        <h5>1/3</h5>
                                                        <h6>Cost per Hire</h6>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="analytics_card">
                                                        <span className="job_category_icon"><img src="/images/job_icon.png" alt=""/></span>
                                                        <h5>5</h5>
                                                        <h6 className='blue'>Qualified Candidates</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="analytics_card">
                                                            <span className="job_category_icon"><img src="/images/filled_icon.png" alt=""/></span>
                                                            <h5>0/3</h5>
                                                            <h6>Application per Hire</h6>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="analytics_card">
                                                            <span className="job_category_icon"><img src="/images/job_icon.png" alt=""/></span>
                                                            <h5>0/3</h5>
                                                            <h6 className='green'>Retention</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="pie_chart_space d-flex justify-content-between">
                                            <div className="pie_chart_box">
                                                <img src="/images/pie_chart_1.jpg" alt=""/>
                                            </div>
                                            <div className="pie_chart_box">
                                                <img src="/images/pie_chart_2.jpg" alt=""/>
                                            </div>
                                        </div>
                                        <div className="pie_chart_space d-flex justify-content-between">
                                            <div className="pie_chart_box">
                                                <img src="/images/pie_chart_3.jpg" alt=""/>
                                            </div>
                                            <div className="pie_chart_box">
                                                <img src="/images/pie_chart_4.jpg" alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="card">
                        <div className="card-header" id="headingFive">
                            <h2 className="mb-0">
                            <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse"  onClick={()=>{addSubmit(3)}}>
                                <span>Requisitions</span>
                                <span className="fa-stack">
                                    <i className={Active.includes(3)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                                </span>
                            </button>
                            </h2>
                        </div>
                        <div id="collapseFive" className={Active.includes(3)?"collapse show ":"collapse"} aria-labelledby="headingFive" data-parent="#accordion">
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
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingThree">
                            <h2 className="mb-0">
                            <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" onClick={()=>{addSubmit(4)}}>
                                <span>Resume</span>
                                <span className="fa-stack">
                                    <i className={Active.includes(4)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                                </span>
                            </button>
                            </h2>
                        </div>
                        <div id="collapseThree" className={Active.includes(4)?"collapse show":"collapse"} aria-labelledby="headingThree" data-parent="#accordion">
                            <div className="card-body p-0">
                                {/* <DocUploader /> */}
                                <div className="docs_drag_area">
                                    {/* <img className="mr-3" src="/images/add_file_icon.png" alt=""/> */}
                                    
                                    <input type="file" accept=".pdf, .doc, .docx, .odt, .ods" onChange={changeHandler}/>
                                    <p>Drag &amp; Drop, or Browse to Upload Resume</p>
                                </div>  
                                <div className="col-md-12">
                                    <div className="file_docmt">
                                        {
                                            previewFile ? <iframe src={previewFile} style={{width: 80, height: 100 }}/>    
                                            :
                                            ''
                                            // 
                                        }
                                        <ul>
                                        {
                                            data.files && data.files.map((fileKey) => {
                                                    
                                                return (
                                                    
                                                    <li>
                                                        <Link to={'/storage/images/'+fileKey.filename } download target="_blank"> {fileKey.filename}</Link>
                                                    </li>
                                                )
                                                
                                            })
                                        }
                                        </ul>
                                    </div>
                                </div>                          
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingSix">
                            <h2 className="mb-0">
                            <button className="d-flex align-items-center justify-content-between btn btn-link collapsed"onClick={()=>{addSubmit(5)}}>
                                <span>Permissions</span>
                                <span className="fa-stack">
                                    <i className={Active.includes(5)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                                </span>
                            </button>
                            </h2>
                        </div>
                        <div id="collapseSix" className={Active.includes(5)?"collapse show":"collapse"} aria-labelledby="headingSix" data-parent="#accordion">
                            <div className="card-body">
                                <div className="recruiter_check d-flex">
                                { permissionList ? 
                                    permissionList.map((permission) => (
                                            
                                            <div className="custom-control custom-radio">

                                        
                                            <input checked={permissionIds?.includes(permission.id)}
                                            type="checkbox" className="custom-control-input" id={`customCheck${permission.id}`} value={permission.id} />
                                            <label className="custom-control-label" for={`customCheck${permission.id}`}>{permission.name}</label>
                                            </div>
                                            
                                            
                                            ))
                                            : ''
                                        }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingSeven">
                            <h2 className="mb-0">
                            <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" onClick={()=>{addSubmit(6)}}>
                                <span>Notes</span>
                                <span className="fa-stack">
                                    <i className={Active.includes(6)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                                </span>
                            </button>
                            </h2>
                        </div>
                        <div id="collapseSeven" className={Active.includes(6)?"collapse show":"collapse"} aria-labelledby="headingSeven" data-parent="#accordion">
                            <div className="card-body p-0">
                                <div className="notes_tab_card">
                                {data.id !='' && <Notes data_id ={data.id} model_id={2}/>} 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="account_form_style d-flex align-items-center mt-4">
                        {/* <button className="update m-0" type="button" disabled={!edited}>Update</button> */}
                        <button className="update m-0" type="button" onClick={handlePost}>Update</button>
                        <button className=" m-0 mml-3" onClick={onCancel} type="button">Cancel</button>
                        
                    </div>
            </div>
        </div>
    )
}

const mapStateToProps = store => ({
  isPuttingMe: store.rootReducer.auth.isPuttingMe,
  edited: store.rootReducer.auth.edited,
  data: store.rootReducer.auth.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  initMe,
  editMe,
  putMe,
}, dispatch);



   
export default connect(mapStateToProps, mapDispatchToProps)(RecruiterEditMyAccount);


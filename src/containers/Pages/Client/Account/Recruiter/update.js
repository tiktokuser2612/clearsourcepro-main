import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { DatePicker,Select,Form, Input} from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';

import {
    initClientDashboardRecruiter,
    editClientDashboardRecruiter,
    getCompanyRecruiter,
    putClientDashboardRecruiter }
     from 'store/actions/clientDashboardRecruiter';

import Joi from 'utils/validator';

import notifier from 'utils/notifier';
import { useParams } from 'react-router-dom';
import LoadingIndicator from 'components/Common/LoadingIndicator';

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
    
    email: Joi.string().email().label('Email').required(),
    address: Joi.string().label('Address').required(),
   
    zip: Joi.string().regex(/^[0-9]*$/).error(() => ({
        message: 'Please enter digits only and should not be empty',
    })),
    hiring_dates : Joi.string().label('Hiring Dates').required(),
    salary : Joi.string().label('Salary').required() ,
    
};

const Edit = ({initClientDashboardRecruiter,
                 data,  
                 editClientDashboardRecruiter, 
                 getCompanyRecruiter , 
                 putClientDashboardRecruiter, 
                 isPutting, 
                 isFetching,
                 edited 
}) => {

    const history = useHistory();
    const { id } = useParams();
    const [errors, setErrors] = useState({});
    const permissionIds = data?.get_permissions?.map(permis => permis.permission);
    const [editNote, setEditNote] = useState(false);
    const [idNote, setIdNote] = useState(null);
    const [noteTitle, setNoteTitle] = useState(null);
    const [noteDescription, setNoteDescription] = useState(null);
    const [Active,setActive] = useState([]);
    const [permissionList, setPermissionList] = useState([]);
    const [permissionError, setPermissionError] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [companiesList, setCompaniesList] = useState([]);

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState('');
    const [previewFile, setPreviewFile] = useState(null);

     const addSubmit=(sectionID)=>{
         let section =[...Active];
         if(section.includes(sectionID)){
             section.splice(section.indexOf(sectionID));
         }
         else{
             section.push(sectionID);
         }
         setActive(section);
         setSelectedPermissions(permissionIds);
     }

    useEffect(() => {
        initClientDashboardRecruiter();
        getCompanyRecruiter(id);  
    }, [getCompanyRecruiter,initClientDashboardRecruiter,id]);


    
    const handlePut = (e) => {
        if (e && e.preventDefault) {
          e.preventDefault();
        }
    
        // Validate all fields
        const errors = Joi.validateToPlainErrors(data, (['recruiter', 'admin'].indexOf(data.user_role) === -1) ? CREATE_RECRUITER_SCHEMA : CREATE_RECRUITER_SCHEMA);
        setErrors(errors);
        
        
        if (Joi.hasPlainError(errors)) {
          notifier.error('Please fix errors');
          return;
        }

        

        //Form Data code Start
        const formData = new FormData();

        if(isFilePicked){
            formData.append(`File`, isFilePicked);
        }        

        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }
        
        putClientDashboardRecruiter(id, formData)
            .then(res => {
                notifier.success('Update recruiter success!');
                initClientDashboardRecruiter();
                history.push('/client/recruiter/view/'+id); 
            })
            .catch(err => {
                notifier.error('Update recruiter failed!');
                setErrors(err.errors || {});
        });

        return false;
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
            editClientDashboardRecruiter({ [key]: value });
        }
    };


    const onDateChange = (date, dateString, key) => {
        handleChange(key, dateString);
    };

    const handleChange = (key, val) => {
        // Validate individual
        setErrors({
            ...errors,
            [key]: Joi.validateToPlainErrors(val, CREATE_RECRUITER_SCHEMA[key]),
        });
       
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

    
    return (
        <div className="health_insurance_main">
            <LoadingIndicator isLoading={isFetching || isPutting} />
            <div className="">
                <h1>Update Recruiter</h1>
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
                                
                                
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card elite_health">
                                    
                                    <div className="state_salary">
                                    <label>State</label>
                                        <Form.Item
                                            validateStatus={Joi.getFirstPlainError(errors, 'state') ? 'error' : ''}
                                            help={Joi.getFirstPlainError(errors, 'state')}>
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
                            
                            <div className="account_form_style d-flex align-items-center mt-4">
                                {/* <button className="update m-0" type="button" onClick={handlePost}>Create Recruiter</button> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="headingTwo">
                        <h2 className="mb-0">
                            <button className="d-flex align-items-center justify-content-between btn btn-link collapsed " onClick={()=>addSubmit(2)}>
                            <span>Analytics Summary </span>
                            <span className="fa-stack">
                            <i className={Active.includes(2)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                            </span>
                            </button>
                        </h2>
                    </div>
                    <div id="collapseTwo" className={Active.includes(2)?"collapse show":"collapse"} aria-labelledby="headingTwo" data-parent="#accordion" >
                        <div className="card-body px-0">
                            <div className="analytics_tab_card border-0 p-0">
                                <div className="">
                                <div className="row">
                                    <div className="col-md-7">
                                        <div className="row">
                                            <div className="col-md-8">
                                            <ul className="navbar-nav mr-auto">
                                                
                                                <li className="nav-item dropdown">
                                                    <a className="nav-link bk dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Analytics
                                                    </a>
                                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                        <a className="dropdown-item" href="#">Action</a>
                                                        <div className="dropdown-divider"></div>
                                                        <a className="dropdown-item" href="#">Another action</a>
                                                        <div className="dropdown-divider"></div>
                                                        <a className="dropdown-item" href="#">Something else here</a>
                                                    </div>
                                                </li>
                                            </ul>
                                            </div>
                                            <div className="col-md-8">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="analytics_card">
                                                        <span className="job_category_icon"><img src="/images/cat_icon1.png" alt=""/></span>
                                                        <h5>Filled Positions</h5>
                                                        <p>( 1 open position )</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="analytics_card">
                                                        <span className="job_category_icon"><img src="/images/cat_icon2.png" alt=""/></span>
                                                        <h5>Days Open</h5>
                                                        <p>( 1 open position )</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="analytics_card">
                                                        <span className="job_category_icon"><img src="/images/cat_icon3.png" alt=""/></span>
                                                        <h5>Direct</h5>
                                                        <p>( 1 open position )</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="analytics_card">
                                                        <span className="job_category_icon"><img src="/images/cat_icon4.png" alt=""/></span>
                                                        <h5>Active Candidates</h5>
                                                        <p>( 1 open position )</p>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                            <div className="col-md-4">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="analytics_card">
                                                        <span className="job_category_icon"><img src="/images/cat_icon5.png" alt=""/></span>
                                                        <h5>Total Candidates</h5>
                                                        <p>( 1 open position )</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="analytics_card">
                                                        <span className="job_category_icon"><img src="/images/cat_icon6.png" alt=""/></span>
                                                        <h5>Broadcast</h5>
                                                        <p>( 1 open position )</p>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="pie_chart_space d-flex justify-content-between">
                                            <div className="pie_chart_box">
                                            <h6>Interview Ratio</h6>
                                            <img src="/images/pie_chart_1.jpg" alt=""/>
                                            </div>
                                            <div className="pie_chart_box">
                                            <h6>Offer Ratio</h6>
                                            <img src="/images/pie_chart_2.jpg" alt=""/>
                                            </div>
                                        </div>
                                        <div className="pie_chart_space d-flex justify-content-between">
                                            <div className="pie_chart_box">
                                            <h6>Acceptance Rate</h6>
                                            <img src="/images/pie_chart_3.jpg" alt=""/>
                                            </div>
                                            <div className="pie_chart_box">
                                            <h6>Source of Hire</h6>
                                            <img src="/images/pie_chart_4.jpg" alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                
                
                <div className="account_form_style d-flex align-items-center mt-4">
                    {/* <button className="update m-0" type="button" disabled={!edited}>Update</button> */}
                    <button className="update m-0" type="button" onClick={handlePut}>Update</button>
                    <button className=" m-0 mml-3" type="button">Cancel</button>
                    
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = store => ({
    isFetching: store.rootReducer.clientDashboardRecruiter.isFetching,
    data: store.rootReducer.clientDashboardRecruiter.data,
    isPutting: store.rootReducer.clientDashboardRecruiter.isPutting,
    edited: store.rootReducer.clientDashboardRecruiter.edited,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    initClientDashboardRecruiter,
    editClientDashboardRecruiter,
    getCompanyRecruiter,
    putClientDashboardRecruiter
}, dispatch);


   
export default connect(mapStateToProps, mapDispatchToProps)(Edit);


import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Select,Form, Input} from 'antd';
import {
    initAdminClientUsers,
    editAdminClientUsers,
    postAdminClientUser,
  } from 'store/actions/adminNewClient';
  import PhoneInput from 'react-phone-number-input/input';
import notifier from 'utils/notifier';
import Joi from 'utils/validator';
import { isValidPhoneNumber } from 'react-phone-number-input';
import ZipcodeInput from 'components/Common/ZipcodeInput';
import api from 'constants/api';

const { Option } = Select;

const CREATE_USER_SCHEMA = {
    company_name: Joi.string().label('Company Name').required(),
    //company_type: Joi.string().label('Company Type/Industry').required(),

    company_type: Joi.string().min(5).label('Company Type').required().error(() => ({
        message: 'Please select company type',
    })),  

    company_website: Joi.string().label('Company Website').required(),
    // hours_of_operations: Joi.string().label('Hours of Operation').required(),
    // / \d{2} / 
    // https://regex101.com/r/cR9oB9/5

    hours_of_operations: Joi.string().regex(/^((?:[1-9]|1[0-9]|2[0-3])(?:\.\d{1,2})?|24(?:\.00?)?)$/).error(() => ({
        message: 'Hour of Operation limit till 24 hours',
    })),

    year_in_business: Joi.string().regex(/^[0-9]*$/).error(() => ({
        message: 'Please enter digits only and should not be empty',
    })),
    
    primary_contact_title: Joi.string().label('Primary Contact Title').required(),
    
    // client_id: Joi.string().label('Primary Contact Name').required().error(() => ({
    //         message: 'Please select Client Name',
    //     })),
    
    // recruiter_id: Joi.label('Recruiter Name').required(),
    email: Joi.string().email().label('Primary Email').required(),

    address_type: Joi.string().label('Primary Email').required(),

    description: Joi.string().label('Role Summary for Ideal Candidate').required(),

    hiring_manager_name : Joi.string().label('Name').required(),
    hiring_manager_title : Joi.string().label('Title').required(),
    hiring_manager_phone : Joi.string().label('Phone').required(),
    hiring_manager_email : Joi.string().email().label('Email').required(),
    
    contact_info_name : Joi.string().label('Name').required(),
    contact_info_email : Joi.string().email().label('Email').required(),
    contact_info_phone : Joi.string().label('Phone').required(),
    contact_info_address : Joi.string().label('Address').required(),
    contact_info_city : Joi.string().label('City').required(),
    contact_info_zip : Joi.string().label('Zip').required(),
    contact_info_state : Joi.string().label('State').required(),
    
    location : Joi.string().label('Location').required(),
    // account_executive_id : Joi.string().label('Account Executive').required(),
};





const Create = ({initAdminClientUsers, data,  postAdminClientUser,  editAdminClientUsers , user}) => {

    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [clients, setClients] = useState([]);
    const [clientRecruiters, setClientRecruiters] = useState([]);
    const [accountExecutive, setAccountExecutives] = useState([]);

    //Client Create accordion Permission
    const [accordion, setAccordion] = useState({
        'Details': false,
        'Reqs': false,
        'Hiring Managers': false,
        'Accounting/Billing Contact Info': false,
        'Description of Business': false,
        'Contacts': false,
    });

    useEffect(() => {
        initAdminClientUsers()

        api.admin.getClients.get()
        .then(res => {
            setClients(res);
        })
        .catch(err => {
            notifier.error('get Client failed!');
            setErrors(err.errors || {});
        });

        
        api.admin.clientRecruiters.getList()
        .then(res => {
            setClientRecruiters(res);
        })
        .catch(err => {
            
            notifier.error('Get Client Recruiters failed!');
            setErrors(err.errors || {});
        });
        
        api.admin.accountExecutive.getList()
        .then(executive => {
            
            setAccountExecutives(executive);
        })
        .catch(err => {
            notifier.error('Get Account Executive failed!');
            setErrors(err.errors || {});
        });

        //get client permission from user key resposne 
        let acc = {...accordion}
        user.client_permissions.filter(p => p.status == 1 && p.permission == "C").map(p=>{
            acc[p.details.permission] = true
        })

        setAccordion(acc)

    }, [initAdminClientUsers , user]);

    const handlePost = (e) => {
        if (e && e.preventDefault) {
          e.preventDefault();
        }
    
        // Validate all fields
        const errors = Joi.validateToPlainErrors(data, (['client', 'admin'].indexOf(data.user_role) === -1) ? CREATE_USER_SCHEMA : CREATE_USER_SCHEMA);
        setErrors(errors);
        
        
        if (Joi.hasPlainError(errors)) {
          notifier.error('Please fix errors');
          return;
        }else{
            postAdminClientUser(data)
            .then(res => {notifier.success('Create client success!');
                initAdminClientUsers();
                history.push('/admin/clients');
            })
            .catch(err => {
                notifier.error('Create user failed!');
                setErrors(err.errors || {});
            });
        }
    
        
    };

    const handleChange = (key, val) => {
        // Validate individual

        if ('client_id' == key) {

        }
        setErrors({
            ...errors,
            [key]: Joi.validateToPlainErrors(val, CREATE_USER_SCHEMA[key]),
        });
       
        editAdminClientUsers({ [key]: val });
    };

    const handlePhoneChange = (key, value) => {
        if(value != undefined){
        
            setErrors({
            [key]: isValidPhoneNumber(value) ? null : ['Phone number format invalid'],
            });
            editAdminClientUsers({ [key]: value });
        }
    };

    const handleZipcodeSearchCompleteContactInfo = (contact_info_city, contact_info_state, country) => {
        handleChange('contact_info_city', contact_info_city);
        handleChange('contact_info_state', contact_info_state);
    };

    

    return (
        <div className="health_insurance_main">
            <h1>Create Client</h1>
            { 
            accordion['Details'] &&  <div>
                <div className="d-md-flex justify-content-between">
                
                <div className="health_card elite_health">
                    <Form.Item
                    validateStatus={Joi.getFirstPlainError(errors, 'Company Name') ? 'error' : ''}
                    help={Joi.getFirstPlainError(errors, 'company_name')}
                    label="Company Name"
                    className="w-100"
                    >
                    <Input
                    type="text"
                    placeholder="Elite Health Insurance"
                    value={data.company_name}
                    //defaultValue="Hello!"
                    onChange={e => handleChange('company_name', e.target.value)}
                    />
                    </Form.Item>
                </div>
                <div className="health_card elite_health c_type_card">
                    <label>Company Type/Industry</label>
                    <Form.Item
                    validateStatus={Joi.getFirstPlainError(errors, 'company_type') ? 'error' : ''}
                    help={Joi.getFirstPlainError(errors, 'company_type')}>
                    <Select value={data.company_type} 
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    className="w-100 custom-select"
                    // onChange={v => handleChangeSearch(v)}
                    onChange={e => handleChange('company_type', e)}
                    >
                    <Option value="">Choose Type</Option>
                    <Option value="Finance">Finance</Option>
                    <Option value="Banking">Banking</Option>
                    <Option value="Information Technology">Information Technology</Option>
                    </Select>
                    </Form.Item>
                </div>
                <div className="health_card elite_health">
                    <Form.Item
                    validateStatus={Joi.getFirstPlainError(errors, 'Company Website') ? 'error' : ''}
                    help={Joi.getFirstPlainError(errors, 'company_website')}
                    label="Company Website"
                    >
                    <Input
                        placeholder="Company Website"
                        value={data.company_website}
                        onChange={e => handleChange('company_website', e.target.value)}
                    />
                    </Form.Item>
                </div>
                </div> 
                <div className="d-md-flex justify-content-between">
                    <div className="health_card elite_health">
                        <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Hours of Operation') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'hours_of_operations')}
                        label="Hours of Operation"
                        >
                        <Input
                            placeholder="9AM-6PM-M-F"
                            minLength="1"
                            maxLength="2"    
                            value={data.hours_of_operations}
                            onChange={e => handleChange('hours_of_operations', e.target.value)}
                        />
                        </Form.Item>
                    </div>
                    <div className="health_card elite_health">
                        <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Years in Business') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'year_in_business')}
                        label="Years in Business"
                        >
                        <Input
                            placeholder="10 years"
                            value={data.year_in_business}
                            onChange={e => handleChange('year_in_business', e.target.value)}
                        />
                        </Form.Item>
                    </div>
                    <div className="health_card elite_health">
                        <label>Primary Contact Name</label>
                        <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Primary Contact Name') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'client_id')}
                        
                        >
                        
                        <Select 
                            className="w-100 custom-select"
                            defaultValue="Client" onChange={e => handleChange('client_id', e)}>
                            {clients ?
                                clients.map((client) =>
                                (
                                    <Option value={`${client.id}`}> {client.firstname}</Option>
                                ))

                                : <Option value="0" disabled selected> No client</Option>}

                        </Select>

                        </Form.Item>

                    </div>
                </div>
                <div className="d-md-flex justify-content-between">
                    <div className="health_card elite_health">
                        <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Primary Contact Title') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'primary_contact_title')}
                        label="Primary Contact Title"
                        >
                        <Input
                            placeholder="Admin"
                            value={data.primary_contact_title}
                            onChange={e => handleChange('primary_contact_title', e.target.value)}
                        />
                        </Form.Item>
                    </div>
                    <div className="health_card elite_health">
                        <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Primary Phone') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'phone')}
                        label="Primary Phone"
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
                        validateStatus={Joi.getFirstPlainError(errors, 'Primary Email') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'email')}
                        label="Primary Email"
                        >
                        <Input
                            placeholder="contact@email.com"
                            value={data.email}
                            onChange={e => handleChange('email', e.target.value)}
                        />
                        </Form.Item>
                    </div>
                </div>
                <div className="d-md-flex justify-content-between">
                    <div className="health_card elite_health c_type_card">
                        <label>Corp/Primary Address</label>
                        <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'address_type') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'address_type')}>
                            <Select value={data.address_type} 
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            className="w-100 custom-select"
                            // onChange={v => handleChangeSearch(v)}
                            onChange={e => handleChange('address_type', e)}
                            >
                            <Option value="">Choose Address</Option>
                            <Option value="Permanent">Permanent</Option>
                            <Option value="Corporate">Corporate</Option>
                        </Select>
                        </Form.Item>
                    </div>
                    <div className="health_card elite_health">
                        <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Locations') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'location')}
                        label="Locations"
                        >
                        <Input
                            placeholder="Clearwaater, FI (Primary)"
                            value={data.location}
                            onChange={e => handleChange('location', e.target.value)}
                        />
                        </Form.Item>
                    </div>
                    <div className="health_card elite_health">
                        <label>Recruiter Name</label>
                        <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Recruiter name') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'recruiter_id')}
                        
                        >
                                                    
                        <Select 
                            className="w-100 custom-select"
                            defaultValue="Recruiter" onChange={e => handleChange('recruiter_id', e)}>
                            {clientRecruiters ?
                                clientRecruiters.map((recruiter) =>
                                (
                                    <Option disabled={recruiter.status==0 ? true : null}  value={`${recruiter.id}`}> {recruiter.firstname}</Option>
                                ))

                                : <Option value="0" disabled selected> No Recruiter</Option>}

                        </Select>

                        </Form.Item>
                    </div>
                </div>
                <div className="d-md-flex justify-content-between">
                    <div className="health_card elite_health">
                    <label>Account Executive</label>
                        <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Account Executive') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'account_executive_id')}
                        
                        >
                        
                        <Select 
                            className="w-100 custom-select"
                            defaultValue="Account Executive" onChange={e => handleChange('account_executive_id', e)}>
                            {
                                accountExecutive ?
                                accountExecutive.map((executive) =>
                                (
                                    <Option value={`${executive.id}`}> {executive.firstname}</Option>
                                ))

                                : <Option value="0" disabled selected> No Account Executive</Option>
                            }

                        </Select>

                        </Form.Item>
                    </div>
                    <div className="health_card elite_health">
                    </div>
                    <div className="health_card elite_health">
                    </div>
                </div>
            </div> 
            }
            <div id="accordion" className="record_accordion">
            { accordion['Reqs'] && <div className="card">
                    <div className="card-header" id="headingOne">
                        <h2 className="mb-0">
                        <button className="d-flex align-items-center justify-content-between btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <span>Requisitions <img src="/images/edit_icon.png" alt=""/> </span> 
                        <span className="fa-stack fa-sm">
                        <i className="fa fa-minus" aria-hidden="true"></i>
                        </span>
                        </button>
                        </h2>
                    </div>
                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion" >
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
                                        <th>Requisition title</th>
                                        <th>New</th>
                                        <th>Submitted to hiring manager</th>
                                        <th>Offer Sent</th>
                                        <th>Rejected</th>
                                        <th>Active</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                        <td>24</td>
                                        <td>0</td>
                                        <td>87</td>
                                        <td>9</td>
                                        <td>6</td>
                                    </tr>
                                    <tr>
                                        <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                        <td>24</td>
                                        <td>0</td>
                                        <td>87</td>
                                        <td>9</td>
                                        <td>6</td>
                                    </tr>
                                    <tr>
                                        <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                        <td>24</td>
                                        <td>0</td>
                                        <td>87</td>
                                        <td>9</td>
                                        <td>6</td>
                                    </tr>
                                    <tr>
                                        <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                        <td>24</td>
                                        <td>0</td>
                                        <td>87</td>
                                        <td>9</td>
                                        <td>6</td>
                                    </tr>
                                    <tr>
                                        <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                        <td>24</td>
                                        <td>0</td>
                                        <td>87</td>
                                        <td>9</td>
                                        <td>6</td>
                                    </tr>
                                    <tr>
                                        <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                        <td>24</td>
                                        <td>0</td>
                                        <td>87</td>
                                        <td>9</td>
                                        <td>6</td>
                                    </tr>
                                    <tr>
                                        <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                        <td>24</td>
                                        <td>0</td>
                                        <td>87</td>
                                        <td>9</td>
                                        <td>6</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        </div>
                    </div>
                </div> }
                { accordion['Hiring Managers'] && <div className="card">
                    <div className="card-header" id="headingTwo">
                        <h2 className="mb-0">
                        <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        <span>Hiring Manager(s) <img src="/images/edit_icon.png" alt=""/></span>
                        <span className="fa-stack">
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        </span>
                        </button>
                        </h2>
                    </div>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body">
                        <div className="d-md-flex justify-content-between">
                            <div className="health_card elite_health">
                                <label>Name</label>
                                <Form.Item
                                    validateStatus={Joi.getFirstPlainError(errors, 'Name') ? 'error' : ''}
                                    help={Joi.getFirstPlainError(errors, 'hiring_manager_name')}
                                    
                                    >
                                    <Input
                                        placeholder="Clearwaater, FI (Primary)"
                                        value={data.hiring_manager_name}
                                        onChange={e => handleChange('hiring_manager_name', e.target.value)}
                                    />
                                </Form.Item>
                            </div>
                            <div className="health_card elite_health">
                                <label>Title</label>
                                <Form.Item
                                    validateStatus={Joi.getFirstPlainError(errors, 'Title') ? 'error' : ''}
                                    help={Joi.getFirstPlainError(errors, 'hiring_manager_title')}
                                    
                                    >
                                    <Input
                                        placeholder="Clearwaater, FI (Primary)"
                                        value={data.hiring_manager_title}
                                        onChange={e => handleChange('hiring_manager_title', e.target.value)}
                                    />
                                </Form.Item>
                            </div>
                            <div className="health_card elite_health">
                                <label>Phone</label>
                                <Form.Item
                                    validateStatus={Joi.getFirstPlainError(errors, 'Phone') ? 'error' : ''}
                                    help={Joi.getFirstPlainError(errors, 'hiring_manager_phone')}
                                    label=""
                                    >

                                    <PhoneInput
                                        type="text"
                                        placeholder="Phone Number"
                                        value={data.hiring_manager_phone}
                                        country="US"
                                        minLength="14"
                                        maxLength="14"    
                                        onChange={e => handlePhoneChange('hiring_manager_phone', e)}
                                    />

                                </Form.Item>
                            </div>
                        </div>
                        <div className="d-md-flex justify-content-between">
                            <div className="health_card elite_health">
                                <label>Email</label>
                                <Form.Item
                                    validateStatus={Joi.getFirstPlainError(errors, 'Email') ? 'error' : ''}
                                    help={Joi.getFirstPlainError(errors, 'hiring_manager_email')}
                                    
                                    >
                                    <Input
                                        placeholder="Clearwaater, FI (Primary)"
                                        value={data.hiring_manager_email}
                                        onChange={e => handleChange('hiring_manager_email', e.target.value)}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        </div>
                    </div>
                </div> }
                { accordion['Accounting/Billing Contact Info'] && <div className="card">
                    <div className="card-header" id="headingThree">
                        <h2 className="mb-0">
                        <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        <span>Accounting/Billing Contact Info <img src="/images/edit_icon.png" alt=""/></span>
                        <span className="fa-stack">
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        </span>
                        </button>
                        </h2>
                    </div>
                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                        <div className="card-body">
                        <div className="d-md-flex justify-content-between">
                            <div className="health_card elite_health">
                                <label>Contact Name</label>
                                <Form.Item
                                validateStatus={Joi.getFirstPlainError(errors, 'Contact Name') ? 'error' : ''}
                                help={Joi.getFirstPlainError(errors, 'contact_info_name')}
                                
                                >
                                <Input
                                    placeholder="Clearwaater, FI (Primary)"
                                    value={data.contact_info_name}
                                    onChange={e => handleChange('contact_info_name', e.target.value)}
                                />
                                </Form.Item>
                                <p></p>
                            </div>
                            <div className="health_card elite_health">
                                <label>Phone</label>
                                <Form.Item
                                validateStatus={Joi.getFirstPlainError(errors, 'Phone') ? 'error' : ''}
                                help={Joi.getFirstPlainError(errors, 'contact_info_phone')}
                                
                                >

                                <PhoneInput
                                    type="text"
                                    placeholder="Phone Number"
                                    value={data.contact_info_phone}
                                    country="US"
                                    minLength="14"
                                    maxLength="14"    
                                    onChange={e => handlePhoneChange('contact_info_phone', e)}
                                />

                                
                                </Form.Item>
                                <p></p>
                            </div>
                            <div className="health_card elite_health">
                                <label>Email</label>
                                <Form.Item
                                validateStatus={Joi.getFirstPlainError(errors, 'Contact Info Email') ? 'error' : ''}
                                help={Joi.getFirstPlainError(errors, 'contact_info_email')}
                                
                                >
                                <Input
                                    placeholder="Clearwaater, FI (Primary)"
                                    value={data.contact_info_email}
                                    onChange={e => handleChange('contact_info_email', e.target.value)}
                                />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="d-md-flex justify-content-between">
                            <div className="health_card elite_health">
                                <label>Address</label>
                                <Form.Item
                                validateStatus={Joi.getFirstPlainError(errors, 'Locations') ? 'error' : ''}
                                help={Joi.getFirstPlainError(errors, 'contact_info_address')}
                                
                                >
                                <Input
                                    placeholder="Clearwaater, FI (Primary)"
                                    value={data.contact_info_address}
                                    onChange={e => handleChange('contact_info_address', e.target.value)}
                                />
                                </Form.Item>
                                <p></p>
                            </div>
                            <div className="health_card elite_health">
                                
                                <Form.Item
                                validateStatus={Joi.getFirstPlainError(errors, 'Zip') ? 'error' : ''}
                                help={Joi.getFirstPlainError(errors, 'contact_info_zip')}
                                
                                >

                                <ZipcodeInput
                                    validateStatus={Joi.getFirstPlainError(errors, 'Contact Info Zip') ? 'error' : ''}
                                    help={Joi.getFirstPlainError(errors, 'contact_info_zip')}
                                    placeholder="Zip code"
                                    label="Zip"
                                    value={data.contact_info_zip}
                                    onChange={e => handleChange('contact_info_zip', e.target.value)}
                                    onSearchComplete={handleZipcodeSearchCompleteContactInfo}
                                />
                                </Form.Item>
                                <p></p>
                            </div>
                            <div className="health_card elite_health">
                                <label>City</label>
                                <Form.Item
                                validateStatus={Joi.getFirstPlainError(errors, 'City') ? 'error' : ''}
                                help={Joi.getFirstPlainError(errors, 'contact_info_city')}
                                
                                >
                                <Input
                                    placeholder="Clearwaater, FI (Primary)"
                                    value={data.contact_info_city}
                                    onChange={e => handleChange('contact_info_city', e.target.value)}
                                    readOnly
                                />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="d-md-flex justify-content-between">
                            <div className="health_card elite_health">
                               
                                <Form.Item
                                    validateStatus={Joi.getFirstPlainError(errors, 'State') ? 'error' : ''}
                                    help={Joi.getFirstPlainError(errors, 'contact_info_state')}
                                    label="State"
                                    >
                                    <Input
                                        placeholder="Clearwaater, FI (Primary)"
                                        value={data.contact_info_state}
                                        readOnly
                                        onChange={e => handleChange('contact_info_state', e.target.value)}
                                    />
                                </Form.Item>
                                <p></p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div> }
                { accordion['Description of Business'] && <div className="card">
                    <div className="card-header" id="headingfour">
                        <h2 className="mb-0">
                        <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapsefour" aria-expanded="false" aria-controls="collapsefour">
                        <span>Description of Business <img src="/images/edit_icon.png" alt=""/></span>
                        <span className="fa-stack">
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        </span>
                        </button>
                        </h2>
                    </div>
                    <div id="collapsefour" className="collapse" aria-labelledby="headingfour" data-parent="#accordion">
                        <div className="card-body px-0">
                        <div className="health_card w-100">
                            <div className="health_card w-100">
                                <label>Role Summary for Ideal Candidate.</label>
                                <Form.Item
                                    
                                    validateStatus={Joi.getFirstPlainError(errors, 'description') ? 'error' : ''}
                                    help={Joi.getFirstPlainError(errors, 'description')}
                                >
                                    <textarea
                                        value={data.note_description}
                                        onChange={v => handleChange('description', v.target.value)}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        </div>
                    </div>
                </div> }
                { accordion['Contacts'] && <div className="card">
                    <div className="card-header" id="headingfive">
                        <h2 className="mb-0">
                        <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapsefive" aria-expanded="false" aria-controls="collapsefive">
                        <span>Contacts <img src="/images/edit_icon.png" alt=""/></span>
                        <span className="fa-stack">
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        </span>
                        </button>
                        </h2>
                    </div>
                    <div id="collapsefive" className="collapse" aria-labelledby="headingfive" data-parent="#accordion">
                        <div className="card-body px-0">
                        <div className="health_card w-100 d-flex justify-content-between mt-0">
                            <label>Contact List</label>
                            <a className="text-decoration-none" href="add_candidate.html"><i className="fa fa-upload" aria-hidden="true"></i>&nbsp;&nbsp;Upload Contact</a>
                        </div>
                        <div className="my_coustomer_table requisition_table">
                            <div className="table-responsive w_bg">
                                <table className="table table-condensed mb-0" style={{borderCollapse:"collapse"}}>
                                    <thead>
                                    <tr>
                                        <th>Requisition title</th>
                                        <th>New</th>
                                        <th>Submitted to hiring manager</th>
                                        <th>Offer Sent</th>
                                        <th>Rejected</th>
                                        <th>Active</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                        <td>24</td>
                                        <td>0</td>
                                        <td>87</td>
                                        <td>9</td>
                                        <td>6</td>
                                    </tr>
                                    <tr>
                                        <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                        <td>24</td>
                                        <td>0</td>
                                        <td>87</td>
                                        <td>9</td>
                                        <td>6</td>
                                    </tr>
                                    <tr>
                                        <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                        <td>24</td>
                                        <td>0</td>
                                        <td>87</td>
                                        <td>9</td>
                                        <td>6</td>
                                    </tr>
                                    <tr>
                                        <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                        <td>24</td>
                                        <td>0</td>
                                        <td>87</td>
                                        <td>9</td>
                                        <td>6</td>
                                    </tr>
                                    <tr>
                                        <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                        <td>24</td>
                                        <td>0</td>
                                        <td>87</td>
                                        <td>9</td>
                                        <td>6</td>
                                    </tr>
                                    <tr>
                                        <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                        <td>24</td>
                                        <td>0</td>
                                        <td>87</td>
                                        <td>9</td>
                                        <td>6</td>
                                    </tr>
                                    <tr>
                                        <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                        <td>24</td>
                                        <td>0</td>
                                        <td>87</td>
                                        <td>9</td>
                                        <td>6</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        </div>
                    </div>
                </div> }
                <div className="account_form_style d-flex align-items-center mt-4">
                    <button className="update m-0" type="button" onClick={handlePost}>Create Client</button>
                    <button className=" m-0 ml-3" type="button">Cancel</button>
                </div>
            </div>
        </div>
    )

}

const mapStateToProps = store => ({
    data: store.rootReducer.adminNewClient.data,
    user: store.rootReducer.auth.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    initAdminClientUsers,
    editAdminClientUsers,
    postAdminClientUser,
}, dispatch);


   
export default connect(mapStateToProps, mapDispatchToProps)(Create);


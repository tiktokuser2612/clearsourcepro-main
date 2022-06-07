import React, { useState,useEffect } from 'react';
import { Form, Input ,  DatePicker , Select} from 'antd';
import Joi from 'utils/validator';
import notifier from 'utils/notifier';
import { useHistory } from 'react-router';

import PhoneInput from 'react-phone-number-input/input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import ZipcodeInput from 'components/Common/ZipcodeInput';
import moment from 'moment';

const { Option } = Select;

const FORM_MAIN_SCHEMA = {
    firstname : Joi.string().label('First Name').required(),
    lastname : Joi.string().label('Last Name').required(),
    username: Joi.string().label('Username').required(),
    
    phone: Joi.required().error(() => ({
        message: 'Please provide phone number',
    })),
    email: Joi.string().email().label('Email').required(),
    address: Joi.string().label('Address').required(),
    zip: Joi.string().regex(/^[0-9]*$/).error(() => ({
        message: 'Please enter digits only and should not be empty',
    })),

    mobile_number: Joi.required().error(() => ({
        message: 'Please provide Mobile number',
    })), 
    location : Joi.string().label('Location').required(),
};

const FormMain = ({ data, editAdminUser, _errors}) => {

    const history = useHistory();
    const [errors, setErrors] = useState({});

    useEffect(()=>{
        setErrors(_errors)
    },[_errors])

    const onDateChange = (date, dateString, key) => {
        // console.log('dateString:::',date, dateString)
        handleChange(key, dateString);
    };

    const handleZipcodeSearchComplete = (city, state, country) => {
        handleChange('city', city);
        handleChange('state', state);
    };

    const handlePhoneChange = (key, value) => {
        if(value != undefined){
        
            setErrors({
                [key]: isValidPhoneNumber(value) ? null : 'Phone number format invalid',
            });
            editAdminUser({ [key]: value });
        }
    };

    const handleContactNumberChange = (key, value) => {
        if(value != undefined){
        
            setErrors({
                [key]: isValidPhoneNumber(value) ? null : 'Contact number format invalid',
            });
            editAdminUser({ [key]: value });
        }
    };

    const handleChange = (key, val) => {
        
        if(key === 'confirm_password'){
            if(val.length == 0) {
              setErrors({
                ...errors,
                [key]: "'Confirm Password' is not allowed to be empty",
              });
            } else if(data.password != val){
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
                [key]: Joi.validateToPlainErrors(val, FORM_MAIN_SCHEMA[key]),
            });
        }
        
       
        editAdminUser({ [key]: val });
    };

    return (
        <div className="health_insurance_main">
            <div className="d-md-flex justify-content-between">
                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'First Name') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'firstname')}
                        //label="First Name"
                        className="w-100"
                        >
                        <label>First Name <span className="text-danger">*</span></label>
                        <Input
                            type="text"
                            placeholder="John"
                            value={data?.firstname}
                            
                            className="client_input"
                            onChange={e => handleChange('firstname', e.target.value)}
                        />
                    </Form.Item>
                </div>

                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'middlename') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'middlename')}
                        label="Middle Name"
                        className="w-100"
                        >
                        <Input
                            type="text"
                            placeholder="John"
                            value={data?.middlename}
                            className="client_input"
                            onChange={e => handleChange('middlename', e.target.value)}
                        />
                    </Form.Item>
                </div>

                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Last Name') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'lastname')}
                        //label="Last Name"
                        className="w-100"
                        >
                        <label>Last Name <span className="text-danger">*</span></label>
                        <Input
                            type="text"
                            placeholder="John"
                            value={data?.lastname}
                            className="client_input"
                            onChange={e => handleChange('lastname', e.target.value)}
                        />
                    </Form.Item>
                </div>
            </div>

            <div className="d-md-flex justify-content-between">
                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'User Name') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'username')}
                        //label="User Name"
                        className="w-100"
                        >
                        <label>UserName <span className="text-danger">*</span></label>
                        <Input
                            type="text"
                            placeholder="User12345"
                            value={data?.username}
                            
                            className="client_input"
                            onChange={e => handleChange('username', e.target.value)}
                        />
                    </Form.Item>
                </div>
                
                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Password') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'password')}
                       // label="Password"
                        className="w-100"
                        >
                        <label>Password <span className="text-danger">*</span></label>
                        <Input
                            type="password"
                            placeholder="*****"
                            value={data?.password}
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
                        //label="Confirm Password"
                        className="w-100"
                        >
                        <label>Confirm Password<span className="text-danger">*</span></label>
                        <Input
                            type="password"
                            placeholder="*****"
                            value={data?.confirm_password}
                            className="client_input"
                            onChange={e => handleChange('confirm_password', e.target.value)}
                        />
                    </Form.Item>
                    
                </div>
                
            </div>

            <div className="d-md-flex justify-content-between">
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
                            value={data?.phone}
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
                        validateStatus={Joi.getFirstPlainError(errors, 'mobile_number') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'mobile_number')}
                        label="Mobile Number"
                        className="w-100"
                        >
                        <PhoneInput
                            type="text"
                            placeholder="Mobile Number"
                            value={data?.mobile_number}
                            country="US"
                            minLength="14"
                            maxLength="14"
                            //defaultValue="Hello!"
                            
                            onChange={e => handlePhoneChange('mobile_number', e)}
                        />
                    </Form.Item>
                </div>

                <div className="health_card elite_health">
                    
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Email') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'email')}
                        //label="Email"
                        className="w-100"
                        >
                        <label>Email<span className="text-danger">*</span></label>
                        <Input
                            type="text"
                            placeholder="email@gmail.com"
                            value={data?.email}
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
                        validateStatus={Joi.getFirstPlainError(errors, 'Manager') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'manager')}
                        label="Manager"
                        className="w-100"
                        >
                        <Input
                            type="text"
                            placeholder=""
                            value={data?.manager}
                            
                            className="client_input"
                            onChange={e => handleChange('manager', e.target.value)}
                        />
                    </Form.Item>
                </div>
                <div className="health_card elite_health">
                    
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Title') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'title')}
                        label="Title"
                        className="w-100"
                        >
                        <Input
                            type="text"
                            placeholder=""
                            value={data?.title}
                            
                            className="client_input"
                            onChange={e => handleChange('title', e.target.value)}
                        />
                    </Form.Item>
                </div>
                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Date Of Birth') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'dob')}
                        label="Date Of Birth"
                        className=""
                    >
                        <DatePicker
                            format="DD/MM/YYYY"
                            value={data?.dob && moment(data?.dob, 'DD/MM/YYYY')}
                            
                            placeholder="11/01/2021"
                            suffixIcon={<i className="far fa-calendar-alt" />}
                            onChange={(date, dateString) => onDateChange(date, dateString, 'dob')}
                            className={'date-picker-style d-block t_date date_hiring'}
                        />
                    
                    </Form.Item>
                </div>
            </div>

            <div className="d-md-flex justify-content-between">
                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Start Date') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'start_date')}
                        label="Start Date"
                        className=""
                    >
                        <DatePicker
                            format="DD/MM/YYYY"
                            placeholder="11/01/2021"
                            value={data?.start_date && moment(data?.start_date, 'DD/MM/YYYY')}
                            suffixIcon={<i className="far fa-calendar-alt" />}
                            onChange={(date, dateString) => onDateChange(date, dateString, 'start_date')}
                            className={'date-picker-style d-block t_date date_hiring'}
                        />
                    </Form.Item>
                </div>
                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Termination Date') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'termination_date')}
                        label="Termination Date"
                        className=""
                    >
                        <DatePicker
                            format="DD/MM/YYYY"
                            value={data?.termination_date && moment(data?.termination_date, 'DD/MM/YYYY')}
                            placeholder="11/01/2021"
                            suffixIcon={<i className="far fa-calendar-alt" />}
                            onChange={(date, dateString) => onDateChange(date, dateString, 'termination_date')}
                            className={'date-picker-style d-block t_date date_hiring'}
                        />
                    
                    </Form.Item>
                </div>
                <div className="health_card elite_health">

                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Evaluation Date') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'evaluation_date')}
                        label="Evaluation Date"
                        className=""
                    >
                        <DatePicker
                            format="DD/MM/YYYY"
                            value={data?.evaluation_date && moment(data?.evaluation_date, 'DD/MM/YYYY')}
                            placeholder="11/01/2021"
                            suffixIcon={<i className="far fa-calendar-alt" />}
                            onChange={(date, dateString) => onDateChange(date, dateString, 'evaluation_date')}
                            className={'date-picker-style d-block t_date date_hiring'}
                        />
                    
                    </Form.Item>
                </div>

                
            </div>

            <div className="d-md-flex justify-content-between">
                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Compensation') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'desired_compensation')}
                        label="Compensation"
                        className="w-100"
                        >
                        <Input
                            type="text"
                            placeholder=""
                            value={data?.desired_compensation}
                            
                            className="client_input"
                            onChange={e => handleChange('desired_compensation', e.target.value)}
                        />
                    </Form.Item>
                </div>

                <div className="health_card elite_health">
                    
                    <label>Time Zone</label>
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Time Zone') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'time_zone')}>
                        <Select value={data?.time_zone}
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            className="w-100 new_select "
                            // onChange={v => handleChangeSearch(v)}
                            onChange={e => handleChange('time_zone', e)}

                        >
                            <Option value="">Choose Type</Option>
                            
                            <Option value="Central Standard Time">Central Standard Time</Option>
                            <Option value="Mountain Standard Time">Mountain Standard Time</Option>
                            <Option value="Pacific Standard Time">Pacific Standard Time</Option>
                            <Option value="Eastern Standard Time">Eastern Standard Time</Option>
                            
                        </Select>
                    </Form.Item>
                </div>
                <div className="health_card elite_health"></div>
            </div>

            <hr/>
            <h3>Address</h3>
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
                            value={data?.address}
                            //defaultValue="Hello!"
                            className="client_input"
                            onChange={e => handleChange('address', e.target.value)}
                        />
                    </Form.Item>
                </div>

                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'location') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'location')}
                        label="Location"
                        className="w-100"
                        >
                        <Input
                            type="text"
                            placeholder="Location"
                            value={data?.location}
                            //defaultValue="Hello!"
                            className="client_input"
                            onChange={e => handleChange('location', e.target.value)}
                        />
                    </Form.Item>
                    
                </div>

                <div className="health_card elite_health">
                    
                    <ZipcodeInput
                        validateStatus={Joi.getFirstPlainError(errors, 'zip') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'zip')}
                        placeholder="Zip code"
                        label="Zip code"
                        value={data?.zip}
                        onChange={e => handleChange('zip', e.target.value)}
                        onSearchComplete={handleZipcodeSearchComplete}
                    />
                </div>
                                
            </div>
            <div className="d-md-flex justify-content-between">
                <div className="health_card elite_health">
                    <label>City</label>
                    <Form.Item
                        // validateStatus={Joi.getFirstPlainError(errors, 'city') ? 'error' : ''}
                        // help={Joi.getFirstPlainError(errors, 'city')}
                        
                        className="w-100"
                        >
                        <Input
                            type="text"
                            readOnly
                            placeholder="City"
                            value={data?.city}
                            //defaultValue="Hello!"
                            className="client_input"
                            onChange={e => handleChange('city', e.target.value)}
                        />
                    </Form.Item>          
                
                </div>

                <div className="health_card elite_health">
                    <label>State / Region</label>
                    <Form.Item>
                        <Input
                            type="text"
                            readOnly
                            placeholder="State"
                            value={data?.state}
                            //defaultValue="Hello!"
                            className="client_input"
                            onChange={e => handleChange('state', e.target.value)}
                        />
                    </Form.Item>
                    
                </div>
                <div className="health_card elite_health">
                </div>
            </div>
            <hr/>
            
            <h3>Mailing Address</h3>
            <div className="d-md-flex justify-content-between">
                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'secondary_address') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'secondary_address')}
                        label="Address"
                        className="w-100"
                        >
                        <Input
                            type="text"
                            placeholder=""
                            value={data?.secondary_address}
                            
                            className="client_input"
                            onChange={e => handleChange('secondary_address', e.target.value)}
                        />
                    </Form.Item>
                </div>

                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Country') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'country')}
                        label="Country"
                        className="w-100"
                        >
                        <Input
                            type="text"
                            placeholder=""
                            value={data?.country}
                            
                            className="client_input"
                            onChange={e => handleChange('country', e.target.value)}
                        />
                    </Form.Item>
                </div>                
                <div className="health_card elite_health"></div>
            </div>

            <hr/>
            <h3>Emergency Contact</h3>
            <div className="d-md-flex justify-content-between">
                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Name') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'name')}
                        label="Name"
                        className="w-100"
                        >
                        <Input
                            type="text"
                            placeholder=""
                            value={data?.name}
                            
                            className="client_input"
                            onChange={e => handleChange('name', e.target.value)}
                        />
                    </Form.Item>
                </div>

                <div className="health_card elite_health">

                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'contact_number') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'contact_number')}
                        label="Contact Number"
                        className="w-100"
                        >
                        <PhoneInput
                            type="text"
                            placeholder="Contact Number"
                            value={data?.contact_number}
                            country="US"
                            minLength="14"
                            maxLength="14"
                            //defaultValue="Hello!"
                            
                            onChange={e => handleContactNumberChange('contact_number', e)}
                        />
                    </Form.Item>

                </div>
                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Relationship') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'Relationship')}
                        label="Relationship"
                        className="w-100"
                        >
                        <Input
                            type="text"
                            placeholder=""
                            value={data?.relationship}
                            
                            className="client_input"
                            onChange={e => handleChange('relationship', e.target.value)}
                        />
                    </Form.Item>
                </div>
            </div>

        </div>
    )
}

export default FormMain;
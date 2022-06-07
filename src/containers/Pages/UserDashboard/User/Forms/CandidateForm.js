import React, { useState,useEffect } from 'react';
import { DatePicker, Form, Input , Select} from 'antd';
import Joi from 'utils/validator';
import notifier from 'utils/notifier';
import { useHistory } from 'react-router';

import PhoneInput from 'react-phone-number-input/input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import ZipcodeInput from 'components/Common/ZipcodeInput';
import moment from 'moment';

const { Option } = Select;

const CREATE_USER_SCHEMA = {
    firstname : Joi.string().label('First Name').required(),
    lastname : Joi.string().label('Last Name').required(),
    email: Joi.string().email().label('Email').required(),
    address: Joi.string().label('Address').required(),
    city: Joi.string().required(),
    state: Joi.string().label('State').required().error(() => ({
        message: 'Please select state',
    })), 
    zip: Joi.string().regex(/^[0-9]*$/).error(() => ({
        message: 'Please enter digits only and should not be empty',
    })),

    dob : Joi.string().label('Date of birth').required(),
    home_phone_number : Joi.string().label('Home Phone Number').required(),
    phone : Joi.string().label('Mobile Number').required(),
    time_zone : Joi.string().label('Time Zone').required(),
    language  : Joi.string().label('Language').required(),
    desired_compensation : Joi.string().label('Desired Compensation').required(),
    start_date : Joi.string().label('Start date').required(),
    termination_date : Joi.string().label('Termination Date').required(),
    
    emergency_contact: Joi.required().error(() => ({
        message: 'Please provide emergency contact',
    })),

    home_phone_number: Joi.required().error(() => ({
        message: 'Please provide home phone number',
    })),

    phone: Joi.required().error(() => ({
        message: 'Please provide mobile number',
    })),

    user_role: Joi.string().label('User type').required().error(() => ({
        message: 'Please select which type of user you want to create',
    })),
};

const CandidateForm = ({ data, editAdminUser, _errors}) => {

    const history = useHistory();
    const [errors, setErrors] = useState({});

    useEffect(()=>{
        setErrors(_errors)
    },[_errors])

    const onDateChange = (date, dateString, key) => {
        handleChange(key, dateString);
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
                [key]: Joi.validateToPlainErrors(val, CREATE_USER_SCHEMA[key]),
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
                        validateStatus={Joi.getFirstPlainError(errors, 'Middle Name') ? 'error' : ''}
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
                            placeholder="John"
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
                        //label="Password"
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
                        <label>Confirm Password <span className="text-danger">*</span></label>
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
                        validateStatus={Joi.getFirstPlainError(errors, 'Email') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'email')}
                        //label="Email"
                        className="w-100"
                        >
                        <label>Email <span className="text-danger">*</span></label>
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
                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'dob') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'dob')}
                        label="Date of Birth"
                        className="w-100"
                        >

                        <DatePicker
                            format="DD/MM/YYYY"
                            placeholder="11/01/2021"
                            value={data?.dob && moment(data?.dob, 'DD/MM/YYYY')}
                            suffixIcon={<i className="far fa-calendar-alt" />}
                            onChange={(date, dateString) => onDateChange(date, dateString, 'dob')}
                            className={'date-picker-style d-block t_date date_hiring'}
                        />

                    </Form.Item>
                </div>
                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'home_phone_number') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'home_phone_number')}
                        label="Home Phone Number"
                        className="w-100"
                        >

                        <PhoneInput
                            type="text"
                            placeholder="Home Phone Number"
                            value={data?.home_phone_number}
                            country="US"
                            minLength="14"
                            maxLength="14" 
                            onChange={e => handlePhoneChange('home_phone_number', e)}
                        />
                    </Form.Item>
                </div> 
            </div>

            <div className="d-md-flex justify-content-between">
                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'phone') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'phone')}
                        label="Mobile Number"
                        className="w-100"
                        >
                        <PhoneInput
                            type="text"
                            placeholder="Mobile Number"
                            value={data?.phone}
                            country="US"
                            minLength="14"
                            maxLength="14" 
                            onChange={e => handlePhoneChange('phone', e)}
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

                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'language') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'language')}
                        label="Language"
                        className="w-100"
                        >

                        <Input
                            type="text"
                            placeholder="Language"
                            value={data?.language}
                            onChange={e => handleChange('language', e.target.value)}
                        />
                    </Form.Item>
                </div> 
            </div>

            <div className="d-md-flex justify-content-between">
                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'start_date') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'start_date')}
                        label="Start date"
                        className="w-100"
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
                        validateStatus={Joi.getFirstPlainError(errors, 'termination_date') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'termination_date')}
                        label="Termination Date"
                        className="w-100"
                        >

                        <DatePicker
                            format="DD/MM/YYYY"
                            placeholder="11/01/2021"
                            value={data?.termination_date && moment(data?.termination_date, 'DD/MM/YYYY')}
                            suffixIcon={<i className="far fa-calendar-alt" />}
                            onChange={(date, dateString) => onDateChange(date, dateString, 'termination_date')}
                            className={'date-picker-style d-block t_date date_hiring'}
                        />

                    </Form.Item>
                </div> 
                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'desired_compensation') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'desired_compensation')}
                        label="Desired Compensation"
                        className="w-100"
                        >

                        <Input
                            type="text"
                            placeholder="Desired Compensation"
                            value={data?.desired_compensation}
                            onChange={e => handleChange('desired_compensation', e.target.value)}
                        />
                    </Form.Item>
                </div>
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
                <div className="health_card elite_health">
                    <label>City</label>
                    <Form.Item className="w-100" >
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
            </div>
            <div className="d-md-flex justify-content-between">
                <div className="health_card elite_health">
                    <label>State</label>
                    <Form.Item className="w-100" >
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
            </div>

            <hr/>
            <h3>Mailing Address</h3>
            <div className="d-md-flex justify-content-between">
                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'secondary_address') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'secondary_address')}
                        label="Secondary Address"
                        className="w-100"
                        >

                        <Input
                            type="text"
                            placeholder="Secondary Address"
                            value={data?.secondary_address}
                            onChange={e => handleChange('secondary_address', e.target.value)}
                        />
                    </Form.Item>
                </div>

                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'country') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'country')}
                        label="Country"
                        className="w-100"
                        >

                        <Input
                            type="text"
                            placeholder="Country"
                            value={data?.country}
                            onChange={e => handleChange('country', e.target.value)}
                        />
                    </Form.Item>
                </div>

                <div className="health_card elite_health">
                </div> 
            </div>

            <hr/>
            <h3>Emergency Contact</h3>
            <div className="d-md-flex justify-content-between">
                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'name') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'name')}
                        label="Name"
                        className="w-100"
                        >

                        <Input
                            type="text"
                            placeholder="Name"
                            value={data?.name}
                            onChange={e => handleChange('name', e.target.value)}
                        />
                    </Form.Item>
                </div>

                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'emergency_contact') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'emergency_contact')}
                        label="Contact Number                        "
                        className="w-100"
                        >

                        <PhoneInput
                            type="text"
                            placeholder="Contact Number"
                            value={data?.emergency_contact}
                            country="US"
                            minLength="14"
                            maxLength="14" 
                            onChange={e => handlePhoneChange('emergency_contact', e)}
                        />
                    </Form.Item>
                </div>

                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'relationship') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'relationship')}
                        label="Relationship"
                        className="w-100"
                        >

                        <Input
                            type="text"
                            placeholder="Relationship"
                            value={data?.relationship}
                            onChange={e => handleChange('relationship', e.target.value)}
                        />
                    </Form.Item>
                </div> 
            </div>

        </div>
    )
}

export default CandidateForm;
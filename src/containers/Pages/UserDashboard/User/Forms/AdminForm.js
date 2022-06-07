import React, { useEffect, useState } from 'react';
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
};

const AdminForm = ({ data, editAdminUser, _errors, isEdit=false}) => {

    const history = useHistory();
    const [errors, setErrors] = useState({});

    useEffect(()=>{
        setErrors(_errors)
    },[_errors])
    
    const handlePhoneChange = (key, value) => {
        if(value != undefined){
            setErrors({
            [key]: isValidPhoneNumber(value) ? null : ['Phone number format invalid'],
            });
            editAdminUser({ [key]: value });
        }
    };

    console.log(errors)

    const handleChange = (key, val) => {
        if(key === 'confirm_password' && isEdit == false){
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
                            autoComplete={false}
                            className="client_input"
                            onChange={e => handleChange('username', e.target.value)}
                        />
                    </Form.Item>
                </div>
                
                <div className="health_card elite_health">
                    
                    { !isEdit && <Form.Item
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
                            autoComplete="off"
                            className="client_input"
                            onChange={e => handleChange('password', e.target.value)}
                        />
                    </Form.Item>}
                </div>

                <div className="health_card elite_health">
                    
                    { !isEdit && <Form.Item
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
                    </Form.Item>}
                    
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
                        <label>First Name <span className="text-danger">*</span></label>
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
        </div>
    )
}

export default AdminForm;
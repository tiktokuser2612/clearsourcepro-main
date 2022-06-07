import React, { useEffect, useState } from 'react';
import { Form, Input, Select} from 'antd';
import Joi from 'utils/validator';
import notifier from 'utils/notifier';
import { useHistory } from 'react-router';

import PhoneInput from 'react-phone-number-input/input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import ZipcodeInput from 'components/Common/ZipcodeInput';

const { Option } = Select;

const CREATE_USER_SCHEMA = {

    firstname : Joi.string().label('First Name').required(),
    lastname : Joi.string().label('Last Name').required(),
    username: Joi.string().label('Username').required(),
    
    phone: Joi.required().error(() => ({
        message: 'Phone number format invalid',
    })),

    email: Joi.string().email().label('Email').required(),
    address: Joi.string().label('Address').required(),
    location: Joi.string().label('Location').required(),
    zip: Joi.string().regex(/^[0-9]*$/).error(() => ({
        message: 'Please enter digits only and should not be empty',
    })),

    user_role: Joi.string().label('User type').required().error(() => ({
        message: 'Please select which type of user you want to create',
    })),

};

const ClientMain = ({ data, editAdminUser, _errors}) => {

    const history = useHistory();
    const [errors, setErrors] = useState({});

    useEffect(()=>{
        setErrors(_errors)
    },[_errors])
    
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

                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'User Name') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'username')}
                       // label="User Name"
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
                
            </div>

            <div className="d-md-flex justify-content-between">
                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'email') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'email')}
                        label="Primary Email"
                        className="w-100"
                        >
                        <Input
                            type="text"
                            placeholder="email@gmail.com"
                            value={data?.email}
                            autoComplete="off"
                            className="client_input"
                            onChange={e => handleChange('email', e.target.value)}
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
                        <label>Password<span className="text-danger">*</span></label>
                        <Input
                            type="password"
                            placeholder="*****"
                            value={data?.password}
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
                        validateStatus={Joi.getFirstPlainError(errors, 'primary_contact_title') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'primary_contact_title')}
                        label="Primary Contact Title"
                        className="w-100"
                        >
                        <Input
                            type="text"
                            placeholder="Title"
                            value={data?.primary_contact_title}
                            className="client_input"
                            onChange={e => handleChange('primary_contact_title', e.target.value)}
                        />

                    </Form.Item>
                </div>
                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'primary_contact_name') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'primary_contact_name')}
                        label="Primary Contact Name"
                        className="w-100"
                        >
                        <Input
                            type="text"
                            placeholder=""
                            value={data?.primary_contact_name}
                            className="client_input"
                            onChange={e => handleChange('primary_contact_name', e.target.value)}
                        />
                    </Form.Item>
                </div>
                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'phone') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'phone')}
                        label="Primary Phone"
                        className="w-100"
                        >
 
                        <PhoneInput
                            type="text"
                            placeholder="Primary Phone Number"
                            value={data?.phone}
                            country="US"
                            minLength="14"
                            maxLength="14"                            
                            onChange={e => handlePhoneChange('phone', e)}
                        />
                    </Form.Item>
                </div>
            </div>

            <div className="d-md-flex justify-content-between">
                <div className="health_card elite_health">
                    <label>Years in Business</label>
                    <Form.Item>
                        <Input
                            type="number"
                            placeholder="Years in Business"
                            value={data?.years_in_business}
                            min={0}
                            className="client_input"
                            onChange={e => handleChange('years_in_business', e.target.value)}
                        />
                    </Form.Item>
                </div> 
                
                <div className="health_card elite_health">
                    <label>Client Status</label>
                    {/* <Form.Item>
                            <select className="client_input form-control"
                            value={data?.client_status}  
                            onChange={e => handleChange('client_status', e.target.value)}
                            >
                            <option value="">Select Option</option>
                            <option value="New">New</option>
                            <option value="Prospect">Prospect</option>
                            <option value="Contacted">Contacted</option>
                        </select>
                    </Form.Item> */}

                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Client Status') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'client_status')}>
                        <Select value={data?.client_status}
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            className="w-100 new_select "
                            // onChange={v => handleChangeSearch(v)}
                            onChange={e => handleChange('client_status', e)}

                        >
                            <Option value="">Choose Type</Option>
                            <Option value="New">New</Option>
                            <Option value="Prospect">Prospect</Option>
                            <Option value="Contacted">Contacted</Option>
                            
                        </Select>
                    </Form.Item>

                </div>

                <div className="health_card elite_health">
                    <div className={
                        data.client_status == "Contacted" ? "" : 'd-none'
                    }>
                        <label>Contacted</label>
                        <Form.Item validateStatus={Joi.getFirstPlainError(errors, 'Client Status') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'client_status')}>
                          
                        <Select value={data?.contacted}
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            className="w-100 new_select "
                            // onChange={v => handleChangeSearch(v)}
                            onChange={e => handleChange('contacted', e)}

                        >

                                <Option value="">Choose Type</Option>
                                <Option value="Called LM">Called LM</Option>
                                <Option value="Sent email">Sent email </Option>
                                <Option value="Texted">Texted</Option>
                                <Option value="LinkedIn">LinkedIn</Option>
                                <Option value="Follow up">Follow up</Option>
                            </Select>
                        </Form.Item>
                    </div>
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
                            className="client_input"
                            onChange={e => handleChange('address', e.target.value)}
                        />
                    </Form.Item>
                </div>

                <div className="health_card elite_health">
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Location') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'location')}
                        label="Location"
                        className="w-100"
                        >
                        <Input
                            type="text"
                            placeholder="Location"
                            value={data?.location}
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
                    <Form.Item className="w-100" >
                        <Input
                            type="text"
                            readOnly
                            placeholder="City"
                            value={data?.city}
                            className="client_input"
                            onChange={e => handleChange('city', e.target.value)}
                        />
                    </Form.Item>          
                </div>
                               
            </div>

            
        </div>
    )
}

export default ClientMain;
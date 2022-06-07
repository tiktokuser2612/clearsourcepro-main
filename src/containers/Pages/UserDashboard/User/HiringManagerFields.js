import React, { useEffect, useState } from 'react';
import { Select,Form, Input} from 'antd';
import Joi from 'utils/validator';
import notifier from 'utils/notifier';

import { useHistory } from 'react-router';

import PhoneInput from 'react-phone-number-input/input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import ZipcodeInput from 'components/Common/ZipcodeInput';
import UserPermission from './UserPermission';

const CREATE_USER_SCHEMA = {

    firstname : Joi.string().label('First Name').required(),
    lastname : Joi.string().label('Last Name').required(),
    username: Joi.string().label('Username').required(),
    password: Joi.string().label('Password').required(),
    
    phone: Joi.required().error(() => ({
        message: 'Please provide phone number',
    })),

    email: Joi.string().email().label('Email').required(),
    address: Joi.string().label('Address').required(),
    // city: Joi.string().required() ,
    // state: Joi.string().label('State').required().error(() => ({
    //     message: 'Please select state',
    // })), 
    zip: Joi.string().regex(/^[0-9]*$/).error(() => ({
        message: 'Please enter digits only and should not be empty',
    })),

    user_role: Joi.string().label('User type').required().error(() => ({
        message: 'Please select which type of user you want to create',
    })),

};

const HiringManager = ({initAdminUser, data,  postAdminUser,  editAdminUser,permission}) => {

    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [image, setImage] = useState(null);
    const [userRoleError, setUserRoleError] = useState('');

    useEffect(() => {
        initAdminUser()
    }, [initAdminUser]);

    const handlePost = (e) => {



        if (e && e.preventDefault) {
          e.preventDefault();
        }
    
        // Validate all fields
        const errors = Joi.validateToPlainErrors(data, (['user', 'admin'].indexOf(data.user_role) === -1) ? CREATE_USER_SCHEMA : CREATE_USER_SCHEMA);
        setErrors(errors);
        
        if (Joi.hasPlainError(errors)) {
          notifier.error('Please fix errors');
          setUserRoleError('Please select which type of user you want to create');
          return;
        }
        
        console.log('data',data)

        postAdminUser(data)
            .then(res => {
                notifier.success('Create user success!');
                initAdminUser();
                history.push('/admin/users');
            })
            .catch(err => {
                
                if(err.response.data.msg){
                    notifier.error(err.response.data.msg + " on Jobvite Platform");
                }else{
                    notifier.error("Create User fail");
                }
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
            editAdminUser({ [key]: value });
        }
    };

    const handleChange = (key, val) => {
        // Validate individual
        // Validate individual
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
    const onUploadFinish = (error, result) => {
        if (error) {
          console.log('Upload error: ', error);
        }
        if (result.event === 'success') {
          console.log(result.info.secure_url);
          handleChange('photo_url', result.info.secure_url);
        }
      };
    
      const onUploadFile = () => {
        const myCropWidget = window.cloudinary.createUploadWidget(
          {
            cloudName: 'soapbravowork',
            uploadPreset: 't3emetzy',
            folder: 'widgetUpload',
            cropping: true,
          },
          onUploadFinish,
        );
    
        myCropWidget.open();
      };
      const onCancel = () =>{
        history.push('/admin/users');
      }

      console.log('errors', errors)
      console.log('data', data)


    return (
        <div className="health_insurance_main">
            <div className="d-md-flex justify-content-between align-items-center">
                <h1>Create User</h1>
                
                <div className="recruiter_check d-flex">
                    <div className="custom-control custom-checkbox">
                        
                        <input className="custom-control-input" type="checkbox" id="customCheck1"
                            onChange={v => {v.target.checked && handleChange('user_role', 'admin');}}
                            checked={data.user_role === 'admin'}
                        />
                        <label className="custom-control-label" for="customCheck1">Admin</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        
                        <input className="custom-control-input" type="checkbox" id="customCheck5"
                            onChange={v => {v.target.checked && handleChange('user_role', 'account_executive');}}
                            checked={data.user_role === 'account_executive'}
                        />
                        <label className="custom-control-label" for="customCheck5">Account Executive</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        
                        <input className="custom-control-input" type="checkbox" id="customCheck2"
                            onChange={v => {v.target.checked && handleChange('user_role', 'recruiter');}}
                            checked={data.user_role === 'recruiter'}
                        />

                        <label className="custom-control-label" for="customCheck2">Recruiter</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        
                        <input className="custom-control-input" type="checkbox" id="customCheck3"
                            onChange={v => {v.target.checked && handleChange('user_role', 'candidate');}}
                            checked={data.user_role === 'candidate'}
                        />
                        
                        <label className="custom-control-label" for="customCheck3">Candidate</label>
                        
                    </div>
                    <div className="custom-control custom-checkbox">
                        
                        <input className="custom-control-input" type="checkbox" id="customCheck4"
                            onChange={v => {v.target.checked && handleChange('user_role', 'client');}}
                            checked={data.user_role === 'client'}
                        />
                        <label className="custom-control-label" for="customCheck4">Client</label>
                    </div>

                    <div className="custom-control custom-checkbox">
                        
                        <input className="custom-control-input" type="checkbox" id="customCheck6"
                            onChange={v => {v.target.checked && handleChange('user_role', 'hiring_manager');}}
                            checked={data.user_role === 'hiring_manager'}
                        />
                        <label className="custom-control-label" for="customCheck6">Hiring Manager</label>
                    </div>
                    
                    
                </div>
                
                
            </div> 
            <div className='d-md-flex justify-content-between align-items-center'>
            <h1></h1>
                <div className=" d-flex">
                {data.user_role == '' ? 
                    <span style={{color:'red'}}>{userRoleError}</span>
                    : ''
                }
                </div>
            </div>
             
            <div className="add_profile_img col-md-3" onClick={onUploadFile}>
            {data.photo_url ? <img src={data.photo_url} alt="" style={{ maxWidth: 77, maxHeight: 77 }}/>: <img src="/images/no_img.png" alt="" />}
                <h6 className="ml-2">Set Profile Image</h6>
               
            </div>
            <div className="d-md-flex justify-content-between">
                <div className="health_card elite_health">
                    
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'First Name') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'firstname')}
                        label="First Name"
                        className="w-100"
                        >
                        <Input
                            type="text"
                            placeholder="John"
                            value={data.firstname}
                            
                            className="client_input"
                            onChange={e => handleChange('firstname', e.target.value)}
                        />
                    </Form.Item>

                </div>

                <div className="health_card elite_health">
                    
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Last Name') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'lastname')}
                        label="Last Name"
                        className="w-100"
                        >
                        <Input
                            type="text"
                            placeholder="John"
                            value={data.lastname}
                            
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
                            value={data.company_name}
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
                        label="Zip code"
                        value={data.zip}
                        onChange={e => handleChange('zip', e.target.value)}
                        onSearchComplete={handleZipcodeSearchComplete}
                    />
                </div>
                
            </div>
            <div className="d-md-flex justify-content-between">
                
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
                            value={data.city}
                            //defaultValue="Hello!"
                            className="client_input"
                            onChange={e => handleChange('city', e.target.value)}
                        />
                    </Form.Item>          
                
                </div>
                <div className="health_card elite_health">
                    <label>State / Region</label>
                    <Form.Item
                        // validateStatus={Joi.getFirstPlainError(errors, 'state') ? 'error' : ''}
                        // help={Joi.getFirstPlainError(errors, 'state')}
                        >
                        <Input
                            type="text"
                            readOnly
                            placeholder="State"
                            value={data.state}
                            //defaultValue="Hello!"
                            className="client_input"
                            onChange={e => handleChange('state', e.target.value)}
                        />
                    </Form.Item>
                    
                </div>
                
            </div>
            <UserPermission permission={permission} action={1} editAdminUser={editAdminUser}></UserPermission>
            <div className="account_form_style d-flex align-items-center mt-4">
                <button onClick={handlePost} className="update m-0" type="button">Create</button>
                <button className=" m-0 ml-3" onClick={onCancel} type="button">Cancel</button>
            </div>
        </div>
    )
}

export default HiringManager;
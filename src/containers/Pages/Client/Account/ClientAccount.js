import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Select,Form, Input} from 'antd';
import { useParams } from 'react-router-dom';
import LoadingIndicator from 'components/Common/LoadingIndicator';

import PhoneInput from 'react-phone-number-input/input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import ZipcodeInput from 'components/Common/ZipcodeInput';

import {
    putClientUserAccount,
    initClientUserAccount,
    editClientUserAccount,
    getClientUserAccount,
    
  } from 'store/actions/clientAccount';

import notifier from 'utils/notifier';
import Joi from 'utils/validator';


const { Option } = Select;

const EDIT_CLIENT_SCHEMA = {

    
    firstname : Joi.string().label('First Name').required(),
    lastname : Joi.string().label('Last Name').required(),

    username: Joi.string().label('Username').required(),
    
    phone: Joi.required().error(() => ({
        message: 'Please provide phone number',
    })),
    email: Joi.string().email().label('Email').required(),
    address: Joi.string().label('Address').required(),
    city: Joi.string().label('City').required() ,
    state: Joi.string().label('State').required().error(() => ({
        message: 'Please select state',
    })), 
    zip: Joi.string().regex(/^[0-9]*$/).error(() => ({
        message: 'Please enter digits only and should not be empty',
    })),

};

const EditClientAccount = ({initClientUserAccount, data,user, putClientUserAccount, editClientUserAccount, getClientUserAccount,edited}) => {

    const history = useHistory();

    
    const [errors, setErrors] = useState({});

    const [selectedFile, setSelectedFile] = useState(null);
    
    

    useEffect(() => {
        initClientUserAccount()
        getClientUserAccount(user.id)
        .catch(err => {
          notifier.error('No user data found!');
          
        });
    }, [getClientUserAccount, initClientUserAccount, history]);


    const handleZipcodeSearchComplete = (city, state, country) => {
        handleChange('city', city);
        handleChange('state', state);
    };

    const handlePhoneChange = (key, value) => {
        if(value != undefined){
        
            setErrors({
            [key]: isValidPhoneNumber(value) ? null : ['Phone number format invalid'],
            });
            editClientUserAccount({ [key]: value });
        }
    };
    const handlePut = (e) => {

        if (e && e.preventDefault) {
          e.preventDefault();
        }
    
        // Validate all fields
        const errors = Joi.validateToPlainErrors(data, (['client', 'admin'].indexOf(data.user_role) === -1) ? EDIT_CLIENT_SCHEMA : EDIT_CLIENT_SCHEMA);
        setErrors(errors);
        
        if (Joi.hasPlainError(errors)) {
          notifier.error('Please fix errors');
          return;
        }
        if(data.user_role == ''){
            notifier.error('Please select which type of user you want to create');
            return;
        }

        const formData = new FormData();

        if(selectedFile){
            
            console.log('selectedFile',selectedFile)
            formData.append('File', selectedFile);
        }

        data.user_id = user.id;
        for (const [key, value] of Object.entries(data)) {
            // console.log(key + 'key '  , value + 'value')
            formData.append(key, value);
        }
        
        putClientUserAccount(formData)
            .then(res => {
                notifier.success('Update user success!');
                initClientUserAccount();
                history.push('/client/account/view'); 
            })
            .catch(err => {
                notifier.error('Update user failed!');
                setErrors(err.errors || {});
        });
        
    };

    const changeHandler = (event) => {
        
        // formData.append('File', event.target.files);
           
        
        if(event.target.files){

            const fileSize = event.target.files[0].size / 1024 / 1024;
            
            if(fileSize > 2){
                notifier.error('File size should not greater than 2 MB');
                return;
            }
            
            setSelectedFile(event.target.files[0]);
                            
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
                [key]: Joi.validateToPlainErrors(val, EDIT_CLIENT_SCHEMA[key]),
            });
        }
       
        editClientUserAccount({ [key]: val });
    };
    
    const onCancel = () =>{
        history.push('/admin/users');
    }

    return (
        
        <div className="health_insurance_main">
            <h6 className="ml-2">Set Profile Image</h6>
            <input type="file" onChange={changeHandler} />

            {data ?.user_image ? <img src={'/storage/images/'+data.user_image} alt="" style={{ maxWidth: 77, maxHeight: 77 }}/> : null }
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
                            placeholder="Email"
                            value={data.email}
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
                    <div className="state_salary">
                        <label>State / Region</label>
                        <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'state') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'state')}>
                        <Input
                            type="text"
                            readOnly
                            placeholder="Clearwater"
                            value={data.state}
                            //defaultValue="Hello!"
                            className="client_input"
                            onChange={e => handleChange('state', e.target.value)}
                        />
                    </Form.Item>    
                    </div>
                </div>
               
                <div className="health_card elite_health"></div>
               
            </div>
            <div className="account_form_style d-flex align-items-center mt-4">
                <button onClick={handlePut} className="update m-0" type="button">Update</button>
                <button className=" m-0 ml-3" onClick={onCancel} type="button">Cancel</button>
            </div>
        </div>
    )
}

const mapStateToProps = store => ({
    data: store.rootReducer.clientUserAccount.data,
    isPutting: store.rootReducer.clientUserAccount.isPutting,
    edited: store.rootReducer.clientUserAccount.edited,
    user : store.rootReducer.auth.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    initClientUserAccount,
    editClientUserAccount,
    putClientUserAccount,
    getClientUserAccount,
}, dispatch);
 
   
export default connect(mapStateToProps, mapDispatchToProps)(EditClientAccount);
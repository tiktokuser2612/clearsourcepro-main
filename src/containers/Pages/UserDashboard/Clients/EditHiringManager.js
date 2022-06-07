import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Form, Input} from 'antd';
import {
    initClientHiringManager,
    editClientHiringManager,
    getClientHiringManager,
    putClientContact,
    getListClientHiringManagers
  } from 'store/actions/adminClientContact';

import PhoneInput from 'react-phone-number-input/input';
import notifier from 'utils/notifier';
import Joi from 'utils/validator';
import { isValidPhoneNumber } from 'react-phone-number-input';
import ZipcodeInput from 'components/Common/ZipcodeInput';


const UPDATE_HIRING_MANAGER = {

    hiring_manager_name : Joi.string().label('Name').required(),
    hiring_manager_title : Joi.string().label('Title').required(),
    hiring_manager_phone : Joi.string().label('Phone').required(),
    hiring_manager_email : Joi.string().label('Email').required(),
    
    contact_info_name : Joi.string().label('Name').required(),
    contact_info_email : Joi.string().label('Email').required(),
    contact_info_phone : Joi.string().label('Phone').required(),
    contact_info_address : Joi.string().label('Address').required(),
    contact_info_city : Joi.string().label('City').required(),
    contact_info_zip : Joi.string().label('Zip').required(),
    contact_info_state : Joi.string().label('State').required(),
 
};



const EditHiringManager = ({initClientHiringManager,
        data,  
        editClientHiringManager, 
        getClientHiringManager,
        putClientContact, 
        isPutting, 
        isFetching , 
        setEditContact,
        hiringManagerId,
        getListClientHiringManagers
    }) => {

    const history = useHistory();
    const { clientId } = useParams();

    console.log('clientId',clientId);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        initClientHiringManager();
        
        getClientHiringManager(hiringManagerId);
        // data.hiring_manager_name = data.get_client_manager.hiring_manager_name;
    }, [getClientHiringManager,initClientHiringManager,hiringManagerId]);

    const handlePut = (e) => {
        if (e && e.preventDefault) {
          e.preventDefault();
        }
    
        // Validate all fields
        const errors = Joi.validateToPlainErrors(data, (['client', 'admin'].indexOf(data.user_role) === -1) ? UPDATE_HIRING_MANAGER : UPDATE_HIRING_MANAGER);
        setErrors(errors);
        
        
        if (Joi.hasPlainError(errors)) {
            
            notifier.error('Please fix errors');
            return;
        }
        
    
        putClientContact(hiringManagerId, data)
            .then(res => {
                notifier.success('Update user success!');
                
                setEditContact(false);
                getListClientHiringManagers(1, 4 ,{"id" : data.client_id} , null, true);
                // history.push('/admin/clients/view/'+clientId); 
            })
            .catch(err => {
                notifier.error('Update user failed!', err.msg);
                setErrors(err.errors || {});
        });

    };

    
    const handlePhoneChange = (key, value) => {
        if(value != undefined){
        
            setErrors({
            [key]: isValidPhoneNumber(value) ? null : ['Phone number format invalid'],
            });
            editClientHiringManager({ [key]: value });
        }
    };


    const handleZipcodeSearchCompleteContactInfo = (contact_info_city, contact_info_state, country) => {
        handleChange('contact_info_city', contact_info_city);
        handleChange('contact_info_state', contact_info_state);
    };

    const handleChange = (key, val) => {
        // Validate individual
        
        setErrors({
            ...errors,
            [key]: Joi.validateToPlainErrors(val, UPDATE_HIRING_MANAGER[key]),
        });
        
        editClientHiringManager({ [key]: val });
    };

    const removeEditNewHiringMangerForm = () => {
        setEditContact(false);
    }
    
    return (
        <>
        <div >
        
            <div className="card-body ">
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
                                
                                value={data.hiring_manager_email}
                                onChange={e => handleChange('hiring_manager_email', e.target.value)}
                            />
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="d-md-flex justify-content-between">
                    <div className="health_card elite_health">
                        <label>Contact Name</label>
                        <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Contact Name') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'contact_info_name')}
                        
                        >
                        <Input
                            placeholder="John"
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
                            
                            value={data.contact_info_city}
                            onChange={e => handleChange('contact_info_city', e.target.value)}
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
                                
                                value={data.contact_info_state}
                                onChange={e => handleChange('contact_info_state', e.target.value)}
                            />
                        </Form.Item>
                            
                    </div>
                </div>
                <div className="account_form_style d-flex align-items-center mt-4">
                    <button className="update m-0" type="button" onClick={handlePut}>Edit Hiring Manager</button>
                    <button className=" m-0 ml-3" type="button" onClick={removeEditNewHiringMangerForm}>Cancel</button>
                </div>  
            </div>
                    
        </div>    
    </>
    )

}

const mapStateToProps = store => ({
    isFetching: store.rootReducer.adminClientContact.isFetching,
    data: store.rootReducer.adminClientContact.data,
    isPutting: store.rootReducer.adminClientContact.isPutting,
    edited: store.rootReducer.adminClientContact.edited,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    initClientHiringManager,
    editClientHiringManager,
    getClientHiringManager,
    getListClientHiringManagers,
    putClientContact
}, dispatch);


   
export default connect(mapStateToProps, mapDispatchToProps)(EditHiringManager);

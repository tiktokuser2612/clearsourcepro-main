import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import {
    postAdminUser,
    initAdminUser,
    editAdminUser,
  } from 'store/actions/adminUser';

import notifier from 'utils/notifier';
import Joi from 'utils/validator';
// import UserPermission from './UserPermission';

import UserPermission from '../UserPermission';

import FormMain from './FormMain';
import CandidateForm from './CandidateForm';
import ClientForm from './Clientform';
import AdminForm from './AdminForm';
import LoadingIndicator from 'components/Common/LoadingIndicator';

import {FORM_MAIN_SCHEMA } from './validation';


const Create = ({initAdminUser, data, postAdminUser, editAdminUser, permission}) => {

    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [userRoleError, setUserRoleError] = useState(''); 
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {
        initAdminUser()
    }, [initAdminUser]);

    const handlePost = async (e) => {
        setIsLoading(true)
        if (e && e.preventDefault) {
          e.preventDefault();
        }
    
        // Validate all fields
        const errors = Joi.validateToPlainErrors(data, FORM_MAIN_SCHEMA);
        setErrors(errors);
        
        if (Joi.hasPlainError(errors)) {
            notifier.error('Please fix errors');
            setUserRoleError('Please select which type of user you want to create');
            setIsLoading(false)
            return;
        }
        
        await postAdminUser(data)
        .then(res => {
            if(res.status){
                notifier.success('Create user success!');
                initAdminUser();
                history.push('/admin/users');
            } else {
                notifier.success('Unable to create User, Check logs for error!');
            }
        })
        .catch(err => {
            if(err.response.data.msg){
                notifier.error(err.response.data.msg + " on Jobvite Platform");
            }else{
                notifier.error("Create User fail");
            }
            setErrors(err.errors || {});
        });

        setIsLoading(false)
    };

    const handleChange = (key, val) => {
        if(key == 'user_role' && val == 'account_executive'){

        }

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

            if(data.user_role == "recruiter" || data.user_role == "admin" || data.user_role == "hiring_manager"){
                setErrors({
                    ...errors,
                    [key]: Joi.validateToPlainErrors(val, FORM_MAIN_SCHEMA[key]),
                });    
            }else if(key == "client"){
                setErrors({
                    ...errors,
                    // [key]: Joi.validateToPlainErrors(val, CLIENT_SCHEMA[key]),
                });
            }else if(key == "candidate"){
                setErrors({
                    ...errors,
                    // [key]: Joi.validateToPlainErrors(val, CANDIDATE_SCHEMA[key]),
                });
            }

            
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

    return (
        <div className="health_insurance_main">
            <LoadingIndicator isLoading={isLoading} />
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
                        <input className="custom-control-input" type="checkbox" id="customCheck6"
                            onChange={v => {v.target.checked && handleChange('user_role', 'hiring_manager');}}
                            checked={data.user_role === 'hiring_manager'}
                        />
                        <label className="custom-control-label" for="customCheck6">Hiring Manager</label>
                    </div>

                    <div className="custom-control custom-checkbox">
                        <input className="custom-control-input" type="checkbox" id="customCheck4"
                            onChange={v => {v.target.checked && handleChange('user_role', 'client');}}
                            checked={data.user_role === 'client'}
                        />
                        <label className="custom-control-label" for="customCheck4">Client</label>
                    </div>
                </div>
            </div> 
            
            <div className="add_profile_img col-md-3" onClick={onUploadFile}>
                {data.photo_url ? <img src={data.photo_url} alt="" style={{ maxWidth: 77, maxHeight: 77 }}/>: <img src="/images/no_img.png" alt="" />}
                <h6 className="ml-2">Set Profile Image</h6>
            </div>
            {
                data.user_role == "recruiter" || data.user_role == "hiring_manager" || data.user_role == "account_executive"
                ? <FormMain 
                    data={data} 
                    initAdminUser={initAdminUser} 
                    handleChange={handleChange} 
                    editAdminUser={editAdminUser}
                    _errors={errors}/> 
                : data.user_role == "candidate" 
                ? <CandidateForm 
                    data={data} 
                    initAdminUser={initAdminUser} 
                    handleChange={handleChange} 
                    editAdminUser={editAdminUser}
                    _errors={errors}/> 
                : data.user_role == "client" 
                ? <ClientForm 
                    data={data} 
                    initAdminUser={initAdminUser} 
                    handleChange={handleChange} 
                    editAdminUser={editAdminUser}
                    _errors={errors}/> 
                : <AdminForm 
                    data={data} 
                    initAdminUser={initAdminUser} 
                    handleChange={handleChange} 
                    editAdminUser={editAdminUser}
                    _errors={errors}/>
            }
            <UserPermission permission={data.permission} action={1} editAdminUser={editAdminUser}></UserPermission>
            <div className="account_form_style d-flex align-items-center mt-4">
                <button onClick={handlePost} className="update m-0" type="button">Create</button>
                <button className=" m-0 ml-3" onClick={onCancel} type="button">Cancel</button>
            </div>
        </div>
    )
}

const mapStateToProps = store => ({
    data: store.rootReducer.adminUser.data,
    permission: store.rootReducer.adminUser.permission,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    initAdminUser,
    editAdminUser,
    postAdminUser,
}, dispatch);

   
export default connect(mapStateToProps, mapDispatchToProps)(Create);
import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import LoadingIndicator from 'components/Common/LoadingIndicator';


import {
    putAdminUser,
    initAdminUser,
    editAdminUser,
    getAdminUsers,
    
  } from 'store/actions/adminUser';

import UserPermission from '../UserPermission';

import notifier from 'utils/notifier';
import Joi from 'utils/validator';

import FormMain from './FormMain';
import CandidateForm from './CandidateForm';
import ClientForm from './Clientform';
import AdminForm from './AdminForm';

import {FORM_EDIT_SCHEMA } from './validation';

const Create = ({initAdminUser, isFetching, data,  putAdminUser, isPutting, editAdminUser, getAdminUsers,edited,permission}) => {

    const history = useHistory();
    const { id } = useParams();
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {
        initAdminUser()
        try {
          getAdminUsers(id)
        }
        catch(err) {
          console.log("error::", err.message)
        }
    }, [getAdminUsers, initAdminUser, history, id]);

    const handlePut = async (e) => {
      setIsLoading(true)

      if (e && e.preventDefault) {
        e.preventDefault();
      }

      const errors = Joi.validateToPlainErrors(data, FORM_EDIT_SCHEMA);
      setErrors(errors);
      
      if (Joi.hasPlainError(errors)) {
        notifier.error('Please fix errors');
        setIsLoading(false)
        return;
      }
      
      if(data.user_role == ''){
          notifier.error('Please select which type of user you want to create');
          setIsLoading(false)
          return;
      }

      await putAdminUser(id, data)
      .then(res => {
        if(res.success){
          notifier.success('Update user success!');
          initAdminUser();
          history.push('/admin/users/view/'+id); 
        } else {
          notifier.success('Unable to create User, Check logs for error!');
        }
      })
      .catch(err => {
          notifier.error('Update user failed!');
          setErrors(err.errors || {});
      });
      
      setIsLoading(false)
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
        } else if(data?.role == "Admin" || data?.role == "recruiter" || data?.role == "account_executive" || data?.role == "hiring_manager" ) {
            setErrors({
                ...errors,
                [key]: Joi.validateToPlainErrors(val, FORM_EDIT_SCHEMA[key]),
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

    return (
        <div className="health_insurance_main">
            <LoadingIndicator isLoading={isFetching || isPutting} />
            <div className="d-md-flex justify-content-between align-items-center">
              <h1>Edit User</h1>
              
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
                <h6 className="ml-2">Edit Profile Image</h6>
            </div>
            
            {
                data.user_role == "recruiter" || data.user_role == "hiring_manager" || data.user_role == "account_executive"
                ? <FormMain 
                    data={data} 
                    initAdminUser={initAdminUser} 
                    handleChange={handleChange} 
                    editAdminUser={editAdminUser}
                    _errors={errors}
                    isEdit={true}/> 
                : data.user_role == "candidate" 
                ? <CandidateForm 
                    data={data} 
                    initAdminUser={initAdminUser} 
                    handleChange={handleChange} 
                    editAdminUser={editAdminUser}
                    _errors={errors}
                    isEdit={true}/> 
                : data.user_role == "client" 
                ? <ClientForm 
                    data={data} 
                    initAdminUser={initAdminUser} 
                    handleChange={handleChange} 
                    editAdminUser={editAdminUser}
                    _errors={errors}
                    isEdit={true}/> 
                : <AdminForm 
                    data={data} 
                    initAdminUser={initAdminUser} 
                    handleChange={handleChange} 
                    editAdminUser={editAdminUser}
                    _errors={errors}
                    isEdit={true}/>
            }
            
            <UserPermission permission={data.permission} action={1} editAdminUser={editAdminUser}></UserPermission>
            <div className="account_form_style d-flex align-items-center mt-4">
                <button onClick={handlePut} className="update m-0" type="button">Update</button>
                <button className=" m-0 ml-3" onClick={onCancel} type="button">Cancel</button>
            </div>
        </div>
    )
}

const mapStateToProps = store => ({
    isFetching: store.rootReducer.adminUser.isFetching,
    data: store.rootReducer.adminUser.data,
    isPutting: store.rootReducer.adminUser.isPutting,
    edited: store.rootReducer.adminUser.edited,
    permission: store.rootReducer.adminUser.permission,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    initAdminUser,
    editAdminUser,
    putAdminUser,
    getAdminUsers,
}, dispatch);

   
export default connect(mapStateToProps, mapDispatchToProps)(Create);
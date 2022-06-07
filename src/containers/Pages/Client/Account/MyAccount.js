import React, { useState , useEffect } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Select,Form, Input} from 'antd';

import {
    initMe,
    putClientData,
    editClientData,
    getClientData
} from 'store/actions/clientMyAccount';

import notifier from 'utils/notifier';
import Joi from 'utils/validator';
import { useParams } from 'react-router-dom';

const UPDATE_CLIENT_DATA_SCHEMA = {
    company_name: Joi.string().label('Name').required(),
    // company_type: Joi.string().label('Name').required(),
    // name: Joi.string().label('Name').required(),
    username: Joi.string().label('Username').required(),
    
    phone: Joi.string().regex(/^\d{10}$/).error(() => ({
        message: 'Please enter digits only and length should be 10',
    })),
    email: Joi.string().email().label('Email').required(),
    address: Joi.string().label('Address').required(),
    city: Joi.string().label('City').required() ,
     
};


const MyAccount = ({ user , data, getClientData, putClientData , editClientData}) => {

    const [errors, setErrors] = useState({});
    const history = useHistory();
    const { id } = useParams();


    //Image state variable    
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [previewFile, setPreviewFile] = useState(null);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files);
        setIsFilePicked(true);
    };
    //End Image state variable

    useEffect(() => {
        getClientData(id);
    }, [getClientData, id]);

    const handleChange = (key, val) => {
        // Validate individual
        setErrors({
            ...errors,
            [key]: Joi.validateToPlainErrors(val, UPDATE_CLIENT_DATA_SCHEMA[key]),
        });     
        editClientData({ [key]: val });
    };


    
    const handlePut = (e) => {

        if (e && e.preventDefault) {
          e.preventDefault();
        }
    
        // Validate all fields
        const errors = Joi.validateToPlainErrors(data, (['client'].indexOf(data.user_role) === -1) ? UPDATE_CLIENT_DATA_SCHEMA : UPDATE_CLIENT_DATA_SCHEMA);
        // const errors = Joi.validateToPlainErrors(data, (['client', 'admin'].indexOf(data.user_role) === -1) ? UPDATE_CANDIDATE_SCHEMA : UPDATE_CANDIDATE_SCHEMA);
        setErrors(errors);
        console.log("errors::",errors )
        if (Joi.hasPlainError(errors)) {
          notifier.error('Please fix errors');
          return;
        }

        //Form Data code Start
        const formData = new FormData();
           
        // console.log('selectedFile',event.target.files)
        formData.append('File', selectedFile);
           

        if(selectedFile){
            const [pluginName, fileExtension] = selectedFile[0].name.split(/\.(?=[^\.]+$)/);  

            const extensionArr = new Array('jpg','png','jpeg');
            const fileSize = selectedFile[0].size / 1024 / 1024;
            
            if(!extensionArr.includes(fileExtension)){
                notifier.error(`Please select jpg, png, jpeg file format`);
                return; 
            }

        
            if(fileSize > 2){
                notifier.error('File size should not greater than 2 MB');
                return;
            }
            
            setPreviewFile(URL.createObjectURL(selectedFile[0]));
            
            formData.append(`File`, selectedFile[0]);        
                
        }else{
            notifier.error('please Upload your image');
        }
        
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }


        putClientData(data.id, formData)
            .then(res => {
                notifier.success('Update client success!');
                history.push('/client/account/view'); 
            })
            .catch(err => {
                notifier.error('Update client failed!');
                setErrors(err.errors || {});
        });
        
    };

    return (
        <>
            <h4 className="style_h4 mt-4">Edit My Account</h4>
            <div className="row">
                <div className="out_border_wrapper">
                    <div className="col-md-12">
                        <div className="account_form_section">
                        <h2>Company Profile</h2>
                        <div className="account_form_bg">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="account_form_style">
                                        <label>Company Name</label>
                                        <Form.Item
                                            validateStatus={Joi.getFirstPlainError(errors, 'Company Name') ? 'error' : ''}
                                            help={Joi.getFirstPlainError(errors, 'company_name')}
                                            
                                            className="w-100"
                                            >
                                            <Input
                                                type="text"
                                                placeholder="John Smith"
                                                value={data.company_name}
                                                //defaultValue="Hello!"
                                                className="client_input"
                                                onChange={e => handleChange('company_name', e.target.value)}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="account_form_style">
                                        <label>Username</label>
                                        <Form.Item
                                            validateStatus={Joi.getFirstPlainError(errors, 'Username') ? 'error' : ''}
                                            help={Joi.getFirstPlainError(errors, 'username')}
                                            
                                            className="w-100"
                                            >
                                            <Input
                                                type="text"
                                                placeholder="John Smith"
                                                value={data.username}
                                                //defaultValue="Hello!"
                                                className="client_input"
                                                onChange={e => handleChange('username', e.target.value)}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="account_form_style">
                                        <label>Employees</label>
                                        <input type='text' />
                                        {/* <Form.Item
                                            validateStatus={Joi.getFirstPlainError(errors, 'Name') ? 'error' : ''}
                                            help={Joi.getFirstPlainError(errors, 'name')}
                                            className="w-100"
                                            >
                                            <Input
                                                type="text"
                                                placeholder="John Smith"
                                                value={data.name}
                                                className="client_input"
                                                onChange={e => handleChange('name', e.target.value)}
                                            />
                                        </Form.Item> */}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="account_form_style">
                                        <label>Category</label>
                                        <div class="tags_pill">
                                            <span>Accounting</span>
                                            <span>Tally</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="account_form_style">
                                        <label>About Company</label>
                                        <textarea placeholder="ABCD Company"></textarea>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="account_form_section">
                        <h2>Contact Information</h2>
                        <div className="account_form_bg">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="d-flex align-items-center profile_photo">
                                    <img src={'/storage/images/'+data.photo_url} alt=""/>
                                    <h4>Add profile photo</h4>
                                    <input type='file' name='image' onChange={changeHandler}/>
                                    <img src={previewFile}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="account_form_style">
                                        <label>Full Name</label>
                                        <Form.Item
                                            validateStatus={Joi.getFirstPlainError(errors, 'Username') ? 'error' : ''}
                                            help={Joi.getFirstPlainError(errors, 'username')}
                                            
                                            className="w-100"
                                            >
                                            <Input
                                                type="text"
                                                placeholder="John Smith"
                                                value={data.username}
                                                value={data.username}
                                                //defaultValue="Hello!"
                                                className="client_input"
                                                onChange={e => handleChange('username', e.target.value)}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="account_form_style">
                                        <label>Email</label>
                                        <Form.Item
                                            validateStatus={Joi.getFirstPlainError(errors, 'Email') ? 'error' : ''}
                                            help={Joi.getFirstPlainError(errors, 'email')}
                                            
                                            className="w-100"
                                            >
                                            <Input
                                                type="text"
                                                value={data.email}
                                                //defaultValue="Hello!"
                                                className="client_input"
                                                onChange={e => handleChange('email', e.target.value)}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="account_form_style">
                                        <label>Phone</label>
                                        <Form.Item
                                            validateStatus={Joi.getFirstPlainError(errors, 'Phone') ? 'error' : ''}
                                            help={Joi.getFirstPlainError(errors, 'phone')}
                                            
                                            className="w-100"
                                            >
                                            <Input
                                                type="text"
                                                value={data.phone}
                                                //defaultValue="Hello!"
                                                className="client_input"
                                                onChange={e => handleChange('phone', e.target.value)}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="account_form_style">
                                        <label>Complete Address</label>
                                        <Form.Item
                                            validateStatus={Joi.getFirstPlainError(errors, 'Address') ? 'error' : ''}
                                            help={Joi.getFirstPlainError(errors, 'address')}
                                            
                                            className="w-100"
                                            >
                                            <Input
                                                type="text"
                                                value={data.address}
                                                //defaultValue="Hello!"
                                                className="client_input"
                                                onChange={e => handleChange('address', e.target.value)}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="account_form_section">
                        <h2>Social Accounts</h2>
                        <div className="account_form_bg">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="account_form_style">
                                        <label>Facebook</label>
                                        <input type='text'  />
                                        {/* <Form.Item
                                            validateStatus={Joi.getFirstPlainError(errors, 'Name') ? 'error' : ''}
                                            help={Joi.getFirstPlainError(errors, 'name')}
                                            label="Name"
                                            className="w-100"
                                            >
                                            <Input
                                                type="text"
                                                placeholder="John Smith"
                                                value={data.name}
                                                //defaultValue="Hello!"
                                                className="client_input"
                                                onChange={e => handleChange('name', e.target.value)}
                                            />
                                        </Form.Item> */}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="account_form_style">
                                        <label>Instagram</label>
                                        <input type='text'  />
                                        {/* <Form.Item
                                            validateStatus={Joi.getFirstPlainError(errors, 'Name') ? 'error' : ''}
                                            help={Joi.getFirstPlainError(errors, 'name')}
                                            label="Name"
                                            className="w-100"
                                            >
                                            <Input
                                                type="text"
                                                placeholder="John Smith"
                                                value={data.name}
                                                //defaultValue="Hello!"
                                                className="client_input"
                                                onChange={e => handleChange('name', e.target.value)}
                                            />
                                        </Form.Item> */}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="account_form_style">
                                        <label>Twitter</label>
                                        <input type='text'  />
                                        {/* <Form.Item
                                            validateStatus={Joi.getFirstPlainError(errors, 'Name') ? 'error' : ''}
                                            help={Joi.getFirstPlainError(errors, 'name')}
                                            label="Name"
                                            className="w-100"
                                            >
                                            <Input
                                                type="text"
                                                placeholder="John Smith"
                                                value={data.name}
                                                //defaultValue="Hello!"
                                                className="client_input"
                                                onChange={e => handleChange('name', e.target.value)}
                                            />
                                        </Form.Item> */}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="account_form_style">
                                        <label>LinkedIn</label>
                                        <input type='text'  />
                                        {/* <Form.Item
                                            validateStatus={Joi.getFirstPlainError(errors, 'Name') ? 'error' : ''}
                                            help={Joi.getFirstPlainError(errors, 'name')}
                                            label="Name"
                                            className="w-100"
                                            >
                                            <Input
                                                type="text"
                                                placeholder="John Smith"
                                                value={data.name}
                                                //defaultValue="Hello!"
                                                className="client_input"
                                                onChange={e => handleChange('name', e.target.value)}
                                            />
                                        </Form.Item> */}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="account_form_style">
                                        <label>Google Plus</label>
                                        <input type='text'  />
                                        {/* <Form.Item
                                            validateStatus={Joi.getFirstPlainError(errors, 'Name') ? 'error' : ''}
                                            help={Joi.getFirstPlainError(errors, 'name')}
                                            label="Name"
                                            className="w-100"
                                            >
                                            <Input
                                                type="text"
                                                placeholder="John Smith"
                                                value={data.name}
                                                //defaultValue="Hello!"
                                                className="client_input"
                                                onChange={e => handleChange('name', e.target.value)}
                                            />
                                        </Form.Item> */}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="account_form_style">
                                        <label>YouTube</label>
                                        <input type='text'/>
                                        {/* <Form.Item
                                            validateStatus={Joi.getFirstPlainError(errors, 'Name') ? 'error' : ''}
                                            help={Joi.getFirstPlainError(errors, 'name')}
                                            label="Name"
                                            className="w-100"
                                            >
                                            <Input
                                                type="text"
                                                placeholder="John Smith"
                                                value={data.name}
                                                //defaultValue="Hello!"
                                                className="client_input"
                                                onChange={e => handleChange('name', e.target.value)}
                                            />
                                        </Form.Item> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="d-flex justify-content-center">
                        <div className="account_form_style">
                            <button type="button" data-toggle="modal" onClick={handlePut} data-target="#update_job">Update account</button>
                            <button className="cancel" type="button">Cancel</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
       
        </>
    )
}

const mapStateToProps = store => ({
    isFetching: store.rootReducer.clientMyAccount.isFetching,
    isPutting: store.rootReducer.clientMyAccount.isPutting,
    // edited: store.rootReducer.clientMyAccount.edited, 
    edited: store.rootReducer.auth.edited,
    data: store.rootReducer.clientMyAccount.data,
});
  
const mapDispatchToProps = dispatch => bindActionCreators({
    initMe,
    putClientData,
    editClientData,
    getClientData
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
  

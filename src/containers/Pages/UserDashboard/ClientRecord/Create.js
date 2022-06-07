import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Select,Form, Input} from 'antd';
import {
    initClientRecord,
    editClientRecord,
    postClientRecord,
  } from 'store/actions/clientRecord';

import notifier from 'utils/notifier';
import Joi from 'utils/validator';
const { Option } = Select;

const CREATE_CLIENT_RECORD_SCHEMA = {
    current_status: Joi.string().label('Current Status').required().error(() => ({
        message: 'Please select status',
    })),  

    location: Joi.string().label('Locations').required() ,

    posting_type: Joi.string().label('Posting Type').required().error(() => ({
        message: 'Please select Posting type',
    })),  

    
    role_title: Joi.string().label('Role Title').required().error(() => ({
        message: 'Please select Role Title',
    })),  

    salary: Joi.string().label('Salary').required().error(() => ({
        message: 'Please select Role Title',
    })),  

    base_pay: Joi.string().label('Base Pay').required(),

    hour: Joi.string().regex(/^[0-9]*$/).error(() => ({
        message: 'Please enter digits only and should not be empty',
    })),

    bonus_plan: Joi.string().label('Bonus Plan').required()

};



const Create = ({initClientRecord, data,  postClientRecord,  editClientRecord}) => {

    const history = useHistory();
    const [errors, setErrors] = useState({});


    
    
    useEffect(() => {
        initClientRecord()
    }, [initClientRecord]);

    const handlePost = (e) => {
        if (e && e.preventDefault) {
          e.preventDefault();
        }
    
        // Validate all fields
        const errors = Joi.validateToPlainErrors(data, (['client', 'admin'].indexOf(data.user_role) === -1) ? CREATE_CLIENT_RECORD_SCHEMA : CREATE_CLIENT_RECORD_SCHEMA);
        setErrors(errors);
        
        
        if (Joi.hasPlainError(errors)) {
          notifier.error('Please fix errors');
          return;
        }

        const formData = new FormData();

		formData.append('File', selectedFile);
        
        if(selectedFile){
            for (let i = 0 ; i < selectedFile.length ; i++) {
   
            const [pluginName, fileExtension] = selectedFile[i].name.split(/\.(?=[^\.]+$)/);
            
            const extensionArr = new Array('pdf','doc','docx','odt','txt','ods');
            const fileSize = selectedFile[i].size / 1024 / 1024;
            
            if(!extensionArr.includes(fileExtension)){
                notifier.error(`Please select pdf, doc, docx, odt, txt, ods file format`);
                return; 
            }
            if(fileSize > 2){
                notifier.error('File size should not greater than 2 MB');
                return;
            }
            
            formData.append(`File[${i}]`, selectedFile[i]);
            
            }
        }
        for (const [key, value] of Object.entries(data)) {
		    formData.append(key, value);
        }
            
        postClientRecord(formData)
            .then(res => {
                notifier.success('Create client success!');
                initClientRecord();
                history.push('/admin/client_records/list');
            })
            .catch(err => {
                notifier.error('Create user failed!');
                setErrors(err.errors || {});
        });
    };

    const handleChange = (key, val) => {
        // Validate individual
        setErrors({
            ...errors,
            [key]: Joi.validateToPlainErrors(val, CREATE_CLIENT_RECORD_SCHEMA[key]),
        });
       
        editClientRecord({ [key]: val });
    };

    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files);
		setIsFilePicked(true);
	};

    return (
        <>
        <div className="health_insurance_main">
            <h1>Create Client Record</h1>
            <div className="d-md-flex justify-content-between">
                <div className="health_card elite_health">
                    <label>Current Status</label>
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'current_status') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'current_status')}>
                        <Select value={data.current_status} 
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            className="w-100 custom-select client_input"
                            // onChange={v => handleChangeSearch(v)}
                            onChange={e => handleChange('current_status', e)}

                        >
                            <Option value="">Choose Type</Option>
                            <Option value="Open">Open</Option>
                            <Option value="Close">Close</Option>
                            
                        </Select>
                    </Form.Item>

                </div>
                <div className="health_card elite_health c_type_card">
                    
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Location (s)') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'location')}
                        label="Locations (s)"
                        >
                        <Input
                            placeholder="Locations (s)"
                            value={data.location}
                            className="client_input"
                            onChange={e => handleChange('location', e.target.value)}
                        />
                    </Form.Item>
                </div>
                
                <div className="health_card elite_health">
                    
                    <label>Posting Type</label>
                    
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'posting_type') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'posting_type')}>
                        <Select value={data.posting_type} 
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            className="w-100 custom-select client_input"
                            // onChange={v => handleChangeSearch(v)}
                            onChange={e => handleChange('posting_type', e)}

                        >
                            <Option value="">Choose Type</Option>
                            <Option value="Open">Open</Option>
                            <Option value="Close">Close</Option>
                            
                        </Select>
                    </Form.Item>
                </div>
            </div>
            <div className="d-md-flex justify-content-between">
                <div className="health_card elite_health">
                    
                <label>Role Title</label>
                    
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'role_title') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'role_title')}>
                        <Select value={data.role_title} 
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            className="w-100 custom-select client_input"
                            // onChange={v => handleChangeSearch(v)}
                            onChange={e => handleChange('role_title', e)}

                        >
                            <Option value="">Choose Type</Option>
                            <Option value="Admin">Admin</Option>
                            <Option value="Client">Client</Option>
                            <Option value="Recruiter">Recruiter</Option>
                            <Option value="Candidate">Candidate</Option>
                        </Select>
                    </Form.Item>

                </div>
                <div className="health_card elite_health">
                   
                <label>Salary Range</label>
                    
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'salary') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'salary')}>
                        <Select value={data.salary} 
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            className="w-100 custom-select client_input"
                            // onChange={v => handleChangeSearch(v)}
                            onChange={e => handleChange('salary', e)}

                        >
                            <Option value="">Choose Type</Option>
                            <Option value="$40K-$50K<">$40K-$50K</Option>
                            <Option value="$60K-$70K">$60K-$70K</Option>
                            <Option value="$80K-$90K">$80K-$90K</Option>
                            <Option value="$100K-$110K">$100K-$110K</Option>
                        </Select>
                    </Form.Item>
                </div>
                <div className="health_card elite_health">
                    
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Base Pay') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'base_pay')}
                        label="Base Pay"
                        >
                        <Input
                            
                            value={data.base_pay}
                            className="client_input"
                            onChange={e => handleChange('base_pay', e.target.value)}
                        />
                    </Form.Item>

                </div>
            </div>
            <div className="d-md-flex justify-content-between">
                <div className="health_card elite_health">
                    
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Hour / Schedule') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'hour')}
                        label="Hour / Schedule"
                        >
                        <Input
                            className="client_input"
                            placeholder="12"
                            value={data.hour}
                            onChange={e => handleChange('hour', e.target.value)}
                        />
                    </Form.Item>
                </div>
                

                <div className="health_card elite_health">

                    <label className="d-flex justify-content-between">Bonus Plan 
                        {/* <a className="text-decoration-none" href="#" onClick={onUploadFile}>
                            <i className="fa fa-upload" aria-hidden="true"></i> Upload Docs
                        </a> */}
                        

                    </label>
                    
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Bonus Plan') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'bonus_plan')}
                        
                        >
                        <Input
                            className="client_input"
                            placeholder="$50 per policy sold"
                            value={data.bonus_plan}
                            onChange={e => handleChange('bonus_plan', e.target.value)}
                        />
                    </Form.Item>

                    <p></p><div className="d-flex align-items-center justify-content-around mt-3">
                        
                    <input type="file" name="files" multiple onChange={changeHandler} /><br/>

                        {/* <div className="text-center">
                            <img src="/images/report-img.png" alt=""/><br/>
                            
                        </div> */}
                    </div>
                </div>
                <div className="health_card elite_health">
                    <label></label>
                    <p></p>
                </div>
            </div>
            <div className="d-md-flex justify-content-between">
                
                <div className="health_card elite_health">
                    
                <Form.Item
                    label="Role Summary for Ideal Candidate"
                    validateStatus={Joi.getFirstPlainError(errors, 'role_summary_of_candidate') ? 'error' : ''}
                    help={Joi.getFirstPlainError(errors, 'role_summary_of_candidate')}
                >
                <textarea
                    placeholder="" value={data.role_summary_of_candidate || ''}
                    onChange={v => handleChange('role_summary_of_candidate', v.target.value)}
                />
                </Form.Item>
                </div>
                <div className="health_card elite_health">
                    <label></label>
                    <p></p>
                </div>
            </div>

            
            <div className="account_form_style d-flex align-items-center mt-4">
                <button className="update m-0" type="button" onClick={handlePost}>Create</button>
            </div>
            
            
        </div>
        </>
    )

}


const mapStateToProps = store => ({
    data: store.rootReducer.clientRecord.data,
  });
  
  const mapDispatchToProps = dispatch => bindActionCreators({
    initClientRecord,
    editClientRecord,
    postClientRecord,
  }, dispatch);
  
  
   
 export default connect(mapStateToProps, mapDispatchToProps)(Create);
  
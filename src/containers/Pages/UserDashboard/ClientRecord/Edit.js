import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Select,Form, Input} from 'antd';

import {
    initClientRecord,
    editClientRecord,
    getClientRecord,
    putClientRecord
  } from 'store/actions/clientRecord';
import { useParams } from 'react-router-dom';
import notifier from 'utils/notifier';
import Joi from 'utils/validator';
const { Option } = Select;


const UPDATE_CLIENT_RECORD_SCHEMA = {

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


const EditView = ({initClientRecord, data, getClientRecord, putClientRecord,  editClientRecord}) => {

    const history = useHistory();
    const { id } = useParams();
    const [errors, setErrors] = useState({});
    
    useEffect(() => {
        initClientRecord();
        getClientRecord(id);
    }, [getClientRecord, initClientRecord, id]);
    
   

    const handlePut = (e) => {
        if (e && e.preventDefault) {
          e.preventDefault();
        }
        
        // Validate all fields
        const errors = Joi.validateToPlainErrors(data, (['client', 'admin'].indexOf(data.user_role) === -1) ? UPDATE_CLIENT_RECORD_SCHEMA : UPDATE_CLIENT_RECORD_SCHEMA);
        setErrors(errors);

        if (Joi.hasPlainError(errors)) {
          notifier.error('Please fix errors');
          return;
        }

        //Form Data code Start
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
        //Form Data code End


        putClientRecord(id, formData)
            .then(res => {
                notifier.success('Update candidate success!');
                initClientRecord();
                history.push('/admin/client_records/view/'+id); 
            })
            .catch(err => {
                notifier.error('Update candidate failed!');
                setErrors(err.errors || {});
        });
    };

    const handleChange = (key, val) => {
        // Validate individual
         
        setErrors({
            ...errors,
            [key]: Joi.validateToPlainErrors(val, UPDATE_CLIENT_RECORD_SCHEMA[key]),
        });     
        editClientRecord({ [key]: val });
    };

    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files);
		setIsFilePicked(true);
	};


    return (<>
                <div className="health_insurance_main">
                    <h1>Edit Client Record</h1>
                    <div className="d-md-flex justify-content-between">
                        <div className="health_card elite_health">
                            <label>Current Status</label>
                            <Form.Item
                                validateStatus={Joi.getFirstPlainError(errors, 'current_status') ? 'error' : ''}
                                help={Joi.getFirstPlainError(errors, 'current_status')}>
                                <Select value={data.current_status } 
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
                                validateStatus={Joi.getFirstPlainError(errors, 'Locations (s)') ? 'error' : ''}
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
                                    <Option value="Admin">$40K-$50K</Option>
                                    <Option value="Client">$60K-$70K</Option>
                                    <Option value="Recruiter">$80K-$90K</Option>
                                    <Option value="Candidate">$100K-$110K</Option>
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
                                    placeholder="Admin"
                                    value={data.hour}
                                    onChange={e => handleChange('hour', e.target.value)}
                                />
                            </Form.Item>
                        </div>
                        

                        <div className="health_card elite_health">

                            <label className="d-flex justify-content-between">Bonus Plan </label>
                            
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

                            <div className="d-flex mt-3 flex-column">
                            
                                <input type="file" name="files" multiple onChange={changeHandler} />
                                    <div className="doc_files">
                                    {
                                        data.files.map((file, key) => {
                                            return (
                                                
                                                <div key={key}>
                                                    {file.filename}
                                                </div>
                                            );                          
                                        })
                                    }
                                    </div>
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
                        <button className="update m-0" type="button" onClick={handlePut}>Update</button>
                    </div>
                </div>
        </>
    )
}

const mapStateToProps = store => ({
  isFetching: store.rootReducer.clientRecord.isFetching,
  data: store.rootReducer.clientRecord.data,
  isPutting: store.rootReducer.clientRecord.isPutting,
  edited: store.rootReducer.clientRecord.edited,
});

const mapDispatchToProps = dispatch => bindActionCreators({

  initClientRecord,
  editClientRecord,
  getClientRecord,
  putClientRecord
}, dispatch);
 
export default connect(mapStateToProps, mapDispatchToProps)(EditView);


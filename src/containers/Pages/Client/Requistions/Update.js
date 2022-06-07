import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Select,Form, Input} from 'antd';
import api from 'constants/api';
import {initClientRequisition, editClientRequisition, getRequisition, putClientRequisition } from 'store/actions/clientRequisition';

import Joi from 'utils/validator';

import notifier from 'utils/notifier';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const { Option } = Select;


const UPDATE_REQUISITION_SCHEMA = {
    
    title: Joi.string().label('Title').required(),
    job_type: Joi.string().min(5).label('Job Type').required().error(() => ({
        message: 'Please select Job type',
    })),  

    compensation: Joi.string().label('Compensation').required(),
    category: Joi.string().label('Category').required(),
    
    department:Joi.string().label('Department').required().error(() => ({
        message: 'Please select department',
    })),
 
    
    location: Joi.string().label('Location').required().error(() => ({
        message: 'Please select location',
    })),

    evaluation_form: Joi.string().label('Evaluation Form').required().error(() => ({
        message: 'Please select Evaluation Form',
    })),
    pre_interview_form: Joi.string().label('Pre Interview Form').required().error(() => ({
        message: 'Please select Pre Interview Form',
    })),
    recruiter_id: Joi.string().label('Recruiter Name').required(),

    hiring_manager: Joi.string().min(5).label('Hiring Manager').required().error(() => ({
        message: 'Please select address type',
    })),

    description: Joi.string().label('Description').required(),
    
};

const Update = ({
    initClientRequisition,
    data,  
    editClientRequisition, 
    getRequisition , 
    putClientRequisition, 
    isPutting, 
    isFetching,
    edited,
    user
                 
}) => {
    const history = useHistory();
    const { id } = useParams();
    const [errors, setErrors] = useState({});

    const [editNote, setEditNote] = useState(false);
    const [idNote, setIdNote] = useState(null);
    const [noteTitle, setNoteTitle] = useState(null);
    const [noteDescription, setNoteDescription] = useState(null);
    const [Active,setActive] = useState([]);
    const [recruitersList, setRecruitersList] = useState([]);

    const [clientRecruiters, setClientRecruiters] = useState([]);
    const [companyHiringManager, setCompanyHiringManager] = useState([]);
   
    const onCancel=()=>{
        history.push("/admin/requisitions")
    }

    const addSections =(sectionID)=>{
        let sections =[...Active];

        if(sections.includes(sectionID)){
            sections.splice(sections.indexOf(sectionID),1)
        }
        else{
            sections.push(sectionID);
        }
        setActive(sections);
    }

    
    const openEditNote = (id, title, description) => {    
        // alert(id +" "+ title +" "+ description)
        setEditNote(true);
        setIdNote(id);
        setNoteTitle(title);
        setNoteDescription(description);
    }

    useEffect(() => {
        initClientRequisition();
        getRequisition(id);
        
        data.company_id = user?.get_client_company.id;
        // Get Recruiter list

        const companyRecruiters = async (company_id) => {
            
            const res = await api.client.clientRecruiters.get(company_id)
            
                .catch(err => {
                    
                    if(err.response.data.msg){
                        notifier.error(err.response.data.msg);
                    }else{
                        notifier.error("Get Recruiter details fail");
                    }           
                    
                    setErrors(err.errors || {});
                });

            setClientRecruiters(res);
        }

        companyRecruiters(data.company_id);

        const companyHiringManagerFunction = async (company_id) => {

            const hiringManagers = await api.client.getHiringManagers.getList(company_id)
            
                .catch(err => {
                    notifier.error('get company Manager failed!');
                    setErrors(err.errors || {});
                });

            setCompanyHiringManager(hiringManagers);
        }

        companyHiringManagerFunction(data.company_id)


    }, [getRequisition,initClientRequisition,id]);

    const handlePut = (e) => {
        if (e && e.preventDefault) {
          e.preventDefault();
        }
    
        // Validate all fields
        const errors = Joi.validateToPlainErrors(data, (['client', 'admin'].indexOf(data.user_role) === -1) ? UPDATE_REQUISITION_SCHEMA : UPDATE_REQUISITION_SCHEMA);
        setErrors(errors);
        
        
        if (Joi.hasPlainError(errors)) {
            console.log('data',errors)
          notifier.error('Please fix errors');
          return;
        }
        if(idNote != null){
            data.note_id = idNote;
        }

        

        //Form Data code Start
        const formData = new FormData();

        if(isFilePicked){
            
            formData.append(`File`, isFilePicked);
        }   

        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }

        putClientRequisition(id, formData)
            .then(res => {
                notifier.success('Update requisition success!');
                initClientRequisition();
                history.push('/client/requisition/view/'+id); 
            })
            .catch(err => {
                console.log('err',err)                
                notifier.error('Update requisition failed!', err.msg);
                setErrors(err.errors || {});
        });

    };


    //Image state variable    
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState('');
    const [previewFile, setPreviewFile] = useState(null);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files);
        
        // formData.append('File', event.target.files);
           
        if(event.target.files){
            // const [pluginName, fileExtension] = selectedFile.name.split(/\.(?=[^\.]+$)/);  

            // const extensionArr = new Array('pdf', 'doc', 'docx', 'odt', 'ods');
            const fileSize = event.target.files[0].size / 1024 / 1024;
            
            if(fileSize > 2){
                notifier.error('File size should not greater than 2 MB');
                return;
            }
            
            setPreviewFile(URL.createObjectURL(event.target.files[0]));
            setIsFilePicked(event.target.files[0]);
                            
        }

    };

    const handleChange = (key, val) => {

        if(key == 'hiring_manager_id'){

            companyHiringManager.managers.map((item, index) => (
                 val == item.id ? data.hiring_manager = item.hiring_manager_name : ''
            ))
        }

        // Validate individual
        setErrors({
            ...errors,
            [key]: Joi.validateToPlainErrors(val, UPDATE_REQUISITION_SCHEMA[key]),
        });
       
        editClientRequisition({ [key]: val });
    };
    
    return (
        <div className="health_insurance_main">
            <div className="">
                <h1>Update Requisition: Life Insurance Agent </h1>
                <div className="requ_list">
                    <ul>
                        <li><span>Quantity Needed:</span> 40</li>
                        <li><span>Client:</span> Insurance, Inc.</li>
                        <li><span>Posted:</span> 10/28/2021</li>
                    </ul>
                </div>
                
            </div>                   
            <div id="accordion" className="record_accordion">
                <div className="card">
                    <div className="card-header" id="headingOne">
                        <h2 className="mb-0">
                        <button className="d-flex align-items-center justify-content-between btn btn-link" onClick={()=>{addSections(1)}}>
                            <span>Details</span> 
                            <span className="fa-stack fa-sm">
                                <i className={Active.includes(1)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                            </span>
                        </button>
                        </h2>
                    </div>
                    <div id="collapseOne" className={Active.includes(1)?"collapse show":"collapse"} aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="card-body px-0">
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card elite_health">
                                   
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'Title') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'title')}
                                        label="Title"
                                        >
                                        <Input
                                            placeholder="Enter Here..."
                                            value={data.title}
                                            onChange={e => handleChange('title', e.target.value)}
                                        />
                                    </Form.Item>
                                    
                                </div>
                                <div className="health_card elite_health">
                                    <label>Job Type</label>
                                    <div className="">
                                        
                                        <Form.Item
                                            validateStatus={Joi.getFirstPlainError(errors, 'job_type') ? 'error' : ''}
                                            help={Joi.getFirstPlainError(errors, 'job_type')}>
                                            <Select value={data.job_type} 
                                                style={{ width: '100%' }}
                                                placeholder="Please select"
                                                className="w-100 new_select"
                                                // onChange={v => handleChangeSearch(v)}
                                                onChange={e => handleChange('job_type', e)}

                                            >
                                                <Option value="">Choose Type</Option>
                                                <Option value="Finance">Finance</Option>
                                                <Option value="Banking">Banking</Option>
                                                <Option value="Information Technology">Information Technology</Option>
                                            </Select>
                                        </Form.Item>
                                            
                                        </div>
                                    </div>
                                    <div className="health_card elite_health">
                                        
                                        <Form.Item
                                            validateStatus={Joi.getFirstPlainError(errors, 'Compensation') ? 'error' : ''}
                                            help={Joi.getFirstPlainError(errors, 'compensation')}
                                            label="Compensation"
                                            >
                                            <Input
                                                placeholder="Enter Here..."
                                                value={data.compensation}
                                                
                                                onChange={e => handleChange('compensation', e.target.value)}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="d-md-flex justify-content-between">
                                    <div className="health_card elite_health">
                                        <label>Category</label>
                                        <div className="">
                                            <Form.Item
                                                validateStatus={Joi.getFirstPlainError(errors, 'category') ? 'error' : ''}
                                                help={Joi.getFirstPlainError(errors, 'category')}>
                                                <Select value={data.category} 
                                                    style={{ width: '100%' }}
                                                    placeholder="Please select"
                                                    className="w-100 new_select"
                                                    // onChange={v => handleChangeSearch(v)}
                                                    onChange={e => handleChange('category', e)}

                                                >
                                                    <Option value="">Choose Type</Option>
                                                    <Option value="Finance">Finance</Option>
                                                    <Option value="Banking">Banking</Option>
                                                    <Option value="Information Technology">Information Technology</Option>
                                                </Select>
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className="health_card elite_health">
                                        <label>Deparment</label>
                                        <div className="">
                                            <Form.Item
                                                validateStatus={Joi.getFirstPlainError(errors, 'department') ? 'error' : ''}
                                                help={Joi.getFirstPlainError(errors, 'department')}>
                                                <Select value={data.department} 
                                                    style={{ width: '100%' }}
                                                    placeholder="Please select"
                                                    className="w-100 new_select"
                                                    // onChange={v => handleChangeSearch(v)}
                                                    onChange={e => handleChange('department', e)}

                                                >
                                                    <Option value="">Choose Type</Option>
                                                    <Option value="Finance">Finance</Option>
                                                    <Option value="Banking">Banking</Option>
                                                    <Option value="Information Technology">Information Technology</Option>
                                                </Select>
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className="health_card elite_health">
                                        <label>Location</label>
                                        <div className="">
                                            <Form.Item
                                                validateStatus={Joi.getFirstPlainError(errors, 'location') ? 'error' : ''}
                                                help={Joi.getFirstPlainError(errors, 'location')}>
                                                <Select value={data.location} 
                                                    style={{ width: '100%' }}
                                                    placeholder="Please select"
                                                    className="w-100 new_select"
                                                    // onChange={v => handleChangeSearch(v)}
                                                    onChange={e => handleChange('location', e)}

                                                >
                                                    <Option value="">Choose Type</Option>
                                                    <Option value="Finance">Finance</Option>
                                                    <Option value="Banking">Banking</Option>
                                                    <Option value="Information Technology">Information Technology</Option>
                                                </Select>
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-md-flex justify-content-between">
                                    <div className="health_card elite_health">
                                        <label>Evaluation Form</label>
                                        <div className="    ">
                                            <Form.Item
                                                validateStatus={Joi.getFirstPlainError(errors, 'evaluation_form') ? 'error' : ''}
                                                help={Joi.getFirstPlainError(errors, 'evaluation_form')}>
                                                <Select value={data.evaluation_form} 
                                                    style={{ width: '100%' }}
                                                    placeholder="Please select"
                                                    className="w-100 new_select"
                                                    onChange={e => handleChange('evaluation_form', e)}

                                                >
                                                    <Option value="">Choose Type</Option>
                                                    <Option value="Finance">Finance</Option>
                                                    <Option value="Banking">Banking</Option>
                                                    <Option value="Information Technology">Information Technology</Option>
                                                </Select>
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className="health_card elite_health">
                                        <label>Pre-Interview Form</label>
                                        <div className="">
                                            <Form.Item
                                                validateStatus={Joi.getFirstPlainError(errors, 'pre_interview_form') ? 'error' : ''}
                                                help={Joi.getFirstPlainError(errors, 'pre_interview_form')}>
                                                <Select value={data.pre_interview_form} 
                                                    style={{ width: '100%' }}
                                                    placeholder="Please select"
                                                    className="w-100 new_select"
                                                    // onChange={v => handleChangeSearch(v)}
                                                    onChange={e => handleChange('pre_interview_form', e)}

                                                >
                                                    <Option value="">Choose Type</Option>
                                                    <Option value="Finance">Finance</Option>
                                                    <Option value="Banking">Banking</Option>
                                                    <Option value="Information Technology">Information Technology</Option>
                                                </Select>
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className="health_card elite_health">
                                        <label>Recruiter Name</label>
                                        <div className="">
                                            <Form.Item
                                            validateStatus={Joi.getFirstPlainError(errors, 'Recruiter name') ? 'error' : ''}
                                            help={Joi.getFirstPlainError(errors, 'recruiter_id')}
                                            
                                            >
                        
                                                <Select 
                                                    style={{ width: '100%' }}
                                                    placeholder="Please select"
                                                    className="w-100 new_select"
                                                    value={`${data.recruiter_id}`} 
                                                    onChange={e => handleChange('recruiter_id', e)}

                                                >
                                                    {clientRecruiters ?
                                                        clientRecruiters ?.recruiters ?.map((recruiter) =>
                                                        (
                                                            <Option key={`${recruiter.id}`}> {recruiter.username}</Option>
                                                            ))

                                                            : <Option value="0" disabled selected> No Recruiter</Option>
                                                    }
                                                </Select>

                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-md-flex justify-content-between">
                                    <div className="health_card elite_health">
                                        <label>Hiring Manager</label>
                                        <div className="">
                                            <Form.Item
                                                validateStatus={Joi.getFirstPlainError(errors, 'hiring_manager_id') ? 'error' : ''}
                                                help={Joi.getFirstPlainError(errors, 'hiring_manager_id')}>
                                                <Select 
                                                    style={{ width: '100%' }}
                                                    placeholder="Please select"
                                                    className="w-100 new_select"
                                                    value={`${data.hiring_manager_id}`}
                                                    onChange={e => handleChange('hiring_manager_id', e)}
                                                >
                                                    {companyHiringManager ?
                                                        companyHiringManager ?.managers ?.map((manager) =>
                                                        (
                                                            <Option key={`${manager.id}`}> {manager.hiring_manager_name}</Option>
                                                            ))

                                                            : <Option value="0" disabled selected> No client</Option>
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className="health_card elite_health">
                                       
                                        <Form.Item
                                            validateStatus={Joi.getFirstPlainError(errors, 'other_recruiter') ? 'error' : ''}
                                            help={Joi.getFirstPlainError(errors, 'other_recruiter')}
                                            label="Other Recruiter"
                                            >
                                        
                                            <Select 
                                                style={{ width: '100%' }}
                                                placeholder="Please select"
                                                className="w-100 new_select"
                                                value={`${data.other_recruiter}`}
                                                onChange={e => handleChange('other_recruiter', e)}

                                            >
                                                {clientRecruiters ?
                                                    clientRecruiters ?.recruiters ?.map((recruiter) =>
                                                    (
                                                        <Option key={`${recruiter.id}`}> {recruiter.username}</Option>
                                                        ))

                                                        : <Option value="0" disabled selected> No Recruiter</Option>
                                                }
                                            </Select>
                                        </Form.Item>
                                    </div>
                                    <div className="health_card elite_health"></div>
                                </div>
                                <div className="account_form_style d-flex align-items-center mt-4">
                                    {/* <button className="update m-0" type="button" onClick={handlePut}>Update Requisition</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingTwo">
                            <h2 className="mb-0">
                                <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={()=>{addSections(2)}}>
                                <span>Analytics Summary</span>
                                <span className="fa-stack">
                                <i className={Active.includes(2)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                                </span>
                                </button>
                            </h2>
                        </div>
                        <div id="collapseTwo" className={Active.includes(2)?"collapse show":"collapse"} aria-labelledby="headingTwo" data-parent="#accordion" >
                            <div className="card-body px-0">
                                <div className="analytics_tab_card border-0 p-0">
                                    <div className="">
                                    <div className="row">
                                        <div className="col-md-7">
                                            <div className="row">
                                                <div className="col-md-8">
                                                <h3 className="d-flex align-items-center">Analytics <i className="fa fa-caret-down ml-2" aria-hidden="true"></i></h3>
                                                </div>
                                                <div className="col-md-4">
                                                <h3>Jobvite Sent</h3>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-8">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="analytics_card">
                                                            <span className="job_category_icon"><img src="/images/cat_icon1.png" alt=""/></span>
                                                            <h5>Total Candidate</h5>
                                                            <p>( 1 open position )</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="analytics_card">
                                                            <span className="job_category_icon"><img src="/images/cat_icon2.png" alt=""/></span>
                                                            <h5>Broadcast</h5>
                                                            <p>( 1 open position )</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="analytics_card">
                                                            <span className="job_category_icon"><img src="/images/cat_icon3.png" alt=""/></span>
                                                            <h5>Active Candidates</h5>
                                                            <p>( 1 open position )</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="analytics_card">
                                                            <span className="job_category_icon"><img src="/images/cat_icon4.png" alt=""/></span>
                                                            <h5>Direct</h5>
                                                            <p>( 1 open position )</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                                <div className="col-md-4">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="analytics_card">
                                                            <span className="job_category_icon"><img src="/images/cat_icon5.png" alt=""/></span>
                                                            <h5>Days Open</h5>
                                                            <p>( 1 open position )</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="analytics_card">
                                                            <span className="job_category_icon"><img src="/images/cat_icon6.png" alt=""/></span>
                                                            <h5>Filled Positions</h5>
                                                            <p>( 1 open position )</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div>
                                                <h3>Filled Positions</h3>
                                            </div>
                                            <div className="pie_chart_box">
                                                <img src="/images/pie_chart_2.png" alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    <div className="card">
                        <div className="card-header" id="headingFive">
                            <h2 className="mb-0">
                            <button className="d-flex align-items-center justify-content-between btn btn-link collapsed"onClick={()=>addSections(3)}>
                                <span>Candidates by Workflow Step</span>
                                <span className="fa-stack">
                                    <i className={Active.includes(3)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                                </span>
                            </button>
                            </h2>
                        </div>
                        <div id="collapseFive" className={Active.includes(3)?"collapse show":"collapse"} aria-labelledby="headingFive" data-parent="#accordion">
                            <div className="card-body px-0">
                                <div className="status_bar_section d-flex align-items-center justify-content-between">
                                    <ul className="d-md-flex">
                                        <li className="done"><a href="#">New</a></li>                                                
                                        <li className="done"><a href="#"> Lorem</a></li>
                                        <li className="process"><a href="#">Lpsum text</a></li>
                                        <li><a href="#">Lpsum text</a></li>
                                        <li><a href="#">Lorem Ipsum is simply</a></li>
                                        <li><a href="#">Lpsum text</a></li>
                                        <li><a href="#">Lpsum text</a></li>
                                    </ul>
                                    <button className="all_btn_style" type="button">All</button>
                                </div>
                                <div className="my_coustomer_table">
                                    <div className="table-responsive w_bg">
                                        <table className="table table-condensed mb-0" style={{borderCollapse:"collapse"}}>
                                            <thead>
                                                <tr>
                                                    <th>Candidates</th>
                                                    <th>Current Workflow</th>
                                                    <th>Interview Dates</th>
                                                    <th>Current Workflow </th>
                                                    <th>Interview Dates</th>
                                                    <th>Interview Dates</th>
                                                </tr>
                                                
                                            </thead>

                                            <tbody>
                                                <tr>
                                                    <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                    <td>Phone Interview</td>
                                                    <td>10/04/2021</td>                                                
                                                    <td>Phone Interview</td>
                                                    <td>10/04/2021</td>
                                                    <td>10/04/2021</td>
                                                </tr>
                                                <tr>
                                                    <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                    <td>Phone Interview</td>
                                                    <td>10/04/2021</td>                                                
                                                    <td>Phone Interview</td>
                                                    <td>10/04/2021</td>
                                                    <td>10/04/2021</td>
                                                </tr>
                                                <tr>
                                                    <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                    <td>Phone Interview</td>
                                                    <td>10/04/2021</td>                                                
                                                    <td>Phone Interview</td>
                                                    <td>10/04/2021</td>
                                                    <td>10/04/2021</td>
                                                </tr>
                                                <tr>
                                                    <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                    <td>Phone Interview</td>
                                                    <td>10/04/2021</td>                                                
                                                    <td>Phone Interview</td>
                                                    <td>10/04/2021</td>
                                                    <td>10/04/2021</td>
                                                </tr>
                                                <tr>
                                                    <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                    <td>Phone Interview</td>
                                                    <td>10/04/2021</td>                                                
                                                    <td>Phone Interview</td>
                                                    <td>10/04/2021</td>
                                                    <td>10/04/2021</td>
                                                </tr>
                                                <tr>
                                                    <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                    <td>Phone Interview</td>
                                                    <td>10/04/2021</td>                                                
                                                    <td>Phone Interview</td>
                                                    <td>10/04/2021</td>
                                                    <td>10/04/2021</td>
                                                </tr>
                                                <tr>
                                                    <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                    <td>Phone Interview</td>
                                                    <td>10/04/2021</td>                                                
                                                    <td>Phone Interview</td>
                                                    <td>10/04/2021</td>
                                                    <td>10/04/2021</td>
                                                </tr>
                                                <tr>
                                                    <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                    <td>Phone Interview</td>
                                                    <td>10/04/2021</td>                                                
                                                    <td>Phone Interview</td>
                                                    <td>10/04/2021</td>
                                                    <td>10/04/2021</td>
                                                </tr>
                                                <tr>
                                                    <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                    <td>Phone Interview</td>
                                                    <td>10/04/2021</td>                                                
                                                    <td>Phone Interview</td>
                                                    <td>10/04/2021</td>
                                                    <td>10/04/2021</td>
                                                </tr>
                                                <tr>
                                                    <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                    <td>Phone Interview</td>
                                                    <td>10/04/2021</td>                                                
                                                    <td>Phone Interview</td>
                                                    <td>10/04/2021</td>
                                                    <td>10/04/2021</td>
                                                </tr>
                                                <tr>
                                                    <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Britney Williams</td>
                                                    <td>Phone Interview</td>
                                                    <td>10/04/2021</td>                                                
                                                    <td>Phone Interview</td>
                                                    <td>10/04/2021</td>
                                                    <td>10/04/2021</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingThree">
                            <h2 className="mb-0">
                            <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={()=>{addSections(4)}}>
                                <span>Description</span>
                                <span className="fa-stack">
                                    <i className={Active.includes(4)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                                </span>
                            </button>
                            </h2>
                        </div>
                        <div id="collapseThree" className={Active.includes(4)?"collapse show":"collapse"} aria-labelledby="headingThree" data-parent="#accordion">
                            <div className="card-body p-0">
                                
                                    <div className="health_card2 w-100">
                                        <label></label>
                                        <Form.Item
                                            label=""
                                            validateStatus={Joi.getFirstPlainError(errors, 'description') ? 'error' : ''}
                                            help={Joi.getFirstPlainError(errors, 'description')}
                                        >
                                        <textarea
                                            placeholder="" value={data.description || ''}
                                            onChange={v => handleChange('description', v.target.value)}
                                        />
                                        </Form.Item>
                                                                            
                                </div>
                                <div className="docs_drag_area">
                                    <img className="mr-3" src="./images/add_file_icon.png" alt=""/>
                                    
                                    <input type="file" accept=".pdf, .doc, .docx, .odt, .ods" onChange={changeHandler}/>
                                
                                    <p>Drag &amp; Drop, or Browse to Upload Resume</p>
                                    
                                </div>  
                                <div className="col-md-12">
                                    <div className="file_docmt">
                                        {
                                            previewFile ? <iframe src={previewFile} style={{width: 80, height: 100 }}/>    
                                            :
                                            ''
                                            // 
                                        }
                                        <ul>
                                        {
                                            data.requisition_doc && data.requisition_doc.map((fileKey) => {
                                                    
                                                return (
                                                    
                                                    <li>
                                                        <Link to={'/storage/images/'+fileKey.filename } download target="_blank"> {fileKey.filename}</Link>
                                                    </li>
                                                )
                                                  
                                            })
                                        }
                                        </ul>
                                    </div>
                                
                                </div>                        
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingFour">
                            <h2 className="mb-0">
                                <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" onClick={()=>{addSections(5)}}>
                                    <span>General Details</span>
                                    <span className="fa-stack">
                                        <i className={Active.includes(5)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                                    </span>
                                </button>
                            </h2>
                        </div>
                    <div id="collapseFour" className={Active.includes(5) ? "collapse show" : "collapse"} aria-labelledby="headingFour" data-parent="#accordion">
                        <div className="card-body px-0">
                            <div className="ml-3 mb-0">
                                
                            </div>
                            { data.client_requisitions ?
                                <div>
                                    <div className="d-md-flex justify-content-between">
                                        <div className="health_card elite_health">
                                            <label>Company Name</label>
                                            <input placeholder="Enter Here..." 
                                            value={user?.get_client_company?.company_name}
                                            
                                            type="text"/>
                                        </div>
                                        <div className="health_card elite_health">
                                            <label>Phone</label>
                                            <input placeholder="Enter Here..." 
                                            value={user?.get_client_company?.phone}
                                            
                                            type="text"/>
                                        </div>
                                        <div className="health_card elite_health">
                                            <label>Email</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={user?.get_client_company?.email}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-md-flex justify-content-between">
                                        <div className="health_card elite_health">
                                            <label>Primary Address</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.general_primary_address}
                                            onChange={e => handleChange('general_primary_address', e.target.value)}/>
                                        </div>
                                        <div className="health_card elite_health">
                                            <label>Hiring Manager</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.hiring_manager}
                                            onChange={e => handleChange('general_hiring_manager', e.target.value)}/>
                                        </div>
                                        <div className="health_card elite_health">
                                            <label>Type of Insurance Sales &amp; Licensed Needed?</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.general_type_of_insurance_licensed_needed}
                                            onChange={e => handleChange('general_type_of_insurance_licensed_needed', e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="d-md-flex justify-content-between">
                                        <div className="health_card elite_health">
                                            <label>Non-Residents</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.general_non_residents}
                                            onChange={e => handleChange('general_non_residents', e.target.value)}/>
                                        </div>
                                        <div className="health_card elite_health">
                                            <label>Need to have AHIP?</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.general_need_AHIP}
                                            onChange={e => handleChange('general_need_AHIP', e.target.value)}/>
                                        </div>
                                        <div className="health_card elite_health">
                                            <label>Which Products &amp; Carriers do they sell thru?</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.general_products_carriers}
                                            onChange={e => handleChange('general_products_carriers', e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="d-md-flex justify-content-between">
                                        <div className="health_card elite_health">
                                            <label>Appointment Info</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.general_appointment_info}
                                            onChange={e => handleChange('general_appointment_info', e.target.value)}/>
                                        </div>
                                        <div className="health_card elite_health">
                                            <label>Hours/Schedule</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.general_hours_schedule}
                                            onChange={e => handleChange('general_hours_schedule', e.target.value)}/>
                                        </div>
                                        <div className="health_card elite_health">
                                            <label>Base Pay</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.general_base_pay}
                                            onChange={e => handleChange('general_base_pay', e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="d-md-flex justify-content-between">
                                        <div className="health_card elite_health">
                                            <label>Bonus Plan</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.general_bonus_plan}
                                            onChange={e => handleChange('general_bonus_plan', e.target.value)}/>
                                        </div>
                                        <div className="health_card elite_health">
                                            <label>Minimum Experience</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.general_minimum_experience}
                                            onChange={e => handleChange('general_minimum_experience', e.target.value)}/>
                                        </div>
                                        <div className="health_card elite_health">
                                            <label>Technology</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.general_technology}
                                            onChange={e => handleChange('general_technology', e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="d-md-flex justify-content-between">
                                        <div className="health_card elite_health">
                                            <label>Training</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.general_training}
                                            onChange={e => handleChange('general_training', e.target.value)}/>
                                        </div>
                                        <div className="health_card elite_health">
                                            <label>Inbound/Outbound</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.general_inbound_outbound}
                                            onChange={e => handleChange('general_inbound_outbound', e.target.value)}/>
                                        </div>
                                        <div className="health_card elite_health">
                                            <label>Schedule for Phone Interview</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.general_schedule_phone_interview}
                                            onChange={e => handleChange('general_schedule_phone_interview', e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="d-md-flex justify-content-between">
                                        <div className="health_card elite_health">
                                            <label>Openings</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.general_openings}
                                            onChange={e => handleChange('general_openings', e.target.value)}/>
                                        </div>
                                        <div className="health_card elite_health">
                                            <label>Apply Form (Preview)</label>
                                            <Select value={data.general_apply_form} 
                                                        style={{ width: '100%' }}
                                                        placeholder="Please select"
                                                        className="w-100 new_select "
                                                        // onChange={v => handleChangeSearch(v)}
                                                        onChange={e => handleChange('general_apply_form', e)}

                                                    >
                                                        <Option value="">Choose Type</Option>
                                                        <Option value="open">Open</Option>
                                                        <Option value="close">Close</Option>
                                                        
                                                    </Select>
                                        </div>
                                        <div className="health_card elite_health">
                                            <label>Time off Requested</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.general_time_off_requested}
                                            onChange={e => handleChange('general_time_off_requested', e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                            : "" }
                        </div>
                    </div>
                </div>
                    {/* <div className="card">
                        <div className="card-header" id="headingSix">
                            <h2 className="mb-0">
                            <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={()=>{addSections(6)}}>
                                <span>Posting Option</span>
                                <span className="fa-stack">
                                    <i className={Active.includes(6)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                                </span>
                            </button>
                            </h2>
                        </div>
                        <div id="collapseSix" className={Active.includes(6)?"collapse show":"collapse"} aria-labelledby="headingSix" data-parent="#accordion">
                            <div className="card-body p-0">
                                <div className="d-md-flex justify-content-between">
                                    <div className="health_card elite_health">
                                        <label>Posting Type*</label>
                                        <div className="mt-2">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="customCheck1" name="example1"/>
                                                <label className="custom-control-label" for="customCheck1">Limited Access</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="customCheck2" name="example1"/>
                                                <label className="custom-control-label" for="customCheck2">All Employees (Internal)</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="customCheck3" name="example1"/>
                                                <label className="custom-control-label" for="customCheck3">Everyone (External)</label>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="health_card elite_health">
                                        <label>Publishing Options</label>
                                        <div className="custom-control custom-checkbox mt-2">
                                            <input type="checkbox" className="custom-control-input" id="customCheck1" name="example1"/>
                                            <label className="custom-control-label" for="customCheck1">Carer Site (External and Internal) and job board</label>
                                            </div>                                
                                    </div>
                                    <div className="health_card elite_health"></div>
                                </div>
                                

                            </div>
                        </div>
                    </div> */}
                    
                    <div className="account_form_style d-flex align-items-center mt-4">
                        
                        <button className="update m-0" type="button" onClick={handlePut}>Update</button>
                        <button className=" m-0 ml-3" type="button" onClick={onCancel}>Cancel</button>
                    </div>
            </div>
        </div>
    )
}


const mapStateToProps = store => ({
    isFetching: store.rootReducer.clientRequisitions.isFetching,
    data: store.rootReducer.clientRequisitions.data,
    isPutting: store.rootReducer.clientRequisitions.isPutting,
    edited: store.rootReducer.clientRequisitions.edited,
    user: store.rootReducer.auth.user,

});

const mapDispatchToProps = dispatch => bindActionCreators({
    initClientRequisition,
    editClientRequisition,
    getRequisition,
    putClientRequisition
}, dispatch);


   
export default connect(mapStateToProps, mapDispatchToProps)(Update);

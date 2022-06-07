import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { DatePicker,Select,Form, Input} from 'antd';


import Joi from 'utils/validator';
import LoadingIndicator from 'components/Common/LoadingIndicator';
import Notes from '../../../containers/Pages/UserDashboard/Notes/index';
import moment from 'moment';
import notifier from 'utils/notifier';
import { Link } from 'react-router-dom';
const { Option } = Select;


const UPDATE_RECRUITER_SCHEMA = {
    
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
    
};



const RequisitionEditView = ({initRecruiterRequisition,
                 data,  
                 editRecruiterRequisition, 
                 getRecruiterRequisition , 
                 putRecruiterRequisition, 
                 clientList, 
                 isFetching,
                 id,
                 errors,
                 setErrors,
                 recruitersList,
                 user,
                 
}) => {
    const history = useHistory();
    const [editNote, setEditNote] = useState(false);
    const [idNote, setIdNote] = useState(null);
    const [noteTitle, setNoteTitle] = useState(null);
    const [noteDescription, setNoteDescription] = useState(null);
    const [Active,setActive] = useState([]);
    const [clientCompanyName,setClientCompanyName] = useState('');
    const [clientPhone,setClientPhone] = useState('');
    const [clientEmail,setClientEmail] = useState('');
   
    const onCancel=()=>{
        if(user.user_role == 'account_executive'){
            history.push('/account_executive/requisitions');
        }else if(user.user_role == 'recruiter'){
            history.push('/recruiter/requisitions');
        }else if(user.user_role == 'client'){
            history.push('/client/requisitions');
        }
        
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

    const handlePut = (e) => {
        if (e && e.preventDefault) {
          e.preventDefault();
        }
    
        // Validate all fields
        const errors = Joi.validateToPlainErrors(data, (['recruiter', 'admin'].indexOf(data.user_role) === -1) ? UPDATE_RECRUITER_SCHEMA : UPDATE_RECRUITER_SCHEMA);
        setErrors(errors);
        
        
        if (Joi.hasPlainError(errors)) {
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
        
        putRecruiterRequisition(id, formData)
            .then(res => {
                notifier.success('Update requisition success!');
                initRecruiterRequisition();
                if(user.user_role == 'account_executive'){
                    history.push('/account_executive/requisitions/view/'+id);
                }else if(user.user_role == 'recruiter'){
                    history.push('/recruiter/requisitions/view/'+id);
                }else if(user.user_role == 'client'){
                    history.push('/client/requisitions/view/'+id);
                }
                // history.push('/recruiter/requisitions/view/'+id); 
            })
            .catch(err => {
                console.log('err',err);
                notifier.error('Update requisition failed!', err.msg);
                setErrors(err.errors || {});
        });

        return false;
    };

    const handleChange = (key, val) => {

        if(data.company_id == key){
            const roro = clientList.filter(item => item.id == data.company_id)
            .map(item =>( [
                item.company_name,
                item.phone,
                item.email]));

            setClientCompanyName(roro[0][0]);
            setClientPhone(roro[0][1]);
            setClientEmail(roro[0][2]);
        }

        // Validate individual
        setErrors({
            ...errors,
            [key]: Joi.validateToPlainErrors(val, UPDATE_RECRUITER_SCHEMA[key]),
        });
       
        editRecruiterRequisition({ [key]: val });
    };

    //Image state variable    
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState('');
    const [previewFile, setPreviewFile] = useState(null);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files);
           
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

    const onDateChange = (date, dateString, key) => {
        handleChange(key, dateString);
    };
    
    return (
        <div id="accordion" className="record_accordion">
            <LoadingIndicator isLoading={isFetching} /> 
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
                                                validateStatus={Joi.getFirstPlainError(errors, 'recruiter_id') ? 'error' : ''}
                                                help={Joi.getFirstPlainError(errors, 'recruiter_id')}>
                                                <Select value={data.recruiter_id} 
                                                    style={{ width: '100%' }}
                                                    placeholder="Please select"
                                                    className="w-100 new_select"
                                                    onChange={e => handleChange('recruiter_id', e)}

                                                >
                                                    {recruitersList ?
                                                    recruitersList.map((recruiter) =>
                                                    (
                                                        <Option value={`${recruiter.id}`}> {recruiter.username}</Option>
                                                        ))

                                                        : <Option value="0" disabled selected> No client</Option>
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
                                                validateStatus={Joi.getFirstPlainError(errors, 'hiring_manager') ? 'error' : ''}
                                                help={Joi.getFirstPlainError(errors, 'hiring_manager')}>
                                                <Select value={data.hiring_manager} 
                                                    style={{ width: '100%' }}
                                                    placeholder="Please select"
                                                    className="w-100 new_select"
                                                    onChange={e => handleChange('hiring_manager', e)}

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
                                            validateStatus={Joi.getFirstPlainError(errors, 'other_recruiter') ? 'error' : ''}
                                            help={Joi.getFirstPlainError(errors, 'other_recruiter')}
                                            label="Other Recruiter"
                                            >
                                            <Input
                                                placeholder="Enter Here..."
                                                value={data.other_recruiter}
                                                
                                                onChange={e => handleChange('other_recruiter', e.target.value)}
                                            />
                                        </Form.Item>
                                    </div>

                                    <div className="health_card elite_health">
                                        <label>Salary</label>
                                        <div className="state_salary">
                                            <Form.Item
                                                validateStatus={Joi.getFirstPlainError(errors, 'salary') ? 'error' : ''}
                                                help={Joi.getFirstPlainError(errors, 'salary')}>
                                                <Select value={data.salary} 
                                                    style={{ width: '100%' }}
                                                    placeholder="Choose salary Range"
                                                    className="w-100 sal_input"
                                                    // onChange={v => handleChangeSearch(v)}
                                                    onChange={e => handleChange('salary', e)}
                                                >
                                                    <Option value="">Choose Salary</Option>
                                                    <Option value="$40K-$50K">$40K-$50K</Option>
                                                    <Option value="$60K-$70K">$60K-$70K</Option>
                                                    <Option value="$80K-$90K">$80K-$90K</Option>
                                                </Select>
                                            </Form.Item>   
                                        </div>
                                    </div>
                                </div>

                                <div className="d-md-flex justify-content-between">
                                    <div className="health_card elite_health">
                                        <Form.Item
                                            validateStatus={Joi.getFirstPlainError(errors, 'hiring_dates') ? 'error' : ''}
                                            help={Joi.getFirstPlainError(errors, 'hiring_dates')}
                                            label="Hiring Dates"
                                            className=""
                                        >
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                value={data.hiring_dates && moment(data.hiring_dates, 'DD/MM/YYYY')}
                                                placeholder="11/01/2021"
                                                suffixIcon={<i className="far fa-calendar-alt" />}
                                                onChange={(date, dateString) => onDateChange(date, dateString, 'hiring_dates')}
                                                className={'date-picker-style d-block t_date date_hiring'}
                                            />
                                        </Form.Item>
                                        <img className="icon" src="/images/calander_icon_3.png" alt=""/>
                                    </div>  
                                    <div className="health_card elite_health">
                                        <label>Status</label>
                                        <Form.Item
                                            // validateStatus={Joi.getFirstPlainError(errors, 'status') ? 'error' : ''}
                                            // help={Joi.getFirstPlainError(errors, 'status')}
                                            >
                                            <Select value={data.status}
                                                style={{ width: '100%' }}
                                                placeholder="Please select"
                                                className="w-100 new_select "
                                                // onChange={v => handleChangeSearch(v)}
                                                onChange={e => handleChange('status', e)}

                                            >
                                                <Option value="">Choose Type</Option>
                                                <Option value="open">Open</Option>
                                                <Option value="close">Close</Option>
                                            </Select>
                                        </Form.Item>
                                    </div> 
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
                    {/* <div className="card">
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
                    </div> */}
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
                                    
                                    <label>Brief Description</label>
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'brief_description') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'brief_description')}
                                    >
                                    <textarea
                                        placeholder="" value={data.brief_description || ''}
                                        onChange={v => handleChange('brief_description', v.target.value)}
                                        style={{ height:'80px'}}
                                    />
                                    </Form.Item>       
                                    
                                    
                                    <label>Description</label>
                                    <Form.Item
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
                        <div id="collapseFour" className={Active.includes(5)?"collapse show":"collapse"} aria-labelledby="headingFour" data-parent="#accordion">
                            <div className="card-body px-0">
                                <div className="ml-3 mb-0">
                                    {/* <Select defaultValue="Client" style={{ width: 218 }}  onChange={e => handleChange('company_id', e)}>
                                        {clientList ? 
                                        clientList.map((client) => (
                                            <Option value={client.id}> {client.name}</Option>   
                                        ))
                                        
                                        : <Option value="0" disabled selected> No client</Option>}
                                    
                                    </Select>    */}
                                    <h5>Selected Client Details : </h5><h6>{data.client_requisitions ?.client_company_name}</h6>
                                    

                                </div>
                                
                                { data.client_requisitions ?
                                <div>
                                    <div className="d-md-flex justify-content-between">
                                        <div className="health_card elite_health">
                                            <label>Company Name</label>
                                            <input placeholder="Enter Here..." 
                                            value={data.client_requisitions.client_company_name}
                                            readOnly
                                            
                                            type="text"/>
                                        </div>
                                        <div className="health_card elite_health">
                                            <label>Phone</label>
                                            <input placeholder="Enter Here..." 
                                            value={data.client_requisitions.client_phone}
                                            readOnly
                                            type="text"/>
                                        </div>
                                        <div className="health_card elite_health">
                                            <label>Email</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.client_requisitions.client_email}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-md-flex justify-content-between">
                                        <div className="health_card elite_health">
                                            <label>Primary Address</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.client_requisitions.general_primary_address}
                                            onChange={e => handleChange('general_primary_address', e.target.value)}/>
                                        </div>
                                        <div className="health_card elite_health">
                                            <label>Hiring Manager</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.client_requisitions.general_hiring_manager}
                                            onChange={e => handleChange('general_hiring_manager', e.target.value)}/>
                                        </div>
                                        <div className="health_card elite_health">
                                            <label>Type of Insurance Sales &amp; Licensed Needed?</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.client_requisitions.general_type_of_insurance_licensed_needed}
                                            onChange={e => handleChange('general_type_of_insurance_licensed_needed', e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="d-md-flex justify-content-between">
                                        <div className="health_card elite_health">
                                            <label>Non-Residents</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.client_requisitions.general_non_residents}
                                            onChange={e => handleChange('general_non_residents', e.target.value)}/>
                                        </div>
                                        <div className="health_card elite_health">
                                            <label>Need to have AHIP?</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.client_requisitions.general_need_AHIP}
                                            onChange={e => handleChange('general_need_AHIP', e.target.value)}/>
                                        </div>
                                        <div className="health_card elite_health">
                                            <label>Which Products &amp; Carriers do they sell thru?</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.client_requisitions.general_products_carriers}
                                            onChange={e => handleChange('general_products_carriers', e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="d-md-flex justify-content-between">
                                        <div className="health_card elite_health">
                                            <label>Appointment Info</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.client_requisitions.general_appointment_info}
                                            onChange={e => handleChange('general_appointment_info', e.target.value)}/>
                                        </div>
                                        <div className="health_card elite_health">
                                            <label>Hours/Schedule</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.client_requisitions.general_hours_schedule}
                                            onChange={e => handleChange('general_hours_schedule', e.target.value)}/>
                                        </div>
                                        <div className="health_card elite_health">
                                            <label>Base Pay</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.client_requisitions.general_base_pay}
                                            onChange={e => handleChange('general_base_pay', e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="d-md-flex justify-content-between">
                                        <div className="health_card elite_health">
                                            <label>Bonus Plan</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.client_requisitions.general_bonus_plan}
                                            onChange={e => handleChange('general_bonus_plan', e.target.value)}/>
                                        </div>
                                        <div className="health_card elite_health">
                                            <label>Minimum Experience</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.client_requisitions.general_minimum_experience}
                                            onChange={e => handleChange('general_minimum_experience', e.target.value)}/>
                                        </div>
                                        <div className="health_card elite_health">
                                            <label>Technology</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.client_requisitions.general_technology}
                                            onChange={e => handleChange('general_technology', e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="d-md-flex justify-content-between">
                                        <div className="health_card elite_health">
                                            <label>Training</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.client_requisitions.general_training}
                                            onChange={e => handleChange('general_training', e.target.value)}/>
                                        </div>
                                        <div className="health_card elite_health">
                                            <label>Inbound/Outbound</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.client_requisitions.general_inbound_outbound}
                                            onChange={e => handleChange('general_inbound_outbound', e.target.value)}/>
                                        </div>
                                        <div className="health_card elite_health">
                                            <label>Schedule for Phone Interview</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.client_requisitions.general_schedule_phone_interview}
                                            onChange={e => handleChange('general_schedule_phone_interview', e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="d-md-flex justify-content-between">
                                        <div className="health_card elite_health">
                                            <label>Openings</label>
                                            <input placeholder="Enter Here..." type="text"
                                            value={data.client_requisitions.general_openings}
                                            onChange={e => handleChange('general_openings', e.target.value)}/>
                                        </div>
                                        <div className="health_card elite_health">
                                            <label>Apply Form (Preview)</label>
                                            <Select value={data.client_requisitions.general_apply_form} 
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
                                            value={data.client_requisitions.general_time_off_requested}
                                            onChange={e => handleChange('general_time_off_requested', e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                 : "" }
                            </div>
                        </div>
                    </div>
                    <div className="card">
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
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingSeven">
                            <h2 className="mb-0">
                            <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={()=>{addSections(7)}}>
                                <span>Notes</span>
                                <span className="fa-stack">
                                    <i className={Active.includes(7)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                                </span>
                            </button>
                            </h2>
                        </div>
                        <div id="collapseSeven" className={Active.includes(7)?"collapse show":"collapse"} aria-labelledby="headingSeven" data-parent="#accordion">
                            <div className="card-body p-0">
                            <div className="notes_tab_card">
                                {data.id !='' && <Notes data_id ={data.id} model_id={1}/>} 
                                </div>
                                {/* <div className="notes_tab_card">
                                
                                

                                {idNote && editNote && noteDescription && noteTitle ?  
                                    
                                    <>

                                        <div className="health_card w-100">
                                             
                                            <Form.Item
                                                validateStatus={Joi.getFirstPlainError(errors, 'note_title') ? 'error' : ''}
                                                help={Joi.getFirstPlainError(errors, 'note_title')}
                                                label="Note Title"
                                                >
                                                <Input
                                                    placeholder="Enter Here..."
                                                    
                                                    defaultValue={noteTitle}
                                                    onChange={e => handleChange('note_title', e.target.value)}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="health_card w-100">
                                            
                                            <Form.Item
                                                label="Note Description"
                                                validateStatus={Joi.getFirstPlainError(errors, 'note_description') ? 'error' : ''}
                                                help={Joi.getFirstPlainError(errors, 'note_description')}
                                            >
                                                <textarea
                                                    defaultValue={noteDescription }
                                                    onChange={v => handleChange('note_description', v.target.value)}
                                                />
                                            </Form.Item>
                                        </div> 
                                    </>
                                    : 
                                    
                                        data.notes.map((note, key) => {
                                            return (
                                                
                                                <h3 key={key}>
                                                    {note.title }
                                                    <span className="text-primary"> 
                                                        {" " + new Date(data.updated_at).getMonth() +"/"+ new Date(data.updated_at).getDate() +"/"+ new Date(data.updated_at).getFullYear() }
                                                    </span>
                                                    <button onClick={() => openEditNote(note.id, note.title, note.description)} ><i class="fa fa-edit"></i></button>
                                                    <p>{note.description}</p>
                                                </h3>
                                            );                          
                                        })
                                    
                                }
                                  
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="account_form_style d-flex align-items-center mt-4">
                        
                        <button className="update m-0" type="button" onClick={handlePut}>Update</button>
                        <button className=" m-0 ml-3" type="button" onClick={onCancel}>Cancel</button>
                    </div>
            </div>
    )
}





   
export default RequisitionEditView;

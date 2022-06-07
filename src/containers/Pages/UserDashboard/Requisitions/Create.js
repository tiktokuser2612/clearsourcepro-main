import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Select, Form, Input, DatePicker } from 'antd';
import api from 'constants/api';
import moment from 'moment';
import {
    initAdminRequisition,
    editAdminRequisition,
    postAdminRequisition,
} from 'store/actions/adminRequisition';


import notifier from 'utils/notifier';
import Joi from 'utils/validator';
import './../css/style.css'
const { Option } = Select;

const CREATE_REQUISITION_SCHEMA = {

        title: Joi.string().label('Title').required(),
        job_type: Joi.string().min(5).label('Job Type').required().error(() => ({
            message: 'Please select Job type',
        })),

        compensation: Joi.string().label('Compensation').required(),
        category: Joi.string().label('Category').required(),

        department: Joi.string().label('Department').required().error(() => ({
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

        note_title: Joi.string().label('Note Title').required(),

        note_description: Joi.string().label('Note Description').required(),

        general_primary_address: Joi.string().label('Primary Address').required().error(() => ({
            message: "Please enter primary address",
        })),

        // general_hiring_manager: Joi.string().label('Hiring Manager').required().error(() => ({
        //     message: "Please enter Hiring Manager",
        // })),

        general_type_of_insurance_licensed_needed: Joi.string().label('Type of Insurance Sales &amp; Licensed Needed?').required().error(() => ({
            message: "Please enter general type of Insurance needed",

        })),

        general_non_residents: Joi.string().label('Non-Residents').required().error(() => ({
            message: "Please enter Non-Residents ",
        })),

        general_need_AHIP: Joi.string().label('Need to have AHIP?').required().error(() => ({
            message: "Please enter AHIP "
        })),
        general_products_carriers: Joi.string().label('Which Products &amp; Carriers do they sell thru?').required().error(() => ({
            message: "Please enter Which Products & Carriers do they sell thru?"

        })),

        general_appointment_info: Joi.string().label('Appointment Info').required().error(() => ({
            message: "Please enter Appointment Info "
        })),

        general_hours_schedule: Joi.string().label('Hours/Schedule').regex(/^[0-9]*$/).error(() => ({
            message: 'Please enter digits only ',
        })),

        general_base_pay: Joi.string().label('Base Pay').regex(/^[0-9]*$/).error(() => ({
            message: 'Please enter digits only ',
        })),
        general_bonus_plan: Joi.string().label('Bonus Plan').required().error(() => ({
            message: 'Please enter Bonus Plan'
        })),
        general_minimum_experience: Joi.string().label('Minimum Experience').regex(/^[0-9]*$/).required().error(() => ({
            message: 'Please enter digits only',
        })),
        general_technology: Joi.string().label('Technology').required().error(() => ({
            message: "Please enter Technology"
        })),
        general_training: Joi.string().label('Training').required().error(() => ({
            message: "Please enter your Training "
        })),
        general_inbound_outbound: Joi.string().label('Inbound/Outbound').required().error(() => ({
            message: "Please enter  Inbound/Outbound"
        })),
        general_schedule_phone_interview: Joi.string().label('Schedule for Phone Interview').required().error(() => ({
            message: "Please enter  your Schedule for interview",
        })),
        general_openings: Joi.string().label('Openings').required().error(() => ({
            message: "Please enter general Openings",
        })),
        general_apply_form: Joi.string().label('Apply Form').required(),

        general_time_off_requested: Joi.string().label('Time off Requested').required(),

        description: Joi.string().label('Description').required(),

        brief_description: Joi.string().label('Brief Description').required(),
        hiring_dates : Joi.string().label('Hiring Dates').required(),
        salary : Joi.string().label('Salary').required() ,
        status : Joi.string().label('Status').required() ,
};

const Create = ({ 
    initAdminRequisition, postAdminRequisition, editAdminRequisition,
    user, data 
}) => {

    const [Active, setActive] = useState([]);
    const [companyName, setCompanyName] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [detailError, setDetailError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [generalDetailError, setGeneralDetailError] = useState(false);
    const [noteError, setNoteError] = useState(false);
    const [recruitersList, setRecruitersList] = useState([]);
    
    const [accordion, setAccordion] = useState({
        'Details': false,
        'Analytics Summary': false,
        'Candidates by Workflow': false,
        'Description': false,
        'General Details': false,
        'Posting Option': false,
        'Notes': false,
    });
    
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [companyHiringManager, setCompanyHiringManager] = useState([]);
    //Image state variable    
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState('');
    const [previewFile, setPreviewFile] = useState(null);

    const addSections = (sectionID) => {
        let sections = [...Active];

        if (sections.includes(sectionID)) {
            sections.splice(sections.indexOf(sectionID), 1)
        }
        else {
            sections.push(sectionID);
        }
        setActive(sections);

    }

    useEffect(() => {
        initAdminRequisition();
        
        // Get Recruiter list
        api.public.getRecruitersList()
        .then(res => {
            
            setRecruitersList(res.recruitersList);
        })
        .catch(err => {
            notifier.error('get Recruiters failed!');
            setErrors(err.errors || {});
        });

        let acc = {...accordion}

        user.requisition_permissions.filter(p => p.status == 1 && p.permission == 'C').map(p=>{
            acc[p.details.permission] = true
        })

        setAccordion(acc)

    }, [initAdminRequisition , user]);

    const onCancel = () =>{
        history.push('/admin/requisitions');
    }

    const onDateChange = (date, dateString, key) => {
        handleChange(key, dateString);
    };

    const handlePost = (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        // Validate all fields
        const errors = Joi.validateToPlainErrors(data, (['client', 'admin'].indexOf(data.user_role) === -1) ? CREATE_REQUISITION_SCHEMA : CREATE_REQUISITION_SCHEMA);
        setErrors(errors);

        if (Joi.hasPlainError(errors)) {
            notifier.error('Please fix errors');

            if(errors.title != null || 
                errors.job_type != null ||
                errors.compensation != null ||
                errors.category != null ||
                errors.department != null ||
                errors.location != null ||
                errors.evaluation_form != null ||
                errors.pre_interview_form != null ||
                errors.recruiter_id != null ||
                errors.hiring_manager != null ||
                errors.salary != null ||
                errors.status != null
               
                ){
                    setDetailError(true);
            }
            if(errors.brief_description != null || errors.description != null){
                setDescriptionError(true);
            }

            if(errors.client_id != null || 
                errors.general_primary_address != null ||
                errors.general_hiring_manager != null ||
                errors.general_type_of_insurance_licensed_needed != null ||
                errors.general_non_residents != null ||
                errors.general_need_AHIP != null ||
                errors.general_products_carriers != null ||
                errors.general_appointment_info != null ||
                errors.general_hours_schedule != null ||
                errors.general_base_pay != null ||
                errors.general_bonus_plan != null ||
                errors.general_minimum_experience != null ||
                errors.general_technology != null ||
                errors.general_training != null ||
                errors.general_inbound_outbound != null ||
                errors.general_schedule_phone_interview != null ||
                errors.general_openings != null ||
                errors.general_apply_form != null ||
                errors.general_time_off_requested != null 
                ){
                 setGeneralDetailError(true);
            }

            if(errors.note_title != null || errors.note_description != null){
                setNoteError(true);
            }
            
            return;
        }

        //Form Data code Start
        const formData = new FormData();

        if(isFilePicked){
            formData.append(`File`, isFilePicked);
        }        

        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }

        postAdminRequisition(formData)
            .then(res => {
                notifier.success('Create requisition success!');
                initAdminRequisition();
                history.push('/admin/requisitions');
            })
            .catch(err => {

                notifier.error('Create requisition failed!');
                setErrors(err.errors || {});
            });
    };

    const handleChange = (key, val) => {
        // Validate individual


        if(key == 'recruiter_id'){
            const companyData = {};
            // let company_recruiter_id = val;
            companyData['company_recruiter_id'] = val;
            
            //get hiring Manger using recruiter ID
            api.admin.getCompanyHiringManager.getList(companyData)
            .then(hiringManagers => {
                
                setCompanyHiringManager(hiringManagers);
                
                if(hiringManagers?.companyDetails){

                    setCompanyName(hiringManagers?.companyDetails?.company_name);
                    setCompanyPhone(hiringManagers?.companyDetails?.phone);
                    setCompanyEmail(hiringManagers?.companyDetails?.email);
                    
            
                }
            })
            .catch(err => {
                notifier.error('get company Manager failed!');
                setErrors(err.errors || {});
            });
        }
        if(key == 'hiring_manager_id'){

            //Company Details             
            data.company_name = companyName;
            data.company_phone = companyPhone;
            data.company_email = companyEmail;

            companyHiringManager.hiringManager.map((item, index) => (
                 val == item.id ? data.hiring_manager = item.hiring_manager_name : ''
            ))
        }

        if(key == 'other_recruiter'){
            
            data.other_recruiter = val
        }

        setErrors({
            ...errors,
            [key]: Joi.validateToPlainErrors(val, CREATE_REQUISITION_SCHEMA[key]),
        });

        

        editAdminRequisition({ [key]: val });

        if(errors.title == null && 
            errors.job_type == null &&
            errors.compensation == null &&
            errors.category == null &&
            errors.department == null &&
            errors.location == null &&
            errors.evaluation_form == null &&
            errors.pre_interview_form == null &&
            errors.recruiter_id == null &&
            errors.hiring_manager == null &&
            errors.salary == null &&
            errors.status == null 
            ){
                setDetailError(false);
        }

        if(errors.brief_description == null && errors.description == null){
            setDescriptionError(false);
        
        }

        if(errors.client_id == null && 
            errors.general_primary_address == null &&
            errors.general_hiring_manager == null &&
            errors.general_type_of_insurance_licensed_needed == null &&
            errors.general_non_residents == null &&
            errors.general_need_AHIP == null &&
            errors.general_products_carriers == null &&
            errors.general_appointment_info == null &&
            errors.general_hours_schedule == null &&
            errors.general_base_pay == null &&
            errors.general_bonus_plan == null &&
            errors.general_minimum_experience == null &&
            errors.general_technology == null &&
            errors.general_training == null &&
            errors.general_inbound_outbound == null &&
            errors.general_schedule_phone_interview == null &&
            errors.general_openings == null &&
            errors.general_apply_form == null &&
            errors.general_time_off_requested == null 
            ){
                setGeneralDetailError(false);
        }
        if(errors.note_title == null && errors.note_description == null){
            setNoteError(false);
        }
    };

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

    return (
        <div className="health_insurance_main">
            <div className="">
                <h1>Create Requisition</h1>
            </div>
            <div id="accordion" className="record_accordion">
                { accordion['Details'] && <div className="card">
                    <div className="card-header" id="headingOne"  style={ detailError ? {border:'0.5px dotted red'}: {border:'0.5px red'} }>
                        <h2 className="mb-0">
                            <button className="d-flex align-items-center justify-content-between btn btn-link"
                                onClick={() => addSections(1)}>
                                <span>Details</span>
                                <span className="fa-stack fa-sm">
                                    <i className={Active.includes(1) ? "fa fa-minus" : "fa fa-plus"} aria-hidden="true"></i>
                                </span>
                            </button>
                        </h2>
                    </div>

                    <div id="collapseOne" className={Active.includes(1) ? "collapse show" : "collapse"} aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="card-body px-0">
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card elite_health">

                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'title') ? 'error' : ''}
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
                                                className="w-100 new_select "
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
                                        validateStatus={Joi.getFirstPlainError(errors, 'compensation') ? 'error' : ''}
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
                                    <label>Department</label>
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
                                    <div className="">
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
                                            <Select 
                                                style={{ width: '100%' }}
                                                placeholder="Please select"
                                                className="w-100 new_select"
                                                onChange={e => handleChange('recruiter_id', e)}
                                            >
                                                {recruitersList ?
                                                    recruitersList.map((recruiter) =>
                                                    (
                                                        <Option disabled={recruiter.status==0 ? true : null} value={`${recruiter.id}`}> {recruiter.username}</Option>
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
                                            validateStatus={Joi.getFirstPlainError(errors, 'hiring_manager_id') ? 'error' : ''}
                                            help={Joi.getFirstPlainError(errors, 'hiring_manager_id')}>
                                            <Select 
                                                style={{ width: '100%' }}
                                                placeholder="Please select"
                                                className="w-100 new_select"
                                                // defaultValue={companyHiringManager.hiringManager.id} 
                                                onChange={e => handleChange('hiring_manager_id', e)}

                                            >
                                                
                                                {companyHiringManager ?
                                                    companyHiringManager ?.hiringManager ?.map((manager) =>
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
                                    <label>Other Recruiter</label>
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'other_recruiter') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'other_recruiter')}>
                                        <Select 
                                            style={{ width: '100%' }}
                                            placeholder="Please select"
                                            className="w-100 new_select"
                                            // defaultValue="Choose Recruiter" 
                                            onChange={e => handleChange('other_recruiter', e)}

                                        >
                                            {recruitersList ?
                                                recruitersList.map((recruiter) =>
                                                (
                                                    <Option disabled={recruiter.status==0 ? true : null} value={`${recruiter.id}`}> {recruiter.username}</Option>
                                                    ))

                                                    : <Option value="0" disabled selected> No client</Option>
                                            }
                                        </Select>
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

                                    
                                </div>
                                <div className="health_card elite_health">
                                    <label>Status</label>
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'status') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'status')}>
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
                                <div className="health_card elite_health"></div>
                            </div>
                            <div className="account_form_style d-flex align-items-center mt-4">
                                {/* <button className="update m-0" type="button" onClick={handlePost}>Create Requisition</button> */}
                            </div>


                        </div>
                    </div>
                </div>}

                { accordion['Candidates by Workflow'] && <div className="card">
                    <div className="card-header" id="headingFive">
                        <h2 className="mb-0">
                            <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={() => { addSections(3) }}>
                                <span>Candidates by Workflow Step</span>
                                <span className="fa-stack">
                                    <i className={Active.includes(3) ? "fa fa-minus" : "fa fa-plus"} aria-hidden="true"></i>
                                </span>
                            </button>
                        </h2>
                    </div>
                    <div id="collapseFive" className={Active.includes(3) ? "collapse show" : "collapse"} aria-labelledby="headingFive" data-parent="#accordion">
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
                                    <table className="table table-condensed mb-0" style={{ borderCollapse: "collapse" }}>
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
                </div>}

                { accordion['Description'] && <div className="card">
                    <div className="card-header" id="headingThree" style={  descriptionError ? {border:'0.5px dotted red'}: {border:'0.5px red'} }>
                        <h2 className="mb-0">
                            <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={() => { addSections(4) }}>
                                <span>Description</span>
                                <span className="fa-stack">
                                    <i className={Active.includes(4) ? "fa fa-minus" : "fa fa-plus"} aria-hidden="true"></i>
                                </span>
                            </button>
                        </h2>
                    </div>
                    <div id="collapseThree" className={Active.includes(4) ? "collapse show" : "collapse"} aria-labelledby="headingThree" data-parent="#accordion">
                        <div className="card-body p-0">
                                
                                <div className="health_card2 w-100">


                                <label>Brief Description</label>
                                <Form.Item
                                    // label=""
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
                                    }
                                </div>
                              
                            </div>                          
                        </div>
                    </div>
                </div>}

                { accordion['General Details'] && <div className="card">
                    <div className="card-header" id="headingFour" style={ generalDetailError ? {border:'0.5px dotted red'}: {border:'0.5px red'} }>
                        <h2 className="mb-0">
                            <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={() => { addSections(5) }}>
                                <span>General Details</span>
                                <span className="fa-stack">
                                    <i className={Active.includes(5) ? "fa fa-minus" : "fa fa-plus"} aria-hidden="true"></i>
                                </span>
                            </button>
                        </h2>
                    </div>
                    <div id="collapseFour" className={Active.includes(5) ? "collapse show" : "collapse"} aria-labelledby="headingFour" data-parent="#accordion">
                        <div className="card-body px-0">
                            <div className="ml-3 mb-0">
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card elite_health">
                                    <label>Company Name</label>
                                    <Form.Item
                                    validateStatus={Joi.getFirstPlainError(errors, 'company_name') ? 'error' : ''}
                                    help={Joi.getFirstPlainError(errors, 'company_name')}
                                    >

                                    <Input
                                        placeholder="Enter Here..."
                                        value={companyName}
                                        onChange={e => handleChange('company_name', e.target.value)}
                                        readOnly
                                    />    
                                    </Form.Item>
                                </div>
                                <div className="health_card elite_health">
                                    <label>Phone</label>
                                    <Form.Item
                                    validateStatus={Joi.getFirstPlainError(errors, 'company_phone') ? 'error' : ''}
                                    help={Joi.getFirstPlainError(errors, 'company_phone')}>

                                    <Input
                                        placeholder="Enter Here..."
                                        value={companyPhone}
                                        onChange={e => handleChange('company_phone', e.target.value)}
                                        readOnly
                                    />
                                    </Form.Item>
                                </div>
                                <div className="health_card elite_health">
                                    <label>Email</label>
                                    <Form.Item
                                    validateStatus={Joi.getFirstPlainError(errors, 'company_email') ? 'error' : ''}
                                    help={Joi.getFirstPlainError(errors, 'company_email')}>

                                    <Input
                                        readOnly
                                        value={companyEmail}
                                        onChange={e => handleChange('company_email', e.target.value)}
                                    />
                                    </Form.Item>
                                </div>
                            </div>



                            <div className="d-md-flex justify-content-between">
                                <div className="health_card elite_health">
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'general_primary_address') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'general_primary_address')}
                                        label="Primary Address"
                                    >
                                        <Input
                                            placeholder="Enter Here..."
                                            value={data.general_primary_address}
                                            onChange={e => handleChange('general_primary_address', e.target.value)}
                                        />
                                    </Form.Item>
                                </div>


                                <div className="health_card elite_health">
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'general_hiring_manager') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'general_hiring_manager')}
                                        label="Hiring Manager"
                                    >
                                        <Input
                                            readOnly
                                            placeholder="Enter Here..."
                                            value={data.hiring_manager}
                                            onChange={e => handleChange('general_hiring_manager', e.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="health_card elite_health">
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'general_type_of_insurance_licensed_needed') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'general_type_of_insurance_licensed_needed')}
                                        label="Type of Insurance Sales &amp; Licensed Needed?"
                                    >
                                        <Input
                                            placeholder="Enter Here..."
                                            value={data.general_type_of_insurance_licensed_needed}
                                            onChange={e => handleChange('general_type_of_insurance_licensed_needed', e.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card elite_health">
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'general_non_residents') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'general_non_residents')}
                                        label="Non-Residents"
                                    >
                                        <Input
                                            placeholder="Enter Here..."
                                            value={data.general_non_residents}
                                            onChange={e => handleChange('general_non_residents', e.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="health_card elite_health">
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'general_need_AHIP') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'general_need_AHIP')}
                                        label="Need to have AHIP?"
                                    >
                                        <Input
                                            placeholder="Enter Here..."
                                            value={data.general_need_AHIP}
                                            onChange={e => handleChange('general_need_AHIP', e.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="health_card elite_health">
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'general_products_carriers') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'general_products_carriers')}
                                        label="Which Products &amp; Carriers do they sell thru?"
                                    >
                                        <Input
                                            placeholder="Enter Here..."
                                            value={data.general_products_carriers}
                                            onChange={e => handleChange('general_products_carriers', e.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card elite_health">
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'general_appointment_info') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'general_appointment_info')}
                                        label="Appointment Info"
                                    >
                                        <Input
                                            placeholder="Enter Here..."
                                            value={data.general_appointment_info}
                                            onChange={e => handleChange('general_appointment_info', e.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="health_card elite_health">
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'general_hours_schedule') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'general_hours_schedule')}
                                        label="Hours/Schedule"
                                    >
                                        <Input
                                            placeholder="Enter Here..."
                                            value={data.general_hours_schedule}
                                            onChange={e => handleChange('general_hours_schedule', e.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="health_card elite_health">
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'general_base_pay') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'general_base_pay')}
                                        label="Base Pay"
                                    >
                                        <Input
                                            placeholder="Enter Here..."
                                            value={data.general_base_pay}
                                            onChange={e => handleChange('general_base_pay', e.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card elite_health">
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'general_bonus_plan') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'general_bonus_plan')}
                                        label="Bonus Plan"
                                    >
                                        <Input
                                            placeholder="Enter Here..."
                                            value={data.general_bonus_plan}
                                            onChange={e => handleChange('general_bonus_plan', e.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="health_card elite_health">
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'general_minimum_experience') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'general_minimum_experience')}
                                        label="Minimum Experience"
                                    >
                                        <Input
                                            placeholder="Enter Here..."
                                            value={data.general_minimum_experience}
                                            onChange={e => handleChange('general_minimum_experience', e.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="health_card elite_health">
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'general_technology') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'general_technology')}
                                        label="Technology"
                                    >
                                        <Input
                                            placeholder="Enter Here..."
                                            value={data.general_technology}
                                            onChange={e => handleChange('general_technology', e.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card elite_health">
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'general_training') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'general_training')}
                                        label="Training"
                                    >
                                        <Input
                                            placeholder="Enter Here..."
                                            value={data.general_training}
                                            onChange={e => handleChange('general_training', e.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="health_card elite_health">
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'general_inbound_outbound') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'general_inbound_outbound')}
                                        label="Inbound/Outbound"
                                    >
                                        <Input
                                            placeholder="Enter Here..."
                                            value={data.general_inbound_outbound}
                                            onChange={e => handleChange('general_inbound_outbound', e.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="health_card elite_health">
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'general_schedule_phone_interview') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'general_schedule_phone_interview')}
                                        label="Schedule for Phone Interview"
                                    >
                                        <Input
                                            placeholder="Enter Here..."
                                            value={data.general_schedule_phone_interview}
                                            onChange={e => handleChange('general_schedule_phone_interview', e.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card elite_health">
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'general_openings') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'general_openings')}
                                        label="Openings"
                                    >
                                        <Input
                                            placeholder="Enter Here..."
                                            value={data.general_openings}
                                            onChange={e => handleChange('general_openings', e.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="health_card elite_health">
                                    <label>Apply Form (Preview)</label>
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'general_apply_form') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'general_apply_form')}>
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
                                    </Form.Item>
                                </div>
                                <div className="health_card elite_health">
                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'general_time_off_requested') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'general_time_off_requested')}
                                        label="Time off Requested"
                                    >
                                        <Input
                                            placeholder="Enter Here..."
                                            value={data.general_time_off_requested}
                                            onChange={e => handleChange('general_time_off_requested', e.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}

                { accordion['Posting Option'] && <div className="card">
                    <div className="card-header" id="headingSix">
                        <h2 className="mb-0">
                            <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={() => addSections(6)}>
                                <span>Posting Option</span>
                                <span className="fa-stack">
                                    <i className={Active.includes(6) ? "fa fa-minus" : "fa fa-plus"} aria-hidden="true"></i>
                                </span>
                            </button>
                        </h2>
                    </div>
                    <div id="collapseSix" className={Active.includes(6) ? "collapse show" : "collapse"} aria-labelledby="headingSix" data-parent="#accordion">
                        <div className="card-body p-0">
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card elite_health">
                                    <label>Posting Type*</label>
                                    <div className="mt-2">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="customCheck1" name="example1" />
                                            <label className="custom-control-label" for="customCheck1">Limited Access</label>
                                        </div>
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="customCheck2" name="example1" />
                                            <label className="custom-control-label" for="customCheck2">All Employees (Internal)</label>
                                        </div>
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="customCheck3" name="example1" />
                                            <label className="custom-control-label" for="customCheck3">Everyone (External)</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="health_card elite_health">
                                    <label>Publishing Options</label>
                                    <div className="custom-control custom-checkbox mt-2">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1" name="example1" />
                                        <label className="custom-control-label" for="customCheck1">Carer Site (External and Internal) and job board</label>
                                    </div>
                                </div>
                                <div className="health_card elite_health"></div>
                            </div>
                        </div>
                    </div>
                </div>}

                { accordion['Notes'] && <div className="card">
                    <div className="card-header" id="headingSeven"  style={ noteError ? {border:'0.5px dotted red'}: {border:'0.5px red'} }>
                        <h2 className="mb-0">
                            <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={() => { addSections(7) }}>
                                <span>Notes</span>
                                <span className="fa-stack">
                                    <i className={Active.includes(7) ? "fa fa-minus" : "fa fa-plus"} aria-hidden="true"></i>
                                </span>
                            </button>
                        </h2>
                    </div>
                    <div id="collapseSeven" className={Active.includes(7) ? "collapse show" : "collapse"} aria-labelledby="headingSeven" data-parent="#accordion">
                        <div className="card-body p-0">
                            <div className="notes_tab_card">
                                <div className="health_card w-100">

                                    <Form.Item
                                        validateStatus={Joi.getFirstPlainError(errors, 'note_title') ? 'error' : ''}
                                        help={Joi.getFirstPlainError(errors, 'note_title')}
                                        label="Note Title"
                                    >
                                        <Input
                                            placeholder="Enter Here..."
                                            value={data.note_title}

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
                                            value={data.note_description}
                                            onChange={v => handleChange('note_description', v.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}

                <div className="account_form_style d-flex align-items-center mt-4">
                    {/* <button className="update m-0" type="button">Create</button> */}
                    <button className="update m-0" type="button" onClick={handlePost}>Create</button>
                    <button className=" m-0 mml-3" type="button" onClick={onCancel}>Cancel</button>
                    <button className="cancel m-0 mml-3" type="button">Submit for Approval</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = store => ({
    data: store.rootReducer.adminRequisition.data,
    user: store.rootReducer.auth.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    initAdminRequisition,
    editAdminRequisition,
    postAdminRequisition,
}, dispatch);



export default connect(mapStateToProps, mapDispatchToProps)(Create);

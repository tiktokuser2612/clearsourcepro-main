import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Notes from 'containers/Pages/UserDashboard/Notes';
import moment from 'moment';

import notifier from 'utils/notifier';
import LoadingIndicator from 'components/Common/LoadingIndicator';
import NewClientCompanyPop from 'components/Modals/NewClientCompanyPop' 
import api from 'constants/api';

import {
    changePassword,
    getMe,
    initMe,
  } from 'store/actions/auth';
  
const AccountExecutiveProfile= ({ data,isPuttingPassword , getMe, initMe,changePassword,isFetchingMe }) => {
    const[Active,setActive]=useState([]);
    const [isPwdModalVisible, setIsPwdModalVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [invitationStatus, setInvitationStatus] = useState(1);
    const [invitationColor, setInvitationColor] = useState('red');
    const [invitationMsg, setInvitationMsg] = useState('You are not yet invited from JV. So please wait for Invitation mail');
    const [messageStatus, setMessageStatus] = useState(true);
    const [tdate, setTdate] = useState('');

    const [isNotification, setIsNotification] = useState(false);
    const [notification, setNotification] = useState([]);

    const togglePwdModal = () => {
        setIsPwdModalVisible(!isPwdModalVisible);
        setPassword('');
        setPasswordConfirmation('');
    };

    const handlePwdModalOk = () => {
        if (password && password.length > 6 && password === passwordConfirmation) {
            changePassword(password)
            .then(res => {
            notifier.success('Password changed!');
            setPassword('');
            setPasswordConfirmation('');
            setIsPwdModalVisible(false);
            })
            .catch(err => {
            notifier.error('Password change failed!', err.msg);
            });
        } else {
        notifier.error('Please enter valid password!');
        }
    };
  
    const addSection=(sectionId)=>{
        let sections = [...Active];
        if(sections.includes(sectionId)){
            sections.splice(sections.indexOf(sectionId))
        }
        else{
            sections.push(sectionId)
        }
        setActive(sections);
    }

    useEffect(() => {
        initMe();
        getMe();

        if(data.jv_invitation_status == 'Not Read'){
            setInvitationStatus(2);
            setInvitationColor('#c5c541');
            setInvitationMsg('Please read your invitation mail and accept that invitation from JV');
        } else if(data.jv_invitation_status == 'Read'){
            setInvitationStatus(3);
            setInvitationColor('orange');
            setInvitationMsg('Please accept the invitation for completion');
        } else if(data.jv_invitation_status == 'Accepted'){
            setInvitationStatus(4);
            setInvitationColor('green');
            setInvitationMsg('Thank you for invition completion');
            setMessageStatus(false);
        }
        //  if(showCount){
        //     poppmodal();
        //  }
        let cuurentdate = new Date();
        let todaydate =  moment(cuurentdate).format("MM/DD/YYYY");
        setTdate(todaydate);
        
        accountExecutiveNotificationAboutCompanyAssociation()
        
    }, [initMe, getMe]);

    const accountExecutiveNotificationAboutCompanyAssociation = async () => {
        const res = await api.accountExecutive.notication.getCompanyAssociationNotificationDetails()
        
        if(res.data.length){
            setIsNotification(true);
            setNotification(res.data);
        } else {
            setIsNotification(false);
            setNotification([]); 
        }
    }

    const onMarkAsRead = async (id) => {
        await api.recruiter.notication.disableNotification(id).then(res => {
            accountExecutiveNotificationAboutCompanyAssociation()
        }).catch(err => {

        })
    }    

    return (
        <div>
            <div className="health_insurance_main">
            {/* <LoadingIndicator isLoading={isFetchingMe} /> */}
                {   
                    isNotification && <NewClientCompanyPop onClose={()=>{setIsNotification(false)}} notification={notification} markRead={onMarkAsRead}/>
                }
                
                <div className="health_card w-100 d-flex justify-content-between mt-0">
                    
                    <h1>Review Account Executive <Link to="/account_executive/dashboard/edit">Edit</Link></h1>
                    <button className='btn btn-danger' onClick={()=>{
                                notification.length  == 0
                                ? notifier.error('Notification not available!')
                                :setIsNotification(true); 
                            }}>
                        <i className="fa fa-bell text-white"
                            
                        ></i> {notification.length}
                    </button>
                </div>
                <div id="accordion" className="record_accordion">
                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <h2 className="mb-0">

                                <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" onClick={()=>{addSection(1)}}>
                                <span>Details <img src="/images/edit_icon.png" alt=""/></span> 
                                <span className="fa-stack">
                                    <i className={Active.includes(1)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                                </span>
                            </button>
                            </h2>
                        </div>
                        <div id="collapseOne" className={Active.includes(1)?"collapse show": "collapse"} aria-labelledby="headingOne" data-parent="#accordion">
                            <div className="d-md-flex justify-content-between">
                            { 
                                messageStatus ? 
                                <div className="col-md-12" style={invitationStatus ? {color:'#6c757d', border:`1px solid ${invitationColor}`} : {color:'black', border:'1px solid black'}}>       
                                    <p style={{marginTop: '10px'}}>{invitationMsg}</p>
                                </div> : null
                            }
                                
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card">
                                    <label>First Name</label>
                                    <p>{data?.firstname}</p>
                                </div>
                                <div className="health_card">
                                    <label>Last Name</label>
                                    <p>{data?.lastname}</p>
                                </div>
                                <div className="health_card">
                                    <label>User Name</label>
                                    <p>{data?.username}</p>
                                </div>
                                
                            </div>

                            <div className="d-md-flex justify-content-between">
                            <div className="health_card">
                                    <label>Password</label>
                                    {isPwdModalVisible
                                    ? (
                                        <div className="d-flex flex-column position-relative">
                                        <LoadingIndicator isLoading={isPuttingPassword} />

                                        <div className="d-flex flex-row" style={{ margin: '3px 0' }}>
                                            <input style={{ padding: '5px 10px', margin: 0 }} placeholder="Enter new password" type="password"
                                                name="password" id="password" value={password} onChange={v => setPassword(v.target.value)} />
                                            <div className="flex-grow-0 flex-shrink-0 d-flex align-items-center justify-content-center"
                                                style={{ width: 30, height: 30 }}>
                                            {!!(password && password.length > 6)
                                                ? <i className="fas fa-check" />
                                                : <i className="fas fa-times" />
                                            }
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row" style={{ margin: '3px 0' }}>
                                            <input style={{ padding: '5px 10px', margin: 0 }} placeholder="Password confirmation"
                                                type="password" name="password_confirmation" id="password_confirmation"
                                                value={passwordConfirmation} onChange={v => setPasswordConfirmation(v.target.value)} />
                                            <div className="flex-grow-0 flex-shrink-0 d-flex align-items-center justify-content-center"
                                                style={{ width: 30, height: 30 }}>
                                            {!!(password && password.length > 6 && password === passwordConfirmation)
                                                ? <i className="fas fa-check" />
                                                : <i className="fas fa-times" />
                                            }
                                            </div>
                                        </div>

                                        <p>
                                            <a className="ml-4" onClick={handlePwdModalOk}>Confirm</a> <span> </span>
                                            <a className="ml-4" onClick={togglePwdModal}>Cancel</a>
                                        </p>
                                        </div>
                                    )
                                    : (
                                        <>
                                        <p>********* <a className="ml-4" onClick={togglePwdModal}>Reset Password</a></p>
                                        </>
                                    )
                                    }

                                </div>
                                <div className="health_card">
                                    <label>Phone</label>
                                    <p>{data?.phone}</p>
                                </div>    
                                <div className="health_card">
                                    <label>Email</label>
                                    <p>{data?.email}</p>
                                </div>
                                
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card">
                                    <label>Address</label>
                                    <p>{data?.address}</p>
                                </div>
                                <div className="health_card">
                                    <label>City</label>
                                    <p>{data?.city}</p>
                                </div> 
                                <div className="health_card">
                                    <label>State/Region</label>
                                    <p>{data?.state}</p>
                                </div> 
                                
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card">
                                    <label>Zip/Postal Code</label>
                                    <p>{data?.zip}</p>
                                </div> 
                                <div className="health_card">
                                    <label>Salary Range</label>
                                    <p>{data?.salary}</p>
                                </div>
                                <div className="health_card">
                                    <label>Hire Date</label>
                                    <p>{data?.hiring_dates}</p>
                                </div>   
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <div className="health_card">
                                    <label>Company</label>
                                    <p>{data?.get_client_company?.company_name}</p>
                                </div>   
                            </div>
                        </div>
                        
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingTwo">
                            <h2 className="mb-0">
                                <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={()=>{addSection(2)}}>
                                    <span>Analytics Summary<img src="/images/edit_icon.png" alt=""/></span>
                                    <span className="fa-stack">
                                    <i className={Active.includes(2)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                                    </span>
                                </button>
                            </h2>
                        </div>
                        <div id="collapseTwo" className={Active.includes(2)?"collapse show":"collapse"} aria-labelledby="headingTwo" data-parent="#accordion">
                            <div className="card-body px-0">
                                <div className="analytics_tab_card border-0 p-0">
                                    <div className="row">
                                        <div className="col-md-7">
                                            <div className="row">
                                                
                                                <div className="col-md-8">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="analytics_card">
                                                            <span className="job_category_icon"><img src="/images/filled_icon.png" alt=""/></span>
                                                            <h5>1/3</h5>
                                                            <h6 className='green'>Filled Positions</h6>
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="analytics_card">
                                                            <span className="job_category_icon"><img src="/images/job_icon.png" alt=""/></span>
                                                            <h5>5</h5>
                                                            <h6>Time to Hire</h6>
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="analytics_card">
                                                            <span className="job_category_icon"><img src="/images/filled_icon.png" alt=""/></span>
                                                            <h5>1/3</h5>
                                                            <h6>Cost per Hire</h6>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="analytics_card">
                                                            <span className="job_category_icon"><img src="/images/job_icon.png" alt=""/></span>
                                                            <h5>5</h5>
                                                            <h6 className='blue'>Qualified Candidates</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="analytics_card">
                                                                <span className="job_category_icon"><img src="/images/filled_icon.png" alt=""/></span>
                                                                <h5>0/3</h5>
                                                                <h6>Application per Hire</h6>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="analytics_card">
                                                                <span className="job_category_icon"><img src="/images/job_icon.png" alt=""/></span>
                                                                <h5>0/3</h5>
                                                                <h6 className='green'>Retention</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="pie_chart_space d-flex justify-content-between">
                                                <div className="pie_chart_box">
                                                    <img src="/images/pie_chart_1.jpg" alt=""/>
                                                </div>
                                                <div className="pie_chart_box">
                                                    <img src="/images/pie_chart_2.jpg" alt=""/>
                                                </div>
                                            </div>
                                            <div className="pie_chart_space d-flex justify-content-between">
                                                <div className="pie_chart_box">
                                                    <img src="/images/pie_chart_3.jpg" alt=""/>
                                                </div>
                                                <div className="pie_chart_box">
                                                    <img src="/images/pie_chart_4.jpg" alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingThree">
                            <h2 className="mb-0">
                            <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={()=>{addSection(3)}}>
                                <span>Requisitions <img src="/images/edit_icon.png" alt=""/></span>
                                <span className="fa-stack">
                                    <i className={Active.includes(3)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                                </span>
                            </button>
                            </h2>
                        </div>
                        <div id="collapseFive" className={Active.includes(3)?"collapse show":"collapse"} aria-labelledby="headingThree" data-parent="#accordion">
                        {data?.get_requisitions && data?.get_requisitions.length != 0 ?   
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
                                                        <th>Title</th>
                                                        <th>Hiring Manager</th>
                                                        <th>Category</th>
                                                        <th>Location </th>
                                                        <th>Job Type</th>
                                                        <th>Created</th>
                                                    </tr>
                                                    
                                                </thead>

                                                <tbody>
                                                    
                                                {data.get_requisitions && data.get_requisitions.map((requisition, index) => {

                                                    return (
                                                            <tr>
                                                                <td><i className="fa fa-plus-circle" aria-hidden="true"></i> {requisition.title}</td>
                                                                <td>{requisition.hiring_manager}</td>
                                                                <td>{requisition.category}</td>                                                
                                                                <td>{requisition.location}</td>
                                                                <td>{requisition.job_type}</td>
                                                                <td>{moment(requisition.created_at).format("MM/DD/YYYY")}</td>
                                                            </tr>
                                                    )
                                                })}
                                                    
                                                </tbody>
                                            </table>
                                        </div> 
                                    </div>
                                </div>
                                : <label className='ml-3'>No requisition found</label>
                            }
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingFour">
                            <h2 className="mb-0">
                            <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={()=>{addSection(4)}}>
                                <span>Client Companies <img src="/images/edit_icon.png" alt=""/></span>
                                <span className="fa-stack">
                                    <i className={Active.includes(4)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                                </span>
                            </button>
                            </h2>
                        </div>
                        <div id="collapseFive" className={Active.includes(4)?"collapse show":"collapse"} aria-labelledby="headingFour" data-parent="#accordion">
                        {data?.get_client_company && data?.get_client_company.length != 0 ?   
                                <div className="card-body px-0">
                                    
                                    <div className="my_coustomer_table">
                                        <div className="table-responsive w_bg">
                                            <table className="table table-condensed mb-0" style={{borderCollapse:"collapse"}}>
                                                <thead>
                                                    <tr>
                                                        <th>Company Name</th>
                                                        <th>Company Type</th>
                                                        <th>Company Website</th>
                                                        <th>Primary Contact Name</th>
                                                        
                                                        <th>Email</th>
                                                        <th>Address</th>
                                                        <th>Status</th>
                                                    </tr>
                                                    
                                                </thead>

                                                <tbody>
                                                    
                                                {data.get_client_company && data.get_client_company.map((company, index) => {

                                                    return (
                                                            <tr>
                                                                <td><i className="fa fa-plus-circle" aria-hidden="true"></i> {company.company_name}</td>
                                                                <td>{company.company_type}</td>
                                                                <td>{company.company_website}</td>                                                
                                                                <td>{company.primary_contact_name}</td>
                                                                <td>{company.email}</td>
                                                                <td>{company.locations}</td>
                                                                <td>{moment(company.created_at).format("MM/DD/YYYY") == tdate ? 'New' : ''}</td>
                                                            </tr>
                                                    )
                                                })}
                                                    
                                                </tbody>
                                            </table>
                                        </div> 
                                    </div>
                                </div>
                                : <label className='ml-3'>Your are not attched any client yet!</label>
                            }
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingFive">
                            <h2 className="mb-0">
                                <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" onClick={()=>{addSection(5)}}>
                                    <span>Notes <img src="/images/edit_icon.png" alt=""/></span>
                                    <span className="fa-stack">
                                        <i className={Active.includes(5)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                                    </span>
                                </button>
                            </h2>
                        </div>
                        <div id="collapseFive" className={Active.includes(5)?"collapse show":"collapse"} aria-labelledby="headingFive" data-parent="#accordion">
                            <div className="card-body p-0">
                                
                                <div className="notes_tab_card">
                                    {data?.id !='' && <Notes data_id ={data?.id} model_id={2}/>} 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = store => ({
  data: store.rootReducer.auth.user,
  isFetchingMe: store.rootReducer.auth.isFetchingMe,
  isPuttingPassword: store.rootReducer.auth.isPuttingPassword,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  changePassword,
  initMe,
  getMe,


}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccountExecutiveProfile);

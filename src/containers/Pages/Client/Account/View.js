import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import {
    editClientData
} from 'store/actions/clientMyAccount';
import CreateContact from 'components/Common/CreateContact';
import EditContact from 'components/Common/EditContact';
import ViewContactList from 'components/Common/ViewContactList';
import NewClientCompanyPop from 'components/Modals/NewClientCompanyPop' 

// import LoadingIndicator from 'components/Common/LoadingIndicator';



const View = ({
    user 
  }) => {

    console.log(user);
    
    const [invitationStatus, setInvitationStatus] = useState(1);
    const [invitationColor, setInvitationColor] = useState('red');
    const [invitationMsg, setInvitationMsg] = useState('You are not yet invited from JV. So please wait for Invitation mail');
    const [messageStatus, setMessageStatus] = useState(true);
    const [newContact, setNewContact] = useState(false);
    const [editContact, setEditContact] = useState(false);
    const [hiringManagerId, setHiringManagerId] = useState('');
    const[Active,setActive]=useState([]);
    // const [close, setClose] = useState(false);
    // const [newcompany, setNewCompany] = useState(false);
    
    
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
        if(user?.jv_invitation_status == 'Not Read'){
            setInvitationStatus(2);
            setInvitationColor('#c5c541');
            setInvitationMsg('Please read your invitation mail and accept that invitation from JV');
        }else if(user?.jv_invitation_status == 'Read'){
            setInvitationStatus(3);
            setInvitationColor('orange');
            setInvitationMsg('Please accept the invitation for completion');
        }else if(user?.jv_invitation_status == 'Accepted'){
            setInvitationStatus(4);
            setInvitationColor('green');
            setInvitationMsg('Thank you for invition completion');
            setMessageStatus(false);
        }

        // if(user?.get_client_company){
        //     let cuurentdate = new Date();
        //     let todaydate =  moment(cuurentdate).format("MM/DD/YYYY");
        //     let companydate =  moment(user?.get_client_company.created_at).format("MM/DD/YYYY");
        //     console.log('clent company date', companydate);
        //     console.log('current date', todaydate);
        //     if(companydate == todaydate){
               
        //         setNewCompany(true);
        //     }
            
    
        //  }
        
    });
    const createNewContact = () => {
        setEditContact(false);
        setNewContact(true);
    }
    // const closemodel = () => {
    //     setClose(true);
    // }
    
    const id = user?.id;
    
    return (
        <>
            {/* <LoadingIndicator isLoading={isFetching} /> */}
                <div className="health_insurance_main">
                    {/* {newcompany ?
                    <NewClientCompanyPop closemodel={closemodel} close={close} msg="You are attached with a new client company!"/> : ''
                    } */}
                    <h1>Review Client Record <Link to={`/client/dashboard/edit/${id}`} >Edit</Link></h1>

                    { 
                        messageStatus ? 
                        <div className="col-md-12" style={invitationStatus ? {color:'#6c757d', border:`1px solid ${invitationColor}`} : {color:'black', border:'1px solid black'}}>       
                            <p style={{marginTop: '10px'}}>{invitationMsg}</p>
                        </div> : null
                    }
                    

                    <div className="d-md-flex justify-content-between">


                        <div className="health_card">
                            <label>Company Name</label>
                            <p>{user?.company_name}</p>
                        </div>
                        <div className="health_card">
                            <label>Company Type/Industry</label>
                            <p>{user?.company_type}</p>
                        </div>
                        <div className="health_card">
                            <label>Company Website</label>
                            <p>{user?.company_website}</p>
                        </div>
                    </div>
                    <div className="d-md-flex justify-content-between">
                        <div className="health_card">
                            <label>Hours of Operation</label>
                            <p>{user?.hours_of_operations}</p>
                        </div>
                        <div className="health_card">
                            <label>Years in Business</label>
                            <p>{user?.year_in_business}</p>
                        </div>
                        <div className="health_card">
                            <label>Primary Contact Name</label>
                            <p>{user?.name}</p>
                        </div>
                    </div>
                    <div className="d-md-flex justify-content-between">
                        <div className="health_card">
                            <label>Primary Contact Title</label>
                            <p>{user?.primary_contact_title}</p>
                        </div>
                        <div className="health_card">
                            <label>Primary Phone</label>
                            <p>{user?.phone}</p>
                        </div>
                        <div className="health_card">
                            <label>Primary Email</label>
                            <p>{user?.email}</p>
                        </div>
                    </div>
                    <div className="d-md-flex justify-content-between">
                        <div className="health_card">
                            <label>Corp/Primary Address</label>
                            <p>{user?.address_type}</p>
                        </div>
                        <div className="health_card">
                            <label>Locations</label>
                            <p>{user?.address}</p>
                        </div>
                        <div className="health_card">
                            <label></label>
                            <p></p>
                        </div>
                    </div>
                    <div id="accordion" className="record_accordion">
                        <div className="card">
                            <div className="card-header" id="headingOne">
                            <h2 className="mb-0">
                                <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse"  onClick={()=>{addSection(1)}}>
                                <span>Requisitions <img src="/images/edit_icon.png" alt=""/> </span> 
                                <span className="fa-stack fa-sm">
                                    <i className={Active.includes(1)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                                </span>
                                </button>
                            </h2>
                            </div>
                            <div id="collapseOne" className={Active.includes(1)?"collapse show": "collapse"} aria-labelledby="headingOne" data-parent="#accordion">
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
                                <div className="my_coustomer_table requisition_table">
                                    <div className="table-responsive w_bg">
                                        <table className="table table-condensed mb-0" style={{borderCollapse:"collapse"}}>
                                            <thead>
                                                <tr>
                                                    <th>John Smith</th>
                                                    <th>New</th>
                                                    <th>Submitted to hiring manager</th>
                                                    <th>Offer Sent</th>
                                                    <th>Rejected</th>
                                                    <th>Active</th>
                                                </tr>
                                                
                                            </thead>

                                            <tbody>
                                                <tr>
                                                    <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                                    <td>24</td>
                                                    <td>0</td>                                                
                                                    <td>87</td>
                                                    <td>9</td>
                                                    <td>6</td>
                                                </tr>
                                                <tr>
                                                    <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                                    <td>24</td>
                                                    <td>0</td>                                                
                                                    <td>87</td>
                                                    <td>9</td>
                                                    <td>6</td>
                                                </tr>
                                                <tr>
                                                    <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                                    <td>24</td>
                                                    <td>0</td>                                                
                                                    <td>87</td>
                                                    <td>9</td>
                                                    <td>6</td>
                                                </tr>
                                                <tr>
                                                    <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                                    <td>24</td>
                                                    <td>0</td>                                                
                                                    <td>87</td>
                                                    <td>9</td>
                                                    <td>6</td>
                                                </tr>
                                                <tr>
                                                    <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                                    <td>24</td>
                                                    <td>0</td>                                                
                                                    <td>87</td>
                                                    <td>9</td>
                                                    <td>6</td>
                                                </tr>
                                                <tr>
                                                    <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                                    <td>24</td>
                                                    <td>0</td>                                                
                                                    <td>87</td>
                                                    <td>9</td>
                                                    <td>6</td>
                                                </tr>
                                                <tr>
                                                    <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                                    <td>24</td>
                                                    <td>0</td>                                                
                                                    <td>87</td>
                                                    <td>9</td>
                                                    <td>6</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div> 
                                </div>
                            </div>
                        </div>
                        </div>
                        {/* <div className="card">
                            <div className="card-header" id="headingTwo">
                            <h2 className="mb-0">
                                <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" onClick={()=>{addSection(2)}}>
                                    <span>Hiring Manager(s) <img src="/images/edit_icon.png" alt=""/></span>
                                <span className="fa-stack">
                                    <i className={Active.includes(2)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                                </span>
                                </button>
                            </h2>
                            </div>
                            <div id="collapseTwo" className={Active.includes(2)?"collapse show": "collapse"} aria-labelledby="headingTwo" data-parent="#accordion">
                            <div className="card-body">
                                <div className="d-md-flex justify-content-between">
                                    <div className="health_card">
                                        <label>Name</label>
                                        <p>John Smith</p>
                                    </div>
                                    <div className="health_card">
                                        <label>Title</label>
                                        <p>Admin</p>
                                    </div>
                                    <div className="health_card">
                                        <label>Phone</label>
                                        <p>888-777-2345</p>
                                    </div>
                                </div>
                                <div className="d-md-flex justify-content-between">
                                    <div className="health_card">
                                        <label>Email</label>
                                        <p>contact@email.com</p>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div> */}
                        <div className="card">
                            <div className="card-header" id="headingfive">
                            <h2 className="mb-0">
                                <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" onClick={()=>{addSection(5)}}>
                                    <span>Hiring Manager(s) <img src="/images/edit_icon.png" alt=""/></span>
                                <span className="fa-stack">
                                    <i className={Active.includes(5)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                                </span>
                                </button>
                            </h2>
                            </div>
                            <div id="collapsefive" className={Active.includes(5)?"collapse show": "collapse"} aria-labelledby="headingfive" data-parent="#accordion">
                            <div className="card-body px-0">
                                <div className="health_card w-100 d-flex justify-content-between ml-3 pr-4 mt-0">
                                    <label>Hiring Manager(s)</label>
                                    <div className="d-flex justify-content-end mb-2">
                                        {
                                            !editContact ? <a class="text-decoration-none" onClick={createNewContact}><i class="fa fa-plus-circle" aria-hidden="true"></i> Create New Contact</a> : null 
                                        }
                                    </div>
                                </div>
                                {
                                    newContact ? <CreateContact setNewContact={setNewContact} client_id={id}/> : null
                                }
                                {
                                    editContact ? <EditContact hiringManagerId={hiringManagerId} setEditContact={setEditContact}  /> : null
                                }
                                
                                <ViewContactList setNewContact={setNewContact} setEditContact={setEditContact} setHiringManagerId={setHiringManagerId}/>
                                
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header" id="headingThree">
                            <h2 className="mb-0">
                                <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" onClick={()=>{addSection(3)}}>
                                    <span>Accounting/Billing Contact Info <img src="/images/edit_icon.png" alt=""/></span>
                                <span className="fa-stack">
                                    <i className={Active.includes(3)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                                </span>
                                </button>
                            </h2>
                            </div>
                            <div id="collapseThree" className={Active.includes(3)?"collapse show": "collapse"} aria-labelledby="headingThree" data-parent="#accordion">
                            <div className="card-body">
                                <div className="d-md-flex justify-content-between">
                                    <div className="health_card">
                                        <label>Contact Name</label>
                                        <p>John Smith</p>
                                    </div>
                                    <div className="health_card">
                                        <label>Phone</label>
                                        <p>888-777-2345</p>
                                    </div>
                                    <div className="health_card">
                                        <label>Email</label>
                                        <p>contact@email.com</p>
                                    </div>
                                </div>
                                <div className="d-md-flex justify-content-between">
                                    <div className="health_card">
                                        <label>Address</label>
                                        <p>Clearwater, FI (Primary)</p>
                                    </div>
                                    <div className="health_card">
                                        <label>City</label>
                                        <p>Clearwater</p>
                                    </div>
                                    <div className="health_card">
                                        <label>State</label>
                                        <p>Florida</p>
                                    </div>
                                </div>
                                <div className="d-md-flex justify-content-between">
                                    <div className="health_card">
                                        <label>Zip</label>
                                        <p>33763</p>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header" id="headingfour">
                            <h2 className="mb-0">
                                <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" onClick={()=>{addSection(4)}}>
                                    <span>Description of Business <img src="/images/edit_icon.png" alt=""/></span>
                                <span className="fa-stack">
                                    <i className={Active.includes(4)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                                </span>
                                </button>
                            </h2>
                            </div>
                            <div id="collapsefour" className={Active.includes(4)?"collapse show": "collapse"} aria-labelledby="headingfour" data-parent="#accordion">
                            <div className="card-body1 px-0">
                                <div className="health_card ml-3 w-100">
                                    <label>Role Summary for Ideal Candidate</label>
                                    <p className="body_text">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum been the industry's standard dummy text ever since the 1500s, when an unknown printer 
        took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum pges, and more recently with desktop publishing software  <br></br>like Aldus PageMaker including 
        versions of Lorem Ipsum.
                                    </p>
                                </div>
                            </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>    
        </>
    );
  };


const mapStateToProps = store => ({
    user: store.rootReducer.auth.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    editClientData
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(View);




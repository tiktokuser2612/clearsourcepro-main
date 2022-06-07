import React, { useEffect , useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CreateContact from './CreateContact';
import HiringManagers from './HiringManagerList';
import EditHiringManager from './EditHiringManager';
import {
    initAdminClientUsers,
  getAdminClient,
} from 'store/actions/adminNewClient';
import LoadingIndicator from 'components/Common/LoadingIndicator';



const View = ({
    isFetching,
    data,
    getAdminClient,
    initAdminClientUsers,
    user
  }) => {
      
    const { id } = useParams();
    const [newContact, setNewContact] = useState(false);
    const [editContact, setEditContact] = useState(false);
    const [hiringManagerId, setHiringManagerId] = useState('');
    

    //Client Update accordion Permission
    const [accordion, setAccordion] = useState({
        'Details': false,
        'Reqs': false,
        'Hiring Managers': false,
        'Accounting/Billing Contact Info': false,
        'Description of Business': false,
        'Contacts': false,
    });


    useEffect(() => {
        initAdminClientUsers();
        getAdminClient(id);

        //get client permission from user key resposne 
        let acc = {...accordion}
        user.client_permissions.filter(p => p.status == 1 && p.permission == 'R').map(p=>{
            acc[p.details.permission] = true
        })

        setAccordion(acc)
        
    }, [getAdminClient, initAdminClientUsers, id , user]);

    const createNewContact = () => {
        setEditContact(false);
        setNewContact(true);
    }


    return (
        <>
            <LoadingIndicator isLoading={isFetching} />
                <div className="health_insurance_main">
                    <h1>Review Client Record <Link to={`/admin/clients/edit/${id}`} >Edit</Link></h1>
                    { accordion['Details'] && <div>
                        <div className="d-md-flex justify-content-between">
                            <div className="health_card">
                                <label>Company Name</label>
                                <p>{data.company_name}</p>
                            </div>
                            <div className="health_card">
                                <label>Company Type/Industry</label>
                                <p>{data.company_type}</p>
                            </div>
                            <div className="health_card">
                                <label>Company Website</label>
                                <p>{data.company_website}</p>
                            </div>
                        </div>
                        <div className="d-md-flex justify-content-between">
                            <div className="health_card">
                                <label>Hours of Operation</label>
                                <p>{data.hours_of_operations}</p>
                            </div>
                            <div className="health_card">
                                <label>Years in Business</label>
                                <p>{data.year_in_business}</p>
                            </div>
                            <div className="health_card">
                                <label>Primary Contact Name</label>
                                <p>{data.primary_contact_name}</p>
                            </div>
                        </div>
                        <div className="d-md-flex justify-content-between">
                            <div className="health_card">
                                <label>Primary Contact Title</label>
                                <p>{data.primary_contact_title}</p>
                            </div>
                            <div className="health_card">
                                <label>Primary Phone</label>
                                <p>{data.phone}</p>
                            </div>
                            <div className="health_card">
                                <label>Primary Email</label>
                                <p>{data.email}</p>
                            </div>
                        </div>
                        <div className="d-md-flex justify-content-between">
                            <div className="health_card">
                                <label>Corp/Primary Address</label>
                                <p>{data.address_type}</p>
                            </div>
                            <div className="health_card">
                                <label>Locations</label>
                                <p>{data.locations}</p>
                            </div>
                            <div className="health_card">
                                <label>Recruiter</label>
                                <p>{data.recruiter_name}</p>
                            </div>
                        </div>
                        <div className="d-md-flex justify-content-between">
                            <div className="health_card">
                                <label>Corp/Primary Address</label>
                                <p>{data.firstname}</p>
                            </div>
                            <div className="health_card">
                                
                            </div>
                            <div className="health_card">
                                
                            </div>
                        </div>
                    </div> }
                    <div id="accordion" className="record_accordion">
                    { accordion['Resume'] && <div className="card">
                            <div className="card-header" id="headingOne">
                            <h2 className="mb-0">
                                <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                <span>Requisitions <img src="/images/edit_icon.png" alt=""/> </span> 
                                <span className="fa-stack fa-sm">
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                </span>
                                </button>
                            </h2>
                            </div>
                            <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
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
                        </div> }
                        { accordion['Hiring Managers'] && <div className="card">
                            <div className="card-header" id="headingTwo">
                            <h2 className="mb-0">
                                <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    <span>Hiring Manager(s) <img src="/images/edit_icon.png" alt=""/></span>
                                <span className="fa-stack">
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                </span>
                                </button>
                            </h2>
                            </div>
                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                            <div className="card-body">
                                <div className="d-md-flex justify-content-between">
                                    <div className="health_card">
                                        <label>Name</label>
                                        <p>{data?.get_client_manager?.hiring_manager_name}</p>
                                    </div>
                                    <div className="health_card">
                                        <label>Title</label>
                                        <p>{data?.get_client_manager?.hiring_manager_title}</p>
                                    </div>
                                    <div className="health_card">
                                        <label>Phone</label>
                                        <p>{data?.get_client_manager?.hiring_manager_phone}</p>
                                    </div>
                                </div>
                                <div className="d-md-flex justify-content-between">
                                    <div className="health_card">
                                        <label>Email</label>
                                        <p>{data?.get_client_manager?.hiring_manager_email}</p>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div> }
                        { accordion['Accounting/Billing Contact Info'] && <div className="card">
                            <div className="card-header" id="headingThree">
                            <h2 className="mb-0">
                                <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    <span>Accounting/Billing Contact Info <img src="/images/edit_icon.png" alt=""/></span>
                                <span className="fa-stack">
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                </span>
                                </button>
                            </h2>
                            </div>
                            <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                            <div className="card-body">
                                <div className="d-md-flex justify-content-between">
                                    <div className="health_card">
                                        <label>Contact Name</label>
                                        <p>{data?.get_client_manager?.contact_info_name}</p>
                                    </div>
                                    <div className="health_card">
                                        <label>Phone</label>
                                        <p>{data?.get_client_manager?.contact_info_phone}</p>
                                    </div>
                                    <div className="health_card">
                                        <label>Email</label>
                                        <p>{data?.get_client_manager?.contact_info_email}</p>
                                    </div>
                                </div>
                                <div className="d-md-flex justify-content-between">
                                    <div className="health_card">
                                        <label>Address</label>
                                        <p>{data?.get_client_manager?.contact_info_address}</p>
                                    </div>
                                    <div className="health_card">
                                        <label>City</label>
                                        <p>{data?.get_client_manager?.contact_info_city}</p>
                                    </div>
                                    <div className="health_card">
                                        <label>State</label>
                                        <p>{data?.get_client_manager?.contact_info_state}</p>
                                    </div>
                                </div>
                                <div className="d-md-flex justify-content-between">
                                    <div className="health_card">
                                        <label>Zip</label>
                                        <p>{data?.get_client_manager?.contact_info_zip}</p>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div> }
                        { accordion['Description of Business'] && <div className="card">
                            <div className="card-header" id="headingfour">
                            <h2 className="mb-0">
                                <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapsefour" aria-expanded="false" aria-controls="collapsefour">
                                    <span>Description of Business <img src="/images/edit_icon.png" alt=""/></span>
                                <span className="fa-stack">
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                </span>
                                </button>
                            </h2>
                            </div>
                            <div id="collapsefour" className="collapse" aria-labelledby="headingfour" data-parent="#accordion">
                            <div className="card-body1 px-0">
                                <div className="health_card ml-3 w-100">
                                    <label>Role Summary for Ideal Candidate</label>
                                    <p className="body_text">
                                        {data?.description}
                                    </p>
                                </div>
                            </div>
                            </div>
                        </div> }
                        { accordion['Contacts'] && <div className="card">
                            <div className="card-header" id="headingfive">
                            <h2 className="mb-0">
                                <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapsefive" aria-expanded="false" aria-controls="collapsefive">
                                    <span>Contacts <img src="/images/edit_icon.png" alt=""/></span>
                                <span className="fa-stack">
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                </span>
                                </button>
                            </h2>
                            </div>
                            <div id="collapsefive" className="collapse" aria-labelledby="headingfive" data-parent="#accordion">
                            <div className="card-body px-0">
                                <div className="health_card w-100 d-flex justify-content-between ml-3 pr-4 mt-0">
                                    <label>Contact List</label>
                                    <div className="d-flex justify-content-end mb-2"> 
                                    
                                        {
                                            // !editContact ? <button className="green_btn text-decoration-none" onClick={createNewContact} >Create New Contact</button> : null 
                                            !editContact ? <a class="text-decoration-none" onClick={createNewContact}><i class="fa fa-plus-circle" aria-hidden="true"></i> Create New Contact</a> : null 
                                        }
                                        
                                    </div>
                                </div>
                                {
                                    newContact ? <CreateContact setNewContact={setNewContact}/> : null
                                }
                                {
                                    // green_btn editContact ? <EditHiringManager hiringManagerId={data?.get_client_manager?.id} setHiringManagerId={setHiringManagerId} setEditContact={setEditContact} /> : null
                                    editContact ? <EditHiringManager hiringManagerId={hiringManagerId} setEditContact={setEditContact}  /> : null
                                }
                                
                                <HiringManagers setNewContact={setNewContact} setEditContact={setEditContact} setHiringManagerId={setHiringManagerId}/>
                                
                                {/* {
                                    loadContactManager ? <HiringManagers setLoadContactManager={setLoadContactManager} setNewContact={setNewContact} setEditContact={setEditContact} setListContactManager={setListContactManager} setHiringManagerId={setHiringManagerId}/> : null
                                } */}
                                

                            </div>
                        </div>
                    </div>}
                </div>
            </div>    
        </>
    );
  };


  const mapStateToProps = store => ({
    data: store.rootReducer.adminNewClient.data,
    isFetching: store.rootReducer.adminNewClient.isFetching,
    user: store.rootReducer.auth.user,
  });
  
  const mapDispatchToProps = dispatch => bindActionCreators({
    initAdminClientUsers,
    getAdminClient,
  }, dispatch);
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(View);




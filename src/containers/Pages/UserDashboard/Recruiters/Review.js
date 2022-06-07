import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
    initAdminRecruiter,
    getRecruiters,
  } from 'store/actions/adminRecruiter';
  import LoadingIndicator from 'components/Common/LoadingIndicator';
  import Notes from '../Notes';

const Review = ({
    isFetching,
    data,
    getRecruiters,
    initAdminRecruiter,
    user
  }) => {
    const { id } = useParams();
    const[Active,setActive]=useState([]);
    
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

    //Recruiter View Permission State
    const [accordion, setAccordion] = useState({
        'Details': false,
        'Analytics Summary': false,
        'Resume': false,
        'Permissions': false,
        'Notes': false,
    });

    useEffect(() => {
        initAdminRecruiter();
        getRecruiters(id);

        let acc = {...accordion}

        user.recruiter_permissions.filter(p => p.status == 1 && p.permission == 'R' || p.permission == 'Analytics Summary').map(p=>{
            acc[p.details.permission] = true
        })

        setAccordion(acc)
        
    }, [getRecruiters, initAdminRecruiter, id]);

    return (
        <div className="health_insurance_main">
            <LoadingIndicator isLoading={isFetching} />
            <div className="">
                <h1>Review Recruiter</h1>
            </div>                    
            <div id="accordion" className="record_accordion">
            { accordion['Details'] && <div className="card">
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
                            <div className="health_card">
                                <label>First Name</label>
                                <p>{data.firstname}</p>
                            </div>
                            <div className="health_card">
                                <label>Last Name</label>
                                <p>{data.lastname}</p>
                            </div>
                            <div className="health_card">
                                <label>User Name</label>
                                <p>{data.username}</p>
                            </div>
                                                      
                        </div>

                        <div className="d-md-flex justify-content-between">
                            <div className="health_card">
                                <label>Phone</label>
                                <p>{data.phone}</p>
                            </div>
                            <div className="health_card">
                                <label>Email</label>
                                <p>{data.email}</p>
                            </div>
                            <div className="health_card">
                                <label>Address</label>
                                <p>{data.address}</p>
                            </div>
                             
                                                           
                        </div>
                        <div className="d-md-flex justify-content-between">
                            <div className="health_card">
                                <label>City</label>
                                <p>{data.city}</p>
                            </div>
                            <div className="health_card">
                                <label>Zip/Postal Code</label>
                                <p>{data.zip}</p>
                            </div> 
                            <div className="health_card">
                                <label>Salary Range</label>
                                <p>{data.salary}</p>
                            </div>
                                                            
                        </div>
                        <div className="d-md-flex justify-content-between">
                            <div className="health_card">
                                <label>Hire Date</label>
                                <p>{data.hiring_dates}</p>
                            </div> 
                            <div className="health_card">
                                <label>Selected Company</label>
                                <p>{data?.get_client_company?.company_name}</p>
                            </div> 
                                                         
                        </div>
                    </div>
                    
                </div>}
                { accordion['Analytics Summary'] && <div className="card">
                    <div className="card-header" id="headingTwo">
                        <h2 className="mb-0">
                            <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={()=>{addSection(2)}}>
                                <span>Analytics Summary<a href="recruiter-edit.html"><img src="/images/edit_icon.png" alt=""/></a></span>
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
                                            <ul className="navbar-nav mr-auto">
                                                
                                                <li className="nav-item dropdown">
                                                    <a className="nav-link bk dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Analytics
                                                    </a>
                                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                        <a className="dropdown-item" href="#">Action</a>
                                                        <div className="dropdown-divider"></div>
                                                        <a className="dropdown-item" href="#">Another action</a>
                                                        <div className="dropdown-divider"></div>
                                                        <a className="dropdown-item" href="#">Something else here</a>
                                                    </div>
                                                </li>
                                            </ul>
                                            </div>
                                            <div className="col-md-8">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="analytics_card">
                                                        <span className="job_category_icon"><img src="/images/cat_icon1.png" alt=""/></span>
                                                        <h5>Filled Positions</h5>
                                                        <p>( 1 open position )</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="analytics_card">
                                                        <span className="job_category_icon"><img src="/images/cat_icon2.png" alt=""/></span>
                                                        <h5>Days Open</h5>
                                                        <p>( 1 open position )</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="analytics_card">
                                                        <span className="job_category_icon"><img src="/images/cat_icon3.png" alt=""/></span>
                                                        <h5>Direct</h5>
                                                        <p>( 1 open position )</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="analytics_card">
                                                        <span className="job_category_icon"><img src="/images/cat_icon4.png" alt=""/></span>
                                                        <h5>Active Candidates</h5>
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
                                                            <h5>Total Candidates</h5>
                                                            <p>( 1 open position )</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="analytics_card">
                                                            <span className="job_category_icon"><img src="/images/cat_icon6.png" alt=""/></span>
                                                            <h5>Broadcast</h5>
                                                            <p>( 1 open position )</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="pie_chart_space d-flex justify-content-between">
                                            <div className="pie_chart_box">
                                                <h6>Interview Ratio</h6>
                                                <img src="/images/pie_chart_1.jpg" alt=""/>
                                            </div>
                                            <div className="pie_chart_box">
                                                <h6>Offer Ratio</h6>
                                                <img src="/images/pie_chart_2.jpg" alt=""/>
                                            </div>
                                        </div>
                                        <div className="pie_chart_space d-flex justify-content-between">
                                            <div className="pie_chart_box">
                                                <h6>Acceptance Rate</h6>
                                                <img src="/images/pie_chart_3.jpg" alt=""/>
                                            </div>
                                            <div className="pie_chart_box">
                                                <h6>Source of Hire</h6>
                                                <img src="/images/pie_chart_4.jpg" alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
                {/* { accordion['Resume'] && <div className="card">
                    <div className="card-header" id="headingFive">
                        <h2 className="mb-0">
                        <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={()=>{addSection(3)}}>
                            <span>Requisitions <img src="/images/edit_icon.png" alt=""/></span>
                            <span className="fa-stack">
                                <i className={Active.includes(3)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                            </span>
                        </button>
                        </h2>
                    </div>
                    <div id="collapseFive" className={Active.includes(3)?"collapse show":"collapse"} aria-labelledby="headingFive" data-parent="#accordion">
                        {data.get_requisitions && data.get_requisitions.length != 0 ?   
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
                </div> } */}
                { accordion['Resume'] && <div className="card">
                    <div className="card-header" id="headingThree">
                        <h2 className="mb-0">
                            <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={()=>{addSection(4)}}>
                                <span>Resume <img src="/images/edit_icon.png" alt=""/></span>
                                <span className="fa-stack">
                                    <i className={Active.includes(4)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                                </span>
                            </button>
                        </h2>
                    </div>
                    <div id="collapseThree" className={Active.includes(4)?"collapse show":"collapse"} aria-labelledby="headingThree" data-parent="#accordion">
                        <div className="card-body p-0">
                            
                            <div className="col-md-12">
                                <div className="file_docmt">
                                <ul>
                                    {
                                        data.files && data.files.map((fileKey) => {
                                                
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
                </div> }
                { accordion['Permissions'] && <div className="card">
                    <div className="card-header" id="headingfour">
                        <h2 className="mb-0">
                        <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" onClick={()=>{addSection(5)}}>
                            <span>Permissions <a href="recruiter-edit.html"><img src="./images/edit_icon.png" alt=""/></a></span>
                            <span className="fa-stack">
                                <i className={Active.includes(5)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                            </span>
                        </button>
                        </h2>
                    </div>
                    <div id="collapsefour" className={Active.includes(5)?"collapse show":"collapse"} aria-labelledby="headingfour" data-parent="#accordion" >
                        <div className="card-body">
                            <div className="recruiter_check d-flex gry13">
                                {data?.get_permissions && data?.get_permissions.map((rolePerm) => (
                                    <span><img src="/images/tk-g.png" alt=""/>{rolePerm?.get_permission_detail?.name}</span>
                                ))
                            
                            }
                                {/* <span><img src="/images/tk-g.png" alt=""/>Limited Access  </span>
                                <span><img src="/images/tk-gy.png" alt=""/>Read  </span>
                                <span><img src="/images/tk-gy.png" alt=""/>Contribute  </span>
                                <span><img src="/images/tk-gy.png" alt=""/>Edit  </span> */}
                        
                            </div>
                        </div>
                    </div>
                </div> }
                { accordion['Notes'] && <div className="card">
                    <div className="card-header" id="headingFive">
                        <h2 className="mb-0">
                            <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" onClick={()=>{addSection(6)}}>
                                <span>Notes <img src="/images/edit_icon.png" alt=""/></span>
                                <span className="fa-stack">
                                    <i className={Active.includes(6)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                                </span>
                            </button>
                        </h2>
                    </div>
                    <div id="collapseFive" class={Active.includes(6)?"collapse show":"collapse"} aria-labelledby="headingFive" data-parent="#accordion">
                        <div className="card-body p-0">
                            
                            <div className="notes_tab_card">
                               {data.id !=='' && <Notes data_id ={data.id} model_id={2}/>} 
                            </div>
                        </div>
                    </div>
                </div> }
            </div>
        </div>
    )
}

const mapStateToProps = store => ({
    data: store.rootReducer.adminRecruiter.data,
    isFetching: store.rootReducer.adminRecruiter.isFetching,
    user: store.rootReducer.auth.user,
  });
  
  const mapDispatchToProps = dispatch => bindActionCreators({
    initAdminRecruiter,
    getRecruiters,
  }, dispatch);
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Review);

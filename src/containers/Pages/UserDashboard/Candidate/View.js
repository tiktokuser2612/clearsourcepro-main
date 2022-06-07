import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    initAdminCandidate,
    getCandidate,
  } from 'store/actions/adminCandidate';
  import LoadingIndicator from 'components/Common/LoadingIndicator';
  import Notes from '../Notes';

  
const View = ({
    isFetching,
    data,
    getCandidate,
    initAdminCandidate,
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

        //Candidate View accordion Permission
        const [accordion, setAccordion] = useState({
        'Details': false,
        'Resume': false,
        'Reqs': false,
        'Classes': false,
        'Notes': false,
        });
    

    useEffect(() => {
        initAdminCandidate();
        getCandidate(id);

        //get candidate permission from user key resposne 
        let acc = {...accordion}
        user.candidate_permissions.filter(p => p.status == 1 && p.permission == 'R').map(p=>{
            acc[p.details.permission] = true
        })
        setAccordion(acc)

    }, [getCandidate, initAdminCandidate, id]);

    return (
        <div className="health_insurance_main">
            <LoadingIndicator isLoading={isFetching} />
            <div className="d-md-flex justify-content-between align-items-center">
                <h1>Review Candidate Record <Link to={`/admin/candidates/edit/${id}`}> <i className="fa fa-edit"></i></Link></h1>
                
            </div>                    
            <div className="d-md-flex justify-content-between">
                <div className="health_card elite_health">
                    <label>First Name</label>
                    <p>{data.firstname}</p>
                    
                </div>
                <div className="health_card elite_health">
                    <label>Last Name</label>
                    <p>{data.lastname}</p>
                </div>
                <div className="health_card elite_health">
                    <label>User Name</label>
                    <p>{data.username}</p>
                </div>
                
            </div>
            <div className="d-md-flex justify-content-between">
                <div className="health_card elite_health">
                    <label>Primary Phone</label>
                    <p>{data.phone}</p>
                </div>
                <div className="health_card elite_health">
                    <label>Email</label>
                    <p>{data.email}</p>
                </div>
                <div className="health_card elite_health">
                    <label>Address</label>
                    <p>{data.address}</p>
                </div>
                
            </div>
            <div className="d-md-flex justify-content-between">
                <div className="health_card elite_health">
                    <label>City</label>
                    <p>{data.city}</p>
                </div>
                <div className="health_card elite_health">
                    <label>State / Region</label>
                    <p>{data.state}</p> 
                </div>
                <div className="health_card elite_health">
                    <label>Zip / Postal Code</label>
                    <p>{data.zip}</p>
                </div>
                
            </div>
            <div className="d-md-flex justify-content-between">
                
                <div className="health_card elite_health"></div>
                <div className="health_card elite_health"></div>
            </div>

            <div id="accordion" className="record_accordion mt-4">
                { 
                    accordion['Resume'] && 
                        <div className="card">
                                <div className="card-header" id="headingfive">
                                    <h2 className="mb-0">
                                    <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={()=>{addSection(1)}}>
                                        <span>Resume <img src="/images/edit_icon.png" alt=""/></span>
                                        <span className="fa-stack">
                                            <i className={Active.includes(1)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                                        </span>
                                    </button>
                                    </h2>
                                </div>
                                <div id="collapsefive" className={Active.includes(1)?"collapse show":"collapse"} aria-labelledby="headingfive" data-parent="#accordion">
                                    <div className="card-body p-0">
                                    
                                        <div className="col-md-12 mt-4">
                                            <div className="file_docmt">
                                                <h5>Submitted Resume : </h5>
                                            {    
                                                data?.files?.length > 0 && data.files.map((file, key) => {
                                                    return (
                                                        <ul>
                                                        <li key={key}>
                                                            <p>{file.filename}</p>
                                                        </li>
                                                        </ul>
                                                    );                          
                                                })  
                                            }  
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                        </div>
                }
                { accordion['Reqs'] && 
                    <div className="card">
                    <div className="card-header" id="headingOne">
                        <h2 className="mb-0">
                        <button className="d-flex align-items-center justify-content-between btn btn-link" onClick={()=>{addSection(2)}}>
                            <span>Requisitions - Qualified <img src="/images/edit_icon.png" alt=""/> </span> 
                            <span className="fa-stack fa-sm">
                                <i className={Active.includes(2)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                            </span>
                        </button>
                        </h2>
                    </div>
                    <div id="collapseOne" className={Active.includes(2)?"collapse show":"collapse"} aria-labelledby="headingOne" data-parent="#accordion" >
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
                                                <th>Requisition Title</th>
                                                <th>Info</th>
                                                <th>Recruiter</th>
                                                <th>Status</th>
                                                <th>Updated</th>
                                                <th>Candidates</th>
                                            </tr>
                                            
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td><i className="fa fa-plus-circle" aria-hidden="true"></i> Elite Health Insurance,  Clearwater, FL</td>
                                                <td>Info</td>                                           
                                                <td>Rani Jones</td>
                                                <td>Open</td>
                                                <td>10/22/2021</td>
                                                <td>21 Active</td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>
                                </div> 
                            </div>
                        </div>
                    </div>
                
                    </div> 
                }
                { 
                    accordion['Classes'] &&
                        <div className="card">
                            <div className="card-header" id="headingTwo">
                                <h2 className="mb-0">
                                <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={()=>{addSection(3)}}>
                                    <span>Classes <img src="/images/edit_icon.png" alt=""/></span>
                                    <span className="fa-stack">
                                        <i className={Active.includes(3)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                                    </span>
                                </button>
                                </h2>
                            </div>
                            <div id="collapseTwo" className={Active.includes(3)?"collapse show":"collapse"} aria-labelledby="headingTwo" data-parent="#accordion">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="calendar_area">
                                                <div className="calendar">
                                                    <header>
                                                        <h2>April 2021</h2>
                                                        <a className="btn-prev" href="#"><img src="/images/left_arrow_3.png" alt=""/></a>
                                                        <a className="btn-next" href="#"><img src="/images/right_arrow_3.png" alt=""/></a>
                                                    </header>
                                                
                                                    <table className="w-100">
                                                        <thead>
                                                            <tr>
                                                    
                                                            <td>MON</td>
                                                            <td>TUE</td>
                                                            <td>WED</td>
                                                            <td>THU</td>
                                                            <td>FRI</td>
                                                            <td>SAT</td>
                                                            <td>SUN</td>
                                                    
                                                            </tr>
                                                        </thead>
                                                
                                                        <tbody>
                                                    
                                                            <tr>
                                                            <td className="prev-month"><span>26</span> </td>
                                                            <td className="prev-month"><span>27</span></td>
                                                            <td className="prev-month"><span>28</span></td>
                                                            <td className="prev-month"><span>29</span></td>
                                                            <td className="prev-month"><span>30</span></td>
                                                            <td className="prev-month"><span>31</span></td>
                                                            <td><span>1</span></td>
                                                            </tr>
                                                            <tr>
                                                            <td><span>2</span></td>
                                                            <td><span>3</span></td>
                                                            <td><span>4</span></td>
                                                            <td><span>5</span></td>
                                                            <td><span>6</span></td>
                                                            <td><span>7</span></td>
                                                            <td><span>8</span></td>
                                                            </tr>
                                                            <tr>
                                                            <td><span>9</span></td>
                                                            <td className="event"><span>10</span></td>
                                                            <td><span>11</span></td>
                                                            <td><span>12</span></td>
                                                            <td><span>13</span></td>
                                                            <td><span>14</span></td>
                                                            <td><span>15</span></td>
                                                            </tr>
                                                            <tr>
                                                            <td><span>16</span></td>
                                                            <td><span>17</span></td>
                                                            <td><span>18</span></td>
                                                            <td><span>19</span></td>
                                                            <td><span>20</span></td>
                                                            <td className="event"><span>21</span></td>
                                                            <td><span>22</span></td>
                                                            </tr>
                                                    
                                                            <tr>
                                                            <td className="current-day event mob_d_none"><span><a href="complimentary_meeting_step1.html">23</a></span></td>
                                                            <td className="current-day event dsk_d_none"><span><a href="complimentary_meeting_step1-mob.html">23</a></span></td>
                                                            <td><span>24</span></td>
                                                            <td><span>25</span></td>
                                                            <td><span>26</span></td>
                                                            <td><span>27</span></td>
                                                            <td><span>28</span></td>
                                                            <td><span>29</span></td>
                                                            </tr>
                                                            <tr>
                                                            <td><span>30</span></td>
                                                            <td className="next-month"><span>1</span></td>
                                                            <td className="next-month"><span>2</span></td>
                                                            <td className="next-month"><span>3</span></td>
                                                            <td className="next-month"><span>4</span></td>
                                                            <td className="next-month"><span>5</span></td>
                                                            <td className="next-month"><span>6</span></td>
                                                            </tr>
                                                    
                                                        </tbody>
                                                    </table>
                                                </div> 
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="my_coustomer_table m-0">
                                                <div className="table-responsive w_bg">
                                                    <table className="table table-condensed mb-0" style={{borderCollapse:"collapse"}}>
                                                        <thead>
                                                            <tr>
                                                                <th>Candidates</th>
                                                                <th>Current </th>
                                                                <th>Interview </th>
                                                                
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Britney Williamsss</td>
                                                                <td>Phone Interview</td>
                                                                <td>10/04/2021</td>                                 
                                                            </tr>
                                                            <tr>
                                                                <td>Britney Williamsss</td>
                                                                    <td>Phone Interview</td>
                                                                    <td>10/04/2021</td>                                 
                                                                </tr>
                                                                
                                                                <tr>
                                                                <td>Britney Williamsss</td>
                                                                    <td>Phone Interview</td>
                                                                    <td>10/04/2021</td>                                 
                                                                </tr>
                                                                
                                                        </tbody>
                                                    </table>
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                }

                { accordion['Notes'] && 
                    <div className="card">
                        <div className="card-header" id="headingThree">
                            <h2 className="mb-0">
                            <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" onClick={()=>{addSection(4)}}>
                                <span>Notes <img src="/images/edit_icon.png" alt=""/></span>
                                <span className="fa-stack">
                                    <i className={Active.includes(4)?"fa fa-minus":"fa fa-plus"} aria-hidden="true"></i>
                                </span>
                            </button>
                            </h2>
                        </div>
                        <div id="collapseThree" className={Active.includes(4)?"collapse show":"collapse"} aria-labelledby="headingThree" data-parent="#accordion">
                            <div className="card-body p-0">
                                <div className="notes_tab_card">
                                    
                                    { data.id !='' && <Notes data_id={data.id} model_id={2}/>} 

                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

const mapStateToProps = store => ({
    data: store.rootReducer.adminCandidate.data,
    isFetching: store.rootReducer.adminCandidate.isFetching,
    user: store.rootReducer.auth.user,
  });
  
  const mapDispatchToProps = dispatch => bindActionCreators({
    initAdminCandidate,
    getCandidate
  }, dispatch);
  
  
export default connect(mapStateToProps, mapDispatchToProps)(View);
import React, { useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import {
    initClientRecord,
    getClientRecord,
  } from 'store/actions/clientRecord';
import LowerPart from './LowerPart'
  
const View = ({
    isFetching,
    data,
    getClientRecord,
    initClientRecord,
  }) => {
    const { id } = useParams();
  
    useEffect(() => {
      initClientRecord();
      getClientRecord(id);
    }, [getClientRecord, initClientRecord, id]);

    return (
        <div>
            <div className="health_insurance_main">
                <h1>Client Record Review <Link to={`/admin/client_records/edit/${data.id}`}>Edit</Link></h1>
                <div className="d-md-flex justify-content-between">
                    <div className="health_card">
                        <label>Current Status</label>
                        <p className="green">{data.current_status  ? "open" : "close"}</p>
                    </div>
                    <div className="health_card">
                        <label>Locations (s)</label>
                        <p>{data.location}</p>
                    </div>
                    <div className="health_card">
                        <label>Posting Type</label>
                        <p>{data.posting_type}</p>
                    </div>
                    <div className="health_card">
                        <label>Created</label>
                        <p>{moment(data.updated_at).format("MM/DD/YYYY")}</p>
                    </div>
                    <div className="health_card text-right mt-0">
                        <button className="button" type="button">Add Candidate</button> <br/>
                        <button className="button green" type="button">Help for this Page</button>
                    </div>
                </div>
                <div className="d-md-flex">
                    <div className="health_card">
                        <label>Role Title</label>
                        <p>{data.role_title}</p>
                    </div>
                    <div className="health_card">
                        <label>Salary Range</label>
                        <p>{data.salary}</p>
                    </div>
                    <div className="health_card">
                        <label>Base Pay</label>
                        <p>{data.base_pay}</p>
                    </div>
                </div>
                <div className="d-md-flex">
                    <div className="health_card">
                        <label>Hour / Schedule</label>
                        <p>{data.hour}</p>
                    </div>
                    <div className="health_card">
                        <label>Bonus Plan</label>
                        <p>{data.bonus_plan}</p>
                    </div>
                </div>
                <div>
                    <div className="health_card w-100">
                        <label>Role Summary for Ideal Candidate.</label>
                        <p className="body_text">
                            {data.role_summary_of_candidate}
                        </p>
                    </div>
                    <div className="header_top_section my-3">
                        <ul className="header_top_links">
                            <li className="m-0"><a href="#">Select Hires</a></li>
                            <li><a href="#">Close</a></li>
                            <li><a href="#">Hold</a></li>
                            <li><a href="#">Copy</a></li>
                        </ul>
                    </div>
                    <button className="apply_btn" type="button">View all candidates</button>
                </div>
            </div>
            <LowerPart activityData={data.activity}/>
        </div>
    )
}

const mapStateToProps = store => ({
    data: store.rootReducer.clientRecord.data,
    isFetching: store.rootReducer.clientRecord.isFetching,
  });
  
  const mapDispatchToProps = dispatch => bindActionCreators({
    initClientRecord,
    getClientRecord
  }, dispatch);
  
  
export default connect(mapStateToProps, mapDispatchToProps)(View);

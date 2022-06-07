import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { getActivitiesList } from 'store/actions/activity';
//Common folder files
import LoadingIndicator from 'components/Common/LoadingIndicator';

const ListView = ({
    activityData, isFetchingList
  }) => {
    
    return (
        <>
            <LoadingIndicator isLoading={isFetchingList} />
            <div className="tab-pane fade active show" id="nav-Activity" role="tabpanel" aria-labelledby="nav-Activity-tab">
                <div className="activity_tab_info">
                    <h4 className="d-flex justify-content-between">Activities <small></small></h4>
                    
                    {
                            !!activityData && activityData.map((activity) => {
                                
                                return(
                                    <> 
                                        <div class="activity_tab_card d-flex justify-content-between">
                                            <p>{activity.message}</p>
                                            {/* <p><span> {new Date (activity.updated_at).getMonth() +1+"/"+ new Date(activity.updated_at).getDate() +"/"+ new Date(activity.updated_at).getFullYear() + "  " + new Date(activity.updated_at).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) } </span></p> */}
                                            <p><span> {moment(activity.updated_at).format("MM/DD/YYYY hh:mm A")} </span></p>
                                        </div>      
                                    </>
                                )
                            
                            })
                        
                    }
                    
                </div>
            </div>
        </>
    )
}

const mapStateToProps = store => ({
    data: store.rootReducer.clientRecord.data,
    items: store.rootReducer.clientRecord.items.map(item => ({ ...item, key: item.id })),
    pagination: store.rootReducer.clientRecord.pagination,
    isFetchingList: store.rootReducer.clientRecord.isFetchingList,
    
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getActivitiesList
}, dispatch);
   
export default connect(mapStateToProps, mapDispatchToProps)(ListView);


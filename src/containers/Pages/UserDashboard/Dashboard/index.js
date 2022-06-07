import React , { useEffect, useState } from 'react'
import Links from './Links'
import Metric from './Metric'
import Interview from './Interview'
import Calender from './Calender'
import MyOpenRequisitions from './MyOpenRequisitions'
import AllOpenRequisitions from './AllOpenRequisitions'
import Billboard from './Billboard'
import MyTasks from './MyTasks'
import DashboardSetting from './DashboardSetting'
import RequisitionsRefresh from './RequisitionsRefresh'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Index = ({user}) => {
    const [enabled, setEnabled] = useState([])
    const [accordion , setAccordion] = useState([
        {
            title: 'Analytics Summary',
            component: <Links/>,
            hrEnable: false
        },
        {
            title: 'Metrics',
            component: <Metric/>,
            hrEnable: false
        },
        {
            title: 'Req Calendar & Candidates',
            component: <><RequisitionsRefresh/><Calender/><Interview/></>,
            hrEnable: true  
        },
        {
            title: 'My Open Reqs',
            component: <MyOpenRequisitions/>,
            hrEnable: false
        },
        {
            title: 'All Open Reqs',
            component: <AllOpenRequisitions/>,
            hrEnable: true,
        },
        {
            title: 'Billboard',
            component: <Billboard/>,
            hrEnable: false,
        },
        {
            title: 'My Tasks',
            component: <MyTasks/>,
            hrEnable: false,
        },
    ]);

    
    useEffect(()=>{
        let acc = []
        user?.dashboard_permissions?.filter(p => p.status == 1).map((p) => {
            acc.push(p.details.permission)
        })
        setEnabled(acc)
    },[user])

    return (
        <div>
            <div className="analytics_tab_card mt-4">
                <DashboardSetting/> 
                <div className='row'>
                {
                    accordion.filter(acc => enabled.includes(acc.title)).map((acc,index) => {
                        return <>
                            {acc.component}
                            {
                                acc.hrEnable == true ? <div className='col-12'><hr/></div> : null
                            }
                        </>
                    })
                }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = store => ({
    user : store.rootReducer.auth.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);



export default connect(mapStateToProps, mapDispatchToProps)(Index);
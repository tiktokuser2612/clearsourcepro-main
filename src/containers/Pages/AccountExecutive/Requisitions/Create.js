import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import api from 'constants/api';
import notifier from 'utils/notifier';
import RequisitionCreateView from 'components/Common/RequisitionCreateView'

import { initAccountExecutiveRequisition, editAccountExecutiveRequisition, postAccountExecutiveRequisition} from 'store/actions/accountExecutiveRequisition';


const AccountExecutiveRequisitionCreate = ({ data, initAccountExecutiveRequisition, editAccountExecutiveRequisition, postAccountExecutiveRequisition,user}) => {

    
    const [errors, setErrors] = useState({});
    const [clientList,setClientList] = useState([]);
    const [recruitersList, setRecruitersList] = useState([]);
    const [slectedRecruiterId, setSlectedRecruiterId] = useState(null);
   


    useEffect(() => {
        initAccountExecutiveRequisition();

        api.admin.requisitions.getListClients()
        .then(res => {
            console.log('response', res.data);
            setClientList(res.data);
            
        })
        .catch(err => {
            
            notifier.error('get Client failed!');
            setErrors(err.errors || {});
        });
        // Get Recruiter list
        api.public.getRecruitersList()
            .then(res => {
                setRecruitersList(res.recruitersList);
                setSlectedRecruiterId(user.id);
            })
            .catch(err => {
                notifier.error('get Recruiters failed!');
                setErrors(err.errors || {});
        });

    }, [initAccountExecutiveRequisition]);

   
    
  return (
   
    <div>
    <div className="health_insurance_main">
        <div className="health_card w-100 d-flex justify-content-between mt-0">
            <h1>Create Requisition</h1>
        </div>
        <RequisitionCreateView
        data={data}
        editRecruiterRequisition={editAccountExecutiveRequisition}
        postRecruiterRequisition={postAccountExecutiveRequisition}
        clientList={clientList}
        user={user}
        recruitersList={recruitersList}
        initRecruiterRequisition={initAccountExecutiveRequisition}
        errors={errors}
        slectedRecruiterId={slectedRecruiterId}
        setErrors={setErrors}
        />
    </div>
  </div>
      
  );
};


const mapStateToProps = store => ({
  data: store.rootReducer.accountExecutiveRequisition.data,
  user: store.rootReducer.auth.user,
  
});

const mapDispatchToProps = dispatch => bindActionCreators({
  initAccountExecutiveRequisition,
  editAccountExecutiveRequisition,
  postAccountExecutiveRequisition

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccountExecutiveRequisitionCreate);


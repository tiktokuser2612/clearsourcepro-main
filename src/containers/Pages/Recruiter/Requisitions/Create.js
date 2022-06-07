import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import api from 'constants/api';
import notifier from 'utils/notifier';
import RequisitionCreateView from 'components/Common/RequisitionCreateView'

import { initRecruiterRequisition, editRecruiterRequisition, postRecruiterRequisition} from 'store/actions/recruiterRequisition';


const RecruiterRequisitionCreate = ({ data, initRecruiterRequisition, editRecruiterRequisition, postRecruiterRequisition,user}) => {

    
    const [errors, setErrors] = useState({});
    const [clientList,setClientList] = useState([]);
    const [recruitersList, setRecruitersList] = useState([]);
    const [slectedRecruiterId, setSlectedRecruiterId] = useState(null);
   


    useEffect(() => {
        initRecruiterRequisition();

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

    }, [initRecruiterRequisition]);

   
    
  return (
   
    <div>
    <div className="health_insurance_main">
        <div className="health_card w-100 d-flex justify-content-between mt-0">
            <h1>Create Requisition</h1>
        </div>
        <RequisitionCreateView
        data={data}
        editRecruiterRequisition={editRecruiterRequisition}
        postRecruiterRequisition={postRecruiterRequisition}
        clientList={clientList}
        user={user}
        recruitersList={recruitersList}
        initRecruiterRequisition={initRecruiterRequisition}
        errors={errors}
        slectedRecruiterId={slectedRecruiterId}
        setErrors={setErrors}
        />
    </div>
  </div>
      
  );
};


const mapStateToProps = store => ({
  data: store.rootReducer.recruiterRequisition.data,
  user: store.rootReducer.auth.user,
  
});

const mapDispatchToProps = dispatch => bindActionCreators({
  initRecruiterRequisition,
  editRecruiterRequisition,
  postRecruiterRequisition

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RecruiterRequisitionCreate);


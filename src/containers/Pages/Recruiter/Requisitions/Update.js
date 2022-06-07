import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import api from 'constants/api';
import notifier from 'utils/notifier';
import RequisitionEditView from 'components/Common/RequisitionEditView'

import { initRecruiterRequisition, getRecruiterRequisition, editRecruiterRequisition, putRecruiterRequisition} from 'store/actions/recruiterRequisition';


const RecruiterRequisitionUpdate = ({ data, initRecruiterRequisition, getRecruiterRequisition, editRecruiterRequisition, isFetching, putRecruiterRequisition , edited, user}) => {

    
    const { id } = useParams();
    const [errors, setErrors] = useState({});
    const [clientList,setClientList] = useState([]);
    const [recruitersList, setRecruitersList] = useState([]);


    useEffect(() => {
        initRecruiterRequisition();
        getRecruiterRequisition(id);

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
            })
            .catch(err => {
                notifier.error('get Recruiters failed!');
                setErrors(err.errors || {});
        });

    }, [initRecruiterRequisition, getRecruiterRequisition, id]);

   
    
  return (
   
    <div>
    <div className="health_insurance_main">
        <div className="health_card w-100 d-flex justify-content-between mt-0">
            <h1>Update Requisition</h1>
        </div>
        <RequisitionEditView
        data={data}
        editRecruiterRequisition={editRecruiterRequisition}
        putRecruiterRequisition={putRecruiterRequisition}
        clientList={clientList}
        recruitersList={recruitersList}
        id={id}
        getRecruiterRequisition={getRecruiterRequisition}
        initRecruiterRequisition={initRecruiterRequisition}
        errors={errors}
        isFetching={isFetching}
        user={user}
        setErrors={setErrors}
        />
    </div>
  </div>
      
  );
};

const mapStateToProps = store => ({
  user: store.rootReducer.auth.user,
  data: store.rootReducer.recruiterRequisition.data,
  isFetching: store.rootReducer.recruiterRequisition.isFetching,
  isPutting: store.rootReducer.recruiterRequisition.isPutting,
  edited: store.rootReducer.recruiterRequisition.edited,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  initRecruiterRequisition,
  getRecruiterRequisition,
  editRecruiterRequisition,
  putRecruiterRequisition

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RecruiterRequisitionUpdate);


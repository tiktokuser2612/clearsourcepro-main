import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import api from 'constants/api';
import notifier from 'utils/notifier';
import RequisitionEditView from 'components/Common/RequisitionEditView'

import { initAccountExecutiveRequisition, getAccountExecutiveRequisition, editAccountExecutiveRequisition, putAccountExecutiveRequisition} from 'store/actions/accountExecutiveRequisition';


const AccountExecutiveRequisitionUpdate = ({ data, initAccountExecutiveRequisition, getAccountExecutiveRequisition, editAccountExecutiveRequisition, isFetching, putAccountExecutiveRequisition , edited, user}) => {

    
    const { id } = useParams();
    const [errors, setErrors] = useState({});
    const [clientList,setClientList] = useState([]);
    const [recruitersList, setRecruitersList] = useState([]);


    useEffect(() => {
        initAccountExecutiveRequisition();
        getAccountExecutiveRequisition(id);

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

    }, [initAccountExecutiveRequisition, getAccountExecutiveRequisition, id]);

   
    
  return (
   
    <div>
    <div className="health_insurance_main">
        <div className="health_card w-100 d-flex justify-content-between mt-0">
            <h1>Update Requisition</h1>
        </div>
        <RequisitionEditView
        data={data}
        editRecruiterRequisition={editAccountExecutiveRequisition}
        putRecruiterRequisition={putAccountExecutiveRequisition}
        clientList={clientList}
        recruitersList={recruitersList}
        id={id}
        getRecruiterRequisition={getAccountExecutiveRequisition}
        initRecruiterRequisition={initAccountExecutiveRequisition}
        errors={errors}
        user={user}
        isFetching={isFetching}
        setErrors={setErrors}
        />
    </div>
  </div>
      
  );
};

const mapStateToProps = store => ({
  user: store.rootReducer.auth.user,
  data: store.rootReducer.accountExecutiveRequisition.data,
  isFetching: store.rootReducer.accountExecutiveRequisition.isFetching,
  isPutting: store.rootReducer.accountExecutiveRequisition.isPutting,
  edited: store.rootReducer.accountExecutiveRequisition.edited,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  initAccountExecutiveRequisition,
  getAccountExecutiveRequisition,
  editAccountExecutiveRequisition,
  putAccountExecutiveRequisition

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccountExecutiveRequisitionUpdate);


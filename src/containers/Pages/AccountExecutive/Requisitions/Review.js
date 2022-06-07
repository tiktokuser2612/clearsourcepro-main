import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RequisitionReview from 'components/Common/RequisitionReview'


import { initAccountExecutiveRequisition, getAccountExecutiveRequisition} from 'store/actions/accountExecutiveRequisition';


const AccountExecutiveRequisitionReview = ({ data, getAccountExecutiveRequisition,isFetching, initAccountExecutiveRequisition}) => {

    
    const { id } = useParams();
    useEffect(() => {
      initAccountExecutiveRequisition();
      getAccountExecutiveRequisition(id);
  }, [initAccountExecutiveRequisition, id]);
    
  return (
   
    <div>
    <div className="health_insurance_main">
        <div className="health_card w-100 d-flex justify-content-between mt-0">
            <h1>Review Account Executive Requisition</h1>
        </div>
        <RequisitionReview 
        data={data}
        isFetching={isFetching}
        />
    </div>
  </div>
      
  );
};
const mapStateToProps = store => ({
  data: store.rootReducer.accountExecutiveRequisition.data,
  isFetching: store.rootReducer.accountExecutiveRequisition.isFetching,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  initAccountExecutiveRequisition,
  getAccountExecutiveRequisition,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccountExecutiveRequisitionReview);


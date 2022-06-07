import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RequisitionReview from 'components/Common/RequisitionReview'


import { initRecruiterRequisition, getRecruiterRequisition} from 'store/actions/recruiterRequisition';


const RecruiterRequisitionReview = ({ data, getRecruiterRequisition,isFetching, initRecruiterRequisition}) => {

    
    const { id } = useParams();
    useEffect(() => {
      initRecruiterRequisition();
      getRecruiterRequisition(id);
  }, [initRecruiterRequisition, initRecruiterRequisition, id]);
    
  return (
   
    <div>
    <div className="health_insurance_main">
        <div className="health_card w-100 d-flex justify-content-between mt-0">
            <h1>Review Requisition</h1>
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
  data: store.rootReducer.recruiterRequisition.data,
  isFetching: store.rootReducer.recruiterRequisition.isFetching,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  initRecruiterRequisition,
  getRecruiterRequisition,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RecruiterRequisitionReview);


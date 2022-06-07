import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RequisitionTableList from 'components/Common/RequisitionTableList'
import ActivationErrorPop from 'components/Modals/ActivationErrorPop'
import notifier from 'utils/notifier';
import { getListAccountExecutiveRequisitions} from 'store/actions/accountExecutiveRequisition';
  
const AccountExecutiveRequisitionsList = ({ user, getListAccountExecutiveRequisitions, pagination, items, isFetchingList}) => {
  const [close, setClose] = useState(false);
  let textInput = React.createRef();
  
    useEffect(() => {
      getListAccountExecutiveRequisitions();
  }, [getListAccountExecutiveRequisitions]);

  const closemodel = () => {
    setClose(true);
}

const searchPost = async (e) => {
  pagination.filters = {
      search: textInput.current.value
  }
  await getListAccountExecutiveRequisitions(pagination.current, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc)
  .then(ser => {
      notifier.success("success");
  })  
  .catch(err => {
      notifier.error('Failed');
  });
};

  return (
   
    <div>
    <div className="health_insurance_main">
        <div className="health_card w-100 d-flex justify-content-between mt-0">
            <h1>Requisitions</h1>
            <Link to="/account_executive/requisitions/create" className="text-decoration-none"><i className="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;Create New</Link>
        </div>
        <div className="coustomer_filter d-sm-flex justify-content-between align-items-center mt-3">
          <div className="d-flex align-items-center">
            <div className="table_header d-md-flex align-items-center px-0">
              <div className="d-sm-flex align-items-center client_list_filter">	
                <div className="search_box">
                  <input placeholder="Search" type="text" ref={textInput}/>
                  <img src="/images/search_icon_2.png" alt="" onClick={searchPost}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RequisitionTableList 
        items={items}
        getListRecruiterRequisitions={getListAccountExecutiveRequisitions}
        pagination={pagination}
        isFetchingList={isFetchingList}
        user={user}
        // getListRecruiterRequisitions={getListRecruiterRequisitions}
        
        />
        <ActivationErrorPop user={user} closemodel={closemodel} close={close}/>
    </div>
  </div>
      
  );
};
const mapStateToProps = store => ({
  user: store.rootReducer.auth.user,
  items: store.rootReducer.accountExecutiveRequisition.items.map(item => ({ ...item, key: item.id })),
  pagination: store.rootReducer.accountExecutiveRequisition.pagination,
  isFetchingList: store.rootReducer.accountExecutiveRequisition.isFetchingList,
  // isPuttingPassword: store.rootReducer.auth.isPuttingPassword,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  // changePassword,
  getListAccountExecutiveRequisitions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccountExecutiveRequisitionsList);


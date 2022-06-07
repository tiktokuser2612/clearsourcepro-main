import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DeleteComman from 'components/Modals/DeleteComman';
import CategoryFilter from 'components/DropDown/Category'
import ProductTypeFilter from 'components/DropDown/ProductType';

import { getClientRecordList , deleteClientRecord } from 'store/actions/clientRecord';

import notifier from 'utils/notifier';

//Common folder files
import LoadingIndicator from 'components/Common/LoadingIndicator';
import SortTh from 'components/Common/SortTh';
import Pagenation from 'components/Common/Pagenation';
import { DEFAULT_PAGINATION_PER_PAGE } from 'constants/index.js';

// const onOkay = props => {
//     if(!props.show){
//         return null
//     }
// }


const columnList = [
    {
      id: 0,
      label: 'Current Status',
      sort: 'current_status',
      isSorting: true,
    },
    {
      id: 1,
      label: 'Location',
      sort: 'location',
      isSorting: true,
    },
    {
      id: 2,
      label: 'Posting Type',
      sort: 'posting_type',
      isSorting: true,
    },
    {
      id: 3,
      label: 'Role Title',
      sort: 'role_title',
      isSorting: true,
    },
    {
      id: 4,
      label: 'Salary Range',
      sort: 'salary',
      isSorting: true, 
    },  
    
    {
        id: 5,
        label: 'Base Pay',  
        sort: 'base_pay',
        isSorting: false, 
    },

    {
        id: 6,
        label: 'Hour / Schedule',  
        sort: 'hour',
        isSorting: false, 
    },
    {
        id: 7,
        label: 'Bonus Plan',  
        sort: 'bonus_plan',
        isSorting: false, 
    },
  ];

const ListView = ({
    getClientRecordList, pagination, items, data, isFetchingList , deleteClientRecord
  }) => {
    
    const pageLength = Math.ceil(pagination.total / pagination.pageSize);
    const [sortColumn, setSortColumn] = useState('');
    const [asc, setAsc] = useState(true);
    const [deleteTarget, setDeleteTarget] = useState(-1);
    let textInput = React.createRef();
    
    useEffect(() => {
      getClientRecordList();
      //getListAdminForms(1, DEFAULT_PAGINATION_PER_PAGE)
    }, [getClientRecordList,/* getListAdminForms*/]);

    useEffect(() => {
      getClientRecordList(1, DEFAULT_PAGINATION_PER_PAGE, { archived: 'active', status: 'all' });
    }, [getClientRecordList]);
  
    const previousPage = () => {
      if (pagination.current > 1) {
        getClientRecordList(pagination.current - 1, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
      }
    };
  
    const nextPage = () => {
      if (pagination.current < pageLength) {
        getClientRecordList(pagination.current + 1, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
      }
    };
  
    const onClick = (current) => {
      getClientRecordList(current, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
    };
  
    const tableSort = (sorter) => {
      if (sortColumn === sorter) {
        setAsc(!asc);
      } else {
        setSortColumn(sorter);
        setAsc(true);
      }
      getClientRecordList(pagination.current, pagination.pageSize, pagination.filters, sorter, asc);
    };

    const handleDelete = () => {
      if (deleteTarget === -1) {
        return;
      }
  
      deleteClientRecord(deleteTarget)
        .then(res => {
          notifier.success('Delete case successful!');
  
          getClientRecordList();
        })
        .catch(err => {
          notifier.error('Can not delete case');
        });
  
      setDeleteTarget(-1);
    };
  
    const searchPost = async (e) => {
      pagination.filters = {
          search: textInput.current.value
      }
      await getClientRecordList(pagination.current, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc)
      .then(ser => {
        console.log("dsfdsfdsf",ser);
        notifier.success("success");
      })
      .catch(err => {
          notifier.error('Failed');
      });
    };

    return (
      <div className="health_insurance_main">
        <div className="tab-content">
            <div className="health_card w-100 d-flex justify-content-between mt-0">
                <h1>Client Record List</h1>
                <Link to='/admin/client_records/create' className="text-decoration-none" ><i className="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;Create New</Link>
            </div>
            <div className="coustomer_filter d-sm-flex justify-content-between align-items-center mt-3">
                <div className="d-flex align-items-center">
                    <div className="table_header d-md-flex align-items-center px-0">
                        <div className="d-sm-flex align-items-center client_list_filter">	
                            <div className="search_box">
                            <input placeholder="Search" type="text" ref={textInput}/>
                                <img src="/images/search_icon_2.png" alt="" onClick={searchPost}/>
                            </div>
                            <div className="ml-3 mb-0">
                                <CategoryFilter/>
                            </div>

                            <div className="ml-3 mb-0">
                                    <ProductTypeFilter/>
                            </div>
                            
                        </div>
                    </div>
                </div>
                
                    <p className="m-0">1 to {items.length}</p>
                
            </div>

            <div className="my_coustomer_table">
              <LoadingIndicator isLoading={isFetchingList} />
        
                <div className="table-responsive w_bg">
                    <table className="table table-condensed mb-0" style={{ borderCollapse: 'collapse' }}>
                        <thead>
                        <tr>
                          <th className="text-center"><input type="checkbox"/></th>
                            {
                                columnList.map((col) => (
                                    <SortTh
                                        key={col.id}
                                        label={col.label}
                                        sort={col.sort}
                                        tableSort={tableSort}
                                        sortColumn={sortColumn}
                                        asc={asc}
                                        isSorting={col.isSorting}
                                    />    
                                ))
                            }
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                              items.length ? !!items && items.map((client_record) => {
                                  console.log("client_record::",client_record);
                                    let className = 'accordion-toggle text-secondary';
                    
                                    return (
                                        <tr key={client_record.key || client_record.id}
                                            className={className}
                                        >
                                          <td className="text-center"><input type="checkbox"/></td>
                                            <td>{client_record.current_status}</td>
                                            <td>{client_record.location}</td>
                                            <td>{client_record.posting_type}</td>
                                            <td>{client_record.role_title}</td>
                                            <td>{client_record.salary}</td>
                                            <td>{client_record.base_pay}</td>
                                            <td>{client_record.hour}</td>
                                            <td>{client_record.bonus_plan}</td>
                                            {/* <td className="edit_icon"></td> */}
                                            <td className="edit_icon">      
                                                <Link to={`/admin/client_records/view/${client_record.id}`}><i className="fa fa-eye" aria-hidden="true" data-toggle="modal" data-target="#review_user_pop"></i> </Link>                                     
                                                <Link to={`/admin/client_records/edit/${client_record.id}`}><i className="fa fa-pencil-square-o" aria-hidden="true" data-toggle="modal" data-target="#text_pop"></i></Link>
                                                <Link to="#"><i className="fa fa-trash-o" aria-hidden="true" data-toggle="modal" onClick={() => setDeleteTarget(client_record.id)}  data-target="#remove"></i></Link>
                                                <DeleteComman onOkay={handleDelete}   text="client_record" />
                                            </td>
                                        </tr>
                                    );
                                }) : null
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
              items.length == 0 &&
              <div className='text-center py-5'>
                  <h1>No Requisition Found!</h1>
                  <Link 
                      to="/admin/client_records/create" 
                      className="text-decoration-none">
                      <i className="fa fa-plus-circle" aria-hidden="true"></i>
                      &nbsp;&nbsp;Create New
                  </Link>
              </div>
          }
  
            <Pagenation
            onClick={onClick}
            previousPage={previousPage}
            nextPage={nextPage}
            pageLength={pageLength}
            currentPage={pagination.current}
            />
  
        </div>
      </div>
    );
};

const mapStateToProps = store => ({
    data: store.rootReducer.clientRecord.data,
    items: store.rootReducer.clientRecord.items.map(item => ({ ...item, key: item.id })),
    pagination: store.rootReducer.clientRecord.pagination,
    isFetchingList: store.rootReducer.clientRecord.isFetchingList,
    
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getClientRecordList,
    deleteClientRecord
}, dispatch);
   
export default connect(mapStateToProps, mapDispatchToProps)(ListView);





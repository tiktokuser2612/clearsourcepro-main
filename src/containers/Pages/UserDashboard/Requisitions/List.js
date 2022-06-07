import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import DeleteComman from 'components/Modals/DeleteComman';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { getListAdminRequisitions , deleteRequisition } from 'store/actions/adminRequisition';
import notifier from 'utils/notifier';
//Common folder files
import LoadingIndicator from 'components/Common/LoadingIndicator';
import SortTh from 'components/Common/SortTh';
import Pagenation from 'components/Common/Pagenation';
import RequisitionSelectBox from 'components/DropDown/Category';
import RequisitionFilter from 'components/DropDown/ProductType';
import './../css/style.css';

const columnList = [
    {
        id: 0,
        label: 'Requisition Title',
        sort: 'title',
        isSorting: true,
    },
    {
        id: 1,
        label: 'Info',
        sort: 'info',
        isSorting: false,
    },
    {
        id: 2,
        label: 'Recruiter',
        sort: 'recruiter_id',
        isSorting: true,
    },
    {
        id: 3,
        label: 'Status',
        sort: 'status',
        isSorting: false,
    },
    {
        id: 4,
        label: 'Updated',
        sort: 'updated_at',
        isSorting: true, 
    },
    
    {
        id: 5,
        label: 'Candidates',
        sort: 'candidates',
        isSorting: false, 
    },
];

const List = ({
    getListAdminRequisitions, pagination, items, data, isFetchingList , deleteRequisition
  }) => {
    
    const pageLength = Math.ceil(pagination.total / pagination.pageSize);
    const [sortColumn, setSortColumn] = useState('');
    const [asc, setAsc] = useState(true);
    const [deleteTarget, setDeleteTarget] = useState(-1);
    let textInput = React.createRef();

    useEffect(() => {
        getListAdminRequisitions();
    }, [getListAdminRequisitions,/* getListAdminForms*/]);
  
    const previousPage = () => {
      if (pagination.current > 1) {
        getListAdminRequisitions(pagination.current - 1, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
      }
    };
  
    const nextPage = () => {
      if (pagination.current < pageLength) {
        getListAdminRequisitions(pagination.current + 1, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
      }
    };
  
    const onClick = (current) => {
        getListAdminRequisitions(current, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
    };
  
    const tableSort = (sorter) => {
      if (sortColumn === sorter) {
        setAsc(!asc);
      } else {
        setSortColumn(sorter);
        setAsc(true);
      }
      getListAdminRequisitions(pagination.current, pagination.pageSize, pagination.filters, sorter, asc);
    };

    const handleDelete = () => {

        if (deleteTarget === -1) {
            return;
        }
    
        deleteRequisition(deleteTarget)
            .then(res => {
                notifier.success('Delete requisition successful!');
        
                getListAdminRequisitions();
            })
            .catch(err => {
                console.log(err);
                notifier.error('Can not delete requisition');
            });
    
        setDeleteTarget(-1);
    };

    const searchPost = async (e) => {
        pagination.filters = {
            search: textInput.current.value
        }
        console.log(pagination.filters);
        await getListAdminRequisitions(pagination.current, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc)
        .then(ser => {
            notifier.success("success");
        })
        .catch(err => {
            notifier.error('Status Change Failed');
        });
    };
  
    return (
        <div className="health_insurance_main">
            <div className="health_card w-100 d-flex justify-content-between mt-0">
                <h1>Requisitions</h1>
                <Link to="/admin/requisitions/create" className="text-decoration-none"><i className="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;Create New</Link>
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
                                <RequisitionSelectBox/>
                            </div>
                                
                            <div className="ml-3 mb-0">
                                <RequisitionFilter/>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="m-0">1 to {items.length}</p>
            </div>
            <div className="h-100 requisitions_list my_coustomer_table">
                <div className="table-responsive w_bg">
                    <LoadingIndicator isLoading={isFetchingList} /> 
                    <table className="table table-condensed mb-0" style={{borderCollapse:"collapse"}}>
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
                                items.length ? !!items && items.map((requisition) => {
                                    let className = 'accordion-toggle text-secondary';
                        
                                    return (
                                        <tr
                                            key={requisition.key || requisition.id}
                                            className={className}
                                        >
                                            <td className="text-center"><input type="checkbox"/></td>
                                            <td><i className="fa fa-plus-circle requi" aria-hidden="true"></i>{requisition.title}</td>
                                            <td>Info</td>
                                            <td>{requisition?.get_recruiter?.firstname}</td>
                                            <td>Open</td>
                                            <td>  {moment(requisition.updated_at).format("MM/DD/YYYY")}  
                                            </td>
                                            <td>{requisition.get_candidate_jobs.length} Active</td>
                                            <td className="edit_icon">      
                                                <Link to={`/admin/requisitions/view/${requisition.id}`}><i className="fa fa-eye" aria-hidden="true" data-toggle="modal" data-target="#review_user_pop"></i> </Link>                                     
                                                <Link to={`/admin/requisitions/edit/${requisition.id}`}><i className="fa fa-pencil-square-o" aria-hidden="true" data-toggle="modal" data-target="#text_pop"></i></Link>
                                                <Link to="#"><i className="fa fa-trash-o" aria-hidden="true" data-toggle="modal" onClick={() => setDeleteTarget(requisition.id)}  data-target="#remove"></i></Link>
                                                <DeleteComman onOkay={handleDelete} text="requisitions" />
                                            </td>
                                        </tr>
                                    );
                                }) :null
                            }
                        </tbody>
                    </table>
                </div> 
                {
                    items.length == 0 &&
                    <div className='text-center py-5'>
                        <h1>No Requisition Found!</h1>
                        <Link 
                            to="/admin/requisitions/create" 
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
    )
}

const mapStateToProps = store => ({
    data: store.rootReducer.adminRequisition.data,
    items: store.rootReducer.adminRequisition.items.map(item => ({ ...item, key: item.id })),
    pagination: store.rootReducer.adminRequisition.pagination,
    isFetchingList: store.rootReducer.adminRequisition.isFetchingLi
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getListAdminRequisitions,
    deleteRequisition
}, dispatch);
   
export default connect(mapStateToProps, mapDispatchToProps)(List);

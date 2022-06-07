import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import DeleteComman from 'components/Modals/DeleteComman';
import CategoryFilter from 'components/DropDown/Category'
import ProductTypeFilter from 'components/DropDown/ProductType';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getListAdminCandidates , deleteCandidate } from 'store/actions/adminCandidate';
import notifier from 'utils/notifier';
import './../css/style.css';



//Common folder files
import LoadingIndicator from 'components/Common/LoadingIndicator';
import SortTh from 'components/Common/SortTh';
import Pagenation from 'components/Common/Pagenation';



const columnList = [
    {
      id: 0,
      label: 'User Name',
      sort: 'username',
      isSorting: true,
    },
    {
      id: 1,
      label: 'Name',
      sort: 'firstname',
      isSorting: true,
    },
    {
      id: 2,
      label: 'Phone',
      sort: 'phone',
      isSorting: true,
    },
    {
      id: 3,
      label: 'Email',
      sort: 'email',
      isSorting: true,
    },
    {
      id: 4,
      label: 'Last Updated',
      sort: 'updated_at',
      isSorting: true, 
    },
    
    {
        id: 5,
        label: 'Status',
        sort: 'address',
        isSorting: false, 
    },
];



const List = ({
    getListAdminCandidates, pagination, items, data, isFetchingList , deleteCandidate
  }) => {
    
    const pageLength = Math.ceil(pagination.total / pagination.pageSize);
    const [sortColumn, setSortColumn] = useState('');
    const [asc, setAsc] = useState(true);
    const [deleteTarget, setDeleteTarget] = useState(-1);
    let textInput = React.createRef();
    
    useEffect(() => {
        getListAdminCandidates();
      //getListAdminForms(1, DEFAULT_PAGINATION_PER_PAGE)
    }, [getListAdminCandidates,/* getListAdminForms*/]);
  
    const previousPage = () => {
      if (pagination.current > 1) {
        getListAdminCandidates(pagination.current - 1, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
      }
    };
  
    const nextPage = () => {
      if (pagination.current < pageLength) {
        getListAdminCandidates(pagination.current + 1, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
      }
    };
  
    const onClick = (current) => {
        getListAdminCandidates(current, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
    };
  
    const tableSort = (sorter) => {
      if (sortColumn === sorter) {
        setAsc(!asc);
      } else {
        setSortColumn(sorter);
        setAsc(true);
      }
      getListAdminCandidates(pagination.current, pagination.pageSize, pagination.filters, sorter, asc);
    };

    const handleDelete = () => {

    };

    const searchPost = async (e) => {
        pagination.filters = {
            search: textInput.current.value
        }
        await getListAdminCandidates(pagination.current, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc)
        .then(ser => {
            console.log("ser",ser);
            notifier.success("success");
        })  
        .catch(err => {
            notifier.error('Status Change Failed');
        });
    };

    return (
        <div className="health_insurance_main">
            <div className="health_card w-100 d-flex justify-content-between mt-0">
                <h1>Candidates</h1>
                <Link to="candidates/create" className="text-decoration-none"><i className="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;Create New</Link>
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
                            <div className="filter_section m-0 ml-3">
                                <button className="filter_btn" type="button">Filter</button>
                            </div>
                            <h6 className="advs_flrt" id="show">Advanced Filter</h6>
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
                                !!items && items.map((candidate) => {
                                    let className = 'accordion-toggle text-secondary';
                    
                                    return (
                                        <tr
                                            key={candidate.key || candidate.id}
                                            className={className}
                                        >
                                          <td className="text-center"><input type="checkbox"/></td>
                                            <td><img src="/images/user_thumb.png" alt="" data-toggle="modal" data-target="#review_user_pop"/>{candidate.username}</td>
                                            <td>{candidate.firstname}</td>
                                            <td>{candidate.phone}</td>
                                            <td>{candidate.email}</td>
                                            <td>{
                                                new Date(candidate.updated_at).getMonth()+1 +"/"+ new Date(candidate.updated_at).getDate() +"/"+ new Date(candidate.updated_at).getFullYear() }
                                            </td>
                                            <td>{candidate.status == 1 ? <span style={{color:'green'}}>Active</span>: <span style={{color:'red'}}>Inactive</span>}</td>
                                            <td className="edit_icon">      
                                                <Link to={`/admin/candidates/view/${candidate.id}`}><i className="fa fa-eye" aria-hidden="true" data-toggle="modal" data-target="#review_user_pop"></i> </Link>                                     
                                                <Link to={`/admin/candidates/edit/${candidate.id}`}><i className="fa fa-pencil-square-o" aria-hidden="true" data-toggle="modal" data-target="#text_pop"></i></Link>
                                                <Link to="#"><i className="fa fa-trash-o" aria-hidden="true" data-toggle="modal" onClick={() => setDeleteTarget(candidate.id)}  data-target="#remove"></i></Link>
                                                <DeleteComman onOkay={handleDelete}   text="candidate" />
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                           
                        </tbody>
                    </table>
                </div> 
                {
                    items.length == 0 &&
                    <div className='text-center py-5'>
                        <h1>No Requisition Found!</h1>
                        <Link 
                            to="/admin/candidates/create" 
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
    data: store.rootReducer.adminCandidate.data,
    items: store.rootReducer.adminCandidate.items.map(item => ({ ...item, key: item.id })),
    pagination: store.rootReducer.adminCandidate.pagination,
    isFetchingList: store.rootReducer.adminCandidate.isFetchingList,
    
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getListAdminCandidates,
    deleteCandidate
}, dispatch);


   
export default connect(mapStateToProps, mapDispatchToProps)(List);
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import DeleteComman from 'components/Modals/DeleteComman';
import CategoryFilter from 'components/DropDown/Category'
import ProductTypeFilter from 'components/DropDown/ProductType';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getListClientDashboardRecuriters , deleteClientRecruiter } from 'store/actions/clientDashboardRecruiter';
import notifier from 'utils/notifier';

//Common folder files
import LoadingIndicator from 'components/Common/LoadingIndicator';
import SortTh from 'components/Common/SortTh';
import Pagenation from 'components/Common/Pagenation';


const columnList = [
    {
      id: 0,
      label: 'User Name',
      sort: 'user_name',
      isSorting: true,
    },
    {
      id: 1,
      label: 'Name',
      sort: 'name',
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
        isSorting: true, 
    },
];

const Index = ({
    getListClientDashboardRecuriters, pagination, items, isFetchingList , deleteClientRecruiter , user
  }) => {
    
    const pageLength = Math.ceil(pagination.total / pagination.pageSize);
    const [sortColumn, setSortColumn] = useState('');
    const [asc, setAsc] = useState(true);
    const [deleteTarget, setDeleteTarget] = useState(-1);
    
    useEffect(() => {
        companyRecruistersListFunction(user?.get_client_company?.id)
    }, []);

    const companyRecruistersListFunction = async (company_id) => {
        pagination.filters = {
            company_id: company_id
        }

        await getListClientDashboardRecuriters(pagination.current, pagination.pageSize, pagination.filters, pagination.sorter, pagination.dsc)
        .then(ser => {
            notifier.success("success");
        })
        .catch(err => {
            notifier.error('Recruiters Listing Fail');
        });
    }
  
    const previousPage = () => {
      if (pagination.current > 1) {
        getListClientDashboardRecuriters(pagination.current - 1, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
      }
    };
  
    const nextPage = () => {
      if (pagination.current < pageLength) {
        getListClientDashboardRecuriters(pagination.current + 1, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
      }
    };
  
    const onClick = (current) => {
        getListClientDashboardRecuriters(current, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
    };
  
    const tableSort = (sorter) => {
      if (sortColumn === sorter) {
        setAsc(!asc);
      } else {
        setSortColumn(sorter);
        setAsc(true);
      }
      getListClientDashboardRecuriters(pagination.current, pagination.pageSize, pagination.filters, sorter, asc);
    };
  
    const handleDelete = () => {

        if (deleteTarget === -1) {
            return;
        }
    
        deleteClientRecruiter(deleteTarget)
            .then(res => {
                notifier.success('Delete Company recruiter successful!');  
                pagination.filters = {
                    company_id: user?.get_client_company.id
                }
                getListClientDashboardRecuriters(pagination.current, pagination.pageSize, pagination.filters, pagination.sorter, pagination.dsc);
            })
            .catch(err => {
                notifier.error('Can not delete case');
            });
    
        setDeleteTarget(-1);
    };

    console.log('items', items)
    
    return (
        <div className="health_insurance_main">
            <div className="health_card w-100 d-flex justify-content-between mt-0">
                <h1>Recruiters</h1>
                <Link to="/client/recruiter/create" className="text-decoration-none"><i className="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;Create New</Link>
            </div>
            <div className="coustomer_filter d-sm-flex justify-content-between align-items-center mt-3">
                <div className="d-flex align-items-center">
                    <div className="table_header d-md-flex align-items-center px-0">
                        <div className="d-sm-flex align-items-center client_list_filter">	
                            <div className="search_box">
                                <input placeholder="Search" type="text"/>
                                    <img src="/images/search_icon_2.png" alt=""/>
                            </div>
                            <div className="filter_box ml-3 mb-0">
                                <CategoryFilter/>
                            </div>
                            <div className="filter_box ml-3 mb-0">
                                <ProductTypeFilter/>
                            </div>
                        </div>
                    </div>
                </div>
                
                    <p className="m-0 pageDiv">1 to {items.length}</p>
                
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
                                !!items && items.map((recruiter) => {
                                    let className = 'accordion-toggle text-secondary';
                    
                                    return (
                                        <tr
                                            key={recruiter.key || recruiter.id}
                                            className={className}
                                        >
                                          <td className="text-center"><input type="checkbox"/></td>
                                            <td>{recruiter.username}</td>
                                            <td>{recruiter.firstname}</td>
                                            <td>{recruiter.phone}</td>
                                            <td>{recruiter.email}</td>
                                            <td>
                                                {new Date(recruiter.updated_at).getMonth()+1 +"/"+ new Date(recruiter.updated_at).getDate() +"/"+ new Date(recruiter.updated_at).getFullYear() }
                                            </td>
                                            <td>Status</td>
                                            {/* <td className="edit_icon"></td> */}
                                            <td className="edit_icon">      
                                                <Link to={`/client/recruiter/view/${recruiter.id}`}><i className="fa fa-eye" aria-hidden="true" data-toggle="modal" data-target="#review_user_pop"></i> </Link>                                     
                                                <Link to={`/client/recruiter/edit/${recruiter.id}`}><i className="fa fa-pencil-square-o" aria-hidden="true" data-toggle="modal" data-target="#text_pop"></i></Link>
                                                <Link to="#"><i className="fa fa-trash-o" aria-hidden="true" data-toggle="modal" onClick={() => setDeleteTarget(recruiter.id)}  data-target="#remove"></i></Link>
                                                <DeleteComman onOkay={handleDelete}   text="recruiter" />
                                            </td>
                                        </tr>
                                    );
                                })
                            }


                        </tbody>
                    </table>
                </div> 

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
    data: store.rootReducer.clientDashboardRecruiter.data,
    items: store.rootReducer.clientDashboardRecruiter.items.map(item => ({ ...item, key: item.id })),
    pagination: store.rootReducer.clientDashboardRecruiter.pagination,
    isFetchingList: store.rootReducer.clientDashboardRecruiter.isFetchingList,
    user: store.rootReducer.auth.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getListClientDashboardRecuriters,
    deleteClientRecruiter
}, dispatch);


   
export default connect(mapStateToProps, mapDispatchToProps)(Index);

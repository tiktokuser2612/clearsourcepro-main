import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DeleteComman from 'components/Modals/DeleteComman';
import CategoryFilter from 'components/DropDown/Category'
import ProductTypeFilter from 'components/DropDown/ProductType';
import { getListAdminClients , deleteClient } from 'store/actions/AdminClientUsers';
import notifier from 'utils/notifier';

//Common folder files
import LoadingIndicator from 'components/Common/LoadingIndicator';
import SortTh from 'components/Common/SortTh';
import Pagenation from 'components/Common/Pagenation';
import { DEFAULT_PAGINATION_PER_PAGE } from 'constants/index.js';

const columnList = [
    {
      id: 0,
      label: 'Company Name',
      sort: 'company_name',
      isSorting: true,
    },
    {
      id: 1,
      label: 'Company Type',
      sort: 'company_type',
      isSorting: true,
    },
    {
      id: 2,
      label: 'Primary Contact Name',
      sort: 'name',
      isSorting: false,
    },
    {
      id: 3,
      label: 'Phone',
      sort: 'phone',
      isSorting: false,
    },
    {
      id: 4,
      label: 'Email',
      sort: 'email',
      isSorting: true, 
    },
    
    {
        id: 5,
        label: 'Address',
        sort: 'address',
        isSorting: false, 
    },
  ];

const ListView = ({
    getListAdminClients, pagination, items, data, isFetchingList , deleteClient
  }) => {
    
    const pageLength = Math.ceil(pagination.total / pagination.pageSize);
    const [sortColumn, setSortColumn] = useState('');
    const [asc, setAsc] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(-1);
    let textInput = React.createRef();
    
    useEffect(() => {
      getListAdminClients();
      pagination.asc = false;
    }, [getListAdminClients]);

    useEffect(() => {
      getListAdminClients(1, DEFAULT_PAGINATION_PER_PAGE, { archived: 'active', status: 'all' });
    }, [getListAdminClients]);
  
    const previousPage = () => {
      if (pagination.current > 1) {
        getListAdminClients(pagination.current - 1, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
      }
    };
  
    const nextPage = () => {
      if (pagination.current < pageLength) {
        getListAdminClients(pagination.current + 1, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
      }
    };
  
    const onClick = (current) => {
      getListAdminClients(current, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
    };
  
    const tableSort = (sorter) => {
      if (sortColumn === sorter) {
        setAsc(!asc);
      } else {
        setSortColumn(sorter);
        setAsc(false);
      }
      getListAdminClients(pagination.current, pagination.pageSize, pagination.filters, sorter, asc);
    };

    const handleDelete = () => {
      if (deleteTarget === -1) {
        return;
      }
  
      deleteClient(deleteTarget)
        .then(res => {
          notifier.success('Delete case successful!');
  
          getListAdminClients();
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
      await getListAdminClients(pagination.current, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc)
          .then(ser => {
              notifier.success("success");
          })
          .catch(err => {
              notifier.error('Status Change Failed');
          });
    };

    return (
      <div className="health_insurance_main">
        <div className="tab-content">
            <div className="health_card w-100 d-flex justify-content-between mt-0">
              <h1>Client List</h1>
              <Link to='/admin/clients/create' className="text-decoration-none" ><i className="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;Create New</Link>
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
                          items.length ? !!items && items.map((client) => {
                            let className = 'accordion-toggle text-secondary';
                            return (
                                <tr
                                  key={client.key || client.id}
                                  className={className}
                                >
                                  <td className="text-center"><input type="checkbox"/></td>
                                    <td>{client.company_name}</td>
                                    <td>{client.company_type}</td>
                                    <td>{client.primary_contact_name}</td>
                                    <td>{client.phone}</td>
                                    <td>{client.email}</td>
                                    <td>{client.address}</td>
                                    <td className="edit_icon">      
                                      <Link to={`/admin/clients/view/${client.id}`}><i className="fa fa-eye" aria-hidden="true" data-toggle="modal" data-target="#review_user_pop"></i> </Link>                                     
                                      <Link to={`/admin/clients/edit/${client.id}`}><i className="fa fa-pencil-square-o" aria-hidden="true" data-toggle="modal" data-target="#text_pop"></i></Link>
                                      <Link to="#"><i className="fa fa-trash-o" aria-hidden="true" data-toggle="modal" onClick={() => setDeleteTarget(client.id)}  data-target="#remove"></i></Link>
                                      <DeleteComman onOkay={handleDelete}   text="client" />
                                    </td>
                                </tr>
                            );
                          }):null
                        }
                  </tbody>
                </table>
              </div>
            </div>
            {
              items.length == 0 &&
              <div className='text-center py-5'>
                  <h1>No Requiter Found!</h1>
                  <Link 
                      to="/admin/recruiters/create" 
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
    data: store.rootReducer.adminClientUsers.data,
    items: store.rootReducer.adminClientUsers.items.map(item => ({ ...item, key: item.id })),
    pagination: store.rootReducer.adminClientUsers.pagination,
    isFetchingList: store.rootReducer.adminClientUsers.isFetchingList,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getListAdminClients,
    deleteClient
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListView);





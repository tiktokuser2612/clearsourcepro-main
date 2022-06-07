import React, { useEffect , useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    getListClientHiringManagers,
    deleteHiringManager
} from 'store/actions/adminClientContact';
import notifier from 'utils/notifier';
import LoadingIndicator from 'components/Common/LoadingIndicator';
import SortTh from 'components/Common/SortTh';
import Pagenation from 'components/Common/Pagenation';
import DeleteComman from 'components/Modals/DeleteComman';


const columnList = [
    {
      id: 0,
      label: 'Name',
      sort: 'name',
      isSorting: true,
    },
    {
      id: 1,
      label: 'Company',
      sort: 'company',
      isSorting: true,
    },
    {
      id: 2,
      label: 'Title',
      sort: 'title',
      isSorting: true,
    },
    {
      id: 3,
      label: 'Phone',
      sort: 'phone',
      isSorting: true,
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



const HiringManagerList = ({
    isFetching,
    getListClientHiringManagers,
    pagination, items,
    setNewContact,
    setEditContact,
    setHiringManagerId,
    deleteHiringManager
  }) => {
    const { id } = useParams();
    
    const pageLength = Math.ceil(pagination.total / pagination.pageSize);
    const [sortColumn, setSortColumn] = useState('');
    const [asc, setAsc] = useState(true);
    const [deleteTarget, setDeleteTarget] = useState(-1);

    
    useEffect(() => {
        pagination.filters = {
            id: id
        }
        getListClientHiringManagers(pagination.current, pagination.pageSize, pagination.filters, pagination.sorter, pagination.dsc);
    }, [getListClientHiringManagers]);

    
    const previousPage = () => {
        if (pagination.current > 1) {
            getListClientHiringManagers(pagination.current - 1, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
        }
    };
  
    const nextPage = () => {
        if (pagination.current < pageLength) {
            getListClientHiringManagers(pagination.current + 1, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
        }
    };
  
    const onClick = (current) => {
        getListClientHiringManagers(current, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
    };
  
    const tableSort = (sorter) => {
        if (sortColumn === sorter) {
            setAsc(!asc);
        } else {
            setSortColumn(sorter);
            setAsc(true);
        }
        getListClientHiringManagers(pagination.current, pagination.pageSize, pagination.filters, sorter, asc);
    };

    const handleDelete = () => {

        if (deleteTarget === -1) {
            return;
        }
    
        deleteHiringManager(deleteTarget)
            .then(res => {
                notifier.success('Delete hiring Manager successful!');
                getListClientHiringManagers(1, 4 ,{"id" : id} , null, true);
            })
            .catch(err => {
                notifier.error('Can not delete case');
            });
    
        setDeleteTarget(-1);
    };

    const editHiringManagerMethod = (id) => {
    
        setNewContact(false);
        setEditContact(true);
        setHiringManagerId(id);
    }

    
    return (
        <>
            <LoadingIndicator isLoading={isFetching} />
            <div className="card-body px-0">
                {/* <div className="health_card w-100 d-flex justify-content-between mt-0">
                    <label>Contact List</label>
                    <a className="text-decoration-none" href="add_candidate.html"><i className="fa fa-upload" aria-hidden="true"></i>&nbsp;&nbsp;Upload Contact</a>
                </div> */}
                <div className="my_coustomer_table requisition_table">
                    <div className="table-responsive w_bg">
                        <table className="table table-condensed mb-0" style={{borderCollapse:"collapse"}}>
                            <thead>
                                <tr>
                                    
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
                                items.map(function(item, i){
                                    return (
                                        <tr>
                                            <td><i className="fa fa-plus-circle" aria-hidden="true"></i> {item.hiring_manager_name}</td>
                                            <td>{item.hiring_manager_name}</td>
                                            <td>{item.hiring_manager_title}</td>                                                
                                            <td>{item.hiring_manager_phone}</td>
                                            <td>{item.hiring_manager_email}</td>
                                            <td>{item.contact_info_address}</td>
                                            <td className="edit_icon">      
                                                {/* <button  ><i className="fa fa-eye" aria-hidden="true" data-toggle="modal" data-target="#review_user_pop"></i></button>                                      */}
                                                {/* <button ><i className="fa fa-pencil-square-o" aria-hidden="true" data-toggle="modal" data-target="#text_pop"></i></button>  */}
                                                
                                                <a onClick={() => {editHiringManagerMethod(item.id)} }><i class="fa fa-pencil-square-o" aria-hidden="true" data-toggle="modal" data-target="#text_pop"></i></a>
                                                
                                                <Link to="#" ><i className="fa fa-trash-o" aria-hidden="true" data-toggle="modal" onClick={() => setDeleteTarget(item.id)}  data-target="#remove"></i></Link>
                                                <DeleteComman onOkay={handleDelete}   text="Hiring Manager" />
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                                
                            </tbody>
                        </table>
                    </div> 
                </div>

                <Pagenation
                    onClick={onClick}
                    previousPage={previousPage}
                    nextPage={nextPage}
                    pageLength={pageLength}
                    currentPage={pagination.current}
                />

            </div>    
        </>
    );
};


const mapStateToProps = store => ({
    data: store.rootReducer.adminClientContact.data,
    items: store.rootReducer.adminClientContact.items.map(item => ({ ...item, key: item.id })),
    pagination: store.rootReducer.adminClientContact.pagination,
    isFetching: store.rootReducer.adminClientContact.isFetching,
});
  
const mapDispatchToProps = dispatch => bindActionCreators({
    getListClientHiringManagers,
    deleteHiringManager
}, dispatch);
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(HiringManagerList);




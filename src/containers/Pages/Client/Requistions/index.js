import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import DeleteComman from 'components/Modals/DeleteComman';
import ActivationErrorPop from 'components/Modals/ActivationErrorPop';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getClientRequisitionList , deleteClientRequisition } from 'store/actions/clientRequisition';
import notifier from 'utils/notifier';



//Common folder files

import LoadingIndicator from 'components/Common/LoadingIndicator';
import SortTh from 'components/Common/SortTh';
import Pagenation from 'components/Common/Pagenation';

import RequisitionSelectBox from 'components/DropDown/Category';
import RequisitionFilter from 'components/DropDown/ProductType';


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
      sort: 'recruiter_name',
      isSorting: false,
    },
    {
      id: 3,
      label: 'Status',
      sort: 'status',
      isSorting: true,
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

const Index = ({
    getClientRequisitionList, pagination, items, data,user, isFetchingList , deleteClientRequisition
  }) => {

    const pageLength = Math.ceil(pagination.total / pagination.pageSize);
    const [sortColumn, setSortColumn] = useState('');
    const [asc, setAsc] = useState(true);
    const [deleteTarget, setDeleteTarget] = useState(-1);

    const [showInvitationPopUp, setShowInvitationPopUp] = useState(false);
    const [close, setClose] = useState(false);
    let textInput = React.createRef();

    useEffect(() => {
        
        companyRequisitionListFunction(user?.get_client_company?.id)
        user ?.jv_invitation_status != 'Accepted' ? setShowInvitationPopUp(true) : setShowInvitationPopUp(false); 
    }, []);
    
    const companyRequisitionListFunction = async (company_id) => {
        pagination.filters = {
            company_id: company_id
        }

        await getClientRequisitionList(pagination.current, pagination.pageSize, pagination.filters, pagination.sorter, pagination.dsc)
        .then(ser => {
            notifier.success("success");
        })
        .catch(err => {
            notifier.error('Requisition Listing Fail');
        });
    }

    const previousPage = () => {
      if (pagination.current > 1) {
        getClientRequisitionList(pagination.current - 1, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
      }
    };
  
    const nextPage = () => {
      if (pagination.current < pageLength) {
        getClientRequisitionList(pagination.current + 1, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
      }
    };
  
    const onClick = (current) => {
        getClientRequisitionList(current, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
    };
  
    const tableSort = (sorter) => {
      if (sortColumn === sorter) {
        setAsc(!asc);
      } else {
        setSortColumn(sorter);
        setAsc(true);
      }
      getClientRequisitionList(pagination.current, pagination.pageSize, pagination.filters, sorter, asc);
    };
  
    const closemodel = () => {
        setClose(true);
    }


    const handleDelete = () => {

        if (deleteTarget === -1) {
            return;
        }
    
        deleteClientRequisition(deleteTarget)
            .then(res => {
                notifier.success('Delete requisition successful!');
        
                getClientRequisitionList();
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
        await getClientRequisitionList(pagination.current, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc)
        .then(ser => {
            notifier.success("success");
        })  
        .catch(err => {
            notifier.error('Failed');
        });
    };


    return (
        
        <div className="health_insurance_main">
            
            <div className="health_card w-100 d-flex justify-content-between mt-0">
                <h1>Requisitions</h1>
                {
                    showInvitationPopUp ?  
                    <Link to={"/client/requisitions/create"} className="text-decoration-none" disabled="true"><i className="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;Create New</Link>
                    : 
                    <Link to={"/client/requisition/create"} className="text-decoration-none" ><i className="fa fa-plus-circle" arisa-hidden="true"></i>&nbsp;&nbsp;Create New</Link>
                }
                
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
                            {
                                showInvitationPopUp ?
                                <div>
                                  <ActivationErrorPop  user={user} closemodel={closemodel} close={close}/>  
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
                <p className="m-0">1 to {items.length}</p>
            </div>
           { !!items && items.length > 0 }
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
                                !!items && items.length > 0 ?
                                items.map((requisition) => {
                                    let className = 'accordion-toggle text-secondary';
                    
                                    return (
                                        <tr
                                            key={requisition.key || requisition.id}
                                            className={className}
                                        >
                                          <td className="text-center"><input type="checkbox"/></td>
                                            <td><i className="fa fa-plus-circle requi" aria-hidden="true"></i>{requisition.title}</td>
                                            <td>Info</td>
                                            <td>{requisition.get_recruiter.username}</td>
                                            <td>Open</td>
                                            <td>    
                                                {new Date(requisition.updated_at).getMonth()+1 +"/"+ new Date(requisition.updated_at).getDate() +"/"+ new Date(requisition.updated_at).getFullYear() }
                                            </td>
                                            <td>21 Active</td>
                                            {/* <td className="edit_icon"></td> */}
                                            <td className="edit_icon">      
                                                <Link to={`/client/requisition/view/${requisition.id}`}><i className="fa fa-eye" aria-hidden="true" data-toggle="modal" data-target="#review_user_pop"></i> </Link>                                     
                                                <Link to={`/client/requisition/edit/${requisition.id}`}><i className="fa fa-pencil-square-o" aria-hidden="true" data-toggle="modal" data-target="#text_pop"></i></Link>
                                                <Link to="#"><i className="fa fa-trash-o" aria-hidden="true" data-toggle="modal" onClick={() => setDeleteTarget(requisition.id)}  data-target="#remove"></i></Link>
                                                <DeleteComman onOkay={handleDelete} text="requisitions" />
                                            </td>
                                        </tr>
                                    );
                                }) :

                                <h3>Record not found</h3>
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
    data: store.rootReducer.clientRequisitions.data,
    user: store.rootReducer.auth.user,
    items: store.rootReducer.clientRequisitions.items.map(item => ({ ...item, key: item.id })),
    pagination: store.rootReducer.clientRequisitions.pagination,
    isFetchingList: store.rootReducer.clientRequisitions.isFetchingList,
    
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getClientRequisitionList,
    deleteClientRequisition
}, dispatch);


   
export default connect(mapStateToProps, mapDispatchToProps)(Index);

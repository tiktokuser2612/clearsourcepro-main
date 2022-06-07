import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';

//Common folder files
import DeleteComman from 'components/Modals/DeleteComman';
import SortTh from 'components/Common/SortTh';
import notifier from 'utils/notifier';
import Pagenation from 'components/Common/Pagenation';
import LoadingIndicator from 'components/Common/LoadingIndicator';

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

const RequisitionTableList = ({ getListRecruiterRequisitions, pagination, items, isFetchingList, user}) => {
    
    const pageLength = Math.ceil(pagination.total / pagination.pageSize);
    const [sortColumn, setSortColumn] = useState('');
    const [asc, setAsc] = useState(true);

    const previousPage = () => {
        if (pagination.current > 1) {
          getListRecruiterRequisitions(pagination.current - 1, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
        }
      };
    
      const nextPage = () => {
        if (pagination.current < pageLength) {
          getListRecruiterRequisitions(pagination.current + 1, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
        }
      };
    
      const onClick = (current) => {
        getListRecruiterRequisitions(current, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
      };
    
      const tableSort = (sorter) => {
        if (sortColumn === sorter) {
          setAsc(!asc);
        } else {
          setSortColumn(sorter);
          setAsc(true);
        }
        getListRecruiterRequisitions(pagination.current, pagination.pageSize, pagination.filters, sorter, asc);
      };
    
  
    return (
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
                                !!items && items.map((requisition) => {
                                    let className = 'accordion-toggle text-secondary';
                    
                                    return (
                                        <tr
                                            key={requisition.key || requisition.id}
                                            className={className}
                                        >
                                          <td class="text-center"><input type="checkbox"/></td>
                                            <td><i class="fa fa-plus-circle requi" aria-hidden="true"></i>{requisition.title}</td>
                                            <td>Info</td>
                                            <td>{requisition.get_recruiter.firstname}</td>
                                            <td>Open</td>
                                            <td>  {moment(requisition.updated_at).format("MM/DD/YYYY")}  
                                            </td>
                                            <td>{requisition.get_candidate_jobs.length} Active</td>
                                            <td class="edit_icon">  
                                             
                                                <Link to={`/${user?.user_role}/requisitions/view/${requisition.id}`}><i class="fa fa-eye" aria-hidden="true" data-toggle="modal" data-target="#review_user_pop"></i> </Link>                                     
                                                <Link to={`/${user?.user_role}/requisitions/edit/${requisition.id}`}><i class="fa fa-pencil-square-o" aria-hidden="true" data-toggle="modal" data-target="#text_pop"></i></Link>
                                                {/* <Link to="#"><i class="fa fa-trash-o" aria-hidden="true" data-toggle="modal" onClick={() => setDeleteTarget(requisition.id)}  data-target="#remove"></i></Link> */}
                                                {/* <DeleteComman onOkay={handleDelete} text="requisitions" /> */}
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
    )
}

   
export default RequisitionTableList;

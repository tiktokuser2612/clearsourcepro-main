import React, { useEffect, useState, Component } from 'react';
import { Link } from 'react-router-dom';
import DeleteComman from 'components/Modals/DeleteComman';
import CategoryFilter from 'components/DropDown/Category'
import ProductTypeFilter from 'components/DropDown/ProductType';
import { Select, Form, Input } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Joi from 'utils/validator';
import { getListUserRecuriters, deleteUser } from 'store/actions/adminUser';
import notifier from 'utils/notifier';
import './../css/style.css';
import api from 'constants/api';



//Common folder files
import LoadingIndicator from 'components/Common/LoadingIndicator';
import SortTh from 'components/Common/SortTh';
import Pagenation from 'components/Common/Pagenation';

const { Option } = Select;

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
        label: 'Email',
        sort: 'email',
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
        label: 'Role',
        sort: 'user_role',
        isSorting: true,
    },
    {
        id: 5,
        label: 'Last Updated',
        sort: 'updated_at',
        isSorting: true,
    },

    {
        id: 6,
        label: 'Status',
        sort: 'status',
        isSorting: true,
    },
    // {
    //     id: 7,
    //     label: 'Jobvite Invitaion Status',
    //     sort: 'jv_invitation_status',
    //     isSorting: true,
    // },
];





const List = ({
    getListUserRecuriters, pagination, items, data, isFetchingList, deleteUser , user
}) => {

    const pageLength = Math.ceil(pagination.total / pagination.pageSize);

    const [sortColumn, setSortColumn] = useState('');
    const [asc, setAsc] = useState(true);
    const [deleteTarget, setDeleteTarget] = useState(-1);
    const [sendLoginMail, setSendLoginMail] = useState(false);
    const [errors, setErrors] = useState({});
    let textInput = React.createRef();

    useEffect(() => {
        getListUserRecuriters();
        //getListAdminForms(1, DEFAULT_PAGINATION_PER_PAGE)
    }, [getListUserRecuriters,/* getListAdminForms*/]);

    const previousPage = () => {
        if (pagination.current > 1) {
            getListUserRecuriters(pagination.current - 1, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
        }
    };

    const nextPage = () => {
        if (pagination.current < pageLength) {
            getListUserRecuriters(pagination.current + 1, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
        }
    };

    const onClick = (current) => {
        getListUserRecuriters(current, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
    };

    const handleChange = async (key, val) => {
        let id = key;
        await api.admin.postActiveInactiveStatus.post(val.target.value, id)
            .then(res => {
                notifier.success(res.msg);
            })
            .catch(err => {
                notifier.error('Status Change Failed');
            });
    };

    const searchPost = async (e) => {
        pagination.filters = {
            search: textInput.current.value
        }

        await getListUserRecuriters(pagination.current, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc)
            .then(ser => {
                notifier.success("success");
            })
            .catch(err => {
                notifier.error('Status Change Failed');
            });
    };

    const tableSort = (sorter) => {
        if (sortColumn === sorter) {
            setAsc(!asc);
        } else {
            setSortColumn(sorter);
            setAsc(true);
        }
        getListUserRecuriters(pagination.current, pagination.pageSize, pagination.filters, sorter, asc);
    };

    const handleDelete = () => {
        if (deleteTarget === -1) {
            return;
        }

        deleteUser(deleteTarget)
            .then(res => {
                notifier.success('Delete user successful!');
                getListUserRecuriters();
            })
            .catch(err => {
                console.log(err)
                notifier.error('Can not delete case');
            });

        setDeleteTarget(-1);
    };

    const sendMail = (userId) => {
        api.admin.sendMail.mail({ 'user_id': userId })
            .then(res => {
                notifier.success('Send Mail successful!');
                setSendLoginMail(true);
            })
            .catch(err => {
                notifier.error('Mail not sent');
            });
    }

    return (
        <div>
            <div className="health_insurance_main">
                <div className="health_card w-100 d-flex justify-content-between mt-0">
                    <h1>Users List</h1>
                    <Link
                        to="/:user/users/create"
                        className="text-decoration-none"
                    >
                        <i className="fa fa-plus-circle" aria-hidden="true"></i>
                        &nbsp;&nbsp;Create New
                    </Link>
                </div>

                <div className="coustomer_filter d-sm-flex justify-content-between align-items-center mt-3">
                    <div className="d-flex align-items-center">
                        <div className="table_header d-md-flex align-items-center px-0">
                            <div className="d-sm-flex align-items-center client_list_filter">
                                <div className="search_box">
                                    <input placeholder="Search" type="text" name='filters' data-id='searchPost' ref={textInput} />
                                    <img src="/images/search_icon_2.png" alt="" onClick={searchPost} />
                                </div>
                                <div className="filter_box ml-3 mb-0">
                                    <CategoryFilter />
                                </div>
                                <div className="filter_box ml-3 mb-0">
                                    <ProductTypeFilter />
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="m-0 pageDiv">1 to {items.length}</p>
                </div>

                <div className="h-100 requisitions_list my_coustomer_table" id="new_user_table_padding">
                    <div className="table-responsive w_bg">
                        <table className="table table-condensed mb-0" style={{ borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    {/* <th className="text-center"><input type="checkbox" /></th> */}
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
                                    items.length
                                        ? !!items && items.map((user, index) => {
                                            let className = 'accordion-toggle text-secondary';
                                            return (
                                                <tr
                                                    key={index}
                                                    className={className}
                                                >
                                                    {/* <td className="text-center"><input type="checkbox" /></td> */}
                                                    <td>{user.username}</td>
                                                    <td>{user.firstname}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.phone}</td>
                                                    <td className='text-capitalize'>{user.user_role.replace("_", " ")}</td>
                                                    <td>
                                                        {new Date(user.updated_at).getMonth() + 1 + "/" + new Date(user.updated_at).getDate() + "/" + new Date(user.updated_at).getFullYear()}
                                                    </td>
                                                    <td>
                                                        <select defaultValue={user.status} name='user_satus' onChange={e => handleChange(user.id, e)} className="col-offset-4">
                                                            <option value="">Please Select</option>
                                                            <option value="0" >Inactive</option>
                                                            <option value="1" >Active</option>
                                                        </select>
                                                    </td>
                                                    {/* <td>{user.jv_invitation_status}</td> */}
                                                    <td className="edit_icon">
                                                        {
                                                            user.send_mail == 0
                                                                ? <div>
                                                                    <button className='user_send_mail' onClick={() => { sendMail(user.id) }}>
                                                                        Send Mail
                                                                    </button>
                                                                </div>
                                                                : <div>
                                                                    <button className='user_send_mail' onClick={() => { sendMail(user.id) }} >Resend Mail</button>
                                                                </div>
                                                        }
                                                        <Link to={`/`+ user.user_role +`/user/users/view/${user.id}`}><i className="fa fa-eye" aria-hidden="true" data-toggle="modal" data-target="#review_user_pop"></i> </Link>
                                                        <Link to={`/`+ user.user_role +`/users/edit/${user.id}`}><i className="fa fa-pencil-square-o" aria-hidden="true" data-toggle="modal" data-target="#text_pop"></i></Link>
                                                        <Link to="#"><i className="fa fa-trash-o" aria-hidden="true" data-toggle="modal" onClick={() => setDeleteTarget(user.id)} data-target="#remove"></i></Link>
                                                        <DeleteComman onOkay={handleDelete} text="user" />
                                                    </td>
                                                </tr>
                                            );
                                        })
                                        : null
                                }
                            </tbody>
                        </table>
                        {
                            items.length == 0 &&
                            <div className='text-center py-5'>
                                <h1>No User Found!</h1>
                                <Link
                                    to="/:user/users/create"
                                    className="text-decoration-none"
                                >
                                    <i className="fa fa-plus-circle" aria-hidden="true"></i>
                                    &nbsp;&nbsp;Create New
                                </Link>
                            </div>
                        }
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
        </div>
    )
}


const mapStateToProps = store => ({
    data: store.rootReducer.adminUser.data,
    user : store.rootReducer.auth.user,
    items: store.rootReducer.adminUser.items.map(item => ({ ...item, key: item.id })),
    pagination: store.rootReducer.adminUser.pagination,
    isFetchingList: store.rootReducer.adminUser.isFetchingList,

});

const mapDispatchToProps = dispatch => bindActionCreators({
    getListUserRecuriters,
    deleteUser
}, dispatch);



export default connect(mapStateToProps, mapDispatchToProps)(List);

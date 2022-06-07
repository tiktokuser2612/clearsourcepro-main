import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import { getJobSearchList } from 'store/actions/jobSearch';

//Common folder files
import LoadingIndicator from 'components/Common/LoadingIndicator';
import Pagenation from 'components/Common/Pagenation';
import MapContainer from './Map/index' 


const SearchJob = ({
    getJobSearchList,
    pagination, items, category, jobType,
    isFetchingList
  }) => {
    
    const pageLength = Math.ceil(pagination.total / pagination.pageSize);

    const [search, setSearch] = useState('');
    const [selectedType, setSelectedType] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        getJobSearchList(pagination.current, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
    }, [getJobSearchList]);
  
    const previousPage = () => {
      if (pagination.current > 1) {
        getJobSearchList(pagination.current - 1, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
      }
    };
  
    const nextPage = () => {
      if (pagination.current < pageLength) {
        getJobSearchList(pagination.current + 1, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
      }
    };
  
    const onClick = (current) => {
        getJobSearchList(current, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
    };

    const handleFilterChange = (key, value) => {
        pagination.filters[key] = value
        getJobSearchList(pagination.current, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
    }


    return (
    <>
        <h4 className="style_h4 mt-4">Search Jobs</h4>
        <div className="out_border_wrapper">
            <div className="filter_section my-0">
                <h4>Search Filters</h4>
                <div className="d-md-flex justify-content-between">
                    <div className="form-input-custom d-md-flex w-100">
                        <div className='mr-4'>   
                            <label style={{fontSize:'12px'}}>Search Keyword</label>                                 
                            <input 
                                className='form-control' placeholder="Search name" name="search" 
                                defaultValue={pagination.filters.search}
                                onChange={(e)=>{handleFilterChange('search',e.target.value)}}
                                type="text"
                            />
                        </div>
                        <div className='mr-4'>
                            <label style={{fontSize:'12px'}}>Job Category</label>
                            <select
                                defaultValue={pagination.filters.category}
                                className='form-control'
                                onChange={(e)=>{handleFilterChange('category',e.target.value)}}

                                >
                                <option value="null" >-- Select Job Category --</option>
                                {
                                    category.map((cat, index) => <option key={index} value={cat} >{cat}</option>)
                                }
                            </select>
                        </div>
                        <div>
                            <label style={{fontSize:'12px'}}>Job Type</label>
                            <select 
                                defaultValue={pagination.filters.type} 
                                className='form-control'
                                onChange={(e)=>{handleFilterChange('type',e.target.value)}}
                            >
                                <option value="null" >-- Select Job Type --</option>
                                {
                                    jobType.map((job, index) => <option key={index} value={job} >{job}</option>)
                                }
                            </select> 
                        </div>
                        {/* <button type='button' onClick={onClickSearch}>Search</button> */}
                    </div>
                </div>
            </div>
            <div className="filter_section mt-3 mb-0">
                <h4>Advanced Filters <small> | Choose location filters</small> </h4>
                
                <div className="d-md-flex justify-content-between align-items-end">
                    <div className="filter_form d-md-flex w-100">
                        <div>
                            <label>Sort By</label>
                            <div className="d-flex">
                                <label className="d-flex align-items-center mr-3"><input className="w-auto" type="radio"/> &nbsp; Distance</label>
                                <label className="d-flex align-items-center"><input className="w-auto" type="radio"/> &nbsp; Commute</label>
                            </div>
                        </div>
                        <div>   
                            <label>Location</label>                                 
                            <img className="icon" src="/images/search_icon_2.png" alt=""/>    
                            <input placeholder="Location name" type="text"/>
                        </div>
                        <div>
                            <label>Within</label>
                            <div className="custom-select">
                                <select>
                                    <option>10 Miles</option>
                                    <option>15 Miles</option>
                                    <option>20 Miles</option>
                                </select>
                            <div className="select-selected">10 Miles</div><div className="select-items select-hide"><div>15 Miles</div><div>20 Miles</div></div></div>
                        </div>
                        <div>
                            <label>Location Type</label>
                            <div className="custom-select">
                                <select>
                                    <option>Default Sorting</option>
                                    <option>Sorting 1</option>
                                    <option>Sorting 2</option>
                                </select>
                            <div className="select-selected">Default Sorting</div><div className="select-items select-hide"><div>Sorting 1</div><div>Sorting 2</div></div></div> 
                        </div>
                        
                        

                    </div>
                    <div className="t_center">
                        {/* <button className="filter_btn" onClick={filterSubmit} type="button">Filter</button> */}
                    </div>
                </div>
            </div> 
            <div className="map_section" style={{ height:450}}>
                 <div className="d-flex justify-content-between">
                    <h6>Skip past map to job result list.</h6>
                    <div className="d-flex align-items-center">
                        <p className="mr-2">1481 Live result</p>
                        <h6><i className="fa fa-globe" aria-hidden="true"></i> Hide Map</h6>
                    </div>
                </div> 
                 <div>
                     <MapContainer/>
                </div> 
            </div>
            <div className="assistant_manager_section job_detail_body mt-0">
                <div className="assistant_body p-0">   
                <LoadingIndicator isLoading={isFetchingList} />                     
                    <div className="row">
                        <div className="col-md-12">   

                            <div className="account_form_section">
                                <div className="job_list_card d-md-flex justify-content-between align-items-center">
                                    <div className="d-md-flex align-items-center">
                                        <span className="job_icon"><img src="/images/job_logo.png" alt=""/></span>
                                        <div className="job_info">
                                            <h6>5 Days ago</h6>
                                            <h3><a href="#">Assistant Bank Manager</a></h3>
                                            <div className="bank_details">
                                                <p><img src="/images/bag_icon_2.png" alt=""/> ABCD Bank</p>
                                                <p><img src="/images/clock_icon.png" alt=""/> Full Time <span>$ 22k/M</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="apply_btn" type="button">View Details</button>
                                    </div>
                                </div>
                                
                            </div>
                            
                            {
                                
                                !!items && items.map((item, index) => {

                                    return (
                                        
                                        <div key={index} className="account_form_section">
                                            <div className="job_list_card d-md-flex justify-content-between align-items-center">
                                                <div className="d-md-flex align-items-center">
                                                    <span className="job_icon"><img src="/images/job_logo.png" alt=""/></span>
                                                    <div className="job_info">
                                                        <h6>{   moment(item.created_at).fromNow()}</h6>
                                                       
                                                        <h3><a href="#">{item.title}</a></h3>
                                                        <div className="bank_details">
                                                            <p><img src="/images/bag_icon_2.png" alt=""/>ABCD Bank</p>
                                                            <p><img src="/images/clock_icon.png" alt=""/> {item.job_type} <span>$ 22k/M</span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Link className="apply_btn" to={`/admin/job/details/${item.id}`} type="button">View Details</Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })  
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
                </div>
            </div>
        </div>
        
        

        </>  
    )
}


const mapStateToProps = store => ({
    data: store.rootReducer.jobSearch.data,
    items: store.rootReducer.jobSearch.items.map(item => ({ ...item, key: item.id })),
    jobType: store.rootReducer.jobSearch.jobType,
    category: store.rootReducer.jobSearch.category,
    pagination: store.rootReducer.jobSearch.pagination,
    isFetchingList: store.rootReducer.jobSearch.isFetchingList,
    
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getJobSearchList
}, dispatch);


   
export default connect(mapStateToProps, mapDispatchToProps)(SearchJob);
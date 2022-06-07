import React from 'react'

export default function SearchJob() {
    return (
    <>
        <h4 class="style_h4 mt-4">Search Jobs</h4>
        <div class="out_border_wrapper">
            <div class="filter_section my-0">
                <h4>Search Filters</h4>
                <div class="d-md-flex justify-content-between">
                    <div class="filter_form d-md-flex w-100">
                        <div>   
                            <label>Search Keyword</label>                                 
                            <img class="icon" src="/images/search_icon_2.png" alt=""/>    
                            <input placeholder="Search name" type="text"/>
                        </div>
                        <div>
                            <label>Job Category</label>
                            <div class="custom-select">
                                <select>
                                    <option>Choose Category</option>
                                    <option>Category 1</option>
                                    <option>Category 2</option>
                                </select>
                            <div class="select-selected">Choose Category</div><div class="select-items select-hide"><div>Category 1</div><div>Category 2</div></div></div>
                        </div>
                        <div>
                            <label>Job Type</label>
                            <div class="custom-select">
                                <select>
                                    <option>Default Sorting</option>
                                    <option>Sorting 1</option>
                                    <option>Sorting 2</option>
                                </select>
                            <div class="select-selected">Default Sorting</div><div class="select-items select-hide"><div>Sorting 1</div><div>Sorting 2</div></div></div> 
                        </div>
                    </div>
                </div>
            </div>
            <div class="filter_section mt-3 mb-0">
                <h4>Advanced Filters <small> | Choose location filters</small> </h4>
                <div class="d-md-flex justify-content-between align-items-end">
                    <div class="filter_form d-md-flex w-100">
                        <div>
                            <label>Sort By</label>
                            <div class="d-flex">
                                <label class="d-flex align-items-center mr-3"><input class="w-auto" type="radio"/> &nbsp; Distance</label>
                                <label class="d-flex align-items-center"><input class="w-auto" type="radio"/> &nbsp; Commute</label>
                            </div>
                        </div>
                        <div>   
                            <label>Location</label>                                 
                            <img class="icon" src="/images/search_icon_2.png" alt=""/>    
                            <input placeholder="Location name" type="text"/>
                        </div>
                        <div>
                            <label>Within</label>
                            <div class="custom-select">
                                <select>
                                    <option>10 Miles</option>
                                    <option>15 Miles</option>
                                    <option>20 Miles</option>
                                </select>
                            <div class="select-selected">10 Miles</div><div class="select-items select-hide"><div>15 Miles</div><div>20 Miles</div></div></div>
                        </div>
                        <div>
                            <label>Location Type</label>
                            <div class="custom-select">
                                <select>
                                    <option>Default Sorting</option>
                                    <option>Sorting 1</option>
                                    <option>Sorting 2</option>
                                </select>
                            <div class="select-selected">Default Sorting</div><div class="select-items select-hide"><div>Sorting 1</div><div>Sorting 2</div></div></div> 
                        </div>
                        
                        

                    </div>
                    <div class="t_center">
                        <button class="filter_btn" type="button">Filter</button>
                    </div>
                </div>
            </div>
            <div class="map_section">
                <div class="d-flex justify-content-between">
                    <h6>Skip past map to job result list.</h6>
                    <div class="d-flex align-items-center">
                        <p class="mr-2">1481 Live result</p>
                        <h6><i class="fa fa-globe" aria-hidden="true"></i> Hide Map</h6>
                    </div>
                </div>
                <div>
                    <img src="/images/map.png" alt=""/>
                </div>
            </div>
            <div class="assistant_manager_section job_detail_body mt-0">
                <div class="assistant_body p-0">                        
                    <div class="row">
                        <div class="col-md-12">                                
                            <div class="account_form_section">
                                <div class="job_list_card d-md-flex justify-content-between align-items-center">
                                    <div class="d-md-flex align-items-center">
                                        <span class="job_icon"><img src="/images/job_logo.png" alt=""/></span>
                                        <div class="job_info">
                                            <h6>5 Days ago</h6>
                                            <h3><a href="#">Assistant Bank Manager</a></h3>
                                            <div class="bank_details">
                                                <p><img src="/images/bag_icon_2.png" alt=""/> ABCD Bank</p>
                                                <p><img src="/images/clock_icon.png" alt=""/> Full Time <span>$ 22k/M</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button class="apply_btn" type="button">View Details</button>
                                    </div>
                                </div>
                                <div class="job_list_card d-md-flex justify-content-between align-items-center">
                                    <div class="d-md-flex align-items-center">
                                        <span class="job_icon"><img src="/images/job_logo.png" alt=""/></span>
                                        <div class="job_info">
                                            <h6>5 Days ago</h6>
                                            <h3><a href="#">Assistant Bank Manager</a></h3>
                                            <div class="bank_details">
                                                <p><img src="/images/bag_icon_2.png" alt=""/> ABCD Bank</p>
                                                <p><img src="/images/clock_icon.png" alt=""/> Full Time <span>$ 22k/M</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button class="apply_btn" type="button">View Details</button>
                                    </div>
                                </div>
                                
                                <div class="job_list_card d-md-flex justify-content-between align-items-center">
                                    <div class="d-md-flex align-items-center">
                                        <span class="job_icon"><img src="/images/job_logo.png" alt=""/></span>
                                        <div class="job_info">
                                            <h6>5 Days ago</h6>
                                            <h3><a href="#">Assistant Bank Manager</a></h3>
                                            <div class="bank_details">
                                                <p><img src="/images/bag_icon_2.png" alt=""/> ABCD Bank</p>
                                                <p><img src="/images/clock_icon.png" alt=""/> Full Time <span>$ 22k/M</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button class="apply_btn" type="button">View Details</button>
                                    </div>
                                </div>
                                <div class="job_list_card d-md-flex justify-content-between align-items-center">
                                    <div class="d-md-flex align-items-center">
                                        <span class="job_icon"><img src="/images/job_logo.png" alt=""/></span>
                                        <div class="job_info">
                                            <h6>5 Days ago</h6>
                                            <h3><a href="#">Assistant Bank Manager</a></h3>
                                            <div class="bank_details">
                                                <p><img src="/images/bag_icon_2.png" alt=""/> ABCD Bank</p>
                                                <p><img src="/images/clock_icon.png" alt=""/> Full Time <span>$ 22k/M</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button class="apply_btn" type="button">View Details</button>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="pagenation_section">
                    <span><img src="/images/right_arrow.png" alt=""/></span>
                    <nav aria-label="Page navigation" class="mx-3">
                        <ul class="pagination justify-content-center m-0">
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item active"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">4</a></li>
                        <li class="page-item"><a class="page-link" href="#">5</a></li>
                        <li class="page-item"><a class="page-link" href="#">6</a></li>
                        </ul>
                    </nav>
                    <span><img src="/images/left_arrow.png" alt=""/></span>
                </div>
            </div>
        </div>
        </>  
    )
}

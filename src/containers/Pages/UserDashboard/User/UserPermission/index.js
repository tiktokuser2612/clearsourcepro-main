import React, { useState } from 'react';
import './style.scss';

const UserPermission = ({permission,action, editAdminUser}) => {
    const [activePermission, setActivePermission] = useState(0);

    const handlePermission = (index) => {
        setActivePermission(index);
    }

    const handleActionPermission = (key1,key2,key) => {
        if(action != 1){
            return;
        }
        if(key == 'All'){
            let value = checkAllSelected(key1,key2) ? 0 : 1
            Object.keys(permission[key1][key2]).map((key3, ind) => (
                permission[key1][key2][key3] = value
            ))
        }else{
            permission[key1][key2][key] = permission[key1][key2][key] ? 0 :1;
        }
        editAdminUser({permission: permission})
    } 

    const checkAllSelected = (key1,key2) => {
        let flag = true
        Object.keys(permission[key1][key2]).map((p, ind) => {
            if(permission[key1][key2][p] == 0){
                flag = false
            } 
        })

        return flag
    }


    console.log('permission:::',permission);

    return (
        <div className="permission_area">
            <div class="row">
                <div class="col-md-3">
                    <h5>Permission Settings</h5>
                </div>
                <div class="col-md-9 pl-0">
                    <div class="p_candidate_accor2">
                        <ul>
                            <li>
                            <div class="p_select_btn bvc">
                                <div class="d-flex">
                                    <label>
                                        <h6>Legend:</h6>
                                    </label>
                                    <span class="active">C</span>
                                    <label>Create</label>
                                    <span>R</span>
                                    <label>Review</label>
                                    <span>U</span>
                                    <label>Update</label>
                                    <span>D</span>
                                    <label>Delete</label>
                                </div>
                            </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        <div className="permission_group d-flex">
          <div className="p_menu_itms">
              {/* <h6>Menu Items:</h6> */}
              <ul>
                  {

                    Object.keys(permission).map((key, index) => (
                        <li key={index} className={activePermission ==index ?'active' :""}
                        onClick={()=>{handlePermission(index)}}
                        >{key} <i className="fa fa-check-square" aria-hidden="true"></i></li>
                    ))
                  }
              </ul>
          </div>
          <div className="p_candidate_accor">
              <h6>Candidate Accordions:</h6>
              <ul>
                {
                    Object.keys(permission).map((key, index) => (
                        (activePermission == index)?
                            Object.keys(permission[key]).map((key2, index2) => (
                            <li>
                                <samp >{key2}
                                    {/* <i class="fa fa-check-square" aria-hidden="true"></i> */}
                                </samp>
                                <div class="p_select_btn bvc">
                                    <label>{ action ==1 ?'Select':'Selected'} Permission</label>
                                    <div class="d-flex">
                                        {
                                            (Object.keys(permission[key][key2]).length > 1) ?
                                            <span class={
                                                checkAllSelected(key,key2) ? "active" : (action != 1)?'checkdisable' :''
                                            }
                                            onClick={()=>{handleActionPermission(key,key2,'All')}}
                                            >All    </span>
                                            :''
                                        }
                                        {
                                            Object.keys(permission[key][key2]).map((key3, index3) => (
                                                <span class={permission[key][key2][key3] ? "active":(action != 1)?'checkdisable' :''}
                                                onClick={()=>{handleActionPermission(key,key2,key3)}}
                                                >{key3}</span>
                                            ))
                                        }
                                        
                                    </div>
                                </div>
                            </li>
                            ))
                        :''
                    ))
                }
              </ul>
          </div>
        </div>
    </div>
    )   
}   
       
export default UserPermission
    

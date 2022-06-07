import React, { useEffect,useState } from 'react';

const NewClientCompanyPop = ({ onClose, notification, markRead }) => {
  return (
    <div className={"modal show d-block application_decline"} style={{background:"#262626bf"}} id="client_company_remove">
        <div className="modal-dialog modal-md">
            <div className="modal-content_delete modal-content">
                <div className="modal-header">
                    <i className="fa fa-times-circle btn p-0 m-0 fa-4x" aria-hidden="true" onClick={onClose}/>
                </div>
                <div className="modal-body">
                    <h6 className="mb-4" style={{color:'#1a8909'}}>
                        {
                            notification.map((n,i)=>{
                                return <div className='d-flex justify-content-between align-items-center pb-2 border-bottom'>
                                    <small className='text-secondary'>
                                        {n.message}
                                    </small>
                                    <button className='btn btn-sm' onClick={() => {markRead(n.id)} }>
                                        Mark as Read
                                    </button>
                                </div>
                            })
                        }
                    </h6>
                </div>
            </div>
        </div>
    </div>
  );
};

export default NewClientCompanyPop;
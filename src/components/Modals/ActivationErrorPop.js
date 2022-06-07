import React, { useEffect,useState } from 'react';

const ActivationErrorPop = ( { user  , closemodel ,close}) => {

    console.log('user_jv_status',user)

    const [invitationStatus, setInvitationStatus] = useState(1);
    const [invitationColor, setInvitationColor] = useState('red');
    const [invitationMsg, setInvitationMsg] = useState('You are not yet invited from JV. So please wait for Invitation mail');


    useEffect(() => {
        if(user.jv_invitation_status == 'Not Read'){
           setInvitationStatus(2);
           setInvitationColor('#c5c541');
           setInvitationMsg('Please read your invitation mail and accept that invitation from JV');
        }else if(user.jv_invitation_status == 'Read'){
           setInvitationStatus(3);
           setInvitationColor('orange');
           setInvitationMsg('Please accept the invitation for completion');
        }else if(user.jv_invitation_status == 'Accepted'){
           setInvitationStatus(4);
           setInvitationColor('green');
           setInvitationMsg('Thank you for invition completion');
        }
        
    });
    
  return (
    <div className={close ? "modal fade d-none mt-5 application_decline" : "modal show d-block mt-5 application_decline"} id="test_remove">
        <div className="modal-dialog modal-md">
            <div className="modal-content_delete modal-content">
                <div className="modal-header">
                    
                    <button type="button" className="close" data-dismiss="modal" onClick={closemodel}>
                        <i className="fa fa-times-circle" aria-hidden="true" />
                    </button>
                </div>
                <div className="modal-body">
                    
                    <h6 className="mb-4" style={invitationStatus ? {color:`${invitationColor}`} : {color:'black'}}>
                        
                    {invitationMsg} 
                    </h6>
                    
                </div>
            </div>
        </div>
    </div>
  );
};

export default ActivationErrorPop;
import React from 'react';

const DeleteComman = ({ onOkay, text }) => {
  return (
    <div className="modal fade mt-5 application_decline" id="remove">
      <div className="modal-dialog modal-md">
        <div className="modal-content_delete modal-content">
          <div className="modal-header">
            <div className="tick_box">
              <img src="/images/cross_icon.png" alt="" />
            </div>
            <button type="button" className="close" data-dismiss="modal">
              <i className="fa fa-times-circle" aria-hidden="true" />
            </button>
          </div>
          <div className="modal-body">
            <h3>Are you Sure?</h3>
            <h6 className="mb-4">
              Do you really want to delete this {text}?<br />
              This process cannot be undone.
            </h6>
            <div className="text-center mb-3">
              <button className="cancel_btn_style mr-4" type="button" data-dismiss="modal">Cancel</button>
              <button className="save_btn_style pink" type="button" data-dismiss="modal" onClick={onOkay}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteComman;
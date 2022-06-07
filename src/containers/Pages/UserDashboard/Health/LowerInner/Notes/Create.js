import React from 'react'

export default function Create() {
    return (
        
        <div class="notes_tab_info">
            <div class="d-flex align-items-center justify-content-end my-2">
                <i class="fa fa-plus-circle" aria-hidden="true"></i> 
                <a href="#">&nbsp; Create New Notes</a>
            </div>
            <div class="create_note_card">
                <div class="top_arrow">
                    <img src="/images/top_arrow.png" alt=""/>
                </div>
                <div class="close_create">
                    <i class="fa fa-times-circle" aria-hidden="true"></i>
                </div>
                <div class="health_card w-100">
                    <label>Posting Type</label>
                    <input type="text"/>
                </div>
                <div class="health_card w-100">
                    <label>Posting Type</label>
                    <textarea></textarea>
                </div>
                <div class="account_form_style mt-2">
                    <button class="mt-0 ml-0" type="button" data-toggle="modal" data-target="#update_job">Create</button>
                    <button class="cancel mt-0" type="button">Cancel</button>
                </div>
            </div>    
            
        </div>
    )
}

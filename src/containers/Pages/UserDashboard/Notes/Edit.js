import React , { useState } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    putNotes,
    initNotes,
    editNotes,
} from 'store/actions/notes';
import { useHistory } from 'react-router';
import notifier from 'utils/notifier';

const Edit = (
    {
        putNotes,
        data, id,
        idNote, type, noteDescription, noteTitle, requisitionId, module,createNote,editNote
    }
) => {

    const history = useHistory();
    const [errors, setErrors] = useState({});

    const [title, setTitle] = useState(noteTitle);
    const [description, setDescription] = useState(noteDescription);
    // const [moduleType, setModule] = useState(module);

    //useEffect(() => {
        // initNotes();
        // setDescription(description);
        // setTitle(title);
        
    //}, [ initNotes, id]);
    // console.log("editNote",editNote)

    const handlePut = (e) => {
        
        if (e && e.preventDefault) {
          e.preventDefault();
        }
        
        // Validate all fields

        if (data === null) {
            notifier.error('Please fix errors');
            return;
        }
        console.log("etarget::",e.target.title);

        data.title = title;
        data.description = description;
       
        console.log('module::', module);

        data.note_type_id = requisitionId;
        data.model_id = type;
        var newType = '';
        if(type === '2'){
            newType = "recruiter";
        }else if(type === '1'){
            newType = "requisition";
        }else if(type === '3'){
            newType = "candidate";
        }   
        console.log("moduleType",module);
        putNotes(idNote, data)
            .then(res => {
                notifier.success('Update note success!');
                initNotes();
                
                history.push(`/admin/${module}/view/${requisitionId}`);
                
            })
        .catch(err => {
            notifier.error('Update note failed!');
            setErrors(err.errors || {});
        });
        
    }
    const onCancel =()=>{
        
    }

    // const handleChange = (key, val) => {
    //     // Validate individual
    //      console.log("key : " + key + '  val: ' + val );
    //     // setErrors({
    //     //     ...errors,
    //     //     [key]: Joi.validateToPlainErrors(val, UPDATE_NOTES_SCHEMA[key]),
    //     // });
        
    //     editNotes({ [key]: val });
    // };

    // console.log('module123::', module);


    return (
        <>  
            <div class="create_note_card">
                <div class="top_arrow">
                    <img src="/images/top_arrow.png" alt=""/>
                </div>
                <div class="close_create"onClick={()=>{editNote(false)}}>
                    <i class="fa fa-times-circle" aria-hidden="true"></i>
                </div>
                <div class="health_card w-100">
                    <input
                        type='text'
                        value={title}
                        name='title'
                        className="client_input"
                        onChange={e => setTitle(e.target.value)}
                    />
                    
                </div>
                <div class="health_card w-100">
                    
                    
                    <textarea
                      value={description }
                        name='description'
                        className="client_input"
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div class="account_form_style mt-2">
                    <button class="mt-0 ml-0" type="button" onClick={handlePut} data-toggle="modal" data-target="#update_job">Update</button>
                    <button class="cancel mt-0" type="button"onClick={onCancel}>Cancel</button>
                </div>
            </div>    
            
        </>
    )
}

const mapStateToProps = store => ({
    isFetching: store.rootReducer.notes.isFetching,
    data: store.rootReducer.notes.data,
    isPutting: store.rootReducer.notes.isPutting,
    edited: store.rootReducer.notes.edited,
});
  
const mapDispatchToProps = dispatch => bindActionCreators({
    initNotes,
    editNotes,
    putNotes
}, dispatch);
   
export default connect(mapStateToProps, mapDispatchToProps)(Edit);
  

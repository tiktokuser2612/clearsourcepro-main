import React , { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    putNotes,
    initNotes,
    editNotes,
    getNote
} from 'store/actions/notes';
import { useHistory } from 'react-router';
import notifier from 'utils/notifier';
import Joi from 'utils/validator';
import { Form, Input} from 'antd';

const UPDATE_NOTES_SCHEMA = {
    title: Joi.string().label('Title').required() ,
};



const Edit = (
    {
        initNotes, getNote, editNotes, putNotes,
        data, id, setEditNote
    }
) => {

    const history = useHistory();
    
    const [errors, setErrors] = useState({});
    
    useEffect(() => {
        initNotes();
        getNote(id);
    }, [getNote, initNotes, id]);

    const handlePut = (e) => {

        if (e && e.preventDefault) {
          e.preventDefault();
        }
        
        // Validate all fields
        const errors = Joi.validateToPlainErrors(data, (['client', 'admin'].indexOf(data.user_role) === -1) ? UPDATE_NOTES_SCHEMA : UPDATE_NOTES_SCHEMA);
        setErrors(errors);

        if (Joi.hasPlainError(errors)) {
            notifier.error('Please fix errors');
            return;
        }
    
        putNotes(id, data)
            .then(res => {
                notifier.success('Update note success!');
                
                 setEditNote(false);
                initNotes();
                
                history.push('/admin/clients/create');
                
            })
            .catch(err => {
                notifier.error('Update note failed!');
                setErrors(err.errors || {});
            });
        
    }

    const handleChange = (key, val) => {
        // Validate individual
         
        setErrors({
            ...errors,
            [key]: Joi.validateToPlainErrors(val, UPDATE_NOTES_SCHEMA[key]),
        });     
        editNotes({ [key]: val });
    };

    return (
        <>  
            <div className="create_note_card">
                <div className="top_arrow">
                    <img src="/images/top_arrow.png" alt=""/>
                </div>
                <div className="close_create">
                    <i className="fa fa-times-circle" aria-hidden="true"></i>
                </div>
                <div className="health_card w-100">
                    
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'Title') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'title')}
                        label="Title"
                        className="w-100"
                        >
                        <Input
                            type="text"
                            placeholder="title here"
                            value={data.title}
                            //defaultValue="Hello!"
                            className="client_input"
                            onChange={e => handleChange('title', e.target.value)}
                        />
                    </Form.Item>
                </div>
                <div className="health_card w-100">
                    
                    <Form.Item
                        validateStatus={Joi.getFirstPlainError(errors, 'description') ? 'error' : ''}
                        help={Joi.getFirstPlainError(errors, 'description')}
                        label="Description"
                        className="w-100"
                        >
                        <textarea
                            value={data.description}
                            className="client_input"
                            onChange={e => handleChange('description', e.target.value)}
                        />
                    </Form.Item>
                </div>
                <div className="account_form_style mt-2">
                    <button className="mt-0 ml-0" type="button" onClick={handlePut} data-toggle="modal" data-target="#update_job">Update</button>
                    <button className="cancel mt-0" type="button">Cancel</button>
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
    getNote,
    putNotes
}, dispatch);
   
export default connect(mapStateToProps, mapDispatchToProps)(Edit);
  

// function sum(arg) {
//     let sum = 0
//     arg.map((item, index) => {
//         sum += item
//     })
//     return sum
// }

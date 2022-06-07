import React , { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    postNotes,
    initNotes,
    editNotes
  } from 'store/actions/notes';
  import { useHistory } from 'react-router';
import notifier from 'utils/notifier';
import Joi from 'utils/validator';
import { Form, Input} from 'antd';

const CREATE_NOTES_SCHEMA = {

    title: Joi.string().label('Title').required() ,
    
};

const Create = ({initNotes, data,  postNotes,  editNotes, clientRecordId}) => {

    const history = useHistory();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        initNotes()
    }, [initNotes]);

    const handlePost = (e) => {
        if (e && e.preventDefault) {
          e.preventDefault();
        }
    
        // Validate all fields
        const errors = Joi.validateToPlainErrors(data, (['client', 'admin'].indexOf(data.user_role) === -1) ? CREATE_NOTES_SCHEMA : CREATE_NOTES_SCHEMA);
        setErrors(errors);
        
        if (Joi.hasPlainError(errors)) {
          notifier.error('Please fix errors');
          return;
        }
        data.client_record_id = clientRecordId;
        
        postNotes( data)
            .then(res => {
                notifier.success('Create note success!');
                initNotes();
                history.push("/admin/client_records/view/"+ clientRecordId);
            })
            .catch(err => {
                notifier.error('Create note failed!');
                setErrors(err.errors || {});
        });
    };

    const handleChange = (key, val) => {
        // Validate individual
       
        setErrors({
        ...errors,
        [key]: Joi.validateToPlainErrors(val, CREATE_NOTES_SCHEMA[key]),
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
                            className="client_input"
                            onChange={e => handleChange('description', e.target.value)}
                        />
                    </Form.Item>
                </div>
                <div className="account_form_style mt-2">
                    <button className="mt-0 ml-0" type="button" onClick={handlePost} data-toggle="modal" data-target="#update_job">Create</button>
                    <button className="cancel mt-0" type="button">Cancel</button>
                </div>
            </div>    
            
        </>
    )
}


const mapStateToProps = store => ({
    data: store.rootReducer.notes.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    initNotes,
    editNotes,
    postNotes,
}, dispatch);


   
export default connect(mapStateToProps, mapDispatchToProps)(Create);

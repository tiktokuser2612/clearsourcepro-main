import React  from 'react'

import { Form, Input} from 'antd';

const CreateAndUpdate = ({
    editNotes, onClose, onSubmit,
    data
}) => {
    console.log("notes:",data)
    return (
        <>  
            <div className="create_note_card">
                <div className="top_arrow">
                    <img src="/images/top_arrow.png" alt=""/>
                </div>
                <div className="close_create">
                    <i className="fa fa-times-circle" onClick={()=>{onClose(false)}} aria-hidden="true"></i>
                </div>
                <div className="health_card w-100">
                    <Form.Item
                        validateStatus={false ? 'error' : ''}
                        // help={"Invalid"}
                        label="Title"
                        className="w-100"
                        >
                        <Input
                            type="text"
                            placeholder="title here"
                            value={data.title}
                            className="client_input"
                            onChange={e => editNotes({'title': e.target.value})}
                        />
                    </Form.Item>
                </div>
                <div className="health_card w-100">
                    <Form.Item
                        validateStatus={false ? 'error' : ''}
                        // help={"Invalid"}
                        label="Description"
                        className="w-100"
                        >
                        <textarea
                    
                            className="client_input"
                            value={data.description}
                            onChange={e => editNotes({'description': e.target.value})}
                        />
                    </Form.Item>
                </div>
                <div className="account_form_style mt-2">
                    <button className="mt-0 ml-0" type="button" onClick={onSubmit} data-toggle="modal" data-target="#update_job">Submit</button>
                    <button className="cancel mt-0" type="button" onClick={()=>{onClose(false)}}>Cancel</button>
                </div>
            </div> 
        </>
    )
}

export default CreateAndUpdate;


import React, { useEffect, useState } from 'react'

import Pagenation from 'components/Common/Pagenation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import { getNotesList, postNotes, editNotes, initNotes, putNotes } from 'store/actions/notes';

import CreateAndUpdate from './CreateAndUpdate';
import notifier from 'utils/notifier';


const List = ({
  getNotesList, postNotes, editNotes, initNotes, putNotes,
  data, items, pagination, isFetchingList,
  data_id, model_id
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const pageLength = Math.ceil(pagination.total / pagination.pageSize);

  useEffect(() => {
    pagination.filters = {
      model: model_id,
      id: data_id
    }
    getNotesList(pagination.current, pagination.pageSize, pagination.filters, pagination.sorter, pagination.dsc);
  }, [getNotesList]);

  const previousPage = () => {
    if (pagination.current > 1) {
      getNotesList(pagination.current - 1, pagination.pageSize, pagination.filters, pagination.sorter, pagination.dsc);
    }
  };

  const nextPage = () => {
    if (pagination.current < pageLength) {
      getNotesList(pagination.current + 1, pagination.pageSize, pagination.filters, pagination.sorter, pagination.dsc);
    }
  };

  const onClick = (current) => {
    getNotesList(current, pagination.pageSize, pagination.filters, pagination.sorter, pagination.dsc);
  };

  const handleButtonClick = (flag) => {
    setIsFormOpen(true);
    setIsEdit(flag);
  }

  const handleSubmit = async () =>{
    if(isEdit ===false){
      await postNotes(data)
      .then(res => {
          notifier.success('New note Created!');
      })
      .catch(err => {
        notifier.error('Failed: Unable to create new note!');
      });
    }
    else{
      await putNotes(data.id, data)
      .then(res => {
          notifier.success('Update note success!');
      })
      .catch(err => {
        notifier.error('Update note failed!');
      });
    }
    await setIsFormOpen(false);
    await getNotesList(pagination.current, pagination.pageSize, pagination.filters, pagination.sorter, pagination.dsc);
  }

  return (<div className='px-4'>
  <label class="d-flex justify-content-end">
   <a className='text-decoration-none' href="#" onClick={() => {
     handleButtonClick(false)
     editNotes({'id':null})
     editNotes({'title':''})
     editNotes({'description':''})
     editNotes({'note_type_id':data_id})
     editNotes({'model_id':model_id})
   }}>
     <i className="fa fa-plus-circle" aria-hidden="true">
     </i> Create New Notes</a>
     </label>


 <br />
 {
   isFormOpen && <CreateAndUpdate
     editNotes={editNotes}
     onClose={setIsFormOpen}
     data={data}
     onSubmit={handleSubmit}
   />
 }
 {
   !!items && items.map((note, index) => {

     return (
       <div className="mb-3">
         <h3 className='text-capitalize'>
           {note.title}
        
            <span className="text-primary ml-2">
              {moment(note.updated_at).format("MM/DD/YYYY hh:mm A")}
            </span>
            
            <i
              className="fa fa-edit btn"
              onClick={() => {
                handleButtonClick(true)
                editNotes({['id']:note.id})
                editNotes({['title']:note.title})
                editNotes({['description']:note.description})
                editNotes({['note_type_id']:data_id})
                editNotes({['model_id']:model_id})
              }}>
            </i>
         </h3>
         <p>{note.description}</p>
         {index < items.length -1 ? <hr></hr> : '' 
    
          }
       </div>
     )
   })
 }
  


 <Pagenation
   onClick={onClick}
   previousPage={previousPage}
   nextPage={nextPage}
   pageLength={pageLength}
   currentPage={pagination.current}
 />

</div>
  )
}

const mapStateToProps = store => ({
  data: store.rootReducer.notes.data,
  items: store.rootReducer.notes.items.map(item => ({ ...item, key: item.id })),
  pagination: store.rootReducer.notes.pagination,
  isFetchingList: store.rootReducer.notes.isFetchingList,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getNotesList,
  postNotes,
  editNotes,
  initNotes,
  putNotes

}, dispatch);



export default connect(mapStateToProps, mapDispatchToProps)(List);
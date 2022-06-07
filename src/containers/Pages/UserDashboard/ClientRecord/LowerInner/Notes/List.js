import React, { useEffect, useState } from 'react'

import Pagenation from 'components/Common/Pagenation';
import {Link} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getNotesList } from 'store/actions/notes';
import NoteEdit from './Edit'
import { useParams } from 'react-router-dom';

const List = ({
    getNotesList, pagination, items, data, isFetchingList 
  }) => {

    const { id } = useParams();
    const [editNote, setEditNote] = useState(false);
    const [listNote, setListNote] = useState(true);
    const [idNote, setIdNote] = useState(null);

    const openEditNote = (id) => {
        setListNote(false);
        setEditNote(true);
        setIdNote(id);
    }

    const pageLength = Math.ceil(pagination.total / pagination.pageSize);
    const [asc, setAsc] = useState(true);
    pagination.filters = {
      id: id,
      model:3
    }
    
    useEffect(() => {
        getNotesList(pagination.current,pagination.pageSize,pagination.filters);
        setEditNote(false);
    }, [getNotesList]);
  
    const previousPage = () => {
      
      if (pagination.current > 1) {
        getNotesList(pagination.current - 1, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
      }
    };
  
    const nextPage = () => {
      if (pagination.current < pageLength) {
        getNotesList(pagination.current + 1, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
      }
    };
  
    const onClick = (current) => {
        getNotesList(current, pagination.pageSize, pagination.filters, pagination.sorter, pagination.asc);
    };
  
    // const tableSort = (sorter) => {
    //   if (sortColumn === sorter) {
    //     setAsc(!asc);
    //   } else {
    //     setSortColumn(sorter);
    //     setAsc(true);
    //   }
    //   getNotesList(pagination.current, pagination.pageSize, pagination.filters, sorter, asc);
    // };
  
    // const handleChangeFilters = (key, value) => {
    //     getNotesList(pagination.current, pagination.pageSize, {
    //     ...pagination.filters,
    //     [key]: value,
    //   }, pagination.sorter, pagination.asc);
    // };

    return (
        
        <div>
            {idNote && editNote ?  <NoteEdit id={idNote} setEditNote={setEditNote}/> : ""} 
            {
                !!items && items.map((note) => {
                  
                    return(
                        <> 
                          <div class="notes_tab_card">
                            <h4>
                                {note.title + " " }
                                <span>
                                    { new Date(note.updated_at).getMonth() +"/"+ new Date(note.updated_at).getDate() +"/"+ new Date(note.updated_at).getFullYear()  + "  "}
                                </span>
                            
                                <Link to="/admin/clients/create" onClick={() => openEditNote(note.id)} > Edit</Link>
                            </h4>  
                            
                            <p>{note.description}</p>
                                                    
                        </div>
                        
                        </>
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
    
    
}, dispatch);


   
export default connect(mapStateToProps, mapDispatchToProps)(List);
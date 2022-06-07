import React, {  useEffect, useState } from 'react';

import moment from 'moment';
import { Link } from 'react-router-dom';


  
const DocUploader = ({
   
    
  }) => {
    

    return (
        <div className="docs_drag_area">
            <img className="mr-3" src="./images/add_file_icon.png" alt=""/>
            
            <input type="file" accept=".pdf, .doc, .docx, .odt, .ods" />
        
            <p>Drag &amp; Drop, or Browse to Upload Resume</p>
            
        </div>
    )
}

export default DocUploader;
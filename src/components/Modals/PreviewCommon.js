import React from 'react';
import { Worker } from '@react-pdf-viewer/core'; // install this library
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
const PreviewCommon= ({preview}) => {
       // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <div className="modal fade mt-5 application_decline" id="remove">
      <div className="modal-dialog modal-md">
        <div className="modal-content_delete modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">
              <i className="fa fa-times-circle" aria-hidden="true" />
            </button>
          </div>
          <div className="modal-body">
            <h3>Preview Document</h3>
            <div className="text-center mb-3">
                         {/* show pdf conditionally (if we have one)  */}
        {preview&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
        <Viewer fileUrl={preview}
          plugins={[defaultLayoutPluginInstance]} />
    </Worker></>}

    {/* if we dont have pdf or viewPdf state is null */}
    {!preview&&<>No pdf file selected</>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewCommon;
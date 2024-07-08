import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MarkdownLogic from '../scripts/markdownprevlogic';

const MarkDownPrev = () => {
  const [preview, setPreview] = useState('');

  return (
    <main className='container'>
      <div className="d-flex mt-3 justify-content-center">
        <div className="col-md-6">
          <div className="border rounded shadow-sm h-md-250">
            <div className="bg-light p-2 border-bottom">
              <strong className="d-inline-block">Editor</strong>
            </div>
            <div className="p-4" style={{ height: '200px', overflow: 'auto'}}>
              <MarkdownLogic setPreview={setPreview} />
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex mt-3 justify-content-center">
        <div className="col-md-9">
          <div className="border rounded shadow-sm h-md-250">
            <div className="bg-light p-2 border-bottom">
              <strong className="d-inline-block">Previewer</strong>
            </div>
            <div className="p-4" style={{overflow: 'auto' }}>
              <div id="preview" dangerouslySetInnerHTML={{ __html: preview }} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MarkDownPrev;

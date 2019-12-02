import React from 'react';

const FormGroup = ({ label, children, after, before }) => {
  return (
    <label className="form-group">
      <div className="form-label">{ label }</div>
      { (after || before) ?
        <div className="input-group">
          { before &&
            <div className="input-group-prepend">
              <span className="input-group-text">{before}</span>
            </div> }
          { children }
          { after &&
            <div className="input-group-append">
              <span className="input-group-text">{after}</span>
            </div> }
        </div> :
        children }
    </label>
  );
};

export default FormGroup;

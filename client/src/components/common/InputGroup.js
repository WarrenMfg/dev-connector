import React from 'react';
import PropTypes from 'prop-types';

const InputGroup = ({
  placeholder,
  name,
  value,
  error,
  onChange,
  icon,
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" style={{ width: '48px', justifyContent: 'center' }}>
          <i className={icon} />
        </span>
      </div>
      <input
        type='text'
        className={`form-control form-control-lg ${error && 'is-invalid'}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default InputGroup;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Dropdown = ({ currentId, setCurrentId, dataList, placeHolder }) => {
  const [isClicked, setIsClicked] = useState(false);

  const dropdownRef = React.createRef();

  const onClickOutsideHandler = (event) => {
    if (dropdownRef.current && isClicked && !dropdownRef.current.contains(event.target)) {
      setIsClicked(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', onClickOutsideHandler);
    return () => {
      window.removeEventListener('click', onClickOutsideHandler);
    };
  });

  console.log('dataList',dataList);

  return (
    <div className="dropdown-wrapper" style={{border: "0"}} ref={dropdownRef}>
      <div className="selector" style={{display: "flex",padding: "0"}} onClick={() => setIsClicked(!isClicked)}>
        <span className="selector-input">
          {(dataList.find((job) => (job.id === currentId)) ? dataList.find((job) => (job.id === currentId)).name : [placeHolder || 'Select One'])}
        </span>
        <span className="selector-icon" style={{backgroundColor:"transparent",position: "relative",width:"24px"}}>
          <i className={'fas ' + (isClicked ? 'fa-caret-up' : 'fa-caret-down')} />
        </span>
      </div>
      <div className={'dropdown-list ' + (isClicked ? 'active' : '')}>
        <div
          className="dropdown-item"
          onClick={() => {
            setCurrentId(-1);
            setIsClicked(!isClicked);
          }}
        >
          None
        </div>
        {
          dataList.map((data) => (
            <div
              key={data.id}
              className={'dropdown-item ' + (data.id === currentId ? 'active' : '')}
              onClick={() => {
                setCurrentId(data.id);
                setIsClicked(!isClicked);
              }}
            >
              {data.name}
            </div>
          ))
        }
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  setCurrentId: PropTypes.func.isRequired,
  currentId: PropTypes.any.isRequired,
  dataList: PropTypes.array.isRequired,
  placeHolder: PropTypes.string,
};

export default Dropdown;
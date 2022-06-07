
import React, { useState } from 'react';

import {
  Form,
  Input,
} from 'antd';

import api from 'constants/api';
import notifier from 'utils/notifier';
import './index.scss';

const ActiveAccountSelectList = ({
  placeholder,
  value,
  onChange,
  label,
  validateStatus,
  help,
  onSearchComplete,
  className,
  inputClassName,
  ...props
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [lastSearched, setLastSearched] = useState('');

  const handleSearch = () => {
    setIsSearching(true);

    api.public.zipcode(value)
      .then(res => {
        setIsSearching(false);
        setLastSearched(value);

        if (res) {
          onSearchComplete(res.city || '', res.state || '', res.country || '');
        }
      })
      .catch(err => {
        notifier.error('Can not information about zipcode');
        setIsSearching(false);
      });
  };

  const handleBlur = () => {
    if (lastSearched === value) {
      return;
    }

    handleSearch();
  };

  return (
    <Form.Item
      validateStatus={validateStatus}
      help={help}
      className={`zipcode-input ${className}`}
      label={label || ''}
    >
      <Input.Search
        className={inputClassName}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        loading={isSearching}
        onSearch={handleSearch}
        onBlur={handleBlur}
        {...props}
      />

    <Select value={value} 
        style={{ width: '100%' }}
        placeholder="Status"
        className="w-100 sal_input"
        // onChange={v => handleChangeSearch(v)}
        onChange={onChange}

    >
        <Option value="1">Active</Option>
        <Option value="0">Inactive</Option>
        
    </Select>
    </Form.Item>
  );
};

export default ActiveAccountSelectList;

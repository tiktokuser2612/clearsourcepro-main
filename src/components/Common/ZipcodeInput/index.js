import React, { useState } from 'react';

import {
  Form,
  Input,
} from 'antd';

import api from 'constants/api';
import notifier from 'utils/notifier';
import './index.scss';

const ZipcodeInput = ({
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
    </Form.Item>
  );
};

export default ZipcodeInput;

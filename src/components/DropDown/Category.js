import React from 'react';
import {  Select } from 'antd';

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}
export default function Category() {
    return (
        
      <Select defaultValue="Filter By Last Updated" style={{ width: 218 }} onChange={handleChange}>
        <Option value="1"> Category 1 </Option>
        <Option value="2"> Category 2 </Option>
        <Option value="3"> Category 3 </Option>
        <Option value="4"> Category 4 </Option>
        <Option value="5"> Category 5 </Option>
      </Select>
    )
}


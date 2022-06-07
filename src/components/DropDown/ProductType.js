import React from 'react'
import 'antd/dist/antd.css';
import { Select } from 'antd';

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

export default function ProductType() {
    return (   
      <Select defaultValue="Filter By Company" style={{ width: 218 }} onChange={handleChange}>
        <Option value="1"> Product Type 1 </Option>
        <Option value="2"> Product Type 2 </Option>
        <Option value="3"> Product Type 3 </Option>
        <Option value="4"> Product Type 4 </Option>
        <Option value="5"> Product Type 5 </Option>
      </Select>
    )
}

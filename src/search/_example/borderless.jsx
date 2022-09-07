import React, { useState } from 'react';
import Search from '../index';
import { Space } from 'tdesign-react';

export default function SearchExample() {
  const [value, onChange] = useState('Welcome to TDesign');

  return (
    <Space direction="vertical" style={{ width: 500 }}>
      <Search
        placeholder="请输入内容1"
        label='搜索'
        suffix='搜索'
        clearable
        borderless
        onChange={(value) => {
          console.log(value);
        }}
      />
    </Space>
  );
}
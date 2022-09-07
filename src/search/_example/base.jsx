import React, { useState } from 'react';
import Search from '../index';
import { Space } from 'tdesign-react';
import { SearchIcon } from 'tdesign-icons-react';

export default function SearchExample() {
  const [value, onChange] = useState('Welcome to TDesign');

  return (
    <Space direction="vertical" style={{ width: 500 }}>
      <Search
        placeholder="请输入内容"
        borderless={false}
        suffixIcon={<SearchIcon/>}
        clearable
        onChange={(value) => {
          console.log(value);
        }}
        onEnter={(context) => {
          console.log(context?.value);
        }}
      />
      <Search
        placeholder="请输入内容"
        borderless={false}
        suffix='搜索'
        clearable
        onChange={(value) => {
          console.log(value);
        }}
        onEnter={(context) => {
          console.log(context?.value);
        }}
      />
      <Search
        placeholder="请输入内容"
        borderless={false}
        suffix='搜索'
        suffixIcon={<SearchIcon/>}
        clearable
        onChange={(value) => {
          console.log(value);
        }}
        onEnter={(context) => {
          console.log(context?.value);
        }}
      />
    </Space>
  );
}

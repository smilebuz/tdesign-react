// { forwardRef, useRef, useImperativeHandle }
import React from 'react';
import classNames from 'classnames';
import useConfig from '../hooks/useConfig';
import useSingleInput from './useSingleInput';
import { TdSearchProps } from './type';
import { StyledProps } from '../common';
import { searchDefaultProps } from './defaultProps';

export interface SearchProps extends TdSearchProps, StyledProps {}

const Search = (props: SearchProps) => {
  // value
  const { borderless, multiline } = props;

  // 类的prefix
  const { classPrefix: prefix } = useConfig();
  const { renderSingleInput } = useSingleInput(props);

  const popupClasses = classNames([
    props.className,
    `${prefix}-search`,
    {
      [`${prefix}-search--borderless`]: borderless,
      [`${prefix}-search--multiple`]: multiline,
      // [`${prefix}-search--popup-visible`]: popupVisible ?? innerPopupVisible,
      // [`${prefix}-search--empty`]: value instanceof Array ? !value.length : !value,
    },
  ]);

  const mainContent = (
    <div className={popupClasses} style={props.style}>
      {multiline
        ? ''
        : // 单选
          renderSingleInput()}
    </div>
  );

  return <div>{mainContent}</div>;
};

Search.displayName = 'Search';
Search.defaultProps = searchDefaultProps;

export default Search;

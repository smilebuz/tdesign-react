// 用Input
import React, { useRef, MouseEvent, FormEvent } from 'react';
import pick from 'lodash/pick';
import classNames from 'classnames';
import { SearchCommonProperties } from './interface';
import Input from '../input';
import { TdSearchProps } from './type';
// import useConfig from '../hooks/useConfig';
import useControlled from '../hooks/useControlled';

const PROPERTIES = ['clearable', 'disabled', 'label', 'placeholder', 'readonly', 'suffix', 'onEnter'];

export default function useSingleInput(props: TdSearchProps) {
  // const {} = props;
  // const { classPrefix } = useConfig();
  const inputRef = useRef();
  const [inputValue, setInputValue] = useControlled(props, 'value', props.onChange);

  // TODO showLoading

  const commonInputProps: SearchCommonProperties = {
    ...pick(props, PROPERTIES),
  };

  const onInnerClear = (context: { e: MouseEvent<HTMLDivElement> }) => {
    context?.e?.stopPropagation();
    props.onClear?.(context);
    setInputValue('', { trigger: 'clear' });
  };

  const onInnerInputChange = (
    value: string,
    context: { e: FormEvent<HTMLDivElement> | MouseEvent<HTMLDivElement> },
  ) => {
    setInputValue(value, { ...context, trigger: 'input-change' });
  };

  const renderSingleInput = () => (
    // TODO onEnter触发onSearch
    <Input
      ref={inputRef}
      {...commonInputProps}
      value={inputValue}
      autoWidth={props.autoWidth}
      onChange={onInnerInputChange}
      onClear={onInnerClear}
      onEnter={(val: string, context) => {
        props.onEnter?.({
          ...context,
          value: val,
        });
      }}
      onFocus={(val, context) => {
        props.onFocus?.({
          ...context,
          value: val,
        });
      }}
      onBlur={(val, context) => {
        props.onBlur?.({
          ...context,
          value: val,
        });
      }}
      inputClass={classNames(props.inputProps?.className)}
    />
  );
  return {
    inputRef,
    commonInputProps,
    renderSingleInput,
  };
}

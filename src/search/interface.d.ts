import { TdSearchProps } from './type';

export interface SearchCommonProperties {
  clearable?: TdSearchProps['clearable'];
  disabled?: TdSearchProps['disabled'];
  label?: TdSearchProps['label'];
  placeholder?: TdSearchProps['placeholder'];
  readonly?: TdSearchProps['readonly'];
  suffix?: TdSearchProps['suffix'];
  suffixIcon?: TdSearchProps['suffixIcon'];
  onEnter?: TdSearchProps['onEnter'];
}

export enum SearchCommonPropertiesEnum {
  'clearable',
  'disabled',
  'label',
  'placeholder',
  'readonly',
  'suffix',
  'suffixIcon',
  'onEnter',
}

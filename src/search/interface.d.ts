import { TdSearchProps } from './type';

export interface SearchCommonProperties {
  clearable?: TdSearchProps['clearable'];
  disabled?: TdSearchProps['disabled'];
  label?: TdSearchProps['label'];
  placeholder?: TdSearchProps['placeholder'];
  prefixIcon?: TdSearchProps['prefixIcon'];
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
  'prefixIcon',
  'readonly',
  'suffix',
  'suffixIcon',
  'onEnter',
}

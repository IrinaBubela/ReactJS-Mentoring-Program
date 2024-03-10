import React from 'react';
import { action } from '@storybook/addon-actions';
import SearchForm from '../components/SearchForm';
export default {
  title: 'SearchForm',
  component: SearchForm,
};

export const Default = () => (
  <SearchForm
    initialQuery=""
    onSearch={action('on search')}
  />
);

export const WithInitialQuery = () => (
  <SearchForm
    initialQuery="Initial Query"
    onSearch={action('on search')}
  />
);

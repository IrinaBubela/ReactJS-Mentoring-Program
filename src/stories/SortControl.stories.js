import React from 'react';
import { action } from '@storybook/addon-actions';
import SortControl from '../components/SortControl';

export default {
  title: 'SortControl',
  component: SortControl,
};

const Template = (args) => <SortControl {...args} />;

export const Default = Template.bind({});
Default.args = {
  currentSelection: 'releaseDate',
  onSortChange: action('Sort changed'),
};

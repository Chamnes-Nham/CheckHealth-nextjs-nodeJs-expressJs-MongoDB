// SelectField.stories.tsx
import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import SelectField from './select-field';

export default {
  title: 'molecules/selectField',
  component: SelectField,
  argTypes: {
    label: { control: 'text' },
    options: { control: 'object' },
    borderColor: { control: 'color' },
    labelColor: { control: 'color' },
    hoverBorderColor: { control: 'color' },
    focusBorderColor: { control: 'color' },
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof SelectField>;

const Template: StoryFn<typeof SelectField> = (args) => {
  const [value, setValue] = useState('');

  return (
    <SelectField
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const DefaultSelect = Template.bind({});
DefaultSelect.args = {
  label: 'Select an Option',
  options: [
    { value: 'option', label: ' ' },
    { value: 'option1', label: 'ប្រុស' },
    { value: 'option2', label: ' ស្រី' },
  ],
  
};

export const SelectWithInitialValue = Template.bind({});
SelectWithInitialValue.args = {
  label: 'Select an Option',
  value: 'option2',
  options: [
    { value: 'option', label: '' },
    { value: 'option1', label: 'ប្រុស' },
    { value: 'option2', label: 'ស្រី' },
  ],
};

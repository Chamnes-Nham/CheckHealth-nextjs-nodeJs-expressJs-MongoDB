import React, { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import InputField from "./input-field";

export default {
  title: "molecules/input-field",
  component: InputField,
  argTypes: {
    label: { control: "text" },
    type: { control: "text" },
   
  },
} as Meta<typeof InputField>;

const Template: StoryFn<typeof InputField> = (args: any) => {
  const [value, setValue] = useState("");

  return (
    <InputField
      {...args}
      value={value}
      onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
        setValue(e.target.value)
      }
    />
  );
};

export const DefaultInput = Template.bind({});
DefaultInput.args = {
  label: "Name",
  type: "text",
  
};

export const NumberInput = Template.bind({});
NumberInput.args = {
  label: "Age",
  type: "number",
  
};

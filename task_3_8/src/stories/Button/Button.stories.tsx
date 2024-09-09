import { Meta, StoryFn } from '@storybook/react';
import Button, { ButtonProps } from './Button';
import { FaPlay } from 'react-icons/fa';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
  },
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    icon: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
};

export const DisabledPrimary = Template.bind({});
DisabledPrimary.args = {
  variant: 'primary',
  disabled: true,
};

export const DisabledSecondary = Template.bind({});
DisabledSecondary.args = {
  variant: 'secondary',
  disabled: true,
};

export const PrimaryWithIcon = Template.bind({});
PrimaryWithIcon.args = {
  variant: 'primary',
  icon: <FaPlay />,
};

export const SecondaryWithIcon = Template.bind({});
SecondaryWithIcon.args = {
  variant: 'secondary',
  icon: <FaPlay />,
};

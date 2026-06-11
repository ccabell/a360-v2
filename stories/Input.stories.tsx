import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search'],
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default input
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    type: 'text',
  },
};

// Different types
export const Types: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4">
      <div>
        <label className="text-sm font-semibold text-slate-900 block mb-2">Text Input</label>
        <Input type="text" placeholder="Enter text..." />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-900 block mb-2">Email Input</label>
        <Input type="email" placeholder="you@example.com" />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-900 block mb-2">Password Input</label>
        <Input type="password" placeholder="••••••••" />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-900 block mb-2">Number Input</label>
        <Input type="number" placeholder="0" />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-900 block mb-2">Search Input</label>
        <Input type="search" placeholder="Search..." />
      </div>
    </div>
  ),
};

// States
export const States: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4">
      <div>
        <label className="text-sm font-semibold text-slate-900 block mb-2">Default (Empty)</label>
        <Input placeholder="Enter text..." />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-900 block mb-2">Filled</label>
        <Input value="Some text" readOnly />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-900 block mb-2">Disabled</label>
        <Input placeholder="Disabled input" disabled />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-900 block mb-2">With Error</label>
        <Input placeholder="Invalid input" className="border-red-500" />
        <p className="text-xs text-red-600 mt-1">This field is required</p>
      </div>
    </div>
  ),
};

// With labels
export const WithLabels: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4">
      <div>
        <label className="text-sm font-semibold text-slate-900 block mb-2">Search Treatments</label>
        <Input placeholder="e.g., Botox, Fillers..." />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-900 block mb-2">Email Address</label>
        <Input type="email" placeholder="you@aesthetics360.com" />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-900 block mb-2">Ask an agent...</label>
        <Input placeholder="What is the best treatment for..." />
      </div>
    </div>
  ),
};

// Interactive (with state)
export const Interactive: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    return (
      <div className="w-full max-w-sm space-y-4">
        <Input
          placeholder="Type something..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <p className="text-sm text-slate-600">
          Character count: <strong>{value.length}</strong>
        </p>
      </div>
    );
  },
};

// Search input
export const SearchInput: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <label className="text-sm font-semibold text-slate-900 block mb-2">Knowledge Base Search</label>
      <Input type="search" placeholder="Search treatments, research, evidence..." />
      <p className="text-xs text-slate-500 mt-2">Search across PubMed, YouTube, and internal docs</p>
    </div>
  ),
};

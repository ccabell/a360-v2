import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@/components/ui/badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default badge
export const Default: Story = {
  args: {
    children: 'Label',
    variant: 'default',
  },
};

// All variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

// Status badges
export const Status: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge className="bg-blue-100 text-blue-700">Info</Badge>
      <Badge className="bg-emerald-100 text-emerald-700">Success</Badge>
      <Badge className="bg-amber-100 text-amber-700">Warning</Badge>
      <Badge className="bg-red-100 text-red-700">Error</Badge>
    </div>
  ),
};

// Source type badges
export const SourceTypes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge className="bg-emerald-100 text-emerald-700">📚 PubMed</Badge>
      <Badge className="bg-red-100 text-red-700">🎥 YouTube</Badge>
      <Badge className="bg-blue-100 text-blue-700">📝 Internal</Badge>
      <Badge className="bg-orange-100 text-orange-700">📄 PDF</Badge>
      <Badge className="bg-purple-100 text-purple-700">🎙️ Podcast</Badge>
    </div>
  ),
};

// Tier badges
export const TierBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge className="bg-slate-100 text-slate-700">Tier 1: Foundation</Badge>
      <Badge className="bg-blue-100 text-blue-700">Tier 2: Advanced</Badge>
      <Badge className="bg-purple-100 text-purple-700">Tier 3: Premium</Badge>
      <Badge className="bg-amber-100 text-amber-700">RECOMMENDED</Badge>
    </div>
  ),
};

// With text styles
export const TextVariations: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="default">Regular Badge</Badge>
      <Badge variant="default" className="font-bold">
        Bold Badge
      </Badge>
      <Badge variant="outline" className="text-xs">
        Small Badge
      </Badge>
      <Badge variant="secondary" className="text-sm">
        Medium Badge
      </Badge>
    </div>
  ),
};

// In context
export const InContext: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-start justify-between p-4 border border-slate-200 rounded-lg">
        <div>
          <h4 className="font-semibold text-slate-900">Botox Treatment</h4>
          <p className="text-sm text-slate-600">FDA-approved dynamic wrinkles treatment</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-emerald-100 text-emerald-700">Verified</Badge>
          <Badge className="bg-blue-100 text-blue-700">Popular</Badge>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
        <div>
          <h4 className="font-semibold text-slate-900">Advanced Treatment Plan</h4>
          <p className="text-sm text-slate-600">$1,200 - $1,800 | 8-12 weeks</p>
        </div>
        <Badge className="bg-amber-100 text-amber-700">RECOMMENDED</Badge>
      </div>

      <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
        <div>
          <h4 className="font-semibold text-slate-900">Research Article</h4>
          <p className="text-sm text-slate-600">Clinical efficacy of modern injectables</p>
        </div>
        <Badge className="bg-emerald-100 text-emerald-700">📚 PubMed</Badge>
      </div>
    </div>
  ),
};

// Confidence scores
export const ConfidenceScores: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Badge className="bg-emerald-100 text-emerald-700">✓ 98% Confident</Badge>
      <Badge className="bg-blue-100 text-blue-700">✓ 92% Confident</Badge>
      <Badge className="bg-amber-100 text-amber-700">✓ 78% Confident</Badge>
      <Badge className="bg-slate-100 text-slate-700">⚠ 45% Confident</Badge>
    </div>
  ),
};

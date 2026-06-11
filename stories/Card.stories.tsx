import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic card
export const Default: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a card description</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-slate-700">Card content goes here.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

// Simple card (header only)
export const Simple: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Simple Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-700">Just header and content, no footer.</p>
      </CardContent>
    </Card>
  ),
};

// Info card
export const InfoCard: Story = {
  render: () => (
    <Card className="w-full max-w-md border-blue-200 bg-blue-50">
      <CardHeader>
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <CardTitle className="text-blue-900">Information</CardTitle>
            <CardDescription className="text-blue-700">
              This is an informational message
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-blue-800">Use this type of card to provide helpful information to users.</p>
      </CardContent>
    </Card>
  ),
};

// Success card
export const SuccessCard: Story = {
  render: () => (
    <Card className="w-full max-w-md border-emerald-200 bg-emerald-50">
      <CardHeader>
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5" />
          <div>
            <CardTitle className="text-emerald-900">Success!</CardTitle>
            <CardDescription className="text-emerald-700">
              Operation completed successfully
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-emerald-800">Your plan has been generated and saved.</p>
      </CardContent>
    </Card>
  ),
};

// Error card
export const ErrorCard: Story = {
  render: () => (
    <Card className="w-full max-w-md border-red-200 bg-red-50">
      <CardHeader>
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
          <div>
            <CardTitle className="text-red-900">Error</CardTitle>
            <CardDescription className="text-red-700">
              Something went wrong
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-red-800">Unable to process your request. Please try again.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="text-red-600">
          Retry
        </Button>
      </CardFooter>
    </Card>
  ),
};

// Empty state card
export const EmptyState: Story = {
  render: () => (
    <Card className="w-full max-w-md p-12 text-center border-dashed">
      <div className="flex justify-center mb-4">
        <div className="text-4xl">🔍</div>
      </div>
      <CardTitle className="mb-2">No results found</CardTitle>
      <CardDescription className="mb-6">
        Try adjusting your search terms or filters
      </CardDescription>
      <Button>Start New Search</Button>
    </Card>
  ),
};

// Loading state card
export const LoadingState: Story = {
  render: () => (
    <Card className="w-full max-w-md p-8 text-center bg-slate-50">
      <div className="flex items-center justify-center gap-3">
        <div className="animate-spin h-5 w-5 border-2 border-blue-400 border-t-blue-600 rounded-full" />
        <p className="text-slate-600 font-medium">Loading...</p>
      </div>
    </Card>
  ),
};

// With badge
export const WithBadge: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Advanced Treatment Plan</CardTitle>
            <CardDescription>$1,200 - $1,800 | 8-12 weeks</CardDescription>
          </div>
          <Badge className="bg-blue-100 text-blue-700">RECOMMENDED</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-slate-900 mb-2">Treatments</h4>
          <ul className="text-sm text-slate-700 space-y-1">
            <li>• Botox 40U</li>
            <li>• Dermal Fillers 2cc</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1">
          View Details
        </Button>
        <Button className="flex-1">Select Plan</Button>
      </CardFooter>
    </Card>
  ),
};

// Grid layout
export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Foundation</CardTitle>
          <CardDescription>$400-600</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-700">Basic treatment plan</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Advanced</CardTitle>
          <CardDescription>$1,200-1,800</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-700">Recommended treatment plan</p>
        </CardContent>
        <CardFooter>
          <Badge>Recommended</Badge>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Premium</CardTitle>
          <CardDescription>$2,500-4,000</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-700">Comprehensive treatment plan</p>
        </CardContent>
      </Card>
    </div>
  ),
};

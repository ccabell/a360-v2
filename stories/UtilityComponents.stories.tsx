import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const meta = {
  title: 'Components/Utility',
  tags: ['autodocs'],
};

export default meta;

// Separator stories
export const SeparatorBasic = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <h3 className="font-semibold text-slate-900">Section 1</h3>
      <p className="text-sm text-slate-600">Content for the first section goes here.</p>

      <Separator className="my-4" />

      <h3 className="font-semibold text-slate-900">Section 2</h3>
      <p className="text-sm text-slate-600">Content for the second section goes here.</p>

      <Separator className="my-4" />

      <h3 className="font-semibold text-slate-900">Section 3</h3>
      <p className="text-sm text-slate-600">Content for the third section goes here.</p>
    </div>
  ),
};

export const SeparatorVariations = {
  render: () => (
    <div className="w-full max-w-md space-y-6">
      <div>
        <h4 className="text-sm font-semibold text-slate-900 mb-3">Default Separator</h4>
        <Separator />
      </div>

      <div>
        <h4 className="text-sm font-semibold text-slate-900 mb-3">With Custom Margin</h4>
        <Separator className="my-8" />
      </div>

      <div>
        <h4 className="text-sm font-semibold text-slate-900 mb-3">In Card</h4>
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600">Content after separator</p>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};

// ScrollArea stories
export const ScrollAreaBasic = {
  render: () => (
    <div className="w-full max-w-md">
      <h3 className="font-semibold text-slate-900 mb-3">Scrollable Messages</h3>
      <ScrollArea className="h-[300px] border border-slate-200 rounded-lg p-4">
        <div className="space-y-4 pr-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="p-3 bg-blue-50 rounded-lg border border-blue-200"
            >
              <p className="text-sm text-blue-900">
                <strong>Message {i + 1}:</strong> This is a sample message in a scrollable area.
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
};

export const ScrollAreaVariations = {
  render: () => (
    <div className="w-full space-y-6">
      <div>
        <h4 className="text-sm font-semibold text-slate-900 mb-3">Short Scroll Area</h4>
        <ScrollArea className="h-[150px] border border-slate-200 rounded-lg p-4">
          <div className="space-y-2 pr-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <p key={i} className="text-sm text-slate-700">
                Line {i + 1}: Lorem ipsum dolor sit amet
              </p>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-slate-900 mb-3">Medium Scroll Area</h4>
        <ScrollArea className="h-[300px] border border-slate-200 rounded-lg p-4">
          <div className="space-y-3 pr-4">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded border border-slate-200">
                <p className="text-sm text-slate-700">
                  <strong>Item {i + 1}</strong> - Sample content
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-slate-900 mb-3">Large Scroll Area</h4>
        <ScrollArea className="h-[400px] border border-slate-200 rounded-lg p-4">
          <div className="space-y-4 pr-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="font-semibold text-blue-900">Citation {i + 1}</p>
                <p className="text-sm text-blue-700 mt-1">
                  Research evidence and source information displayed here.
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  ),
};

export const ScrollAreaWithMessages = {
  render: () => (
    <div className="w-full max-w-2xl">
      <h3 className="font-semibold text-slate-900 mb-3">Chat Message Area</h3>
      <ScrollArea className="h-[400px] border border-slate-200 rounded-lg p-4">
        <div className="space-y-4 pr-4">
          {/* User message */}
          <div className="flex justify-end">
            <div className="max-w-xs bg-blue-600 text-white rounded-lg p-3 rounded-br-none">
              <p className="text-sm">What are the best treatments for smile lines?</p>
            </div>
          </div>

          {/* Agent message */}
          <div className="flex justify-start">
            <div className="max-w-xs bg-slate-100 text-slate-900 rounded-lg p-3 rounded-bl-none">
              <p className="text-sm">
                For smile lines, several approaches are effective. Botox can provide some
                relaxation[1], though dermal fillers are typically more effective[2].
              </p>
            </div>
          </div>

          {/* User message */}
          <div className="flex justify-end">
            <div className="max-w-xs bg-blue-600 text-white rounded-lg p-3 rounded-br-none">
              <p className="text-sm">How long do results last?</p>
            </div>
          </div>

          {/* Agent message */}
          <div className="flex justify-start">
            <div className="max-w-xs bg-slate-100 text-slate-900 rounded-lg p-3 rounded-bl-none">
              <p className="text-sm">
                Botox results last 3-4 months[3], while fillers typically last 6-12 months[2].
              </p>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  ),
};

// Combined demo
export const CombinedDemo = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Component Showcase</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6 space-y-6">
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Scrollable Content Area</h4>
            <ScrollArea className="h-[250px] border border-slate-200 rounded-lg p-4">
              <div className="space-y-3 pr-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="p-2 bg-slate-50 rounded">
                    <p className="text-sm text-slate-700">Content item {i + 1}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Additional Information</h4>
            <p className="text-sm text-slate-600">This section is separated with a divider above.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};

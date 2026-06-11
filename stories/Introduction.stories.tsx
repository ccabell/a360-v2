import type { Meta } from '@storybook/react';

const meta = {
  title: 'Welcome',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

export const Introduction = () => (
  <div className="w-full max-w-4xl p-8 space-y-12">
    {/* Header */}
    <div className="space-y-4">
      <h1 className="text-4xl font-bold text-slate-900">A360 Component Library</h1>
      <p className="text-lg text-slate-600">
        Interactive showcase of all shadcn/ui and custom components used in the A360 platform.
      </p>
    </div>

    {/* Navigation */}
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900">📚 Browse Components</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Core UI */}
        <div className="p-6 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
          <h3 className="font-semibold text-slate-900 mb-3">Core UI Components</h3>
          <ul className="text-sm text-slate-600 space-y-2">
            <li>✓ <strong>Button</strong> - All variants and sizes</li>
            <li>✓ <strong>Input</strong> - Text inputs with states</li>
            <li>✓ <strong>Card</strong> - Container component</li>
            <li>✓ <strong>Badge</strong> - Labels and tags</li>
            <li>✓ <strong>Separator</strong> - Visual dividers</li>
            <li>✓ <strong>ScrollArea</strong> - Scrollable containers</li>
          </ul>
        </div>

        {/* Citation Components */}
        <div className="p-6 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
          <h3 className="font-semibold text-slate-900 mb-3">Citation Components</h3>
          <ul className="text-sm text-slate-600 space-y-2">
            <li>✓ <strong>MessageWithCitations</strong> - Messages with inline citations</li>
            <li>✓ <strong>ReferencesSection</strong> - Expandable reference list</li>
            <li>✓ <strong>InlineCitationBadge</strong> - [1] [2] [3] badges</li>
            <li>✓ <strong>ReferenceCard</strong> - Full citation details</li>
            <li>✓ <strong>Citation Types</strong> - 6 source types</li>
            <li>✓ <strong>Confidence Scores</strong> - Evidence ranking</li>
          </ul>
        </div>
      </div>
    </div>

    {/* Features */}
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900">✨ Key Features</h2>

      <div className="space-y-3">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-900">🎨 Interactive Editing</h4>
          <p className="text-sm text-blue-700 mt-1">
            Every component has editable props - change them in the Controls panel on the right
          </p>
        </div>

        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <h4 className="font-semibold text-emerald-900">📱 Responsive Design</h4>
          <p className="text-sm text-emerald-700 mt-1">
            View components at mobile (375px), tablet (768px), and desktop (1280px) sizes
          </p>
        </div>

        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h4 className="font-semibold text-purple-900">🔍 Detailed Documentation</h4>
          <p className="text-sm text-purple-700 mt-1">
            Each story includes usage examples, variations, and state demonstrations
          </p>
        </div>

        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <h4 className="font-semibold text-orange-900">🎯 Design System Reference</h4>
          <p className="text-sm text-orange-700 mt-1">
            See all design tokens (colors, spacing, typography) in action
          </p>
        </div>
      </div>
    </div>

    {/* Usage */}
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900">🚀 How to Use</h2>

      <ol className="space-y-3 text-slate-700">
        <li>
          <span className="font-semibold">1. Navigate</span> - Use the sidebar to browse components
        </li>
        <li>
          <span className="font-semibold">2. Explore</span> - Click on a component story to view
          it
        </li>
        <li>
          <span className="font-semibold">3. Edit</span> - Change props in the Controls panel
          (top-right)
        </li>
        <li>
          <span className="font-semibold">4. Resize</span> - Use the viewport selector to test
          responsive design
        </li>
        <li>
          <span className="font-semibold">5. Copy</span> - Use component code in your pages
        </li>
      </ol>
    </div>

    {/* Color System */}
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900">🎨 Design System</h2>

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-slate-900 mb-3">Text Colors</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-white border border-slate-200 rounded">
              <div className="text-slate-900 font-semibold mb-1">Primary</div>
              <p className="text-xs text-slate-600">slate-900</p>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded">
              <div className="text-slate-700 font-semibold mb-1">Secondary</div>
              <p className="text-xs text-slate-600">slate-700</p>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded">
              <div className="text-slate-600 mb-1">Tertiary</div>
              <p className="text-xs text-slate-600">slate-600</p>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded">
              <div className="text-slate-500 mb-1">Muted</div>
              <p className="text-xs text-slate-600">slate-500</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900 mb-3">Status Colors</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <div className="text-blue-900 font-semibold mb-1">Info</div>
              <p className="text-xs text-blue-700">blue-100</p>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded">
              <div className="text-emerald-900 font-semibold mb-1">Success</div>
              <p className="text-xs text-emerald-700">emerald-100</p>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded">
              <div className="text-amber-900 font-semibold mb-1">Warning</div>
              <p className="text-xs text-amber-700">amber-100</p>
            </div>
            <div className="p-3 bg-red-50 border border-red-200 rounded">
              <div className="text-red-900 font-semibold mb-1">Error</div>
              <p className="text-xs text-red-700">red-100</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900 mb-3">Spacing Scale</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-4">
              <span className="w-20 font-mono text-slate-600">p-4</span>
              <div className="h-4 bg-blue-300" style={{ width: '1rem' }}></div>
              <span className="text-slate-600">1rem (16px)</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-20 font-mono text-slate-600">p-6</span>
              <div className="h-4 bg-blue-300" style={{ width: '1.5rem' }}></div>
              <span className="text-slate-600">1.5rem (24px)</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-20 font-mono text-slate-600">p-8</span>
              <div className="h-4 bg-blue-300" style={{ width: '2rem' }}></div>
              <span className="text-slate-600">2rem (32px)</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Citation Types */}
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900">📖 Citation Source Types</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded">
          <p className="font-semibold text-emerald-900">📚 PubMed</p>
          <p className="text-xs text-emerald-700">Clinical research and peer-reviewed articles</p>
        </div>
        <div className="p-3 bg-red-50 border border-red-200 rounded">
          <p className="font-semibold text-red-900">🎥 YouTube</p>
          <p className="text-xs text-red-700">Video demonstrations and educational content</p>
        </div>
        <div className="p-3 bg-blue-50 border border-blue-200 rounded">
          <p className="font-semibold text-blue-900">📝 Supabase</p>
          <p className="text-xs text-blue-700">Internal product guides and documentation</p>
        </div>
        <div className="p-3 bg-orange-50 border border-orange-200 rounded">
          <p className="font-semibold text-orange-900">📄 PDF</p>
          <p className="text-xs text-orange-700">Downloadable whitepapers and guidelines</p>
        </div>
        <div className="p-3 bg-purple-50 border border-purple-200 rounded">
          <p className="font-semibold text-purple-900">🎙️ Transcript</p>
          <p className="text-xs text-purple-700">Consultation transcripts and recordings</p>
        </div>
        <div className="p-3 bg-slate-100 border border-slate-300 rounded">
          <p className="font-semibold text-slate-900">🤖 Agent Output</p>
          <p className="text-xs text-slate-700">AI-generated recommendations and analysis</p>
        </div>
      </div>
    </div>

    {/* Next Steps */}
    <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="font-semibold text-blue-900 mb-3">📌 Next Steps</h3>
      <ul className="text-sm text-blue-700 space-y-2">
        <li>✓ Browse all components in the sidebar</li>
        <li>✓ Try editing component props in the Controls panel</li>
        <li>✓ Test responsive design using the viewport selector</li>
        <li>✓ Use these components when building pages</li>
        <li>✓ Reference the design system colors and spacing</li>
      </ul>
    </div>

    {/* Footer */}
    <div className="text-center text-sm text-slate-600 pt-8 border-t border-slate-200">
      <p>
        Built with <strong>Storybook</strong> and <strong>shadcn/ui</strong> • A360 Design System
      </p>
    </div>
  </div>
);

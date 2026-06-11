import type { Meta, StoryObj } from '@storybook/react';
import { ReferencesSection } from '@/components/citations/references-section';
import type { Citation } from '@/components/citations/types';
import { useState } from 'react';

const meta = {
  title: 'Components/Citations/ReferencesSection',
  component: ReferencesSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ReferencesSection>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample citations
const sampleCitations: Citation[] = [
  {
    id: 'cit_1',
    number: 1,
    sourceType: 'pubmed',
    sourceId: '12345678',
    title: 'Clinical Efficacy of Botulinum Toxin Type A in Aesthetic Dermatology',
    evidence: 'FDA-approved for dynamic wrinkles, onset 3-7 days',
    confidence: 0.98,
    metadata: {
      pmid: '12345678',
      journal: 'Journal of Dermatology',
      authors: 'Smith J, Johnson K, Williams R',
      year: 2024,
      doi: '10.1234/jderm.2024.123456',
    },
  },
  {
    id: 'cit_2',
    number: 2,
    sourceType: 'youtube',
    sourceId: 'dQw4w9WgXcQ',
    title: 'Advanced Injectable Techniques - Expert Masterclass',
    evidence: 'Professional demonstration of proper injection placement',
    confidence: 0.95,
    metadata: {
      videoId: 'dQw4w9WgXcQ',
      channel: 'Aesthetic Medicine Academy',
      duration: '45:32',
      views: 125000,
    },
  },
  {
    id: 'cit_3',
    number: 3,
    sourceType: 'supabase',
    sourceId: 'prod_botox_001',
    title: 'Botox - Complete Product Information Guide',
    evidence: 'Recommended dosage: 20-40 units per treatment area',
    confidence: 0.99,
    metadata: {
      productId: 'prod_botox_001',
      category: 'Neurotoxins',
      manufacturer: 'Allergan',
      lastUpdated: '2024-06-01',
    },
  },
];

// Default expanded
export const Default: Story = {
  args: {
    citations: sampleCitations,
    defaultExpanded: true,
  },
};

// Default collapsed
export const Collapsed: Story = {
  args: {
    citations: sampleCitations,
    defaultExpanded: false,
  },
};

// Single citation
export const SingleCitation: Story = {
  args: {
    citations: [sampleCitations[0]],
    defaultExpanded: true,
  },
};

// Many citations
export const ManyCitations: Story = {
  args: {
    citations: Array.from({ length: 8 }, (_, i) => ({
      id: `cit_${i + 1}`,
      number: i + 1,
      sourceType: (
        ['pubmed', 'youtube', 'supabase', 'pdf', 'transcript', 'agent_output'] as const
      )[i % 6],
      sourceId: `source_${i + 1}`,
      title: `Citation ${i + 1}: Research Article or Resource`,
      evidence: `Key evidence point from source ${i + 1}`,
      confidence: 0.85 + Math.random() * 0.15,
      metadata: {
        id: `meta_${i + 1}`,
        date: '2024-06-11',
      },
    })),
    defaultExpanded: false,
  },
};

// Mixed sources
export const MixedSources: Story = {
  args: {
    citations: [
      {
        id: 'cit_1',
        number: 1,
        sourceType: 'pubmed',
        sourceId: '11111111',
        title: 'Clinical Trial: Botox in Forehead Lines',
        evidence: 'Statistically significant improvement in wrinkle depth',
        confidence: 0.97,
        metadata: {
          pmid: '11111111',
          journal: 'Dermatology Research',
          year: 2024,
        },
      },
      {
        id: 'cit_2',
        number: 2,
        sourceType: 'youtube',
        sourceId: 'video123',
        title: 'Injection Technique Video - Before & After',
        evidence: 'Proper placement for natural-looking results',
        confidence: 0.92,
        metadata: {
          videoId: 'video123',
          channel: 'Dr. Smith Aesthetics',
          duration: '12:45',
        },
      },
      {
        id: 'cit_3',
        number: 3,
        sourceType: 'pdf',
        sourceId: 'pdf456',
        title: 'Botox Safety and Efficacy Whitepaper',
        evidence: 'Comprehensive safety profile when used appropriately',
        confidence: 0.96,
        metadata: {
          filename: 'botox_safety.pdf',
          author: 'Allergan Medical',
          pages: 28,
        },
      },
      {
        id: 'cit_4',
        number: 4,
        sourceType: 'transcript',
        sourceId: 'trans789',
        title: 'Patient Consultation - Real Results Discussed',
        evidence: 'Patient reports 80% improvement in forehead wrinkles',
        confidence: 0.88,
        metadata: {
          transcriptId: 'trans789',
          date: '2024-06-10',
        },
      },
      {
        id: 'cit_5',
        number: 5,
        sourceType: 'supabase',
        sourceId: 'prod_botox',
        title: 'Product Database - Botox Specifications',
        evidence: 'FDA-approved product with established dosing guidelines',
        confidence: 0.99,
        metadata: {
          productId: 'prod_botox',
          category: 'Neurotoxins',
        },
      },
    ],
    defaultExpanded: false,
  },
};

// Interactive with toggle
export const Interactive: Story = {
  render: function Render() {
    const [expanded, setExpanded] = useState(false);
    return (
      <div className="w-full max-w-2xl space-y-4">
        <ReferencesSection
          citations={sampleCitations}
          defaultExpanded={expanded}
          onExpandChange={setExpanded}
        />
        <div className="text-sm text-slate-600">
          {expanded ? '✓ References expanded' : '→ References collapsed'}
        </div>
      </div>
    );
  },
};

// In context - after a message
export const InContext: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-4">
      {/* Message */}
      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
        <p className="text-slate-900">
          Botox is FDA-approved for dynamic wrinkles[1] and works best when combined with a good
          skincare routine[2]. Results typically appear within 3-7 days[3].
        </p>
      </div>

      {/* References section */}
      <ReferencesSection citations={sampleCitations} defaultExpanded={false} />
    </div>
  ),
};

// Minimal styling
export const Minimal: Story = {
  args: {
    citations: sampleCitations,
    defaultExpanded: true,
    className: 'mt-4',
  },
};

// With different confidence levels
export const VariedConfidence: Story = {
  args: {
    citations: [
      {
        id: 'cit_1',
        number: 1,
        sourceType: 'pubmed',
        sourceId: 'p1',
        title: 'Highly Confident Source',
        evidence: 'Well-established clinical evidence',
        confidence: 0.99,
        metadata: { pmid: 'p1', year: 2024 },
      },
      {
        id: 'cit_2',
        number: 2,
        sourceType: 'pubmed',
        sourceId: 'p2',
        title: 'Moderately Confident Source',
        evidence: 'Some supporting evidence available',
        confidence: 0.75,
        metadata: { pmid: 'p2', year: 2023 },
      },
      {
        id: 'cit_3',
        number: 3,
        sourceType: 'transcript',
        sourceId: 't1',
        title: 'Lower Confidence Source',
        evidence: 'Anecdotal patient experience',
        confidence: 0.60,
        metadata: { transcriptId: 't1' },
      },
    ],
    defaultExpanded: true,
  },
};

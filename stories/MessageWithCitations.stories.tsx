import type { Meta, StoryObj } from '@storybook/react';
import { MessageWithCitations } from '@/components/citations/message-with-citations';
import type { Citation } from '@/components/citations/types';

const meta = {
  title: 'Components/Citations/MessageWithCitations',
  component: MessageWithCitations,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MessageWithCitations>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample citations for stories
const pubmedCitation: Citation = {
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
};

const youtubeCitation: Citation = {
  id: 'cit_2',
  number: 2,
  sourceType: 'youtube',
  sourceId: 'dQw4w9WgXcQ',
  title: 'Advanced Injectable Techniques - Masterclass',
  evidence: 'Expert demonstration of proper injection techniques',
  confidence: 0.95,
  metadata: {
    videoId: 'dQw4w9WgXcQ',
    channel: 'Aesthetic Medicine Academy',
    duration: '45:32',
    views: 125000,
  },
};

const supabaseCitation: Citation = {
  id: 'cit_3',
  number: 3,
  sourceType: 'supabase',
  sourceId: 'prod_botox_001',
  title: 'Botox - Product Information Guide',
  evidence: 'Recommended dosage: 20-40 units per treatment area',
  confidence: 0.99,
  metadata: {
    productId: 'prod_botox_001',
    category: 'Neurotoxins',
    manufacturer: 'Allergan',
    lastUpdated: '2024-06-01',
  },
};

// Basic message with one citation
export const SingleCitation: Story = {
  args: {
    role: 'agent',
    message: "Botox is FDA-approved for dynamic wrinkles[1] and typically takes 3-7 days for full effect.",
    citations: [pubmedCitation],
  },
};

// Message with multiple citations
export const MultipleCitations: Story = {
  args: {
    role: 'agent',
    message:
      "Botox is FDA-approved for dynamic wrinkles[1]. The best injection technique is demonstrated in this masterclass[2]. The recommended dosage is 20-40 units per treatment area[3].",
    citations: [pubmedCitation, youtubeCitation, supabaseCitation],
  },
};

// User message (no citations)
export const UserMessage: Story = {
  args: {
    role: 'user',
    message: 'What is the best approach for treating forehead wrinkles?',
    citations: [],
  },
};

// Longer agent response
export const LongResponse: Story = {
  args: {
    role: 'agent',
    message:
      'For forehead wrinkles, there are several effective approaches. Botox is FDA-approved for dynamic wrinkles[1] and works by relaxing the muscles that cause expression lines. The treatment typically takes effect within 3-7 days, with maximum results visible after 2 weeks[1]. For deeper wrinkles, dermal fillers can be combined with Botox for optimal results[2]. The recommended dosage for the forehead is 20-25 units of Botox, with proper injection technique critical for natural-looking results[3]. Most patients require touch-ups every 3-4 months to maintain results.',
    citations: [pubmedCitation, youtubeCitation, supabaseCitation],
  },
};

// With mixed source types
export const MixedSources: Story = {
  args: {
    role: 'agent',
    message:
      'Botox is a neurotoxin that works by blocking acetylcholine release[1] and is available in several FDA-approved brands[2]. The procedure takes about 10-15 minutes[3]. Patients can return to normal activities immediately after treatment.',
    citations: [
      {
        id: 'cit_1',
        number: 1,
        sourceType: 'pubmed',
        sourceId: '11111111',
        title: 'Mechanism of Action: Botulinum Toxin',
        evidence: 'Blocks acetylcholine at neuromuscular junction',
        confidence: 0.99,
        metadata: { pmid: '11111111', journal: 'Science', year: 2023 },
      },
      {
        id: 'cit_2',
        number: 2,
        sourceType: 'supabase',
        sourceId: 'prod_botox_002',
        title: 'FDA-Approved Botox Brands',
        evidence: 'Botox, Dysport, Xeomin all FDA-approved',
        confidence: 0.98,
        metadata: { productId: 'prod_botox_002', category: 'Neurotoxins' },
      },
      {
        id: 'cit_3',
        number: 3,
        sourceType: 'transcript',
        sourceId: 'trans_001',
        title: 'Patient Consultation Transcript',
        evidence: 'Typical procedure duration 10-15 minutes',
        confidence: 0.9,
        metadata: { transcriptId: 'trans_001', date: '2024-06-10' },
      },
    ],
  },
};

// Conversation flow
export const ConversationFlow: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      {/* User message */}
      <MessageWithCitations
        role="user"
        message="What are the most effective treatments for smile lines?"
        citations={[]}
      />

      {/* Agent response with citations */}
      <MessageWithCitations
        role="agent"
        message="For smile lines (nasolabial folds), several approaches are effective. Botox can provide some relaxation of the muscles contributing to these lines[1], though dermal fillers are typically more effective for direct volume restoration[2]. Many practitioners recommend a combination approach for optimal results[3]."
        citations={[
          {
            id: 'cit_1',
            number: 1,
            sourceType: 'pubmed',
            sourceId: '22222222',
            title: 'Treatment of Nasolabial Folds',
            evidence: 'Botox provides moderate improvement in smile lines',
            confidence: 0.85,
            metadata: { pmid: '22222222', journal: 'Dermatology Today', year: 2024 },
          },
          {
            id: 'cit_2',
            number: 2,
            sourceType: 'pubmed',
            sourceId: '33333333',
            title: 'Dermal Fillers for Facial Rejuvenation',
            evidence: 'Hyaluronic acid fillers effective for nasolabial folds',
            confidence: 0.96,
            metadata: { pmid: '33333333', journal: 'Aesthetic Surgery Journal', year: 2024 },
          },
          {
            id: 'cit_3',
            number: 3,
            sourceType: 'youtube',
            sourceId: 'xyz123',
            title: 'Combination Approach to Smile Lines',
            evidence: 'Expert technique combining Botox and fillers',
            confidence: 0.92,
            metadata: { videoId: 'xyz123', channel: 'Med Aesthetics Pro' },
          },
        ]}
      />

      {/* Follow-up user message */}
      <MessageWithCitations
        role="user"
        message="What about duration? How long do results last?"
        citations={[]}
      />

      {/* Follow-up agent response */}
      <MessageWithCitations
        role="agent"
        message="Botox results typically last 3-4 months[1], while dermal fillers vary by type - hyaluronic acid fillers usually last 6-12 months depending on product and location[2]. Some patients combine treatments for extended results[3]."
        citations={[
          {
            id: 'cit_4',
            number: 1,
            sourceType: 'pubmed',
            sourceId: '44444444',
            title: 'Duration of Botox Results',
            evidence: 'Average duration 3-4 months, range 2-6 months',
            confidence: 0.97,
            metadata: { pmid: '44444444', journal: 'Plastic Surgery Journal', year: 2024 },
          },
          {
            id: 'cit_5',
            number: 2,
            sourceType: 'supabase',
            sourceId: 'prod_filler_001',
            title: 'Dermal Filler Duration Guide',
            evidence: 'HA fillers 6-12 months, polynomials 18+ months',
            confidence: 0.95,
            metadata: { productId: 'prod_filler_001', category: 'Fillers' },
          },
          {
            id: 'cit_6',
            number: 3,
            sourceType: 'transcript',
            sourceId: 'trans_002',
            title: 'Patient Results Discussion',
            evidence: 'Combined approach extends duration to 6-8 months',
            confidence: 0.88,
            metadata: { transcriptId: 'trans_002', date: '2024-06-11' },
          },
        ]}
      />
    </div>
  ),
};

// Dense citations
export const DenseCitations: Story = {
  args: {
    role: 'agent',
    message:
      'Botox[1] works by blocking acetylcholine[2] at the neuromuscular junction[3]. FDA approval came in 2002[4]. The mechanism was discovered in 1989[5]. Results appear within 3-7 days[1] and peak at 2 weeks[6]. Duration is typically 3-4 months[7]. Cost ranges from $200-600 per area[8]. Complications are rare[9] when administered by trained professionals[10].',
    citations: Array.from({ length: 10 }, (_, i) => ({
      id: `cit_${i + 1}`,
      number: i + 1,
      sourceType: (
        ['pubmed', 'youtube', 'supabase', 'pdf', 'transcript'] as const
      )[i % 5],
      sourceId: `source_${i + 1}`,
      title: `Citation ${i + 1}`,
      evidence: `Evidence point ${i + 1}`,
      confidence: 0.85 + Math.random() * 0.15,
      metadata: { id: `meta_${i + 1}` },
    })),
  },
};

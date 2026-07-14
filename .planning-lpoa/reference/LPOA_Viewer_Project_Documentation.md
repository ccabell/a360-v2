# LPOA Viewer Project Documentation

**Project name:** LPOA Viewer  
**Product:** Laser Parameter Optimization Assistant UI Prototype  
**Owner:** A360 / Chris Cabell  
**Document version:** 1.0  
**Target host:** Vercel first; GitHub repository as source of truth  
**Primary implementation target:** Next.js \+ TypeScript \+ Tailwind CSS

---

## 1\. Executive Summary

LPOA Viewer is a standalone web prototype for the Laser Parameter Optimization Assistant. It provides a simple PDF viewer, patient context panel, chat assistant panel, and optional laser/device control panel. The purpose is to create a realistic UI shell that can be used immediately for demos in mock mode and later connected to a Dify Chatflow, A360 backend, or AWS-based production RAG system.

The prototype should not attempt to perform real parameter optimization in V1. It should demonstrate the intended product experience:

- View a device manual or treatment document.  
- Ask questions about the document.  
- Toggle patient context on or off.  
- Display structured AI answers.  
- Show safety flags and missing information.  
- Show a confidence-gated device control panel.  
- Keep treatment settings locked unless evidence and required patient context are sufficient.  
- Provide citations that can navigate back to PDF pages.

The app is a prototype clinical-reference interface. It does not diagnose, prescribe, replace clinical judgment, or control any device.

---

## 2\. Product Context

A360 is exploring LPOA as a clinical reference and treatment-planning assistant for laser and energy-based aesthetic devices. The larger long-term vision is to create a repeatable process where each device can have its own AI assistant, knowledge base, patient-aware reasoning layer, and UI widgets for device-specific controls.

For V1, the project focuses on the front-end shell and interaction model:

- PDF viewer  
- Chat assistant  
- Patient context  
- Optional control panel  
- Mock structured responses  
- Server-side Dify adapter scaffold

The existing `lpoaViewer` repo can be used as inspiration because it already includes a React PDF viewer, patient information capture, and an AI assistant concept. However, this project should be built fresh and should not depend on Pulse or the previous project structure.

---

## 3\. Project Goals

### 3.1 Primary Goals

1. Build a standalone web app that can be deployed quickly.  
2. Provide a clean PDF viewing experience.  
3. Provide a collapsible assistant panel.  
4. Provide an optional LPOA controls panel.  
5. Support placeholder/editable patient context.  
6. Return structured mock LPOA responses.  
7. Normalize future Dify responses into the same structured UI shape.  
8. Be simple enough to demo quickly, but clean enough to extend.

### 3.2 Secondary Goals

1. Establish the future UI architecture for device-specific widgets.  
2. Establish a confidence-gated controls model.  
3. Establish a reusable response schema.  
4. Establish a backend route that hides Dify/API keys from the client.  
5. Establish a foundation that can later move to an A360 AWS backend.

---

## 4\. Non-Goals for V1

The V1 prototype should not include:

- Real vector search inside the app  
- PDF ingestion/chunking  
- User authentication  
- Database persistence  
- Real patient records  
- EHR integration  
- Real treatment recommendations  
- Direct laser/device control  
- Billing  
- Multi-practice permissions  
- Full admin tools  
- Full production clinical validation  
- Complex annotation tools  
- Flipbook PDF viewing  
- Image analysis  
- Body maps  
- AWS infrastructure deployment

These may be considered in later versions.

---

## 5\. Target User Experience

### 5.1 Primary Demo Scenario

A clinician opens the LPOA Viewer, loads a Sciton Joule manual PDF, sees a placeholder patient, opens the assistant, and asks:

A Fitzpatrick IV patient with melasma, prior PIH, and minimal downtime preference is interested in BBL. What should I consider before selecting settings, and which controls should remain locked?

The app should respond with:

- Patient-aware safety considerations  
- Explanation that settings are locked  
- Missing patient intake details  
- Safety flags  
- Citation chips  
- Suggested follow-up questions  
- A control panel where fluence/pulse width/filter/etc. are locked unless source-supported

### 5.2 Overall Layout

Desktop layout:

\-------------------------------------------------------------

| Header: LPOA Viewer | PDF title | Assistant | Controls    |

\-------------------------------------------------------------

|                                                           |

|  PDF Viewer                               Right Panel      |

|  \- iframe/manual                          \- Assistant      |

|  \- URL input                              \- Controls       |

|  \- page navigation via citation hash      \- Patient        |

|                                           \- Evidence       |

|                                                           |

\-------------------------------------------------------------

Mobile/tablet layout:

- PDF viewer appears first.  
- Assistant and controls appear as collapsible panels or drawers.  
- Desktop is the priority; mobile should remain functional.

---

## 6\. Core Application Features

### 6.1 PDF Viewer

The PDF viewer should be intentionally simple for V1.

Requirements:

- Use native browser PDF viewer via `iframe`.  
- Default PDF path: `/docs/sample-manual.pdf`.  
- App must run even if the PDF does not exist.  
- If no PDF loads, show a friendly empty state.  
- Allow user to paste a PDF URL.  
- Provide a `Load PDF` button.  
- Support citation navigation by appending `#page={pageNumber}` to the iframe URL.  
- Do not implement PDF parsing in V1.  
- Do not implement flipbook in V1.

Empty state copy:

No PDF loaded yet.

Add a PDF to public/docs/sample-manual.pdf or paste a PDF URL above.

### 6.2 Assistant Panel

The assistant panel should be optional and collapsible.

It should include:

- Welcome message  
- Chat history  
- User input  
- Send button  
- Suggested questions  
- Loading state  
- Error state  
- Mock/Dify mode indicator

Default welcome message:

Hi, I’m the LPOA assistant. I can help review the device manual, patient context, safety considerations, and source-supported parameter guidance. For this prototype, responses are mocked unless Dify environment variables are configured.

Starter questions:

- What should I consider for a Fitzpatrick IV patient interested in BBL?  
- What safety concerns should I check before choosing settings?  
- Show me a control panel for this device.  
- What information is missing before parameter selection?  
- Summarize the most important contraindications.

### 6.3 Patient Context

The app should include a placeholder patient profile that can be used or removed from the assistant context.

Default patient:

name: Jane Doe

age: 42

sex: Female

fitzpatrickSkinType: IV

primaryConcern: Melasma and uneven pigmentation

treatmentInterest: BBL / HALO / MOXI

relevantHistory: Mild post-inflammatory hyperpigmentation after prior aesthetic treatments

contraindications: None documented

medications: None documented

pregnancyLactation: Not documented

recentSunExposure: Not documented

downtimePreference: Minimal downtime

clinicalNotes: Cautious patient, wants conservative treatment, concerned about pigmentation risk

User actions:

- Toggle `Use Patient Context`  
- View patient summary  
- Edit patient fields  
- Save changes  
- Reset to demo patient  
- Clear patient context

Persistence:

- Store in React state.  
- Persist to `localStorage` for V1.  
- No database in V1.

### 6.4 LPOA Controls Panel

The LPOA controls panel should not always be visible. It should be toggleable from the header or assistant response.

It should show:

- Device selector  
- Module selector  
- Treatment goal selector  
- Treatment area selector  
- Fitzpatrick type selector  
- Confidence/status card  
- Required intake checklist  
- Machine controls  
- Safety flags  
- Missing information  
- Settings locked/unlocked state

Default device state:

device: Sciton Joule

module: BBL

treatmentGoal: Pigmentation

treatmentArea: Not specified

fitzpatrickSkinType: IV

Default controls:

| Control | Default status | Default reason |
| :---- | :---- | :---- |
| Filter | locked | Requires source-supported protocol |
| Fluence | locked | Requires source-supported protocol |
| Pulse Width | locked | Requires source-supported protocol |
| Spot Size | locked | Requires source-supported protocol |
| Cooling | review\_required | Verify cooling guidance and patient risk factors |
| Passes | locked | Requires clinician/practice protocol |
| Endpoint | review\_required | Review manual/practice protocol |

The controls panel should be schema-driven so future device packs can replace the default Sciton data.

---

## 7\. Clinical Safety and Confidence Model

### 7.1 Safety Disclaimer

Display this somewhere visible but not disruptive:

LPOA Viewer is a prototype clinical reference interface. It does not diagnose, prescribe, replace clinical judgment, or control a device. Settings should only be used when validated against manufacturer documentation and practice-approved protocols.

### 7.2 Confidence Levels

| Level | Label | UI Behavior |
| :---- | :---- | :---- |
| 0 | No evidence found | Education only; no settings |
| 1 | Documentation found, education only | Settings locked; show safety/missing info |
| 2 | Source-supported starting considerations | May show documented values with citations |
| 3 | Practice-approved recommendation | May show practice-approved settings |
| 4 | Future adaptive optimization | Future only; not used in V1 |

V1 default:

confidenceLevel: 1

settingsAllowed: false

### 7.3 Settings Lock Rule

Settings should remain locked unless:

1. Relevant device/module is clear.  
2. Treatment goal is clear.  
3. Patient details are sufficient.  
4. Source-supported parameter guidance is available.  
5. No unresolved safety blockers exist.  
6. Response has citations.

If any required information is missing, the UI should state:

Settings are locked because the prototype does not have enough source-supported evidence for this exact patient/device/use case.

### 7.4 Common Safety Flags

Examples:

- Fitzpatrick IV-VI  
- Melasma concern  
- Prior PIH  
- Recent sun exposure unknown  
- Medication/photosensitizer review incomplete  
- Pregnancy/lactation status unknown  
- Treatment area missing  
- Practice protocol not confirmed  
- Manufacturer protocol not retrieved

---

## 8\. Technical Architecture

### 8.1 High-Level Architecture

V1 architecture:

Browser UI

  |

  | POST /api/lpoa/query

  v

Next.js API Route

  |-- Mock response engine by default

  |-- Dify adapter if configured

  v

Normalized LPOA response

  |

  v

React UI updates answer, controls, citations, flags

Future architecture:

React UI

  |

  v

A360 LPOA API

  |

  |-- Dify Chatflow or Bedrock Agent

  |-- Global/Practice Library

  |-- Evidence/citation service

  |-- Device pack/widget service

  |-- Audit/event logging

  v

Structured LPOA response

### 8.2 Recommended Stack

- Next.js App Router  
- TypeScript  
- Tailwind CSS  
- React  
- lucide-react icons  
- Native iframe PDF viewer  
- Vercel deployment  
- Dify API via server-side route when configured

### 8.3 Security Principle

No external AI API key should ever be used in client-side code. Dify calls must go through the server route.

---

## 9\. Repository Structure

Recommended structure:

lpoa-viewer/

  app/

    page.tsx

    layout.tsx

    globals.css

    api/

      lpoa/

        query/

          route.ts

  src/

    components/

      AppHeader.tsx

      PdfViewer.tsx

      AssistantPanel.tsx

      ChatMessage.tsx

      PatientPanel.tsx

      ControlsPanel.tsx

      ControlField.tsx

      ConfidenceCard.tsx

      EvidencePanel.tsx

      SuggestedQuestions.tsx

      EmptyState.tsx

      ResizableShell.tsx

    lib/

      mockLpoa.ts

      difyClient.ts

      localStorage.ts

      sampleData.ts

      utils.ts

    types/

      lpoa.ts

      patient.ts

      device.ts

  public/

    docs/

      README.md

  .env.example

  README.md

  package.json

  tsconfig.json

  tailwind.config.ts

---

## 10\. Type Definitions

### 10.1 PatientContext

export interface PatientContext {

  name: string;

  age: string;

  sex: string;

  fitzpatrickSkinType: string;

  primaryConcern: string;

  treatmentInterest: string;

  relevantHistory: string;

  contraindications: string;

  medications: string;

  pregnancyLactation: string;

  recentSunExposure: string;

  downtimePreference: string;

  clinicalNotes: string;

}

### 10.2 DeviceState

export interface DeviceState {

  device: string;

  module: string;

  treatmentGoal: string;

  treatmentArea: string;

  fitzpatrickSkinType: string;

}

### 10.3 Control Status

export type ControlStatus \=

  | "locked"

  | "available"

  | "review\_required"

  | "not\_applicable";

### 10.4 ControlFieldState

export interface ControlFieldState {

  id: string;

  label: string;

  value?: string;

  unit?: string;

  status: ControlStatus;

  reason?: string;

  controlType?: "select" | "slider" | "number" | "text" | "checklist";

  options?: string\[\];

  min?: number;

  max?: number;

}

### 10.5 ControlPanelState

export interface ControlPanelState {

  device: string;

  module: string;

  treatmentGoal: string;

  treatmentArea?: string;

  fitzpatrickSkinType?: string;

  controls: ControlFieldState\[\];

}

### 10.6 Citation

export interface Citation {

  label: string;

  page?: number;

  section?: string;

  sourceTitle?: string;

  relevance?: number;

}

### 10.7 LpoaQueryRequest

export interface LpoaQueryRequest {

  question: string;

  pdfId?: string;

  pdfTitle?: string;

  usePatientContext: boolean;

  patient?: PatientContext | null;

  deviceState?: DeviceState;

  mode?: "mock" | "dify";

}

### 10.8 LpoaQueryResponse

export interface LpoaQueryResponse {

  answer: string;

  summary: string;

  confidenceLevel: 0 | 1 | 2 | 3 | 4;

  settingsAllowed: boolean;

  settingsStatusReason: string;

  safetyFlags: string\[\];

  missingInformation: string\[\];

  citations: Citation\[\];

  suggestedQuestions: string\[\];

  controlPanel: ControlPanelState;

}

### 10.9 ChatMessage

export interface ChatMessage {

  id: string;

  role: "user" | "assistant";

  content: string;

  createdAt: string;

  response?: LpoaQueryResponse;

}

---

## 11\. API Documentation

### 11.1 Endpoint

POST /api/lpoa/query

### 11.2 Purpose

Send a user question, optional patient context, and optional device state to the LPOA query service. In V1, the route returns mock data by default. If Dify environment variables are present and `LPOA_MODE=dify`, the route calls Dify and normalizes the result.

### 11.3 Request Body

{

  "question": "A Fitzpatrick IV patient with melasma is interested in BBL. What should I consider?",

  "pdfId": "sciton-joule",

  "pdfTitle": "Sciton Joule Operator Manual",

  "usePatientContext": true,

  "patient": {

    "name": "Jane Doe",

    "age": "42",

    "sex": "Female",

    "fitzpatrickSkinType": "IV",

    "primaryConcern": "Melasma and uneven pigmentation",

    "treatmentInterest": "BBL / HALO / MOXI",

    "relevantHistory": "Mild post-inflammatory hyperpigmentation after prior aesthetic treatments",

    "contraindications": "None documented",

    "medications": "None documented",

    "pregnancyLactation": "Not documented",

    "recentSunExposure": "Not documented",

    "downtimePreference": "Minimal downtime",

    "clinicalNotes": "Cautious patient, wants conservative treatment, concerned about pigmentation risk"

  },

  "deviceState": {

    "device": "Sciton Joule",

    "module": "BBL",

    "treatmentGoal": "Pigmentation",

    "treatmentArea": "Not specified",

    "fitzpatrickSkinType": "IV"

  },

  "mode": "mock"

}

### 11.4 Response Body

{

  "answer": "For this patient, settings should remain locked until missing safety information is clarified...",

  "summary": "Safety-focused review for Fitzpatrick IV patient interested in BBL.",

  "confidenceLevel": 1,

  "settingsAllowed": false,

  "settingsStatusReason": "Settings are locked because required patient details and source-supported parameter evidence are missing.",

  "safetyFlags": \[

    "Fitzpatrick IV",

    "Melasma concern",

    "Prior PIH",

    "Recent sun exposure not documented"

  \],

  "missingInformation": \[

    "Recent sun exposure",

    "Medication/photosensitizer review",

    "Treatment area",

    "Practice-approved protocol"

  \],

  "citations": \[

    {

      "label": "Safety / Eye Protection",

      "page": 8,

      "section": "Safety and Regulatory Compliance",

      "sourceTitle": "Sciton Joule Operator Manual",

      "relevance": 0.92

    }

  \],

  "suggestedQuestions": \[

    "What information is missing before selecting settings?",

    "What safety issues matter for this patient?",

    "Which controls should remain locked?"

  \],

  "controlPanel": {

    "device": "Sciton Joule",

    "module": "BBL",

    "treatmentGoal": "Pigmentation",

    "treatmentArea": "Not specified",

    "fitzpatrickSkinType": "IV",

    "controls": \[

      {

        "id": "fluence",

        "label": "Fluence",

        "status": "locked",

        "reason": "Requires source-supported protocol"

      }

    \]

  }

}

### 11.5 Error Handling

The endpoint should return normalized errors:

{

  "answer": "I could not complete the request. Please try again or switch to mock mode.",

  "summary": "Error",

  "confidenceLevel": 0,

  "settingsAllowed": false,

  "settingsStatusReason": "Error while processing request.",

  "safetyFlags": \[\],

  "missingInformation": \[\],

  "citations": \[\],

  "suggestedQuestions": \["Try again", "Ask a simpler question"\],

  "controlPanel": {

    "device": "Sciton Joule",

    "module": "BBL",

    "treatmentGoal": "General Manual Question",

    "controls": \[\]

  }

}

---

## 12\. Mock Response System

### 12.1 File

src/lib/mockLpoa.ts

### 12.2 Function

export function getMockLpoaResponse(request: LpoaQueryRequest): LpoaQueryResponse

### 12.3 Keyword-Based Scenarios

#### Scenario A: BBL / Fitzpatrick IV / Melasma / PIH

Trigger keywords:

- bbl  
- fitzpatrick iv  
- melasma  
- pih  
- pigmentation

Response behavior:

confidenceLevel: 1

settingsAllowed: false

safetyFlags:

  \- Fitzpatrick IV

  \- Melasma concern

  \- Prior PIH

  \- Minimal downtime preference

missingInformation:

  \- Recent sun exposure

  \- Medication/photosensitizer review

  \- Treatment area

  \- Exact source-supported BBL protocol

  \- Practice-approved settings

#### Scenario B: Eye Protection

Trigger keywords:

- eye protection  
- eyewear  
- goggles

Response behavior:

confidenceLevel: 2

settingsAllowed: false

citations:

  \- page: 8

    section: Safety / Eye Protection

#### Scenario C: Control Panel / Widgets

Trigger keywords:

- control panel  
- controls  
- widget  
- ui

Response behavior:

- Return a generated device control panel.  
- Keep parameter controls locked.  
- Show missing information and source-support requirements.

#### Scenario D: Water Reservoir

Trigger keywords:

- water reservoir  
- refill  
- fill water  
- coolant

Response behavior:

confidenceLevel: 2

settingsAllowed: false

citations:

  \- page: 14

    section: Filling Water Reservoir

#### Scenario E: Generic

Behavior:

- Explain that mock mode is enabled.  
- Describe how Dify/RAG will work once connected.  
- Provide suggested follow-up questions.

---

## 13\. Dify Integration Plan

### 13.1 Environment Variables

LPOA\_MODE=mock

DIFY\_API\_URL=https://api.dify.ai/v1/chat-messages

DIFY\_API\_KEY=

DIFY\_USER\_ID=lpoa-demo-user

LPOA\_ALLOW\_MOCK\_FALLBACK=true

### 13.2 Dify Client File

src/lib/difyClient.ts

### 13.3 Function

export async function sendToDify(

  request: LpoaQueryRequest

): Promise\<LpoaQueryResponse\>

### 13.4 Dify Request Shape

{

  "inputs": {

    "patient\_context": "...",

    "device\_state": "...",

    "use\_patient\_context": true,

    "pdf\_title": "Sciton Joule Operator Manual",

    "app\_mode": "lpoa\_viewer"

  },

  "query": "What should I consider for this patient?",

  "response\_mode": "blocking",

  "user": "lpoa-demo-user"

}

### 13.5 Dify Response Normalization

Dify answer maps to:

response.answer \= difyResponse.answer

response.summary \= first sentence or generated summary

response.citations \= difyResponse.metadata?.retriever\_resources?.map(...)

If Dify provides retriever resources:

citation.label \= document\_name

citation.section \= segment\_id or document\_name

citation.relevance \= score

citation.sourceTitle \= document\_name

If page number is not available, citation card should still display the document/section.

### 13.6 Fallback Behavior

If `LPOA_MODE=mock`, return mock.

If `LPOA_MODE=dify` but Dify env vars are missing, return a clear error or mock fallback if `LPOA_ALLOW_MOCK_FALLBACK=true`.

### 13.7 Dify Chatflow Expectations

The Dify app should eventually include:

1. Start node with variables:  
   - patient\_context  
   - device\_state  
   - use\_patient\_context  
   - pdf\_title  
   - app\_mode  
2. Knowledge retrieval against the device manual.  
3. Evidence/confidence gate.  
4. Answer composer.  
5. Optional structured JSON output.

---

## 14\. Component Documentation

### 14.1 AppHeader

Purpose:

- Display app identity and key toggles.

Props:

interface AppHeaderProps {

  documentTitle: string;

  mode: "mock" | "dify";

  assistantOpen: boolean;

  controlsOpen: boolean;

  usePatientContext: boolean;

  onToggleAssistant: () \=\> void;

  onToggleControls: () \=\> void;

  onTogglePatientContext: () \=\> void;

}

### 14.2 PdfViewer

Purpose:

- Display a PDF using iframe.  
- Allow user to load a local/public URL.  
- Respond to citation page navigation.

Props:

interface PdfViewerProps {

  pdfUrl: string;

  currentPage?: number;

  onPdfUrlChange: (url: string) \=\> void;

}

Behavior:

- Render `iframe src={pdfUrlWithPageHash}`.  
- If `currentPage` changes, update hash.  
- If URL empty, show EmptyState.

### 14.3 AssistantPanel

Purpose:

- Chat interface for LPOA.

Props:

interface AssistantPanelProps {

  open: boolean;

  messages: ChatMessage\[\];

  isLoading: boolean;

  suggestedQuestions: string\[\];

  mode: "mock" | "dify";

  onSendMessage: (question: string) \=\> Promise\<void\>;

}

### 14.4 PatientPanel

Purpose:

- View and edit patient context.

Props:

interface PatientPanelProps {

  patient: PatientContext | null;

  usePatientContext: boolean;

  onSave: (patient: PatientContext) \=\> void;

  onReset: () \=\> void;

  onClear: () \=\> void;

  onToggleUsePatientContext: () \=\> void;

}

### 14.5 ControlsPanel

Purpose:

- Display device context, control widgets, safety state, and missing information.

Props:

interface ControlsPanelProps {

  deviceState: DeviceState;

  controlPanel?: ControlPanelState;

  confidenceLevel: 0 | 1 | 2 | 3 | 4;

  settingsAllowed: boolean;

  settingsStatusReason: string;

  safetyFlags: string\[\];

  missingInformation: string\[\];

  onDeviceStateChange: (deviceState: DeviceState) \=\> void;

}

### 14.6 ControlField

Purpose:

- Render one machine-control field.

Props:

interface ControlFieldProps {

  field: ControlFieldState;

}

Status behavior:

- `locked`: gray badge, disabled UI  
- `review_required`: amber badge  
- `available`: green badge  
- `not_applicable`: muted badge

### 14.7 ConfidenceCard

Purpose:

- Display confidence level and settings allowed/locked state.

Props:

interface ConfidenceCardProps {

  confidenceLevel: 0 | 1 | 2 | 3 | 4;

  settingsAllowed: boolean;

  reason: string;

}

### 14.8 EvidencePanel

Purpose:

- Display citations and allow page navigation.

Props:

interface EvidencePanelProps {

  citations: Citation\[\];

  onGoToPage: (page: number) \=\> void;

}

### 14.9 SuggestedQuestions

Purpose:

- Show follow-up question chips.

Props:

interface SuggestedQuestionsProps {

  questions: string\[\];

  onQuestionClick: (question: string) \=\> void;

}

---

## 15\. UI Copy

### 15.1 App Title

LPOA Viewer

### 15.2 Subtitle

Laser Parameter Optimization Assistant Prototype

### 15.3 Mode Badges

Mock mode:

Mock Mode

Dify mode:

Dify Connected

Dify error:

Dify Unavailable \- Using Mock

### 15.4 Settings Locked Copy

Settings Locked

Parameter controls are locked because the available evidence and patient context are not sufficient for this exact device/use case.

### 15.5 No Citation Copy

No citations returned yet. Once connected to Dify, retrieved manual sections will appear here.

---

## 16\. Styling Guidelines

### 16.1 Visual Tone

- Clean clinical dashboard  
- Modern but not flashy  
- Neutral backgrounds  
- Blue/teal accent colors  
- Clear locked/review states  
- Legible typography

### 16.2 Suggested Color Roles

background: \#f8fafc

surface: \#ffffff

border: \#e2e8f0

primary: \#0f766e or \#2563eb

text: \#0f172a

muted: \#64748b

locked: \#64748b

review: \#f59e0b

available: \#16a34a

risk: \#dc2626

info: \#2563eb

### 16.3 Required Visual Sections

- Patient Snapshot  
- Assistant Chat  
- Device Controls  
- Confidence Card  
- Safety Flags  
- Missing Information  
- Evidence/Citations  
- Suggested Questions

---

## 17\. Environment Variables

Create `.env.example`:

\# App mode: mock or dify

LPOA\_MODE=mock

\# Dify API

DIFY\_API\_URL=https://api.dify.ai/v1/chat-messages

DIFY\_API\_KEY=

DIFY\_USER\_ID=lpoa-demo-user

\# If true, API route returns mock response if Dify call fails

LPOA\_ALLOW\_MOCK\_FALLBACK=true

Do not prefix secrets with `NEXT_PUBLIC_`.

---

## 18\. Local Development

### 18.1 Install

npm install

### 18.2 Run

npm run dev

### 18.3 Open

http://localhost:3000

### 18.4 Add a PDF

Place a PDF here:

public/docs/sample-manual.pdf

Or paste a PDF URL into the viewer UI.

---

## 19\. Deployment

### 19.1 Vercel

Recommended for V1 because it supports Next.js and API routes.

Steps:

1. Push repo to GitHub.  
2. Import repo into Vercel.  
3. Set environment variables in Vercel project settings.  
4. Deploy.

### 19.2 GitHub Pages

GitHub Pages can host a static mock-only UI if exported statically, but the Dify proxy route requires a server/runtime. Prefer Vercel for the full prototype.

---

## 20\. Testing and Acceptance Criteria

### 20.1 Functional Acceptance Criteria

The project is complete when:

1. `npm install` works.  
2. `npm run dev` starts the app.  
3. Home page loads without a PDF file.  
4. User can enter a PDF URL and load it.  
5. Assistant panel opens and closes.  
6. Controls panel opens and closes.  
7. Patient context toggles on/off.  
8. Patient context can be edited, saved, reset, and cleared.  
9. User can ask a question and receive a mock structured response.  
10. Mock response updates:  
    - answer  
    - confidence level  
    - settings status  
    - safety flags  
    - missing information  
    - citations  
    - suggested questions  
    - control panel state  
11. Citation chip with page number updates PDF iframe hash.  
12. `/api/lpoa/query` works in mock mode.  
13. `.env.example` exists.  
14. README explains setup/deployment/Dify wiring.  
15. TypeScript builds cleanly.  
16. No secrets appear in client code.

### 20.2 Demo Test Questions

Use these to test the prototype:

A Fitzpatrick IV patient with melasma, prior PIH, and minimal downtime preference is interested in BBL. What should I consider before selecting settings, and can you show me which controls should stay locked?

What information is missing before choosing treatment parameters?

Show me a control panel for Sciton Joule BBL.

What eye protection is required?

How do I refill the water reservoir?

---

## 21\. Future Roadmap

### 21.1 V1: Mock UI Prototype

- Standalone app  
- PDF viewer  
- Patient context  
- Assistant panel  
- Controls panel  
- Mock structured responses  
- Dify adapter scaffold

### 21.2 V1.5: Dify-Connected Prototype

- Real Dify Chatflow integration  
- Joule manual knowledge base  
- Dify retriever resources mapped to citations  
- More robust confidence gate  
- Better response parsing

### 21.3 V2: Device Pack Architecture

- JSON/YAML device packs  
- Device-specific controls  
- Device-specific FAQs  
- Device-specific doctor index  
- Dynamic widgets  
- Multi-manual support

### 21.4 V3: A360 Backend

- A360 LPOA API  
- Practice Library integration  
- Global Library integration  
- User/practice auth  
- Citation service  
- Audit logging  
- Clinician feedback

### 21.5 V4: AWS Production Foundation

- S3 document store  
- Bedrock/Bedrock Knowledge Bases or equivalent RAG service  
- Vector/evidence store  
- Device pack database  
- Practice override model  
- Audit/event tables  
- Agent Exchange packaging

---

## 22\. Risks and Mitigations

| Risk | Mitigation |
| :---- | :---- |
| User thinks mock answer is real | Clear mock mode badge and disclaimer |
| AI invents settings later | Confidence gate, citations, locked controls |
| Dify response shape changes | Normalize in server adapter only |
| API key exposed | Server-side route only; no client secrets |
| PDF navigation inconsistent | Use simple iframe hash for V1 |
| UI becomes too complex | Keep panels optional/collapsible |
| Sciton-specific assumptions | Schema-driven controls and device state |
| Clinical safety concerns | Conservative copy, locked defaults, no medical advice |

---

## 23\. Open Questions

1. Should the prototype use a real Sciton manual PDF in `public/docs`, or should users paste a URL?  
2. Should the first connected Dify app return plain text or structured JSON?  
3. Should patient context be stored only locally or eventually connected to A360 patient records?  
4. Should citation page numbers come from Dify metadata, manual preprocessing, or a separate citation map?  
5. Should controls be shown in the assistant panel, a separate right panel, or both?  
6. Should device packs be authored manually first or generated by AI from manuals?

---

## 24\. Implementation Checklist for Claude Code

### Setup

- [ ] Create fresh Next.js app  
- [ ] Add TypeScript  
- [ ] Add Tailwind CSS  
- [ ] Add lucide-react  
- [ ] Add project README  
- [ ] Add `.env.example`

### Types

- [ ] Create patient types  
- [ ] Create device types  
- [ ] Create LPOA request/response types  
- [ ] Create citation/control types

### Data

- [ ] Create demo patient  
- [ ] Create demo device state  
- [ ] Create demo control panel  
- [ ] Create demo citations  
- [ ] Create default suggested questions

### UI

- [ ] AppHeader  
- [ ] PdfViewer  
- [ ] AssistantPanel  
- [ ] PatientPanel  
- [ ] ControlsPanel  
- [ ] ControlField  
- [ ] ConfidenceCard  
- [ ] EvidencePanel  
- [ ] SuggestedQuestions  
- [ ] EmptyState

### API

- [ ] Create `/api/lpoa/query`  
- [ ] Add mock response engine  
- [ ] Add Dify client scaffold  
- [ ] Add error handling  
- [ ] Normalize response shape

### Behavior

- [ ] Open/close assistant  
- [ ] Open/close controls  
- [ ] Toggle patient context  
- [ ] Edit patient  
- [ ] Ask question  
- [ ] Render response  
- [ ] Update controls from response  
- [ ] Navigate citation pages

### Polish

- [ ] Loading states  
- [ ] Error states  
- [ ] Responsive layout  
- [ ] Mock/Dify badges  
- [ ] Disclaimer  
- [ ] Build passes

---

## 25\. Recommended Initial README Summary

Use this at the top of the repository README:

\# LPOA Viewer

LPOA Viewer is a standalone prototype interface for A360's Laser Parameter Optimization Assistant. It provides a simple PDF viewer, patient context panel, AI assistant panel, evidence/citation display, and optional device controls panel. The app runs in mock mode by default and is designed to be connected to a Dify Chatflow through a server-side Next.js API route.

This is a prototype UI. It does not provide medical advice, diagnose, prescribe, replace clinical judgment, or control any device. Parameter settings remain locked unless source-supported evidence and required patient information are available.

---

## 26\. Final Notes

The right build strategy is:

Build the UI correctly now.

Keep intelligence mocked but structured.

Wire Dify through a backend adapter later.

Keep control widgets schema-driven.

Keep settings locked by default.

This gives A360 a fast demo that looks like the real product while avoiding premature complexity.  

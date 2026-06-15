# @a360/age-progression

A React component for viewing age progression images with an interactive slider, zoom/pan capabilities, and info panel.

## Installation

### Step 1: Copy Package Folder

Copy the entire package folder to your project's `src/components/` directory:

```
your-project/
├── src/
│   ├── components/
│   │   └── age-progression/    ← Copy entire package folder here
│   │       ├── src/
│   │       │   ├── components/
│   │       │   ├── theme/
│   │       │   ├── types/
│   │       │   ├── assets/
│   │       │   ├── AgeProgression.tsx
│   │       │   ├── index.ts
│   │       │   ├── types.ts
│   │       │   └── utils.ts
│   │       ├── package.json
│   │       └── README.md
│   └── pages/
└── package.json
```

**Important:** Copy the ENTIRE package folder, maintaining the exact folder structure including the `src/` subfolder.

### Step 2: Install Dependencies

Install the following dependencies in your project's root `package.json`:

```bash
npm install react react-dom @mui/material @mui/icons-material @emotion/react @emotion/styled react-zoom-pan-pinch
```

**Required Dependencies:**

- `react` - React library
- `react-dom` - React DOM library
- `@mui/material` - Material-UI components
- `@mui/icons-material` - Material-UI icons
- `@emotion/react` - CSS-in-JS library (required by MUI)
- `@emotion/styled` - Styled components (required by MUI)
- `react-zoom-pan-pinch` - Zoom, pan, and pinch functionality

## Usage

### Import the Component

```tsx
import AgeProgression from "../components/age-progression/src/AgeProgression";
import type {
  AgeMark,
  AgeProgressionItem,
} from "../components/age-progression/src/AgeProgression";
```

Or import from index:

```tsx
import { AgeProgression } from "../components/age-progression/src/index";
import type {
  AgeMark,
  AgeProgressionItem,
} from "../components/age-progression/src/index";
```

### Single Age Progression

```tsx
import AgeProgression from "../components/age-progression/src/AgeProgression";
import type { AgeMark } from "../components/age-progression/src/AgeProgression";

function App() {
  const ageMarks: AgeMark[] = [
    { age: 20, imageUrl: "/age20.jpg" },
    { age: 30, imageUrl: "/age30.jpg" },
    { age: 40, imageUrl: "/age40.jpg" },
    { age: 50, imageUrl: "/age50.jpg" },
  ];

  return (
    <AgeProgression
      ageMarks={ageMarks}
      title="Long-term Aging Overview"
      Description="AI-generated aging simulation showing major decade milestones"
      width="100%"
      height="800px"
    />
  );
}
```

### Multiple Age Progressions

```tsx
import AgeProgression from "../components/age-progression/src/AgeProgression";
import type { AgeProgressionItem } from "../components/age-progression/src/AgeProgression";

function App() {
  const items: AgeProgressionItem[] = [
    {
      id: 1,
      ageMarks: [
        { age: 20, imageUrl: "/age20.jpg" },
        { age: 30, imageUrl: "/age30.jpg" },
        { age: 40, imageUrl: "/age40.jpg" },
      ],
      title: "10-Year Gaps",
      Description: "Major decade milestones",
    },
    {
      id: 2,
      ageMarks: [
        { age: 25, imageUrl: "/age25.jpg" },
        { age: 30, imageUrl: "/age30.jpg" },
        { age: 35, imageUrl: "/age35.jpg" },
      ],
      title: "5-Year Gaps",
      Description: "Mid-life tracking",
    },
  ];

  return <AgeProgression items={items} width="100%" height="800px" />;
}
```

## Props

### Single Age Progression Mode

| Prop          | Type        | Required | Default             | Description                          |
| ------------- | ----------- | -------- | ------------------- | ------------------------------------ |
| `ageMarks`    | `AgeMark[]` | No       | -                   | Array of age mark objects            |
| `title`       | `string`    | No       | `"Age Progression"` | Title shown in info panel            |
| `Description` | `string`    | No       | -                   | Description text shown in info panel |

### Multiple Age Progressions Mode

| Prop    | Type                   | Required | Default | Description                    |
| ------- | ---------------------- | -------- | ------- | ------------------------------ |
| `items` | `AgeProgressionItem[]` | No       | -       | Array of age progression items |

### Common Props

| Prop     | Type         | Required | Default  | Description                                   |
| -------- | ------------ | -------- | -------- | --------------------------------------------- |
| `width`  | `string`     | No       | `"100%"` | Width of the viewer container                 |
| `height` | `string`     | No       | `"100%"` | Height of the viewer container                |
| `onBack` | `() => void` | No       | -        | Callback function when back button is clicked |

### AgeMark Interface

```tsx
interface AgeMark {
  age: number; // Age value (e.g., 20, 25, 30)
  imageUrl: string; // URL of the image for this age
}
```

### AgeProgressionItem Interface

```tsx
interface AgeProgressionItem {
  id: number;
  ageMarks: AgeMark[];
  title: string;
  Description?: string;
}
```

## Features

- ✅ **Interactive Slider** - Drag slider to see age progression
- ✅ **Zoom & Pan** - Pinch to zoom, drag to pan on images
- ✅ **Multiple Progressions** - Browse through multiple age progression sets
- ✅ **Sidebar Navigation** - Navigate between different progressions
- ✅ **Info Panel** - View details and descriptions
- ✅ **Responsive Design** - Works on desktop and mobile
- ✅ **Touch Support** - Full touch gestures for mobile
- ✅ **Keyboard Navigation** - Arrow keys to navigate

## Keyboard Shortcuts

The component supports comprehensive keyboard navigation. Keyboard shortcuts are disabled when typing in input fields.

### Fullscreen Grid Mode

| Key                | Action                                             |
| ------------------ | -------------------------------------------------- |
| `Arrow Left`       | Navigate left within the grid                      |
| `Arrow Right`      | Navigate right within the grid                     |
| `Arrow Up`         | Navigate up to the previous row                    |
| `Arrow Down`       | Navigate down to the next row                      |
| `Home`             | Jump to the first item                             |
| `End`              | Jump to the last item                              |
| `Enter` or `Space` | Select focused item and switch to progression view |

### Progression View Mode

| Key                           | Action                                   |
| ----------------------------- | ---------------------------------------- |
| `Arrow Left` or `Arrow Up`    | Navigate to previous age mark            |
| `Arrow Right` or `Arrow Down` | Navigate to next age mark                |
| `Home`                        | Jump to the first age mark               |
| `End`                         | Jump to the last age mark                |
| `Escape` or `Backspace`       | Close info panel, or return to grid view |
| `i` or `I`                    | Toggle info panel                        |

**Note:** Keyboard shortcuts are automatically disabled when typing in input fields, textareas, or content-editable elements.

## Examples

### Basic Age Progression

```tsx
const ageMarks = [
  { age: 20, imageUrl: "/age20.jpg" },
  { age: 30, imageUrl: "/age30.jpg" },
  { age: 40, imageUrl: "/age40.jpg" },
];

<AgeProgression ageMarks={ageMarks} />;
```

### With Title and Description

```tsx
<AgeProgression
  ageMarks={ageMarks}
  title="Facial Aging Simulation"
  Description="AI-generated progression showing aging over 20 years"
/>
```

### Multiple Progressions

```tsx
const items = [
  {
    id: 1,
    ageMarks: [
      { age: 20, imageUrl: "/age20.jpg" },
      { age: 30, imageUrl: "/age30.jpg" },
    ],
    title: "Decade Milestones",
    Description: "Major age markers",
  },
];

<AgeProgression items={items} />;
```

### Custom Size

```tsx
<AgeProgression ageMarks={ageMarks} width="1200px" height="800px" />
```

## Styling

The component uses Material-UI's theming system:

```tsx
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AgeProgression from "../components/age-progression/src/AgeProgression";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AgeProgression ageMarks={ageMarks} />
    </ThemeProvider>
  );
}
```

## TypeScript Support

Full TypeScript support is included:

```tsx
import AgeProgression, {
  type AgeProgressionProps,
  type AgeMark,
  type AgeProgressionItem,
} from "../components/age-progression/src/AgeProgression";
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Common Issues

### Images Not Loading

- Check the image URLs are correct and accessible
- Verify CORS settings for cross-origin images
- Ensure the image formats are supported
- For local files, ensure they're in the `public/` folder

### Slider Not Working

- Ensure `ageMarks` array has at least 2 items
- Check that all image URLs are valid
- Verify browser console for errors

### Zoom/Pan Not Working

- Ensure `react-zoom-pan-pinch` is installed
- Check browser console for errors
- Verify touch events are enabled on mobile

## License

MIT

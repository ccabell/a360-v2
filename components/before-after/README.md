# @a360/before-after

A React component for creating before/after image comparisons with slider and side-by-side viewing modes.

## Installation

### Step 1: Copy Package Folder

Copy the entire package folder to your project's `src/components/` directory:

```
your-project/
├── src/
│   ├── components/
│   │   └── before-after/       ← Copy entire package folder here
│   │       ├── src/
│   │       │   ├── components/
│   │       │   ├── theme/
│   │       │   ├── types/
│   │       │   ├── assets/
│   │       │   ├── BeforeAfter.tsx
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
npm install react react-dom @mui/material @mui/icons-material @emotion/react @emotion/styled
```

**Required Dependencies:**

- `react` - React library
- `react-dom` - React DOM library
- `@mui/material` - Material-UI components
- `@mui/icons-material` - Material-UI icons
- `@emotion/react` - CSS-in-JS library (required by MUI)
- `@emotion/styled` - Styled components (required by MUI)

## Usage

### Import the Component

```tsx
import BeforeAfter from "../components/before-after/src/BeforeAfter";
```

Or import from index:

```tsx
import { BeforeAfter } from "../components/before-after/src/index";
```

### Single Comparison

```tsx
import BeforeAfter from "../components/before-after/src/BeforeAfter";

function App() {
  return (
    <BeforeAfter
      beforeUrl="https://example.com/before.jpg"
      afterUrl="https://example.com/after.jpg"
      title="Treatment Results"
      Description="6-month transformation"
      width="100%"
      height="600px"
    />
  );
}
```

### Multiple Comparisons

```tsx
import BeforeAfter from "../components/before-after/src/BeforeAfter";
import type { BeforeAfterComparison } from "../components/before-after/src/BeforeAfter";

function App() {
  const comparisons: BeforeAfterComparison[] = [
    {
      beforeUrl: "https://example.com/before1.jpg",
      afterUrl: "https://example.com/after1.jpg",
      title: "Rhinoplasty Results",
      Description: "Post-surgical results after 3 months",
    },
    {
      beforeUrl: "https://example.com/before2.jpg",
      afterUrl: "https://example.com/after2.jpg",
      title: "Facelift Results",
      Description: "Results after 6 months",
    },
  ];

  return <BeforeAfter comparisons={comparisons} width="100%" height="800px" />;
}
```

## Props

### Single Comparison Mode

| Prop          | Type     | Required | Default | Description                   |
| ------------- | -------- | -------- | ------- | ----------------------------- |
| `beforeUrl`   | `string` | No       | -       | URL of the "before" image     |
| `afterUrl`    | `string` | No       | -       | URL of the "after" image      |
| `title`       | `string` | No       | -       | Title displayed in tooltips   |
| `Description` | `string` | No       | -       | Description of the comparison |

### Multiple Comparisons Mode

| Prop          | Type                      | Required | Default | Description                 |
| ------------- | ------------------------- | -------- | ------- | --------------------------- |
| `comparisons` | `BeforeAfterComparison[]` | No       | -       | Array of comparison objects |

### Common Props

| Prop     | Type         | Required | Default  | Description                                   |
| -------- | ------------ | -------- | -------- | --------------------------------------------- |
| `width`  | `string`     | No       | `"100%"` | Width of the component                        |
| `height` | `string`     | No       | `"100%"` | Height of the component                       |
| `onBack` | `() => void` | No       | -        | Callback function when back button is clicked |

### BeforeAfterComparison Interface

```tsx
interface BeforeAfterComparison {
  beforeUrl: string;
  afterUrl: string;
  title?: string;
  Description?: string;
}
```

## Features

- ✅ **Slider Mode** - Interactive slider to compare images
- ✅ **Side-by-Side Mode** - View both images simultaneously
- ✅ **Multiple Comparisons** - Browse through multiple before/after pairs
- ✅ **View Navigation** - Left-side navigation buttons for multiple views of the same item (View 1 of 3, View 2 of 3, etc.)
- ✅ **Sidebar Navigation** - Navigate between different comparison items
- ✅ **Responsive Design** - Works on desktop and mobile
- ✅ **Touch Support** - Full touch gestures for mobile
- ✅ **Keyboard Navigation** - Arrow keys to navigate

## Keyboard Shortcuts

The component supports comprehensive keyboard navigation. Keyboard shortcuts are disabled when typing in input fields.

### Fullscreen Grid Mode

| Key                | Action                                            |
| ------------------ | ------------------------------------------------- |
| `Arrow Left`       | Navigate left within the grid                     |
| `Arrow Right`      | Navigate right within the grid                    |
| `Arrow Up`         | Navigate up to the previous row                   |
| `Arrow Down`       | Navigate down to the next row                     |
| `Home`             | Jump to the first item                            |
| `End`              | Jump to the last item                             |
| `Enter` or `Space` | Select focused item and switch to comparison view |

### Comparison View Mode

| Key                           | Action                          |
| ----------------------------- | ------------------------------- |
| `Arrow Left` or `Arrow Up`    | Navigate to previous comparison |
| `Arrow Right` or `Arrow Down` | Navigate to next comparison     |
| `Home`                        | Jump to the first comparison    |
| `End`                         | Jump to the last comparison     |
| `Escape` or `Backspace`       | Return to fullscreen grid       |

**Note:** Keyboard shortcuts are automatically disabled when typing in input fields, textareas, or content-editable elements.

## Examples

### Basic Slider Comparison

```tsx
<BeforeAfter beforeUrl="/before.jpg" afterUrl="/after.jpg" />
```

### With Title and Description

```tsx
<BeforeAfter
  beforeUrl="/before.jpg"
  afterUrl="/after.jpg"
  title="Treatment Results"
  Description="6-month transformation showing significant improvement"
/>
```

### Multiple Comparisons

```tsx
const comparisons = [
  {
    beforeUrl: "/before1.jpg",
    afterUrl: "/after1.jpg",
    title: "Rhinoplasty",
    Description: "3 months post-op",
  },
  {
    beforeUrl: "/before2.jpg",
    afterUrl: "/after2.jpg",
    title: "Facelift",
    Description: "6 months post-op",
  },
];

<BeforeAfter comparisons={comparisons} />;
```

### Multiple Views of Same Item (Left Side Navigation)

When you have multiple comparisons with the same base name in their title, they become "views" of the same item and appear as navigation buttons on the left side (View 1 of 3, View 2 of 3, etc.):

```tsx
const comparisons = [
  {
    beforeUrl: "/before-front.jpg",
    afterUrl: "/after-front.jpg",
    title: "Treatment Comparison Front",
    Description: "Front view - Before and after results",
  },
  {
    beforeUrl: "/before-side.jpg",
    afterUrl: "/after-side.jpg",
    title: "Treatment Comparison Side",
    Description: "Side view - Before and after results",
  },
  {
    beforeUrl: "/before-angle.jpg",
    afterUrl: "/after-angle.jpg",
    title: "Treatment Comparison Angle",
    Description: "Angle view - Before and after results",
  },
];

<BeforeAfter comparisons={comparisons} />;
```

**How it works:**

- Items with the same base name (e.g., "Treatment Comparison") are grouped together
- They appear as view navigation buttons on the left side
- Each button shows "View 1 of 3", "View 2 of 3", "View 3 of 3", etc.
- Click a button to switch between views of the same item
- The thumbnail shows a split view (before on left, after on right)

### Custom Size

```tsx
<BeforeAfter
  beforeUrl="/before.jpg"
  afterUrl="/after.jpg"
  width="1200px"
  height="800px"
/>
```

## View Modes

The component supports two view modes:

1. **Slider Mode** - Drag a slider to reveal before/after
2. **Side-by-Side Mode** - View both images side by side

Users can toggle between modes using the view mode buttons.

## Styling

The component uses Material-UI's theming system:

```tsx
import { ThemeProvider, createTheme } from "@mui/material/styles";
import BeforeAfter from "../components/before-after/src/BeforeAfter";

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
      <BeforeAfter beforeUrl="/before.jpg" afterUrl="/after.jpg" />
    </ThemeProvider>
  );
}
```

## TypeScript Support

Full TypeScript support is included:

```tsx
import BeforeAfter, {
  type BeforeAfterProps,
  type BeforeAfterComparison,
} from "../components/before-after/src/BeforeAfter";
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

- Ensure both `beforeUrl` and `afterUrl` are provided
- Check browser console for errors
- Verify images have loaded successfully

## License

MIT

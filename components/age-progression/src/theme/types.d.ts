import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeBackground {
    surfaceSoft?: string;
    surfaceMedium?: string;
    surfaceStrong?: string;
  }

  interface TypeText {
    body?: string;
  }
}


import React from "react";
import {
  Box,
  Button,
  Tooltip,
  Autocomplete,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ArrowBack,
  SearchOutlined,
  ViewModule,
  ViewList,
  FileCopy,
} from "@mui/icons-material";
import { getDisplayTitle } from "../utils";
import type { BeforeAfterMediaItem } from "../types";

interface TopBarProps {
  searchOptions: BeforeAfterMediaItem[];
  selectedFile: BeforeAfterMediaItem | null;
  searchQuery: string;
  isFullscreenGrid: boolean;
  onBack?: () => void;
  onFileChange: (event: React.SyntheticEvent, value: unknown) => void;
  onSearchQueryChange: (value: string) => void;
  onViewModeChange: (mode: "list" | "grid", fullscreen: boolean) => void;
}

const TopBarContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  zIndex: 20,
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(1.5),
    gap: theme.spacing(1),
    flexWrap: "wrap",
  },
}));

const BackButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  backdropFilter: "blur(10px)",
  boxShadow: theme.shadows[2],
  flexShrink: 0,
  textTransform: "none",
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.secondary.contrastText,
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: "auto",
    padding: theme.spacing(0.75, 1.5),
  },
}));

const LabelContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(0.75, 1.5),
  borderRadius: theme.spacing(2),
  backdropFilter: "blur(10px)",
  minWidth: 0,
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.spacing(1),
  },
}));

const LabelText = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: theme.typography.body2.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  [theme.breakpoints.down("md")]: {
    fontSize: theme.typography.caption.fontSize,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.75rem",
  },
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 260,
  [theme.breakpoints.down("md")]: {
    minWidth: 200,
  },
  [theme.breakpoints.down("sm")]: {
    flex: "0 0 180px",
    minWidth: 180,
  },
}));

const RightControls = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  flexShrink: 0,
  flex: "0 1 auto",
  minWidth: 0,
  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(1),
    justifyContent: "space-between",
    width: "100%",
  },
}));

const StyledAutocomplete = styled(
  Autocomplete<BeforeAfterMediaItem, undefined, undefined, true>,
)(({ theme }) => ({
  width: "100%",
  "& .MuiInput-root": {
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.fontWeightRegular,
    fontFamily: theme.typography.fontFamily,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0.5, 1),
    "&:before": {
      borderBottomColor: theme.palette.divider,
    },
    "&:hover:not(.Mui-disabled):before": {
      borderBottomColor: theme.palette.secondary.dark,
    },
    "&:after": {
      borderBottomColor: theme.palette.primary.main,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.caption.fontSize,
    },
  },
  "& .MuiInputBase-input": {
    padding: `${theme.spacing(1)} 0 !important`,
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
    "&::placeholder": {
      color: theme.palette.text.secondary,
      opacity: 1,
    },
    [theme.breakpoints.down("sm")]: {
      padding: `${theme.spacing(0.75)} 0 !important`,
    },
  },
}));

const TopBar: React.FC<TopBarProps> = ({
  searchOptions,
  selectedFile,
  searchQuery,
  isFullscreenGrid,
  onBack,
  onFileChange,
  onSearchQueryChange,
  onViewModeChange,
}) => {
  return (
    <TopBarContainer>
      <Tooltip title="Back">
        <BackButton
          onClick={onBack || (() => {})}
          startIcon={<ArrowBack />}
          variant="contained"
          sx={{ opacity: 0, visibility: "hidden" }}
        >
          Back
        </BackButton>
      </Tooltip>

      <LabelContainer>
        <FileCopy sx={{ fontSize: "1.25rem", flexShrink: 0 }} />
        <LabelText>{selectedFile?.title && ` ${selectedFile.title}`}</LabelText>
      </LabelContainer>

      <RightControls>
        <SearchContainer>
          <StyledAutocomplete
            fullWidth
            freeSolo
            options={searchOptions}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : getDisplayTitle(option)
            }
            value={selectedFile}
            inputValue={searchQuery}
            onChange={onFileChange}
            onInputChange={(_event, newInputValue) => {
              onSearchQueryChange(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                placeholder="Search"
                variant="standard"
                slotProps={{
                  ...params.slotProps,
                  input: {
                    ...params.slotProps?.input,
                    startAdornment: (
                      <>
                        <InputAdornment position="start">
                          <SearchOutlined
                            sx={{
                              color: "text.secondary",
                              fontSize: { xs: "1.25rem", sm: "1.5rem" },
                            }}
                          />
                        </InputAdornment>
                        {params.slotProps?.input?.startAdornment}
                      </>
                    ),
                  },
                }}
              />
            )}
          />
        </SearchContainer>

        <Box
          sx={{
            display: "flex",
            flexShrink: 0,
            gap: 0.7,
            backgroundColor: "background.surfaceMedium",
            padding: (theme) => theme.spacing(0.5),
            borderRadius: 3,
            border: 1,
            borderColor: "divider",
            overflow: "hidden",
          }}
        >
          <Tooltip title="List View">
            <IconButton
              onClick={() => onViewModeChange("list", false)}
              sx={{
                borderRadius: 3,
                boxShadow: !isFullscreenGrid ? 1 : 0,
                backgroundColor: !isFullscreenGrid
                  ? "primary.contrastText"
                  : "transparent",
                color: !isFullscreenGrid ? "primary.main" : "text.secondary",
                "&:hover": {
                  backgroundColor: "primary.contrastText",
                },
              }}
            >
              <ViewList />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={isFullscreenGrid ? "Exit Fullscreen" : "Fullscreen Grid"}
          >
            <IconButton
              onClick={() => onViewModeChange("grid", !isFullscreenGrid)}
              sx={{
                borderRadius: 3,
                boxShadow: isFullscreenGrid ? 1 : 0,
                backgroundColor: isFullscreenGrid
                  ? "primary.contrastText"
                  : "transparent",
                color: isFullscreenGrid ? "primary.main" : "text.secondary",
                "&:hover": {
                  backgroundColor: "primary.contrastText",
                },
              }}
            >
              <ViewModule />
            </IconButton>
          </Tooltip>
        </Box>
      </RightControls>
    </TopBarContainer>
  );
};

export default TopBar;

import React, { memo } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { CompareArrows as CompareIcon } from "@mui/icons-material";
import { getDisplayTitle } from "../utils";
import OptimizedImage from "./OptimizedImage";
import type { BeforeAfterMediaItem } from "../types";

interface SidebarItemProps {
  item: BeforeAfterMediaItem;
  isActive: boolean;
  onClick: () => void;
  viewMode: "grid" | "list";
}

const GridCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  cursor: "pointer",
  transition: "all 0.2s ease",
  display: "flex",
  flexDirection: "column",
  border: `1px solid ${
    isActive ? theme.palette.primary.main : theme.palette.divider
  }`,
  borderRadius: theme.spacing(2.1),
  backgroundColor: theme.palette.background.surfaceMedium,
  boxShadow: isActive ? theme.shadows[6] : "none",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    boxShadow: theme.shadows[4],
    transform: "translateY(-2px)",
  },
  [theme.breakpoints.down("md")]: {
    borderRadius: theme.spacing(1.5),
  },
  [theme.breakpoints.down("sm")]: {
    borderRadius: theme.spacing(1.25),
  },
}));

const TypeBadge = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: "50%",
  width: 32,
  height: 32,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: theme.typography.caption.fontSize,
  fontWeight: theme.typography.fontWeightBold,
  fontFamily: theme.typography.fontFamily,
  boxShadow: theme.shadows[3],
  [theme.breakpoints.down("md")]: {
    width: 28,
    height: 28,
    fontSize: "0.65rem",
    bottom: theme.spacing(0.75),
    right: theme.spacing(0.75),
    "& svg": {
      fontSize: "1rem",
    },
  },
  [theme.breakpoints.down("sm")]: {
    width: 24,
    height: 24,
    fontSize: "0.6rem",
    bottom: theme.spacing(0.5),
    right: theme.spacing(0.5),
    "& svg": {
      fontSize: "0.875rem",
    },
  },
}));

const SplitThumbnail = styled(Box)({
  display: "flex",
  width: "100%",
  height: "100%",
  position: "relative",
  overflow: "hidden",
});

const ThumbnailDivider = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "50%",
  top: 0,
  bottom: 0,
  width: "2px",
  backgroundColor: theme.palette.primary.main,
  transform: "translateX(-50%)",
  zIndex: 1,
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(0.5),
  transition: "all 0.2s ease",
  "&.Mui-selected": {
    backgroundColor: theme.palette.background.surfaceMedium,
    borderLeft: `3px solid ${theme.palette.primary.main}`,
    "&:hover": {
      backgroundColor: theme.palette.background.surfaceStrong,
    },
  },
  "&:hover": {
    backgroundColor: theme.palette.background.surfaceSoft,
  },
  [theme.breakpoints.down("sm")]: {
    borderRadius: theme.spacing(0.75),
    marginBottom: theme.spacing(0.25),
  },
}));

const GridView: React.FC<Omit<SidebarItemProps, "viewMode">> = memo(
  ({ item, isActive, onClick }) => {
    const displayTitle = getDisplayTitle(item);
    const thumbnailUrl = item.thumbnailUrl || item.beforeUrl;

    return (
      <GridCard onClick={onClick} isActive={isActive} elevation={0}>
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              position: "relative",
              aspectRatio: "4 / 3",
              overflow: "hidden",
              borderTopLeftRadius: (theme) => theme.spacing(1.5),
              borderTopRightRadius: (theme) => theme.spacing(1.5),
            }}
          >
            {item.beforeUrl && item.afterUrl ? (
              <SplitThumbnail>
                <Box sx={{ width: "50%", height: "100%", overflow: "hidden" }}>
                  <OptimizedImage
                    src={item.beforeUrl}
                    alt="Before"
                    lazy
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box sx={{ width: "50%", height: "100%", overflow: "hidden" }}>
                  <OptimizedImage
                    src={item.afterUrl}
                    alt="After"
                    lazy
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <ThumbnailDivider />
              </SplitThumbnail>
            ) : thumbnailUrl ? (
              <OptimizedImage
                src={thumbnailUrl}
                alt={displayTitle}
                lazy
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <CompareIcon
                sx={{
                  fontSize: "3rem",
                  color: "text.secondary",
                  opacity: 0.5,
                }}
              />
            )}
          </Box>
          <TypeBadge>
            <CompareIcon sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }} />
          </TypeBadge>
        </Box>
        <CardContent sx={{ flexGrow: 1, p: 1.5, "&:last-child": { pb: 1.5 } }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "fontWeightMedium",
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
              lineHeight: 1.3,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {displayTitle}
          </Typography>
        </CardContent>
      </GridCard>
    );
  },
);

GridView.displayName = "GridView";

const ListView: React.FC<Omit<SidebarItemProps, "viewMode">> = memo(
  ({ item, isActive, onClick }) => {
    const displayTitle = getDisplayTitle(item);

    return (
      <StyledListItemButton onClick={onClick} selected={isActive}>
        <ListItemIcon
          sx={{
            minWidth: { xs: 32, sm: 36 },
            color: "text.secondary",
            "& svg": {
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
            },
          }}
        >
          <CompareIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary={displayTitle}
          slotProps={{
            primary: {
              variant: "body2",
              sx: {
                fontWeight: "fontWeightMedium",
                color: "text.primary",
                fontFamily: (theme: any) => theme.typography.fontFamily,
                fontSize: { xs: "0.8rem", sm: "0.875rem" },
              },
            },
          }}
        />
        <Box
          sx={{
            ml: 1,
            color: "text.secondary",
            display: "flex",
            alignItems: "center",
            "& svg": {
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
            },
          }}
        >
          <CompareIcon fontSize="small" sx={{ color: "info.main" }} />
        </Box>
      </StyledListItemButton>
    );
  },
);

ListView.displayName = "ListView";

const SidebarItem: React.FC<SidebarItemProps> = ({ viewMode, ...props }) => {
  return viewMode === "list" ? (
    <ListView {...props} />
  ) : (
    <GridView {...props} />
  );
};

export default SidebarItem;

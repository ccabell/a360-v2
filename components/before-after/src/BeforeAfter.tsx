import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import {
  Box,
  Typography,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton,
  Tooltip,
  ThemeProvider,
  CssBaseline,
  IconButton,
  Collapse,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  SwapHoriz,
  ViewColumn,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import {
  getDisplayTitle,
  getBaseName,
  getDisplayNameFromBase,
  extractFromUrl,
} from "./utils";
import type { BeforeAfterMediaItem } from "./types";
import backgroundPattern from "./assets/background-pattern.png";
import { theme } from "./theme";
import { useContainerSize } from "./hooks/useContainerSize";

// Single comparison view
export interface BeforeAfterComparison {
  beforeUrl: string;
  afterUrl: string;
  title?: string;
  Description?: string;
}

// Component props - supports both single and multiple comparisons
export interface BeforeAfterProps {
  // Single comparison mode
  beforeUrl?: string;
  afterUrl?: string;
  title?: string;
  Description?: string;

  // Multiple comparisons mode
  comparisons?: BeforeAfterComparison[];

  // Common props
  width?: string;
  height?: string;
  onBack?: () => void;
}

type ViewMode = "slider" | "sideBySide";

// Main container with background pattern
const MainContainer = styled(Box)({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  backgroundImage: `url(${backgroundPattern})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
});

// Left side - View navigation thumbnails
const ViewNavigationButtons = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: 0,
  width: "12%",
  maxHeight: "80%",
  height: "auto",
  overflow: "auto",
  overflowX: "hidden",
  top: "50%",
  transform: "translateY(-50%)",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
  zIndex: 10,
  padding: theme.spacing(1),
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-track": {
    background: "rgba(0,0,0,0.1)",
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.primary.main,
    borderRadius: "4px",
  },
}));

const ViewButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(0.5),
  border: `2px solid ${
    isActive ? theme.palette.primary.main : theme.palette.divider
  }`,
  transition: "all 0.3s ease",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    boxShadow: theme.shadows[1],
    transform: "translateY(-4px)",
  },
}));

const ViewLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.65rem",
  fontWeight: 600,
  color: theme.palette.primary.main,
  marginTop: theme.spacing(0.5),
  textAlign: "center",
  whiteSpace: "nowrap",
}));

const BeforeAfterThumbnail = styled(Box)({
  display: "flex",
  width: "100%",
  height: "100%",
  position: "relative",
  overflow: "hidden",
  borderRadius: "4px",
});

const HalfImage = styled("img")({
  width: "50%",
  height: "100%",
  objectFit: "cover",
});

const ThumbnailDivider = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "50%",
  top: 0,
  bottom: 0,
  width: "2px",
  backgroundColor: theme.palette.primary.main,
  transform: "translateX(-50%)",
}));

// Right side - Content viewer
const ViewerContainer = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
});

const ControlsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: theme.spacing(1),
  zIndex: 10,
  order: 2,
}));

const ContentContainer = styled(Box)({
  flex: 1,
  width: "100%",
  position: "relative",
  overflow: "hidden",
  order: 1,
});

const SliderContainer = styled(Box)({
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  userSelect: "none",
});

const ImageContainer = styled(Box)({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const BeforeImageWrapper = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const BeforeImage = styled("img")({
  maxWidth: "100%",
  maxHeight: "100%",
  width: "auto",
  height: "auto",
  objectFit: "contain",
  display: "block",
  userSelect: "none",
});

const AfterImageWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "clipWidth",
})<{ clipWidth: number }>(({ clipWidth }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  clipPath: `inset(0 ${100 - clipWidth}% 0 0)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const AfterImage = styled("img")({
  maxWidth: "100%",
  maxHeight: "100%",
  width: "auto",
  height: "auto",
  objectFit: "contain",
  display: "block",
  userSelect: "none",
});

const Divider = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  width: "3px",
  backgroundColor: theme.palette.primary.main,
  cursor: "ew-resize",
  zIndex: 3,
  transform: "translateX(-50%)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40px",
    height: "40px",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: theme.shadows[4],
  },
  "&::after": {
    content: '"⟷"',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#fff",
    fontSize: "20px",
    fontWeight: "bold",
    pointerEvents: "none",
  },
}));

const SideBySideContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "88%",
  height: "100%",
  marginRight: 0,
  marginLeft: "auto",
  overflow: "hidden",
  borderRadius: 16,
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("lg")]: {
    width: "83%",
  },
  [theme.breakpoints.down("md")]: {
    height: "100%",
    width: "80%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "75%",
    height: "100%",
    marginRight: theme.spacing(0),
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  height: "100%",
  borderRadius: 16,
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const SideImageBox = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "50%",
  height: "100%",
  "&:first-of-type": {
    borderRadius: "16px 0 0 16px",
  },
  "&:last-child": {
    borderRadius: "0 16px 16px 0",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "50%",
    "&:first-of-type": {
      borderRadius: "16px 16px 0 0",
    },
    "&:last-child": {
      borderRadius: "0 0 16px 16px",
    },
  },
}));

const SideImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
  userSelect: "none",
});

const StyledDivider = styled(Box)(({ theme }) => ({
  width: 2,
  height: "auto",
  backgroundColor: "#547BA3",
  alignSelf: "stretch",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: 2,
  },
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  "& .MuiToggleButton-root": {
    padding: theme.spacing(1, 2),
    border: "none",
    color: theme.palette.text.secondary,
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const ButtonLabel = styled(Typography)({
  marginLeft: "8px",
  fontSize: "0.875rem",
  fontWeight: 500,
});

const LoadingContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "16px",
  height: "100%",
});

const ViewerContainerWrapper = styled(Box)({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  overflow: "hidden",
});

const MainContentWrapper = styled(Box)({
  flex: 1,
  display: "flex",
  overflow: "hidden",
  position: "relative",
});

const SidebarSection = styled(Box)({
  flex: "0 0 auto",
  height: "100%",
  overflow: "auto",
  position: "relative",
});

const SidebarToggleButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "sidebarOpen",
})<{ sidebarOpen: boolean }>(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  width: 40,
  height: 80,
  borderRadius: "8px 0 0 8px",
  zIndex: 30,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const BeforeAfter: React.FC<BeforeAfterProps> = ({
  beforeUrl,
  afterUrl,
  title = "Before/After Comparison",
  Description,
  comparisons,
  width = "100%",
  height = "100%",
  onBack,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const containerSize = useContainerSize(containerRef);
  // Use more appropriate breakpoints for mobile/tablet/desktop
  const isMobile = containerSize.width > 0 && containerSize.width < 768;
  const isTablet = containerSize.width >= 768 && containerSize.width < 1024;
  const isDesktop = containerSize.width >= 1024;

  // Determine if we're in single or multiple mode
  const isMultipleMode = comparisons && comparisons.length > 0;

  // For multiple mode, use comparisons array; for single mode, create a single-item array
  // Extract titles from URLs if not provided
  const viewsData: BeforeAfterComparison[] = useMemo(() => {
    if (isMultipleMode && comparisons) {
      return comparisons.map((comparison) => {
        // If title is provided, use it
        if (comparison.title) {
          return comparison;
        }

        // Extract title from URLs
        const beforeUrl = comparison.beforeUrl || "";
        const afterUrl = comparison.afterUrl || "";
        const urlToUse = beforeUrl || afterUrl;

        if (urlToUse) {
          const { base, view } = extractFromUrl(urlToUse);
          const viewCapitalized = view
            ? view
                .split(" ")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ")
            : "";
          const baseCapitalized = base
            .split(" ")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");

          const extractedTitle = viewCapitalized
            ? `${baseCapitalized} ${viewCapitalized}`
            : baseCapitalized;

          return {
            ...comparison,
            title: extractedTitle,
          };
        }

        return comparison;
      });
    }

    return [
      {
        beforeUrl: beforeUrl || "",
        afterUrl: afterUrl || "",
        title,
        Description,
      },
    ];
  }, [isMultipleMode, comparisons, beforeUrl, afterUrl, title, Description]);

  // Group comparisons by base name
  // Items with the same base name are views of the same item
  const groupedItems = useMemo(() => {
    const groups = new Map<string, BeforeAfterComparison[]>();

    viewsData.forEach((view) => {
      const title = view.title || "";
      const base = getBaseName(title);
      const baseKey = base || "untitled";

      if (!groups.has(baseKey)) {
        groups.set(baseKey, []);
      }
      groups.get(baseKey)!.push(view);
    });

    return Array.from(groups.entries()).map(([baseName, views]) => ({
      baseName: getDisplayNameFromBase(baseName),
      views,
    }));
  }, [viewsData]);

  // Convert to BeforeAfterMediaItem[] for Sidebar/TopBar
  // Group comparisons by base name - items with same base name are views of one item
  const mediaItems: BeforeAfterMediaItem[] = useMemo(() => {
    const items: BeforeAfterMediaItem[] = [];
    let itemId = 1;

    groupedItems.forEach((group) => {
      if (group.views.length === 1) {
        // Single view - create one item
        const view = group.views[0];
        items.push({
          id: itemId++,
          url: view.beforeUrl || view.afterUrl,
          type: "before-after",
          title: view.title || group.baseName,
          thumbnailUrl: view.beforeUrl || view.afterUrl,
          beforeUrl: view.beforeUrl,
          afterUrl: view.afterUrl,
        });
      } else {
        // Multiple views - create one item representing the group
        const firstView = group.views[0];
        items.push({
          id: itemId++,
          url: firstView.beforeUrl || firstView.afterUrl,
          type: "before-after",
          title: group.baseName,
          thumbnailUrl: firstView.beforeUrl || firstView.afterUrl,
          beforeUrl: firstView.beforeUrl,
          afterUrl: firstView.afterUrl,
        });
      }
    });

    return items;
  }, [groupedItems]);

  const [currentViewIndex, setCurrentViewIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>("slider");
  const [dividerPosition, setDividerPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(
    mediaItems.length > 0 ? mediaItems[0].id : null,
  );
  const [focusedItemId, setFocusedItemId] = useState<number | null>(
    mediaItems.length > 0 ? mediaItems[0].id : null,
  );
  // If there's only one item, show list view instead of fullscreen grid
  const [isFullscreenGrid, setIsFullscreenGrid] = useState(
    mediaItems.length > 1 ? true : false,
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const [gridColumns, setGridColumns] = useState(4);
  const imageLoadStateRef = useRef({ before: false, after: false });

  // Initialize search query
  const getInitialSearchQuery = () => {
    if (mediaItems && mediaItems.length > 0) {
      const firstItem = mediaItems[0];
      return firstItem.title || getDisplayTitle(firstItem);
    }
    return "";
  };
  const [searchQuery, setSearchQuery] = useState(getInitialSearchQuery());

  const selectedItem = useMemo(() => {
    if (!mediaItems || mediaItems.length === 0) return null;
    return (
      mediaItems.find((item) => item.id === selectedItemId) ||
      mediaItems[0] ||
      null
    );
  }, [mediaItems, selectedItemId]);

  // Update search query when selected item changes
  useEffect(() => {
    if (selectedItem) {
      const title = selectedItem.title || getDisplayTitle(selectedItem);
      setSearchQuery(title);
    }
  }, [selectedItem?.id]);

  // If there's only one item, show list view instead of fullscreen grid
  useEffect(() => {
    if (mediaItems && mediaItems.length === 1) {
      setIsFullscreenGrid(false);
    }
  }, [mediaItems.length]);

  // Sync focusedItemId when entering fullscreen grid mode
  useEffect(() => {
    if (isFullscreenGrid && mediaItems.length > 0) {
      if (focusedItemId === null) {
        setFocusedItemId(mediaItems[0].id);
      }
    }
  }, [isFullscreenGrid]);

  // Get current views for the selected item
  const currentViews = useMemo(() => {
    if (!selectedItem) return viewsData;

    // Find the group that contains this item
    const group = groupedItems.find((g) => {
      const groupTitle = g.views[0]?.title || "";
      const groupBase = getBaseName(groupTitle);
      const itemBase = getBaseName(selectedItem.title || "");
      return groupBase === itemBase;
    });

    return group?.views || viewsData;
  }, [selectedItem, groupedItems, viewsData]);

  // Sync currentViewIndex when selectedItem changes
  useEffect(() => {
    if (selectedItem && currentViews.length > 0) {
      setCurrentViewIndex(0); // Reset to first view of selected item
    }
  }, [selectedItem?.id, currentViews.length]);

  // Calculate grid columns
  useEffect(() => {
    if (isFullscreenGrid && gridContainerRef.current) {
      const updateColumns = () => {
        const container = gridContainerRef.current;
        if (!container || container.children.length === 0) return;

        const firstRowChildren: Element[] = [];
        const firstChild = container.firstElementChild;
        if (firstChild) {
          const firstChildRect = firstChild.getBoundingClientRect();
          const firstRowTop = firstChildRect.top;

          Array.from(container.children).forEach((child) => {
            const childRect = child.getBoundingClientRect();
            if (Math.abs(childRect.top - firstRowTop) < 10) {
              firstRowChildren.push(child);
            }
          });

          if (firstRowChildren.length > 0) {
            setGridColumns(firstRowChildren.length);
          }
        }
      };

      // Use setTimeout to ensure DOM is rendered
      const timeoutId = setTimeout(() => {
        updateColumns();
      }, 100);

      // Also try immediately in case DOM is already ready
      updateColumns();

      const resizeObserver = new ResizeObserver(() => {
        // Small delay to ensure layout is complete
        setTimeout(updateColumns, 50);
      });
      resizeObserver.observe(gridContainerRef.current);

      // Also observe when children are added
      const mutationObserver = new MutationObserver(() => {
        setTimeout(updateColumns, 50);
      });
      mutationObserver.observe(gridContainerRef.current, {
        childList: true,
        subtree: true,
      });

      return () => {
        clearTimeout(timeoutId);
        resizeObserver.disconnect();
        mutationObserver.disconnect();
      };
    } else {
      // Reset gridColumns when not in fullscreen grid
      setGridColumns(4);
    }
  }, [isFullscreenGrid, mediaItems.length]);

  // Get current view data from currentViews
  const currentView = currentViews[currentViewIndex] || currentViews[0];
  const hasBeforeImage = currentView?.beforeUrl && currentView.beforeUrl !== "";
  const hasAfterImage = currentView?.afterUrl && currentView.afterUrl !== "";
  const isSingleImage =
    (hasBeforeImage && !hasAfterImage) || (!hasBeforeImage && hasAfterImage);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    // Reset image load state
    imageLoadStateRef.current = { before: false, after: false };

    // Check if images are already cached
    const checkImageCached = (url: string): boolean => {
      const img = new Image();
      img.src = url;
      // If image is cached, it will be complete immediately
      return img.complete && img.naturalWidth > 0;
    };

    // Check cache first
    let beforeCached = false;
    let afterCached = false;

    if (hasBeforeImage) {
      beforeCached = checkImageCached(currentView.beforeUrl);
      if (beforeCached) {
        imageLoadStateRef.current.before = true;
      }
    }

    if (hasAfterImage) {
      afterCached = checkImageCached(currentView.afterUrl);
      if (afterCached) {
        imageLoadStateRef.current.after = true;
      }
    }

    // If all images are cached, show immediately
    if (isSingleImage) {
      if (
        (hasBeforeImage && beforeCached) ||
        (hasAfterImage && afterCached) ||
        (!hasBeforeImage && !hasAfterImage)
      ) {
        setIsLoading(false);
        return;
      }
    } else {
      if (
        (beforeCached && afterCached) ||
        (!hasBeforeImage && !hasAfterImage)
      ) {
        setIsLoading(false);
        return;
      }
    }

    // Preload images to cache them (they will trigger onLoad handlers in img elements)
    if (hasBeforeImage && !beforeCached) {
      const img = new Image();
      img.src = currentView.beforeUrl;
      // Images will load via img element's onLoad handler which calls handleImageLoad
    }

    if (hasAfterImage && !afterCached) {
      const img = new Image();
      img.src = currentView.afterUrl;
      // Images will load via img element's onLoad handler which calls handleImageLoad
    }

    // If no images, stop loading
    if (!hasBeforeImage && !hasAfterImage) {
      setIsLoading(false);
    }
  }, [
    currentView.beforeUrl,
    currentView.afterUrl,
    currentViewIndex,
    hasBeforeImage,
    hasAfterImage,
    isSingleImage,
  ]);

  const handleItemSelect = useCallback((item: BeforeAfterMediaItem) => {
    setSelectedItemId(item.id);
    setIsFullscreenGrid(false);
    setIsLoading(true);
    setError(null);
  }, []);

  const handleViewModeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMode: ViewMode | null,
  ) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  const handleTopBarViewModeChange = (
    _mode: "list" | "grid",
    fullscreen: boolean,
  ) => {
    setIsFullscreenGrid(fullscreen);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
    setIsFullscreenGrid(true);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleFileChange = (_event: React.SyntheticEvent, value: unknown) => {
    if (value && typeof value === "object" && "id" in value) {
      handleItemSelect(value as BeforeAfterMediaItem);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (!mediaItems || mediaItems.length === 0) return;

      if (isFullscreenGrid) {
        const currentIndex = mediaItems.findIndex(
          (item) => item.id === focusedItemId,
        );

        // Safety check: ensure gridColumns is valid
        if (currentIndex === -1 || gridColumns <= 0) {
          return;
        }

        const columns = gridColumns;
        const currentRow = Math.floor(currentIndex / columns);
        const currentCol = currentIndex % columns;

        switch (event.key) {
          case "ArrowLeft": {
            event.preventDefault();
            if (currentCol > 0) {
              const newIndex = currentIndex - 1;
              setFocusedItemId(mediaItems[newIndex].id);
            }
            break;
          }
          case "ArrowRight": {
            event.preventDefault();
            if (
              currentCol < columns - 1 &&
              currentIndex < mediaItems.length - 1
            ) {
              const newIndex = currentIndex + 1;
              if (newIndex < mediaItems.length) {
                setFocusedItemId(mediaItems[newIndex].id);
              }
            }
            break;
          }
          case "ArrowUp": {
            event.preventDefault();
            if (currentRow > 0) {
              const newIndex = currentIndex - columns;
              if (newIndex >= 0) {
                setFocusedItemId(mediaItems[newIndex].id);
              }
            }
            break;
          }
          case "ArrowDown": {
            event.preventDefault();
            const newIndex = currentIndex + columns;
            if (newIndex < mediaItems.length) {
              setFocusedItemId(mediaItems[newIndex].id);
            }
            break;
          }
          case "Home": {
            event.preventDefault();
            if (mediaItems.length > 0) {
              setFocusedItemId(mediaItems[0].id);
            }
            break;
          }
          case "End": {
            event.preventDefault();
            if (mediaItems.length > 0) {
              setFocusedItemId(mediaItems[mediaItems.length - 1].id);
            }
            break;
          }
          case "Enter":
          case " ": {
            if (focusedItemId !== null) {
              const focusedItem = mediaItems.find(
                (item) => item.id === focusedItemId,
              );
              if (focusedItem) {
                event.preventDefault();
                handleItemSelect(focusedItem);
              }
            }
            break;
          }
          case "Escape":
          case "Backspace": {
            break;
          }
        }
      } else {
        const currentIndex = mediaItems.findIndex(
          (item) => item.id === selectedItemId,
        );

        switch (event.key) {
          case "ArrowLeft":
          case "ArrowUp": {
            event.preventDefault();
            if (currentIndex > 0) {
              const prevItem = mediaItems[currentIndex - 1];
              handleItemSelect(prevItem);
            }
            break;
          }
          case "ArrowRight":
          case "ArrowDown": {
            event.preventDefault();
            if (currentIndex < mediaItems.length - 1) {
              const nextItem = mediaItems[currentIndex + 1];
              handleItemSelect(nextItem);
            }
            break;
          }
          case "Home": {
            event.preventDefault();
            if (mediaItems.length > 0) {
              handleItemSelect(mediaItems[0]);
            }
            break;
          }
          case "End": {
            event.preventDefault();
            if (mediaItems.length > 0) {
              handleItemSelect(mediaItems[mediaItems.length - 1]);
            }
            break;
          }
          case "Escape":
          case "Backspace": {
            event.preventDefault();
            setIsFullscreenGrid(true);
            break;
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    mediaItems,
    selectedItemId,
    focusedItemId,
    isFullscreenGrid,
    handleItemSelect,
    gridColumns,
  ]);

  const handleImageLoad = useCallback(
    (type: "before" | "after") => {
      // Image loaded successfully
      console.log(`${type} image loaded`);

      // Update loading state
      imageLoadStateRef.current[type] = true;

      // Check if all required images are loaded
      const state = imageLoadStateRef.current;
      const currentView = currentViews[currentViewIndex] || currentViews[0];
      const hasBefore = currentView?.beforeUrl && currentView.beforeUrl !== "";
      const hasAfter = currentView?.afterUrl && currentView.afterUrl !== "";
      const isSingle = (hasBefore && !hasAfter) || (!hasBefore && hasAfter);

      if (isSingle) {
        if ((hasBefore && state.before) || (hasAfter && state.after)) {
          setIsLoading(false);
        }
      } else {
        if ((!hasBefore || state.before) && (!hasAfter || state.after)) {
          setIsLoading(false);
        }
      }
    },
    [currentViews, currentViewIndex],
  );

  const handleImageError = (type: "before" | "after") => {
    console.error(`Failed to load ${type} image`);
    setError(`Failed to load ${type} image`);
  };

  // Slider mode handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isSingleImage) return;
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || isSingleImage) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setDividerPosition(percentage);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = () => {
    if (isSingleImage) return;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || isSingleImage) return;
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setDividerPosition(percentage);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = "ew-resize";
      const handleGlobalMouseUp = () => setIsDragging(false);
      window.addEventListener("mouseup", handleGlobalMouseUp);
      return () => {
        document.body.style.cursor = "";
        window.removeEventListener("mouseup", handleGlobalMouseUp);
      };
    }
  }, [isDragging]);

  const renderSliderView = () => (
    <SliderContainer
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <ImageContainer>
        {isSingleImage ? (
          <BeforeImage
            src={currentView.beforeUrl || currentView.afterUrl}
            alt={currentView.beforeUrl ? "Before" : "After"}
            loading="lazy"
            onLoad={() =>
              handleImageLoad(currentView.beforeUrl ? "before" : "after")
            }
            onError={() =>
              handleImageError(currentView.beforeUrl ? "before" : "after")
            }
          />
        ) : (
          <>
            <BeforeImageWrapper>
              <BeforeImage
                src={currentView.beforeUrl}
                alt="Before"
                loading="lazy"
                onLoad={() => handleImageLoad("before")}
                onError={() => handleImageError("before")}
              />
            </BeforeImageWrapper>
            <AfterImageWrapper clipWidth={dividerPosition}>
              <AfterImage
                src={currentView.afterUrl}
                alt="After"
                loading="lazy"
                onLoad={() => handleImageLoad("after")}
                onError={() => handleImageError("after")}
              />
            </AfterImageWrapper>
            <Divider
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              sx={{ left: `${dividerPosition}%` }}
            />
          </>
        )}
      </ImageContainer>
    </SliderContainer>
  );

  const renderSideBySideView = () => (
    <SideBySideContainer
      sx={{
        width: isMobile ? "75%" : isTablet ? "85%" : "88%",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      {isSingleImage ? (
        <SideImageBox>
          <SideImage
            src={currentView.beforeUrl || currentView.afterUrl}
            alt={currentView.beforeUrl ? "Before" : "After"}
            loading="lazy"
            onLoad={() =>
              handleImageLoad(currentView.beforeUrl ? "before" : "after")
            }
            onError={() =>
              handleImageError(currentView.beforeUrl ? "before" : "after")
            }
          />
        </SideImageBox>
      ) : (
        <StyledBox>
          <SideImageBox>
            <SideImage
              src={currentView.beforeUrl}
              alt="Before"
              loading="lazy"
              onLoad={() => handleImageLoad("before")}
              onError={() => handleImageError("before")}
              draggable={false}
              crossOrigin="anonymous"
            />
          </SideImageBox>

          <StyledDivider />

          <SideImageBox>
            <SideImage
              src={currentView.afterUrl}
              alt="After"
              loading="lazy"
              onLoad={() => handleImageLoad("after")}
              onError={() => handleImageError("after")}
              draggable={false}
              crossOrigin="anonymous"
            />
          </SideImageBox>
        </StyledBox>
      )}
    </SideBySideContainer>
  );

  // Calculate responsive values based on container width
  const viewNavWidth = isMobile
    ? "20%"
    : isTablet
      ? "15%"
      : isDesktop
        ? "12%"
        : "12%";
  const toggleButtonWidth = isMobile ? 65 : isTablet ? 36 : isDesktop ? 40 : 36;
  const toggleButtonHeight = isMobile
    ? 35
    : isTablet
      ? 70
      : isDesktop
        ? 80
        : 70;
  const toggleButtonBorderRadius = isMobile ? "8px 8px 0 0" : "8px 0 0 8px";
  const viewButtonPadding = isMobile ? 0.25 : 0.5;
  const viewLabelFontSize = isMobile
    ? "0.55rem"
    : isTablet
      ? "0.6rem"
      : "0.65rem";
  const controlsMarginLeft = isMobile ? "20%" : isTablet ? "15%" : 0;

  return (
    <ThemeProvider theme={theme}>
      <ViewerContainerWrapper ref={containerRef} style={{ width, height }}>
        <TopBar
          searchOptions={mediaItems}
          selectedFile={selectedItem}
          searchQuery={searchQuery}
          isFullscreenGrid={isFullscreenGrid}
          onBack={handleBack}
          onFileChange={handleFileChange}
          onSearchQueryChange={setSearchQuery}
          onViewModeChange={handleTopBarViewModeChange}
        />

        <MainContentWrapper
          sx={{
            flexDirection: isMobile && !isFullscreenGrid ? "column" : "row",
            height: "100%",
            minHeight: 0,
          }}
        >
          {isFullscreenGrid ? (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                padding: 0,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  overflow: "auto",
                  padding: 2,
                }}
              >
                <Sidebar
                  activeItemId={focusedItemId}
                  items={mediaItems}
                  onItemSelect={handleItemSelect}
                  viewMode="fullscreen-grid"
                  gridContainerRef={gridContainerRef}
                  containerWidth={containerSize.width}
                />
              </Box>
            </Box>
          ) : (
            <>
              <MainContainer
                sx={{
                  flex: isMobile ? (sidebarOpen ? "1 1 50%" : "1 1 100%") : 1,
                  minHeight: 0,
                  height: isMobile ? (sidebarOpen ? "50%" : "100%") : "100%",
                  backgroundImage: `url(${backgroundPattern})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  overflow: "hidden",
                }}
              >
                {/* View Navigation (show if current item has multiple views) */}
                {currentViews.length > 1 && (
                  <ViewNavigationButtons
                    sx={{
                      width: viewNavWidth,
                    }}
                  >
                    {currentViews.map((view, index) => (
                      <Tooltip
                        key={index}
                        title={
                          view.title ||
                          `View ${index + 1} of ${currentViews.length}`
                        }
                        placement="right"
                      >
                        <ViewButton
                          isActive={index === currentViewIndex}
                          onClick={() => setCurrentViewIndex(index)}
                          sx={{
                            padding: (theme) =>
                              theme.spacing(viewButtonPadding),
                          }}
                        >
                          <Box
                            sx={{
                              position: "relative",
                              height: {
                                xs: 50,
                                sm: 70,
                                md: 90,
                                lg: 100,
                                xl: 120,
                              },
                              width: "100%",
                            }}
                          >
                            {!view.beforeUrl || !view.afterUrl ? (
                              <Box
                                sx={{
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  overflow: "hidden",
                                  borderRadius: "4px",
                                }}
                              >
                                <img
                                  src={view.beforeUrl || view.afterUrl}
                                  alt={view.beforeUrl ? "Before" : "After"}
                                  loading="lazy"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </Box>
                            ) : (
                              <BeforeAfterThumbnail>
                                <HalfImage
                                  src={view.beforeUrl}
                                  alt="Before"
                                  loading="lazy"
                                />
                                <HalfImage
                                  src={view.afterUrl}
                                  alt="After"
                                  loading="lazy"
                                />
                                <ThumbnailDivider />
                              </BeforeAfterThumbnail>
                            )}
                          </Box>
                          <ViewLabel
                            sx={{
                              fontSize: viewLabelFontSize,
                            }}
                          >
                            {index + 1}/{currentViews.length}
                          </ViewLabel>
                        </ViewButton>
                      </Tooltip>
                    ))}
                  </ViewNavigationButtons>
                )}

                {/* Main Content Viewer */}
                <ViewerContainer>
                  {isLoading && (
                    <LoadingContainer>
                      <CircularProgress size={60} />
                      <Typography variant="body2" color="text.secondary">
                        Loading comparison images...
                      </Typography>
                    </LoadingContainer>
                  )}

                  {error && (
                    <Typography color="error" variant="h6">
                      {error}
                    </Typography>
                  )}

                  {!error && (
                    <>
                      <ContentContainer
                        sx={{
                          opacity: isLoading ? 0 : 1,
                          flex: 1,
                          minHeight: 0,
                          height: "100%",
                        }}
                      >
                        {viewMode === "slider"
                          ? renderSliderView()
                          : renderSideBySideView()}
                      </ContentContainer>

                      {!isSingleImage && (
                        <ControlsContainer
                          sx={{
                            marginLeft: controlsMarginLeft,
                            marginBottom: "10px",
                          }}
                        >
                          <StyledToggleButtonGroup
                            value={viewMode}
                            exclusive
                            onChange={handleViewModeChange}
                            aria-label="view mode"
                          >
                            <ToggleButton
                              value="slider"
                              aria-label="slider view"
                            >
                              <SwapHoriz />
                              <ButtonLabel>Slider</ButtonLabel>
                            </ToggleButton>
                            <ToggleButton
                              value="sideBySide"
                              aria-label="side by side view"
                            >
                              <ViewColumn />
                              <ButtonLabel>Split View</ButtonLabel>
                            </ToggleButton>
                          </StyledToggleButtonGroup>
                        </ControlsContainer>
                      )}
                    </>
                  )}
                </ViewerContainer>
              </MainContainer>

              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  flex: isMobile
                    ? sidebarOpen
                      ? "1 1 50%"
                      : "0 0 0"
                    : "0 0 auto",
                  height: isMobile ? (sidebarOpen ? "50%" : 0) : "100%",
                  minHeight: 0,
                }}
              >
                <Tooltip
                  title={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
                  placement="right"
                >
                  <SidebarToggleButton
                    onClick={toggleSidebar}
                    aria-label="toggle sidebar"
                    sidebarOpen={sidebarOpen}
                    sx={{
                      position: "absolute",
                      width: toggleButtonWidth,
                      height: toggleButtonHeight,
                      borderRadius: toggleButtonBorderRadius,
                      top: isMobile ? -35 : "50%",
                      right: isMobile ? 0 : undefined,
                      left: isMobile ? undefined : -39,
                      transform: isMobile ? "none" : "translateY(-50%)",
                      zIndex: 30,
                    }}
                  >
                    {sidebarOpen ? (
                      <>
                        <ChevronRight
                          sx={{
                            display: isMobile ? "none" : "block",
                          }}
                        />
                        <Box
                          sx={{
                            display: isMobile ? "block" : "none",
                            transform: "rotate(90deg)",
                          }}
                        >
                          <ChevronRight />
                        </Box>
                      </>
                    ) : (
                      <>
                        <ChevronLeft
                          sx={{
                            display: isMobile ? "none" : "block",
                          }}
                        />
                        <Box
                          sx={{
                            display: isMobile ? "block" : "none",
                            transform: "rotate(90deg)",
                          }}
                        >
                          <ChevronLeft />
                        </Box>
                      </>
                    )}
                  </SidebarToggleButton>
                </Tooltip>

                <Collapse
                  in={sidebarOpen}
                  orientation={isMobile ? "vertical" : "horizontal"}
                  timeout={300}
                  sx={{
                    height: "100%",
                    width: isMobile ? "100%" : undefined,
                    "& .MuiCollapse-wrapper": {
                      height: "100%",
                      width: isMobile ? "100%" : undefined,
                    },
                    "& .MuiCollapse-wrapperInner": {
                      display: "flex",
                      flexDirection: "column",
                      width: isMobile
                        ? "100%"
                        : isDesktop
                          ? 320
                          : isTablet
                            ? 280
                            : 320,
                      height: "100%",
                    },
                  }}
                >
                  <SidebarSection
                    sx={{
                      flex: isMobile ? "1 1 auto" : "0 0 auto",
                      height: "100%",
                      width: isMobile
                        ? "100%"
                        : isDesktop
                          ? 320
                          : isTablet
                            ? 280
                            : 320,
                    }}
                  >
                    <Sidebar
                      activeItemId={
                        isFullscreenGrid ? focusedItemId : selectedItemId
                      }
                      items={mediaItems}
                      onItemSelect={handleItemSelect}
                      viewMode={isFullscreenGrid ? "fullscreen-grid" : "list"}
                      containerWidth={containerSize.width}
                    />
                  </SidebarSection>
                </Collapse>
              </Box>
            </>
          )}
        </MainContentWrapper>
      </ViewerContainerWrapper>
    </ThemeProvider>
  );
};

export default BeforeAfter;

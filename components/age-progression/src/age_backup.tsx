"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import {
  Box,
  Slider,
  Typography,
  CircularProgress,
  Paper,
  Tooltip,
  ThemeProvider,
  CssBaseline,
  IconButton,
  Collapse,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Sidebar from "./components/Sidebar";
import backgroundPattern from "./assets/background-pattern.png";
import type { AgeMediaItem } from "./types";
import { theme } from "./theme";
import { useContainerSize } from "./hooks/useContainerSize";

export interface AgeMark {
  age: number; // Age value (e.g., 20, 25, 30)
  imageUrl?: string; // URL of the image for this age (backward compatible)
  imageUrls?: string[]; // Multiple URLs for side-by-side comparison
}

export interface AgeProgressionItem {
  id: number;
  ageMarks: AgeMark[];
  title: string;
  Description?: string;
}

export interface AgeProgressionProps {
  // Single age progression (backward compatible)
  ageMarks?: AgeMark[];
  title?: string;
  Description?: string;

  // Multiple age progressions (new)
  items?: AgeProgressionItem[];

  width?: string;
  height?: string;
  onBack?: () => void;
}

const ViewerContainer = styled(Box)({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  overflow: "hidden",
});

const MainContent = styled(Box)({
  flex: 1,
  display: "flex",
  overflow: "hidden",
  position: "relative",
  minHeight: 0,
});

const ContentContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  backgroundImage: `url(${backgroundPattern})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  gap: theme.spacing(3),
}));

const SidebarSection = styled(Box)({
  flex: "0 0 auto",
  height: "100%",
  overflow: "auto",
  position: "relative",
});

const ToggleButton = styled(IconButton, {
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

const ImageContainer = styled(Box)(({ theme }) => ({
  width: "95%",
  height: "80%",
  marginRight: theme.spacing(0),
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.spacing(2),
  overflow: "hidden",
  backgroundColor: "transparent",
  position: "relative",
  "& > div:nth-of-type(1)": {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  "& > div:nth-of-type(3)": {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const StyledImage = styled("img")({
  maxWidth: "100%",
  maxHeight: "100%",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
  userSelect: "none",
  transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
});

const SliderContainer = styled(Paper)(({ theme }) => ({
  width: "95%",
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
  marginLeft: "auto",
  padding: theme.spacing(2, 6, 2, 6),
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
}));

const StyledSlider = styled(Slider)(({ theme }) => ({
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
    background: `linear-gradient(90deg, ${
      theme.palette.primary.light || theme.palette.primary.main
    } 0%, ${theme.palette.primary.main} 100%)`,
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: theme.palette.background.paper,
    border: `3px solid ${theme.palette.primary.main}`,
    boxShadow: theme.shadows[2],
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: `0 0 0 5px ${theme.palette.primary.main}33`,
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-mark": {
    backgroundColor: theme.palette.divider,
    height: 12,
    width: 3,
    borderRadius: 1,
    "&.MuiSlider-markActive": {
      backgroundColor: theme.palette.primary.contrastText,
      opacity: 1,
    },
  },
  "& .MuiSlider-markLabel": {
    fontWeight: 600,
    fontSize: "1rem",
    color: theme.palette.text.secondary,
    transform: "translateX(-50%)",
    "&.MuiSlider-markLabelActive": {
      color: theme.palette.primary.main,
      fontWeight: 700,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.875rem",
    },
  },
  "& .MuiSlider-rail": {
    backgroundColor: theme.palette.divider,
    opacity: 1,
  },
}));

const LoadingContainer = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 16,
});

// Wrapper component to handle MUI theme provider and prevent hydration mismatch
const ThemeProviderWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

const AgeProgression: React.FC<AgeProgressionProps> = ({
  ageMarks: singleAgeMarks,
  title: singleTitle,
  Description: singleDescription,
  items: multipleItems,
  width = "100%",
  height = "100%",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerSize = useContainerSize(
    containerRef as React.RefObject<HTMLElement>,
  );
  // Use more appropriate breakpoints for mobile/tablet/desktop
  const isMobile = containerSize.width > 0 && containerSize.width < 768;
  const isTablet = containerSize.width >= 768 && containerSize.width < 1024;
  const isDesktop = containerSize.width >= 1024;
  // Normalize to multiple items format
  const allItems: AgeProgressionItem[] = useMemo(() => {
    if (multipleItems && multipleItems.length > 0) {
      return multipleItems;
    }
    // Backward compatibility: convert single ageMarks to items format
    if (singleAgeMarks && singleAgeMarks.length > 0) {
      return [
        {
          id: 1,
          ageMarks: singleAgeMarks,
          title: singleTitle || "Age Progression",
          Description: singleDescription,
        },
      ];
    }
    return [];
  }, [multipleItems, singleAgeMarks, singleTitle, singleDescription]);

  // Create media items for sidebar (one per age progression)
  const mediaItems: AgeMediaItem[] = useMemo(
    () =>
      allItems.map((item) => {
        const firstMark = item.ageMarks.length > 0 ? item.ageMarks[0] : null;
        const url = firstMark
          ? firstMark.imageUrls?.[0] || firstMark.imageUrl || ""
          : "";
        return {
          id: item.id,
          url,
          type: "age-progression",
          title: item.title,
          thumbnailUrl: url,
          age: firstMark?.age || 20,
        };
      }),
    [allItems],
  );

  // Get currently selected item
  const [selectedItemId, setSelectedItemId] = useState<number | null>(
    allItems.length > 0 ? allItems[0].id : null,
  );

  const selectedProgressionItem = useMemo(() => {
    return (
      allItems.find((item) => item.id === selectedItemId) || allItems[0] || null
    );
  }, [allItems, selectedItemId]);

  // Age marks as children items for navigation (from selected progression)
  const ageMarkItems: AgeMediaItem[] = useMemo(
    () =>
      selectedProgressionItem
        ? selectedProgressionItem.ageMarks.map((mark, index) => ({
            id: index + 1,
            url: mark.imageUrls?.[0] || mark.imageUrl || "",
            type: "image",
            title: `${mark.age} year`,
            thumbnailUrl: mark.imageUrls?.[0] || mark.imageUrl || "",
            age: mark.age,
            imageUrls: mark.imageUrls || (mark.imageUrl ? [mark.imageUrl] : []),
          }))
        : [],
    [selectedProgressionItem],
  );

  // Use selected progression's age marks
  const currentAgeMarks = selectedProgressionItem?.ageMarks || [];
  const currentTitle =
    selectedProgressionItem?.title || singleTitle || "Age Progression";

  const [currentAge, setCurrentAge] = useState<number>(
    currentAgeMarks.length > 0 ? currentAgeMarks[0].age : 20,
  );
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(
    currentAgeMarks.length > 0
      ? currentAgeMarks[0].imageUrls?.[0] || currentAgeMarks[0].imageUrl || ""
      : "",
  );
  const [currentImageUrl2, setCurrentImageUrl2] = useState<string>(
    currentAgeMarks.length > 0
      ? currentAgeMarks[0].imageUrls?.[1] ||
          currentAgeMarks[0].imageUrls?.[0] ||
          ""
      : "",
  );
  const [_preloadedImages, setPreloadedImages] = useState<
    Map<number, HTMLImageElement>
  >(new Map());
  const [imageReady, setImageReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  // If there's only one item, show list view instead of fullscreen grid
  const [isFullscreenGrid, setIsFullscreenGrid] = useState(
    allItems.length > 1 ? true : false,
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const gridContainerRef = useRef<HTMLDivElement>(
    null,
  ) as React.RefObject<HTMLDivElement>;
  const [gridColumns, setGridColumns] = useState(4);

  // Ensure selectedItemId is initialized
  useEffect(() => {
    if (selectedItemId === null && allItems.length > 0) {
      setSelectedItemId(allItems[0].id);
    }
  }, [selectedItemId, allItems]);

  // Update selected item when items change
  useEffect(() => {
    if (
      allItems &&
      allItems.length > 0 &&
      (!selectedItemId || !allItems.find((item) => item.id === selectedItemId))
    ) {
      setSelectedItemId(allItems[0].id);
      setIsLoading(true);
      setError(null);
    }
  }, [allItems, selectedItemId]);

  // If there's only one item, show list view instead of fullscreen grid
  useEffect(() => {
    if (allItems && allItems.length === 1) {
      setIsFullscreenGrid(false);
    }
  }, [allItems.length]);

  // Update current age when selected progression changes
  useEffect(() => {
    if (
      selectedProgressionItem &&
      selectedProgressionItem.ageMarks.length > 0
    ) {
      const firstAge = selectedProgressionItem.ageMarks[0].age;
      const firstMark = selectedProgressionItem.ageMarks[0];
      const url1 = firstMark.imageUrls?.[0] || firstMark.imageUrl || "";
      const url2 = firstMark.imageUrls?.[1] || firstMark.imageUrls?.[0] || "";
      setCurrentAge(firstAge);
      setCurrentImageUrl(url1);
      setCurrentImageUrl2(url2);
      setImageReady(false); // Reset to trigger animation
      setIsLoading(true);
      setError(null);
    }
  }, [selectedProgressionItem]);

  // Ensure currentAge is always within valid range when ageMarks change
  useEffect(() => {
    if (currentAgeMarks.length > 0) {
      const minAge = currentAgeMarks[0]?.age;
      const maxAge = currentAgeMarks[currentAgeMarks.length - 1]?.age;

      // Validate that ages are numbers
      if (
        typeof minAge !== "number" ||
        isNaN(minAge) ||
        typeof maxAge !== "number" ||
        isNaN(maxAge)
      ) {
        return;
      }

      // If currentAge is outside the valid range, reset it to the first age
      if (isNaN(currentAge) || currentAge < minAge || currentAge > maxAge) {
        setCurrentAge(minAge);
        const firstMark = currentAgeMarks[0];
        if (firstMark) {
          const url1 = firstMark.imageUrls?.[0] || firstMark.imageUrl;
          const url2 = firstMark.imageUrls?.[1] || firstMark.imageUrls?.[0];
          if (url1) setCurrentImageUrl(url1);
          if (url2) setCurrentImageUrl2(url2);
        }
      }
    }
  }, [currentAgeMarks]);

  // Calculate actual grid columns from the grid container
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
  }, [isFullscreenGrid, ageMarkItems.length]);

  // Update current age and image when age mark changes (from navigation)
  useEffect(() => {
    const currentAgeMark = ageMarkItems.find((item) => item.age === currentAge);
    if (currentAgeMark) {
      setCurrentImageUrl(currentAgeMark.url);
      const secondUrl =
        currentAgeMark.imageUrls?.[1] || currentAgeMark.imageUrls?.[0] || "";
      setCurrentImageUrl2(secondUrl);
      setImageReady(false);
      setIsLoading(true);
    }
  }, [currentAge, ageMarkItems]);

  useEffect(() => {
    // Preload all images for current progression
    const loadImages = async () => {
      const imageMap = new Map<number, HTMLImageElement>();
      const loadPromises = currentAgeMarks.map((mark) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => {
            imageMap.set(mark.age, img);
            resolve();
          };
          img.onerror = () => {
            console.error(`Failed to preload image for age ${mark.age}`);
            resolve();
          };
          // Use the first image from imageUrls array, or fall back to imageUrl
          img.src = mark.imageUrls?.[0] || mark.imageUrl || "";
        });
      });

      await Promise.all(loadPromises);
      setPreloadedImages(imageMap);
      setIsLoading(false);
      if (imageMap.has(currentAge)) {
        setImageReady(true);
      }
    };

    if (currentAgeMarks.length > 0) {
      loadImages();
    }
  }, [currentAgeMarks, currentAge]);

  const handleItemSelect = useCallback((item: AgeMediaItem) => {
    // If selecting a main age progression item
    if (item.type === "age-progression") {
      setSelectedItemId(item.id);
      setIsFullscreenGrid(false);
      setIsLoading(true);
      setError(null);
      return;
    }
    // If selecting an age mark child, navigate to that age
    if (item.age !== undefined) {
      setCurrentAge(item.age);
      setIsFullscreenGrid(false);
      setIsLoading(true);
      setError(null);
    }
  }, []);

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
      if (!ageMarkItems || ageMarkItems.length === 0) return;

      if (isFullscreenGrid) {
        // Navigate through main age progression items
        const currentIndex = mediaItems.findIndex(
          (item) => item.id === selectedItemId,
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
              if (newIndex >= 0) {
                handleItemSelect(mediaItems[newIndex]);
              }
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
                handleItemSelect(mediaItems[newIndex]);
              }
            }
            break;
          }
          case "ArrowUp": {
            event.preventDefault();
            if (currentRow > 0) {
              const newIndex = currentIndex - columns;
              if (newIndex >= 0) {
                handleItemSelect(mediaItems[newIndex]);
              }
            }
            break;
          }
          case "ArrowDown": {
            event.preventDefault();
            const newIndex = currentIndex + columns;
            if (newIndex < mediaItems.length) {
              handleItemSelect(mediaItems[newIndex]);
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
          case "Enter":
          case " ": {
            if (selectedItemId !== null) {
              const focusedItem = mediaItems.find(
                (item) => item.id === selectedItemId,
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
        // Navigate through age marks (children)
        const currentIndex = ageMarkItems.findIndex(
          (item) => item.age === currentAge,
        );

        switch (event.key) {
          case "ArrowLeft":
          case "ArrowUp": {
            event.preventDefault();
            if (currentIndex > 0) {
              const prevItem = ageMarkItems[currentIndex - 1];
              handleItemSelect(prevItem);
            }
            break;
          }
          case "ArrowRight":
          case "ArrowDown": {
            event.preventDefault();
            if (currentIndex < ageMarkItems.length - 1) {
              const nextItem = ageMarkItems[currentIndex + 1];
              handleItemSelect(nextItem);
            }
            break;
          }
          case "Home": {
            event.preventDefault();
            if (ageMarkItems.length > 0) {
              handleItemSelect(ageMarkItems[0]);
            }
            break;
          }
          case "End": {
            event.preventDefault();
            if (ageMarkItems.length > 0) {
              handleItemSelect(ageMarkItems[ageMarkItems.length - 1]);
            }
            break;
          }
          case "Escape":
          case "Backspace": {
            event.preventDefault();
            if (showInfo) {
              setShowInfo(false);
            } else {
              setIsFullscreenGrid(true);
            }
            break;
          }
          case "i":
          case "I": {
            if (!showInfo) {
              event.preventDefault();
              setShowInfo((prev) => !prev);
            }
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
    ageMarkItems,
    selectedItemId,
    isFullscreenGrid,
    currentAge,
    handleItemSelect,
    showInfo,
    gridColumns,
  ]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAgeChange = (_event: Event, newValue: number | number[]) => {
    const age = Array.isArray(newValue) ? newValue[0] : newValue;
    setCurrentAge(age);

    const mark = currentAgeMarks.find((m) => m.age === age);
    const url1 = mark?.imageUrls?.[0] || mark?.imageUrl;
    const url2 = mark?.imageUrls?.[1] || mark?.imageUrls?.[0];
    if (mark && url1 && url1 !== currentImageUrl) {
      // Always reset imageReady to trigger animation
      setImageReady(false);
      setIsLoading(true);
      setTimeout(() => {
        setCurrentImageUrl(url1);
        if (url2) setCurrentImageUrl2(url2);
        // Even if preloaded, wait a bit to show the animation
        // The onLoad handler will set imageReady to true
      }, 150);
    }
  };

  const handleImageLoad = () => {
    setImageReady(true);
    setIsLoading(false);
  };

  const handleImageError = () => {
    console.error("Failed to load age image for age:", currentAge);
    setImageReady(true);
    setIsLoading(false);
    setError(`Failed to load image for age ${currentAge}`);
  };

  if (allItems.length === 0) {
    return (
      <ThemeProviderWrapper>
        <ViewerContainer style={{ width, height }}>
          <ContentContainer>
            <Typography color="error">
              No age progression data provided
            </Typography>
          </ContentContainer>
        </ViewerContainer>
      </ThemeProviderWrapper>
    );
  }

  if (currentAgeMarks.length === 0) {
    return (
      <ThemeProviderWrapper>
        <ViewerContainer style={{ width, height }}>
          <ContentContainer>
            <Typography color="error">
              No age marks available for selected progression
            </Typography>
          </ContentContainer>
        </ViewerContainer>
      </ThemeProviderWrapper>
    );
  }

  const minAge = currentAgeMarks[0]?.age ?? 20;
  const maxAge = currentAgeMarks[currentAgeMarks.length - 1]?.age ?? 20;
  const step =
    currentAgeMarks.length > 1
      ? (currentAgeMarks[1]?.age ?? currentAgeMarks[0]?.age ?? 20) - minAge
      : 2;

  const sliderMarks = currentAgeMarks
    .filter((mark) => mark && typeof mark.age === "number" && !isNaN(mark.age))
    .map((mark) => ({
      value: mark.age,
      label:
        mark.age % 10 === 0 || mark.age === minAge || mark.age === maxAge
          ? `${mark.age} yrs`
          : "",
    }));

  // Ensure currentAge is within valid range for the slider
  const clampedCurrentAge = Math.max(minAge, Math.min(maxAge, currentAge));

  // Calculate responsive button sizes based on container width
  const toggleButtonWidth = isMobile ? 65 : isTablet ? 36 : isDesktop ? 40 : 36;
  const toggleButtonHeight = isMobile
    ? 35
    : isTablet
      ? 70
      : isDesktop
        ? 80
        : 70;
  const toggleButtonBorderRadius = isMobile ? "8px 8px 0 0" : "8px 0 0 8px";

  // Calculate responsive image container dimensions
  // Account for padding and gap in the ContentContainer
  const imageContainerWidth = isMobile ? "89%" : isTablet ? "92%" : "93%";
  // Use flex instead of fixed height for better responsive behavior
  const imageContainerFlex = isMobile
    ? "1 1 70%"
    : isTablet
      ? "1 1 75%"
      : "1 1 80%";

  // Calculate responsive slider container dimensions
  // Account for padding and gap in the ContentContainer
  const sliderContainerWidth = isMobile ? "89%" : isTablet ? "92%" : "93%";
  const sliderContainerPadding = isMobile
    ? [1, 4, 1, 4]
    : isTablet
      ? [4, 4, 6, 4]
      : [2, 6, 2, 6];

  return (
    <ThemeProviderWrapper>
      <ViewerContainer ref={containerRef} style={{ width, height }}>
        <MainContent
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
                  activeItemId={selectedItemId}
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
              <ContentContainer
                sx={{
                  flex: isMobile ? (sidebarOpen ? "1 1 50%" : "1 1 100%") : 1,
                  minHeight: 0,
                  height: isMobile ? (sidebarOpen ? "50%" : "100%") : "100%",
                  padding: isMobile
                    ? (theme) => theme.spacing(2)
                    : isTablet
                      ? (theme) => theme.spacing(1.5)
                      : (theme) => theme.spacing(1),
                  paddingRight: isMobile
                    ? (theme) => theme.spacing(0)
                    : (theme) => theme.spacing(1),
                  gap: isMobile
                    ? (theme) => theme.spacing(2)
                    : isTablet
                      ? (theme) => theme.spacing(2)
                      : (theme) => theme.spacing(3),
                  justifyContent: isMobile ? "flex-start" : "center",
                  alignItems: isMobile ? "stretch" : "center",
                  overflow: "auto",
                  boxSizing: "border-box",
                }}
              >
                {isLoading && !imageReady && (
                  <LoadingContainer>
                    <CircularProgress size={60} sx={{ color: "white" }} />
                    <Typography variant="body2" sx={{ color: "white" }}>
                      Loading images...
                    </Typography>
                  </LoadingContainer>
                )}

                <ImageContainer
                  sx={{
                    width: imageContainerWidth,
                    maxWidth: "100%",
                    flex: imageContainerFlex,
                    minHeight: 0,
                    maxHeight: "100%",
                    boxSizing: "border-box",
                    display: "flex",
                    gap: 0,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <StyledImage
                      key={`${currentImageUrl}-${currentAge}`}
                      src={currentImageUrl}
                      alt={`${currentTitle} - Age ${currentAge}`}
                      loading="lazy"
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                      draggable={false}
                      crossOrigin="anonymous"
                      style={{
                        opacity: imageReady ? 1 : 0,
                        borderRadius: "16px 0px 0px 16px",
                        transform: imageReady ? "scale(1)" : "scale(0.80)",
                        transition:
                          "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      width: "1px",
                      height: "100%",
                      backgroundColor: (theme) => theme.palette.divider,
                    }}
                  />

                  <Box
                    sx={{
                      flex: 1,
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <StyledImage
                      key={`${currentImageUrl2}-${currentAge}-right`}
                      src={currentImageUrl2}
                      alt={`${currentTitle} - Age ${currentAge} (Comparison)`}
                      loading="lazy"
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                      draggable={false}
                      crossOrigin="anonymous"
                      style={{
                        opacity: imageReady ? 1 : 0,
                        borderRadius: "0px 16px 16px 0px",
                        transform: imageReady ? "scale(1)" : "scale(0.80)",
                        transition:
                          "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
                      }}
                    />
                  </Box>
                </ImageContainer>

                <SliderContainer
                  elevation={0}
                  sx={{
                    width: sliderContainerWidth,
                    maxWidth: "100%",
                    boxSizing: "border-box",
                    padding: (theme) =>
                      theme.spacing(
                        sliderContainerPadding[0],
                        sliderContainerPadding[1],
                        sliderContainerPadding[2],
                        sliderContainerPadding[3],
                      ),
                  }}
                >
                  <StyledSlider
                    value={clampedCurrentAge}
                    onChange={handleAgeChange}
                    min={minAge}
                    max={maxAge}
                    step={step}
                    marks={sliderMarks}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value} yrs`}
                  />
                </SliderContainer>

                {error && (
                  <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                  </Typography>
                )}
              </ContentContainer>

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
                  <ToggleButton
                    onClick={toggleSidebar}
                    aria-label="toggle sidebar"
                    sidebarOpen={sidebarOpen}
                    sx={{
                      position: "absolute",
                      width: toggleButtonWidth,
                      height: toggleButtonHeight,
                      borderRadius: toggleButtonBorderRadius,
                      top: isMobile ? -35 : "50%",
                      left: isMobile ? "45%" : -39,
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
                  </ToggleButton>
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
                      activeItemId={selectedItemId}
                      items={mediaItems}
                      onItemSelect={handleItemSelect}
                      viewMode="list"
                      containerWidth={containerSize.width}
                    />
                  </SidebarSection>
                </Collapse>
              </Box>
            </>
          )}
        </MainContent>
      </ViewerContainer>
    </ThemeProviderWrapper>
  );
};

export default AgeProgression;

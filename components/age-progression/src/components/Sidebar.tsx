import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Box, Paper, Typography, Zoom } from "@mui/material";
import { styled } from "@mui/material/styles";
import { List } from "react-window";
import SidebarItem from "./SidebarItem";
import type { AgeMediaItem } from "../types";

const LIST_ROW_HEIGHT = 56;
const VIRTUALIZE_THRESHOLD = 20;

interface SidebarProps {
  activeItemId: number | null;
  items: AgeMediaItem[];
  onItemSelect: (item: AgeMediaItem) => void;
  viewMode: "list" | "grid" | "fullscreen-grid";
  gridContainerRef?: React.RefObject<HTMLDivElement>;
  containerWidth?: number;
}

const SidebarContainer = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "viewMode",
})<{ viewMode: "list" | "grid" | "fullscreen-grid" }>(
  ({ theme, viewMode }) => ({
    width: viewMode === "fullscreen-grid" ? "100%" : 320,
    height: "100%",
    backgroundColor: theme.palette.background.paper,
    borderLeft:
      viewMode === "fullscreen-grid"
        ? "none"
        : `1px solid ${theme.palette.divider}`,
    display: "flex",
    flexDirection: "column",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  })
);

const GridContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "viewMode",
})<{ viewMode: "list" | "grid" | "fullscreen-grid" }>(
  ({ theme, viewMode }) => ({
    display: "grid",
    gridTemplateColumns:
      viewMode === "list"
        ? "repeat(1, 1fr)"
        : viewMode === "fullscreen-grid"
        ? "repeat(auto-fill, minmax(200px, 1fr))"
        : "repeat(2, 1fr)",
    gap: viewMode === "fullscreen-grid" ? theme.spacing(2) : theme.spacing(1),
    padding:
      viewMode === "fullscreen-grid" ? theme.spacing(3) : theme.spacing(1),
    transition: "all 0.3s ease",
  })
);

const Sidebar: React.FC<SidebarProps> = memo(
  ({
    activeItemId,
    items,
    onItemSelect,
    viewMode,
    gridContainerRef: externalRef,
    containerWidth = 0,
  }) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const gridContainerRef = externalRef || internalRef;
    const listContainerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const [listHeight, setListHeight] = useState(400);
    const useVirtualizedList =
      viewMode === "list" && items.length > VIRTUALIZE_THRESHOLD;

    useEffect(() => {
      if (!useVirtualizedList || !listContainerRef.current) return;
      const el = listContainerRef.current;
      const ro = new ResizeObserver((entries) => {
        const { height } = entries[0]?.contentRect ?? {};
        if (typeof height === "number" && height > 0) setListHeight(height);
      });
      ro.observe(el);
      return () => ro.disconnect();
    }, [useVirtualizedList]);

    // Calculate responsive values based on container width
    const isMobile = containerWidth > 0 && containerWidth < 768;
    const isTablet = containerWidth >= 768 && containerWidth < 1024;
    const isDesktop = containerWidth >= 1024;

    // Sidebar width based on container size
    const sidebarWidth =
      viewMode === "fullscreen-grid"
        ? "100%"
        : isDesktop
        ? 320
        : isTablet
        ? 280
        : "100%";

    // Grid columns based on container size
    const getGridColumns = () => {
      if (viewMode === "list") return "repeat(1, 1fr)";
      if (viewMode === "fullscreen-grid") {
        if (isMobile) return "repeat(auto-fill, minmax(150px, 1fr))";
        if (isTablet) return "repeat(auto-fill, minmax(180px, 1fr))";
        return "repeat(auto-fill, minmax(200px, 1fr))";
      }
      // Grid mode (2 columns)
      if (isMobile) return "repeat(1, 1fr)";
      return "repeat(2, 1fr)";
    };

    // Gap and padding based on container size
    const gridGap =
      viewMode === "fullscreen-grid"
        ? isMobile
          ? 1
          : isTablet
          ? 1.5
          : 2
        : isMobile
        ? 0.75
        : 1;
    const gridPadding =
      viewMode === "fullscreen-grid"
        ? isMobile
          ? 1
          : isTablet
          ? 2
          : 3
        : isMobile
        ? 0.75
        : 1;

    const handleItemClick = useCallback(
      (item: AgeMediaItem) => {
        onItemSelect(item);
      },
      [onItemSelect]
    );

    // Trigger animation when entering fullscreen-grid mode
    useEffect(() => {
      if (viewMode === "fullscreen-grid") {
        // Small delay to ensure DOM is ready
        const timer = setTimeout(() => {
          setShouldAnimate(true);
        }, 50);
        return () => clearTimeout(timer);
      } else {
        setShouldAnimate(false);
      }
    }, [viewMode]);

    // Scroll to active item when viewMode changes to list or activeItemId changes
    useEffect(() => {
      if (
        activeItemId !== null &&
        viewMode === "list" &&
        gridContainerRef.current &&
        itemRefs.current[activeItemId]
      ) {
        const activeElement = itemRefs.current[activeItemId];
        const container = gridContainerRef.current;

        setTimeout(() => {
          if (activeElement && container) {
            const containerRect = container.getBoundingClientRect();
            const elementRect = activeElement.getBoundingClientRect();

            const scrollTop =
              container.scrollTop +
              elementRect.top -
              containerRect.top -
              containerRect.height / 2 +
              elementRect.height / 2;

            container.scrollTo({
              top: scrollTop,
              behavior: "smooth",
            });
          }
        }, 100);
      }
    }, [activeItemId, viewMode]);

    return (
      <SidebarContainer
        elevation={0}
        viewMode={viewMode}
        sx={{
          width: sidebarWidth,
          minHeight: 0,
          flex:
            isMobile && viewMode !== "fullscreen-grid" ? "1 1 auto" : undefined,
          borderLeft:
            viewMode === "fullscreen-grid" || isMobile
              ? "none"
              : (theme) => `1px solid ${theme.palette.divider}`,
          borderTop:
            viewMode === "fullscreen-grid"
              ? "none"
              : isMobile
              ? (theme) => `1px solid ${theme.palette.divider}`
              : "none",
        }}
      >
        {items.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              padding: 3,
            }}
          >
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "center", fontWeight: "medium" }}
            >
              No content found
            </Typography>
          </Box>
        ) : useVirtualizedList ? (
          <Box
            ref={listContainerRef}
            sx={{
              flex: 1,
              minHeight: 0,
              overflow: "hidden",
              padding: (theme) => theme.spacing(gridPadding),
            }}
          >
            <List
              rowCount={items.length}
              rowHeight={LIST_ROW_HEIGHT}
              // @ts-expect-error react-window v2 type mismatch
              height={listHeight}
              width="100%"
              overscanCount={5}
              rowComponent={({
                index,
                style,
                items: rowItems,
                activeItemId: activeId,
                onItemSelect,
              }) => {
                const item = rowItems[index];
                return (
                  <Box
                    ref={(el: HTMLDivElement | null) => {
                      itemRefs.current[item.id] = el;
                    }}
                    style={{ ...style, paddingBottom: 4 }}
                  >
                    <SidebarItem
                      item={item}
                      isActive={item.id === activeId}
                      onClick={() => onItemSelect(item)}
                      viewMode="list"
                    />
                  </Box>
                );
              }}
              rowProps={{
                items,
                activeItemId,
                onItemSelect: handleItemClick,
              }}
            />
          </Box>
        ) : (
          <GridContainer
            ref={gridContainerRef}
            viewMode={viewMode}
            sx={{
              overflowY: viewMode === "list" ? "auto" : "visible",
              overflowX: "hidden",
              gridTemplateColumns: getGridColumns(),
              gap: (theme) => theme.spacing(gridGap),
              padding: (theme) => theme.spacing(gridPadding),
            }}
          >
            {items.map((item, index) => {
              const delay = viewMode === "fullscreen-grid" ? index * 110 : 0;
              return (
                <Zoom
                  key={item.id}
                  in={viewMode === "fullscreen-grid" ? shouldAnimate : true}
                  timeout={500}
                  style={{
                    transitionDelay:
                      viewMode === "fullscreen-grid" && shouldAnimate
                        ? `${delay}ms`
                        : "0ms",
                  }}
                >
                  <Box
                    ref={(el: HTMLDivElement | null) => {
                      itemRefs.current[item.id] = el;
                    }}
                  >
                    <SidebarItem
                      item={item}
                      isActive={item.id === activeItemId}
                      onClick={() => handleItemClick(item)}
                      viewMode={
                        viewMode === "fullscreen-grid" ? "grid" : "grid"
                      }
                    />
                  </Box>
                </Zoom>
              );
            })}
          </GridContainer>
        )}
      </SidebarContainer>
    );
  }
);

Sidebar.displayName = "Sidebar";

export default Sidebar;

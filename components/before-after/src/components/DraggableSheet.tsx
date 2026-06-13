import React, { useRef, useEffect } from "react";
import { useSpring, animated, config } from "react-spring";
import { useDrag } from "@use-gesture/react";
import { Close } from "@mui/icons-material";

interface DraggableSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const SNAP_POINTS = {
  CLOSED: 0,
  PEEK: 280,
  HALF: 550,
  FULL: 800,
};

export const DraggableSheet: React.FC<DraggableSheetProps> = ({
  isOpen,
  onClose,
  children,
  title = "Details",
}) => {
  const [{ y }, api] = useSpring(() => ({
    y: SNAP_POINTS.CLOSED,
    config: config.stiff,
  }));

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const getSnapPoint = (
    currentY: number,
    velocity: number,
    direction: number
  ): number => {
    if (velocity > 0.5 && direction > 0) {
      return SNAP_POINTS.CLOSED;
    }

    if (velocity > 0.5 && direction < 0) {
      if (currentY < SNAP_POINTS.HALF) {
        return SNAP_POINTS.FULL;
      }
      return SNAP_POINTS.HALF;
    }

    const snapPoints = [
      SNAP_POINTS.CLOSED,
      SNAP_POINTS.PEEK,
      SNAP_POINTS.HALF,
      SNAP_POINTS.FULL,
    ];

    let closest = snapPoints[0];
    let minDistance = Math.abs(currentY - closest);

    for (const point of snapPoints) {
      const distance = Math.abs(currentY - point);
      if (distance < minDistance) {
        minDistance = distance;
        closest = point;
      }
    }

    return closest;
  };

  const bind = useDrag(
    ({ last, movement: [, my], velocity: [, vy], direction: [, dy], memo }) => {
      const startY = memo ?? y.get();
      const newY = Math.max(
        SNAP_POINTS.CLOSED - 50,
        Math.min(SNAP_POINTS.FULL + 50, startY - my)
      );

      if (last) {
        const clampedY = Math.max(
          SNAP_POINTS.CLOSED,
          Math.min(SNAP_POINTS.FULL, newY)
        );
        const snapPoint = getSnapPoint(clampedY, vy, dy);

        const animationConfig =
          snapPoint === SNAP_POINTS.CLOSED
            ? { tension: 300, friction: 30 }
            : config.stiff;

        api.start({
          y: snapPoint,
          immediate: false,
          config: animationConfig,
        });

        if (snapPoint === SNAP_POINTS.CLOSED) {
          setTimeout(onClose, 50);
        }

        return undefined;
      } else {
        const clampedY = Math.max(
          SNAP_POINTS.CLOSED,
          Math.min(SNAP_POINTS.FULL, newY)
        );

        api.start({
          y: clampedY,
          immediate: true,
        });

        return startY;
      }
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      rubberband: 0.15,
    }
  );

  useEffect(() => {
    if (isOpen) {
      api.start({
        y: SNAP_POINTS.PEEK,
        immediate: false,
      });
    } else {
      api.start({
        y: SNAP_POINTS.CLOSED,
        immediate: false,
      });
    }
  }, [isOpen, api]);

  const handleOverlayClick = () => {
    api.start({
      y: SNAP_POINTS.CLOSED,
      immediate: false,
      config: { tension: 300, friction: 30 },
    });
    setTimeout(onClose, 50);
  };

  const handleSwipeUp = () => {
    const currentY = y.get();
    if (currentY < SNAP_POINTS.HALF) {
      api.start({
        y: SNAP_POINTS.HALF,
        immediate: false,
      });
    } else {
      api.start({
        y: SNAP_POINTS.FULL,
        immediate: false,
      });
    }
  };

  const handleClose = () => {
    api.start({
      y: SNAP_POINTS.CLOSED,
      immediate: false,
      config: { tension: 300, friction: 30 },
    });
    setTimeout(onClose, 50);
  };

  const currentHeight = y.get();

  if (!isOpen && currentHeight === SNAP_POINTS.CLOSED) {
    return null;
  }

  return (
    <>
      <animated.div
        style={{
          opacity: y.to((val) => (val > SNAP_POINTS.CLOSED ? 1 : 0)),
          pointerEvents: y.to((val) =>
            val > SNAP_POINTS.CLOSED ? "auto" : "none"
          ) as any,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          position: "fixed",
          inset: 0,
          zIndex: 9999,
        }}
        onClick={handleOverlayClick}
      />

      <animated.div
        ref={containerRef}
        style={{
          height: y.to((val) => `${val}px`),
          touchAction: "none",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(10px)",
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: "75%",
          zIndex: 10000,
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
          boxShadow: "0 -10px 40px rgba(0, 0, 0, 0.5)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          {...bind()}
          style={{
            flexShrink: 0,
            cursor: "grab",
            touchAction: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "12px",
              paddingBottom: "12px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "6px",
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                borderRadius: "9999px",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingLeft: "24px",
              paddingRight: "24px",
              paddingBottom: "28px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: 600,
                color: "white",
                margin: "0px",
              }}
            >
              {title}
            </h3>
            <button
              onClick={handleClose}
              style={{
                padding: "0px",
                width: "30px",
                height: "30px",
                borderRadius: "9999px",
                backgroundColor: "transparent",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              aria-label="Close"
            >
              <Close style={{ fontSize: "1.25rem", color: "white" }} />
            </button>
          </div>
        </div>

        <div
          ref={contentRef}
          style={{
            flex: 1,
            overflowY: "auto",
            overscrollBehavior: "contain",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingTop: "16px",
            paddingBottom: "16px",
          }}
        >
          {children}
        </div>

        <animated.div
          style={{
            opacity: y.to(
              [SNAP_POINTS.CLOSED, SNAP_POINTS.PEEK, SNAP_POINTS.HALF],
              [0, 1, 0]
            ),
            pointerEvents: y.to((val) =>
              val > SNAP_POINTS.CLOSED && val <= SNAP_POINTS.PEEK + 50
                ? "auto"
                : "none"
            ) as any,
            display: y.to((val) =>
              val <= SNAP_POINTS.CLOSED ? "none" : "block"
            ) as any,
            position: "absolute",
            bottom: "16px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <button
            onClick={handleSwipeUp}
            style={{
              paddingLeft: "24px",
              paddingRight: "24px",
              paddingTop: "8px",
              paddingBottom: "8px",
              backgroundColor: "#4A90E2",
              color: "white",
              borderRadius: "9999px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              fontSize: "0.875rem",
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#357ABD";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#4A90E2";
            }}
          >
            Swipe me up!
          </button>
        </animated.div>
      </animated.div>
    </>
  );
};

export default DraggableSheet;

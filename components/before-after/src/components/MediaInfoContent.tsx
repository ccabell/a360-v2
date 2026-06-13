import React from "react";
import { Box, Typography } from "@mui/material";
import {
  Image as ImageIcon,
  Storage as HardDriveIcon,
} from "@mui/icons-material";

export interface MediaFile {
  id: number;
  title: string;
  contentUrl: string;
  type: string;
  thumbnailUrl?: string;
  itemType: "file";
  storagePath?: string;
  originalFileName?: string;
  description?: string;
}

interface MediaInfoContentProps {
  item: MediaFile | null;
}

const getTypeIcon = () => {
  const iconProps = { sx: { width: 20, height: 20 } };
  return <ImageIcon {...iconProps} />;
};

const getTypeColor = (): { bg: string; text: string } => {
  // Blue color for all image types
  return { bg: "rgba(33, 150, 243, 0.15)", text: "#2196F3" };
};

export const MediaInfoContent: React.FC<MediaInfoContentProps> = ({ item }) => {
  if (!item) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          color: "rgba(255, 255, 255, 0.4)",
        }}
      >
        <Typography>No item selected</Typography>
      </Box>
    );
  }

  const typeColors = getTypeColor();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Thumbnail */}
      {item.thumbnailUrl && (
        <Box sx={{ width: "100%" }}>
          <img
            src={item.thumbnailUrl}
            alt={item.title}
            loading="lazy"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </Box>
      )}

      {/* Title Section */}
      <Box>
        <Typography
          sx={{
            fontSize: "0.75rem",
            fontWeight: 500,
            color: "rgba(255, 255, 255, 0.4)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            mb: 1,
          }}
        >
          Title
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: 500,
            color: "white",
          }}
        >
          {item.title?.split(" - ")[0] || "Untitled"}
        </Typography>
      </Box>

      {/* Type Badge */}
      <Box>
        <Typography
          sx={{
            fontSize: "0.75rem",
            fontWeight: 500,
            color: "rgba(255, 255, 255, 0.4)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            mb: 1,
          }}
        >
          Type
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 1.5,
              py: 0.75,
              borderRadius: "9999px",
              backgroundColor: typeColors.bg,
              color: typeColors.text,
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
          >
            {getTypeIcon()}
            <span>{item.type}</span>
          </Box>
        </Box>
      </Box>

      {/* Description (if available) */}
      {item.description && (
        <Box>
          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.4)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              mb: 1,
            }}
          >
            Description
          </Typography>
          <Typography
            sx={{
              fontSize: "0.875rem",
              color: "rgba(255, 255, 255, 0.9)",
              lineHeight: 1.6,
            }}
          >
            {item.description}
          </Typography>
        </Box>
      )}

      {/* File Size */}
      {item.storagePath && (
        <Box>
          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.4)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              mb: 1,
            }}
          >
            File Size
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <HardDriveIcon
              sx={{ width: 16, height: 16, color: "rgba(255, 255, 255, 0.4)" }}
            />
            <Typography sx={{ fontSize: "0.875rem", fontWeight: 500 }}>
              Unknown
            </Typography>
          </Box>
        </Box>
      )}

      {/* Divider */}
      <Box sx={{ borderTop: "1px solid rgba(255, 255, 255, 0.2)" }} />

      {/* Content URL */}
      <Box>
        <Typography
          sx={{
            fontSize: "0.75rem",
            fontWeight: 500,
            color: "rgba(255, 255, 255, 0.4)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            mb: 1,
          }}
        >
          Content URL
        </Typography>
        <Box
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            borderRadius: "8px",
            p: 1.5,
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.75rem",
              fontFamily: "monospace",
              color: "rgba(255, 255, 255, 0.7)",
              wordBreak: "break-all",
            }}
          >
            {item.contentUrl}
          </Typography>
        </Box>
      </Box>

      {/* Storage Path (if available) */}
      {item.storagePath && (
        <Box>
          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.4)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              mb: 1,
            }}
          >
            Storage Path
          </Typography>
          <Box
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              borderRadius: "8px",
              p: 1.5,
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontFamily: "monospace",
                color: "rgba(255, 255, 255, 0.7)",
                wordBreak: "break-all",
              }}
            >
              {item.storagePath}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MediaInfoContent;

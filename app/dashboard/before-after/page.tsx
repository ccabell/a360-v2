"use client";

import { Box } from "@mui/material";
import { BeforeAfter } from "@/components/before-after/src";

export default function BeforeAfterPage() {
  // Mock data for testing
  const comparisons = [
    // Item 1: Rhinoplasty
    {
      beforeUrl: "/before-after/rhinoplasty-11-front-thumbnail_before.jpg",
      afterUrl: "/before-after/rhinoplasty-11-front-thumbnail_after.jpg",
      title: "Rhinoplasty",
      Description:
        "A simple before and after comparison without multiple views",
    },
    {
      beforeUrl: "/before-after/rhinoplasty-13-front. before-thumbnail.jpg",
      afterUrl: "/before-after/rhinoplasty-13-front. after-thumbnail copy.jpg",
      title: "Rhinoplasty Front",
      Description:
        "Front view - Before and after treatment results showing visible improvement",
    },
    {
      beforeUrl:
        "/before-after/rhinoplasty-14-left-oblique-thumbnail_before.jpg",
      afterUrl: "/before-after/rhinoplasty-14-left-oblique-thumbnail_after.jpg",
      title: "Rhinoplasty Side",
      Description: "Side view - Before and after results from side angle",
    },

    // Item 2: Botox Cosmetic
    {
      beforeUrl: "/before-after/botox-cosmetic-32-front-thumbnail_before.jpg",
      afterUrl: "/before-after/botox-cosmetic-32-front-thumbnail_after.jpg",
      title: "Botox Cosmetic",
      Description:
        "A simple before and after comparison without multiple views",
    },
    {
      beforeUrl: "/before-after/botox-cosmetic-31-front-thumbnail_before.jpg",
      afterUrl: "/before-after/botox-cosmetic-31-front-thumbnail_after.jpg",
      title: "Botox Cosmetic Angle",
      Description:
        "Angle view - Post-surgical results after 3 months of recovery",
    },

    // Item 3: Blepharoplasty
    {
      beforeUrl: "/before-after/Blepharoplasty_before.jpg",
      afterUrl: "/before-after/Blepharoplasty_after.jpg",
      title: "Blepharoplasty",
      Description:
        "A simple before and after comparison without multiple views",
    },
    {
      beforeUrl: "/before-after/blepharoplasty-46-front-thumbnail_before.jpg",
      afterUrl: "/before-after/blepharoplasty-46-front-thumbnail_after.jpg",
      title: "Blepharoplasty Back",
      Description:
        "Front view - Before and after treatment results showing visible improvement",
    },
    {
      beforeUrl: "/before-after/blepharoplasty-73-front-thumbnail_before.jpg",
      afterUrl: "/before-after/blepharoplasty-73-front-thumbnail_after.jpg",
      title: "Blepharoplasty Right",
      Description: "Side view - Before and after results from side angle",
    },

    // Item 4: Liposuction
    {
      beforeUrl: "/before-after/liposuction-55-left-side-detail_before.jpg",
      afterUrl: "/before-after/liposuction-55-left-side-detail_after.jpg",
      title: "Liposuction",
      Description:
        "A simple before and after comparison without multiple views",
    },
    {
      beforeUrl: "/before-after/liposuction-58-left-side-thumbnail_before.jpg",
      afterUrl: "/before-after/liposuction-58-left-side-thumbnail_after.jpg",
      title: "Liposuction Front",
      Description:
        "Angle view - Post-surgical results after 3 months of recovery",
    },

    // Item 5: Dermal Fillers Kybella
    {
      beforeUrl:
        "/before-after/dermal-fillers-kybella-27-front-thumbnail_before.jpg",
      afterUrl:
        "/before-after/dermal-fillers-kybella-27-front-thumbnail_after.jpg",
      title: "Dermal Fillers Kybella",
      Description:
        "A simple before and after comparison without multiple views",
    },

    // Item 6: Arm Lift
    {
      beforeUrl: "/before-after/arm-lift-25-back-thumbnail_before.jpg",
      afterUrl: "/before-after/arm-lift-25-back-thumbnail_after.jpg",
      title: "Arm Lift",
      Description:
        "A simple before and after comparison without multiple views",
    },
    {
      beforeUrl: "/before-after/arm-lift-83-left-side-detail_before.jpg",
      afterUrl: "/before-after/arm-lift-83-left-side-detail_after.jpg",
      title: "Arm Lift Side",
      Description:
        "Angle view - Post-surgical results after 3 months of recovery",
    },
  ];

  return (
    <Box sx={{ height: "88vh" }}>
      <BeforeAfter comparisons={comparisons} />
    </Box>
  );
}

"use client";

import { useState, useEffect } from "react";
import { AgeProgression } from "@/components/age-progression/src";

export default function AgeProgressionPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Mock data for testing
  const testItems = [
    {
      id: 1,
      title: "Subject 1",
      description: "Age progression with side-by-side images",
      ageMarks: [
        {
          age: 20,
          imageUrls: [
            "/age-progression/subject01_with_spf_age_20.png",
            "/age-progression/subject01_no_spf_age_20.png",
          ],
        },
        {
          age: 25,
          imageUrls: [
            "/age-progression/subject01_with_spf_age_25.png",
            "/age-progression/subject01_no_spf_age_25.png",
          ],
        },
        {
          age: 30,
          imageUrls: [
            "/age-progression/subject01_with_spf_age_30.png",
            "/age-progression/subject01_no_spf_age_30.png",
          ],
        },
        {
          age: 35,
          imageUrls: [
            "/age-progression/subject01_with_spf_age_35.png",
            "/age-progression/subject01_no_spf_age_35.png",
          ],
        },
        {
          age: 40,
          imageUrls: [
            "/age-progression/subject01_with_spf_age_40.png",
            "/age-progression/subject01_no_spf_age_40.png",
          ],
        },
        {
          age: 45,
          imageUrls: [
            "/age-progression/subject01_with_spf_age_45.png",
            "/age-progression/subject01_no_spf_age_45.png",
          ],
        },
        {
          age: 50,
          imageUrls: [
            "/age-progression/subject01_with_spf_age_50.png",
            "/age-progression/subject01_no_spf_age_50.png",
          ],
        },
        {
          age: 55,
          imageUrls: [
            "/age-progression/subject01_with_spf_age_55.png",
            "/age-progression/subject01_no_spf_age_55.png",
          ],
        },
        {
          age: 60,
          imageUrls: [
            "/age-progression/subject01_with_spf_age_60.png",
            "/age-progression/subject01_no_spf_age_60.png",
          ],
        },
        {
          age: 65,
          imageUrls: [
            "/age-progression/subject01_with_spf_age_65.png",
            "/age-progression/subject01_no_spf_age_65.png",
          ],
        },
        {
          age: 70,
          imageUrls: [
            "/age-progression/subject01_with_spf_age_70.png",
            "/age-progression/subject01_no_spf_age_70.png",
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Subject 2",
      description: "Age progression with side-by-side images",
      ageMarks: [
        {
          age: 20,
          imageUrls: [
            "/age-progression/subject01_V2_with_spf_age_20.png",
            "/age-progression/subject01_V2_no_spf_age_20.png",
          ],
        },
        {
          age: 25,
          imageUrls: [
            "/age-progression/subject01_V2_with_spf_age_25.png",
            "/age-progression/subject01_V2_no_spf_age_25.png",
          ],
        },
        {
          age: 30,
          imageUrls: [
            "/age-progression/subject01_V2_with_spf_age_30.png",
            "/age-progression/subject01_V2_no_spf_age_30.png",
          ],
        },
        {
          age: 35,
          imageUrls: [
            "/age-progression/subject01_V2_with_spf_age_35.png",
            "/age-progression/subject01_V2_no_spf_age_35.png",
          ],
        },
        {
          age: 40,
          imageUrls: [
            "/age-progression/subject01_V2_with_spf_age_40.png",
            "/age-progression/subject01_V2_no_spf_age_40.png",
          ],
        },
        {
          age: 45,
          imageUrls: [
            "/age-progression/subject01_V2_with_spf_age_45.png",
            "/age-progression/subject01_V2_no_spf_age_45.png",
          ],
        },
        {
          age: 50,
          imageUrls: [
            "/age-progression/subject01_V2_with_spf_age_50.png",
            "/age-progression/subject01_V2_no_spf_age_50.png",
          ],
        },
        {
          age: 55,
          imageUrls: [
            "/age-progression/subject01_V2_with_spf_age_55.png",
            "/age-progression/subject01_V2_no_spf_age_55.png",
          ],
        },
        {
          age: 60,
          imageUrls: [
            "/age-progression/subject01_V2_with_spf_age_60.png",
            "/age-progression/subject01_V2_no_spf_age_60.png",
          ],
        },
        {
          age: 65,
          imageUrls: [
            "/age-progression/subject01_V2_with_spf_age_65.png",
            "/age-progression/subject01_V2_no_spf_age_65.png",
          ],
        },
        {
          age: 70,
          imageUrls: [
            "/age-progression/subject01_V2_with_spf_age_70.png",
            "/age-progression/subject01_V2_no_spf_age_70.png",
          ],
        },
      ],
    },
  ];

  return <AgeProgression items={testItems} />;
}

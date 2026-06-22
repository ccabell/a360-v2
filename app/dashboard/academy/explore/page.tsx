import { getVideos, getTopics } from "@/lib/academy/server";
import { AREAS, CONCERNS } from "@/lib/academy/explore";
import { ExploreClient } from "@/components/academy/explore-client";

export const metadata = {
  title: "Explore · Dr Tim Pearce Channel Navigator",
};

export default function ExplorePage() {
  const videos = getVideos().filter((v) => v.isLesson);
  const topics = getTopics().map((t) => ({
    id: t.id,
    title: t.title,
    category: t.category,
  }));

  return (
    <ExploreClient
      videos={videos}
      topics={topics}
      areas={AREAS}
      concerns={CONCERNS}
    />
  );
}

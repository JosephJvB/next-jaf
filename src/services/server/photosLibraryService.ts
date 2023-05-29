import { MediaItem, MediaItemResult } from "../../types/google";

const baseUrl = "https://photoslibrary.googleapis.com/v1";

export const batchGetMediaItems = async (
  mediaItemIds: string[],
  authToken: string
): Promise<MediaItem[]> => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${authToken}`);
  headers.append("Content-Type", "application/json");

  const search = new URLSearchParams();
  const unique = new Set();
  for (const id of mediaItemIds) {
    if (!unique.has(id)) {
      search.append("mediaItemIds", id);
    }
    unique.add(id);
  }

  const res = await fetch(
    `${baseUrl}/mediaItems:batchGet?${search.toString()}`,
    {
      headers,
    }
  );

  const data: { mediaItemResults: MediaItemResult[] } = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data.mediaItemResults.map((d) => d.mediaItem);
};

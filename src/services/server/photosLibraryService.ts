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
  for (const id of mediaItemIds) {
    search.append("mediaItemIds", id);
  }

  const res = await fetch(
    `${baseUrl}/mediaItems:batchGet?${search.toString()}`,
    {
      headers,
    }
  );
  if (!res.ok) {
    throw res;
  }

  const data: { mediaItemResults: MediaItemResult[] } = await res.json();

  return data.mediaItemResults.map((d) => d.mediaItem);
};

import { useQuery } from "@tanstack/react-query";
import { fetchCuratedPhotos, fetchSearchPhotos } from "./api";

// https://www.pexels.com/api/documentation/?language=javascript#photos-curated
// "add at least one new photo per hour"
const STALE_TIME = 3600000; // 1 hr

export const useCuratedPhotos = ({ query, page }) =>
  useQuery({
    queryKey: ["curatedPhotos", { page }],
    queryFn: () => fetchCuratedPhotos(page),
    keepPreviousData: true,
    staleTime: STALE_TIME,
    enabled: !query.length,
  });

export const useSearchPhotos = ({ query, page }) =>
  useQuery({
    queryKey: ["searchPhotos", { query, page }],
    queryFn: () => fetchSearchPhotos(query, page),
    keepPreviousData: true,
    staleTime: STALE_TIME,
    enabled: !!query.length,
  });

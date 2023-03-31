import { createClient } from "pexels";
const client = createClient(process.env.REACT_APP_PEXELS_API_KEY);

export const fetchCuratedPhotos = async (page = 1) => {
  const res = await client.photos.curated({ per_page: 10, page });
  return res;
};

export const fetchSearchPhotos = async (query, page = 1) => {
  if (!query) return;
  const res = await client.photos.search({ per_page: 10, page, query });
  return res;
};

const API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY!;
const BASE_URL = "https://api.giphy.com/v1/gifs";

export async function searchGifs(query: string, offset = 0) {
  const params = new URLSearchParams({
    api_key: API_KEY,
    q: query,
    limit: "12",
    offset: offset.toString(),
    rating: "g",
  });

  const res = await fetch(`${BASE_URL}/search?${params}`);

  if (res.status === 429) {
    throw new Error("API_LIMIT");
  }

  return res.json();
}

export async function randomGifs() {
  const params = new URLSearchParams({
    api_key: API_KEY,
    limit: "3",
    rating: "g",
  });

  const res = await fetch(`${BASE_URL}/trending?${params}`);
  return res.json();
}

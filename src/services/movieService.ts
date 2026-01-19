import axios from "axios";
import type { Movie } from "../types/movie";
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface FetchMovies {
    results: Movie[]
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/search/movie",
    params: {
      query: query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  };
  const {data} = await axios.request<FetchMovies>(options);
  return data.results;
}

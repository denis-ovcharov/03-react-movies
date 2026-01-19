import { useState } from "react";
import { fetchMovies } from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import SearchBar from "../SearchBar/SearchBar";
import "./App.module.css";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
  }
  const closeModal = () => {
    setSelectedMovie(null);
  }

  const handleSearch = async (query: string) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const movies = await fetchMovies(query);
       if (movies.length === 0 ) {
        toast.error('No movies found for your request.')
      }
      setMovies(movies);
    } catch  {
      setIsError(true);
      setMovies([]);

    }
    finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError ? (<ErrorMessage />) : (movies.length > 0 && <MovieGrid movies={movies}  onSelect={openModal}/>)}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal}/> }
      <Toaster position="top-center"/>
    </>
  );
}

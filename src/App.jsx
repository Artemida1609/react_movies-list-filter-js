import './App.scss';

import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';

function getPreparedMovies(movies, { querry }) {
  let preparedMovies = movies;
  const normalizedQuerry = querry.trim().toLowerCase();

  if (normalizedQuerry) {
    preparedMovies = preparedMovies.filter(
      movie =>
        movie.title.toLowerCase().includes(normalizedQuerry) ||
        movie.description.toLowerCase().includes(normalizedQuerry),
    );
  }

  return preparedMovies;
}

export const App = () => {
  const [querry, setQuerry] = useState('');
  const visibleMovies = getPreparedMovies(moviesFromServer, { querry });

  return (
    <div className="page">
      <div className="page-content">
        <div className="box">
          <div className="field">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="search-query" className="label">
              Search movie
            </label>

            <div className="control">
              <input
                value={querry}
                type="text"
                id="search-query"
                className="input"
                placeholder="Type search word"
                onChange={event => setQuerry(event.target.value)}
              />
            </div>
          </div>
        </div>

        <MoviesList movies={visibleMovies} />
      </div>

      <div className="sidebar">Sidebar goes here</div>
    </div>
  );
};

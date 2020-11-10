import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { UPDATE_SEARCH_RESULTS } from '../../utils/actions';

function Search({ mode }) {
  const [formState, setFormState] = useState('');

  const dispatch = useDispatch();

  function handleChange(event) {
    setFormState(event.target.value);
  }

  async function getShows(event) {
    event.preventDefault();

    switch (mode) {
      case 'Home':
        const response = await axios.get(`http://api.tvmaze.com/search/shows?q=${formState}`);
        dispatch({
          type: UPDATE_SEARCH_RESULTS,
          payload: response.data
        });
        break;
      default:
        break;
    }
  }

  return (
    <form className="flex-row search" onSubmit={getShows}>
      <input id="searchInput" type="text" value={formState} onChange={handleChange} />
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;
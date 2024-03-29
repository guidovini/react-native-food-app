import { useEffect, useState } from 'react';

import yelp from '../api/yelp';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async searchTerm => {
    try {
      const response = await yelp.get('/search', {
        params: {
          limit: 50, // /search?limit=50
          term: searchTerm,
          location: 'san jose'
        }
      });
      setResults(response.data.businesses);
    } catch (err) {
      setErrorMessage('Something went wrong :(');
    }
  };

  // Call searchApi when component is first rendered. BAD CODE! it is running every second...
  // searchApi('pasta');

  useEffect(() => {
    searchApi('pasta');
    // return () => {
    //   cleanup;
    // };
  }, []);

  return [searchApi, results, errorMessage];
};

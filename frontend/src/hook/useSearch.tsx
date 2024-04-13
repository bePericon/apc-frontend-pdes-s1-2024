import axios from "axios";
import { useState } from "react";

const useSearch = () => {
  const [results, setResults] = useState<any[]>([]);
  const [hasResults, setHasResults] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [hiddenNoResults, setHiddenNoResults] = useState(true);

  const fetchArticles = async (value: string | string[] | undefined) => {
    const { data: response } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/meli/search`,
      {
        params: {
          q: value,
          offset: 0,
          limit: 10,
        },
        withCredentials: true
      }
    );
    if (response.data?.results.length !== 0) {
      setResults(response.data.results);
      setHasResults(true);
      setHiddenNoResults(true);
    } else {
      setResults([]);
      setHasResults(false);
      setHiddenNoResults(false);
    }

    if (response.error) setHasError(true);
  };

  const resetSearching = () => {
    setResults([]);
    setHasResults(false);
    setHiddenNoResults(true);
  };

  return {
    fetchArticles,
    results,
    hasResults,
    resetSearching,
    hasError,
    hiddenNoResults,
    setHiddenNoResults,
  };
};

export default useSearch;

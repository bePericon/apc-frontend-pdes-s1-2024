import { showLoader } from "@/redux/slice/loaderSlice";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

const useSearch = () => {
  const [results, setResults] = useState<any[]>([]);
  const [hasResults, setHasResults] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [hiddenNoResults, setHiddenNoResults] = useState(true);

  const [totalResults, setTotalResults] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 10;

  const dispatch = useDispatch();

  const fetchArticles = async (
    value: string | string[] | undefined,
    offset?: number
  ) => {
    dispatch(showLoader(true));
    setCurrentPage(offset ? offset : 1);
    const { data: response } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/meli/search`,
      {
        params: {
          q: value,
          offset: offset ? offset-1 : 0,
          limit: limit,
        },
        withCredentials: true,
      }
    );
    dispatch(showLoader(false));
    if (response.data?.results.length !== 0) {
      setResults(response.data.results);
      setTotalResults(response.data.paging.total);
      setTotalPages(parseInt(String(response.data.paging.total / limit)));
      setHasResults(true);
      setHiddenNoResults(true);
    } else {
      setResults([]);
      setTotalResults(0);
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
    totalResults,
    totalPages,
    currentPage
  };
};

export default useSearch;

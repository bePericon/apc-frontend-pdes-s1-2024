import { StyledContainerSearch, StyledContainerSection, StyledHomeContainer } from "./Home.styled";
import InputSearch from "@/components/common/InputSearch/InputSearch";
import useSearch from "@/hook/useSearch";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const {
    fetchArticles,
    hasResults,
    resetSearching,
    results,
    hasError,
    hiddenNoResults,
    setHiddenNoResults,
  } = useSearch();
  console.log("🚀 ~ Home ~ results:", results);

  const debouncedSearch = useRef(
    debounce((term: string) => {
      fetchArticles(term);
    }, 215)
  ).current;

  const handleOnChange = async (event: SyntheticEvent) => {
    const { target } = event;
    setInputValue(target.value);
    if (target.value.length >= 3) {
      debouncedSearch(target.value);
    } else {
      resetSearching();
    }
  };

  const handleOnClearSearch = () => {
    setInputValue("");
    resetSearching();
  };

  const handleOnClick = () => {
    if (inputValue !== "") handleOnChange({ target: { value: inputValue } });
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <StyledHomeContainer>
      <StyledContainerSection withColor>
        <StyledContainerSearch>
          <h2>¿En qué podemos ayudarte?</h2>
          <InputSearch
            value={inputValue}
            onClick={handleOnClick}
            onChange={handleOnChange}
            onClearSearch={handleOnClearSearch}
          />
        </StyledContainerSearch>
      </StyledContainerSection>

      <StyledContainerSection>
        {results.map((item, ind) => 

          <div key={`item-${ind + 1}`}>
            {item.title}
          </div>

        )}
      </StyledContainerSection>
    </StyledHomeContainer>
  );
};

export default Home;

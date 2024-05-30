import {
    StyledContainerSearch,
    StyledHomeContainer,
    StyledPaginationContainer,
    StyledTypography,
} from './Home.styled'
import InputSearch from '@/components/common/InputSearch/InputSearch'
import useSearch from '@/hook/useSearch'
import { useEffect, useRef, useState } from 'react'
import debounce from 'lodash.debounce'
import CardItemList from '@/components/common/CardItemList/CardItemList'
import { StyledColumnItems } from '@/components/common/CardItemList/CardItemList.styled'
import { Pagination } from '@mui/material'
import Navbar from '../Navbar/Navbar'
import { StyledContainerSection } from '../Layout.styled'

const Home = () => {
    const [inputValue, setInputValue] = useState('')
    const {
        fetchArticles,
        hasResults,
        resetSearching,
        results,
        totalPages,
        currentPage,
    } = useSearch()

    const debouncedSearch = useRef(
        debounce((term: string, offset?: number) => {
            fetchArticles(term, offset)
        }, 215)
    ).current

    const handleOnChange = async (event: any, isSearch: boolean) => {
        const { target } = event
        setInputValue(target.value)
        if (target.value.length >= 3) {
            if (isSearch) debouncedSearch(target.value)
        } else {
            resetSearching()
        }
    }

    const handleOnClearSearch = () => {
        setInputValue('')
        resetSearching()
    }

    const handleOnClick = () => {
        if (inputValue !== '') handleOnChange({ target: { value: inputValue } }, true)
    }

    const handleOnChangePage = (_: any, page: number) => {
        debouncedSearch(inputValue, page)
    }

    useEffect(() => {
        return () => {
            debouncedSearch.cancel()
        }
    }, [debouncedSearch])

    return (
        <StyledHomeContainer>
            <StyledContainerSection withColor>
                <Navbar />
            </StyledContainerSection>
            <StyledContainerSection withColor>
                <StyledContainerSearch>
                    <StyledTypography>¿En qué podemos ayudarte?</StyledTypography>
                    <InputSearch
                        value={inputValue}
                        onClick={handleOnClick}
                        onChange={(event) => handleOnChange(event, false)}
                        onClearSearch={handleOnClearSearch}
                    />
                </StyledContainerSearch>
            </StyledContainerSection>

            {hasResults && (
                <StyledContainerSection withColor expandFullWidthMobile>
                    <StyledColumnItems>
                        {results.map((item, ind) => (
                            <CardItemList key={`item-${ind + 1}`} item={item} />
                        ))}
                    </StyledColumnItems>

                    <StyledPaginationContainer>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handleOnChangePage}
                            siblingCount={0}
                        />
                    </StyledPaginationContainer>
                </StyledContainerSection>
            )}
        </StyledHomeContainer>
    )
}

export default Home

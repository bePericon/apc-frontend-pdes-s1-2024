import {
    StyledColumnItems,
    StyledContainerSearch,
    StyledHomeContainer,
    StyledPaginationContainer,
    StyledTypography,
} from './Home.styled'
import InputSearch from '@/components/common/InputSearch/InputSearch'
import useSearch from '@/hook/useSearch'
import { useEffect, useRef, useState } from 'react'
import debounce from 'lodash.debounce'
import { Pagination } from '@mui/material'
import { StyledContainerSection } from '../Layout.styled'
import CardProductWithModal from '@/components/common/CardProductWithModal/CardProductWithModal'
import ModalProductSearch from '@/components/common/ModalProductSearch/ModalProductSearch'

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
                            <CardProductWithModal
                                key={`item-${ind + 1}`}
                                item={item}
                                index={ind}
                                renderModalComponent={(handleOnClose, open, item) => (
                                    <ModalProductSearch
                                        item={item}
                                        open={open}
                                        onClose={handleOnClose}
                                    />
                                )}
                            />
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

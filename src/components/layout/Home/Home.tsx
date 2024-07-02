import {
    StyledColumnItems,
    StyledContainerSearch,
    StyledFiltersContainer,
    StyledFiltersHeader,
    StyledHomeContainer,
    StyledPaginationContainer,
    StyledTypography,
} from './Home.styled'
import InputSearch from '@/components/common/InputSearch/InputSearch'
import useSearch from '@/hook/useSearch'
import { useEffect, useRef, useState } from 'react'
import debounce from 'lodash.debounce'
import { Button, Pagination, Typography } from '@mui/material'
import { StyledContainerSection } from '../Layout.styled'
import CardProductWithModal from '@/components/common/CardProductWithModal/CardProductWithModal'
import ModalProductSearch from '@/components/common/ModalProductSearch/ModalProductSearch'
import FilterSearch from '@/components/common/FilterSearch/FilterSearch'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { addFilter, clearFilters } from '@/redux/slice/searchSlice'

const Home = () => {
    const [inputValue, setInputValue] = useState('')
    const {
        fetchProducts,
        hasResults,
        resetSearching,
        results,
        totalPages,
        currentPage,
        filters,
    } = useSearch()

    const dispatch = useDispatch()
    const { filters: filtersState, research } = useSelector((state: RootState) => state.search)

    const debouncedSearch = useRef(
        debounce((term: string, offset?: number, filters?: any) => {
            fetchProducts(term, offset, filters)
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

    const handleOnChangeFilter = (data: any) => {
        dispatch(addFilter(data))
    }

    const handleClearFilters = () => {
        dispatch(clearFilters())
    }

    useEffect(() => {
        return () => {
            debouncedSearch.cancel()
        }
    }, [debouncedSearch])

    useEffect(() => {
        debouncedSearch(inputValue, 1, filtersState)
    }, [research])

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
                <>
                    <StyledFiltersHeader>
                        <Typography variant="h6">Filtros</Typography>
                        <Button
                            sx={{ color: '#577590', backgroundColor: 'white' }}
                            onClick={handleClearFilters}
                        >
                            Limpiar filtros
                        </Button>
                    </StyledFiltersHeader>
                    <StyledContainerSection withColor>
                        <StyledFiltersContainer>
                            <>
                                {/* Sorts */}
                                {filters.map((filter, index) => {
                                    return (
                                        <FilterSearch
                                            key={`filter-${index + 1}`}
                                            filter={filter}
                                            onChange={handleOnChangeFilter}
                                        />
                                    )
                                })}
                            </>
                        </StyledFiltersContainer>
                    </StyledContainerSection>

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
                </>
            )}
        </StyledHomeContainer>
    )
}

export default Home

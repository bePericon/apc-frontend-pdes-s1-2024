import { showLoader } from '@/redux/slice/loaderSlice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import MeliService from '@/service/meli.service'
import { Filter } from '@/types/meli.types'

const useSearch = () => {
    const [results, setResults] = useState<any[]>([])
    const [hasResults, setHasResults] = useState<boolean>(false)
    const [hasError, setHasError] = useState<boolean>(false)
    const [hiddenNoResults, setHiddenNoResults] = useState(true)

    const [totalResults, setTotalResults] = useState<number>(0)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const limit = 10

    const [filters, setFilters] = useState<Filter[]>([])

    const dispatch = useDispatch()

    const fetchProducts = async (
        value: string | string[] | undefined,
        offset?: number,
        filters?: any
    ) => {
        dispatch(showLoader(true))
        setCurrentPage(offset ? offset : 1)
        const { data, error } = await MeliService.search(
            value,
            offset ? offset - 1 : 0,
            limit,
            filters
        )
        dispatch(showLoader(false))
        if (data?.results.length !== 0) {
            setResults(data.results)
            setTotalResults(data.paging.total)
            setTotalPages(parseInt(String(data.paging.total / limit)))
            setHasResults(true)
            setHiddenNoResults(true)
            setFilters(data.available_filters)
        } else {
            setResults([])
            setTotalResults(0)
            setHasResults(false)
            setHiddenNoResults(false)
        }

        if (error) setHasError(true)
    }

    const resetSearching = () => {
        setResults([])
        setHasResults(false)
        setHiddenNoResults(true)
    }

    return {
        fetchProducts,
        results,
        hasResults,
        resetSearching,
        hasError,
        hiddenNoResults,
        setHiddenNoResults,
        totalResults,
        totalPages,
        currentPage,
        filters,
    }
}

export default useSearch

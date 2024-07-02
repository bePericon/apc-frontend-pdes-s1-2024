import { IFiltersSearchState } from '@/types/meli.types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SearchState {
    filters: IFiltersSearchState
    research: boolean
}

const initialState: SearchState = {
    filters: {
        price: undefined,
        ITEM_CONDITION: undefined,
    },
    research: false
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        addFilter: (state, action: PayloadAction<any>) => {
            state.filters = { ...state.filters, ...action.payload }
            state.research = !state.research
        },
        clearFilters: () => {
            return initialState
        },
    },
})

// Action creators are generated for each case reducer function
export const { addFilter, clearFilters } = searchSlice.actions

export default searchSlice.reducer

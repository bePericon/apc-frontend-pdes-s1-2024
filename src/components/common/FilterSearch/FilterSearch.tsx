import { Filter, IFiltersSearchState } from '@/types/meli.types'
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from '@mui/material'
import { StyledFilterContainer } from './FilterSearch.styled'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

interface FilterSearchProps {
    filter: Filter
    onChange: (data: any) => void
}

const FilterSearch = ({ filter, onChange }: FilterSearchProps) => {
    const { filters } = useSelector((state: RootState) => state.search)

    return (
        <StyledFilterContainer>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">{filter.name}</FormLabel>
                <RadioGroup
                    name={filter.name}
                    onChange={(e) => {
                        onChange({ [filter.id]: e.target.value })
                    }}
                    value={filters[filter.id as keyof IFiltersSearchState]}
                >
                    {filter.values.map((value, index) => (
                        <FormControlLabel
                            key={`checkbox-${index + 1}`}
                            value={value.id}
                            control={<Radio />}
                            label={value.name}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </StyledFilterContainer>
    )
}

export default FilterSearch

import { StyledCloseIcon, StyledContainer } from './inputSearch.styled'
import { Divider, IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

interface InputSearchProps {
    value: string
    onClick: () => void
    onChange?: (event: any) => void
    onClearSearch: () => void
    width?: string
}

const InputSearch = ({
    value,
    onClick,
    onChange,
    onClearSearch,
    width,
}: InputSearchProps) => {
    return (
        <StyledContainer className="container" width={width}>
            <Paper
                component="form"
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: 400,
                }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Buscar en APC..."
                    inputProps={{ 'aria-label': 'Buscar en APC' }}
                    value={value}
                    onChange={onChange}
                />

                <IconButton
                    name={'btn-search'}
                    type="button"
                    sx={{ p: '10px' }}
                    aria-label="search"
                    onClick={onClick}
                >
                    <SearchIcon sx={{ color: '#577590' }} />
                </IconButton>

                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

                <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                    <StyledCloseIcon onClick={onClearSearch}>
                        <CloseIcon sx={{ color: '#577590' }} />
                    </StyledCloseIcon>
                </IconButton>
            </Paper>
        </StyledContainer>
    )
}

export default InputSearch

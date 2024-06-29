import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useState } from 'react'
import { IconButton } from '@mui/material'

interface HoverFavoriteProps {
    isFavorite: boolean
    onClickFavorite: () => void
    disabled?: boolean
}

const HoverFavorite = ({ isFavorite, onClickFavorite, disabled = false }: HoverFavoriteProps) => {
    const [hover, setHover] = useState(false)
    return (
        <IconButton
            data-test-id={'btn-favorite'}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={onClickFavorite}
            disabled={disabled}
        >
            {!isFavorite && (
                <>
                    {hover && <FavoriteIcon color="primary" />}
                    {!hover && <FavoriteBorderIcon color="primary" />}
                </>
            )}
            {isFavorite && <FavoriteIcon sx={{ color: '#F95738' }} />}
        </IconButton>
    )
}

export default HoverFavorite

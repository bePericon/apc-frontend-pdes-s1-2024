import * as React from 'react'
import Rating from '@mui/material/Rating'
import Box from '@mui/material/Box'
import StarIcon from '@mui/icons-material/Star'
import { Typography } from '@mui/material'

interface HoverRatingProps {
    ratingValue: number | null
    onChange: (event: any, newValue: any) => void
}

export default function HoverRating({ ratingValue, onChange }: HoverRatingProps) {
    const [hover, setHover] = React.useState(-1)
    const labels: { [index: string]: string } = {
        0: '0',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
        10: '10',
    }

    const getLabelText = (value: number) => {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`
    }

    return (
        <Box
            sx={{
                width: 'auto',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '16px',
            }}
        >
            <Rating
                name="hover-feedback"
                value={ratingValue}
                precision={1}
                getLabelText={getLabelText}
                onChange={onChange}
                onChangeActive={(event, newHover) => {
                    setHover(newHover)
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                max={10}
            />
            {ratingValue !== null && (
                <Box>
                    <Typography sx={{ color: 'grey' }}>
                        {labels[hover !== -1 ? hover : ratingValue]} / 10
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

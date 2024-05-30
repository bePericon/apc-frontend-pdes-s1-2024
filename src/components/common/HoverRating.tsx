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
    0: 'Pésimo',
    1: 'Malísimo',
    2: 'Muy malo',
    3: 'Malo',
    4: 'Casi malo',
    5: 'Ok',
    6: 'Casi bueno',
    7: 'Bueno',
    8: 'Muy bueno',
    9: 'Más que bueno',
    10: 'Excelente',
  }

  const getLabelText = (value: number) => {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`
  }

  return (
    <Box
      sx={{
        width: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px'
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
        <Box >
          <Typography>{labels[hover !== -1 ? hover : ratingValue]}</Typography>
        </Box>
      )}
    </Box>
  )
}

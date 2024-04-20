import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { Typography } from "@mui/material";

interface HoverRatingProps {
  ratingValue: number | null;
  onChange: (event: any, newValue: any) => void;
}

export default function HoverRating({ ratingValue, onChange }: HoverRatingProps) {
  const [hover, setHover] = React.useState(-1);
  const labels: { [index: string]: string } = {
    1: "Muy malo",
    2: "Malo",
    3: "Ok",
    4: "Bueno",
    5: "Excelente",
  };

  const getLabelText = (value: number) => {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  };

  return (
    <Box
      sx={{
        width: 210,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="hover-feedback"
        value={ratingValue}
        precision={1}
        getLabelText={getLabelText}
        onChange={onChange}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {ratingValue !== null && (
        <Box sx={{ ml: 2 }}>
          <Typography>{labels[hover !== -1 ? hover : ratingValue]}</Typography>
        </Box>
      )}
    </Box>
  );
}

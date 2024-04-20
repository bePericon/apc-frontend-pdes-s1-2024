import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";

interface HoverFavoriteProps {
  isFavorite: boolean;
  onClickFavorite: () => void;
}

const HoverFavorite = ({ isFavorite, onClickFavorite }: HoverFavoriteProps) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      style={{ cursor: "pointer" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClickFavorite}
    >
      {!isFavorite && (
        <>
          {hover && <FavoriteIcon color="primary" />}
          {!hover && <FavoriteBorderIcon color="primary" />}
        </>
      )}
      {isFavorite && <FavoriteIcon sx={{ color: "#F95738" }} />}
    </div>
  );
};

export default HoverFavorite;

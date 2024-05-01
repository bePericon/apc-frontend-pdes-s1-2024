import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Skeleton, Typography } from "@mui/material";
import CarouselPictures from "../CarouselPictures/CarouselPictures";
import {
  StyledContainer,
  StyledInfoContainer,
  StyledInnerContainer,
  StyledSkeletonContainer,
  StyledTitleContainer,
} from "./DialogItemList.styled";
import { numberWithCommas } from "@/utils/misc";
import HoverRating from "../HoverRating";
import HoverFavorite from "../HoverFavorite";
import FavoriteService from "@/service/favorite.service";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";

interface DialogItemListProps {
  open: boolean;
  onClose: () => void;
  item?: any;
}

const DialogItemList = ({ open, onClose, item }: DialogItemListProps) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [rating, setRating] = useState<number | null>(null);

  const handleOnClickFavorite = async () => {
    if (!isFavorite) {
      await FavoriteService.add({
        userId: user._id,
        itemId: item.id,
      });
      setIsFavorite(true);
    } else {
      await FavoriteService.delete(item?.isFavorite._id);
      setIsFavorite(false);
    }
  };

  const handleOnChange = async (event: any, newValue: any) => {
    await FavoriteService.update(item?.isFavorite._id, newValue, "");
    setRating(newValue)
  };

  useEffect(() => {
    if (item?.isFavorite) {
      setIsFavorite(true);
      setRating(item.isFavorite.rating);
    }
  }, [item]);

  return (
    <Dialog fullWidth={true} maxWidth={"md"} open={open} onClose={onClose}>
      <DialogTitle>
        {item && (
          <StyledTitleContainer>
            <Typography variant="h5">{item.title}</Typography>
            <HoverFavorite
              isFavorite={isFavorite}
              onClickFavorite={handleOnClickFavorite}
            />
          </StyledTitleContainer>
        )}
        {!item && (
          <Skeleton variant="text" sx={{ fontSize: "1.5rem", width: "100%" }} />
        )}
      </DialogTitle>
      <DialogContent>
        <Box
          noValidate
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
            width: "fit-content",
          }}
        >
          {!item && (
            <StyledSkeletonContainer>
              <Skeleton variant="rectangular" width={400} height={255} />
              <Skeleton
                variant="text"
                sx={{ fontSize: "2rem", width: "100%" }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.5rem", width: "30%" }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.5rem", width: "30%" }}
              />
            </StyledSkeletonContainer>
          )}

          {item && (
            <StyledContainer>
              <CarouselPictures pictures={item.pictures} />

              <StyledInfoContainer>
                <StyledInnerContainer>
                  <Typography variant="body1">PRECIO</Typography>
                  <Typography variant="body1">
                    $ {numberWithCommas(item.price)}
                  </Typography>
                </StyledInnerContainer>

                {isFavorite && (
                  <StyledInnerContainer>
                    <Typography variant="body1">VALORACIÓN</Typography>
                    <HoverRating
                      ratingValue={rating}
                      onChange={handleOnChange}
                    />
                  </StyledInnerContainer>
                )}
              </StyledInfoContainer>
            </StyledContainer>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>CERRAR</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogItemList;

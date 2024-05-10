import {
  StyledButton,
  StyledCategoryCard,
  StyledFirstIcon,
  StyledInfo,
  StyledLastIcon,
} from "./CardItemList.styled";
import { ChevronRight } from "@mui/icons-material";
import Image from "next/image";
import { Typography } from "@mui/material";
import DialogItemList from "../DialogItemList/DialogItemList";
import { useState } from "react";
import MeliService from "@/service/meli.service";

interface CardItemListProps {
  item: any;
}

const CardItemList = ({ item }: CardItemListProps) => {
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);

  const handleOnClick = async () => {
    const { data } = await MeliService.searchByItemId(item.id);
    console.log("🚀 ~ handleOnClick ~ data:", data)
    setCurrentItem(data);
    setOpen(true);
  };
  
  const handleOnClose = () => setOpen(false);

  return (
    <>
      <StyledCategoryCard onClick={handleOnClick}>
        <StyledFirstIcon>
          {/* <img src={item.thumbnail} alt={item.thumbnail_id} /> */}
          <Image
            src={item.thumbnail}
            width={90}
            height={90}
            alt={item.thumbnail_id}
            style={{ borderRadius: 8 }}
          />
        </StyledFirstIcon>
        <div>
          <StyledInfo>
            <Typography>{item.title}</Typography>
          </StyledInfo>
        </div>
        <StyledLastIcon>
          <StyledButton>
            <ChevronRight />
          </StyledButton>
        </StyledLastIcon>
      </StyledCategoryCard>
      <DialogItemList onClose={handleOnClose} open={open} item={currentItem} />
    </>
  );
};

export default CardItemList;

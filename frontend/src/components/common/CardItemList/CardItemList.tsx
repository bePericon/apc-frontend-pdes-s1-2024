import * as React from "react";
import {
  StyledButton,
  StyledCategoryCard,
  StyledFirstIcon,
  StyledInfo,
  StyledLastIcon,
} from "./CardItemList.styled";
import { ChevronRight } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
interface CardItemListProps {
  item: any;
}

const CardItemList = ({ item }: CardItemListProps) => {
  return (
    <Link href={"#"}>
      <StyledCategoryCard>
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
          <StyledInfo>{item.title}</StyledInfo>
        </div>
        <StyledLastIcon>
          <StyledButton>
            <ChevronRight />
          </StyledButton>
        </StyledLastIcon>
      </StyledCategoryCard>
    </Link>
  );
};

export default CardItemList;

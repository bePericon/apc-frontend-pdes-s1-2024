import {
    StyledButton,
    StyledCard,
    StyledFirstIcon,
    StyledInfo,
    StyledLastIcon,
} from './CardItemList.styled'
import { ChevronRight } from '@mui/icons-material'
import Image from 'next/image'
import { Typography } from '@mui/material'
import DialogItemList from '../DialogItemList/DialogItemList'
import { useState } from 'react'
import { Product } from '@/types/meli.types'

interface CardItemListProps {
    item: Product
    index: number
}

const CardItemList = ({ item, index }: CardItemListProps) => {
    const [open, setOpen] = useState(false)

    const handleOnClick = async () => setOpen(true)

    const handleOnClose = () => setOpen(false)

    return (
        <>
            <StyledCard onClick={handleOnClick} data-test-id={`card-item-${index}`}>
                <StyledFirstIcon>
                    {item.thumbnail && (
                        <Image
                            src={item.thumbnail}
                            width={90}
                            height={90}
                            alt={item.thumbnail_id}
                            style={{ borderRadius: 8 }}
                        />
                    )}
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
            </StyledCard>
            <DialogItemList onClose={handleOnClose} open={open} item={item} />
        </>
    )
}

export default CardItemList

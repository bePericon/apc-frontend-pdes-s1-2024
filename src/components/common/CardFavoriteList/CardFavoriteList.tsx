import {
    StyledButton,
    StyledCategoryCard,
    StyledFirstIcon,
    StyledInfo,
    StyledLastIcon,
} from './CardFavoriteList.styled'
import { ChevronRight } from '@mui/icons-material'
import Image from 'next/image'
import { Typography } from '@mui/material'
import { useState } from 'react'
import { Product } from '@/types/meli.types'
import DialogFavoriteList from '../DialogFavoriteList/DialogFavoriteList'

interface CardFavoriteListProps {
    item: Product
    setResearch: () => void
    index: number
}

const CardFavoriteList = ({ item, setResearch, index }: CardFavoriteListProps) => {
    const [open, setOpen] = useState(false)

    const handleOnClick = async () => setOpen(true)

    const handleOnClose = () => {
        setOpen(false)
        setResearch()
    }

    return (
        <>
            <StyledCategoryCard
                onClick={handleOnClick}
                data-test-id={`card-item-${index}`}
            >
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
            </StyledCategoryCard>
            <DialogFavoriteList onClose={handleOnClose} open={open} item={item} />
        </>
    )
}

export default CardFavoriteList

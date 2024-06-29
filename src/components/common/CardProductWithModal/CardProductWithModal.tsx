import {
    StyledButton,
    StyledCategoryCard,
    StyledFirstIcon,
    StyledInfo,
    StyledLastIcon,
} from './CardProductWithModal.styled'
import { ChevronRight } from '@mui/icons-material'
import Image from 'next/image'
import { Typography } from '@mui/material'
import { useState } from 'react'
import { Product } from '@/types/meli.types'

interface CardProductWithModalProps {
    item: Product
    setResearch?: () => void
    index: number
    renderModalComponent: (handleOnClose: () => void, open: boolean, item: Product) => void
}

const CardProductWithModal = ({
    item,
    setResearch,
    index,
    renderModalComponent,
}: CardProductWithModalProps) => {
    const [open, setOpen] = useState(false)

    const handleOnClick = async () => setOpen(true)

    const handleOnClose = () => {
        setOpen(false)
        if(setResearch) setResearch()
    }

    return (
        <>
            <StyledCategoryCard
                onClick={handleOnClick}
                data-test-id={`card-item-${index}`}
            >
                <StyledFirstIcon>
                    {item.hydrated?.thumbnail && (
                        <Image
                            src={item.hydrated?.thumbnail}
                            width={90}
                            height={90}
                            alt={item.hydrated?.thumbnail_id}
                            style={{ borderRadius: 8 }}
                        />
                    )}
                </StyledFirstIcon>
                <div>
                    <StyledInfo>
                        <Typography>{item.hydrated?.title}</Typography>
                    </StyledInfo>
                </div>
                <StyledLastIcon>
                    <StyledButton>
                        <ChevronRight />
                    </StyledButton>
                </StyledLastIcon>
            </StyledCategoryCard>
            {renderModalComponent(handleOnClose, open, item)}
        </>
    )
}

export default CardProductWithModal

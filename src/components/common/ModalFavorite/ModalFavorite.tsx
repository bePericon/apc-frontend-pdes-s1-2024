import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { Skeleton, Slide, Typography } from '@mui/material'
import CarouselPictures from '../CarouselPictures/CarouselPictures'
import { numberWithCommas } from '@/utils/misc'
import HoverRating from '../HoverRating'
import HoverFavorite from '../HoverFavorite'
import FavoriteService from '@/service/favorite.service'
import { forwardRef, useEffect, useState } from 'react'
import { Product } from '@/types/meli.types'
import CommentSection from './CommentSection/CommentSection'
import { useWidth } from '@/hook/useWidth'
import { TransitionProps } from '@mui/material/transitions'
import {
    StyledContainer,
    StyledInfoContainer,
    StyledInnerContainer,
    StyledSkeletonContainer,
    StyledSkeletonInfoContainer,
    StyledTypographyTitle,
} from '../CardProductWithModal/Modal.styled'
import CardProductSkeleton from '../CardProductWithModal/CardProductSkeleton'

interface ModalFavoriteProps {
    open: boolean
    onClose: () => void
    item: Product
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />
})

const ModalFavorite = ({ open, onClose, item }: ModalFavoriteProps) => {
    const { isMobile } = useWidth()
    const [rating, setRating] = useState<number | undefined>(undefined)

    const handleOnClickFavorite = async () => {
            if (item.favoriteId) await FavoriteService.delete(item.favoriteId as string)
            onClose()
    }

    const handleOnChange = async (event: any, newValue: any) => {
        await FavoriteService.update(item.favoriteId as string, newValue, '')
        setRating(newValue)
    }

    useEffect(() => {
        if (item.favoriteId) {
            setRating(item.rating)
        }
    }, [item])

    const propsDialog: any = isMobile
        ? { fullScreen: true, TransitionComponent: Transition }
        : { fullWidth: true, maxWidth: 'md' }

    return (
        <Dialog {...propsDialog} open={open} onClose={onClose}>
            <DialogContent>
                <Box
                    noValidate
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        m: 'auto',
                        width: 'fit-content',
                        marginTop: isMobile ? 0 : 4,
                    }}
                >
                    {!item && <CardProductSkeleton showCommentSection/>}

                    {item && (
                        <StyledContainer>
                            <CarouselPictures pictures={item.hydrated?.pictures} />

                            <StyledInfoContainer>
                                <StyledTypographyTitle>
                                    {item.hydrated?.title}
                                </StyledTypographyTitle>
                                <HoverRating
                                    ratingValue={rating as number}
                                    onChange={handleOnChange}
                                />
                                <StyledInnerContainer>
                                    <Typography variant="h5">
                                        $ {numberWithCommas(item.hydrated.price)}
                                    </Typography>
                                    <HoverFavorite
                                        isFavorite={!!item.favoriteId}
                                        onClickFavorite={handleOnClickFavorite}
                                    />
                                </StyledInnerContainer>
                                <CommentSection item={item} />
                            </StyledInfoContainer>
                        </StyledContainer>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>CERRAR</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalFavorite

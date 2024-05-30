import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Skeleton, Slide, Typography } from '@mui/material'
import CarouselPictures from '../CarouselPictures/CarouselPictures'
import {
    StyledContainer,
    StyledInfoContainer,
    StyledInnerContainer,
    StyledSkeletonContainer,
    StyledSkeletonInfoContainer,
    StyledTitleContainer,
    StyledTypographyTitle,
} from './DialogFavoriteList.styled'
import { numberWithCommas } from '@/utils/misc'
import HoverRating from '../HoverRating'
import HoverFavorite from '../HoverFavorite'
import FavoriteService from '@/service/favorite.service'
import { forwardRef, useEffect, useState } from 'react'
import { Product } from '@/types/meli.types'
import CommentSection from './CommentSection/CommentSection'
import { useWidth } from '@/hook/useWidth'
import { TransitionProps } from '@mui/material/transitions'

interface DialogFavoriteListProps {
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

const DialogFavoriteList = ({ open, onClose, item }: DialogFavoriteListProps) => {
    const { isMobile } = useWidth()
    const [isFavorite, setIsFavorite] = useState<boolean>(false)
    const [rating, setRating] = useState<number | undefined>(undefined)

    const handleOnClickFavorite = async () => {
        if (isFavorite) {
            if (item?.isFavorite) await FavoriteService.delete(item.favoriteId as string)
            setIsFavorite(false)
            onClose()
        }
    }

    const handleOnChange = async (event: any, newValue: any) => {
        if (item?.isFavorite)
            await FavoriteService.update(item.favoriteId as string, newValue, '')
        setRating(newValue)
    }

    useEffect(() => {
        if (item?.isFavorite) {
            setIsFavorite(true)
            setRating(item?.rating)
        }
    }, [item])

    const propsDialog: any = isMobile
        ? { fullScreen: true, TransitionComponent: Transition }
        : { fullWidth: true, maxWidth: 'md' }

    return (
        <Dialog {...propsDialog} open={open} onClose={onClose}>
            <DialogTitle>
                {item && (
                    <StyledTitleContainer>
                        <StyledTypographyTitle>{item.title}</StyledTypographyTitle>
                        <HoverFavorite
                            isFavorite={isFavorite}
                            onClickFavorite={handleOnClickFavorite}
                        />
                    </StyledTitleContainer>
                )}
                {!item && (
                    <Skeleton variant="text" sx={{ fontSize: '1.5rem', width: '100%' }} />
                )}
            </DialogTitle>
            <DialogContent>
                <Box
                    noValidate
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        m: 'auto',
                        width: 'fit-content',
                        marginTop: isMobile? 0 : 4,
                    }}
                >
                    {!item && (
                        <StyledSkeletonContainer>
                            <Skeleton
                                variant="rectangular"
                                width={isMobile ? 300 : 400}
                                height={isMobile ? 240 : 255}
                            />

                            <StyledSkeletonInfoContainer>
                                <Skeleton
                                    variant="text"
                                    sx={{ fontSize: '1.5rem', width: '100%' }}
                                />
                                <Skeleton
                                    variant="text"
                                    sx={{ fontSize: '1.5rem', width: '30%' }}
                                />
                                <Skeleton
                                    variant="text"
                                    sx={{ fontSize: '1.5rem', width: '30%' }}
                                />
                                <Skeleton
                                    variant="text"
                                    sx={{ fontSize: '2rem', width: '80%' }}
                                />
                                <Skeleton
                                    variant="text"
                                    sx={{ fontSize: '1.5rem', width: '30%' }}
                                />

                                <Skeleton
                                    variant="rectangular"
                                    width={300}
                                    height={150}
                                />
                            </StyledSkeletonInfoContainer>
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
                                    <>
                                        <StyledInnerContainer>
                                            <Typography variant="body1">
                                                VALORACIÓN
                                            </Typography>
                                            <HoverRating
                                                ratingValue={rating as number}
                                                onChange={handleOnChange}
                                            />
                                        </StyledInnerContainer>

                                        <CommentSection item={item} />
                                    </>
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
    )
}

export default DialogFavoriteList

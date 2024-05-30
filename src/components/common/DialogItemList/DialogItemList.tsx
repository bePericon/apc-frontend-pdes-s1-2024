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
    StyledTitleContainer,
    StyledTypographyTitle,
} from './DialogItemList.styled'
import { numberWithCommas } from '@/utils/misc'
import HoverRating from '../HoverRating'
import HoverFavorite from '../HoverFavorite'
import FavoriteService from '@/service/favorite.service'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { forwardRef, useEffect, useState } from 'react'
import MeliService from '@/service/meli.service'
import { Product } from '@/types/meli.types'
import { TransitionProps } from '@mui/material/transitions'
import { useWidth } from '@/hook/useWidth'

interface DialogItemListProps {
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

const DialogItemList = ({ open, onClose, item }: DialogItemListProps) => {
    const { isMobile } = useWidth()
    const user = useSelector((state: RootState) => state.auth.user)

    const [currentItem, setCurrentItem] = useState<Product>(item)
    const [isFavorite, setIsFavorite] = useState<boolean>(false)
    const [rating, setRating] = useState<number | undefined>(undefined)

    const handleOnClickFavorite = async () => {
        if (!isFavorite) {
            await FavoriteService.add({
                userId: user?._id,
                itemId: currentItem.itemId,
            })
            const { data } = await MeliService.searchByItemId(currentItem.itemId)
            setCurrentItem(data)
            setIsFavorite(true)
        } else {
            if (currentItem?.isFavorite)
                await FavoriteService.delete(currentItem.favoriteId as string)
            setIsFavorite(false)
        }
    }

    const handleOnChange = async (event: any, newValue: any) => {
        if (currentItem?.isFavorite)
            await FavoriteService.update(currentItem.favoriteId as string, newValue, '')
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
                {currentItem && (
                    <StyledTitleContainer>
                        <StyledTypographyTitle>{currentItem.title}</StyledTypographyTitle>
                        <HoverFavorite
                            isFavorite={isFavorite}
                            onClickFavorite={handleOnClickFavorite}
                        />
                    </StyledTitleContainer>
                )}
                {!currentItem && (
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
                    {!currentItem && (
                        <StyledSkeletonContainer>
                            <Skeleton
                                variant="rectangular"
                                width={isMobile ? 300 : 400}
                                height={isMobile ? 240 : 255}
                            />
                            <Skeleton
                                variant="text"
                                sx={{
                                    fontSize: '2rem',
                                    width: isMobile ? '70%' : '100%',
                                }}
                            />
                            <Skeleton
                                variant="text"
                                sx={{ fontSize: '1.5rem', width: '30%' }}
                            />
                            <Skeleton
                                variant="text"
                                sx={{ fontSize: '1.5rem', width: '30%' }}
                            />
                        </StyledSkeletonContainer>
                    )}

                    {currentItem && (
                        <StyledContainer>
                            <CarouselPictures pictures={currentItem.pictures} />

                            <StyledInfoContainer>
                                <StyledInnerContainer>
                                    <Typography variant="body1">PRECIO</Typography>
                                    <Typography variant="body1">
                                        $ {numberWithCommas(currentItem.price)}
                                    </Typography>
                                </StyledInnerContainer>

                                {isFavorite && (
                                    <StyledInnerContainer>
                                        <Typography variant="body1">
                                            VALORACIÓN
                                        </Typography>
                                        <HoverRating
                                            ratingValue={rating as number}
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
    )
}

export default DialogItemList

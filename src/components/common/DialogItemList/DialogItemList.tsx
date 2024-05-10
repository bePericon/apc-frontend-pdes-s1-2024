import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Skeleton, Typography } from '@mui/material'
import CarouselPictures from '../CarouselPictures/CarouselPictures'
import {
    StyledContainer,
    StyledInfoContainer,
    StyledInnerContainer,
    StyledSkeletonContainer,
    StyledTitleContainer,
} from './DialogItemList.styled'
import { numberWithCommas } from '@/utils/misc'
import HoverRating from '../HoverRating'
import HoverFavorite from '../HoverFavorite'
import FavoriteService from '@/service/favorite.service'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useEffect, useState } from 'react'
import MeliService from '@/service/meli.service'
import { Product } from '@/types/meli.types'

interface DialogItemListProps {
    open: boolean
    onClose: () => void
    item: Product
}

const DialogItemList = ({ open, onClose, item }: DialogItemListProps) => {
    const user = useSelector((state: RootState) => state.auth.user)

    const [currentItem, setCurrentItem] = useState<Product>(item)
    const [isFavorite, setIsFavorite] = useState<boolean>(false)
    const [rating, setRating] = useState<number | null>(null)

    const handleOnClickFavorite = async () => {
        if (!isFavorite) {
            await FavoriteService.add({
                userId: user._id,
                itemId: currentItem.id,
            })
            const { data } = await MeliService.searchByItemId(currentItem.id)
            setCurrentItem(data)
            setIsFavorite(true)
        } else {
            if (currentItem?.isFavorite)
                await FavoriteService.delete(currentItem.isFavorite._id)
            setIsFavorite(false)
        }
    }

    const handleOnChange = async (event: any, newValue: any) => {
        if (currentItem?.isFavorite)
            await FavoriteService.update(currentItem.isFavorite._id, newValue, '')
        setRating(newValue)
    }

    useEffect(() => {
        if (item?.isFavorite) {
            setIsFavorite(true)
            setRating(item.isFavorite.rating)
        }
    }, [item])

    return (
        <Dialog fullWidth={true} maxWidth={'md'} open={open} onClose={onClose}>
            <DialogTitle>
                {currentItem && (
                    <StyledTitleContainer>
                        <Typography variant="h5">{currentItem.title}</Typography>
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
                    }}
                >
                    {!currentItem && (
                        <StyledSkeletonContainer>
                            <Skeleton variant="rectangular" width={400} height={255} />
                            <Skeleton
                                variant="text"
                                sx={{ fontSize: '2rem', width: '100%' }}
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
    )
}

export default DialogItemList

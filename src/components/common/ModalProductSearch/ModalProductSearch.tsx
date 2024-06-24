import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { IconButton, Slide, Typography } from '@mui/material'
import CarouselPictures from '../CarouselPictures/CarouselPictures'
import { numberWithCommas } from '@/utils/misc'
import HoverFavorite from '../HoverFavorite'
import FavoriteService from '@/service/favorite.service'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { forwardRef, useEffect, useState } from 'react'
import MeliService from '@/service/meli.service'
import { Product } from '@/types/meli.types'
import { TransitionProps } from '@mui/material/transitions'
import { useWidth } from '@/hook/useWidth'
import {
    StyledContainer,
    StyledInfoContainer,
    StyledInnerContainer,
    StyledPurchaseButtonContainer,
    StyledPurchaseInnerSection,
    StyledPurchaseSection,
    StyledTypographyTitle,
} from '../CardProductWithModal/Modal.styled'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import purchaseService from '@/service/purchase.service'
import CardProductSkeleton from '../CardProductWithModal/CardProductSkeleton'

interface ModalProductSearchProps {
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

const ModalProductSearch = ({ open, onClose, item }: ModalProductSearchProps) => {
    const { isMobile } = useWidth()
    const user = useSelector((state: RootState) => state.auth.user)

    const [currentItem, setCurrentItem] = useState<Product>(item)
    const [isFavorite, setIsFavorite] = useState<boolean>(false)

    const [localQuantity, setLocalQuantity] = useState<number>(0)

    const addQuantity = () => setLocalQuantity(localQuantity + 1)
    const removeQuantity = () => setLocalQuantity(localQuantity - 1)

    const handleOnClickBuy = async () => {
        const newPurchase = {
            userId: user?._id,
            itemId: item.itemId,
            price: item.hydrated.price,
            quantity: localQuantity,
        }
        await purchaseService.add(newPurchase)
        onClose()
    }

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
            if (currentItem?.favoriteId)
                await FavoriteService.delete(currentItem.favoriteId as string)
            setIsFavorite(false)
        }
    }

    useEffect(() => {
        if (item?.favoriteId) {
            setIsFavorite(true)
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
                        width:  isMobile ? '100%' : 'fit-content',
                        marginTop: isMobile ? 0 : 4,
                    }}
                >
                    {!item && <CardProductSkeleton />}

                    {item && (
                        <StyledContainer>
                            <CarouselPictures pictures={item.hydrated?.pictures} />

                            <StyledInfoContainer>
                                <StyledTypographyTitle>
                                    {item.hydrated?.title}
                                </StyledTypographyTitle>
                                <StyledInnerContainer>
                                    <Typography variant="h6">
                                        $ {numberWithCommas(item.hydrated?.price)}
                                    </Typography>
                                    <HoverFavorite
                                        isFavorite={isFavorite}
                                        onClickFavorite={handleOnClickFavorite}
                                    />
                                </StyledInnerContainer>

                                <StyledPurchaseSection>
                                    <Typography variant="h6">Nueva compra</Typography>
                                    <StyledPurchaseInnerSection>
                                        <Typography variant="body1">Cantidad:</Typography>
                                        <>
                                            <IconButton
                                                onClick={removeQuantity}
                                                disabled={localQuantity === 0}
                                            >
                                                <RemoveIcon
                                                    sx={{
                                                        color:
                                                            localQuantity === 0
                                                                ? '#6c757d'
                                                                : '#0D3B66',
                                                    }}
                                                />
                                            </IconButton>
                                            <Typography variant="body1">
                                                {localQuantity}
                                            </Typography>
                                            <IconButton onClick={addQuantity}>
                                                <AddIcon sx={{ color: '#0D3B66' }} />
                                            </IconButton>
                                        </>
                                    </StyledPurchaseInnerSection>
                                    {localQuantity > 0 && (
                                        <>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: 'grey',
                                                }}
                                            >
                                                Usted esta por comprar: {localQuantity}{' '}
                                                unidades de este producto.
                                            </Typography>
                                            <StyledPurchaseButtonContainer>
                                                <Button onClick={handleOnClickBuy}>
                                                    Comprar
                                                </Button>
                                            </StyledPurchaseButtonContainer>
                                        </>
                                    )}
                                </StyledPurchaseSection>
                            </StyledInfoContainer>
                        </StyledContainer>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button data-test-id={'btn-dialog-close'} onClick={onClose}>CERRAR</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalProductSearch

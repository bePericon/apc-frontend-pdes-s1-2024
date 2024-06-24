import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { IconButton, Skeleton, Slide, Typography } from '@mui/material'
import CarouselPictures from '../CarouselPictures/CarouselPictures'
import {
    StyledContainer,
    StyledInfoContainer,
    StyledInnerContainer,
    StyledPurchaseButtonContainer,
    StyledPurchaseInnerSection,
    StyledPurchaseSection,
    StyledSkeletonContainer,
    StyledSkeletonInfoContainer,
    StyledTypographyTitle,
} from '../CardProductWithModal/Modal.styled'
import { numberWithCommas } from '@/utils/misc'
import { forwardRef, useState } from 'react'
import { PurchaseProduct } from '@/types/meli.types'
import { useWidth } from '@/hook/useWidth'
import { TransitionProps } from '@mui/material/transitions'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import purchaseService from '@/service/purchase.service'
import meliService from '@/service/meli.service'
import CardProductSkeleton from '../CardProductWithModal/CardProductSkeleton'

interface ModalPurchaseProps {
    open: boolean
    onClose: () => void
    item: PurchaseProduct
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />
})

const ModalPurchase = ({ open, onClose, item }: ModalPurchaseProps) => {
    const { isMobile } = useWidth()
    const propsDialog: any = isMobile
        ? { fullScreen: true, TransitionComponent: Transition }
        : { fullWidth: true, maxWidth: 'md' }

    const [localQuantity, setLocalQuantity] = useState(0)

    const addQuantity = () => {
        setNewPrice(0)
        setShowConfirmation(false)
        setLocalQuantity(localQuantity + 1)
    }
    const removeQuantity = () => {
        setNewPrice(0)
        setShowConfirmation(false)
        setLocalQuantity(localQuantity - 1)
    }

    const [showConfirmation, setShowConfirmation] = useState(false)
    const [newPrice, setNewPrice] = useState(0)

    const clearData = () => {
        setLocalQuantity(0)
        setNewPrice(0)
        setShowConfirmation(false)
    }

    const handleOnClickConfirmation = async () => {
        const newPurchase = {
            userId: item.user,
            itemId: item.itemId,
            price: item.hydrated.price,
            quantity: localQuantity,
        }
        await purchaseService.add(newPurchase)
        clearData()
        onClose()
    }

    const handleOnClickBuy = async () => {
        const { data } = await meliService.searchByItemId(item.itemId)
        if (data.hydrated.price !== item.price) {
            setNewPrice(data.hydrated.price)
            setShowConfirmation(true)
        } else {
            handleOnClickConfirmation()
        }
    }

    return (
        <Dialog
            {...propsDialog}
            open={open}
            onClose={() => {
                clearData()
                onClose()
            }}
        >
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
                    {!item && <CardProductSkeleton />}

                    {item && (
                        <StyledContainer>
                            <CarouselPictures pictures={item.hydrated?.pictures} />

                            <StyledInfoContainer>
                                <StyledTypographyTitle>
                                    {item.hydrated?.title}
                                </StyledTypographyTitle>
                                <StyledInnerContainer>
                                    <Typography variant="h5">
                                        $ {numberWithCommas(item.price)}
                                    </Typography>
                                    <Typography variant="body1">
                                        Cantidad comprada: {item.quantity}
                                    </Typography>
                                </StyledInnerContainer>

                                <StyledPurchaseSection>
                                    <Typography variant="h6">Nueva compra</Typography>
                                    <StyledPurchaseInnerSection>
                                        <>
                                            <Typography variant="body1">
                                                Cantidad:
                                            </Typography>
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
                                            <>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: 'grey',
                                                    }}
                                                >
                                                    Usted esta por comprar:{' '}
                                                    {localQuantity} unidades de este
                                                    producto.
                                                </Typography>
                                                {showConfirmation && (
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: 'red',
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        Pero el precio ha cambiado, en
                                                        este momento es de: $ {newPrice}
                                                    </Typography>
                                                )}
                                            </>
                                            <StyledPurchaseButtonContainer>
                                                {!showConfirmation && (
                                                    <Button onClick={handleOnClickBuy}>
                                                        Comprar
                                                    </Button>
                                                )}
                                                {showConfirmation && (
                                                    <Button
                                                        onClick={
                                                            handleOnClickConfirmation
                                                        }
                                                    >
                                                        Confirmar compra
                                                    </Button>
                                                )}
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
                <Button
                    onClick={() => {
                        clearData()
                        onClose()
                    }}
                >
                    CERRAR
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalPurchase

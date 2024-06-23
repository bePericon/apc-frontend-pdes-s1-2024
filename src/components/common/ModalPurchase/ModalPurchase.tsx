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
} from './ModalPurchase.styled'
import { numberWithCommas } from '@/utils/misc'
import { forwardRef, useEffect, useState } from 'react'
import { PurchaseProduct } from '@/types/meli.types'
import { useWidth } from '@/hook/useWidth'
import { TransitionProps } from '@mui/material/transitions'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import purchaseService from '@/service/purchase.service'

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

    const addQuantity = () => setLocalQuantity(localQuantity + 1)
    const removeQuantity = () => setLocalQuantity(localQuantity - 1)

    const handleOnClickBuy = async () => {
        await purchaseService.update(item.purchaseId, item.quantity, item.price)
    }

    useEffect(() => {
        if (item) {
            setLocalQuantity(item.quantity)
        }
    }, [item])

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
                            <CarouselPictures pictures={item.hydrated?.pictures} />

                            <StyledInfoContainer>
                                <StyledTypographyTitle>
                                    {item.hydrated?.title}
                                </StyledTypographyTitle>
                                {/* <HoverRating
                                    ratingValue={rating as number}
                                    onChange={handleOnChange}
                                /> */}
                                <StyledInnerContainer>
                                    <Typography variant="h6">
                                        $ {numberWithCommas(item.price)}
                                    </Typography>
                                </StyledInnerContainer>

                                <StyledPurchaseSection>
                                    <StyledPurchaseInnerSection>
                                        <Typography variant="body1">Cantidad:</Typography>
                                        <>
                                            <IconButton
                                                onClick={removeQuantity}
                                                disabled={item.quantity === localQuantity}
                                            >
                                                <RemoveIcon
                                                    sx={{
                                                        color:
                                                            item.quantity ===
                                                            localQuantity
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
                                    {item.quantity !== localQuantity &&
                                        item.quantity < localQuantity && (
                                            <>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: 'red',
                                                    }}
                                                >
                                                    Se ha cambiado la cantidad de
                                                    productos, antes era: {item.quantity}.
                                                    Para realizar la compra de la
                                                    diferencia presione el botón de
                                                    comprar.
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
                <Button onClick={onClose}>CERRAR</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalPurchase

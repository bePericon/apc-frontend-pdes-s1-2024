import React, { useEffect, useState } from 'react'
import purchaseService from '@/service/purchase.service'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { StyledColumnItems, StyledPurchasesContainer } from './Purchases.styled'
import { StyledContainerSection } from '../Layout.styled'
import { Product, PurchaseProduct } from '@/types/meli.types'
import { Typography } from '@mui/material'
import TitlePage from '@/components/common/TitlePage/TitlePage'
import CardProductWithModal from '@/components/common/CardProductWithModal/CardProductWithModal'
import ModalPurchase from '@/components/common/ModalPurchase/ModalPurchase'

const Purchases = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const [Purchases, setPurchases] = useState<Product[]>([])

    const fetching = async () => {
        const { data } = await purchaseService.getPurchasesByUserId(user?._id as string)
        setPurchases(data)
    }

    useEffect(() => {
        fetching()
    }, [])

    return (
        <StyledPurchasesContainer>
            <TitlePage
                title="Tus productos comprados"
                subtitle="Haciendo click en el producto podes ver los datos de tu compra."
            />
            <StyledContainerSection withColor expandFullWidthMobile>
                <StyledColumnItems>
                    {Purchases.length === 0 && (
                        <Typography variant="h5">
                            No se encontraron compras realizadas
                        </Typography>
                    )}
                    {Purchases.map((item, ind) => (
                        <CardProductWithModal
                            key={`item-${ind + 1}`}
                            item={item}
                            setResearch={fetching}
                            index={ind}
                            renderModalComponent={(handleOnClose, open, item) => (
                                <ModalPurchase
                                    item={item as PurchaseProduct}
                                    open={open}
                                    onClose={handleOnClose}
                                />
                            )}
                        />
                    ))}
                </StyledColumnItems>
            </StyledContainerSection>
        </StyledPurchasesContainer>
    )
}

export default Purchases

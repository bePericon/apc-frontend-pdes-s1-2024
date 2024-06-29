import { useState } from 'react'
import { StyledContainerPage } from '../Layout.styled'
import { StyledTab, StyledTabs } from './Reports.styled'
import TopFiveFavorites from './section/TopFiveFavorites/TopFiveFavorites'
import { Divider } from '@mui/material'
import TopFiveMustPurchases from './section/TopFiveMustPurchases/TopFiveMustPurchases'
import TopFiveBestSelling from './section/TopFiveBestSelling/TopFiveBestSelling'

enum TabReport {
    TOP_FIVE_FAVORITES = 0,
    TOP_FIVE_MUST_PURCHASES = 1,
    TOP_FIVE_BEST_SELLING_PURCHASES = 2,
}

const Reports = () => {
    const [currentTab, setCurrentTab] = useState<TabReport>(TabReport.TOP_FIVE_FAVORITES)

    return (
        <StyledContainerPage>
            <StyledTabs>
                <StyledTab
                    className={
                        currentTab === TabReport.TOP_FIVE_FAVORITES ? 'selected' : ''
                    }
                    onClick={() => setCurrentTab(TabReport.TOP_FIVE_FAVORITES)}
                >
                    Productos favoritos
                </StyledTab>
                <Divider orientation="vertical" flexItem />
                <StyledTab
                    className={
                        currentTab === TabReport.TOP_FIVE_MUST_PURCHASES ? 'selected' : ''
                    }
                    onClick={() => setCurrentTab(TabReport.TOP_FIVE_MUST_PURCHASES)}
                >
                    Usuarios con más compras
                </StyledTab>
                <Divider orientation="vertical" flexItem />
                <StyledTab
                    className={
                        currentTab === TabReport.TOP_FIVE_BEST_SELLING_PURCHASES
                            ? 'selected'
                            : ''
                    }
                    onClick={() =>
                        setCurrentTab(TabReport.TOP_FIVE_BEST_SELLING_PURCHASES)
                    }
                >
                    Productos más vendidos
                </StyledTab>
            </StyledTabs>

            {currentTab === TabReport.TOP_FIVE_FAVORITES && <TopFiveFavorites />}
            {currentTab === TabReport.TOP_FIVE_MUST_PURCHASES && <TopFiveMustPurchases />}
            {currentTab === TabReport.TOP_FIVE_BEST_SELLING_PURCHASES && <TopFiveBestSelling />}
        </StyledContainerPage>
    )
}

export default Reports

import TitlePage from "@/components/common/TitlePage/TitlePage"
import { StyledContainerSection } from "../../../Layout.styled"
import TopFiveFavoritesReportTable from "./TopFiveFavoritesReportTable"

const TopFiveFavorites = () => {
    return (
        <>
            <TitlePage
                title="Top 5 productos más populares"
                subtitle="Estos son los productos más puestos en favoritos por nuestros usuarios."
            />
            <StyledContainerSection>
                <TopFiveFavoritesReportTable />
            </StyledContainerSection>
        </>
    )
}

export default TopFiveFavorites

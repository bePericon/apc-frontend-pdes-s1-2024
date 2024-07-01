import TitlePage from "@/components/common/TitlePage/TitlePage"
import { StyledContainerSection } from "../../../Layout.styled"
import TopFiveBestSellingReportTable from "./TopFiveBestSellingReportTable"

const TopFiveBestSelling = () => {
    return (
        <>
            <TitlePage
                title="Top 5 productos más vendidos"
                subtitle="Estos son los productos más vendidos en la plataforma."
            />
            <StyledContainerSection>
                <TopFiveBestSellingReportTable />
            </StyledContainerSection>
        </>
    )
}

export default TopFiveBestSelling

import TitlePage from "@/components/common/TitlePage/TitlePage"
import { StyledContainerSection } from "../../../Layout.styled"
import TopFiveMustPurchasesReportTable from "./TopFiveMustPurchasesReportTable"

const TopFiveMustPurchases = () => {
    return (
        <>
            <TitlePage
                title="Top 5 usuarios con más compras"
                subtitle="Estos son los usuarios que realizaron más compras en la plataforma."
            />
            <StyledContainerSection>
                <TopFiveMustPurchasesReportTable />
            </StyledContainerSection>
        </>
    )
}

export default TopFiveMustPurchases

import { StyledContainerPage, StyledContainerSection } from '../Layout.styled'
import TopFiveReportTable from './TopFiveReportTable'
import TitlePage from '@/components/common/TitlePage/TitlePage'

const Reports = () => {
    return (
        <StyledContainerPage>
            <TitlePage
                title="Top 5 productos más populares"
                subtitle="Estos son los productos más puestos en favoritos por nuestros usuarios."
            />
            <StyledContainerSection>
                <TopFiveReportTable />
            </StyledContainerSection>
        </StyledContainerPage>
    )
}

export default Reports

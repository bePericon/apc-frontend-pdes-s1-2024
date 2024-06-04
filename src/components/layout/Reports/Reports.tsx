import Navbar from '../Navbar/Navbar'
import { StyledContainerPage, StyledContainerSection } from '../Layout.styled'
import TopFiveReportTable from './TopFiveReportTable'

const Reports = () => {
    return (
        <StyledContainerPage>
            <StyledContainerSection withColor>
                <Navbar />
            </StyledContainerSection>

            <StyledContainerSection>
                <TopFiveReportTable />
            </StyledContainerSection>
        </StyledContainerPage>
    )
}

export default Reports

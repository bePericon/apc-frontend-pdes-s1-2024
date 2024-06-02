import Navbar from '../Navbar/Navbar'
import { StyledContainerPage, StyledContainerSection } from '../Layout.styled'
import UsersTable from '@/components/common/UsersTable/UsersTable'

const Users = () => {
    return (
        <StyledContainerPage>
            <StyledContainerSection withColor>
                <Navbar />
            </StyledContainerSection>

            <StyledContainerSection>
                <UsersTable />
            </StyledContainerSection>
        </StyledContainerPage>
    )
}

export default Users

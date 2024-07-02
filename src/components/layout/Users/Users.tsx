import { StyledContainerPage, StyledContainerSection } from '../Layout.styled'
import UsersTable from './UsersTable/UsersTable'
import TitlePage from '@/components/common/TitlePage/TitlePage'

const Users = () => {
    return (
        <StyledContainerPage>
            <TitlePage
                title="Tabla de usuarios"
                subtitle="Los usuarios pueden editarse o eliminarse utilizando las acciones en la ultima columna."
            />

            <UsersTable />
        </StyledContainerPage>
    )
}

export default Users

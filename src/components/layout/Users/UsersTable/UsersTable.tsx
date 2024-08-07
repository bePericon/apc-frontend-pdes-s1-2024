import { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import UserService from '../../../../service/user.service'
import { User } from '@/types/apc.types'
import moment from 'moment'
import { Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ModelUpdateUser from './ModelUpdateUser/ModelUpdateUser'
import {
    StyledButtonContainer,
    StyledTableCellText,
    StyledTableContainer,
    StyledTableHeadText,
} from './UserTable.styled'
import ModalDeleteUser from './ModalDeleteUser/ModalDeleteUser'
import { StyledContainerSection } from '../../Layout.styled'
import ModelCreateUser from './ModelCreateUser/ModelCreateUser'

const UsersTable = () => {
    const [users, setUsers] = useState<User[]>([])

    const [openEditUser, setOpenEditUser] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    const [openDeleteUser, setOpenDeleteUser] = useState(false)
    const [openCreateUser, setOpenCreateUser] = useState(false)

    const fetchUsers = async () => {
        const allUsers = await UserService.getAll()
        setUsers(allUsers.data)
    }

    const handleDeleteUser = async () => {
        await UserService.delete(selectedUser?._id as string)
        setOpenDeleteUser(false)
        fetchUsers()
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <>
            <StyledButtonContainer>
                <Button onClick={() => setOpenCreateUser(true)} sx={{ color: '#0D3B66' }}>
                    Crear administrador
                </Button>
            </StyledButtonContainer>
            <StyledContainerSection>
                <StyledTableContainer>
                    <Table sx={{ minWidth: 250 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <StyledTableHeadText>
                                        Nombre y Apellido
                                    </StyledTableHeadText>
                                </TableCell>
                                <TableCell>
                                    <StyledTableHeadText>
                                        Nombre de usuario
                                    </StyledTableHeadText>
                                </TableCell>
                                <TableCell>
                                    <StyledTableHeadText>Email</StyledTableHeadText>
                                </TableCell>
                                <TableCell>
                                    <StyledTableHeadText>Roles</StyledTableHeadText>
                                </TableCell>
                                <TableCell>
                                    <StyledTableHeadText align="center">
                                        Fecha de creación
                                    </StyledTableHeadText>
                                </TableCell>
                                <TableCell align="right">
                                    <StyledTableHeadText>Acciones</StyledTableHeadText>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow
                                    key={user.name}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        <StyledTableCellText>
                                            {`${user.name} ${user.surname}`}
                                        </StyledTableCellText>
                                    </TableCell>
                                    <TableCell>
                                        <StyledTableCellText>
                                            {user.username}
                                        </StyledTableCellText>
                                    </TableCell>
                                    <TableCell>
                                        <StyledTableCellText>
                                            {user.email}
                                        </StyledTableCellText>
                                    </TableCell>
                                    <TableCell>
                                        <StyledTableCellText>
                                            {user.roles.map((role, ind, arr) =>
                                                ind === arr.length - 1
                                                    ? `${role.name} `
                                                    : `${role.name} ,`
                                            )}
                                        </StyledTableCellText>
                                    </TableCell>
                                    <TableCell>
                                        <StyledTableCellText align="center">
                                            {moment(user.createdDate).format(
                                                'DD/MM/YYYY'
                                            )}
                                        </StyledTableCellText>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            aria-label="edit"
                                            onClick={() => {
                                                setSelectedUser(user)
                                                setOpenEditUser(true)
                                            }}
                                        >
                                            <EditIcon sx={{ color: '#EE964B' }} />
                                        </IconButton>
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => {
                                                setSelectedUser(user)
                                                setOpenDeleteUser(true)
                                            }}
                                        >
                                            <DeleteIcon sx={{ color: '#F95738' }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </StyledTableContainer>
                <ModelUpdateUser
                    onClose={(needUpdate?: boolean) => {
                        setOpenEditUser(false)

                        if (needUpdate) fetchUsers()
                    }}
                    open={openEditUser}
                    user={selectedUser}
                />
                <ModalDeleteUser
                    open={openDeleteUser}
                    onConfirm={handleDeleteUser}
                    onClose={() => setOpenDeleteUser(false)}
                />
                <ModelCreateUser
                    onClose={(needUpdate?: boolean) => {
                        setOpenCreateUser(false)
                        if (needUpdate) fetchUsers()
                    }}
                    open={openCreateUser}
                    isAdmin={true}
                />
            </StyledContainerSection>
        </>
    )
}

export default UsersTable

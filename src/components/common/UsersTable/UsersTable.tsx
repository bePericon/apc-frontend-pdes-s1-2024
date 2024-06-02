import { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import UserService from '../../../service/user.service'
import { User } from '@/types/apc.types'
import moment from 'moment'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import DialogUser from './DialogUser/DialogUser'

const UsersTable = () => {
    const [users, setUsers] = useState<User[]>([])

    const [openEditUser, setOpenEditUser] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    const fetchUsers = async () => {
        const allUsers = await UserService.getAll()
        setUsers(allUsers.data)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre y Apellido</TableCell>
                            <TableCell>Nombre de usuario</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Roles</TableCell>
                            <TableCell>Fecha de creación</TableCell>
                            <TableCell align="right">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {`${user.name} ${user.surname}`}
                                </TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    {user.roles.map((role, ind, arr) =>
                                        ind === arr.length - 1
                                            ? `${role.name} `
                                            : `${role.name} ,`
                                    )}
                                </TableCell>
                                <TableCell>
                                    {moment(user.creationDate).format('DD/mm/yyyy')}
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
                                    <IconButton aria-label="delete" onClick={() => {}}>
                                        <DeleteIcon sx={{ color: '#F95738' }} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <DialogUser
                onClose={(needUpdate?: boolean) => {
                    setOpenEditUser(false)

                    if (needUpdate) fetchUsers()
                }}
                open={openEditUser}
                user={selectedUser}
            />
        </>
    )
}

export default UsersTable

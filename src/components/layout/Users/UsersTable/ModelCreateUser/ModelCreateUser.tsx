import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'

import DialogTitle from '@mui/material/DialogTitle'
import { Role, RoleName, User } from '@/types/apc.types'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
    Chip,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { StyledFormContainer } from './ModelCreateUser.styled'
import UserService from '../../../../../service/user.service'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

interface ModelCreateUserProps {
    open: boolean
    onClose: (needUpdate?: boolean) => void
    isAdmin: boolean
}

interface InputsUserCreate {
    name: string
    surname: string
    username: string
    email: string
    password: string
    role: string[]
}

const ModelCreateUser = ({ open, onClose, isAdmin }: ModelCreateUserProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InputsUserCreate>()
    const currentUser = useSelector((state: RootState) => state.auth.user)

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const onSubmit: SubmitHandler<InputsUserCreate> = async (data) => {
        const roleAdmin = currentUser?.roles.filter(
            (role) => role.name === RoleName.ADMIN
        )[0] as Role
        const form = { ...data, roles: [roleAdmin._id] }
        await UserService.create(form)
        onClose(true)
    }

    return (
        <Dialog open={open} onClose={() => onClose()}>
            <DialogTitle>Creación de usuario</DialogTitle>
            <DialogContent>
                <StyledFormContainer>
                    {isAdmin && <Chip label="Nuevo administrador" />}

                    <FormControl variant="outlined" error={errors.name ? true : false}>
                        <InputLabel htmlFor="input-name">Nombre</InputLabel>
                        <OutlinedInput
                            id="input-name"
                            type="text"
                            label="Nombre"
                            {...register('name', {
                                required: true,
                                maxLength: 30,
                            })}
                        />
                        {errors.name?.type === 'required' && (
                            <FormHelperText>Campo obligatorio</FormHelperText>
                        )}
                        {errors.name?.type === 'maxLength' && (
                            <FormHelperText>Formato de nombre muy largo</FormHelperText>
                        )}
                    </FormControl>

                    <FormControl variant="outlined" error={errors.surname ? true : false}>
                        <InputLabel htmlFor="input-surname">Apellido</InputLabel>
                        <OutlinedInput
                            id="input-surname"
                            type="text"
                            label="Apellido"
                            {...register('surname', {
                                required: true,
                                maxLength: 15,
                            })}
                        />
                        {errors.surname?.type === 'required' && (
                            <FormHelperText>Campo obligatorio</FormHelperText>
                        )}
                        {errors.surname?.type === 'maxLength' && (
                            <FormHelperText>Formato de apellido muy largo</FormHelperText>
                        )}
                    </FormControl>

                    <FormControl
                        variant="outlined"
                        error={errors.username ? true : false}
                    >
                        <InputLabel htmlFor="input-username">
                            Nombre de usuario
                        </InputLabel>
                        <OutlinedInput
                            id="input-username"
                            type="text"
                            label="Nombre de usuario"
                            {...register('username', {
                                required: true,
                                maxLength: 10,
                            })}
                        />
                        {errors.username?.type === 'required' && (
                            <FormHelperText>Campo obligatorio</FormHelperText>
                        )}
                        {errors.username?.type === 'maxLength' && (
                            <FormHelperText>
                                Formato de nombre de usuario muy largo
                            </FormHelperText>
                        )}
                    </FormControl>

                    <FormControl variant="outlined" error={errors.email ? true : false}>
                        <InputLabel htmlFor="input-email">Email</InputLabel>
                        <OutlinedInput
                            id="input-email"
                            type="text"
                            label="Email"
                            {...register('email', {
                                required: true,
                                pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                            })}
                        />
                        {errors.email?.type === 'required' && (
                            <FormHelperText>Campo obligatorio</FormHelperText>
                        )}
                        {errors.email?.type === 'pattern' && (
                            <FormHelperText>Formato de email incorrecto</FormHelperText>
                        )}
                    </FormControl>

                    <FormControl
                        variant="outlined"
                        error={errors.password ? true : false}
                    >
                        <InputLabel htmlFor="input-password">Contraseña</InputLabel>
                        <OutlinedInput
                            id="input-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            {...register('password', { required: true, maxLength: 8 })}
                        />
                        {errors.password?.type === 'required' && (
                            <FormHelperText>Campo obligatorio</FormHelperText>
                        )}
                        {errors.password?.type === 'maxLength' && (
                            <FormHelperText>Contraseña muy larga</FormHelperText>
                        )}
                    </FormControl>
                </StyledFormContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()} sx={{ color: '#F95738' }}>
                    Cancelar
                </Button>
                <Button onClick={handleSubmit(onSubmit)} sx={{ color: '#0D3B66' }}>
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModelCreateUser

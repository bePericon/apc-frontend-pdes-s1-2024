import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'

import DialogTitle from '@mui/material/DialogTitle'
import { User } from '@/types/apc.types'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { StyledFormContainer } from './DialogUser.styled'
import UserService from '../../../../service/user.service'

interface DialogItemListProps {
    open: boolean
    onClose: (needUpdate?: boolean) => void
    user: User | null
}

interface InputsUserEdit {
    name: string
    surname: string
    username: string
    email: string
    password: string
}

const DialogUser = ({ open, onClose, user }: DialogItemListProps) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors /* isDirty, isValid */ },
    } = useForm<InputsUserEdit>()

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const onSubmit: SubmitHandler<InputsUserEdit> = async (data) => {
        const form = Object.fromEntries(Object.entries(data).filter((value) => value[1]))
        await UserService.update(user?._id as string, form)
        onClose(true)
    }

    useEffect(() => {
        if (user) {
            setValue('name', user.name)
            setValue('surname', user.surname)
            setValue('username', user.username)
            setValue('email', user.email)
            setValue('password', '')
        }
    }, [user])

    return (
        <Dialog open={open} onClose={() => onClose()}>
            <DialogTitle>Edición de usuario</DialogTitle>
            <DialogContent>
                <StyledFormContainer>
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
                            {...register('password', { maxLength: 8 })}
                        />
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
                <Button
                    onClick={handleSubmit(onSubmit)}
                    // disabled={!isDirty || !isValid}
                    sx={{ color: '#0D3B66' }}
                >
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogUser

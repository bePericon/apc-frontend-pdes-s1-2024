import {
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    OutlinedInput,
} from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import LoginService from '@/service/login.service'
import { useRouter } from 'next/navigation'
import { StyledLabel, StyledLabelInput, StyledTypography } from './Section.styled'

interface InputsLogin {
    email: string
    password: string
}

const LoginSection = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<InputsLogin>()

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const router = useRouter()

    const onSubmit: SubmitHandler<InputsLogin> = async (data) => {
        const token = await LoginService.signIn(data)

        if (token.length > 0) router.push('/apc')
    }
    return (
        <>
            <StyledTypography>Bienvenido</StyledTypography>

            <StyledLabelInput>
                <StyledLabel>Email</StyledLabel>
                <FormControl variant="outlined" error={errors.email ? true : false}>
                    <OutlinedInput
                        id="input-email"
                        type="text"
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
            </StyledLabelInput>

            <StyledLabelInput>
                <StyledLabel>Contraseña</StyledLabel>
                <FormControl variant="outlined" error={errors.password ? true : false}>
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
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        {...register('password', { required: true, maxLength: 8 })}
                    />
                    {errors.password?.type === 'required' && (
                        <FormHelperText>Campo obligatorio</FormHelperText>
                    )}
                    {errors.password?.type === 'maxLength' && (
                        <FormHelperText>Contraseña muy larga</FormHelperText>
                    )}
                </FormControl>
            </StyledLabelInput>

            <Button
                name={'btn-login'}
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                disabled={!isDirty || !isValid}
                sx={{
                    backgroundColor: '#0077b6',
                    '&:hover': {
                        backgroundColor: '#0D3B66',
                    },
                }}
            >
                Iniciar sesión
            </Button>
        </>
    )
}

export default LoginSection

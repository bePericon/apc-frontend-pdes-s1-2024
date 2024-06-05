'use client'
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

interface InputsSignUp {
    name: string
    email: string
    password: string
}

const SignUpSection = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty, isValid },
    } = useForm<InputsSignUp>()

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const router = useRouter()

    const onSubmit: SubmitHandler<InputsSignUp> = async (data) => {
        const user = await LoginService.signUp(data)

        if (user) {
            reset()
            router.refresh()
        }
    }
    return (
        <>
            <StyledTypography>Sumate a nosotros</StyledTypography>

            <StyledLabelInput>
                <StyledLabel>Nombre</StyledLabel>
                <FormControl variant="outlined" error={errors.email ? true : false}>
                    <OutlinedInput
                        id="input-name"
                        type="text"
                        {...register('name', { required: true, maxLength: 30 })}
                    />
                    {errors.name?.type === 'required' && (
                        <FormHelperText>Campo obligatorio</FormHelperText>
                    )}
                    {errors.name?.type === 'maxLength' && (
                        <FormHelperText>Nombre muy largo</FormHelperText>
                    )}
                </FormControl>
            </StyledLabelInput>

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
                Registrarse
            </Button>
        </>
    )
}

export default SignUpSection

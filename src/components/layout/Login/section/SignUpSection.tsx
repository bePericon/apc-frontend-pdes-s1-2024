"use client";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoginService from "@/service/login.service";
import { useRouter } from "next/navigation";

interface InputsSignUp {
  name: string;
  email: string;
  password: string;
}

const SignUpSection = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<InputsSignUp>();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<InputsSignUp> = async (data) => {
    const user = await LoginService.signUp(data);

    if (user) {
      reset();
      router.refresh();
    }
  };
  return (
    <>
      <Typography variant="h4" component="h2">
        Sumate a nosotros
      </Typography>
      <FormControl variant="outlined" error={errors.email ? true : false}>
        <InputLabel htmlFor="input-email">Nombre</InputLabel>
        <OutlinedInput
          id="input-name"
          type="text"
          label="Nombre"
          {...register("name", { required: true, maxLength: 30 })}
        />
        {errors.name?.type === "required" && (
          <FormHelperText>Campo obligatorio</FormHelperText>
        )}
        {errors.name?.type === "maxLength" && (
          <FormHelperText>Nombre muy largo</FormHelperText>
        )}
      </FormControl>

      <FormControl variant="outlined" error={errors.email ? true : false}>
        <InputLabel htmlFor="input-email">Email</InputLabel>
        <OutlinedInput
          id="input-email"
          type="text"
          label="Email"
          {...register("email", {
            required: true,
            pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          })}
        />
        {errors.email?.type === "required" && (
          <FormHelperText>Campo obligatorio</FormHelperText>
        )}
        {errors.email?.type === "pattern" && (
          <FormHelperText>Formato de email incorrecto</FormHelperText>
        )}
      </FormControl>

      <FormControl variant="outlined" error={errors.password ? true : false}>
        <InputLabel htmlFor="input-password">Contraseña</InputLabel>
        <OutlinedInput
          id="input-password"
          type={showPassword ? "text" : "password"}
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
          label="Password"
          {...register("password", { required: true, maxLength: 8 })}
        />
        {errors.password?.type === "required" && (
          <FormHelperText>Campo obligatorio</FormHelperText>
        )}
        {errors.password?.type === "maxLength" && (
          <FormHelperText>Contraseña muy larga</FormHelperText>
        )}
      </FormControl>

      <Button
        variant="contained"
        onClick={handleSubmit(onSubmit)}
        disabled={!isDirty || !isValid}
        sx={{
          "&:hover": {
            backgroundColor: "#0D3B66",
          },
        }}
      >
        Registrarse
      </Button>
    </>
  );
};

export default SignUpSection;

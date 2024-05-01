"use client";
import { Paper, Tab, Tabs, Typography } from "@mui/material";
import { StyledContainer, StyledForm } from "./Login.styled";
import { useState } from "react";
import LoginSection from "./section/LoginSection";
import SignUpSection from "./section/SignUpSection";

enum TabLogin {
  LOGIN = 0,
  SINGUP = 1,
}

const Login = () => {
  const [currentTab, setCurrentTab] = useState<TabLogin>(TabLogin.LOGIN);

  return (
    <StyledContainer>
      <Typography variant="h3" component="h2">
        Asesor Personal de Compras
      </Typography>
      <Paper elevation={4} sx={{ width: 525, height: 500 }}>
        <Tabs
          value={currentTab}
          onChange={(_: any, value: number) => setCurrentTab(value)}
          centered
        >
          <Tab label="INICIAR SESIÓN" />
          <Tab label="REGISTRARSE" />
        </Tabs>

        <StyledForm>
          {currentTab === TabLogin.LOGIN && <LoginSection />}
          {currentTab === TabLogin.SINGUP && <SignUpSection />}
        </StyledForm>
      </Paper>
    </StyledContainer>
  );
};

export default Login;

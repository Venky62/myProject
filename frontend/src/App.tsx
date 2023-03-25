import { StyledEngineProvider, ThemeProvider } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { TransactionPage } from './components/pages/TransactionPage'
import { RegistrationPage } from './components/pages/RegistrationPage'
import theme from './theme/theme'
import { HomePage } from './components/pages/HomePage'
import { SendMoneyPage } from './components/pages/SendMoneyPage'
import BusinessRegistration from './components/pages/BusinessRegistration'
import LogIn from './components/pages/LogIn'
import SignUp from './components/pages/SignUp'
import { Auth0Provider } from '@auth0/auth0-react'
import { getConfig } from './utils/config'
import ProtectedRoute from './utils/ProtectedRoute'

const onRedirectCallback = () => {}
const config = getConfig()

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  redirectUri: window.location.origin,
  audience: config.audience,
  scope: config.scope,
  onRedirectCallback,
}

function App() {
  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <Auth0Provider {...providerConfig}>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route
                path="/transaction"
                element={
                  <ProtectedRoute>
                    <TransactionPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/send_money"
                element={
                  <ProtectedRoute>
                    <SendMoneyPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/business_registration"
                element={
                  <ProtectedRoute>
                    <BusinessRegistration />
                  </ProtectedRoute>
                }
              />
              <Route path="/registration" element={<RegistrationPage />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<LogIn />} />
            </Routes>
          </ThemeProvider>
        </Auth0Provider>
      </StyledEngineProvider>
    </div>
  )
}

export default App

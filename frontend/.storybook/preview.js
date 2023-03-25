import { ThemeProvider } from '@mui/material'
import { StyledEngineProvider } from '@mui/styled-engine'
import theme from '../src/theme/theme.ts'
import { MemoryRouter } from 'react-router'
import './preview.css'
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={['/']}>
          <Story />
        </MemoryRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  ),
]

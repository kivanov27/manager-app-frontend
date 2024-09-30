import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store.ts'
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            light: '#dbd0d0',
            main: '#dbd0d0',
            dark: '#dbd0d0',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#dbd0d0',
            main: '#dbd0d0',
            dark: '#dbd0d0d0',
            contrastText: '#ffffff',
        },
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Router>
                    <App />
                </Router>
            </ThemeProvider>
        </Provider>
    </StrictMode>,
);

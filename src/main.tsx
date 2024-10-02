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
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-input': {
                        color: '#ffffff', // Text color inside the input
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#cccccc', // Default border color
                        },
                        '&:hover fieldset': {
                            borderColor: '#ffffff', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#ffffff', // Border color when focused
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: '#cccccc', // Label color
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#ffffff', // Label color when focused
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    color: '#ffffff', // Text color inside the select
                },
                icon: {
                    color: '#ffffff', // Dropdown arrow color (white)
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#ffffff', // Label color (white)
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderColor: '#cccccc', // Default border color (light gray)
                },
                root: {
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#e0e0e0', // Border color on hover (lighter gray)
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ffffff', // Border color when focused (white)
                    },
                },
                input: {
                    color: '#ffffff', // Input text color (for Select input text)
                },
            },
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

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import ThemeProvider from "@/Context/ThemeContext.jsx";
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider>
            <BrowserRouter>
                    <App/>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
)



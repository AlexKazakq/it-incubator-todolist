import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {ThemeProvider} from "@mui/material/styles";
import { createTheme } from '@mui/material/styles';
import {teal, yellow} from "@mui/material/colors";
import {CssBaseline} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: teal,
        secondary: yellow,
        mode: "dark"
    }
})

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
    <App />
    </ThemeProvider>
    ,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

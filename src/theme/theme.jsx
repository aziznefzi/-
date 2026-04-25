import { createTheme } from "@mui/material/styles";
import bgDark from "../image/Bg-dark.jpg"
import bgLight from "../image/Bg-light.jpg"
const getTheme = (mode) => 
    createTheme({
        palette: {
            mode,

            ...(mode === "dark" ? {
                background: {
                    default: "#121212",
                    paper: "#1e1e1e",
                    navBg: "#1d0f01ff"
                },
                text: {
                    primary: "#fff",
                    secondary: "#aaa",
                    text1: "#aaa",
                    navColor: "#c3edc9ff",
                    titleColor: "#0d6719"
                },
            } : {
                background: {
                    default: "#f5f5f5",
                    paper: "#fff",
                    navBg: "#ffe3e3"
                },
                text: {
                    primary: "#000",
                    secondary: "#666",
                    text1: "#444",
                    navColor: "#0a4512ff",
                    titleColor: "#0d6719"
                },
            })
        },
        components: {
            
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundImage: 
                    mode === "dark" ? 
                    `url(${bgDark})` : 
                    `url(${bgLight})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    minHeight: "100vh",
                    backgroundAttachment: "fixed",
                },
            },
        },
        },
    });

export default getTheme;
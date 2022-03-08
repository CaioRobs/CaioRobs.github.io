import { ThemeProvider } from "styled-components";
import "../styles/globals.css";
import { GlobalStyle } from "../styles/GlobalStyle";
import { theme } from "../styles/theme";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

import "../styles/globals.css";
import "antd/dist/antd.css";
import Nav from "../components/Nav";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
      <Nav></Nav>
    </div>
  );
}

export default MyApp;

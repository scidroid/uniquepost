import "../styles/global.css";
import Head from "next/head";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>UNIQUEPOST</title>
      </Head>
      <div className="flex items-center justify-center h-screen">
        <div className="w-phonew h-phoneh border rounded-xl shadow-xl">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
};

export default App;

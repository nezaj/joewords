import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <style jsx global>{`
        body {
          background: rgb(255 247 237);
        }
      `}</style>
    </>
  );
}

export default MyApp;

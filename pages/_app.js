import Script from "next/script";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-GD5MXF5JCQ" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-GD5MXF5JCQ');
        `}
      </Script>
      <style jsx global>{`
        body {
          background: rgb(255 247 237);
        }
      `}</style>
    </>
  );
}

export default MyApp;

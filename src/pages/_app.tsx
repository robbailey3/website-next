import '../styles/main.scss';
import type { AppProps } from 'next/app';
import React from 'react';
import Header from '@/components/global/header/header';
import Footer from '@/components/global/footer/footer';
import Script from 'next/script';
import KeyboardShortcut from '@/components/global/keyboard-shortcut/keyboard-shortcut';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        id="google-tag-manager"
        dangerouslySetInnerHTML={{
          __html: `
							(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M8FTHPW');`,
        }}
      ></Script>
      <Header />
      <main id="main-content">
        <Component {...pageProps} />
      </main>
      <KeyboardShortcut />
      <Footer />
    </>
  );
}
export default MyApp;

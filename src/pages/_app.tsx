import 'reflect-metadata';
import type { AppProps } from 'next/app';
import React from 'react';
import Script from 'next/script';
import Header from '@/components/global/Header/Header';

import '@/styles/main.scss';
import PageLoader from '@/components/common/Loaders/PageLoader/PageLoader';

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
      <PageLoader />
      <Header />
      <main id="main-content" className="mt-24 inline-block w-full">
        <Component {...pageProps} />
      </main>
    </>
  );
}
export default MyApp;

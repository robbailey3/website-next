import Head from 'next/head';
import React from 'react';

type PageMetaProps = {
  title: string;
  description: string;
  pageType?: 'website' | 'article';
  url?: string;
  image?: string;
};

const PageMeta = (props: PageMetaProps) => {
  let { title, description, image, url, pageType = 'website' } = props;

  if (typeof window !== 'undefined' && !url) {
    url = window.location.href;
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={pageType} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={url} />
      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta name="twitter:image" content={image} />
        </>
      )}
    </Head>
  );
};

export default PageMeta;

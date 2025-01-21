// import node module libraries
import Head from "next/head";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import SSRProvider from "react-bootstrap/SSRProvider";
import { Analytics } from "@vercel/analytics/react";

// import theme style scss file
import "styles/theme.scss";
import "styles/global.css";

// import default layouts
import DefaultDashboardLayout from "layouts/DefaultDashboardLayout";
import { useState } from "react";
import store from "utils/redux/store";
import { Provider } from "react-redux";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pageURL = process.env.baseURL + router.pathname;
  const title = "Galaxy-Cargo";

  const Layout = DefaultDashboardLayout;

  return (
    <SSRProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <title>Galaxy Cargo</title>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        <link
          href="https://fonts.googleapis.com/css?family=Rubik:300,400,700|Oswald:400,700"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/fonts/icomoon/style.css" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/jquery.fancybox.min.css" />
        <link rel="stylesheet" href="/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="/css/owl.theme.default.min.css" />
        <link rel="stylesheet" href="/fonts/flaticon/font/flaticon.css" />
        <link rel="stylesheet" href="/css/aos.css" />
        <link rel="stylesheet" href="/css/style.css"></link>
      </Head>
      <NextSeo
        title={title}
        canonical={pageURL}
        openGraph={{
          url: pageURL,
          title: title,
          site_name: process.env.siteName,
        }}
      />
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </Provider>
    </SSRProvider>
  );
}

export default MyApp;

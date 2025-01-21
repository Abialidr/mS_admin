import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script src="/js/jquery-3.3.1.min.js"></script>
        <script src="/js/popper.min.js"></script>
        <script src="/js/bootstrap.min.js"></script>
        <script src="/js/owl.carousel.min.js"></script>
        <script src="/js/jquery.sticky.js"></script>
        <script src="/js/jquery.waypoints.min.js"></script>
        <script src="/js/jquery.animateNumber.min.js"></script>
        <script src="/js/jquery.fancybox.min.js"></script>
        <script src="/js/jquery.easing.1.3.js"></script>
        <script src="/js/aos.js"></script>
        <script src="/js/main.js"></script>
      </Head>
      <body className="bg-light">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

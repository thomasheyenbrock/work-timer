import Head from "next/head";

const Layout: React.FC<{}> = props => (
  <div>
    <Head>
      <title>WorkTimer</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {props.children}
    <style jsx global>{`
      body {
        font-family: Inter;
      }
      @font-face {
        font-family: "Inter";
        font-style: normal;
        font-weight: 100;
        font-display: swap;
        src: url("/inter/Inter-Thin-BETA.woff2?v=3.11") format("woff2"),
          url("/inter/Inter-Thin-BETA.woff?v=3.11") format("woff");
      }
      @font-face {
        font-family: "Inter";
        font-style: italic;
        font-weight: 100;
        font-display: swap;
        src: url("/inter/Inter-ThinItalic-BETA.woff2?v=3.11") format("woff2"),
          url("/inter/Inter-ThinItalic-BETA.woff?v=3.11") format("woff");
      }

      @font-face {
        font-family: "Inter";
        font-style: normal;
        font-weight: 200;
        font-display: swap;
        src: url("/inter/Inter-ExtraLight-BETA.woff2?v=3.11") format("woff2"),
          url("/inter/Inter-ExtraLight-BETA.woff?v=3.11") format("woff");
      }
      @font-face {
        font-family: "Inter";
        font-style: italic;
        font-weight: 200;
        font-display: swap;
        src: url("/inter/Inter-ExtraLightItalic-BETA.woff2?v=3.11")
            format("woff2"),
          url("/inter/Inter-ExtraLightItalic-BETA.woff?v=3.11") format("woff");
      }

      @font-face {
        font-family: "Inter";
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: url("/inter/Inter-Light-BETA.woff2?v=3.11") format("woff2"),
          url("/inter/Inter-Light-BETA.woff?v=3.11") format("woff");
      }
      @font-face {
        font-family: "Inter";
        font-style: italic;
        font-weight: 300;
        font-display: swap;
        src: url("/inter/Inter-LightItalic-BETA.woff2?v=3.11") format("woff2"),
          url("/inter/Inter-LightItalic-BETA.woff?v=3.11") format("woff");
      }

      @font-face {
        font-family: "Inter";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("/inter/Inter-Regular.woff2?v=3.11") format("woff2"),
          url("/inter/Inter-Regular.woff?v=3.11") format("woff");
      }
      @font-face {
        font-family: "Inter";
        font-style: italic;
        font-weight: 400;
        font-display: swap;
        src: url("/inter/Inter-Italic.woff2?v=3.11") format("woff2"),
          url("/inter/Inter-Italic.woff?v=3.11") format("woff");
      }

      @font-face {
        font-family: "Inter";
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url("/inter/Inter-Medium.woff2?v=3.11") format("woff2"),
          url("/inter/Inter-Medium.woff?v=3.11") format("woff");
      }
      @font-face {
        font-family: "Inter";
        font-style: italic;
        font-weight: 500;
        font-display: swap;
        src: url("/inter/Inter-MediumItalic.woff2?v=3.11") format("woff2"),
          url("/inter/Inter-MediumItalic.woff?v=3.11") format("woff");
      }

      @font-face {
        font-family: "Inter";
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url("/inter/Inter-SemiBold.woff2?v=3.11") format("woff2"),
          url("/inter/Inter-SemiBold.woff?v=3.11") format("woff");
      }
      @font-face {
        font-family: "Inter";
        font-style: italic;
        font-weight: 600;
        font-display: swap;
        src: url("/inter/Inter-SemiBoldItalic.woff2?v=3.11") format("woff2"),
          url("/inter/Inter-SemiBoldItalic.woff?v=3.11") format("woff");
      }

      @font-face {
        font-family: "Inter";
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url("/inter/Inter-Bold.woff2?v=3.11") format("woff2"),
          url("/inter/Inter-Bold.woff?v=3.11") format("woff");
      }
      @font-face {
        font-family: "Inter";
        font-style: italic;
        font-weight: 700;
        font-display: swap;
        src: url("/inter/Inter-BoldItalic.woff2?v=3.11") format("woff2"),
          url("/inter/Inter-BoldItalic.woff?v=3.11") format("woff");
      }

      @font-face {
        font-family: "Inter";
        font-style: normal;
        font-weight: 800;
        font-display: swap;
        src: url("/inter/Inter-ExtraBold.woff2?v=3.11") format("woff2"),
          url("/inter/Inter-ExtraBold.woff?v=3.11") format("woff");
      }
      @font-face {
        font-family: "Inter";
        font-style: italic;
        font-weight: 800;
        font-display: swap;
        src: url("/inter/Inter-ExtraBoldItalic.woff2?v=3.11") format("woff2"),
          url("/inter/Inter-ExtraBoldItalic.woff?v=3.11") format("woff");
      }

      @font-face {
        font-family: "Inter";
        font-style: normal;
        font-weight: 900;
        font-display: swap;
        src: url("/inter/Inter-Black.woff2?v=3.11") format("woff2"),
          url("/inter/Inter-Black.woff?v=3.11") format("woff");
      }
      @font-face {
        font-family: "Inter";
        font-style: italic;
        font-weight: 900;
        font-display: swap;
        src: url("/inter/Inter-BlackItalic.woff2?v=3.11") format("woff2"),
          url("/inter/Inter-BlackItalic.woff?v=3.11") format("woff");
      }
    `}</style>
  </div>
);

export default Layout;

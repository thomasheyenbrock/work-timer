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
        background-color: hsl(252, 23%, 11%);
        color: white;
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

      /* CSS Reset */
      /* Box sizing rules */
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      } /* Remove default padding */
      ul[class],
      ol[class] {
        padding: 0;
      } /* Remove default margin */
      body,
      h1,
      h2,
      h3,
      h4,
      p,
      ul[class],
      ol[class],
      li,
      figure,
      figcaption,
      blockquote,
      dl,
      dd {
        margin: 0;
      } /* Set core body defaults */
      body {
        min-height: 100vh;
        scroll-behavior: smooth;
        text-rendering: optimizeSpeed;
        line-height: 1.5;
      } /* Remove list styles on ul, ol elements with a class attribute */
      ul[class],
      ol[class] {
        list-style: none;
      } /* A elements that don't have a class get default styles */
      a:not([class]) {
        text-decoration-skip-ink: auto;
      } /* Make images easier to work with */
      img {
        max-width: 100%;
        display: block;
      } /* Natural flow and rhythm in articles by default */
      article > * + * {
        margin-top: 1em;
      } /* Inherit fonts for inputs and buttons */
      input,
      button,
      textarea,
      select {
        font: inherit;
      } /* Remove all animations and transitions for people that prefer not to see them */
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
    `}</style>
  </div>
);

export default Layout;

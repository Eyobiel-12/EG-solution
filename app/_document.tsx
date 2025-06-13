import { Html, Head, Main, NextScript } from "next/document"
import SplashScreen from "@/components/splash-screen"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#d4af37" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />

        {/* iOS splash screens */}
        {/* iPhone X (1125px x 2436px) */}
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
          href="/splash/apple-splash-1125-2436.png"
        />
        {/* iPhone 8, 7, 6s, 6 (750px x 1334px) */}
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
          href="/splash/apple-splash-750-1334.png"
        />
        {/* iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus (1242px x 2208px) */}
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)"
          href="/splash/apple-splash-1242-2208.png"
        />
        {/* iPhone 5 (640px x 1136px) */}
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
          href="/splash/apple-splash-640-1136.png"
        />
        {/* iPad Pro 12.9" (2048px x 2732px) */}
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
          href="/splash/apple-splash-2048-2732.png"
        />
        {/* iPad Pro 11" (1668px x 2388px) */}
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
          href="/splash/apple-splash-1668-2388.png"
        />
        {/* iPad Pro 10.5" (1668px x 2224px) */}
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
          href="/splash/apple-splash-1668-2224.png"
        />
        {/* iPad Mini, Air (1536px x 2048px) */}
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
          href="/splash/apple-splash-1536-2048.png"
        />
      </Head>
      <body>
        <SplashScreen />
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    },
                    function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </Html>
  )
}

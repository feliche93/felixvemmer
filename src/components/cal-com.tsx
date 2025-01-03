'use client'

import { useTheme } from 'next-themes'
import Script from 'next/script'
import { useEffect } from 'react'

export function CalCom() {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.Cal) {
      // @ts-ignore
      window.Cal.ns['30-minute-google-hangout-chat']('ui', {
        styles: { branding: { brandColor: '#111827' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
        theme: resolvedTheme === 'dark' ? 'dark' : 'light',
      })
    }
  }, [resolvedTheme])

  return (
    <>
      <div
        id="my-cal-inline"
        className="my-8"
        style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      />
      <Script id="cal-com-script" strategy="afterInteractive">
        {`
          (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
          Cal("init", "30-minute-google-hangout-chat", {origin:"https://cal.com"});

          Cal.ns["30-minute-google-hangout-chat"]("inline", {
            elementOrSelector:"#my-cal-inline",
            calLink: "felix-vemmer/30-minute-google-hangout-chat",
            layout: "month_view"
          });

          Cal.ns["30-minute-google-hangout-chat"]("ui", {"styles":{"branding":{"brandColor":"#000000"}},"hideEventTypeDetails":false,"layout":"month_view"});
        `}
      </Script>
    </>
  )
}

import '../globals.css'
import { Inter } from 'next/font/google'
import Header from '../components/header'
import Footer from '../components/footer'
import { Provider } from '../context/providers'
import { Suspense } from 'react'
import Loading from '../components/loading'
import Cart from '../components/cart'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'T-REX Thailand | Handcrafted Organic Products for Cannabis',
    template: '%s | T-REX Thailand'
  },
  description: 'Finest quality, environmental friendly handcrafted products for natural farming and no-till with organic living soil..',
  generator: 'Next.js',
  applicationName: 'T-REX Thailand',
  referrer: 'origin-when-cross-origin',
  keywords: ['trex420', 't-rex-thailand', 'cannabis', 'horticultural', 'growshop', 'garden', 'ganjana', 'living soil'],
  creator: 'wh@rny3n',
  publisher: 'wh@rny3n',
  openGraph: {
    title: 'Finest quality, environmental friendly handcrafted products for natural farming and no-till with organic living soil..',
    description: 'The React Framework for the Web',
    images: 'https://www.datocms-assets.com/103688/1693746687-og-image-metadata.jpg',
    siteName: 'T-REX Thailand',
    url: 'https://www.trexthailand.org',
    locale: ['en-US', 'th-TH'],
    type: 'website',
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'th-TH': '/th-TH',
    },
  },
  icons: {
    icon: '../icon.png',
    shortcut: '../icon.png',
    apple: '../apple-icon.png'
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'T-REX420 | Handcrafted Organic Products for Cannabis',
    description: 'Finest quality, environmental friendly handcrafted products for natural farming and no-till with organic living soil..',
    siteId: 'prj_Ad3IqqxVenn5f6V4NUmbWkaKtGSz',
    creator: 'wh@rny3n',
    creatorId: 'prj_Ad3IqqxVenn5f6V4NUmbWkaKtGSz',
    images: ['https://www.datocms-assets.com/103688/1693744871-twitter-card-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
    },
    verification: {
      google: 'google',
      yandex: 'yandex',
      yahoo: 'yahoo',
    },
  },
}

export async function generateStaticParams() {
  return [{ lang: 'en-US' }, { lang: 'th-TH' }]
}

export default function RootLayout({ children, params }) {
  const { lang } = params;

  return (
    <html lang={lang}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Provider>
          <Header props={lang}/>
          <Cart props={lang}/>
          <Suspense fallback={<Loading />}>
            <main className='min-h-[100vh] overflow-hidden'>{children}</main>
          </Suspense>
          <Footer props={lang}/>
        </Provider>
      </body>
    </html>
  )
}

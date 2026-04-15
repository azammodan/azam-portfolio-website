import dynamic from 'next/dynamic'

// Desktop uses browser APIs — load client-side only
const Desktop = dynamic(() => import('./desktop'), { ssr: false })

export default function Page() {
  return <Desktop />
}

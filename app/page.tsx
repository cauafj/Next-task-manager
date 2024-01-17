import Image from 'next/image'
import Link from 'next/link'
import { Pacifico } from 'next/font/google'

const pacifico = Pacifico({subsets: ['latin'], weight: ["400"]})

export default function Home() {
  return (
    <main className="flex h-full flex-col justify-center">
      <p className={`${pacifico.className} sm:text-8xl w-full text-center text-6xl w-96 animate-bounce text-blue font-extrabold`}>Welcome!!</p>
    </main>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path
    }
    return pathname.startsWith(path)
  }

  return (
    <header className="w-full bg-white mb-8">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/aybu-logo.png"
                alt="Aybu Logo"
                width={122}
                height={32}
              />
            </Link>
          </div>

          <nav className="flex space-x-8">
            <Link
              href="/"
              className={`${isActive('/')
                ? 'text-blue-600 font-bold'
                : 'text-gray-700 hover:text-gray-900 hover:font-bold'
                }`}
            >
              Home
            </Link>
            <Link
              href="/research"
              className={`${isActive('/research')
                ? 'text-blue-600 font-bold'
                : 'text-gray-700 hover:text-gray-900 hover:font-bold'
                }`}
            >
              Research
            </Link>
          </nav>
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-300" />
    </header>
  )
} 

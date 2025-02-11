import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full bg-white mb-8">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/aybu-logo.png"
                alt="Aybu Logo"
                width={120}
                height={60}
                className="mr-3"
              />
            </Link>
          </div>

          <nav className="flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link href="/research" className="text-gray-700 hover:text-gray-900">
              Research
            </Link>
            <Link href="/resources" className="text-gray-700 hover:text-gray-900">
              Resources
            </Link>
          </nav>
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-300" />
    </header>
  )
} 
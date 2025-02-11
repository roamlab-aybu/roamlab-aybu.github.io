import Image from 'next/image'
import Link from 'next/link'
import type { Person } from '@/lib/markdown'

export default function PersonCard({ name, bio, image, websiteUrl }: Person) {
  const NameComponent = websiteUrl ? (
    <Link href={websiteUrl} className="text-blue-600 hover:underline">
      {name}
    </Link>
  ) : (
    <span>{name}</span>
  )

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 mb-3">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover rounded-full"
        />
      </div>
      <h3 className="font-semibold text-lg">{NameComponent}</h3>
      <p className="text-gray-600">{bio}</p>
    </div>
  )
} 
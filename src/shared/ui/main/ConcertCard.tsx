import Link from 'next/link'

interface ConcertCardProps {
  id: string
  title: string
  artist: string
  image?: string
  badge?: string
  badgeColor?: 'blue' | 'red' | 'default'
}

export default function ConcertCard({
  id,
  title,
  artist,
  image,
  badge,
  badgeColor = 'default',
}: ConcertCardProps) {
  const badgeClasses = {
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    default: 'bg-gray-300',
  }

  return (
    <Link href={`/concert/${id}`}>
      <div className="cursor-pointer rounded-lg overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition">
        <div className="w-full h-48 bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-gray-500 relative">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm">[이미지 영역]</span>
          )}
          {badge && (
            <div className={`absolute top-3 right-3 ${badgeClasses[badgeColor]} text-white text-xs font-bold px-3 py-1 rounded`}>
              {badge}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-1">{title}</h3>
          <p className="text-gray-600 text-xs">{artist}</p>
        </div>
      </div>
    </Link>
  )
}

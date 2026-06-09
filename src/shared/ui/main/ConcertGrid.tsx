import ConcertCard from './ConcertCard'

interface Concert {
  id: string
  title: string
  artist: string
  badge?: string
  badgeColor?: 'blue' | 'red' | 'default'
}

interface ConcertGridProps {
  title: string
  subtitle?: string
  concerts: Concert[]
}

export default function ConcertGrid({
  title,
  subtitle,
  concerts,
}: ConcertGridProps) {
  return (
    <section className="w-full py-12 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-5 gap-6">
          {concerts.map((concert) => (
            <ConcertCard
              key={concert.id}
              {...concert}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

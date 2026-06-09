export default function SeatGradeSection() {
  const seats = [
    { label: 'VIP', color: 'bg-yellow-400', description: 'VIP 석' },
    { label: 'R석', color: 'bg-purple-500', description: 'R석' },
    { label: 'S석', color: 'bg-blue-500', description: 'S석' },
    { label: 'A석', color: 'bg-green-500', description: 'A석' },
  ]

  return (
    <section className="w-full bg-white py-8 px-6 border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-8 overflow-x-auto">
          {seats.map((seat) => (
            <div key={seat.label} className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg ${seat.color}`} />
              <span className="text-sm font-semibold text-gray-700">{seat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

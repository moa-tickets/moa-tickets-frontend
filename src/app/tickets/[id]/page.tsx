import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ticket Detail',
}

interface TicketDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function TicketDetailPage({
  params,
}: TicketDetailPageProps) {
  const { id } = await params

  return (
    <main>
      <h1>Ticket #{id}</h1>
    </main>
  )
}

import { SearchPage } from '@/modules/search/components'
import { searchRetreats } from '@/modules/search/actions'
import Navbar from '@/modules/search/components/Navbar'

export default async ({ searchParams }) => {
  const params = await searchParams

  const { data } = await searchRetreats({ params })

  return (
    <>
    <Navbar />
    <SearchPage {...data} />
    </>
  )
}

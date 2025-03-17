

import { SearchPage } from '@/modules/search/components'
import { searchRetreats } from '@/modules/search/actions'
import Navbar from '@/modules/search/components/Navbar'
import WishList from '@/modules/search/components/WishList';
import Footer from '@/modules/search/components/Footer';

export default async ({ searchParams }) => {
  const params = await searchParams

  const { data } = await searchRetreats({ params })

  return (
    <>
      <Navbar />
      <SearchPage {...data} />
      <WishList />
      <Footer />
    </>
  )
}

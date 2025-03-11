const SearchPage = ({ searchResults, searchState }) => {
  console.log('SearchPage Props', searchResults, searchState)

  return (
    <div className='max-w-5xl mx-auto px-4'>
      <h1 className="text-2xl font-semibold my-4">Retreats</h1>
      {/* {/* Create a UL to display the searchResults. Map over searchResults.
      hits to create li for each result. 
      if its empty, display a h2 no results found.  */}
      {searchResults?.hits?.length > 0 ? (
        <ul className="p20">
          {searchResults.hits.map((retreat) => (
            <li key={retreat.id} className="p2">
              <h2 className="font-bold underline">{retreat.name}</h2>
            </li>
          ))}
        </ul>
      ) :
      (
        <p>No results found.</p>
      )}
    </div>
  )
}

export default SearchPage

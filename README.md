# BookRetreats Take Home Coding Task

Your task is to build a UI for searching retreats. We’ve provided a base that does the searching - your task is to implement the UI for filtering and showing results. The focus is primarily on making the UI functional; the look-and-feel is secondary.

## Instructions
* Download the repo
* Add a .env file with the API_URL
* Start the app with `npm run dev` and open at http://localhost:3000/search
* Inspect the data in the DevTools console to get a feel of what you will work with, especially the `searchState` (also try with some of the sample URLs below)
* Focus on the core tasks; if you have time, look into the bonuses. We’re not even sure that the bonuses can be completed in the allocated time, so don’t sweat it if you aren’t able to finish it all.

## Rules
* Don’t add any external libraries
* We use ChatGPT and generally are big fans of AI for building things quicker and better, but please skip it for generating code in this exercise (but feel free to ask it general questions)

## Core Tasks
1. Make list of results, showing the result name
2. Add filters for categories and locations
   - [ ] Initially, show the selected value in `searchState.scopes.[category|location]`
   - [ ] When the user types into the category/location field, automatically call the API and show the results in a dropdown
   - [ ] When the user clicks a category/location, update the `searchState.scopes.[category|location]` and use it to navigate to the new URL
3. Add filter for search by keyword
   - [ ] Initially, show the selected `searchQuery.searchQuery`
   - [ ] When the user types into the search field, update the `searchState.searchQuery` and use it to navigate to the new URL

## Bonus
1. Add extra details to the retreat listings
2. Style the page for desktop
3. Make the location lookup work for level 2 or 3 locations
4. Responsive layout
5. Debounce searches
6. Implement pagination

## Deliverables
- [ ] Code branch with regular commits
- [ ] Loom - explain the code, design decisions, trade-offs, parts that weren’t completed
- [ ] Write up anything else that you feel is good to communicate - either technical or how you felt about it

**About the repo**
* The basic search page is implemented at `/search`; this performs a search and returns the results. The results consist of:
  * `searchState` - a JSON object containing information about the filters applied; you are primarily interested in the `scopes` and `searchQuery` fields
  * `searchResults` - a JSON object containing the search results; you are primarily interested in what is in the `hits` array. This is not of interest to you until you get to the bonus tasks.
* When the search filters are updated, the results will be shown simply by navigating to `/search?${stringifyQuery(searchState)}`
  * `stringifyQuery` is implemented in `modules/shared/utils/jsUtils`; you don’t need to know much about this, except that it takes the searchState and makes it into a format that can be used in the URL
* There are API functions already included for the autocomplete:
  * Searching categories - accessed by calling `get` to `/api/categories?query=yoga`. The /api/categories response returns `{ id: 1, name: ‘Category’ }`
  * Searching locations -  The /api/locations response returns `{id: 1, name: 'Bali', label: 'Bali, Indonesia' }`. Note that using the name will work for countries and continents, but label is needed to make it work for level 2 or 3 locations (bonus task).
* API functions can be called with `get('/api/categories?query=yoga')` - `get()` is already implemented in `modules/shared/utils/network.js`


**Sample URLs**
You can use the sample URLs as a guide. You’ll ‘notice that the filtering already works - your task is to implement the UI for them.
* Basic - http://localhost:3000/search
* With category - http://localhost:3000/search?scopes%5Bcategory%5D=Beach+Retreats
* With location - https://localhost:3000/search?scopes%5Blocation%5D=Sri+Lanka
* With keywords - http://localhost:3000/search?searchQuery=meditation
* With location, category and keywords - http://localhost:3000/search?scopes%5Bcategory%5D=Beach+Retreats&scopes%5Blocation%5D=Sri+Lanka&searchQuery=breathwork
* With level 2 location (bonus) - http://localhost:3000/search?scopes%5Bcategory%5D=Beach+Retreats&scopes%5Blocation%5D=Bali%2C+Indonesia

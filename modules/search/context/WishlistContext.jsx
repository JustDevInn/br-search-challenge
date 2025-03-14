'use client'

import { createContext, useState, useContext, useEffect } from "react";

const WishlistContext = createContext()

export const useWishlistContext = () => useContext(WishlistContext)

export const WishlistProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")
        if (storedFavs) setFavorites(JSON.parse(storedFavs))
    }, [])

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])

    // Add, remove, and check if it's already in the wishlist
    const addToFavorites = (retreat) => {
        setFavorites((prev) => [...prev, retreat])
    }

    const removeFromFavorites = (retreatId) => {
        setFavorites((prev) => prev.filter((retreat) => retreat.id !== retreatId))
    }

    const isFavorite = (retreatId) => {
        return favorites.some((retreat) => retreat.id === retreatId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

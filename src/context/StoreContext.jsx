import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const StoreContext = createContext(null)
const readStoredItems = (key) => {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]')
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => readStoredItems('unio-cart'))
  const [wishlist, setWishlist] = useState(() => readStoredItems('unio-wishlist'))

  useEffect(() => localStorage.setItem('unio-cart', JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('unio-wishlist', JSON.stringify(wishlist)), [wishlist])

  const addToCart = (product, options = {}) => {
    const key = `${product.id}-${options.size || 'one'}-${options.color || product.colors?.[0] || 'default'}`
    setCart((items) => {
      const existing = items.find((item) => item.key === key)
      if (existing) return items.map((item) => item.key === key ? { ...item, quantity: item.quantity + (options.quantity || 1) } : item)
      return [...items, { key, product, size: options.size || product.sizes?.[0], color: options.color || product.colors?.[0], quantity: options.quantity || 1 }]
    })
  }

  const updateQuantity = (key, quantity) => setCart((items) => quantity < 1 ? items.filter((item) => item.key !== key) : items.map((item) => item.key === key ? { ...item, quantity } : item))
  const removeFromCart = (key) => setCart((items) => items.filter((item) => item.key !== key))
  const toggleWishlist = (product) => setWishlist((items) => items.some((item) => item.id === product.id) ? items.filter((item) => item.id !== product.id) : [...items, product])
  const isWishlisted = (id) => wishlist.some((item) => item.id === id)

  const value = useMemo(() => ({ cart, wishlist, addToCart, updateQuantity, removeFromCart, toggleWishlist, isWishlisted }), [cart, wishlist])
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  return useContext(StoreContext)
}

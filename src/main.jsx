import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import { ProductProvider } from './context/ProductContext.jsx'
import { RequestsProvider } from './context/RequestsContext.jsx'
import { SettingsProvider } from './context/SettingsContext.jsx'
import { OrdersProvider } from './context/OrdersContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <AuthProvider>
          <SettingsProvider>
            <ProductProvider>
              <RequestsProvider>
                <CartProvider>
                  <FavoritesProvider>
                    <OrdersProvider>
                      <ThemeProvider>
                        <App />
                      </ThemeProvider>
                    </OrdersProvider>
                    <Toaster position="top-center" richColors />
                  </FavoritesProvider>
                </CartProvider>
              </RequestsProvider>
            </ProductProvider>
          </SettingsProvider>
        </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

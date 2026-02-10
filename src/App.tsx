import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import Home from '@/pages/Home'
import Catalogue from '@/pages/Catalogue'
import ProductDetail from '@/pages/ProductDetail'
import Cart from '@/pages/Cart'
import Checkout from '@/pages/Checkout'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import FAQ from '@/pages/FAQ'
import Account from '@/pages/Account'
import Orders from '@/pages/Orders'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import NotFound from '@/pages/NotFound'

const PageWrapper = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.35 }}
  >
    {children}
  </motion.div>
)

export default function App() {
  const location = useLocation()

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="/catalogue"
            element={
              <PageWrapper>
                <Catalogue />
              </PageWrapper>
            }
          />
          <Route
            path="/produit/:slug"
            element={
              <PageWrapper>
                <ProductDetail />
              </PageWrapper>
            }
          />
          <Route
            path="/panier"
            element={
              <PageWrapper>
                <Cart />
              </PageWrapper>
            }
          />
          <Route
            path="/checkout"
            element={
              <PageWrapper>
                <Checkout />
              </PageWrapper>
            }
          />
          <Route
            path="/a-propos"
            element={
              <PageWrapper>
                <About />
              </PageWrapper>
            }
          />
          <Route
            path="/contact"
            element={
              <PageWrapper>
                <Contact />
              </PageWrapper>
            }
          />
          <Route
            path="/faq"
            element={
              <PageWrapper>
                <FAQ />
              </PageWrapper>
            }
          />
          <Route
            path="/compte"
            element={
              <PageWrapper>
                <Account />
              </PageWrapper>
            }
          />
          <Route
            path="/commandes"
            element={
              <PageWrapper>
                <Orders />
              </PageWrapper>
            }
          />
          <Route
            path="/connexion"
            element={
              <PageWrapper>
                <Login />
              </PageWrapper>
            }
          />
          <Route
            path="/inscription"
            element={
              <PageWrapper>
                <Register />
              </PageWrapper>
            }
          />
          <Route
            path="*"
            element={
              <PageWrapper>
                <NotFound />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}

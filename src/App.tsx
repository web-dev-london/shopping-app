import { Container } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Store from './pages/Store'
import Navbar from './components/Navbar'
import ShoppingCartProvider from './context/ShoppingCartContext'


function App() {
    return (
        <>
            <ShoppingCartProvider>
                <Navbar />
                <Container
                    maxW={'8xl'}
                    py={5}
                >
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/store' element={<Store />} />
                        <Route path='/about' element={<About />} />
                    </Routes>
                </Container>
            </ShoppingCartProvider>
        </>
    )
}

export default App

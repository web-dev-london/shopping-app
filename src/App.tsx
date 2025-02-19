import { Container } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import DetailsView from './components/DetailsView'
import Navbar from './components/Navbar'
import About from './pages/About'
import Home from './pages/Home'
import Store from './pages/Store'
import ShoppingCartProvider from './context/ShoppingCartProvider'

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
                        <Route path='/details/:detailsId' element={<DetailsView />} />
                    </Routes>
                </Container>
            </ShoppingCartProvider>
        </>
    )
}

export default App

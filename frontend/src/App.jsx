import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavigationBar from './components/Navbar'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import ProductDetail from './components/ProductDetail'

function App() {
  return (
    <Router>
      <div className="min-vh-100 bg-light">
        <NavigationBar />
        <Container fluid className="py-4">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<ProductForm />} />
            <Route path="/edit/:id" element={<ProductForm />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;

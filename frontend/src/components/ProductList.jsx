import { useState, useEffect } from 'react'
import { 
  Card, 
  Button, 
  Row, 
  Col, 
  Spinner, 
  Alert, 
  Modal,
  Container
} from 'react-bootstrap'
import { Link as RouterLink } from 'react-router-dom'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '', variant: 'success' })

  const API_BASE_URL = 'http://localhost:6001/api'

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/products`)
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError(err.message)
      showToast('Failed to load products', 'danger')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${deleteId}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete product')
      }

      setProducts(products.filter(product => product._id !== deleteId))
      showToast('Product deleted successfully', 'success')
      setShowDeleteModal(false)
    } catch (err) {
      showToast('Failed to delete product', 'danger')
    }
  }

  const confirmDelete = (id) => {
    setDeleteId(id)
    setShowDeleteModal(true)
  }

  const showToast = (message, variant) => {
    setToast({ show: true, message, variant })
    setTimeout(() => setToast({ show: false, message: '', variant: 'success' }), 3000)
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="danger">
        {error}
      </Alert>
    )
  }

  return (
    <Container>
      {toast.show && (
        <Alert variant={toast.variant} dismissible onClose={() => setToast({ show: false, message: '', variant: 'success' })}>
          {toast.message}
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Products</h2>
        <Button as={RouterLink} to="/add" variant="primary">
          Add New Product
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted fs-5">
            No products found. Add your first product!
          </p>
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
          {products.map((product) => (
            <Col key={product._id}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'
                  }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text className="text-primary fw-bold fs-5 mb-2">
                    ${product.price}
                  </Card.Text>
                  {product.description && (
                    <Card.Text className="text-muted">
                      {product.description.length > 100 
                        ? `${product.description.substring(0, 100)}...` 
                        : product.description}
                    </Card.Text>
                  )}
                  <div className="mt-auto">
                    <div className="d-grid gap-2">
                      <div className="row g-2">
                        <div className="col">
                          <Button
                            as={RouterLink}
                            to={`/product/${product._id}`}
                            variant="outline-primary"
                            size="sm"
                          >
                            View
                          </Button>
                        </div>
                        <div className="col">
                          <Button
                            as={RouterLink}
                            to={`/edit/${product._id}`}
                            variant="outline-success"
                            size="sm"
                          >
                            Edit
                          </Button>
                        </div>
                        <div className="col">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => confirmDelete(product._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this product? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default ProductList 
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Card,
  Button,
  Spinner,
  Alert,
  Modal,
  Container,
  Badge,
  Row
} from 'react-bootstrap'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '', variant: 'success' })

  const API_BASE_URL = 'http://localhost:6001/api'

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/products/${id}`)
      if (!response.ok) {
        throw new Error('Product not found')
      }
      const data = await response.json()
      setProduct(data)
    } catch (err) {
      setError(err.message)
      showToast('Failed to load product', 'danger')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete product')
      }

      showToast('Product deleted successfully', 'success')
      navigate('/')
    } catch (err) {
      showToast('Failed to delete product', 'danger')
    }
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

  if (!product) {
    return (
      <Alert variant="warning">
        Product not found
      </Alert>
    )
  }

  return (
    <Container fluid className="py-4">
      {toast.show && (
        <Alert variant={toast.variant} dismissible onClose={() => setToast({ show: false, message: '', variant: 'success' })}>
          {toast.message}
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Product Details</h2>
        <div className="d-flex gap-2">
          <Button
            variant="outline-secondary"
            onClick={() => navigate('/')}
          >
            Back to Products
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate(`/edit/${id}`)}
          >
            Edit Product
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete Product
          </Button>
        </div>
      </div>

      <Card className="shadow">
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          style={{ height: '400px', objectFit: 'cover' }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x400?text=No+Image'
          }}
        />
        
        <Card.Body>
          <div className="mb-3">
            <h1 className="mb-2">{product.name}</h1>
            <Badge bg="success" className="fs-5 px-3 py-2">
              ${product.price}
            </Badge>
          </div>

          {product.description && (
            <div className="mb-4">
              <h4>Description</h4>
              <p className="text-muted fs-5">
                {product.description}
              </p>
            </div>
          )}

          <div>
            <h4>Product Information</h4>
            <div className="row">
              <div className="col-md-6">
                <p><strong>Product ID:</strong> {product._id}</p>
                <p><strong>Created:</strong> {new Date(product.createdAt).toLocaleDateString()}</p>
                {product.updatedAt && product.updatedAt !== product.createdAt && (
                  <p><strong>Last Updated:</strong> {new Date(product.updatedAt).toLocaleDateString()}</p>
                )}
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete "{product.name}"? This action cannot be undone.
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

export default ProductDetail 
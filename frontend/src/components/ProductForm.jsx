import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Form,
  Button,
  Card,
  Spinner,
  Alert,
  Container
} from 'react-bootstrap'

const ProductForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState(null)
  const [toast, setToast] = useState({ show: false, message: '', variant: 'success' })
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  })

  const API_BASE_URL = 'http://localhost:6001/api'

  useEffect(() => {
    if (id) {
      fetchProduct()
    }
  }, [id])

  const fetchProduct = async () => {
    try {
      setFetching(true)
      const response = await fetch(`${API_BASE_URL}/products/${id}`)
      if (!response.ok) {
        throw new Error('Product not found')
      }
      const product = await response.json()
      setFormData({
        name: product.name,
        price: product.price.toString(),
        description: product.description || '',
        image: product.image
      })
    } catch (err) {
      setError(err.message)
      showToast('Failed to load product', 'danger')
    } finally {
      setFetching(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name.trim()) {
      showToast('Product name is required', 'danger')
      return
    }

    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      showToast('Valid price is required', 'danger')
      return
    }

    if (!formData.image.trim()) {
      showToast('Image URL is required', 'danger')
      return
    }

    try {
      setLoading(true)
      const url = id ? `${API_BASE_URL}/products/${id}` : `${API_BASE_URL}/products`
      const method = id ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          price: Number(formData.price),
          description: formData.description.trim(),
          image: formData.image.trim()
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to save product')
      }

      const savedProduct = await response.json()
      
      showToast(id ? 'Product updated successfully' : 'Product created successfully', 'success')
      navigate('/')
    } catch (err) {
      showToast(err.message, 'danger')
    } finally {
      setLoading(false)
    }
  }

  const showToast = (message, variant) => {
    setToast({ show: true, message, variant })
    setTimeout(() => setToast({ show: false, message: '', variant: 'success' }), 3000)
  }

  if (fetching) {
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
    <Container className="max-w-600 mx-auto">
      {toast.show && (
        <Alert variant={toast.variant} dismissible onClose={() => setToast({ show: false, message: '', variant: 'success' })}>
          {toast.message}
        </Alert>
      )}

      <Card>
        <Card.Header>
          <h2 className="mb-0">{id ? 'Edit Product' : 'Add New Product'}</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price *</Form.Label>
              <Form.Control
                type="number"
                name="price"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows={4}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL *</Form.Label>
              <Form.Control
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter image URL"
                required
              />
            </Form.Group>

            {formData.image && (
              <Form.Group className="mb-3">
                <Form.Label>Image Preview</Form.Label>
                <div>
                  <img
                    src={formData.image}
                    alt="Product preview"
                    className="img-fluid rounded"
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Invalid+Image+URL'
                    }}
                  />
                </div>
              </Form.Group>
            )}

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/')}
                className="me-md-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    {id ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  id ? 'Update Product' : 'Create Product'
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default ProductForm 
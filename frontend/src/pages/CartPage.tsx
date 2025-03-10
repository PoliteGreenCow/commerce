import React, { useContext } from 'react'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import MessageBox from '../components/MessageBox'
import { Store } from '../Store'
import { CartItem } from '../types/Cart'

const CartItemComponent: React.FC<{
  item: CartItem;
  updateCartHandler: (item: CartItem, quantity: number) => void;
  removeItemHandler: (item: CartItem) => void;
  mode: string;
}> = ({ item, updateCartHandler, removeItemHandler, mode }) => (
  <ListGroup.Item>
    <Row className="align-items-center">
      <Col md={4}>
        <img src={item.image} alt={item.name} className="img-fluid rounded thumbnail" />
        <Link to={`/product/${item.slug}`}>{item.name}</Link>
      </Col>
      <Col md={3}>
        <Button
          onClick={() => updateCartHandler(item, item.quantity - 1)}
          variant={mode}
          disabled={item.quantity === 1}
        >
          <i className="fas fa-minus-circle"></i>
        </Button>{' '}
        <span>{item.quantity}</span>{' '}
        <Button
          variant={mode}
          onClick={() => updateCartHandler(item, item.quantity + 1)}
          disabled={item.quantity === item.countInStock}
        >
          <i className="fas fa-plus-circle"></i>
        </Button>
      </Col>
      <Col md={3}>${item.price}</Col>
      <Col md={2}>
        <Button onClick={() => removeItemHandler(item)} variant={mode}>
          <i className="fas fa-trash"></i>
        </Button>
      </Col>
    </Row>
  </ListGroup.Item>
)

const CartSummary: React.FC<{
  cartItems: CartItem[];
  checkoutHandler: () => void;
}> = ({ cartItems, checkoutHandler }) => (
  <Card>
    <Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h3>
            Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items) : $
            {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
          </h3>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="d-grid">
            <Button
              type="button"
              variant="primary"
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </Button>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Card.Body>
  </Card>
)

export default function CartPage() {
  const navigate = useNavigate()
  const {
    state: {
      mode,
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store)

  const updateCartHandler = (item: CartItem, quantity: number) => {
    if (item.countInStock < quantity) {
      toast.warn('Sorry. Product is out of stock')
      return
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    })
  }

  const removeItemHandler = (item: CartItem) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
  }

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping')
  }

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item: CartItem) => (
                <CartItemComponent
                  key={item._id}
                  item={item}
                  updateCartHandler={updateCartHandler}
                  removeItemHandler={removeItemHandler}
                  mode={mode}
                />
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <CartSummary cartItems={cartItems} checkoutHandler={checkoutHandler} />
        </Col>
      </Row>
    </div>
  )
}
import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { useGetOrderSummaryQuery } from '../hooks/orderHooks'
import { getError } from '../utils'
import { ApiError } from '../types/ApiError'

export default function AdminDashboard() {
  const { data: summary, isLoading, error } = useGetOrderSummaryQuery()

  return (
    <div>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <h1>Dashboard</h1>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{getError(error as unknown as  ApiError)}</MessageBox>
      ) : !summary ? (
        <MessageBox variant="danger">Summary not found</MessageBox>
      ) : (
        <>
          <Row>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>{summary.users[0].numUsers}</Card.Title>
                  <Card.Text> Users</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>{summary.orders[0].numOrders}</Card.Title>
                  <Card.Text> Orders</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>${summary.orders[0].totalSales.toFixed(2)}</Card.Title>
                  <Card.Text> Total Sales</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {/* Add more dashboard content as needed */}
        </>
      )}
    </div>
  )
}
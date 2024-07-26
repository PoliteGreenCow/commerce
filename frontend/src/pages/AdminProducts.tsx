
import { Button, Table } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { LinkContainer } from 'react-router-bootstrap';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useGetProductsQuery, useDeleteProductMutation } from '../hooks/ProductHooks';
import { getError } from '../utils';
import { ApiError } from '../types/ApiError';
import { Product } from '../types/Product';

export default function AdminProducts() {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  const { mutateAsync: deleteProduct } = useDeleteProductMutation();

  const deleteHandler = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        console.error(getError(err as ApiError));
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <h1>Products</h1>
      {isLoading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products!.map((product: Product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}`}>
                      <Button variant="light" className="btn-sm">
                        Edit
                      </Button>
                    </LinkContainer>
                    &nbsp;
                    <Button
                      variant="light"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="text-right">
            <LinkContainer to="/admin/product/create">
              <Button>Create Product</Button>
            </LinkContainer>
          </div>
        </>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Comp(props) {
  const [urls, setUrls] = useState(['', '']);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProductData = async () => {
    setLoading(true);
    setError(null);
    try {
      const responses = await Promise.all(
        urls.map(url => axios.post(`${process.env.REACT_APP_BASE_URL}/api/scrape/`, { url }))
      );
      setProducts(responses.map(response => response.data));
      props.showAlert("Products Fetched Successfully", "success");
    } catch (err) {
      setError('Failed to fetch product data. ' + (err.response?.data?.error || ''));
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    setProducts([]);
    e.preventDefault();
    fetchProductData();
  };

  const handleUrlChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  return (
    <div className="container mt-3">
      <h1 className="mb-4">E-commerce Product Comparator</h1>
      <form onSubmit={handleSubmit}>
        {urls.map((url, index) => (
          <div key={index} className="form-group">
            <label htmlFor={`url-${index}`}>Product URL {index + 1}</label>
            <input
              type="url"
              className="form-control"
              id={`url-${index}`}
              value={url}
              onChange={(e) => handleUrlChange(index, e.target.value)}
              required
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Fetching...' : 'Compare Products'}
        </button>
      </form>
      {error && <div className="alert alert-danger mt-4">{error}</div>}
      {products.length > 0 && (
        <div className="row mt-4">
          {products.map((product, index) => (
            <div key={index} className="col-md-6">
              <h2>{product.title}</h2>
              <img src={product.image} alt={product.title} className="img-fluid" style={{maxHeight:"250px"}}/>
              <h6>MRP: {product.price}</h6>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      )} <br /><br />
    </div>
  );
}

export default Comp;
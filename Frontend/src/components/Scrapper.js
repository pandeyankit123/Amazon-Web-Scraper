import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Scrap(props) {
  const [url, setUrl] = useState('');
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProductData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/scrape/`, { url });
      setProductData(response.data);
      props.showAlert("Fetched Successfully", "success");
    } catch (err) {
      setError('Failed to fetch product data. ' + (err.response?.data?.error || ''));
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    setProductData(null);
    e.preventDefault();
    fetchProductData();
  };

  return (
    <div className="container mt-3">
      <h1 className="mb-4">E-commerce Product Scraper</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="url">Product URL</label>
          <input
            type="url"
            className="form-control"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Fetching...' : 'Fetch Product Data'}
        </button>
      </form>
      {error && <div className="alert alert-danger mt-4">{error}</div>}
      {productData && (
        <div className="mt-4">
          <h2>{productData.title}</h2>
          <img src={productData.image} alt={productData.title} className="img-fluid mt-0"  style={{maxHeight:"450px"}}/>
          <h6>MRP: {productData.price}</h6>
          <p>{productData.description}</p>
        </div>
      )} <br /><br />
    </div>
  );
}

export default Scrap;

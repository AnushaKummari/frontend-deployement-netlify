import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [stockname, setStockname] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [stocks, setStocks] = useState([]);

  const API_URL = "http://localhost:8081/stocks";

  // Fetch all stocks
  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = () => {
    axios.get(API_URL)
      .then(response => {
        setStocks(response.data);
      })
      .catch(error => {
        console.error("Error fetching stocks:", error);
      });
  };

  // Save stock to Spring Boot
  const saveStock = () => {

    const stockData = {
      stockname: stockname,
      quantity: parseInt(quantity),
      price: parseFloat(price)
    };

    axios.post(API_URL, stockData)
      .then(response => {
        alert("Stock Saved Successfully!");
        fetchStocks();  // refresh list
        setStockname("");
        setQuantity("");
        setPrice("");
      })
      .catch(error => {
        console.error("Error saving stock:", error);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Stock</h2>

      <input
        type="text"
        placeholder="Stock Name"
        value={stockname}
        onChange={(e) => setStockname(e.target.value)}
      />
      <br /><br />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <br /><br />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br /><br />

      <button onClick={saveStock}>Save</button>

      <hr />

      <h2>Stock List</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.id}>
              <td>{stock.id}</td>
              <td>{stock.stockname}</td>
              <td>{stock.quantity}</td>
              <td>{stock.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default App;

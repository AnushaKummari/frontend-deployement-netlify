import React, { useState, useEffect } from "react";

function App() {

  const [stockname, setStockname] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [stocks, setStocks] = useState([]);

  // Load from localStorage when app starts
  useEffect(() => {
    const savedStocks = localStorage.getItem("stocks");
    if (savedStocks) {
      setStocks(JSON.parse(savedStocks));
    }
  }, []);

  // Save to localStorage whenever stocks change
  useEffect(() => {
    localStorage.setItem("stocks", JSON.stringify(stocks));
  }, [stocks]);

  const saveStock = () => {

    if (!stockname || !quantity || !price) {
      alert("Please fill all fields");
      return;
    }

    const newStock = {
      id: Date.now(), // unique ID
      stockname,
      quantity: parseInt(quantity),
      price: parseFloat(price)
    };

    setStocks([...stocks, newStock]);

    setStockname("");
    setQuantity("");
    setPrice("");
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

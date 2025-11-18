import { useState } from "react";
import { Card, PrimaryButton, SecondaryButton } from "./StyledCard";

export default function OrderForm({ onOrderCreated }) {
  const [form, setForm] = useState({
    symbol: "AAPL",
    side: "buy",
    quantity: "",
    price: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first.");
      return;
    }
    const quantity = Number(form.quantity);
    const price = Number(form.price);
    if (!quantity || quantity <= 0) {
      alert("Quantity must be greater than 0");
      return;
    }
    if (!price || price <= 0) {
      alert("Price must be greater than 0");
      return;
    }
    const payload = {
      symbol: form.symbol,
      side: form.side,
      quantity,
      price
    };
    try {
      const res = await fetch("http://13.53.126.197:8080/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        alert("Failed: " + (data.error || "Order creation failed"));
        return;
      }
      alert("Order placed!");
      onOrderCreated();
      setForm({
        symbol: "AAPL",
        side: "buy",
        quantity: "",
        price: ""
      });
    } catch (err) {
      console.error("Submit error:", err);
      alert("Network error. Check backend connection.");
    }
  };

  return (
    <div>
      <h2 style={{
        color: "#24292F",
        fontWeight: 700,
        fontSize: "1.5rem",
        marginBottom: "1rem"
      }}>
        Place Order
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ color: "#24292F" }}>Symbol</label>
          <select
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "10px",
              border: "1px solid #E1E4E8",
              marginTop: "0.5rem",
              background: "#F6F8FA",
              color: "#24292F"
            }}
            value={form.symbol}
            onChange={e => setForm({ ...form, symbol: e.target.value })}
          >
            <option>AAPL</option>
            <option>TSLA</option>
            <option>AMZN</option>
            <option>INFY</option>
            <option>TCS</option>
          </select>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ color: "#24292F" }}>Side</label>
          <select
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "10px",
              border: "1px solid #E1E4E8",
              marginTop: "0.5rem",
              background: "#F6F8FA",
              color: "#24292F"
            }}
            value={form.side}
            onChange={e => setForm({ ...form, side: e.target.value })}
          >
            <option>buy</option>
            <option>sell</option>
          </select>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ color: "#24292F" }}>Quantity</label>
          <input
            type="number"
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "10px",
              border: "1px solid #E1E4E8",
              marginTop: "0.5rem",
              background: "#F6F8FA",
              color: "#24292F"
            }}
            value={form.quantity}
            onChange={e => setForm({ ...form, quantity: e.target.value })}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ color: "#24292F" }}>Price</label>
          <input
            type="number"
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "10px",
              border: "1px solid #E1E4E8",
              marginTop: "0.5rem",
              background: "#F6F8FA",
              color: "#24292F"
            }}
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
          />
        </div>
        <PrimaryButton type="submit">Place Order</PrimaryButton>
        <SecondaryButton type="button" onClick={() => setForm({
          symbol: "AAPL",
          side: "buy",
          quantity: "",
          price: ""
        })}>
          Reset
        </SecondaryButton>
      </form>
    </div>
  );
}

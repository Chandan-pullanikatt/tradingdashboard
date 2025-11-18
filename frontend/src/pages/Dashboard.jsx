import { useEffect, useState } from "react";
import useWebSocket from "../hooks/useWebSocket";
import { Card, PrimaryButton } from "../components/StyledCard";
import PriceTable from "../components/PriceTable";
import OrderForm from "../components/OrderForm";
import OrdersTable from "../components/OrdersTable";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#F6F8FA",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Card>
          <h2 style={{
            color: "#24292F",
            fontWeight: 700,
            fontSize: "2rem",
            marginBottom: "1.5rem"
          }}>
            Please Login
          </h2>
        </Card>
      </div>
    );
  }

  const updates = useWebSocket("ws://13.53.126.197:8080/ws");

  const loadOrders = async () => {
    const res = await fetch("http://13.53.126.197:8080/orders", {
      headers: { Authorization: "Bearer " + token }
    });
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleOrderCreated = () => {
    loadOrders();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={{
      maxWidth: "980px",
      margin: "0 auto",
      padding: "2rem",
      background: "#F6F8FA",
      minHeight: "100vh"
    }}>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "2rem",
        gap: "1rem"
      }}>
        <h1 style={{
          color: "#24292F",
          fontWeight: 800,
          fontSize: "2.3rem"
        }}>
          Trading Dashboard
        </h1>
        <PrimaryButton style={{ padding: "0.6rem 2rem", background: "#0969DA" }} onClick={handleLogout}>
          Logout
        </PrimaryButton>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "1.2rem"
      }}>
        <Card>
          <PriceTable updates={updates} />
        </Card>
        <Card>
          <OrderForm onOrderCreated={handleOrderCreated} />
        </Card>
        <Card>
          <OrdersTable orders={orders} />
        </Card>
      </div>
    </div>
  );
}

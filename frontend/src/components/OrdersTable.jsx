import React from "react";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  background: #FFFFFF;
  color: #24292F;
  margin-top: 1rem;
  font-size: 1rem;
  border: 1px solid #E1E4E8;
`;

const Th = styled.th`
  padding: 0.75rem;
  background: #F6F8FA;
  color: #0969DA;
  font-weight: 600;
  border-bottom: 1px solid #E1E4E8;
`;

const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #F6F8FA;
  vertical-align: middle;
`;

export default function OrdersTable({ orders }) {
  return (
    <>
      <h2 style={{
        color: "#24292F",
        fontWeight: 700,
        fontSize: "1.5rem",
        marginBottom: "1rem"
      }}>
        Orders
      </h2>
      <Table>
        <thead>
          <tr>
            <Th>Symbol</Th>
            <Th>Side</Th>
            <Th>Qty</Th>
            <Th>Price</Th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, idx) => (
            <tr key={o.id ?? idx}>
              <Td>{o.symbol}</Td>
              <Td style={{ color: o.side === "buy" ? "#1A7F37" : "#CF222E", fontWeight: 600 }}>
                {o.side}
              </Td>
              <Td>{o.quantity}</Td>
              <Td>{o.price}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

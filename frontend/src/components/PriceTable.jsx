import React, { useEffect, useState } from "react";
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

export default function PriceTable({ updates }) {
  const [prices, setPrices] = useState({});
  useEffect(() => {
    updates.forEach(update => {
      setPrices(prev => {
        const oldPrice = prev[update.symbol]?.price;
        return {
          ...prev,
          [update.symbol]: {
            price: update.price,
            direction: oldPrice
              ? (update.price > oldPrice ? "up" : "down")
              : "neutral"
          }
        };
      });
    });
  }, [updates]);

  return (
    <>
      <h2 style={{
        color: "#24292F",
        fontWeight: 700,
        fontSize: "1.5rem",
        marginBottom: "1rem"
      }}>
        Live Prices
      </h2>
      <Table>
        <thead>
          <tr>
            <Th>Symbol</Th>
            <Th>Price</Th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(prices).map(([symbol, item]) => (
            <tr key={symbol}>
              <Td>{symbol}</Td>
              <Td style={{
                color:
                  item.direction === "up"
                    ? "#1A7F37"
                    : item.direction === "down"
                    ? "#CF222E"
                    : "#24292F",
                fontWeight: 600
              }}>
                {item.price.toFixed(2)}
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

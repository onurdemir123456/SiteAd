import React from "react";
import { ListGroup } from "react-bootstrap";

export default function ScrollableButtonList({
  items = [],       // { label: "Button 1", onClick: () => {} } gibi objeler
  height = "100vh", // container yüksekliği
  width = "120px",
  buttonStyle = {}, // her button için stil
  className = ""    // opsiyonel ek CSS sınıfı
}) {
  return (
    <div style={{display:"flex",width,height, overflowY: "auto" }} className={className}>
      <ListGroup>
        {items.map((item, i) => (
          <ListGroup.Item key={i}>
            <button
              style={{ ...buttonStyle }}
              onClick={item.onClick}
            >
              {item.label}
            </button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
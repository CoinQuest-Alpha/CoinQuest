// modules
import React from "react";
import { DollarSign, Search, ShoppingBag } from "react-feather";

// styling
import "./controller.scss";

const Controller = () => {
  return (
    <div className="controller-container">
      <div className="controller">
        <div className="layer">
          <div className="box" style={{ border: "none" }}></div>
          <div className="box">▲</div>
          <div className="box" style={{ border: "none" }}></div>
        </div>

        <div className="layer">
          <div className="box transform" style={{ border: "2px solid black" }}>
            ▼
          </div>
          <div className="box circle" style={{ border: "none" }}>
            ●
          </div>
          <div
            className="box transform"
            style={{ borderTop: "2px solid black" }}
          >
            ▲
          </div>
        </div>

        <div className="layer">
          <div className="box" style={{ border: "none" }}></div>
          <div className="box">▼</div>
          <div className="box" style={{ border: "none" }}></div>
        </div>
      </div>
      <div className="actions">
        <DollarSign />
        <Search />
        <ShoppingBag />
      </div>
    </div>
  );
};

export default Controller;

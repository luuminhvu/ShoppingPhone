import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-sidenav">
        <h3>Tuỳ chọn quản lí</h3>
        <NavLink
          className={({ isActive }) => {
            return isActive ? "active" : "inactive";
          }}
          to="/admin/summary"
          activeClassName="active"
        >
          Summary
        </NavLink>
        <NavLink to="/admin/products" activeClassName="active">
          Products
        </NavLink>
      </div>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

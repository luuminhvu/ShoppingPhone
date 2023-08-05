import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Dashboard.css";
import { AiOutlineUser } from "react-icons/ai";
import { FaAppStore, FaRegClipboard } from "react-icons/fa";
import { GrOverview } from "react-icons/gr";

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
          <GrOverview />
          Summary
        </NavLink>
        <NavLink to="/admin/products" activeClassName="active">
          <FaAppStore />
          Products
        </NavLink>
        <NavLink to="/admin/orders" activeClassName="active">
          <FaRegClipboard />
          Orders
        </NavLink>
        <NavLink to="/admin/users" activeClassName="active">
          <AiOutlineUser />
          Users
        </NavLink>
      </div>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

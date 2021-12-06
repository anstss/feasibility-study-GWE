import React from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import {
  ANALYSIS_PAGE_ROUTE,
  COST_PRICE_PAGE_ROUTE,
  DEPRECIATION_PAGE_ROUTE,
  INTERNAL_RATE_OF_RETURN_PAGE_ROUTE,
  MIN_COST_EFFECTIVE_POWER_PAGE_ROUTE,
  NET_DISCOUNTED_CASH_FLOW_PAGE_ROUTE,
  STATIC_PERFORMANCE_INDICATORS_PAGE_ROUTE,
} from "../../shared/constants";

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-primary">
      <div className="container-fluid container">
        <Link to={"/"} className="navbar-brand text-white">
          ТЕО
        </Link>
        <button
          className="navbar-toggler text-white"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <i className="bi bi-list fs-2"></i>
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              ТЕО
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link to={"/"} className="nav-link active" aria-current="page">
                  <div data-bs-toggle="offcanvas">Home</div>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={ANALYSIS_PAGE_ROUTE} className="nav-link">
                  <div data-bs-dismiss="offcanvas">
                    Аналіз досягнутих обсягів видобутку води
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={DEPRECIATION_PAGE_ROUTE} className="nav-link">
                  <div data-bs-dismiss="offcanvas">
                    Капіталовкладення та амортизаційні витрати
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={COST_PRICE_PAGE_ROUTE} className="nav-link">
                  <div data-bs-dismiss="offcanvas">Собівартість продукції</div>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={STATIC_PERFORMANCE_INDICATORS_PAGE_ROUTE}
                  className="nav-link"
                >
                  <div data-bs-dismiss="offcanvas">
                    Статичні показники експлуатації
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={MIN_COST_EFFECTIVE_POWER_PAGE_ROUTE}
                  className="nav-link"
                >
                  <div data-bs-dismiss="offcanvas">
                    Мінімальна рентабельна потужність
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={NET_DISCOUNTED_CASH_FLOW_PAGE_ROUTE}
                  className="nav-link"
                >
                  <div data-bs-dismiss="offcanvas">
                    Чистий дисконтований грошовий потік
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={INTERNAL_RATE_OF_RETURN_PAGE_ROUTE}
                  className="nav-link"
                >
                  <div data-bs-dismiss="offcanvas">
                    Внутрішня норма прибутковості
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

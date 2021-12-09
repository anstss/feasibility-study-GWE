import React, { FC } from "react";
import "./menuCard.scss";
import { Link } from "react-router-dom";

type MenuCardProps = {
  icon: string;
  path: string;
  text: string;
};

const MenuCard: FC<MenuCardProps> = ({ icon, path, text }) => {
  return (
    <div className="card menu-card text-center my-3 mx-3">
      <Link to={path} className="nav-link menu-card__link" aria-current="page">
        <i className={`bi ${icon} menu-card__icon`}></i>
        <div className="card-body">
          <h5 className="card-title">{text}</h5>
        </div>
      </Link>
    </div>
  );
};

export default MenuCard;

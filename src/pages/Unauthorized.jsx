import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  const { t, i18n } = useTranslation("global");
  return (
    <div className="container d-flex justify-content-center align-items-center align-content-center">
      <div className="card text-center shadow-sm mt-5 mb-3 p-5 border rounded-5">
        <img
          style={{ width: "auto", maxHeight: "80px" }}
          className="d-block mb-2 mx-auto"
          src="/warning.gif"
          alt="--"
        />
        <h5 className="text-danger fw-bold mb-3">{t("no_permission")}</h5>
        <Link className="text-color" to="/">{t("sidenav.home")} <i className={`bi ${i18n.language === "ar"?"bi-arrow-left":"bi-arrow-right"} text-sm`}></i></Link>
      </div>
    </div>
  );
};

export default Unauthorized;


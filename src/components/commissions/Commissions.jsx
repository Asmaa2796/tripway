import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Commissions = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle(t("sidenav.commissions"));
  }, [setTitle, t, i18n.language]);

  return (
    <>
      {/* form */}
      <form className="table_form form-style my-3 py-3">
        <div className="row align-items-center">
          
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t("labels.type")}</label>
            <input type="text" className="input-bg" name="type" />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t("labels.status")}</label>
            <input type="text" className="input-bg" name="status" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.fromDate")}</label>
            <input type="text" className="input-bg" name="from_date" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.toDate")}</label>
            <input type="text" className="input-bg" name="to_date" />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-12 text-center">
            <button className="btn show_result">
              {t("btns.viewResults")}{" "}
            </button>
            <button className="btn show_all">{t("btns.viewAll")}</button>
          </div>
          
        </div>
      </form>
      <div className="table_wrapper shadow-none">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col" className="text-lighter">
                  #
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.type")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.status")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.date")}
                </th>
                <th></th>
                
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="sub-text">1</td>
                <td className="sub-text">رحلات</td>
                <td className="highlight-green">{t("labels.open")}</td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  	01/01/2025 - 31/01/2025
                </td>
                <td>
                  <div className="d-flex">
                    <Link to="">
                      <span className="text-lighter px-1 mx-1 mb-0">
                        <i className="bi bi-eye"></i>
                      </span>
                    </Link>
                    <Link to="">
                      <span className="text-danger px-1 mx-1 mb-0">
                        <i className="bi bi-trash"></i>
                      </span>
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="sub-text">1</td>
                <td className="sub-text">رحلات</td>
                <td className="highlight-green">{t("labels.open")}</td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  	01/01/2025 - 31/01/2025
                </td>
                <td>
                  <div className="d-flex">
                    <Link to="">
                      <span className="text-lighter px-1 mx-1 mb-0">
                        <i className="bi bi-eye"></i>
                      </span>
                    </Link>
                    <Link to="">
                      <span className="text-danger px-1 mx-1 mb-0">
                        <i className="bi bi-trash"></i>
                      </span>
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="sub-text">1</td>
                <td className="sub-text">رحلات</td>
                <td className="highlight-green">{t("labels.open")}</td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  	01/01/2025 - 31/01/2025
                </td>
                <td>
                  <div className="d-flex">
                    <Link to="">
                      <span className="text-lighter px-1 mx-1 mb-0">
                        <i className="bi bi-eye"></i>
                      </span>
                    </Link>
                    <Link to="">
                      <span className="text-danger px-1 mx-1 mb-0">
                        <i className="bi bi-trash"></i>
                      </span>
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="sub-text">1</td>
                <td className="sub-text">رحلات</td>
                <td className="highlight-green">{t("labels.open")}</td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  	01/01/2025 - 31/01/2025
                </td>
                <td>
                  <div className="d-flex">
                    <Link to="">
                      <span className="text-lighter px-1 mx-1 mb-0">
                        <i className="bi bi-eye"></i>
                      </span>
                    </Link>
                    <Link to="">
                      <span className="text-danger px-1 mx-1 mb-0">
                        <i className="bi bi-trash"></i>
                      </span>
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="sub-text">1</td>
                <td className="sub-text">رحلات</td>
                <td className="highlight-green">{t("labels.open")}</td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  	01/01/2025 - 31/01/2025
                </td>
                <td>
                  <div className="d-flex">
                    <Link to="">
                      <span className="text-lighter px-1 mx-1 mb-0">
                        <i className="bi bi-eye"></i>
                      </span>
                    </Link>
                    <Link to="">
                      <span className="text-danger px-1 mx-1 mb-0">
                        <i className="bi bi-trash"></i>
                      </span>
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* pagination  */}
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item disabled">
            <a
              className="page-link"
              href="#"
              tabIndex="-1"
              aria-disabled="true"
            >
              <i className="fa fa-caret-right"></i>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item active" aria-current="page">
            <a className="page-link" href="#">
              2 <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              <i className="fa fa-caret-left"></i>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Commissions;

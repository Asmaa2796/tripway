import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Archive = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle(t("sidenav.archive"));
  }, [setTitle, t, i18n.language]);

  return (
    <>
      {/* form */}
      <form className="table_form form-style my-3 py-3">
        <div className="row align-items-center">
          
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.fileNumber")}</label>
            <input type="text" className="input-bg" name="file_number" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.clientType")}</label>
            <input type="text" className="input-bg" name="client_type" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.type")}</label>
            <input type="text" className="input-bg" name="type" />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.createdBy")} </label>
            <input name="createdBy" className="input-bg" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.report")} </label>
            <input name="report" className="input-bg" />
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
                  {t("labels.fileNumber")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.user")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.type")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.file")}
                </th>
                
                <th scope="col" className="text-lighter">
                  {t("labels.createdBy")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.date")}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="sub-text">230</td>
                <td className="sub-text">DO14</td>
                <td className="sub-text">
                  <span className="d-block">{t("sidenav.corporate")}</span>
                  <span className="d-block text-color">
                    شركة جمعية بنك الطعام السعودي اطعام
                  </span>
                </td>                
                <td className="sub-text"> {t("labels.expiredContract")} </td>
                <td className="sub-text"> {t("labels.serviceProvider")} </td>
                <td className="text-color">
                  حسن حسين
                </td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  21/05/2025 02:52 PM
                </td>
              </tr>
              <tr>
                <td className="sub-text">230</td>
                <td className="sub-text">DO14</td>
                <td className="sub-text">
                  <span className="d-block">{t("sidenav.corporate")}</span>
                  <span className="d-block text-color">
                    شركة جمعية بنك الطعام السعودي اطعام
                  </span>
                </td>                
                <td className="sub-text"> {t("labels.expiredContract")} </td>
                <td className="sub-text"> {t("labels.serviceProvider")} </td>
                <td className="text-color">
                  حسن حسين
                </td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  21/05/2025 02:52 PM
                </td>
              </tr>
              <tr>
                <td className="sub-text">230</td>
                <td className="sub-text">DO14</td>
                <td className="sub-text">
                  <span className="d-block">{t("sidenav.corporate")}</span>
                  <span className="d-block text-color">
                    شركة جمعية بنك الطعام السعودي اطعام
                  </span>
                </td>                
                <td className="sub-text"> {t("labels.expiredContract")} </td>
                <td className="sub-text"> {t("labels.serviceProvider")} </td>
                <td className="text-color">
                  حسن حسين
                </td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  21/05/2025 02:52 PM
                </td>
              </tr>
              <tr>
                <td className="sub-text">230</td>
                <td className="sub-text">DO14</td>
                <td className="sub-text">
                  <span className="d-block">{t("sidenav.corporate")}</span>
                  <span className="d-block text-color">
                    شركة جمعية بنك الطعام السعودي اطعام
                  </span>
                </td>                
                <td className="sub-text"> {t("labels.expiredContract")} </td>
                <td className="sub-text"> {t("labels.serviceProvider")} </td>
                <td className="text-color">
                  حسن حسين
                </td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  21/05/2025 02:52 PM
                </td>
              </tr>
              <tr>
                <td className="sub-text">230</td>
                <td className="sub-text">DO14</td>
                <td className="sub-text">
                  <span className="d-block">{t("sidenav.corporate")}</span>
                  <span className="d-block text-color">
                    شركة جمعية بنك الطعام السعودي اطعام
                  </span>
                </td>                
                <td className="sub-text"> {t("labels.expiredContract")} </td>
                <td className="sub-text"> {t("labels.serviceProvider")} </td>
                <td className="text-color">
                  حسن حسين
                </td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  21/05/2025 02:52 PM
                </td>
              </tr>
              <tr>
                <td className="sub-text">230</td>
                <td className="sub-text">DO14</td>
                <td className="sub-text">
                  <span className="d-block">{t("sidenav.corporate")}</span>
                  <span className="d-block text-color">
                    شركة جمعية بنك الطعام السعودي اطعام
                  </span>
                </td>                
                <td className="sub-text"> {t("labels.expiredContract")} </td>
                <td className="sub-text"> {t("labels.serviceProvider")} </td>
                <td className="text-color">
                  حسن حسين
                </td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  21/05/2025 02:52 PM
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

export default Archive;

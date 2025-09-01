import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const RentalProjects = () => {
  const {t,i18n} = useTranslation('global');
  const { setTitle } = useTitle();

  useEffect(() => {
        setTitle(t('sidenav.rentalProjects'));
  }, [setTitle ,t, i18n.language]);
  return (
    <>
      {/* form */}
      <form className="table_form form-style my-3 py-3">
        <div className="row align-items-center">
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light">{t("labels.projectNumber")}</label>
            <input type="text" name="project_number" />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light">{t("labels.projectName")}</label>
            <input type="text" name="project_name" />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light">{t("labels.clientType")}</label>
            <input type="text" name="client_type" />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12 text-center">
            <button className="btn show_result">{t("btns.viewResults")}</button>
            <button className="btn show_all">{t("btns.viewAll")}</button>
            <Link to="">
              <span
                className="btn btn-warning btn-sm text-sm px-3"
                style={{ marginTop: "5px" }}
              >
                {t("labels.newRentalProject")}
              </span>
            </Link>
          </div>
        </div>
      </form>
      <div className="table_wrapper">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col" className="text-lighter">
                  #
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.user")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.projectName")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.status")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.numberOfVehicles")}
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="sub-text">12</td>
                <td className="sub-text">
                  <span className="d-block">{t("sidenav.corporate")}</span>
                  <span className="text-color d-block">
                    شركة المطاحن الاولى
                  </span>
                </td>
                <td className="sub-text">محمد موسى</td>
                <td className="highlight-green">{t('labels.active')}</td>
                <td className="sub-text">1</td>
                <td>
                  <div className="d-flex">
                    <Link to="">
                      <span className="text-lighter px-1 mx-1 mb-0">
                        <i className="bi bi-eye"></i>
                      </span>
                    </Link>
                    <Link to="">
                      <span className="text-color px-1 mx-1 mb-0">
                        <i className="bi bi-pen"></i>
                      </span>
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="sub-text">12</td>
                <td className="sub-text">
                  <span className="d-block">{t("sidenav.corporate")}</span>
                  <span className="text-color d-block">
                    شركة المطاحن الاولى
                  </span>
                </td>
                <td className="sub-text">محمد موسى</td>
                <td className="highlight-green">{t('labels.active')}</td>
                <td className="sub-text">1</td>
                <td>
                  <div className="d-flex">
                    <Link to="">
                      <span className="text-lighter px-1 mx-1 mb-0">
                        <i className="bi bi-eye"></i>
                      </span>
                    </Link>
                    <Link to="">
                      <span className="text-color px-1 mx-1 mb-0">
                        <i className="bi bi-pen"></i>
                      </span>
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="sub-text">12</td>
                <td className="sub-text">
                  <span className="d-block">{t("sidenav.corporate")}</span>
                  <span className="text-color d-block">
                    شركة المطاحن الاولى
                  </span>
                </td>
                <td className="sub-text">محمد موسى</td>
                <td className="highlight-green">{t('labels.active')}</td>
                <td className="sub-text">1</td>
                <td>
                  <div className="d-flex">
                    <Link to="">
                      <span className="text-lighter px-1 mx-1 mb-0">
                        <i className="bi bi-eye"></i>
                      </span>
                    </Link>
                    <Link to="">
                      <span className="text-color px-1 mx-1 mb-0">
                        <i className="bi bi-pen"></i>
                      </span>
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="sub-text">12</td>
                <td className="sub-text">
                  <span className="d-block">{t("sidenav.corporate")}</span>
                  <span className="text-color d-block">
                    شركة المطاحن الاولى
                  </span>
                </td>
                <td className="sub-text">محمد موسى</td>
                <td className="highlight-green">{t('labels.active')}</td>
                <td className="sub-text">1</td>
                <td>
                  <div className="d-flex">
                    <Link to="">
                      <span className="text-lighter px-1 mx-1 mb-0">
                        <i className="bi bi-eye"></i>
                      </span>
                    </Link>
                    <Link to="">
                      <span className="text-color px-1 mx-1 mb-0">
                        <i className="bi bi-pen"></i>
                      </span>
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="sub-text">12</td>
                <td className="sub-text">
                  <span className="d-block">{t("sidenav.corporate")}</span>
                  <span className="text-color d-block">
                    شركة المطاحن الاولى
                  </span>
                </td>
                <td className="sub-text">محمد موسى</td>
                <td className="highlight-green">{t('labels.active')}</td>
                <td className="sub-text">1</td>
                <td>
                  <div className="d-flex">
                    <Link to="">
                      <span className="text-lighter px-1 mx-1 mb-0">
                        <i className="bi bi-eye"></i>
                      </span>
                    </Link>
                    <Link to="">
                      <span className="text-color px-1 mx-1 mb-0">
                        <i className="bi bi-pen"></i>
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

export default RentalProjects;
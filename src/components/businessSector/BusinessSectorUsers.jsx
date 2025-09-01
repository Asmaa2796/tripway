import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import "./businessSector.css";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
const BusinessSectorUsers = () => {
  const {t,i18n} = useTranslation('global');
  const { setTitle } = useTitle();

   useEffect(() => {
          setTitle(t('sidenav.businessUsers'));
    }, [setTitle ,t, i18n.language]);
  return (
    <>
      {/* form */}
      <form className="table_form form-style my-3 py-3">
        <div className="row justify-content-center align-items-center">
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light"> {t('labels.user')} </label>
            <select name="username">
              <option value="">{t('labels.selectItem')}</option>
            </select>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t('labels.email')}</label>
            <input name="email" className="input-div" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t('labels.companyUser')}</label>
            <select name="company_user">
              <option value="">{t('labels.selectItem')}</option>
            </select>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t('labels.status')}</label>
            <select name="status">
              <option value="">{t('labels.selectItem')}</option>
            </select>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t('labels.report')}</label>
            <select name="report">
              <option value="">{t('labels.selectItem')}</option>
            </select>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12 text-center">
            <button className="btn show_result">{t('btns.viewResults')}</button>
            <button className="btn show_all">{t('btns.viewAll')}</button>
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
                 {t('labels.clientID')}
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.businessSector')}
                </th>
                <th scope="col" className="text-lighter">
                 {t('sign.name')}
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.phone')}
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.email')}
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.status')}
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.permission')}
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.createdAt')}
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="sub-text">12</td>
                <td className="sub-text">U953</td>
                <td className="sub-text">Temp User</td>
                <td className="text-color">Temp User</td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  +966 565925299
                </td>
                <td className="sub-text">aaa@gmail.com</td>
                <td className="text-color">{t('labels.active')}</td>
                <td className="sub-text">Admin</td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  03:39 PM 02/01/2025{" "}
                </td>
                <td className="d-flex justify-content-center">
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
                </td>
              </tr>
              <tr>
                <td className="sub-text">12</td>
                <td className="sub-text">U953</td>
                <td className="sub-text">Temp User</td>
                <td className="text-color">Temp User</td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  +966 565925299
                </td>
                <td className="sub-text">aaa@gmail.com</td>
                <td className="highlight-text">{t('labels.inactive')}</td>
                <td className="sub-text">Admin</td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  03:39 PM 02/01/2025{" "}
                </td>
                <td className="d-flex justify-content-center">
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
                </td>
              </tr>
              <tr>
                <td className="sub-text">12</td>
                <td className="sub-text">U953</td>
                <td className="sub-text">Temp User</td>
                <td className="text-color">Temp User</td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  +966 565925299
                </td>
                <td className="sub-text">aaa@gmail.com</td>
                <td className="text-color">{t('labels.active')}</td>
                <td className="sub-text">Admin</td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  03:39 PM 02/01/2025{" "}
                </td>
                <td className="d-flex justify-content-center">
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
                </td>
              </tr>
              <tr>
                <td className="sub-text">12</td>
                <td className="sub-text">U953</td>
                <td className="sub-text">Temp User</td>
                <td className="text-color">Temp User</td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  +966 565925299
                </td>
                <td className="sub-text">aaa@gmail.com</td>
                <td className="highlight-text">{t('labels.inactive')}</td>
                <td className="sub-text">Admin</td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  03:39 PM 02/01/2025{" "}
                </td>
                <td className="d-flex justify-content-center">
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

export default BusinessSectorUsers;

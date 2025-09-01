import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import "./businessSector.css";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
const CreditLimit = () => {
  const {t,i18n} = useTranslation('global');
  const { setTitle } = useTitle();

 useEffect(() => {
         setTitle(t('labels.creditLimit'));
   }, [setTitle ,t, i18n.language]);
  return (
    <>
      {/* form */}
      <form className="table_form form-style my-3 py-3">
        <div className="row justify-content-center align-items-center">
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light"> {t('sign.name')}</label>
            <input name="username" className="w-100 input-div" />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light"> {t('labels.totalPrice')}</label>
            <input name="total_price" className="w-100 input-div" />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light"> {t('labels.report')}</label>
            <input name="report" className="w-100 input-div" />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12 text-center">
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
                  {t('sign.name')}
                </th>
                <th scope="col" className="text-lighter">
                 {t('labels.currentBalance')}
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.creditLimit')}
                </th>
                <th scope="col" className="text-lighter">
                 {t('labels.creditLimitExceeded')}
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.exceedDate')}
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="sub-text">12</td>
                <td className="sub-text">10001666</td>
                <td className="text-color">Temp User</td>
                <td className="sub-text">$ 0</td>
                <td className="sub-text">$ 100.00</td>
                <td className="sub-text">{t('labels.nothing')}</td>
                <td className="sub-text" style={{direction:"ltr"}}>
                    06/04/2025 02:09 PM
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
                <td className="sub-text">10001666</td>
                <td className="text-color">Temp User</td>
                <td className="sub-text">$ 0</td>
                <td className="sub-text">$ 100.00</td>
                <td className="sub-text">{t('labels.nothing')}</td>
                <td className="sub-text" style={{direction:"ltr"}}>
                    06/04/2025 02:09 PM
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
                <td className="sub-text">10001666</td>
                <td className="text-color">Temp User</td>
                <td className="sub-text">$ 0</td>
                <td className="sub-text">$ 100.00</td>
                <td className="sub-text">{t('labels.nothing')}</td>
                <td className="sub-text" style={{direction:"ltr"}}>
                    06/04/2025 02:09 PM
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
                <td className="sub-text">10001666</td>
                <td className="text-color">Temp User</td>
                <td className="sub-text">$ 0</td>
                <td className="sub-text">$ 100.00</td>
                <td className="sub-text">{t('labels.nothing')}</td>
                <td className="sub-text" style={{direction:"ltr"}}>
                    06/04/2025 02:09 PM
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
                <td className="sub-text">10001666</td>
                <td className="text-color">Temp User</td>
                <td className="sub-text">$ 0</td>
                <td className="sub-text">$ 100.00</td>
                <td className="sub-text">{t('labels.nothing')}</td>
                <td className="sub-text" style={{direction:"ltr"}}>
                    06/04/2025 02:09 PM
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

export default CreditLimit;
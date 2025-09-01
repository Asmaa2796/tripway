import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const DuplicateShipmentNumbers = () => {
  const {t,i18n} = useTranslation('global');
  const { setTitle } = useTitle();

  useEffect(() => {
        setTitle(t('sidenav.duplicateShipmentNumbers'));
  }, [setTitle ,t, i18n.language]);
  return (
    <>
      {/* form */}
      <form className="table_form form-style my-3 py-3">
        <div className="row align-items-center">
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light">{t("labels.clientType")}</label>
            <input type="text" name="client_type" />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light">{t("labels.shipmentNumber")}</label>
            <input type="text" name="shipment_number" />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light">{t("labels.report")}</label>
            <input type="text" name="report" />
          </div>
          
          <div className="col-xl-3 col-lg-3 col-md-6 col-12 text-center">
            <button className="btn show_result">{t("btns.viewResults")}</button>
            <button className="btn show_all">{t("btns.viewAll")}</button>
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
                  {t("labels.client")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.shipmentNumber")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.orders")}
                </th>
                
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="sub-text">1</td>
                <td className="sub-text">
                    <span className="d-block sub-text">{t('sidenav.corporate')}</span>
                    <span className="d-block text-color">شركة المطاحن الاولى</span>
                </td>
                <td className="text-color"> 100211529</td>
                <td className="highlight-green">
                 {t("labels.orders")}
                </td>
                
              </tr>
              <tr>
                <td className="sub-text">1</td>
                <td className="sub-text">
                    <span className="d-block sub-text">{t('sidenav.corporate')}</span>
                    <span className="d-block text-color">شركة المطاحن الاولى</span>
                </td>
                <td className="text-color"> 100211529</td>
                <td className="highlight-green">
                 {t("labels.orders")}
                </td>
                
              </tr>
              <tr>
                <td className="sub-text">1</td>
                <td className="sub-text">
                    <span className="d-block sub-text">{t('sidenav.corporate')}</span>
                    <span className="d-block text-color">شركة المطاحن الاولى</span>
                </td>
                <td className="text-color"> 100211529</td>
                <td className="highlight-green">
                 {t("labels.orders")}
                </td>
                
              </tr>
              <tr>
                <td className="sub-text">1</td>
                <td className="sub-text">
                    <span className="d-block sub-text">{t('sidenav.corporate')}</span>
                    <span className="d-block text-color">شركة المطاحن الاولى</span>
                </td>
                <td className="text-color"> 100211529</td>
                <td className="highlight-green">
                 {t("labels.orders")}
                </td>
                
              </tr>
              <tr>
                <td className="sub-text">1</td>
                <td className="sub-text">
                    <span className="d-block sub-text">{t('sidenav.corporate')}</span>
                    <span className="d-block text-color">شركة المطاحن الاولى</span>
                </td>
                <td className="text-color"> 100211529</td>
                <td className="highlight-green">
                 {t("labels.orders")}
                </td>
                
              </tr>
              <tr>
                <td className="sub-text">1</td>
                <td className="sub-text">
                    <span className="d-block sub-text">{t('sidenav.corporate')}</span>
                    <span className="d-block text-color">شركة المطاحن الاولى</span>
                </td>
                <td className="text-color"> 100211529</td>
                <td className="highlight-green">
                 {t("labels.orders")}
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

export default DuplicateShipmentNumbers;
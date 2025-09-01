import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import './exportOrders.css';
import { useTranslation } from 'react-i18next';
const ExportOrders = () => {
  const {t,i18n} = useTranslation('global');
  const { setTitle } = useTitle();
  
    useEffect(() => {
      setTitle(t('sidenav.exportRequests'));
    }, [setTitle, t, i18n.language]);
  return (
    <>
      {/* form */}
      <form className="table_form form-style my-3 py-3">
        <div className="row justify-content-center align-items-center">
          <div className="col-xl-3 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t('labels.createdBy')}</label>
            <select name="created_by">
              <option value="">{t('labels.selectItem')}</option>
            </select>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t('labels.orderNumber')}</label>
            <select name="order_number">
              <option value="">{t('labels.selectItem')}</option>
            </select>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t('labels.clientType')}</label>
            <select name="client_type">
              <option value="">{t('labels.selectItem')}</option>
            </select>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t('labels.type')}</label>
            <select name="type">
              <option value="">{t('labels.selectItem')}</option>
            </select>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t('labels.language')}</label>
            <select name="lang">
              <option value="">{t('labels.selectItem')}</option>
            </select>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t('labels.fileType')}</label>
            <select name="file_type">
              <option value="">{t('labels.selectItem')}</option>
            </select>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t('labels.status')}</label>
            <select name="status">
              <option value="">{t('labels.selectItem')}</option>
            </select>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-12 text-center">
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
                  {t('labels.referenceNumber')}
                </th>
                <th scope="col" className="text-lighter">
                  {t('sign.name')}
                </th>
                <th scope="col" className="text-lighter">
                 {t('labels.tripType')}
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.fileType')}
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.language')}
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.status')}
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.fromDate')}
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.toDate')}
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.expirationDate')}
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.createdBy')}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="sub-text">#</td>
                <td className="sub-text">EX2620</td>
                <td>
                  <span className="sub-text">قطاع الأعمال</span>
                  <b className="text-color d-block">شركة المطاحن الأولى</b>
                </td>
                <td className="sub-text">طلبات الرحلات</td>
                <td className="sub-text">Excel</td>
                <td className="sub-text">English</td>
                <td>
                  <b className="text-color d-block">{t('home.done')}</b>
                </td>
                <td className="sub-text">01/05/2025</td>
                <td className="sub-text">14/05/2025</td>
                <td>
                  <span className="sub-text">18/06/2025</span>
                  <b className="highlight-text d-block">{t('labels.remaining')} 28 {t('labels.day')}</b>
                </td>
                <td>
                  <b className="text-color">احمد ابراهيم بيومي </b>
                </td>
              </tr>
              <tr>
                <td className="sub-text">#</td>
                <td className="sub-text">EX2620</td>
                <td>
                  <span className="sub-text">قطاع الأعمال</span>
                  <b className="text-color d-block">شركة المطاحن الأولى</b>
                </td>
                <td className="sub-text">طلبات الرحلات</td>
                <td className="sub-text">Excel</td>
                <td className="sub-text">English</td>
                <td>
                  <b className="text-color d-block">{t('home.done')}</b>
                </td>
                <td className="sub-text">01/05/2025</td>
                <td className="sub-text">14/05/2025</td>
                <td>
                  <span className="sub-text">18/06/2025</span>
                  <b className="highlight-text d-block">{t('labels.remaining')} 28 {t('labels.day')}</b>
                </td>
                <td>
                  <b className="text-color">احمد ابراهيم بيومي </b>
                </td>
              </tr>
              <tr>
                <td className="sub-text">#</td>
                <td className="sub-text">EX2620</td>
                <td>
                  <span className="sub-text">قطاع الأعمال</span>
                  <b className="text-color d-block">شركة المطاحن الأولى</b>
                </td>
                <td className="sub-text">طلبات الرحلات</td>
                <td className="sub-text">Excel</td>
                <td className="sub-text">English</td>
                <td>
                  <b className="text-color d-block">{t('home.done')}</b>
                </td>
                <td className="sub-text">01/05/2025</td>
                <td className="sub-text">14/05/2025</td>
                <td>
                  <span className="sub-text">18/06/2025</span>
                  <b className="highlight-text d-block">{t('labels.remaining')} 28 {t('labels.day')}</b>
                </td>
                <td>
                  <b className="text-color">احمد ابراهيم بيومي </b>
                </td>
              </tr>
              <tr>
                <td className="sub-text">#</td>
                <td className="sub-text">EX2620</td>
                <td>
                  <span className="sub-text">قطاع الأعمال</span>
                  <b className="text-color d-block">شركة المطاحن الأولى</b>
                </td>
                <td className="sub-text">طلبات الرحلات</td>
                <td className="sub-text">Excel</td>
                <td className="sub-text">English</td>
                <td>
                  <b className="text-color d-block">{t('home.done')}</b>
                </td>
                <td className="sub-text">01/05/2025</td>
                <td className="sub-text">14/05/2025</td>
                <td>
                  <span className="sub-text">18/06/2025</span>
                  <b className="highlight-text d-block">{t('labels.remaining')} 28 {t('labels.day')}</b>
                </td>
                <td>
                  <b className="text-color">احمد ابراهيم بيومي </b>
                </td>
              </tr>
              <tr>
                <td className="sub-text">#</td>
                <td className="sub-text">EX2620</td>
                <td>
                  <span className="sub-text">قطاع الأعمال</span>
                  <b className="text-color d-block">شركة المطاحن الأولى</b>
                </td>
                <td className="sub-text">طلبات الرحلات</td>
                <td className="sub-text">Excel</td>
                <td className="sub-text">English</td>
                <td>
                  <b className="text-color d-block">{t('home.done')}</b>
                </td>
                <td className="sub-text">01/05/2025</td>
                <td className="sub-text">14/05/2025</td>
                <td>
                  <span className="sub-text">18/06/2025</span>
                  <b className="highlight-text d-block">{t('labels.remaining')} 28 {t('labels.day')}</b>
                </td>
                <td>
                  <b className="text-color">احمد ابراهيم بيومي </b>
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
            <a className="page-link" href="#" tabIndex="-1" aria-disabled="true"><i className="fa fa-caret-right"></i></a>
          </li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item active" aria-current="page">
            <a className="page-link" href="#">2 <span className="sr-only">(current)</span></a>
          </li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#"><i className="fa fa-caret-left"></i></a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default ExportOrders;
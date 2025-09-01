import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import "./businessSector.css";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const BusinessDocs = () => {
  const {t,i18n} = useTranslation('global');
  const { setTitle } = useTitle();

  useEffect(() => {
          setTitle(t('labels.businessDocuments'));
    }, [setTitle ,t, i18n.language]);
  return (
    <>
      {/* form */}
      <form className="table_form form-style my-3 py-3">
        <div className="row justify-content-center align-items-center">
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light"> {t('labels.documentNumber')} </label>
            <input name="doc_id" className="w-100 input-div" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t('labels.branch')} </label>
            <input name="branch" className="w-100 input-div" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light"> {t('labels.type')}</label>
            <input name="type" className="w-100 input-div" />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light">{t('labels.autoRenewal')} </label>
            <select name="auto_renew" className="w-100 input-div">
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light"> {t('labels.status')}</label>
            <select name="status" className="w-100 input-div">
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
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
                  {t('labels.documentNumber')}
                </th>
                <th scope="col" className="text-lighter">
                  {t('sign.name')}
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.type')}
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.autoRenewal')}
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.document')}
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.status')}
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.comments')}
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.expiryDate')}
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="sub-text">12</td>
                <td className="sub-text">BD391</td>
                <td className="text-color">Temp User</td>
                <td className="sub-text">{t('labels.commercialRegistration')}</td>
                <td className="sub-text">{t('labels.no')}</td>
                <td className="text-warning">
                  <a href="example" className="text-warning">
                    {t('labels.link')}
                  </a>
                </td>
                <td style={{ color: "#7ba946" }}>{t('labels.new')}</td>
                <td className="sub-text">-</td>
                <td className="sub-text">
                  <span className="sub-text d-block">12/10/2025</span>
                  <span className="text-danger d-block">{t('labels.remaining')} 140 {t('labels.day')}</span>
                </td>
                <td>
                  <Link to="">
                    <span className="text-lighter px-1 mx-1 mb-0">
                      <i className="bi bi-eye"></i>
                    </span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="sub-text">12</td>
                <td className="sub-text">BD391</td>
                <td className="text-color">Temp User</td>
                <td className="sub-text">{t('labels.commercialRegistration')}</td>
                <td className="sub-text">{t('labels.no')}</td>
                <td className="text-warning">
                  <a href="example" className="text-warning">
                    {t('labels.link')}
                  </a>
                </td>
                <td style={{ color: "#7ba946" }}>{t('labels.new')}</td>
                <td className="sub-text">-</td>
                <td className="sub-text">
                  <span className="sub-text d-block">12/10/2025</span>
                  <span className="text-danger d-block">{t('labels.remaining')} 140 {t('labels.day')}</span>
                </td>
                <td>
                  <Link to="">
                    <span className="text-lighter px-1 mx-1 mb-0">
                      <i className="bi bi-eye"></i>
                    </span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="sub-text">12</td>
                <td className="sub-text">BD391</td>
                <td className="text-color">Temp User</td>
                <td className="sub-text">{t('labels.commercialRegistration')}</td>
                <td className="sub-text">{t('labels.no')}</td>
                <td className="text-warning">
                  <a href="example" className="text-warning">
                    {t('labels.link')}
                  </a>
                </td>
                <td style={{ color: "#7ba946" }}>{t('labels.new')}</td>
                <td className="sub-text">-</td>
                <td className="sub-text">
                  <span className="sub-text d-block">12/10/2025</span>
                  <span className="text-danger d-block">{t('labels.remaining')} 140 {t('labels.day')}</span>
                </td>
                <td>
                  <Link to="">
                    <span className="text-lighter px-1 mx-1 mb-0">
                      <i className="bi bi-eye"></i>
                    </span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="sub-text">12</td>
                <td className="sub-text">BD391</td>
                <td className="text-color">Temp User</td>
                <td className="sub-text">{t('labels.commercialRegistration')}</td>
                <td className="sub-text">{t('labels.no')}</td>
                <td className="text-warning">
                  <a href="example" className="text-warning">
                    {t('labels.link')}
                  </a>
                </td>
                <td style={{ color: "#7ba946" }}>{t('labels.new')}</td>
                <td className="sub-text">-</td>
                <td className="sub-text">
                  <span className="sub-text d-block">12/10/2025</span>
                  <span className="text-danger d-block">{t('labels.remaining')} 140 {t('labels.day')}</span>
                </td>
                <td>
                  <Link to="">
                    <span className="text-lighter px-1 mx-1 mb-0">
                      <i className="bi bi-eye"></i>
                    </span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="sub-text">12</td>
                <td className="sub-text">BD391</td>
                <td className="text-color">Temp User</td>
                <td className="sub-text">{t('labels.commercialRegistration')}</td>
                <td className="sub-text">{t('labels.no')}</td>
                <td className="text-warning">
                  <a href="example" className="text-warning">
                    {t('labels.link')}
                  </a>
                </td>
                <td style={{ color: "#7ba946" }}>{t('labels.new')}</td>
                <td className="sub-text">-</td>
                <td className="sub-text">
                  <span className="sub-text d-block">12/10/2025</span>
                  <span className="text-danger d-block">{t('labels.remaining')} 140 {t('labels.day')}</span>
                </td>
                <td>
                  <Link to="">
                    <span className="text-lighter px-1 mx-1 mb-0">
                      <i className="bi bi-eye"></i>
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

export default BusinessDocs;
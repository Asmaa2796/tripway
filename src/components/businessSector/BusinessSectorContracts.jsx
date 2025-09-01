import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import "./businessSector.css";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const BusinessSectorContracts = () => {
  const {t,i18n} = useTranslation('global');
  const { setTitle } = useTitle();

  useEffect(() => {
        setTitle(t('sidenav.contracts'));
  }, [setTitle ,t, i18n.language]);
  return (
    <>
      {/* form */}
      <form className="table_form form-style my-3 py-3">
        <div className="row justify-content-center align-items-center">
          <div className="col-xl-3 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t('labels.contractNumber')}</label>
            <input name="contract_id" className="input-div" />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-12">
            <label className="text-light"> {t('sidenav.corporate')}</label>
            <input name="business_sector" className="input-div" />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t('labels.type')}</label>
            <input name="type" className="input-div" />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t('labels.autoRenewal')}</label>
            <select name="auto_renew" className="w-100 input-div">
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="text-light"> {t('labels.statusNumber')}</label>
            <select name="status_id" className="w-100 input-div">
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="text-light"> {t('labels.accountManager')}</label>
            <input name="account_manager" className="w-100 input-div" />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="text-light"> {t('labels.report')}</label>
            <input name="report" className="w-100 input-div" />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12 text-center">
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
                  {t('labels.contractNumber')}
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
                  {t('labels.contractImage')}
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.status')}
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.relatedContracts')}
                </th>
                <th scope="col" className="text-lighter">
                 {t('labels.accountManager')}
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
                <td className="sub-text">U953</td>
                <td className="text-color">Temp User</td>
                <td className="sub-text">عقد رئيسي (١)</td>
                <td className="sub-text">{t('labels.no')}</td>
                <td className="sub-text">{t('labels.nothing')}</td>
                <td className="text-color">{t('labels.active')}</td>
                <td className="sub-text">-</td>
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
                <td className="sub-text">U953</td>
                <td className="text-color">Temp User</td>
                <td className="sub-text">عقد رئيسي (١)</td>
                <td className="sub-text">{t('labels.no')}</td>
                <td className="sub-text">{t('labels.nothing')}</td>
                <td className="text-color">{t('labels.active')}</td>
                <td className="sub-text">-</td>
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
                <td className="sub-text">U953</td>
                <td className="text-color">Temp User</td>
                <td className="sub-text">عقد رئيسي (١)</td>
                <td className="sub-text">{t('labels.no')}</td>
                <td className="sub-text">
                  <img src="/img/placeholder.jpg" className="rounded" style={{width:"auto",maxHeight:"40px"}} alt="placeholder" />
                </td>
                <td className="text-color">{t('labels.active')}</td>
                <td className="sub-text">-</td>
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
                <td className="sub-text">U953</td>
                <td className="text-color">Temp User</td>
                <td className="sub-text">عقد رئيسي (١)</td>
                <td className="sub-text">{t('labels.no')}</td>
                <td className="sub-text">{t('labels.nothing')}</td>
                <td className="text-color">{t('labels.active')}</td>
                <td className="sub-text">-</td>
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
                <td className="sub-text">U953</td>
                <td className="text-color">Temp User</td>
                <td className="sub-text">عقد رئيسي (١)</td>
                <td className="sub-text">{t('labels.no')}</td>
                <td className="sub-text">
                  <img src="/img/placeholder.jpg" className="rounded" style={{width:"auto",maxHeight:"40px"}} alt="placeholder" />
                </td>
                <td className="text-color">{t('labels.active')}</td>
                <td className="sub-text">-</td>
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

export default BusinessSectorContracts;
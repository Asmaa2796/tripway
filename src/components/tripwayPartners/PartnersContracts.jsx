import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const PartnersContracts = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle(t('labels.tripwayPartnerContracts'));
  }, [setTitle, t, i18n.language]);
  return (
    <>
      {/* form */}
      <form className="table_form form-style my-3 py-3">
        <div className="row align-items-center">
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light">{t('labels.contractNumber')}</label>
            <input type="text" name="contractID" />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light">{t('labels.tripwayPartners')}</label>
            <input type="text" name="tripway_partners" />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light">{t('labels.type')}</label>
            <input type="text" name="type" />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light">{t("labels.autoRenewal")}</label>
            <input type="text" name="auto_renewal" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.status")}</label>
            <input type="text" name="status" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.report")}</label>
            <input type="text" name="report" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12 text-center">
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
                  {t('labels.contractNumber')}
                </th>
                <th scope="col" className="text-lighter">
                  {t("sign.name")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.type")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.autoRenewal")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.contractImage")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.status")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.relatedContracts")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.comments")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.expiryDate")}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text">23154</td>
                <td className="text-color">مؤسسة محمد عبيدالله عبدالله النجراني للنقليات</td>
                <td className="sub-text">عقد رئيسي (١)</td>
                <td className="sub-text">{t("labels.no")}</td>
                <td className="sub-text">
                  <img src="/img/placeholder.jpg" className="rounded" style={{width:"auto",maxHeight:"40px"}} alt="placeholder" />
                </td>
                <td className="sub-text">{t('labels.draft')}</td>
                <td className="sub-text">-</td>
                <td className="sub-text">-</td>
                <td className="sub-text">-</td>
              </tr>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text">23154</td>
                <td className="text-color">مؤسسة محمد عبيدالله عبدالله النجراني للنقليات</td>
                <td className="sub-text">عقد رئيسي (١)</td>
                <td className="sub-text">{t("labels.no")}</td>
                <td className="sub-text">
                  <img src="/img/placeholder.jpg" className="rounded" style={{width:"auto",maxHeight:"40px"}} alt="placeholder" />
                </td>
                <td className="sub-text">{t('labels.draft')}</td>
                <td className="sub-text">-</td>
                <td className="sub-text">-</td>
                <td className="sub-text">-</td>
              </tr>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text">23154</td>
                <td className="text-color">مؤسسة محمد عبيدالله عبدالله النجراني للنقليات</td>
                <td className="sub-text">عقد رئيسي (١)</td>
                <td className="sub-text">{t("labels.no")}</td>
                <td className="sub-text">
                  <img src="/img/placeholder.jpg" className="rounded" style={{width:"auto",maxHeight:"40px"}} alt="placeholder" />
                </td>
                <td className="sub-text">{t('labels.draft')}</td>
                <td className="sub-text">-</td>
                <td className="sub-text">-</td>
                <td className="sub-text">-</td>
              </tr>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text">23154</td>
                <td className="text-color">مؤسسة محمد عبيدالله عبدالله النجراني للنقليات</td>
                <td className="sub-text">عقد رئيسي (١)</td>
                <td className="sub-text">{t("labels.no")}</td>
                <td className="sub-text">
                  <img src="/img/placeholder.jpg" className="rounded" style={{width:"auto",maxHeight:"40px"}} alt="placeholder" />
                </td>
                <td className="sub-text">{t('labels.draft')}</td>
                <td className="sub-text">-</td>
                <td className="sub-text">-</td>
                <td className="sub-text">-</td>
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

export default PartnersContracts;
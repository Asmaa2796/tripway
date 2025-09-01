import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const OrderIssueReports = () => {
  const {t,i18n} = useTranslation('global');
  const { setTitle } = useTitle();

  useEffect(() => {
        setTitle(t('sidenav.orderIssueReports'));
  }, [setTitle ,t, i18n.language]);
  return (
    <>
      {/* form */}
      <form className="table_form form-style my-3 py-3">
        <div className="row align-items-center">
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">
              {t("labels.reportNumber")}
            </label>
            <input type="text" name="report_number" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.orderNumber")}</label>
            <input type="text" name="order_number" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.userType")}</label>
            <input type="text" name="user_type" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.reportType")}</label>
            <input type="text" name="report_type" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.status")}</label>
            <select name="status">
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
         
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light"> {t("labels.createdBy")}</label>
            <input type="text" name="created_by" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light"> {t("labels.actionTakenBy")}</label>
            <input type="text" name="action_taken_by" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light"> {t("labels.report")}</label>
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
                  {t("labels.reportNumber")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.orderNumber")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.userType")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.client")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.tripwayPartner")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.serviceProvider")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.serviceType")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.from")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.to")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.status")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.createdBy")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.actionTakenBy")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.date")}
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text">TI154</td>
                <td className="text-color">TO53657</td>
                <td className="text-color">سرقة</td>
                <td className="sub-text">
                  <span className="d-block">{t("sidenav.corporate")}</span>
                  <span className="text-color">شركة المطاحن الاولى</span>
                </td>
                <td className="sub-text"> - </td>
                <td className="text-color"> محمود احمد </td>
                <td className="sub-text"> دينا صغيرة (ثلاجة) </td>
                <td className="sub-text"> جدة </td>
                <td className="sub-text"> الرياض </td>
                <td className="text-warning"> {t("labels.wait")}</td>
                <td className="text-color"> احمد ابراهيم </td>
                <td className="text-color">زياد مدحت</td>
                <td className="sub-text" style={{direction:"ltr"}}>21/05/2025 02:52 PM</td>

                <td>
                  <div className="d-flex justify-content-center">
                    <Link to="">
                      <span className="text-lighter px-1 mx-1 mb-0">
                        <i className="bi bi-eye"></i>
                      </span>
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text">TI154</td>
                <td className="text-color">TO53657</td>
                <td className="text-color">سرقة</td>
                <td className="sub-text">
                  <span className="d-block">{t("sidenav.corporate")}</span>
                  <span className="text-color">شركة المطاحن الاولى</span>
                </td>
                <td className="sub-text"> - </td>
                <td className="text-color"> محمود احمد </td>
                <td className="sub-text"> دينا صغيرة (ثلاجة) </td>
                <td className="sub-text"> جدة </td>
                <td className="sub-text"> الرياض </td>
                <td className="text-warning"> {t("labels.wait")}</td>
                <td className="text-color"> احمد ابراهيم </td>
                <td className="text-color">زياد مدحت</td>
                <td className="sub-text" style={{direction:"ltr"}}>21/05/2025 02:52 PM</td>

                <td>
                  <div className="d-flex justify-content-center">
                    <Link to="">
                      <span className="text-lighter px-1 mx-1 mb-0">
                        <i className="bi bi-eye"></i>
                      </span>
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text">TI154</td>
                <td className="text-color">TO53657</td>
                <td className="text-color">سرقة</td>
                <td className="sub-text">
                  <span className="d-block">{t("sidenav.corporate")}</span>
                  <span className="text-color">شركة المطاحن الاولى</span>
                </td>
                <td className="sub-text"> - </td>
                <td className="text-color"> محمود احمد </td>
                <td className="sub-text"> دينا صغيرة (ثلاجة) </td>
                <td className="sub-text"> جدة </td>
                <td className="sub-text"> الرياض </td>
                <td className="text-warning"> {t("labels.wait")}</td>
                <td className="text-color"> احمد ابراهيم </td>
                <td className="text-color">زياد مدحت</td>
                <td className="sub-text" style={{direction:"ltr"}}>21/05/2025 02:52 PM</td>

                <td>
                  <div className="d-flex justify-content-center">
                    <Link to="">
                      <span className="text-lighter px-1 mx-1 mb-0">
                        <i className="bi bi-eye"></i>
                      </span>
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text">TI154</td>
                <td className="text-color">TO53657</td>
                <td className="text-color">سرقة</td>
                <td className="sub-text">
                  <span className="d-block">{t("sidenav.corporate")}</span>
                  <span className="text-color">شركة المطاحن الاولى</span>
                </td>
                <td className="sub-text"> - </td>
                <td className="text-color"> محمود احمد </td>
                <td className="sub-text"> دينا صغيرة (ثلاجة) </td>
                <td className="sub-text"> جدة </td>
                <td className="sub-text"> الرياض </td>
                <td className="text-warning"> {t("labels.wait")}</td>
                <td className="text-color"> احمد ابراهيم </td>
                <td className="text-color">زياد مدحت</td>
                <td className="sub-text" style={{direction:"ltr"}}>21/05/2025 02:52 PM</td>

                <td>
                  <div className="d-flex justify-content-center">
                    <Link to="">
                      <span className="text-lighter px-1 mx-1 mb-0">
                        <i className="bi bi-eye"></i>
                      </span>
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text">TI154</td>
                <td className="text-color">TO53657</td>
                <td className="text-color">سرقة</td>
                <td className="sub-text">
                  <span className="d-block">{t("sidenav.corporate")}</span>
                  <span className="text-color">شركة المطاحن الاولى</span>
                </td>
                <td className="sub-text"> - </td>
                <td className="text-color"> محمود احمد </td>
                <td className="sub-text"> دينا صغيرة (ثلاجة) </td>
                <td className="sub-text"> جدة </td>
                <td className="sub-text"> الرياض </td>
                <td className="text-warning"> {t("labels.wait")}</td>
                <td className="text-color"> احمد ابراهيم </td>
                <td className="text-color">زياد مدحت</td>
                <td className="sub-text" style={{direction:"ltr"}}>21/05/2025 02:52 PM</td>

                <td>
                  <div className="d-flex justify-content-center">
                    <Link to="">
                      <span className="text-lighter px-1 mx-1 mb-0">
                        <i className="bi bi-eye"></i>
                      </span>
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text">TI154</td>
                <td className="text-color">TO53657</td>
                <td className="text-color">سرقة</td>
                <td className="sub-text">
                  <span className="d-block">{t("sidenav.corporate")}</span>
                  <span className="text-color">شركة المطاحن الاولى</span>
                </td>
                <td className="sub-text"> - </td>
                <td className="text-color"> محمود احمد </td>
                <td className="sub-text"> دينا صغيرة (ثلاجة) </td>
                <td className="sub-text"> جدة </td>
                <td className="sub-text"> الرياض </td>
                <td className="text-warning"> {t("labels.wait")}</td>
                <td className="text-color"> احمد ابراهيم </td>
                <td className="text-color">زياد مدحت</td>
                <td className="sub-text" style={{direction:"ltr"}}>21/05/2025 02:52 PM</td>

                <td>
                  <div className="d-flex justify-content-center">
                    <Link to="">
                      <span className="text-lighter px-1 mx-1 mb-0">
                        <i className="bi bi-eye"></i>
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

export default OrderIssueReports;
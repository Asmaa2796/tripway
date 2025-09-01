import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const VehicleStatement = () => {
  const {t,i18n} = useTranslation('global');
  const { setTitle } = useTitle();

  useEffect(() => {
        setTitle(t('sidenav.vehicleStatement'));
  }, [setTitle ,t, i18n.language]);
  return (
    <>
      {/* form */}
      <form className="table_form form-style my-3 py-3">
        <div className="row align-items-center">
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.vehicle")}</label>
            <input type="text" name="vehicle" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.type")}</label>
            <input type="text" name="type" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.accountName")}</label>
            <select name="account_name">
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.viewVehiclePlate")}</label>
            <input type="text" name="view_vehicle_plate" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.fromDate")}</label>
            <input type="text" name="from_date" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.toDate")}</label>
            <input type="text" name="to_date" />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light">{t("labels.sortBy")}</label>
            <input type="text" name="sort_by" />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light">{t("labels.recordsPerPage")}</label>
            <input type="text" name="records_per_page" />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12 text-center">
            <button className="btn show_result">{t("btns.viewResults")}</button>
            <button className="btn show_all">{t("btns.viewAll")}</button>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12 text-center">
            <Link to="">
              <span
                className="btn btn-sm text-sm text-white px-3"
                style={{ marginTop: "45px",backgroundColor:"var(--green-color)" }}
              >
                {t("labels.exportReport")}
              </span>
            </Link>
          </div>
        </div>
      </form>
      <div className="text-center py-3 my-3">
        <b className="d-block">{t('labels.vehicleStatement')}</b>
        <div>{t('labels.from')}  01/04/2025 {t('labels.to')} 27/05/2025</div>
      </div>
      <div className="table_wrapper">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col" className="text-lighter">
                  #
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.date")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.account")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.vehicle")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.type")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.transactionDescription")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.reference")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.debit")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.credit")}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text" style={{direction:"ltr"}}>2025/04/01</td>
                <td className="sub-text">--</td>
                <td className="sub-text">أ س ر 8294</td>
                <td className="sub-text">طلب إيجار (عميل)</td>
                <td className="sub-text">إيجار - من تاريخ 01/04 إلى 30/04</td>
                <td className="text-color">R541654</td>
                <td className="sub-text">0</td>
                <td className="highlight-green">14.500</td>
              </tr>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text" style={{direction:"ltr"}}>2025/04/01</td>
                <td className="sub-text">--</td>
                <td className="sub-text">أ س ر 8294</td>
                <td className="sub-text">طلب إيجار (عميل)</td>
                <td className="sub-text">إيجار - من تاريخ 01/04 إلى 30/04</td>
                <td className="text-color">R541654</td>
                <td className="sub-text">0</td>
                <td className="highlight-green">14.500</td>
              </tr>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text" style={{direction:"ltr"}}>2025/04/01</td>
                <td className="sub-text">--</td>
                <td className="sub-text">أ س ر 8294</td>
                <td className="sub-text">طلب إيجار (عميل)</td>
                <td className="sub-text">إيجار - من تاريخ 01/04 إلى 30/04</td>
                <td className="text-color">R541654</td>
                <td className="sub-text">0</td>
                <td className="highlight-green">14.500</td>
              </tr>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text" style={{direction:"ltr"}}>2025/04/01</td>
                <td className="sub-text">--</td>
                <td className="sub-text">أ س ر 8294</td>
                <td className="sub-text">طلب إيجار (عميل)</td>
                <td className="sub-text">إيجار - من تاريخ 01/04 إلى 30/04</td>
                <td className="text-color">R541654</td>
                <td className="sub-text">0</td>
                <td className="highlight-green">14.500</td>
              </tr>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text" style={{direction:"ltr"}}>2025/04/01</td>
                <td className="sub-text">--</td>
                <td className="sub-text">أ س ر 8294</td>
                <td className="sub-text">طلب إيجار (عميل)</td>
                <td className="sub-text">إيجار - من تاريخ 01/04 إلى 30/04</td>
                <td className="text-color">R541654</td>
                <td className="sub-text">0</td>
                <td className="highlight-green">14.500</td>
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

export default VehicleStatement;
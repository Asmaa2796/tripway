import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const ClientOffers = () => {
  const {t,i18n} = useTranslation('global');
  const { setTitle } = useTitle();

  useEffect(() => {
        setTitle(t('sidenav.clientOffers'));
  }, [setTitle ,t, i18n.language]);
  return (
    <>
      {/* form */}
      <form className="table_form form-style my-3 py-3">
        <div className="row align-items-center">
         
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.offerNumber")}</label>
            <input type="text" name="offer_number" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.userType")}</label>
            <input type="text" name="user_type" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.responsibleName")}</label>
            <input type="text" name="responsible_name" />
          </div>
         
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.serviceType")}</label>
            <input type="text" name="service_type" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.offerType")}</label>
            <input type="text" name="offer_type" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.createdBy")}</label>
            <input type="text" name="created_by" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.offerResource")}</label>
            <input type="text" name="offer_resource" />
          </div>
          
          
          
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light"> {t("labels.pickupCity")}</label>
            <input type="text" name="pickup_city" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light"> {t("labels.dropoffCity")}</label>
            <input type="text" name="dropoff_city" />
          </div>
          
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light"> {t("labels.status")}</label>
            <input type="text" name="status" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light"> {t("labels.report")}</label>
            <input type="text" name="report" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12 text-center">
            <button className="btn show_result">{t("btns.viewResults")}</button>
            <button className="btn show_all">{t("btns.viewAll")}</button>
            <button
              type="button"
              className="btn btn-warning btn-sm text-dark text-sm px-3"
              style={{
                marginRight: "5px",
                marginTop: "5px",
                fontSize: "14px",
              }}
             
            >
              {t("labels.createQuoteCustomer")}
            </button>
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
                  {t("labels.orderNumber")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.client")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.responsibleName")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.orderType")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.status")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.linkedQuotations")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.requestSource")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.createdBy")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.requestDate")}
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text">23154</td>
                <td className="sub-text">
                  <span className="d-block">{t('sidenav.corporate')}</span>
                  <span className="text-color d-block">
                    شركة المطاحن الاولى
                  </span>
                </td>
                
                <td className="sub-text">عدنان الزهراني</td>
                <td className="sub-text">رحلات</td>
                
                <td className="highlight-green"> {t("labels.new")} </td>
                <td className="text-color"> تفاصيل </td>
                <td className="text-color"> احمد علي </td>
                <td className="text-color"> احمد علي </td>
                
                <td className="sub-text" style={{ direction: "ltr" }}>
                  {" "}
                  28/04/2025
                </td>

                <td>
                  <div className="d-flex">
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
                <td className="sub-text">23154</td>
                <td className="sub-text">
                  <span className="d-block">{t('sidenav.corporate')}</span>
                  <span className="text-color d-block">
                    شركة المطاحن الاولى
                  </span>
                </td>
                
                <td className="sub-text">عدنان الزهراني</td>
                <td className="sub-text">رحلات</td>
                
                <td className="highlight-green"> {t("labels.new")} </td>
                <td className="text-color"> تفاصيل </td>
                <td className="text-color"> احمد علي </td>
                <td className="text-color"> احمد علي </td>
                
                <td className="sub-text" style={{ direction: "ltr" }}>
                  {" "}
                  28/04/2025
                </td>

                <td>
                  <div className="d-flex">
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
                <td className="sub-text">23154</td>
                <td className="sub-text">
                  <span className="d-block">{t('sidenav.corporate')}</span>
                  <span className="text-color d-block">
                    شركة المطاحن الاولى
                  </span>
                </td>
                
                <td className="sub-text">عدنان الزهراني</td>
                <td className="sub-text">رحلات</td>
                
                <td className="highlight-green"> {t("labels.new")} </td>
                <td className="text-color"> تفاصيل </td>
                <td className="text-color"> احمد علي </td>
                <td className="text-color"> احمد علي </td>
                
                <td className="sub-text" style={{ direction: "ltr" }}>
                  {" "}
                  28/04/2025
                </td>

                <td>
                  <div className="d-flex">
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
                <td className="sub-text">23154</td>
                <td className="sub-text">
                  <span className="d-block">{t('sidenav.corporate')}</span>
                  <span className="text-color d-block">
                    شركة المطاحن الاولى
                  </span>
                </td>
                
                <td className="sub-text">عدنان الزهراني</td>
                <td className="sub-text">رحلات</td>
                
                <td className="highlight-green"> {t("labels.new")} </td>
                <td className="text-color"> تفاصيل </td>
                <td className="text-color"> احمد علي </td>
                <td className="text-color"> احمد علي </td>
                
                <td className="sub-text" style={{ direction: "ltr" }}>
                  {" "}
                  28/04/2025
                </td>

                <td>
                  <div className="d-flex">
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
                <td className="sub-text">23154</td>
                <td className="sub-text">
                  <span className="d-block">{t('sidenav.corporate')}</span>
                  <span className="text-color d-block">
                    شركة المطاحن الاولى
                  </span>
                </td>
                
                <td className="sub-text">عدنان الزهراني</td>
                <td className="sub-text">رحلات</td>
                
                <td className="highlight-green"> {t("labels.new")} </td>
                <td className="text-color"> تفاصيل </td>
                <td className="text-color"> احمد علي </td>
                <td className="text-color"> احمد علي </td>
                
                <td className="sub-text" style={{ direction: "ltr" }}>
                  {" "}
                  28/04/2025
                </td>

                <td>
                  <div className="d-flex">
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

export default ClientOffers;
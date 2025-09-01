import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const EditOrderPrices = () => {
  const {t,i18n} = useTranslation('global');
  const { setTitle } = useTitle();

  useEffect(() => {
        setTitle(t('sidenav.editOrderPrices'));
  }, [setTitle ,t, i18n.language]);
  return (
    <>
      {/* form */}
      <form className="table_form form-style my-3 py-3">
        <div className="row align-items-center">
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light">{t("labels.orderNumber")}</label>
            <input type="text" name="order_number" />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light">{t("labels.clientType")}</label>
            <input type="text" name="client_type" />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light">{t("labels.vehicle")}</label>
            <input type="text" name="vehicle" />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light">{t("labels.status")}</label>
            <select name="status">
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.serviceType")}</label>
            <select name="service_type">
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.tripwayPartner")}</label>
            <input type="text" name="tripway_partner" />
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
            <label className="text-light"> {t("labels.shipmentNumber")}</label>
            <input type="text" name="shipment_number" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light"> {t("labels.createdBy")}</label>
            <input type="text" name="created_by" />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light"> {t("labels.paymentStatus")}</label>
            <select name="payment_status" className="w-100">
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light"> {t("labels.report")}</label>
            <input type="text" name="report" />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12 text-center">
            <button className="btn show_result">{t("btns.viewResults")}</button>
            <button className="btn show_all">{t("btns.viewAll")}</button>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12 text-center">
            <Link to="">
              <span
                className="btn btn-warning btn-sm text-sm px-3"
                style={{ marginTop: "45px" }}
              >
                {t("labels.edit")}
              </span>
            </Link>
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
                  {t("labels.providerCost")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.clientPrice")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.taxIncluded")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.systemFeePercentage")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.createdBy")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.issueDate")}
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text">TO54004</td>
                <td className="sub-text">
                  <span className="d-block">قطاع الأعمال</span>
                  <span className="text-color d-block">
                    شركة المطاحن الاولى
                  </span>
                </td>
                <td className="sub-text">
                  <span className="d-block highlight-text">
                    برك سعيد محمد ظميدان
                  </span>
                  <span className="sub-text">{t("labels.confirmReceipt")}</span>
                </td>
                <td className="sub-text">تريلا ستارة جانبية</td>
                <td className="sub-text">عسفان</td>
                <td className="sub-text">الرياض</td>
                <td className="text-color"> {t("labels.acceptOrder")} </td>
                <td className="sub-text"> $ 1800 </td>
                <td className="sub-text"> $ 1800 </td>
                <td className="sub-text"> $ 1800 </td>
                <td className="sub-text"> $ 1800 </td>
                <td className="text-color"> زياد مدحت سمير </td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  {" "}
                  21/05/2025 02:52 PM{" "}
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
                <td className="sub-text">TO54004</td>
                <td className="sub-text">
                  <span className="d-block">قطاع الأعمال</span>
                  <span className="text-color d-block">
                    شركة المطاحن الاولى
                  </span>
                </td>
                <td className="sub-text">
                  <span className="d-block highlight-text">
                    برك سعيد محمد ظميدان
                  </span>
                  <span className="sub-text">{t("labels.confirmReceipt")}</span>
                </td>
                <td className="sub-text">تريلا ستارة جانبية</td>
                <td className="sub-text">عسفان</td>
                <td className="sub-text">الرياض</td>
                <td className="text-color"> {t("labels.acceptOrder")} </td>
                <td className="sub-text"> $ 1800 </td>
                <td className="sub-text"> $ 1800 </td>
                <td className="sub-text"> $ 1800 </td>
                <td className="sub-text"> $ 1800 </td>
                <td className="text-color"> زياد مدحت سمير </td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  {" "}
                  21/05/2025 02:52 PM{" "}
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
                <td className="sub-text">TO54004</td>
                <td className="sub-text">
                  <span className="d-block">قطاع الأعمال</span>
                  <span className="text-color d-block">
                    شركة المطاحن الاولى
                  </span>
                </td>
                <td className="sub-text">
                  <span className="d-block highlight-text">
                    برك سعيد محمد ظميدان
                  </span>
                  <span className="sub-text">{t("labels.confirmReceipt")}</span>
                </td>
                <td className="sub-text">تريلا ستارة جانبية</td>
                <td className="sub-text">عسفان</td>
                <td className="sub-text">الرياض</td>
                <td className="text-color"> {t("labels.acceptOrder")} </td>
                <td className="sub-text"> $ 1800 </td>
                <td className="sub-text"> $ 1800 </td>
                <td className="sub-text"> $ 1800 </td>
                <td className="sub-text"> $ 1800 </td>
                <td className="text-color"> زياد مدحت سمير </td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  {" "}
                  21/05/2025 02:52 PM{" "}
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
                <td className="sub-text">TO54004</td>
                <td className="sub-text">
                  <span className="d-block">قطاع الأعمال</span>
                  <span className="text-color d-block">
                    شركة المطاحن الاولى
                  </span>
                </td>
                <td className="sub-text">
                  <span className="d-block highlight-text">
                    برك سعيد محمد ظميدان
                  </span>
                  <span className="sub-text">{t("labels.confirmReceipt")}</span>
                </td>
                <td className="sub-text">تريلا ستارة جانبية</td>
                <td className="sub-text">عسفان</td>
                <td className="sub-text">الرياض</td>
                <td className="text-color"> {t("labels.acceptOrder")} </td>
                <td className="sub-text"> $ 1800 </td>
                <td className="sub-text"> $ 1800 </td>
                <td className="sub-text"> $ 1800 </td>
                <td className="sub-text"> $ 1800 </td>
                <td className="text-color"> زياد مدحت سمير </td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  {" "}
                  21/05/2025 02:52 PM{" "}
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
                <td className="sub-text">TO54004</td>
                <td className="sub-text">
                  <span className="d-block">قطاع الأعمال</span>
                  <span className="text-color d-block">
                    شركة المطاحن الاولى
                  </span>
                </td>
                <td className="sub-text">
                  <span className="d-block highlight-text">
                    برك سعيد محمد ظميدان
                  </span>
                  <span className="sub-text">{t("labels.confirmReceipt")}</span>
                </td>
                <td className="sub-text">تريلا ستارة جانبية</td>
                <td className="sub-text">عسفان</td>
                <td className="sub-text">الرياض</td>
                <td className="text-color"> {t("labels.acceptOrder")} </td>
                <td className="sub-text"> $ 1800 </td>
                <td className="sub-text"> $ 1800 </td>
                <td className="sub-text"> $ 1800 </td>
                <td className="sub-text"> $ 1800 </td>
                <td className="text-color"> زياد مدحت سمير </td>
                <td className="sub-text" style={{ direction: "ltr" }}>
                  {" "}
                  21/05/2025 02:52 PM{" "}
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

export default EditOrderPrices;
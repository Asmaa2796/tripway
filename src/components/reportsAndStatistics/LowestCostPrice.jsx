import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const LowestCostPrice = () => {
  const {t,i18n} = useTranslation('global');
  const { setTitle } = useTitle();

  useEffect(() => {
        setTitle(t('sidenav.lowestCostPrice'));
  }, [setTitle ,t, i18n.language]);
  return (
    <>
      {/* form */}
      <form className="table_form form-style my-3 py-3">
        <div className="row align-items-center">
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.userType")}</label>
            <input type="text" name="user_type" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.pickupCity")}</label>
            <input type="text" name="pickup_city" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.dropoffCity")}</label>
            <input type="text" name="dropoff_city" />
          </div>
          
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.serviceType")}</label>
            <input type="text" name="service_type" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.sortType")}</label>
            <input type="text" name="sort_type" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.order")}</label>
            <input type="text" name="order" />
          </div>
          
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light"> {t("labels.report")}</label>
            <input type="text" name="report" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12 text-center">
            <button className="btn show_result">{t("btns.viewResults")}</button>
            <button className="btn show_all">{t("btns.viewAll")}</button>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12 text-center">
            <button
              type="button"
              className="btn btn-success btn-sm text-sm px-3"
              style={{
                background: "var(--green-color)",
                marginRight: "5px",
                marginTop: "45px",
                fontSize: "14px",
              }}
              data-bs-toggle="modal"
              data-bs-target="#export"
            >
              {t("labels.exportOrders")}
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
      {/* Modal */}
      <div
        className="modal fade"
        id="export"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content border-light">
            <div className="modal-header pb-0 border-0 justify-content-end">
              <button
                type="button"
                className="close btn p-0"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body form-style">
              <b>{t("labels.orderNumberSearch")}</b>
              <input
                type="text"
                name="requirements"
                className="input-bg"
                placeholder={t("labels.enterRequirementsHere")}
              />
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn text-white btn-sm"
                style={{
                  background: "var(--green-color)",
                  marginRight: "5px",
                  fontSize: "13px",
                }}
              >
                {t("btns.export")}
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                style={{ fontSize: "13px" }}
                data-bs-dismiss="modal"
              >
                {t("btns.cancel")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LowestCostPrice;
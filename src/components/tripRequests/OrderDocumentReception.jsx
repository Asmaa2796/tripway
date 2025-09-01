import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const OrderDocumentReception = () => {
  const {t,i18n} = useTranslation('global');
  const { setTitle } = useTitle();

  useEffect(() => {
        setTitle(t('sidenav.orderDocumentReception'));
  }, [setTitle ,t, i18n.language]);
  return (
    <>
      {/* form */}
      <form className="table_form form-style my-3 py-3">
        <div className="row align-items-center">
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">
              {t("labels.serialNumber")}
            </label>
            <input type="text" name="serial_number" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.orderNumber")}</label>
            <input type="text" name="order_number" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.businessSector")}</label>
            <input type="text" name="business_sector" />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light">{t("labels.vehicle")}</label>
            <input type="text" name="vehicle" />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light">{t("labels.pickupCity")}</label>
            <input type="text" name="pickCity" />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light">{t("labels.dropoffCity")}</label>
            <input type="text" name="deropoff_city" />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light">{t("labels.shipmentNumber")}</label>
            <input type="text" name="shipment_number" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.status")}</label>
            <select name="status">
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.serviceType")}</label>
            <input type="text" name="service_type" />
          </div>
         
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light"> {t("labels.recipient")}</label>
            <input type="text" name="recipient" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light"> {t("labels.receivingOfficer")}</label>
            <input type="text" name="receiving_officer" />
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
                  {t("labels.orderNumber")}
                </th>
                
                <th scope="col" className="text-lighter">
                  {t("labels.client")}
                </th>
                
                <th scope="col" className="text-lighter">
                  {t("labels.serviceProvider")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.vehicle")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.serviceType")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.documents")}
                </th>
                
                <th scope="col" className="text-lighter">
                  {t("labels.status")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.recieved")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.recipient")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.recipientOfficer")}
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
                <td className="text-color">TO53657</td>
                <td className="sub-text">
                  <span className="d-block">{t("sidenav.corporate")}</span>
                  <span className="text-color">شركة المطاحن الاولى</span>
                </td>
                <td className="sub-text">
                  <span className="d-block highlight-color">برك سعيد محمد ظميدان</span>
                  <span className="text-color">{t('labels.confirmReceipt')}</span>
                </td>
                <td className="sub-text"> أ س ص 8940 </td>
                <td className="text-color"> ريلا ستارة جانبية</td>
                <td className="sub-text"> 1 </td>
                <td className="highlight-green"> {t('labels.new')} </td>
                <td className="sub-text"> 0 </td>
                <td className="text-color"> زياد مدحت ابراهيم</td>
                <td className="text-color"> محمود احمد مدحت</td>
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
                <td className="text-color">TO53657</td>
                <td className="sub-text">
                  <span className="d-block">{t("sidenav.corporate")}</span>
                  <span className="text-color">شركة المطاحن الاولى</span>
                </td>
                <td className="sub-text">
                  <span className="d-block highlight-color">برك سعيد محمد ظميدان</span>
                  <span className="text-color">{t('labels.confirmReceipt')}</span>
                </td>
                <td className="sub-text"> أ س ص 8940 </td>
                <td className="text-color"> ريلا ستارة جانبية</td>
                <td className="sub-text"> 1 </td>
                <td className="highlight-green"> {t('labels.new')} </td>
                <td className="sub-text"> 0 </td>
                <td className="text-color"> زياد مدحت ابراهيم</td>
                <td className="text-color"> محمود احمد مدحت</td>
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
                <td className="text-color">TO53657</td>
                <td className="sub-text">
                  <span className="d-block">{t("sidenav.corporate")}</span>
                  <span className="text-color">شركة المطاحن الاولى</span>
                </td>
                <td className="sub-text">
                  <span className="d-block highlight-color">برك سعيد محمد ظميدان</span>
                  <span className="text-color">{t('labels.confirmReceipt')}</span>
                </td>
                <td className="sub-text"> أ س ص 8940 </td>
                <td className="text-color"> ريلا ستارة جانبية</td>
                <td className="sub-text"> 1 </td>
                <td className="highlight-green"> {t('labels.new')} </td>
                <td className="sub-text"> 0 </td>
                <td className="text-color"> زياد مدحت ابراهيم</td>
                <td className="text-color"> محمود احمد مدحت</td>
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
                <td className="text-color">TO53657</td>
                <td className="sub-text">
                  <span className="d-block">{t("sidenav.corporate")}</span>
                  <span className="text-color">شركة المطاحن الاولى</span>
                </td>
                <td className="sub-text">
                  <span className="d-block highlight-color">برك سعيد محمد ظميدان</span>
                  <span className="text-color">{t('labels.confirmReceipt')}</span>
                </td>
                <td className="sub-text"> أ س ص 8940 </td>
                <td className="text-color"> ريلا ستارة جانبية</td>
                <td className="sub-text"> 1 </td>
                <td className="highlight-green"> {t('labels.new')} </td>
                <td className="sub-text"> 0 </td>
                <td className="text-color"> زياد مدحت ابراهيم</td>
                <td className="text-color"> محمود احمد مدحت</td>
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
                <td className="text-color">TO53657</td>
                <td className="sub-text">
                  <span className="d-block">{t("sidenav.corporate")}</span>
                  <span className="text-color">شركة المطاحن الاولى</span>
                </td>
                <td className="sub-text">
                  <span className="d-block highlight-color">برك سعيد محمد ظميدان</span>
                  <span className="text-color">{t('labels.confirmReceipt')}</span>
                </td>
                <td className="sub-text"> أ س ص 8940 </td>
                <td className="text-color"> ريلا ستارة جانبية</td>
                <td className="sub-text"> 1 </td>
                <td className="highlight-green"> {t('labels.new')} </td>
                <td className="sub-text"> 0 </td>
                <td className="text-color"> زياد مدحت ابراهيم</td>
                <td className="text-color"> محمود احمد مدحت</td>
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

export default OrderDocumentReception;
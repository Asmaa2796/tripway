import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const Taxes = () => {
  const {t,i18n} = useTranslation('global');
  const { setTitle } = useTitle();

  useEffect(() => {
        setTitle(t('sidenav.taxes'));
  }, [setTitle ,t, i18n.language]);
  return (
    <>
      {/* form */}
      <form className="table_form form-style my-3 py-3">
        <div className="row align-items-center">
         
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light">{t("labels.city")}</label>
            <input type="text" name="city" />
          </div>
          
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light">{t("labels.report")}</label>
            <input type="text" name="report" />
          </div>
          
          <div className="col-xl-3 col-lg-3 col-md-6 col-12 text-center">
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
                  {t("labels.vat")}
                </th>
            
                <th scope="col" className="text-lighter">
                  {t("labels.totalAmount")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.issueDate")}
                </th>
                
                
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-color">40000001</td>
                
                <td className="sub-text">TO54078</td>
                <td className="sub-text">$ 330</td>
                
                <td className="sub-text">$ 3250</td>
                <td className="sub-text" style={{direction:"ltr"}}>27/05/2025 - 11:32 AM</td>
                
              </tr>
              <tr>
                <td className="text-color">40000001</td>
                
                <td className="sub-text">TO54078</td>
                <td className="sub-text">$ 330</td>
                
                <td className="sub-text">$ 3250</td>
                <td className="sub-text" style={{direction:"ltr"}}>27/05/2025 - 11:32 AM</td>
                
              </tr>
              <tr>
                <td className="text-color">40000001</td>
                
                <td className="sub-text">TO54078</td>
                <td className="sub-text">$ 330</td>
                
                <td className="sub-text">$ 3250</td>
                <td className="sub-text" style={{direction:"ltr"}}>27/05/2025 - 11:32 AM</td>
                
              </tr>
              <tr>
                <td className="text-color">40000001</td>
                
                <td className="sub-text">TO54078</td>
                <td className="sub-text">$ 330</td>
                
                <td className="sub-text">$ 3250</td>
                <td className="sub-text" style={{direction:"ltr"}}>27/05/2025 - 11:32 AM</td>
                
              </tr>
              <tr>
                <td className="text-color">40000001</td>
                
                <td className="sub-text">TO54078</td>
                <td className="sub-text">$ 330</td>
                
                <td className="sub-text">$ 3250</td>
                <td className="sub-text" style={{direction:"ltr"}}>27/05/2025 - 11:32 AM</td>
                
              </tr>
            </tbody>
          </table>
          <div className="text-color my-3 text-center">
            <h5 className="my-0">{t('labels.totalTaxes')}: 11791380.26</h5>
          </div>
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

export default Taxes;
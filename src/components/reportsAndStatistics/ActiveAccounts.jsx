import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const ActiveAccounts = () => {
  const {t,i18n} = useTranslation('global');
  const { setTitle } = useTitle();

  useEffect(() => {
        setTitle(t('sidenav.activeAccounts'));
  }, [setTitle ,t, i18n.language]);
  return (
    <>
      {/* form */}
      <form className="table_form form-style my-3 py-3">
        <div className="row align-items-center">
         
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light">{t("labels.userType")}</label>
            <input type="text" name="user_type" />
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
                  {t("sign.name")}
                </th>
                <th scope="col" className="text-lighter">
                  {t("labels.numberOfOrders")}
                </th>
            
                <th scope="col" className="text-lighter">
                  {t("labels.percentage")}
                </th>
                
                
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="sub-text">40000001</td>
                
                <td className="text-color">محمود زيارة</td>
                <td className="text-color">1</td>
                
                <td className="sub-text">0.29%</td>
                
              </tr>
              <tr>
                <td className="sub-text">40000001</td>
                
                <td className="text-color">محمود زيارة</td>
                <td className="text-color">1</td>
                
                <td className="sub-text">0.29%</td>
                
              </tr>
              <tr>
                <td className="sub-text">40000001</td>
                
                <td className="text-color">محمود زيارة</td>
                <td className="text-color">1</td>
                
                <td className="sub-text">0.29%</td>
                
              </tr>
              <tr>
                <td className="sub-text">40000001</td>
                
                <td className="text-color">محمود زيارة</td>
                <td className="text-color">1</td>
                
                <td className="sub-text">0.29%</td>
                
              </tr>
              <tr>
                <td className="sub-text">40000001</td>
                
                <td className="text-color">محمود زيارة</td>
                <td className="text-color">1</td>
                
                <td className="sub-text">0.29%</td>
                
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

export default ActiveAccounts;
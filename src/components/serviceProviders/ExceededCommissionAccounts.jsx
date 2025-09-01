import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { useTranslation } from 'react-i18next';
const ExceededCommissionAccounts = () => {
  const {t,i18n} = useTranslation('global');
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle(t('labels.exceededCommissionAccounts'));
  }, [setTitle, t, i18n.language]);
  return (
    <>
      {/* form */}
      <form className="table_form form-style my-3 py-3">
        <div className="row align-items-center">
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t('sign.name')} </label>
             <input type="text" name="name" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12 text-center">
            <button className="btn show_result">{t('btns.viewResults')} </button>
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
                  {t('labels.clientID')} 
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.serviceProvider')} 
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.phone')}  
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.balance')} 
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.creditLimitExceeded')} 
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="sub-text">12</td>
                <td className="sub-text">30012976</td>
                <td className="text-color">Temp User</td>
                <td className="sub-text" style={{direction:"ltr"}}>+966 557116377</td>
                <td className="sub-text">$ 0</td>
                <td className="sub-text">$ 0</td>
              </tr>
              <tr>
                <td className="sub-text">12</td>
                <td className="sub-text">30012976</td>
                <td className="text-color">Temp User</td>
                <td className="sub-text" style={{direction:"ltr"}}>+966 557116377</td>
                <td className="sub-text">$ 0</td>
                <td className="sub-text">$ 0</td>
              </tr>
              <tr>
                <td className="sub-text">12</td>
                <td className="sub-text">30012976</td>
                <td className="text-color">Temp User</td>
                <td className="sub-text" style={{direction:"ltr"}}>+966 557116377</td>
                <td className="sub-text">$ 0</td>
                <td className="sub-text">$ 0</td>
              </tr>
              <tr>
                <td className="sub-text">12</td>
                <td className="sub-text">30012976</td>
                <td className="text-color">Temp User</td>
                <td className="sub-text" style={{direction:"ltr"}}>+966 557116377</td>
                <td className="sub-text">$ 0</td>
                <td className="sub-text">$ 0</td>
              </tr>
              <tr>
                <td className="sub-text">12</td>
                <td className="sub-text">30012976</td>
                <td className="text-color">Temp User</td>
                <td className="sub-text" style={{direction:"ltr"}}>+966 557116377</td>
                <td className="sub-text">$ 0</td>
                <td className="sub-text">$ 0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-center highlight-text my-3 py-3">
        {t('labels.exceededCommissionProvidersWalletTotal')} : 22015.09 $
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

export default ExceededCommissionAccounts;
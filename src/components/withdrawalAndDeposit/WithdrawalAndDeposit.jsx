import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { useTranslation } from 'react-i18next';
const Banks = () => {
  const {t,i18n} = useTranslation('global');
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle(t('sidenav.withdrawDeposit'));
  }, [setTitle, t, i18n.language]);
  return (
    <>
      {/* form */}
      <form className="table_form form-style my-3 py-3">
        <div className="row align-items-center">
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t('labels.userType')} </label>
             <input type="text" name="user_type" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t('labels.orderType')} </label>
             <input type="text" name="order_type" />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t('labels.paymentMethod')} </label>
             <select name="payment_method">
                <option value="1">1</option>
                <option value="2">2</option>
             </select>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t('labels.status')} </label>
             <select name="status">
                <option value="1">1</option>
                <option value="2">2</option>
             </select>
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
                  {t('labels.orderNumber')} 
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.orderType')} 
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.paymentMethod')} 
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.user')} 
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.userType')} 
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.currentBalance')} 
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.amount')} 
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.status')} 
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.createddBy')} 
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.actionTakenBy')} 
                </th>
                <th scope="col" className="text-lighter">
                  {t('labels.sendDate')} 
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text">23154</td>
                <td className="sub-text">{t('labels.withdraw')} </td>
                <td className="sub-text">-</td>
                <td className="sub-text">{t('labels.serviceProvider')}</td>
                <td className="text-color">حسن حسين</td>
                <td className="text-danger">$ 75 -</td>
                <td className="sub-text">$ 122</td>
                <td className="text-danger">{t('labels.refused')}</td>
                <td className="sub-text">-</td>
                <td className="sub-text">-</td>
                <td className="sub-text" style={{direction:"ltr"}}>21/05/2025 02:52 PM</td>
              </tr>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text">23154</td>
                <td className="sub-text">{t('labels.withdraw')} </td>
                <td className="sub-text">-</td>
                <td className="sub-text">{t('labels.serviceProvider')}</td>
                <td className="text-color">حسن حسين</td>
                <td className="text-danger">$ 75 -</td>
                <td className="sub-text">$ 122</td>
                <td className="text-danger">{t('labels.refused')}</td>
                <td className="sub-text">-</td>
                <td className="sub-text">-</td>
                <td className="sub-text" style={{direction:"ltr"}}>21/05/2025 02:52 PM</td>
              </tr>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text">23154</td>
                <td className="sub-text">{t('labels.withdraw')} </td>
                <td className="sub-text">-</td>
                <td className="sub-text">{t('labels.serviceProvider')}</td>
                <td className="text-color">حسن حسين</td>
                <td className="text-danger">$ 75 -</td>
                <td className="sub-text">$ 122</td>
                <td className="text-danger">{t('labels.refused')}</td>
                <td className="sub-text">-</td>
                <td className="sub-text">-</td>
                <td className="sub-text" style={{direction:"ltr"}}>21/05/2025 02:52 PM</td>
              </tr>
              <tr>
                <td className="sub-text">23154</td>
                <td className="sub-text">23154</td>
                <td className="sub-text">{t('labels.withdraw')} </td>
                <td className="sub-text">-</td>
                <td className="sub-text">{t('labels.serviceProvider')}</td>
                <td className="text-color">حسن حسين</td>
                <td className="text-danger">$ 75 -</td>
                <td className="sub-text">$ 122</td>
                <td className="text-danger">{t('labels.refused')}</td>
                <td className="sub-text">-</td>
                <td className="sub-text">-</td>
                <td className="sub-text" style={{direction:"ltr"}}>21/05/2025 02:52 PM</td>
              </tr>
            </tbody>
          </table>
        </div>
         <div className="total_amounts py-3">
            <b className="my-0 text-color">
             {t('labels.totalAmounts')} : 5286.00$
            </b>
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

export default Banks;
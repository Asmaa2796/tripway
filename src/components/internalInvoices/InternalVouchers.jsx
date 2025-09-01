import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const InternalVouchers = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle(t("sidenav.internalVouchers"));
  }, [setTitle, t, i18n.language]);

  return (
    <>
      {/* Nav tabs */}
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            id="internalSales-tab"
            data-bs-toggle="tab"
            href="#internalSales"
            role="tab"
          >
            {t("sidenav.internalSales")}
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="dueInvoices-tab"
            data-bs-toggle="tab"
            href="#dueInvoices"
            role="tab"
          >
            {t("labels.dueInvoices")}
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="draftInvoices-tab"
            data-bs-toggle="tab"
            href="#draftInvoices"
            role="tab"
          >
            {t("labels.draftInvoices")}
          </a>
        </li>
        
        <li className="nav-item">
          <a
            className="nav-link"
            id="deletedInvoices-tab"
            data-bs-toggle="tab"
            href="#deletedInvoices"
            role="tab"
          >
            {t("labels.deletedInvoices")}
          </a>
        </li>
      </ul>

      {/* Tab panes */}
      <div className="tab-content mt-3 my-3 py-3 div-bg">
        <div
          className="tab-pane fade show active"
          id="internalSales"
          role="tabpanel"
        >
          {/* form */}
          <form className="table_form form-style my-3 py-3">
            <div className="row align-items-center">
              
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">{t("labels.tripwayBranch")}</label>
                <input type="text" className="input-bg" name="tripway_branch" />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">{t("labels.noticeNumber")}</label>
                <input type="text" className="input-bg" name="notice_number" />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">{t("labels.clientType")}</label>
                <input type="text" className="input-bg" name="client_type" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light">{t("labels.client")}</label>
                <input type="text" className="input-bg" name="client" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light">{t("labels.totalPrice")}</label>
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-6">
                    <select name="from" className="input-bg w-100">
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-6">
                    <select name="to" className="input-bg w-100">
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light">{t("labels.usageStatus")}</label>
                <input type="text" className="input-bg" name="usage_status" />
              </div>
             
              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light">{t("labels.createdBy")} </label>
                <input name="createdBy" className="input-bg" />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">{t("labels.report")} </label>
                <input name="report" className="input-bg" />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12 text-center">
                <button className="btn show_result">
                  {t("btns.viewResults")}{" "}
                </button>
                <button className="btn show_all">{t("btns.viewAll")}</button>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12 text-center">
                <div>
                  <Link to="">
                  <span
                    className="btn btn-warning btn-sm text-sm px-3"
                    style={{ marginTop: "45px"}}
                  >
                    {t("labels.newVoucher")}
                  </span>
                </Link>
                <button
                  type="button"
                  className="btn btn-success btn-sm text-sm px-3"
                  style={{
                    background: "var(--green-color)",
                    marginRight: "5px",
                    marginTop: "45px",
                    fontSize: "14px"
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#export"
                >
                  {t("labels.exportInvoices")}
                </button>
                </div>
              </div>
              
            </div>
          </form>
          <div className="table_wrapper shadow-none">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col" className="text-lighter">
                      #
                    </th>
                    <th scope="col" className="text-lighter">
                      {t("labels.invoiceNumber")}
                    </th>
                    <th scope="col" className="text-lighter">
                      {t("labels.tripwayBranch")}
                    </th>
                    <th scope="col" className="text-lighter">
                      {t("labels.client")}
                    </th>
                    <th scope="col" className="text-lighter">
                      {t("labels.total")}
                    </th>
                    <th scope="col" className="text-lighter">
                      {t("labels.paymentStatus")}
                    </th>
                    <th scope="col" className="text-lighter">
                      {t("labels.remaining")}
                    </th>
                    <th scope="col" className="text-lighter">
                      {t("labels.invoiceMethod")}
                    </th>
                    
                    <th scope="col" className="text-lighter">
                      {t("labels.issueDate")}
                    </th>
                    <th scope="col" className="text-lighter">
                      {t("labels.dueDate")}
                    </th>
                    <th scope="col" className="text-lighter">
                      {t("labels.createdBy")}
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="sub-text">23154</td>
                    <td className="sub-text">PYT30785</td>
                    <td className="sub-text"> 
                        <span className="d-block">{t('labels.tripwayBranch')}</span> 
                        <span className="d-block text-color">شركة المطاحن الاولى</span> 
                    </td>
                    <td className="sub-text"> 
                        <span className="d-block">{t('labels.tripwayBranch')}</span> 
                        <span className="d-block text-color">شركة المطاحن الاولى</span> 
                    </td>
                    <td className="sub-text"> $ 2000 </td>
                    <td className="text-color"> {t('labels.paid')} </td>
                    <td className="sub-text"> $ 2000 </td>
                    <td className="sub-text"> {t('labels.consolidatedInvoice')} </td>
                    <td className="sub-text" style={{direction:"ltr"}}> 30/04/2025 </td>
                    <td className="sub-text" style={{direction:"ltr"}}> 30/04/2025 </td>
                    <td className="text-color"> شاهين عبد العزيز </td>
                    <td>
                      <div className="d-flex">
                        <Link to={``}>
                          <span className="text-lighter px-1 mx-1 mb-0">
                            <i className="bi bi-eye"></i>
                          </span>
                        </Link>
                        
                        <Link to={``}>
                          <span className="sub-text px-1 mx-1 mb-0">
                            <i className="bi bi-link-45deg"></i>
                          </span>
                        </Link>
                        <Link to={``}>
                          <span className="sub-text px-1 mx-1 mb-0">
                            <i className="bi bi-printer"></i>
                          </span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="sub-text">23154</td>
                    <td className="sub-text">PYT30785</td>
                    <td className="sub-text"> 
                        <span className="d-block">{t('labels.tripwayBranch')}</span> 
                        <span className="d-block text-color">شركة المطاحن الاولى</span> 
                    </td>
                    <td className="sub-text"> 
                        <span className="d-block">{t('labels.tripwayBranch')}</span> 
                        <span className="d-block text-color">شركة المطاحن الاولى</span> 
                    </td>
                    <td className="sub-text"> $ 2000 </td>
                    <td className="text-color"> {t('labels.paid')} </td>
                    <td className="sub-text"> $ 2000 </td>
                    <td className="sub-text"> {t('labels.consolidatedInvoice')} </td>
                    <td className="sub-text" style={{direction:"ltr"}}> 30/04/2025 </td>
                    <td className="sub-text" style={{direction:"ltr"}}> 30/04/2025 </td>
                    <td className="text-color"> شاهين عبد العزيز </td>
                    <td>
                      <div className="d-flex">
                        <Link to={``}>
                          <span className="text-lighter px-1 mx-1 mb-0">
                            <i className="bi bi-eye"></i>
                          </span>
                        </Link>
                        
                        <Link to={``}>
                          <span className="sub-text px-1 mx-1 mb-0">
                            <i className="bi bi-link-45deg"></i>
                          </span>
                        </Link>
                        <Link to={``}>
                          <span className="sub-text px-1 mx-1 mb-0">
                            <i className="bi bi-printer"></i>
                          </span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="sub-text">23154</td>
                    <td className="sub-text">PYT30785</td>
                    <td className="sub-text"> 
                        <span className="d-block">{t('labels.tripwayBranch')}</span> 
                        <span className="d-block text-color">شركة المطاحن الاولى</span> 
                    </td>
                    <td className="sub-text"> 
                        <span className="d-block">{t('labels.tripwayBranch')}</span> 
                        <span className="d-block text-color">شركة المطاحن الاولى</span> 
                    </td>
                    <td className="sub-text"> $ 2000 </td>
                    <td className="text-color"> {t('labels.paid')} </td>
                    <td className="sub-text"> $ 2000 </td>
                    <td className="sub-text"> {t('labels.consolidatedInvoice')} </td>
                    <td className="sub-text" style={{direction:"ltr"}}> 30/04/2025 </td>
                    <td className="sub-text" style={{direction:"ltr"}}> 30/04/2025 </td>
                    <td className="text-color"> شاهين عبد العزيز </td>
                    <td>
                      <div className="d-flex">
                        <Link to={``}>
                          <span className="text-lighter px-1 mx-1 mb-0">
                            <i className="bi bi-eye"></i>
                          </span>
                        </Link>
                        
                        <Link to={``}>
                          <span className="sub-text px-1 mx-1 mb-0">
                            <i className="bi bi-link-45deg"></i>
                          </span>
                        </Link>
                        <Link to={``}>
                          <span className="sub-text px-1 mx-1 mb-0">
                            <i className="bi bi-printer"></i>
                          </span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="sub-text">23154</td>
                    <td className="sub-text">PYT30785</td>
                    <td className="sub-text"> 
                        <span className="d-block">{t('labels.tripwayBranch')}</span> 
                        <span className="d-block text-color">شركة المطاحن الاولى</span> 
                    </td>
                    <td className="sub-text"> 
                        <span className="d-block">{t('labels.tripwayBranch')}</span> 
                        <span className="d-block text-color">شركة المطاحن الاولى</span> 
                    </td>
                    <td className="sub-text"> $ 2000 </td>
                    <td className="text-color"> {t('labels.paid')} </td>
                    <td className="sub-text"> $ 2000 </td>
                    <td className="sub-text"> {t('labels.consolidatedInvoice')} </td>
                    <td className="sub-text" style={{direction:"ltr"}}> 30/04/2025 </td>
                    <td className="sub-text" style={{direction:"ltr"}}> 30/04/2025 </td>
                    <td className="text-color"> شاهين عبد العزيز </td>
                    <td>
                      <div className="d-flex">
                        <Link to={``}>
                          <span className="text-lighter px-1 mx-1 mb-0">
                            <i className="bi bi-eye"></i>
                          </span>
                        </Link>
                        
                        <Link to={``}>
                          <span className="sub-text px-1 mx-1 mb-0">
                            <i className="bi bi-link-45deg"></i>
                          </span>
                        </Link>
                        <Link to={``}>
                          <span className="sub-text px-1 mx-1 mb-0">
                            <i className="bi bi-printer"></i>
                          </span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="sub-text">23154</td>
                    <td className="sub-text">PYT30785</td>
                    <td className="sub-text"> 
                        <span className="d-block">{t('labels.tripwayBranch')}</span> 
                        <span className="d-block text-color">شركة المطاحن الاولى</span> 
                    </td>
                    <td className="sub-text"> 
                        <span className="d-block">{t('labels.tripwayBranch')}</span> 
                        <span className="d-block text-color">شركة المطاحن الاولى</span> 
                    </td>
                    <td className="sub-text"> $ 2000 </td>
                    <td className="text-color"> {t('labels.paid')} </td>
                    <td className="sub-text"> $ 2000 </td>
                    <td className="sub-text"> {t('labels.consolidatedInvoice')} </td>
                    <td className="sub-text" style={{direction:"ltr"}}> 30/04/2025 </td>
                    <td className="sub-text" style={{direction:"ltr"}}> 30/04/2025 </td>
                    <td className="text-color"> شاهين عبد العزيز </td>
                    <td>
                      <div className="d-flex">
                        <Link to={``}>
                          <span className="text-lighter px-1 mx-1 mb-0">
                            <i className="bi bi-eye"></i>
                          </span>
                        </Link>
                        
                        <Link to={``}>
                          <span className="sub-text px-1 mx-1 mb-0">
                            <i className="bi bi-link-45deg"></i>
                          </span>
                        </Link>
                        <Link to={``}>
                          <span className="sub-text px-1 mx-1 mb-0">
                            <i className="bi bi-printer"></i>
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
        </div>
        <div className="tab-pane fade" id="dueInvoices" role="tabpanel">
          --
        </div>
        <div className="tab-pane fade" id="draftInvoices" role="tabpanel">
          --
        </div>
        <div className="tab-pane fade" id="creditNotes" role="tabpanel">
          --
        </div>
        <div className="tab-pane fade" id="deletedInvoices" role="tabpanel">
          --
        </div>
      </div>
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
              --
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

export default InternalVouchers;

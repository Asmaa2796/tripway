import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const VehiclesPlural = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle(t("labels.vehiclesPlural"));
  }, [setTitle, t, i18n.language]);
  return (
    <>
      {/* Nav tabs */}
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            id="all-tab"
            data-bs-toggle="tab"
            href="#all"
            role="tab"
          >
            {t('labels.all')}
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="fleet-tab"
            data-bs-toggle="tab"
            href="#fleet"
            role="tab"
          >
            {t('labels.fleet')}
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="rent-tab"
            data-bs-toggle="tab"
            href="#rent"
            role="tab"
          >
            {t('labels.rent')}
          </a>
        </li>
      </ul>

      {/* Tab panes */}
      <div className="tab-content mt-3 my-3 py-3 div-bg">
        <div className="tab-pane fade show active" id="all" role="tabpanel">
          {/* form */}
          <form className="table_form form-style my-3 py-3">
            <div className="row align-items-center">
              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light"> {t('labels.serviceType')} </label>
                <input type="text" className="input-bg" name="service_type" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light">{t('labels.transporterType')}</label>
                <input type="text" className="input-bg" name="transporter_type" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light">{t('labels.vehiclePlateType')}</label>
                <select name="vehicle_plate_type" className="input-bg w-100">
                  <option value="">{t("labels.selectItem")} </option>
                </select>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light">{t('labels.vehiclePlate')}</label>
                <input type="text" className="input-bg" name="vehicle_plate" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light">{t('labels.ownerIdNumber')}</label>
                <input type="text" className="input-bg" name="owner_id_number" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light">{t('labels.tripwayPartner')}</label>
                <input type="text" className="input-bg" name="tripway_partner" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light">{t('labels.driver')}</label>
                <input type="text" className="input-bg" name="driver" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light">{t('labels.manufactureYear')} </label>
                <select name="status" className="input-bg w-100">
                  <option value=""> {t("labels.selectItem")} </option>
                </select>
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
                <Link to="add_vehicle">
                  <span
                    className="btn btn-warning btn-sm text-sm px-3"
                    style={{ marginTop: "45px" }}
                  >
                    {t('btns.addVehicle')}
                  </span>
                </Link>
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
                  {t("btns.export")}
                </button>
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
                      {t('labels.serviceType')}
                    </th>
                    <th scope="col" className="text-lighter">
                      {t('labels.vehiclePlate')}
                    </th>
                    <th scope="col" className="text-lighter">
                     {t('labels.ownerIdNumber')}
                    </th>
                    <th scope="col" className="text-lighter">
                      {t('labels.tripwayPartner')}
                    </th>
                    <th scope="col" className="text-lighter">
                      {t('labels.driver')}
                    </th>
                    <th scope="col" className="text-lighter">
                     {t('labels.vehiclePlateType')}
                    </th>
                    <th scope="col" className="text-lighter">
                     {t('labels.manufacturerCompany')}
                    </th>
                    <th scope="col" className="text-lighter">
                      {t('labels.manufactureYear')}
                    </th>
                    <th scope="col" className="text-lighter">
                     {t('labels.registrationDate')}
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="sub-text">23154</td>
                    <td className="sub-text">تريلا سطحة</td>
                    <td className="sub-text">
                      <img
                        src="/img/placeholder.png"
                        className="rounded"
                        style={{ width: "auto", maxHeight: "40px" }}
                        alt="placeholder"
                      />
                    </td>
                    <td className="sub-text"> 2564164984 </td>
                    <td className="sub-text"> - </td>
                    <td className="text-color"> فايز بن عبدالرحمن الحربي </td>
                    <td className="sub-text"> نقل عام</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text" style={{ direction: "ltr" }}>
                      {" "}
                      21/05/2025 02:52 PM
                    </td>
                    <td>
                      <div className="d-flex">
                        <Link to={``}>
                        <span className="text-lighter px-1 mx-1 mb-0">
                          <i className="bi bi-eye"></i>
                        </span>
                      </Link>
                      <Link to={``}>
                        <span className="text-color px-1 mx-1 mb-0">
                          <i className="bi bi-pen"></i>
                        </span>
                      </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="sub-text">23154</td>
                    <td className="sub-text">تريلا سطحة</td>
                    <td className="sub-text">
                      <img
                        src="/img/placeholder.png"
                        className="rounded"
                        style={{ width: "auto", maxHeight: "40px" }}
                        alt="placeholder"
                      />
                    </td>
                    <td className="sub-text"> 2564164984 </td>
                    <td className="sub-text"> - </td>
                    <td className="text-color"> فايز بن عبدالرحمن الحربي </td>
                    <td className="sub-text"> نقل عام</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text" style={{ direction: "ltr" }}>
                      {" "}
                      21/05/2025 02:52 PM
                    </td>
                    <td>
                      <div className="d-flex">
                        <Link to={``}>
                        <span className="text-lighter px-1 mx-1 mb-0">
                          <i className="bi bi-eye"></i>
                        </span>
                      </Link>
                      <Link to={``}>
                        <span className="text-color px-1 mx-1 mb-0">
                          <i className="bi bi-pen"></i>
                        </span>
                      </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="sub-text">23154</td>
                    <td className="sub-text">تريلا سطحة</td>
                    <td className="sub-text">
                      <img
                        src="/img/placeholder.png"
                        className="rounded"
                        style={{ width: "auto", maxHeight: "40px" }}
                        alt="placeholder"
                      />
                    </td>
                    <td className="sub-text"> 2564164984 </td>
                    <td className="sub-text"> - </td>
                    <td className="text-color"> فايز بن عبدالرحمن الحربي </td>
                    <td className="sub-text"> نقل عام</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text" style={{ direction: "ltr" }}>
                      {" "}
                      21/05/2025 02:52 PM
                    </td>
                    <td>
                      <div className="d-flex">
                        <Link to={``}>
                        <span className="text-lighter px-1 mx-1 mb-0">
                          <i className="bi bi-eye"></i>
                        </span>
                      </Link>
                      <Link to={``}>
                        <span className="text-color px-1 mx-1 mb-0">
                          <i className="bi bi-pen"></i>
                        </span>
                      </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="sub-text">23154</td>
                    <td className="sub-text">تريلا سطحة</td>
                    <td className="sub-text">
                      <img
                        src="/img/placeholder.png"
                        className="rounded"
                        style={{ width: "auto", maxHeight: "40px" }}
                        alt="placeholder"
                      />
                    </td>
                    <td className="sub-text"> 2564164984 </td>
                    <td className="sub-text"> - </td>
                    <td className="text-color"> فايز بن عبدالرحمن الحربي </td>
                    <td className="sub-text"> نقل عام</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text" style={{ direction: "ltr" }}>
                      {" "}
                      21/05/2025 02:52 PM
                    </td>
                    <td>
                      <div className="d-flex">
                        <Link to={``}>
                        <span className="text-lighter px-1 mx-1 mb-0">
                          <i className="bi bi-eye"></i>
                        </span>
                      </Link>
                      <Link to={``}>
                        <span className="text-color px-1 mx-1 mb-0">
                          <i className="bi bi-pen"></i>
                        </span>
                      </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="sub-text">23154</td>
                    <td className="sub-text">تريلا سطحة</td>
                    <td className="sub-text">
                      <img
                        src="/img/placeholder.png"
                        className="rounded"
                        style={{ width: "auto", maxHeight: "40px" }}
                        alt="placeholder"
                      />
                    </td>
                    <td className="sub-text"> 2564164984 </td>
                    <td className="sub-text"> - </td>
                    <td className="text-color"> فايز بن عبدالرحمن الحربي </td>
                    <td className="sub-text"> نقل عام</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text" style={{ direction: "ltr" }}>
                      {" "}
                      21/05/2025 02:52 PM
                    </td>
                    <td>
                      <div className="d-flex">
                        <Link to={``}>
                        <span className="text-lighter px-1 mx-1 mb-0">
                          <i className="bi bi-eye"></i>
                        </span>
                      </Link>
                      <Link to={``}>
                        <span className="text-color px-1 mx-1 mb-0">
                          <i className="bi bi-pen"></i>
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
        <div className="tab-pane fade" id="fleet" role="tabpanel">
          {/* form */}
          <form className="table_form form-style my-3 py-3">
            <div className="row align-items-center">
              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light"> {t('labels.serviceType')} </label>
                <input type="text" className="input-bg" name="from" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light">{t('labels.transporterType')}</label>
                <input type="text" className="input-bg" name="to" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light">{t('labels.vehiclePlateType')}</label>
                <select name="status" className="input-bg w-100">
                  <option value="">{t("labels.selectItem")} </option>
                </select>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light">{t('labels.vehiclePlate')}</label>
                <input type="text" className="input-bg" name="to" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light">{t('labels.ownerIdNumber')}</label>
                <input type="text" className="input-bg" name="to" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light">{t('labels.tripwayPartner')}</label>
                <input type="text" className="input-bg" name="to" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light">{t('labels.driver')}</label>
                <input type="text" className="input-bg" name="to" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light">{t('labels.manufactureYear')} </label>
                <select name="status" className="input-bg w-100">
                  <option value=""> {t("labels.selectItem")} </option>
                </select>
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
                <Link to="add_vehicle">
                  <span
                    className="btn btn-warning btn-sm text-sm px-3"
                    style={{ marginTop: "45px" }}
                  >
                    {t('btns.addVehicle')}
                  </span>
                </Link>
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
                  {t("btns.export")}
                </button>
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
                      {t('labels.serviceType')}
                    </th>
                    <th scope="col" className="text-lighter">
                      {t('labels.vehiclePlate')}
                    </th>
                    <th scope="col" className="text-lighter">
                     {t('labels.ownerIdNumber')}
                    </th>
                    <th scope="col" className="text-lighter">
                      {t('labels.tripwayPartner')}
                    </th>
                    <th scope="col" className="text-lighter">
                      {t('labels.driver')}
                    </th>
                    <th scope="col" className="text-lighter">
                     {t('labels.vehiclePlateType')}
                    </th>
                    <th scope="col" className="text-lighter">
                     {t('labels.manufacturerCompany')}
                    </th>
                    <th scope="col" className="text-lighter">
                      {t('labels.manufactureYear')}
                    </th>
                    <th scope="col" className="text-lighter">
                     {t('labels.registrationDate')}
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="sub-text">23154</td>
                    <td className="sub-text">تريلا سطحة</td>
                    <td className="sub-text">
                      <img
                        src="/img/placeholder.png"
                        className="rounded"
                        style={{ width: "auto", maxHeight: "40px" }}
                        alt="placeholder"
                      />
                    </td>
                    <td className="sub-text"> 2564164984 </td>
                    <td className="sub-text"> - </td>
                    <td className="text-color"> فايز بن عبدالرحمن الحربي </td>
                    <td className="sub-text"> نقل عام</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text" style={{ direction: "ltr" }}>
                      {" "}
                      21/05/2025 02:52 PM
                    </td>
                    <td>
                      <div className="d-flex">
                        <Link to={``}>
                        <span className="text-lighter px-1 mx-1 mb-0">
                          <i className="bi bi-eye"></i>
                        </span>
                      </Link>
                      <Link to={``}>
                        <span className="text-color px-1 mx-1 mb-0">
                          <i className="bi bi-pen"></i>
                        </span>
                      </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="sub-text">23154</td>
                    <td className="sub-text">تريلا سطحة</td>
                    <td className="sub-text">
                      <img
                        src="/img/placeholder.png"
                        className="rounded"
                        style={{ width: "auto", maxHeight: "40px" }}
                        alt="placeholder"
                      />
                    </td>
                    <td className="sub-text"> 2564164984 </td>
                    <td className="sub-text"> - </td>
                    <td className="text-color"> فايز بن عبدالرحمن الحربي </td>
                    <td className="sub-text"> نقل عام</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text" style={{ direction: "ltr" }}>
                      {" "}
                      21/05/2025 02:52 PM
                    </td>
                    <td>
                      <div className="d-flex">
                        <Link to={``}>
                        <span className="text-lighter px-1 mx-1 mb-0">
                          <i className="bi bi-eye"></i>
                        </span>
                      </Link>
                      <Link to={``}>
                        <span className="text-color px-1 mx-1 mb-0">
                          <i className="bi bi-pen"></i>
                        </span>
                      </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="sub-text">23154</td>
                    <td className="sub-text">تريلا سطحة</td>
                    <td className="sub-text">
                      <img
                        src="/img/placeholder.png"
                        className="rounded"
                        style={{ width: "auto", maxHeight: "40px" }}
                        alt="placeholder"
                      />
                    </td>
                    <td className="sub-text"> 2564164984 </td>
                    <td className="sub-text"> - </td>
                    <td className="text-color"> فايز بن عبدالرحمن الحربي </td>
                    <td className="sub-text"> نقل عام</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text" style={{ direction: "ltr" }}>
                      {" "}
                      21/05/2025 02:52 PM
                    </td>
                    <td>
                      <div className="d-flex">
                        <Link to={``}>
                        <span className="text-lighter px-1 mx-1 mb-0">
                          <i className="bi bi-eye"></i>
                        </span>
                      </Link>
                      <Link to={``}>
                        <span className="text-color px-1 mx-1 mb-0">
                          <i className="bi bi-pen"></i>
                        </span>
                      </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="sub-text">23154</td>
                    <td className="sub-text">تريلا سطحة</td>
                    <td className="sub-text">
                      <img
                        src="/img/placeholder.png"
                        className="rounded"
                        style={{ width: "auto", maxHeight: "40px" }}
                        alt="placeholder"
                      />
                    </td>
                    <td className="sub-text"> 2564164984 </td>
                    <td className="sub-text"> - </td>
                    <td className="text-color"> فايز بن عبدالرحمن الحربي </td>
                    <td className="sub-text"> نقل عام</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text" style={{ direction: "ltr" }}>
                      {" "}
                      21/05/2025 02:52 PM
                    </td>
                    <td>
                      <div className="d-flex">
                        <Link to={``}>
                        <span className="text-lighter px-1 mx-1 mb-0">
                          <i className="bi bi-eye"></i>
                        </span>
                      </Link>
                      <Link to={``}>
                        <span className="text-color px-1 mx-1 mb-0">
                          <i className="bi bi-pen"></i>
                        </span>
                      </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="sub-text">23154</td>
                    <td className="sub-text">تريلا سطحة</td>
                    <td className="sub-text">
                      <img
                        src="/img/placeholder.png"
                        className="rounded"
                        style={{ width: "auto", maxHeight: "40px" }}
                        alt="placeholder"
                      />
                    </td>
                    <td className="sub-text"> 2564164984 </td>
                    <td className="sub-text"> - </td>
                    <td className="text-color"> فايز بن عبدالرحمن الحربي </td>
                    <td className="sub-text"> نقل عام</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text" style={{ direction: "ltr" }}>
                      {" "}
                      21/05/2025 02:52 PM
                    </td>
                    <td>
                      <div className="d-flex">
                        <Link to={``}>
                        <span className="text-lighter px-1 mx-1 mb-0">
                          <i className="bi bi-eye"></i>
                        </span>
                      </Link>
                      <Link to={``}>
                        <span className="text-color px-1 mx-1 mb-0">
                          <i className="bi bi-pen"></i>
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
        <div className="tab-pane fade" id="rent" role="tabpanel">
          {/* form */}
          <form className="table_form form-style my-3 py-3">
            <div className="row align-items-center">
              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light"> {t('labels.serviceType')} </label>
                <input type="text" className="input-bg" name="from" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light">{t('labels.transporterType')}</label>
                <input type="text" className="input-bg" name="to" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light">{t('labels.vehiclePlateType')}</label>
                <select name="status" className="input-bg w-100">
                  <option value="">{t("labels.selectItem")} </option>
                </select>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light">{t('labels.vehiclePlate')}</label>
                <input type="text" className="input-bg" name="to" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light">{t('labels.ownerIdNumber')}</label>
                <input type="text" className="input-bg" name="to" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light">{t('labels.tripwayPartner')}</label>
                <input type="text" className="input-bg" name="to" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light">{t('labels.driver')}</label>
                <input type="text" className="input-bg" name="to" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                <label className="text-light">{t('labels.manufactureYear')} </label>
                <select name="status" className="input-bg w-100">
                  <option value=""> {t("labels.selectItem")} </option>
                </select>
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
                <Link to="add_vehicle">
                  <span
                    className="btn btn-warning btn-sm text-sm px-3"
                    style={{ marginTop: "45px" }}
                  >
                    {t('btns.addVehicle')}
                  </span>
                </Link>
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
                  {t("btns.export")}
                </button>
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
                      {t('labels.serviceType')}
                    </th>
                    <th scope="col" className="text-lighter">
                      {t('labels.vehiclePlate')}
                    </th>
                    <th scope="col" className="text-lighter">
                     {t('labels.ownerIdNumber')}
                    </th>
                    <th scope="col" className="text-lighter">
                      {t('labels.tripwayPartner')}
                    </th>
                    <th scope="col" className="text-lighter">
                      {t('labels.driver')}
                    </th>
                    <th scope="col" className="text-lighter">
                     {t('labels.vehiclePlateType')}
                    </th>
                    <th scope="col" className="text-lighter">
                     {t('labels.manufacturerCompany')}
                    </th>
                    <th scope="col" className="text-lighter">
                      {t('labels.manufactureYear')}
                    </th>
                    <th scope="col" className="text-lighter">
                     {t('labels.registrationDate')}
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="sub-text">23154</td>
                    <td className="sub-text">تريلا سطحة</td>
                    <td className="sub-text">
                      <img
                        src="/img/placeholder.png"
                        className="rounded"
                        style={{ width: "auto", maxHeight: "40px" }}
                        alt="placeholder"
                      />
                    </td>
                    <td className="sub-text"> 2564164984 </td>
                    <td className="sub-text"> - </td>
                    <td className="text-color"> فايز بن عبدالرحمن الحربي </td>
                    <td className="sub-text"> نقل عام</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text" style={{ direction: "ltr" }}>
                      {" "}
                      21/05/2025 02:52 PM
                    </td>
                    <td>
                      <div className="d-flex">
                        <Link to={``}>
                        <span className="text-lighter px-1 mx-1 mb-0">
                          <i className="bi bi-eye"></i>
                        </span>
                      </Link>
                      <Link to={``}>
                        <span className="text-color px-1 mx-1 mb-0">
                          <i className="bi bi-pen"></i>
                        </span>
                      </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="sub-text">23154</td>
                    <td className="sub-text">تريلا سطحة</td>
                    <td className="sub-text">
                      <img
                        src="/img/placeholder.png"
                        className="rounded"
                        style={{ width: "auto", maxHeight: "40px" }}
                        alt="placeholder"
                      />
                    </td>
                    <td className="sub-text"> 2564164984 </td>
                    <td className="sub-text"> - </td>
                    <td className="text-color"> فايز بن عبدالرحمن الحربي </td>
                    <td className="sub-text"> نقل عام</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text" style={{ direction: "ltr" }}>
                      {" "}
                      21/05/2025 02:52 PM
                    </td>
                    <td>
                      <div className="d-flex">
                        <Link to={``}>
                        <span className="text-lighter px-1 mx-1 mb-0">
                          <i className="bi bi-eye"></i>
                        </span>
                      </Link>
                      <Link to={``}>
                        <span className="text-color px-1 mx-1 mb-0">
                          <i className="bi bi-pen"></i>
                        </span>
                      </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="sub-text">23154</td>
                    <td className="sub-text">تريلا سطحة</td>
                    <td className="sub-text">
                      <img
                        src="/img/placeholder.png"
                        className="rounded"
                        style={{ width: "auto", maxHeight: "40px" }}
                        alt="placeholder"
                      />
                    </td>
                    <td className="sub-text"> 2564164984 </td>
                    <td className="sub-text"> - </td>
                    <td className="text-color"> فايز بن عبدالرحمن الحربي </td>
                    <td className="sub-text"> نقل عام</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text" style={{ direction: "ltr" }}>
                      {" "}
                      21/05/2025 02:52 PM
                    </td>
                    <td>
                      <div className="d-flex">
                        <Link to={``}>
                        <span className="text-lighter px-1 mx-1 mb-0">
                          <i className="bi bi-eye"></i>
                        </span>
                      </Link>
                      <Link to={``}>
                        <span className="text-color px-1 mx-1 mb-0">
                          <i className="bi bi-pen"></i>
                        </span>
                      </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="sub-text">23154</td>
                    <td className="sub-text">تريلا سطحة</td>
                    <td className="sub-text">
                      <img
                        src="/img/placeholder.png"
                        className="rounded"
                        style={{ width: "auto", maxHeight: "40px" }}
                        alt="placeholder"
                      />
                    </td>
                    <td className="sub-text"> 2564164984 </td>
                    <td className="sub-text"> - </td>
                    <td className="text-color"> فايز بن عبدالرحمن الحربي </td>
                    <td className="sub-text"> نقل عام</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text" style={{ direction: "ltr" }}>
                      {" "}
                      21/05/2025 02:52 PM
                    </td>
                    <td>
                      <div className="d-flex">
                        <Link to={``}>
                        <span className="text-lighter px-1 mx-1 mb-0">
                          <i className="bi bi-eye"></i>
                        </span>
                      </Link>
                      <Link to={``}>
                        <span className="text-color px-1 mx-1 mb-0">
                          <i className="bi bi-pen"></i>
                        </span>
                      </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="sub-text">23154</td>
                    <td className="sub-text">تريلا سطحة</td>
                    <td className="sub-text">
                      <img
                        src="/img/placeholder.png"
                        className="rounded"
                        style={{ width: "auto", maxHeight: "40px" }}
                        alt="placeholder"
                      />
                    </td>
                    <td className="sub-text"> 2564164984 </td>
                    <td className="sub-text"> - </td>
                    <td className="text-color"> فايز بن عبدالرحمن الحربي </td>
                    <td className="sub-text"> نقل عام</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text"> -</td>
                    <td className="sub-text" style={{ direction: "ltr" }}>
                      {" "}
                      21/05/2025 02:52 PM
                    </td>
                    <td>
                      <div className="d-flex">
                        <Link to={``}>
                        <span className="text-lighter px-1 mx-1 mb-0">
                          <i className="bi bi-eye"></i>
                        </span>
                      </Link>
                      <Link to={``}>
                        <span className="text-color px-1 mx-1 mb-0">
                          <i className="bi bi-pen"></i>
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
            <div className="modal-body">--</div>
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

export default VehiclesPlural;

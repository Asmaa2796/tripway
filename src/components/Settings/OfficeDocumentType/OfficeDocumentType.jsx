import React, { useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import "./docType.css";
import {
  clearState,
  deleteRecord,
  restoreRecord,
  fetchOfficeDocumentTypes,
  fetchDeletedDoc,
  fetchDocumentsByType,
} from "../../../redux/Slices/OfficeDocumentTypeSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import TableLoader from "../../../pages/TableLoader";

const OfficeDocumentType = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [appliedFilter, setAppliedFilter] = useState("");

  const { all, byType, deleted, isLoading } = useSelector(
    (state) => state.office_document_types
  );

  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const typeTabMap = {
    contracts: "contracts",
    establishment_documents: "establishment",
    employee_documents: "employee",
    drivers_documents: "driver",
    vehicle_documents: "vehicle",
    business_docs: "branch",
    partners_documents: "owner",
  };

  useEffect(() => {
    setTitle(t("sidenav.officeDocumentType"));
    document.title = t("sidenav.officeDocumentType");
    return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t,i18n.language]);

  useEffect(() => {
    dispatch(clearState());

    if (activeTab === "all") {
      dispatch(fetchOfficeDocumentTypes());
    } else if (activeTab === "deleted") {
      dispatch(fetchDeletedDoc());
    } else if (typeTabMap[activeTab]) {
      dispatch(fetchDocumentsByType(typeTabMap[activeTab]));
    }
  }, [activeTab, dispatch, i18n.language]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // Step 1: get base data from active tab
  const baseData =
    activeTab === "all"
      ? all
      : activeTab === "deleted"
      ? deleted
      : byType[typeTabMap[activeTab]] || [];

  // apply filter only if search active
  const filtered = appliedFilter
    ? baseData.filter((item) =>
        item.name.toLowerCase().includes(appliedFilter.toLowerCase())
      )
    : baseData;

  // Step 3: pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm(t("labels.confirmDelete"))) {
      dispatch(deleteRecord(id))
        .unwrap()
        .then(() => {
          toast.success(t("labels.deleteSuccess"));
          dispatch(fetchOfficeDocumentTypes());
        })
        .catch(() => toast.error(t("labels.deleteFail")));
    }
  };

  const handleRestore = (e, id) => {
    e.preventDefault();
    dispatch(restoreRecord(id))
      .unwrap()
      .then(() => {
        toast.success(t("labels.restoredSuccess"));
        dispatch(fetchDeletedDoc());
      })
      .catch(() => toast.error(t("labels.restoredFail")));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchValue("");
    setAppliedFilter("");
    setCurrentPage(1);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setActiveTab("all");
    setAppliedFilter(searchValue);
    setCurrentPage(1);
  };

  const handleShowAll = (e) => {
    e.preventDefault();
    setSearchValue("");
    setAppliedFilter("");
    setCurrentPage(1);
  };
  useEffect(() => {
    setSearchValue("");
    setAppliedFilter("");
  }, [activeTab]);
  const renderTabButton = (key, label) => (
    <li className="nav-item" key={key}>
      <button
        className={`nav-link ${activeTab === key ? "active" : ""}`}
        onClick={() => setActiveTab(key)}
      >
        {label}
      </button>
    </li>
  );

  const typeMap = {
    contracts: t("labels.contracts"),
    establishment: t("labels.establishmentDocuments"),
    employee: t("labels.employeeDocuments"),
    driver: t("labels.driversDocuments"),
    vehicle: t("labels.vehicleDocuments"),
    branch: t("labels.businessDocs"),
    owner: t("labels.partnersDocuments"),
  };
  return (
    <>
      <form className="table_form form-style my-3 py-3">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t("sign.name")} </label>
            <select
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="input-bg w-100 bg-white"
            >
              <option value="">{t("btns.viewAll")}</option>
              {all.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-xl-3 col-lg-3 col-md-12 col-12 text-center">
            <button className="btn show_result" onClick={handleSearch}>
              {t("btns.viewResults")}{" "}
            </button>
            <button className="btn show_all" onClick={handleShowAll}>
              {t("btns.viewAll")}
            </button>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-3 col-12 text-center">
            <Link to="/office_document_type/add">
              <span
                className="btn btn-success btn-sm text-sm px-3"
                style={{
                  background: "var(--green-color)",
                  marginTop: "45px",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                {t("btns.add")}
              </span>
            </Link>
          </div>
        </div>
      </form>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-12">
          <ul className="nav nav-tabs doc-ul" id="myTab" role="tablist">
            {renderTabButton("all", t("labels.all"))}
            {renderTabButton("contracts", t("labels.contracts"))}
            {renderTabButton(
              "establishment_documents",
              t("labels.establishmentDocuments")
            )}
            {renderTabButton(
              "employee_documents",
              t("labels.employeeDocuments")
            )}
            {renderTabButton("drivers_documents", t("labels.driversDocuments"))}
            {renderTabButton("vehicle_documents", t("labels.vehicleDocuments"))}
            {renderTabButton("business_docs", t("labels.businessDocs"))}
            {renderTabButton(
              "partners_documents",
              t("labels.partnersDocuments")
            )}
            {renderTabButton("deleted", t("labels.deleted"))}
          </ul>
        </div>
      </div>

      <div className="tab-content mt-3 my-3 py-3 div-bg">
        <div className="table_wrapper shadow-none border-none">
          {isLoading ? (
            <TableLoader />
          ) : currentData.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{t("labels.typeNumber")}</th>
                    <th>{t("sign.name")}</th>
                    <th>{t("labels.type")}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((tr, index) => (
                    <tr key={tr.id || index}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{tr.id}</td>
                      <td>{tr.name}</td>
                      <td>{typeMap[tr.type]}</td>
                      <td className="d-flex justify-content-center">
                        {activeTab === "deleted" ? (
                          <button
                            className="btn btn-lg"
                            onClick={(e) => handleRestore(e, tr.id)}
                          >
                            <span className="text-primary px-0 mx-1 mb-0">
                              <i className="bi bi-arrow-clockwise"></i>
                            </span>
                          </button>
                        ) : (
                          <>
                            <Link
                              className="btn"
                              to={`/office_document_type/edit/${tr.id}`}
                            >
                              <span className="text-color px-0 mx-1 mb-0">
                                <i className="bi bi-pen"></i>
                              </span>
                            </Link>
                            <button
                              className="btn"
                              onClick={(e) => handleDelete(e, tr.id)}
                            >
                              <span className="text-danger px-0 mx-1 mb-0">
                                <i className="bi bi-trash"></i>
                              </span>
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div
              className="no_data text-center rounded my-2 p-3"
              style={{ backgroundColor: "#569a8b" }}
            >
              <h5 className="my-2 text-md text-white">{t("labels.noData")}</h5>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <nav aria-label="Page navigation">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                  }}
                >
                  <i className="fa fa-caret-right"></i>
                </a>
              </li>

              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(index + 1);
                    }}
                  >
                    {index + 1}
                  </a>
                </li>
              ))}

              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                  }}
                >
                  <i className="fa fa-caret-left"></i>
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </>
  );
};

export default OfficeDocumentType;

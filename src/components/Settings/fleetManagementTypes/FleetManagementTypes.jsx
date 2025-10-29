import React, { useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  deleteRecord,
  fetchFleetManagementTypes,
  fetchFuelFleetTypes,
  fetchMaintenanceFleetTypes,
  fetchEntryFleetTypes,
  restoreRecord,
  fetchDeletedFleetTypes,
} from "../../../redux/Slices/FleetManagementTypesSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import TableLoader from "../../../pages/TableLoader";

const FleetManagementTypes = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const { fleet_request_types, fuel, maintenance, entry, deleted, isLoading } =
    useSelector((state) => state.fleet_request_types);
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setTitle(t("sidenav.fleetManagementTypes"));
  }, [setTitle, t,i18n.language]);

  useEffect(() => {
    dispatch(clearState());
    switch (activeTab) {
      case "all":
        dispatch(fetchFleetManagementTypes());
        break;
      case "fuel":
        dispatch(fetchFuelFleetTypes());
        break;
      case "maintenance":
        dispatch(fetchMaintenanceFleetTypes());
        break;
      case "entry":
        dispatch(fetchEntryFleetTypes());
        break;
      case "deleted":
        dispatch(fetchDeletedFleetTypes());
        break;
      default:
        break;
    }
  }, [activeTab, dispatch, i18n.language]);

  // Reset page to 1 when tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const getDataByTab = () => {
    switch (activeTab) {
      case "all":
        return fleet_request_types;
      case "fuel":
        return fuel;
      case "maintenance":
        return maintenance;
      case "entry":
        return entry;
      case "deleted":
        return deleted;
      default:
        return [];
    }
  };

  const data = getDataByTab() || [];
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const refreshCurrentTab = () => {
    switch (activeTab) {
      case "all":
        dispatch(fetchFleetManagementTypes());
        break;
      case "fuel":
        dispatch(fetchFuelFleetTypes());
        break;
      case "maintenance":
        dispatch(fetchMaintenanceFleetTypes());
        break;
      case "entry":
        dispatch(fetchEntryFleetTypes());
        break;
      case "deleted":
        dispatch(fetchDeletedFleetTypes());
        break;
      default:
        break;
    }
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm(t("labels.confirmDelete"))) {
      dispatch(deleteRecord(id))
        .unwrap()
        .then(() => {
          toast.success(t("labels.deleteSuccess"));
          refreshCurrentTab();
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
        refreshCurrentTab();
      })
      .catch(() => toast.error(t("labels.restoredFail")));
  };
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [data, totalPages, currentPage]);

  const renderTabButton = (key, label) => (
    <li className="nav-item">
      <button
        className={`nav-link ${activeTab === key ? "active" : ""}`}
        onClick={() => {
          setActiveTab(key);
        }}
      >
        {label}
      </button>
    </li>
  );
  return (
    <>
      <div className="row">
        <div className="col-xl-9 col-lg-9 col-md-9 col-12">
          {/* Tabs */}
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            {renderTabButton("all", t("labels.all"))}
            {renderTabButton("maintenance", t("labels.maintenanceTypes"))}
            {renderTabButton("entry", t("labels.entryTypes"))}
            {renderTabButton("fuel", t("labels.fuelTypes"))}
            {renderTabButton("deleted", t("labels.deleted"))}
          </ul>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-3 col-12 text-center">
          <Link to="/add_fleet_management_type">
            <span
              className="btn btn-success btn-sm text-sm px-3"
              style={{
                background: "var(--green-color)",
                marginTop: "5px",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              {t("labels.addFleetRequestType")}
            </span>
          </Link>
        </div>
      </div>

      {/* Tab Content */}
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
                    <th>{t("sign.name")}</th>
                    <th>{t("labels.type")}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((tr, index) => (
                    <tr key={tr.id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{tr.name}</td>
                      <td>
                        {tr?.type === "maintenance"
                          ? t("labels.maintenance")
                          : tr?.type === "journal_entries"
                          ? t("labels.entry")
                          : tr?.type === "fuel"
                          ? t("labels.fuel")
                          : ""}
                      </td>
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
                              to={`/edit_fleet_management_type/${tr.id}`}
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

        {/* Pagination */}
        {data.length > 0 && totalPages > 1 && (
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

              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                return (
                  <li
                    key={page}
                    className={`page-item ${
                      currentPage === page ? "active" : ""
                    }`}
                  >
                    <a
                      className="page-link"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                    >
                      {page}
                    </a>
                  </li>
                );
              })}

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

export default FleetManagementTypes;

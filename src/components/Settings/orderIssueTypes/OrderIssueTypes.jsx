import React, { useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  deleteRecord,
  restoreRecord,
  fetchOrderIssueTypes,
  fetchDeletedOrderIssueTypes
} from "../../../redux/Slices/OrderIssueTypesSlice";

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import TableLoader from "../../../pages/TableLoader";

const OrderIssueTypes = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order_issue_types, deleted, isLoading } = useSelector(
    (state) => state.order_issue_types
  );

  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setTitle(t("sidenav.orderIssueTypes"));
  }, [setTitle, t]);

  useEffect(() => {
    dispatch(clearState());
    switch (activeTab) {
      case "all":
        dispatch(fetchOrderIssueTypes());
        break;
      case "deleted":
        dispatch(fetchDeletedOrderIssueTypes());
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
        return order_issue_types;
      case "deleted":
        return deleted;
      default:
        return [];
    }
  };

  const rawData = getDataByTab();
const dataArray = rawData?.data || []; // pick the array inside the object
const totalPages = Math.ceil(dataArray.length / itemsPerPage);
const currentData = dataArray.slice(
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
          dispatch(fetchOrderIssueTypes());
        })
        .catch(() => toast.error(t("labels.deleteFail")));
    }
  };
  const handleRestore = (e, id) => {
    e.preventDefault();
   dispatch(restoreRecord({ id }))
     .unwrap()
     .then(() => {
       toast.success(t("labels.restoredSuccess"));
       dispatch(fetchDeletedOrderIssueTypes());
     })
     .catch(() => toast.error(t("labels.restoredFail")));
  };

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
            {renderTabButton("deleted", t("labels.deleted"))}
          </ul>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-3 col-12 text-center">
          <Link to="/add_order_issue_types">
            <span
              className="btn btn-success btn-sm text-sm px-3"
              style={{
                background: "var(--green-color)",
                marginTop: "5px",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              {t("btns.add")}
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
                    <th>{t("labels.typeNumber")}</th>
                    <th>{t("sign.name")}</th>
                    {activeTab !== "deleted" && <th></th>}
                    {activeTab === "deleted" && <th></th>}
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((tr, index) => (
                    <tr key={tr.id || index}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{tr.type_id}</td>

                      <td>{tr.name}</td>

                      {activeTab !== "deleted" && (
                        <td className="d-flex justify-content-center">
                          <>
                            <Link
                              className="btn"
                              to={`/edit_order_issue_types/${tr.id}`}
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
                        </td>
                      )}
                      {activeTab === "deleted" && (
                        <td>
                          <button
                            className="btn btn-lg"
                            onClick={(e) => handleRestore(e, tr.id)}
                          >
                            <span className="text-primary px-0 mx-1 mb-0">
                              <i className="bi bi-arrow-clockwise"></i>
                            </span>
                          </button>
                        </td>
                      )}
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
                  <i className="fa fa-caret-left"></i>
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
                  <i className="fa fa-caret-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </>
  );
};

export default OrderIssueTypes;

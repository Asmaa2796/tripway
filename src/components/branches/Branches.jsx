import React, { useEffect, useState } from "react";
import { useTitle } from "../../context/TitleContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  deleteTripwayBranches,
  fetchTripwayBranches,
} from "../../redux/Slices/TripwayBranchesSlice";
import { toast } from "react-toastify";
import TableLoader from "../../pages/TableLoader";

const TripwayBranches = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const { tripway_branches, isLoading, success, error } = useSelector(
    (state) => state.tripway_branches
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

  const paginatedData = filteredData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setTitle(t("sidenav.winchBranches"));
    document.title = t("sidenav.winchBranches");
     return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language]);

  useEffect(() => {
    dispatch(clearState());
    dispatch(fetchTripwayBranches());
  }, [dispatch, t, i18n.language, success]);

  useEffect(() => {
    setFilteredData(tripway_branches || []);
  }, [tripway_branches]);
  const handleDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm(t("labels.confirmDelete"))) {
      dispatch(deleteTripwayBranches(id));
    }
  };
  useEffect(() => {
    if (success) {
      toast.success(t("labels.deleteSuccess"));
      dispatch(fetchTripwayBranches()); // refresh list
      dispatch(clearState());
    }

    if (error) {
      toast.error(t("labels.deleteFail"));
      dispatch(clearState());
    }
  }, [success, error, dispatch, t]);
  const handleFilter = () => {
    if (statusFilter === "all") {
      setFilteredData(tripway_branches);
    } else {
      const isActive = statusFilter === "true";
      setFilteredData(tripway_branches.filter((tr) => tr.status === isActive));
    }
    setCurrentPage(1); // reset pagination after filter
  };
  return (
    <>
      <div className="row form-style justify-content-between">
        <div className="col-xl-6 col-lg-6 col-md-6 col-12">
          <label className="fw-bold my-2">{t("labels.status")}</label>
          <select
            className="input-div w-100 mb-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">{t("labels.all")}</option>
            <option value="true">{t("labels.active")}</option>
            <option value="false">{t("labels.inactive")}</option>
          </select>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-12">
          <button
            className="btn btn-success btn-sm text-sm px-3 mx-2"
            onClick={handleFilter}
            style={{
              background: "var(--green-color)",
              fontSize: "14px",
              marginTop: "48px",
            }}
          >
            {t("btns.viewResults")}
          </button>
          <Link to="/add_tripway_branch">
            <span
              className="btn btn-success btn-sm text-sm px-3"
              style={{
                background: "var(--green-color)",
                fontSize: "14px",
                marginTop: "48px",
              }}
            >
              {t("btns.add")}
            </span>
          </Link>
        </div>
      </div>
      {/* Table Section */}
      <div className="table_wrapper">
        {isLoading ? (
          <TableLoader />
        ) : filteredData?.length > 0 ? (
          <>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{t("labels.code")}</th>
                    <th>{t("labels.name")}</th>
                    <th>{t("labels.registrationDate")}</th>
                    <th>{t("labels.status")}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((tr, index) => (
                    <tr key={tr.id || index}>
                      <td className="sub-text">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>

                      <td className="sub-text">{tr?.code}</td>
                      <td className="sub-text">{tr?.name}</td>
                      <td className="sub-text">{tr?.registration_date}</td>
                      <td
                        className={`${
                          tr?.status === true ? "highlight-green" : "text-color"
                        }`}
                      >
                        {tr?.status === true
                          ? t("labels.active")
                          : t("labels.inactive")}
                      </td>

                      <td className="d-flex justify-content-center">
                        <Link
                          className="btn px-0 mx-1"
                          data-tooltip-id="global-tooltip"
                          data-tooltip-content={t("labels.view")}
                          to={`/show_tripway_branch/${tr.id}`}
                        >
                          <span className="highlight-green px-0 mx-1 mb-0">
                            <i className="bi bi-eye"></i>
                          </span>
                        </Link>
                        <Link
                          className="btn px-0 mx-1"
                          data-tooltip-id="global-tooltip"
                          data-tooltip-content={t("labels.edit")}
                          to={`/edit_tripway_branch/${tr.id}`}
                        >
                          <span className="text-color px-0 mx-1 mb-0">
                            <i className="bi bi-pen"></i>
                          </span>
                        </Link>
                        <button
                          className="btn px-0 mx-1"
                          data-tooltip-id="global-tooltip"
                          data-tooltip-content={t("labels.delete")}
                          onClick={(e) => handleDelete(e, tr.id)}
                        >
                          <span className="text-danger px-0 mx-1 mb-0">
                            <i className="bi bi-trash"></i>
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Tooltip
              id="global-tooltip"
              place="top"
              className="custom-tooltip"
              style={{ fontSize: "11px", fontWeight: "bold" }}
            />
          </>
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
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
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
    </>
  );
};

export default TripwayBranches;
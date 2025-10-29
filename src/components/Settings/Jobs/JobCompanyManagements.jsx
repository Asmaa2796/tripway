import React, { useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  deleteJob,
  fetchJobs,
} from "../../../redux/Slices/JobsSlice";
import { toast } from "react-toastify";
import TableLoader from "../../../pages/TableLoader";

const JobCompanyManagements = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const { job_company_managements, isLoading, success } = useSelector(
    (state) => state.job_company_managements
  );
console.log(job_company_managements);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(job_company_managements.length / itemsPerPage);

  const paginatedData = job_company_managements.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setTitle(t("sidenav.jobs"));
    document.title = t("sidenav.jobs");
     return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language]);

  useEffect(() => {
    dispatch(clearState());
    dispatch(fetchJobs());
  }, [dispatch, t, i18n.language, success]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm(t("labels.confirmDelete"))) {
      dispatch(deleteJob(id))
        .unwrap()
        .then(() => toast.success(t("labels.deleteSuccess")))
        .catch(() => toast.error(t("labels.deleteFail")));
    }
  };

  return (
    <>
      <div className="my-3">
        <Link to="/job_company_managements/add">
          <span
            className="btn btn-success btn-sm text-sm px-3"
            style={{
              background: "var(--green-color)",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {t("labels.addJob")}
          </span>
        </Link>
      </div>
      {/* Table Section */}
      <div className="table_wrapper">
        {isLoading ? (
          <TableLoader />
        ) : job_company_managements.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t("sign.name")}</th>
                  <th>{t("sign.management")}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((tr, index) => (
                  <tr key={tr.id || index}>
                    <td className="sub-text">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>

                    <td className="sub-text">{tr.name}</td>
                    <td className="sub-text">{tr.company_management}</td>

                    <td className="d-flex justify-content-center">
                      <Link
                        className="btn"
                        to={`/job_company_managements/edit/${tr.id}`}
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

export default JobCompanyManagements;

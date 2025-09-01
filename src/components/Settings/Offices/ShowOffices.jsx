import React, { useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";

import {
  clearState,
  deleteOffice,
  fetchOffices,
} from "../../../redux/Slices/OfficesSlice";
import { toast } from "react-toastify";
import TableLoader from "../../../pages/TableLoader";

const ShowOffices = () => {
  const { t, i18n } = useTranslation("global");
  const [filterStatus, setFilterStatus] = useState("all");
  const [appliedFilter, setAppliedFilter] = useState("all");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const { offices, isLoading, error, success, pagination } = useSelector(
    (state) => state.offices
  );

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setTitle(t("sidenav.Offices"));
    dispatch(clearState());
    dispatch(fetchOffices(currentPage));
  }, [dispatch, setTitle, t, i18n.language, currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > (pagination?.last_page || 1)) return;
    setCurrentPage(page);
  };
  const filteredOffices = offices.data?.filter((office) => {
    if (appliedFilter === "all") return true; // show all by default
    if (appliedFilter === "true")
      return office.status === true || office.status === 1;
    if (appliedFilter === "false")
      return office.status === false || office.status === 0;
    return true;
  });
  const handleDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm(t("labels.confirmDelete"))) {
      dispatch(deleteOffice(id))
        .unwrap()
        .then(() => {
          toast.success(t("labels.deleteSuccess"));
          dispatch(fetchOffices(currentPage));
        })
        .catch(() => {
          toast.error(t("labels.deleteFail"));
        });
    }
  };

  return (
    <>
      <div className="row form-style">
        <div className="col-xl-6 col-lg-6 col-md-6 col-12">
          <select
            className="input-bg w-100 bg-white"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">{t("labels.all")}</option>
            <option value="true">{t("labels.active")}</option>
            <option value="false">{t("labels.inactive")}</option>
          </select>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-12">
          <button
            className="btn btn-sm save text-white mt-2 mb-3 text-sm"
            onClick={() => setAppliedFilter(filterStatus)}
          >
            {t("btns.viewResults")}
          </button>
          <Link
            to="add_office"
            className="btn mx-2 save btn-sm text-white mt-2 mb-3 text-sm"
          >
            {t("labels.addOffice")}
          </Link>
        </div>
      </div>
      <div className="table_wrapper">
        {isLoading ? (
          <TableLoader />
        ) : filteredOffices && filteredOffices.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col" className="text-lighter">
                    #
                  </th>
                  <th scope="col" className="text-lighter">
                    {t("labels.branchNumber")}
                  </th>
                  <th scope="col" className="text-lighter">
                    {t("sign.name")}
                  </th>
                  <th scope="col" className="text-lighter">
                    {t("labels.status")}
                  </th>
                  <th scope="col" className="text-lighter">
                    {t("labels.registrationDate")}
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredOffices.map((office, index) => (
                  <tr key={office.id}>
                    <td className="sub-text">{index + 1}</td>
                    <td className="sub-text">{office?.establishment_no}</td>
                    <td className="sub-text">{office?.name}</td>
                    <td className="sub-text">
                      {office?.status == true ? (
                        <span className="highlight-green">
                          {t("labels.active")}
                        </span>
                      ) : (
                        <span className="text-color">
                          {t("labels.inactive")}
                        </span>
                      )}
                    </td>
                    <td className="sub-text">{office?.registration_date}</td>

                    <td className="d-flex justify-content-center">
                      <Link className="btn" to={`edit_office/${office.id}`}>
                        <i className="bi bi-pen text-color px-1 mx-1 mb-0"></i>
                      </Link>
                      <button
                        className="btn"
                        onClick={(e) => handleDelete(e, office.id)}
                      >
                        <i className="bi bi-trash text-danger px-1 mx-1 mb-0"></i>
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
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          {/* Previous */}
          <li
            className={`page-item ${
              !pagination?.prev_page_url ? "disabled" : ""
            }`}
          >
            <a
              className="page-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
            >
              <i className="fa fa-caret-right"></i>
            </a>
          </li>

          {/* Page Numbers */}
          {Array.from({ length: pagination?.last_page || 1 }, (_, index) => (
            <li
              key={index}
              className={`page-item ${
                pagination?.current_page === index + 1 ? "active" : ""
              }`}
            >
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(index + 1);
                }}
              >
                {index + 1}
              </a>
            </li>
          ))}

          {/* Next */}
          <li
            className={`page-item ${
              !pagination?.next_page_url ? "disabled" : ""
            }`}
          >
            <a
              className="page-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
            >
              <i className="fa fa-caret-left"></i>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default ShowOffices;

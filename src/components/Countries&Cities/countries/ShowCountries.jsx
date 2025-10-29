import React, { useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  deleteCountry,
  fetchCountries,
} from "../../../redux/Slices/CountriesSlice";
import { toast } from "react-toastify";
import TableLoader from "../../../pages/TableLoader";

const ShowCountries = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();

  const dispatch = useDispatch();
  const { countries, isLoading, error, success, pagination } = useSelector(
    (state) => state.countries
  );

  useEffect(() => {
    setTitle(t("sidenav.countries"));
    document.title = t("sidenav.countries");
     return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(clearState());
    dispatch(fetchCountries(currentPage));
  }, [dispatch, i18n.language, currentPage]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm(t("labels.confirmDelete"))) {
      dispatch(deleteCountry(id))
        .unwrap()
        .then(() => {
          toast.success(t("labels.deleteSuccess"));
        })
        .catch(() => {
          toast.error(t("labels.deleteFail"));
        });
    }
  };
  const handlePageChange = (page) => {
    if (page < 1 || page > (pagination?.last_page || 1)) return;
    setCurrentPage(page);
  };

  return (
    <>
      <Link to="add_country" className="btn save text-white my-3 text-sm">
        {t("labels.addCountry")}
      </Link>
      <div className="table_wrapper">
        {isLoading ? (
          <TableLoader />
        ) : countries && countries.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col" className="text-lighter">
                    #
                  </th>
                  <th scope="col" className="text-lighter">
                    {t("sign.name")}
                  </th>
                  <th scope="col" className="text-lighter">
                    {t("labels.contactCode")}
                  </th>
                  <th scope="col" className="text-lighter">
                    {t("labels.countryCode")}
                  </th>
                  <th scope="col" className="text-lighter">
                    {t("labels.cities")}
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {countries.map((tr, index) => (
                  <tr key={tr.id}>
                    <td className="sub-text">{index + 1}</td>
                    <td className="sub-text">{tr?.name}</td>
                    <td className="sub-text">{tr?.code}</td>
                    <td className="sub-text">{tr?.abbreviation}</td>
                    <td className="sub-text">{tr?.cities_count}</td>
                    <td className="d-flex justify-content-center">
                      <Link className="btn" to={`edit_country/${tr.id}`}>
                        <span className="text-color px-1 mx-1 mb-0">
                          <i className="bi bi-pen"></i>
                        </span>
                      </Link>
                      <button
                        className="btn"
                        onClick={(e) => handleDelete(e, tr.id)}
                      >
                        <span className="text-danger px-1 mx-1 mb-0">
                          <i className="bi bi-trash"></i>
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center">
                {/* Prev */}
                <li
                  className={`page-item ${
                    !pagination?.prev_page_url ? "disabled" : ""
                  }`}
                >
                  <a
                    className="page-link text-center"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage - 1);
                      e.currentTarget.blur();
                    }}
                  >
                    <i className="fa fa-caret-right"></i>
                  </a>
                </li>

                {/* Page numbers */}
                {Array.from(
                  { length: pagination?.last_page || 1 },
                  (_, index) => (
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
                          e.currentTarget.blur();
                        }}
                      >
                        {index + 1}
                      </a>
                    </li>
                  )
                )}

                {/* Next */}
                <li
                  className={`page-item ${
                    !pagination?.next_page_url ? "disabled" : ""
                  }`}
                >
                  <a
                    className="page-link text-center"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage + 1);
                      e.currentTarget.blur();
                    }}
                  >
                    <i className="fa fa-caret-left"></i>
                  </a>
                </li>
              </ul>
            </nav>
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
    </>
  );
};

export default ShowCountries;

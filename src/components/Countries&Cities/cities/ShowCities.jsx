import React, { useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  deleteCity,
  fetchCities,
} from "../../../redux/Slices/CitiesSlice";
import { toast } from "react-toastify";
import TableLoader from "../../../pages/TableLoader";

const ShowCities = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();

  const dispatch = useDispatch();
  const { cities, isLoading, error, success, pagination } = useSelector(
    (state) => state.cities
  );

  useEffect(() => {
    setTitle(t("sidenav.cities"));
    document.title = t("sidenav.cities");
    return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(clearState());
    dispatch(fetchCities(currentPage));
  }, [dispatch, i18n.language, currentPage]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm(t("labels.confirmDelete"))) {
      dispatch(deleteCity(id))
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
      <Link to="add_city" className="btn save text-white my-3 text-sm">
        {t("labels.addCity")}
      </Link>
      <div className="table_wrapper">
        {isLoading ? (
          <TableLoader />
        ) : cities && cities.length > 0 ? (
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
                    {t("sidenav.region")}
                  </th>
                  <th scope="col" className="text-lighter">
                    {t("labels.country")}
                  </th>
                  <th scope="col" className="text-lighter">
                    {t("sidenav.winch_city")}
                  </th>
                  <th scope="col" className="text-lighter">
                    {t("sidenav.ranking")}
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cities.map((city, index) => (
                  <tr key={city.id}>
                    <td className="sub-text">{index + 1}</td>
                    <td className="sub-text">{city?.name}</td>
                    <td className="sub-text">{city?.region_name}</td>
                    <td className="sub-text">{city?.country_name}</td>
                    <td className="sub-text">
                      {city?.winch_city === "active" ? (
                        <span style={{ color: "green", fontSize: "20px" }}>
                          ●
                        </span>
                      ) : (
                        <span style={{ color: "red", fontSize: "20px" }}>
                          ●
                        </span>
                      )}
                    </td>
                    <td className="sub-text">{city?.arrangement}</td>
                    <td className="d-flex justify-content-center">
                      <Link className="btn" to={`edit_city/${city.id}`}>
                        <span className="text-color px-1 mx-1 mb-0">
                          <i className="bi bi-pen"></i>
                        </span>
                      </Link>
                      <button
                          className="btn"
                          onClick={(e) => handleDelete(e, city.id)}
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
              <ul className="pagination">
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

export default ShowCities;

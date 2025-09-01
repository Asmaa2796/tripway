import React, { useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  deleteRegion,
  fetchRegions,
} from "../../../redux/Slices/RegionSlice";
import { toast } from "react-toastify";
import TableLoader from "../../../pages/TableLoader";

const ShowRegion = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();

  const dispatch = useDispatch();
  const { regions, isLoading, error, success, pagination } = useSelector(
    (state) => state.regions
  );

  useEffect(() => {
    setTitle(t("sidenav.regions"));
  }, [setTitle, t, i18n.language]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(clearState());
    dispatch(fetchRegions(currentPage));
  }, [dispatch, i18n.language, currentPage]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm(t("labels.confirmDelete"))) {
      dispatch(deleteRegion(id))
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
      <Link to="add_region" className="btn save text-white my-3 text-sm">
        {t("labels.addRegion")}
      </Link>
      <div className="table_wrapper">
        {isLoading ? (
          <TableLoader />
        ) : regions && regions.length > 0 ? (
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
                    {t("labels.cities")}
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {regions.map((region, index) => (
                  <tr key={region.id}>
                    <td className="sub-text">{index + 1}</td>
                    <td className="sub-text">{region?.name}</td>
                    <td className="sub-text">{region?.cities_count}</td>
                    <td className="d-flex justify-content-center">
                      <Link className="btn" to={`edit_region/${region.id}`}>
                        <span className="text-color px-1 mx-1 mb-0">
                          <i className="bi bi-pen"></i>
                        </span>
                      </Link>
                      <button
                          className="btn"
                          onClick={(e) => handleDelete(e, region.id)}
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

export default ShowRegion;

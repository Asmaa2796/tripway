import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeStatus,
  deleteRecord,
  fetchServiceCategoriesByType,
  fetchDeletedServiceCategories,
} from "../../../redux/Slices/ServiceCategoriesSlice";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useTitle } from "../../../context/TitleContext";
import TableLoader from "../../../pages/TableLoader";
const ServiceCategories = () => {
  const { t, i18n } = useTranslation("global");
  const dispatch = useDispatch();
  const { setTitle } = useTitle();
  useEffect(() => {
    setTitle(t("labels.serviceCategories"));
    document.title = t("labels.serviceCategories");
     return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language]);
  const { byType, deleted, isLoading, error, pagination } = useSelector(
    (state) => state.servicesCategories
  );
  const [currentTab, setCurrentTab] = useState("waiting");
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    if (isLoading || page < 1 || page > (pagination?.last_page || 1)) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    if (currentTab === "waiting" || currentTab === "approved") {
      dispatch(fetchServiceCategoriesByType(currentTab));
    } else {
      dispatch(fetchDeletedServiceCategories());
    }
  }, [dispatch, currentTab, i18n.language]);

  const data =
    currentTab === "waiting"
      ? byType.waiting
      : currentTab === "approved"
      ? byType.approved
      : deleted;
  const handleDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm(t("labels.confirmDelete"))) {
      dispatch(deleteRecord(id))
        .unwrap()
        .then(() => {
          toast.success(t("labels.deleteSuccess"));
        })
        .catch(() => toast.error(t("labels.deleteFail")));
    }
  };
  const handleChangeStatus = (e, id) => {
    e.preventDefault();
    dispatch(changeStatus(id))
      .unwrap()
      .then(() => {
        toast.success(t("labels.changeStatusSuccessfully"));
        if (currentTab === "waiting" || currentTab === "approved") {
        dispatch(fetchServiceCategoriesByType(currentTab));
      } else {
        dispatch(fetchDeletedServiceCategories());
      }
      })
      .catch(() => toast.error(t("labels.changeStatusFail")));
  };
  return (
    <div className="service-categories">
      <div className="tabs">
        <button
          className={`btn btn-sm my-3 btn-info ${
            currentTab === "waiting" ? "active" : ""
          }`}
          onClick={() => setCurrentTab("waiting")}
        >
          {t("labels.notBaptized")}
        </button>
        &nbsp;
        <button
          className={`btn btn-sm my-3 btn-primary ${
            currentTab === "approved" ? "active" : ""
          }`}
          onClick={() => setCurrentTab("approved")}
        >
          {t("labels.baptized")}
        </button>
        &nbsp;
        <button
          className={`btn btn-sm my-3 btn-danger ${
            currentTab === "deleted" ? "active" : ""
          }`}
          onClick={() => setCurrentTab("deleted")}
        >
          {t("labels.deleted")}
        </button>
        &nbsp;
        <Link to="/services_categories/create">
          <button
            style={{ fontWeight: "bold" }}
            className="btn btn-sm my-3 btn-success add-button"
          >
            {t("labels.addCategory")}
          </button>
        </Link>
      </div>

      <div className="table_wrapper">
        {isLoading ? (
          <TableLoader />
        ) : data?.data?.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t("labels.serviceType")}</th>
                  {currentTab === "waiting" && <th>{t("labels.status")}</th>}
                  {currentTab !== "deleted" && <th></th>}
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((category, index) => (
                  <tr key={category.id}>
                    <td>{index + 1}</td>
                    <td>{category.name}</td>
                    {currentTab === "waiting" && (
                      <td>
                        <button
                          className="btn"
                          onClick={(e) => handleChangeStatus(e, category.id)}
                        >
                          <i className="bi bi-toggle-off text-secondary fs-4"></i>
                        </button>
                      </td>
                    )}

                    
                      {currentTab !== "deleted" && (
                        <td>
                        <>
                        <Link
                          className="btn"
                          to={`/services_categories/edit/${category.id}`}
                        >
                          <span className="text-color px-0 mx-1 mb-0">
                            <i className="bi bi-pen"></i>
                          </span>
                        </Link>
                        <button
                          className="btn"
                          onClick={(e) => handleDelete(e, category.id)}
                        >
                          <span className="text-danger px-0 mx-1 mb-0">
                            <i className="bi bi-trash"></i>
                          </span>
                        </button>
                      </>
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
      {pagination?.last_page > 1 && (
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            {/* Prev */}
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
                  e.currentTarget.blur();
                }}
              >
                <i className="fa fa-caret-right"></i>
              </a>
            </li>

            {/* Page numbers */}
            {Array.from({ length: pagination?.last_page || 1 }, (_, index) => (
              <li
                key={index}
                className={`page-item mx-1 ${
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
      )}
    </div>
  );
};

export default ServiceCategories;

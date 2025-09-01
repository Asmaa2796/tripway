import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTitle } from "../../../context/TitleContext";
import {
  fetchAllAttachments,
  clearState,
  deleteAttachment,
} from "../../../redux/Slices/AttachmentTypesSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AttachmentsType = () => {
  const { t, i18n } = useTranslation("global");
  const dispatch = useDispatch();
  const { setTitle } = useTitle();
  const { attachments, pagination, isLoading, error } = useSelector(
    (state) => state.attachment_types
  );
  const [currentTab, setCurrentTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredAttachments = React.useMemo(() => {
    if (currentTab === "all") return attachments || [];
    if (currentTab === "employees")
      return (attachments || []).filter((a) => a.type === "employees");
    if (currentTab === "business")
      return (attachments || []).filter(
        (a) => a.type === "branches_owners"
      );
    return [];
  }, [attachments, currentTab]);

  const totalPages =
    currentTab === "all"
      ? pagination?.last_page || 1
      : Math.ceil(filteredAttachments.length / itemsPerPage);

  const paginatedData =
    currentTab === "all"
      ? filteredAttachments
      : filteredAttachments.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        );

  useEffect(() => {
    setTitle(t("labels.attachments"));
  }, [setTitle, t, i18n.language]);

  useEffect(() => {
    dispatch(clearState());
    if (currentTab === "all") {
      dispatch(fetchAllAttachments(currentPage));
    }
  }, [dispatch, currentTab, currentPage]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || t("labels.fetchError"));
    }
  }, [error, t]);

  const handlePageChange = (page) => {
    if (isLoading || page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm(t("labels.confirmDelete"))) {
      dispatch(deleteAttachment(id))
        .unwrap()
        .then(() => {
          if (currentTab === "all") {
            dispatch(fetchAllAttachments(currentPage));
            toast.success(t("labels.deleteSuccess"));
          } else {
            toast.success(t("labels.deleteSuccess"));
            setCurrentPage(1);
          }
        })
        .catch(() => {
          toast.error(t("labels.deleteFail"));
        });
    }
  };

  return (
    <div className="service-categories">
      <h5 style={{ fontWeight: "bold" }}>{t("labels.attachmentsTypes")}</h5>

      {isLoading && <p>{t("labels.loading")}</p>}
      <div className="tabs justify-content-between align-items-center d-flex flex-wrap">
        <div className="tabs-buttons">
          {["all", "employees", "business"].map((tab) => (
            <button
              key={tab}
              className={`btn btn-sm mx-1 my-3 tab ${
                tab === "all"
                  ? "btn-danger"
                  : tab === "employees"
                  ? "btn-primary"
                  : "btn-success"
              } ${currentTab === tab ? "active" : ""}`}
              style={{ fontWeight: "bold" }}
              onClick={() => {
                setCurrentTab(tab);
                setCurrentPage(1);
              }}
            >
              {t(`labels.${tab}`)}
            </button>
          ))}
        </div>
        <Link to="add_attachment" className="btn save text-white my-3 text-sm">
          {t("labels.addAttachment")}
        </Link>
      </div>

      <div className="table_wrapper">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>{t("labels.name")}</th>
                <th>{t("labels.type")}</th>
                <th>{t("labels.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData?.map((attachment, index) => (
                <tr key={attachment.id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{attachment.name}</td>
                  <td>
                    {attachment.type === "branches_owners"
                      ? t("labels.business")
                      : t("labels.employees")}
                  </td>
                  <td className="d-flex justify-content-center">
                    <Link
                      className="btn"
                      to={`edit_attachment/${attachment.id}`}
                    >
                      <span className="text-color px-1 mx-1 mb-0">
                        <i className="bi bi-pen"></i>
                      </span>
                    </Link>
                    <button
                      className="btn"
                      onClick={(e) => handleDelete(e, attachment.id)}
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

        </div>
      </div>
      
          {/* Pagination */}
          {filteredAttachments.length > 0 && (
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
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
                        handlePageChange(index + 1);
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

export default AttachmentsType;

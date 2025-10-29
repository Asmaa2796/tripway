import React, { useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  deletePosition,
  fetchPositions,
} from "../../../redux/Slices/PositionsSlice";
import { toast } from "react-toastify";
import TableLoader from "../../../pages/TableLoader";

const ShowPositions = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const { positions, isLoading, error, success, pagination } = useSelector(
    (state) => state.positions
  );

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setTitle(t("sidenav.ClientPosition"));
    document.title = t("sidenav.ClientPosition");
    dispatch(clearState());
    dispatch(fetchPositions(currentPage));
    return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [dispatch, setTitle, t, i18n.language, currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > (pagination?.last_page || 1)) return;
    setCurrentPage(page);
  };
  const handleDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm(t("labels.confirmDelete"))) {
      dispatch(deletePosition(id))
        .unwrap()
        .then(() => {
          toast.success(t("labels.deleteSuccess"));
          dispatch(fetchPositions(currentPage)); // تحديث البيانات بعد الحذف
        })
        .catch(() => {
          toast.error(t("labels.deleteFail"));
        });
    }
  };

  return (
    <>
      <Link to="add_position" className="btn save text-white my-3 text-sm">
        {t("labels.addPosition")}
      </Link>
      <div className="table_wrapper">
        {isLoading ? (
          <TableLoader />
        ) : positions.data && positions.data.length > 0 ? (
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {positions.data.map((position, index) => (
                  <tr key={position.id}>
                    <td className="sub-text">{index + 1}</td>
                    <td className="sub-text">{position.name}</td>
                    <td className="d-flex justify-content-center">
                      <Link className="btn" to={`edit_position/${position.id}`}>
                        <i className="bi bi-pen text-color px-1 mx-1 mb-0"></i>
                      </Link>
                      <button
                          className="btn"
                          onClick={(e) => handleDelete(e, position.id)}
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
          {/* Previous Button */}
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

          {/* Next Button */}
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

export default ShowPositions;

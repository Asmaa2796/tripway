import React, { useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  deleteGoodTypes,
  fetchGoodTypes,
} from "../../../redux/Slices/GoodTypesSlice";
import { toast } from "react-toastify";
import TableLoader from "../../../pages/TableLoader";
import { fetchCarDepartment } from "../../../redux/Slices/ServiceTypesSlice";

const GoodTypes = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();

  const { goodTypes, isLoading, success, error } = useSelector(
    (state) => state.goodTypes
  );
  const { carDepartment } = useSelector((state) => state.serviceTypes);
  const [selectedDep, setSelectedDep] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredData =
    goodTypes?.data?.filter((item) => {
      if (selectedDep === "2") {
        if (selectedType === "all") return false;
        return item.car_department_id === "2" && item.type === selectedType;
      }

      if (selectedDep === "all") return true;
      return item.car_department_id === selectedDep;
    }) || [];

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDep, selectedType]);

  // Set page title
  useEffect(() => {
    setTitle(t("sidenav.goodTypes"));
    dispatch(fetchCarDepartment());
  }, [setTitle, t, i18n.language, dispatch]);

  // Fetch good types
  useEffect(() => {
    dispatch(clearState());
    dispatch(fetchGoodTypes());
  }, [dispatch, t, i18n.language, success]);

  // Delete handler
  const handleDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm(t("labels.confirmDelete"))) {
      dispatch(deleteGoodTypes(id));
    }
  };

  // Toast feedback
  useEffect(() => {
    if (success) {
      toast.success(t("labels.deleteSuccess"));
      dispatch(fetchGoodTypes());
      dispatch(clearState());
    }
    if (error) {
      toast.error(t("labels.deleteFail"));
      dispatch(clearState());
    }
  }, [success, error, dispatch, t]);

  return (
    <>
      {/* Filters */}
      <div className="row form-style my-3">
        <div className="col-xl-4 col-lg-4 col-md-4 col-12">
          <label className="text-light text-sm">{t("labels.department")}</label>
          <select
            value={selectedDep}
            onChange={(e) => {
              setSelectedDep(e.target.value);
              setSelectedType("all");
            }}
          >
            <option value="all">{t("labels.all")}</option>
            {carDepartment?.data?.map((dep) => (
              <option key={dep.id} value={dep.id}>
                {i18n.language === "ar" ? dep.name_ar : dep.name_en}
              </option>
            ))}
          </select>
        </div>

        {selectedDep === "2" && (
          <div className="col-xl-4 col-lg-4 col-md-4 col-12">
            <label className="text-light text-sm">{t("labels.type")}</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">{t("labels.selectItem")}</option>
              <option value="refrigerated">{t("labels.refrigerated")}</option>
              <option value="frozen">{t("labels.frozen")}</option>
            </select>
          </div>
        )}

        <div className="col-xl-4 col-lg-4 col-md-4 col-12">
          <Link
            to="/add_good_types"
            className="btn btn-success"
            style={{ backgroundColor: "var(--green-color)", marginTop: "45px" }}
          >
            {t("btns.add")}
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="table_wrapper">
        {isLoading ? (
          <TableLoader />
        ) : filteredData.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t("labels.department")}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((tr, index) => (
                  <tr key={tr.id || index}>
                    <td className="sub-text">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="sub-text">
                      {i18n.language === "ar"
                        ? tr?.car_department_name_ar
                        : tr?.car_department_name_en}
                      {tr.car_department_id === "2" && tr.type && (
                        <span className="ms-2 d-inline-block">
                          &nbsp;-&nbsp;
                          {tr.type === "frozen"
                            ? t("labels.frozen")
                            : tr.type === "refrigerated"
                            ? t("labels.refrigerated")
                            : tr.type}
                        </span>
                      )}
                    </td>
                    <td className="d-flex justify-content-center">
                      <Link className="btn" to={`/edit_good_types/${tr.id}`}>
                        <i className="bi bi-pen text-color"></i>
                      </Link>
                      <button
                        className="btn"
                        onClick={(e) => handleDelete(e, tr.id)}
                      >
                        <i className="bi bi-trash text-danger"></i>
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
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                <i className="bi bi-caret-right-fill text-sm"></i>
              </button>
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
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                </li>
              );
            })}

            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                <i className="bi bi-caret-left-fill text-sm"></i>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default GoodTypes;

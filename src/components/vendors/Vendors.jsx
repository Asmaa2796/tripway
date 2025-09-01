import React, { useEffect, useMemo, useState } from "react";
import { useTitle } from "../../context/TitleContext";
import "./vendors.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  deleteSupplier,
  fetchSuppliers,
} from "../../redux/Slices/SuppliersSlice";
import { toast } from "react-toastify";
import TableLoader from "../../pages/TableLoader";

const Vendors = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    name: "",
    status: "",
  });

  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const { suppliers, isLoading } = useSelector((state) => state.suppliers);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const applyFilters = () => {
    const filtered = suppliers.filter((supplier) => {
      const matchName = filters.name ? supplier.name === filters.name : true;
      const matchStatus = filters.status
        ? supplier.status == filters.status
        : true;
      return matchName && matchStatus;
    });

    setFilteredSuppliers(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const paginatedData = filteredSuppliers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setTitle(t("sidenav.purchaseSuppliers"));
  }, [setTitle, t, i18n.language]);

  useEffect(() => {
    dispatch(clearState());
    dispatch(fetchSuppliers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredSuppliers(suppliers); // show all initially
  }, [suppliers]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm(t("labels.confirmDelete"))) {
      dispatch(deleteSupplier(id))
        .unwrap()
        .then(() => toast.success(t("labels.deleteSuccess")))
        .catch(() => toast.error(t("labels.deleteFail")));
    }
  };

  // Handlers for buttons
  const handleFilterResults = () => {
    applyFilters();
  };
  const handleResetFilters = () => {
    setFilters({
      name: "",
      status: "",
    });
    setFilteredSuppliers(suppliers); // Show all again
    setCurrentPage(1);
  };
  return (
    <>
      {/* Filters Form */}
      <form className="table_form form-style my-3 py-3">
        <div className="row align-items-center">
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light">{t("sign.name")} </label>
            <select
              name="name"
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            >
              <option value="">{t("labels.selectItem")}</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.name}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light">{t("labels.status")}</label>
            <select
              name="status"
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="">{t("labels.selectItem")}</option>
              <option value="1">{t("labels.active")}</option>
              <option value="0">{t("labels.inactive")}</option>
            </select>
          </div>

          <div className="col-xl-3 col-lg-3 col-md-6 col-12 text-center mt-2">
            <button
              className="btn show_result me-2"
              type="button"
              onClick={handleFilterResults}
            >
              {t("btns.viewResults")}
            </button>
            <button
              className="btn show_all"
              type="button"
              onClick={handleResetFilters}
            >
              {t("btns.viewAll")}
            </button>
          </div>

          <div className="col-xl-3 col-lg-3 col-md-6 col-12 text-center mt-2">
            <Link to="add_vendor">
              <span
                className="btn btn-success btn-sm text-sm px-3"
                style={{
                  background: "var(--green-color)",
                  marginTop: "45px",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                {t("btns.addPurchaseSupplier")}
              </span>
            </Link>
          </div>
        </div>
      </form>

      {/* Table Section */}
      <div className="table_wrapper">
        {isLoading ? (
          <TableLoader />
        ) : filteredSuppliers.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t("labels.supplierNumber")}</th>
                  <th>{t("sign.name")}</th>
                  <th>{t("labels.phone")}</th>
                  <th>{t("labels.accountType")}</th>
                  <th>{t("labels.status")}</th>
                  <th>{t("labels.activity")}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((tr, index) => (
                  <tr key={tr.id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{tr.number}</td>
                    <td>{tr.name}</td>
                    <td style={{ direction: "ltr" }}>{tr.phone}</td>
                    <td>
                      {tr.account_type === "other_creditors"
                        ? t("labels.otherCreditors")
                        : t("labels.otherDebitors")}
                    </td>
                    <td
                      className={
                        tr.status === "1" ? "text-color" : "highlight-text"
                      }
                    >
                      {tr.status === "1"
                        ? t("labels.active")
                        : t("labels.inactive")}
                    </td>
                    <td>{tr.activity}</td>
                    <td className="d-flex justify-content-center">
                      <Link className="btn" to={`edit_supplier/${tr.id}`}>
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

export default Vendors;

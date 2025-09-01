import React, { useEffect, useState } from "react";
import { useTitle } from "../../context/TitleContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  clearState,
  deleteRole,
  fetchRoles,
} from "../../redux/Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import TableLoader from "../../pages/TableLoader";

const UserPermissions = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const { roles, isLoading } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRoles, setFilteredRoles] = useState([]);

  const itemsPerPage = 5;

  useEffect(() => {
    setTitle(t("labels.tripwayPartnerUserPermissions"));
  }, [setTitle, t, i18n.language]);

  useEffect(() => {
    dispatch(clearState());
    dispatch(fetchRoles());
  }, [dispatch, i18n.language]);

  const handleDelete = (role) => {
    if (role.role === "admin") return;

    if (window.confirm(t("labels.confirmDeleteRole"))) {
      dispatch(deleteRole(role.id))
        .unwrap()
        .then(() => {
          toast.success(t("labels.deleteSuccess"));
          dispatch(fetchRoles());
        })
        .catch((err) => {
          toast.error(err?.message || t("labels.deleteFail"));
        });
    }
  };

  const handleSearch = () => {
    const filtered = roles?.filter((role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRoles(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    setFilteredRoles(roles);
  }, [roles]);

  const rolesToDisplay = searchTerm ? filteredRoles : roles;
  const totalPages = Math.ceil((rolesToDisplay?.length || 1) / itemsPerPage);
  const paginatedRoles = rolesToDisplay?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <form
        className="table_form form-style my-3 py-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="row align-items-center">
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.tripwayPartners")}</label>
            <input
              type="text"
              name="tripway_partners"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12 text-center">
            <button
              type="button"
              className="btn show_result mt-5"
              onClick={handleSearch}
            >
              {t("btns.viewResults")}
            </button>
            <button
              type="button"
              className="btn show_all mt-5"
              onClick={() => {
                setSearchTerm("");
                setFilteredRoles(roles);
                setCurrentPage(1);
              }}
            >
              {t("btns.viewAll")}
            </button>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12 text-center">
            <Link to="/add_role">
              <span className="btn btn-warning btn-sm text-sm px-3 mt-5">
                {t("labels.addRole")}
              </span>
            </Link>
          </div>
        </div>
      </form>

      <div className="table_wrapper">
        {isLoading ? (
          <TableLoader />
        ) : paginatedRoles && paginatedRoles.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t("sign.name")}</th>
                  <th>{t("labels.permissions")}</th>
                  <th>{t("labels.tripwayPartners")}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {paginatedRoles.map((tr, index) => (
                  <tr key={tr.id || index}>
                    <td>{tr.id}</td>
                    <td>{tr.name}</td>
                    <td>{tr.permissions_count}</td>
                    <td>{tr.users_count}</td>
                    <td>
                      <Link
                        className="btn text-color"
                        to={`/edit_role/${tr.id}`}
                      >
                        <i className="bi bi-pen"></i>
                      </Link>
                      {tr.role !== "admin" && (
                        <a
                          href="#"
                          className="btn"
                          onClick={(e) => {
                            e.preventDefault();
                            handleDelete(tr);
                          }}
                        >
                          <i className="bi bi-trash text-danger"></i>
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center my-3">{t("labels.noRolesFound")}</div>
        )}
      </div>

      {totalPages > 1 && (
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
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

            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(index + 1);
                  }}
                >
                  {index + 1}
                </a>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
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

export default UserPermissions;

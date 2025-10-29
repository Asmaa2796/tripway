import React, { useEffect, useState } from "react";
import { useTitle } from "../../context/TitleContext";
import "./clients.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  deleteClients,
  fetchClients,
  clearState,
} from "../../redux/Slices/ClientsSlice";
import { useDispatch, useSelector } from "react-redux";
import TableLoader from "../../pages/TableLoader";
import { toast } from "react-toastify";
const Clients = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState([]);

  const { isLoading, clients, success, error } = useSelector(
    (state) => state.clients
  );
  const [formData, setFormData] = useState({
    name: "",
    status: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
const filteredClients = clients?.data?.filter((client) => {
  const matchesName = formData.name
    ? client.name.toLowerCase().includes(formData.name.toLowerCase())
    : true;

  const matchesStatus =
    formData.status !== ""
      ? String(client.status) === String(formData.status)
      : true;

  return matchesName && matchesStatus;
});


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const paginatedData = filteredData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  useEffect(() => {
    if (clients?.data?.length > 0) {
      setFilteredData(clients.data);
    }
  }, [clients]);

  useEffect(() => {
    setTitle(t("sidenav.individualClients"));
    document.title = t("sidenav.individualClients");
    return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language]);
  useEffect(() => {
    dispatch(clearState());
    dispatch(fetchClients());
  }, [dispatch, t, i18n.language, success]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm(t("labels.confirmDelete"))) {
      dispatch(deleteClients({ client_id: id }));
    }
  };
  useEffect(() => {
    if (success) {
      toast.success(t("labels.deleteSuccess"));
      dispatch(fetchClients());
      dispatch(clearState());
    }

    if (error) {
      toast.error(t("labels.deleteFail"));
      dispatch(clearState());
    }
  }, [success, error, dispatch, t]);
  return (
    <>
      {/* form */}
      <form
        className="table_form form-style my-3 py-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="row align-items-center">
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light">{t("sign.name")}</label>
            <select
              name="name"
              onChange={handleInputChange}
              value={formData.name}
            >
              <option value="">{t("labels.selectItem")}</option>
              {clients?.data?.map((client) => (
                <option key={client.id} value={client.name}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            <label className="text-light">{t("labels.status")}</label>
            <select
              name="status"
              className="form-select"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  status: e.target.value === "true",
                }))
              }
              value={formData.status}
            >
              <option value="" disabled>
                {t("labels.selectItem")}
              </option>
              <option value="true">{t("labels.active")}</option>
              <option value="false">{t("labels.inactive")}</option>
            </select>
          </div>
          
          <div className="col-xl-3 col-lg-3 col-md-6 col-12 text-center">
            <button
              className="btn show_result"
              onClick={(e) => {
                e.preventDefault();
                const filtered = clients?.data?.filter((client) => {
                  const matchesName = formData.name
                    ? client.name
                        .toLowerCase()
                        .includes(formData.name.toLowerCase())
                    : true;

                  const matchesStatus =
                    formData.status !== ""
                      ? String(client.status) === String(formData.status)
                      : true;

                  const matchesDate =
                    formData.report === "from_to"
                      ? client.created_at >= formData.fromDate &&
                        client.created_at <= formData.toDate
                      : true;

                  return (
                    matchesName && matchesStatus && matchesDate
                  );
                });

                setFilteredData(filtered);
                setCurrentPage(1);
              }}
            >
              {t("btns.viewResults")}
            </button>
            <button
              className="btn show_all"
              onClick={(e) => {
                e.preventDefault();
                setFormData({
                  name: "",
                  status: "",
                  report: "",
                  fromDate: "",
                  toDate: "",
                });
                setFilteredData(clients?.data || []);
                setCurrentPage(1);
              }}
            >
              {t("btns.viewAll")}
            </button>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12 text-center">
            <Link to="add_client">
              <span
                className="btn btn-success btn-sm text-sm px-3"
                style={{
                  background: "var(--green-color)",
                  marginTop: "45px",
                  fontSize: "14px",
                }}
              >
                {t("btns.add")}
              </span>
            </Link>
          </div>
        </div>
      </form>
      <div className="table_wrapper">
        {isLoading ? (
          <TableLoader />
        ) : clients?.data?.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col" className="text-lighter">
                    #
                  </th>
                  <th scope="col" className="text-lighter">
                    {t("labels.clientID")}
                  </th>
                  <th scope="col" className="text-lighter">
                    {t("sign.name")}
                  </th>
                  <th scope="col" className="text-lighter">
                    {t("labels.phone")}
                  </th>
                  <th scope="col" className="text-lighter">
                    {t("labels.currentBalance")}
                  </th>
                  <th scope="col" className="text-lighter">
                    {t("labels.rating")}
                  </th>
                  <th className="text-lighter">{t("labels.status")}</th>
                  <th className="text-lighter"> {t("sidenav.tripRequests")}</th>
                  <th className="text-lighter">{t("labels.registration")}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((tr, index) => (
                  <tr key={tr.id || index}>
                    <td className="sub-text">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="sub-text">{tr?.number}</td>
                    <td className="sub-text">{tr?.name}</td>
                    <td className="sub-text" style={{ direction: "ltr" }}>
                      {tr?.phone}
                    </td>
                    <td className="sub-text">$ {tr?.balance}</td>
                    <td className="sub-text">
                      {tr?.rate >= 1 ? (
                        <>
                          <i className="bi bi-star-fill text-warning"></i> (
                          {tr.rate})
                        </>
                      ) : (
                        <>
                          <i className="bi bi-star text-warning"></i> (0)
                        </>
                      )}
                    </td>

                    <td
                      className={
                        tr.status === true ? "text-color" : "highlight-text"
                      }
                    >
                      {tr.status === true
                        ? t("labels.active")
                        : t("labels.inactive")}
                    </td>
                    <td className="sub-text">{t("labels.nothing")} </td>
                    <td className="sub-text" style={{ direction: "ltr" }}>
                      {tr?.created_at}
                    </td>
                    <td className="d-flex justify-content-center">
                      <Link
                        className="btn px-0 mx-1"
                        to={`/clients/show_client/${tr.id}`}
                      >
                        <span className="highlight-green px-0 mx-1 mb-0">
                          <i className="bi bi-eye"></i>
                        </span>
                      </Link>
                      <Link
                        className="btn px-0 mx-1"
                        to={`/clients/edit_client/${tr.id}`}
                      >
                        <span className="text-color px-0 mx-1 mb-0">
                          <i className="bi bi-pen"></i>
                        </span>
                      </Link>
                      <button
                        className="btn px-0 mx-1"
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

export default Clients;

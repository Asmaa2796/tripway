import React, { useEffect, useState } from "react";
import { useTitle } from "../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBank,
  fetchBanks,
  clearState,
} from "../../redux/Slices/BanksSlice";
import TableLoader from "../../pages/TableLoader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Banks = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const { isLoading, banks, error, success } = useSelector(
    (state) => state.banks
  );
  const allBanks = banks?.data || [];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [filterName, setFilterName] = useState("");       // input value
  const [appliedFilter, setAppliedFilter] = useState(""); // applied on click

  const filteredBanks = allBanks.filter((bank) =>
    bank.name.toLowerCase().includes(appliedFilter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBanks.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBanks.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setTitle(t("sidenav.banks"));
  }, [setTitle, t, i18n.language]);

  useEffect(() => {
    dispatch(clearState());
    dispatch(fetchBanks());
  }, [dispatch, t, i18n.language, success]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm(t("labels.confirmDelete"))) {
      dispatch(deleteBank({ bank_id: id }));
    }
  };

  useEffect(() => {
    if (success) {
      toast.success(t("labels.deleteSuccess"));
      dispatch(fetchBanks());
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
      <form className="table_form form-style my-3 py-3">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t("labels.bankName")}</label>
             <input
              type="text"
              name="bank_name"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
          </div>
          
          <div className="col-xl-6 col-lg-6 col-md-6 col-12 text-center">
            <button
              type="button"
              className="btn show_result"
              onClick={() => {
                setAppliedFilter(filterName); 
                setCurrentPage(1); 
              }}
            >
              {t("btns.viewResults")}
            </button>
            <button
              type="button"
              className="btn show_all"
              onClick={() => {
                setFilterName("");
                setAppliedFilter("");
                setCurrentPage(1);
              }}
            >
              {t("btns.viewAll")}
            </button>
            <Link
              className="btn text-white"
              style={{
                backgroundColor: "var(--green-color)",
                marginTop: "45px",
              }}
              to="/add_bank"
            >
              {t("btns.add")}
            </Link>
          </div>
        </div>
      </form>

      <div className="table_wrapper">
        <div className="table-responsive">
          {isLoading ? (
            <TableLoader />
          ) : currentItems.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="text-lighter">#</th>
                  <th className="text-lighter">{t("labels.bankName")}</th>
                  <th className="text-lighter">{t("labels.accountName")}</th>
                  <th className="text-lighter">{t("labels.bank_code")}</th>
                  <th className="text-lighter">{t("labels.usage")}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((tr, index) => (
                  <tr key={tr.id || index}>
                    <td className="sub-text">{tr.id || index}</td>
                    <td className="sub-text d-flex align-items-center">
                      <img
                        className="d-inline-block mx-1 rounded-2"
                        src={tr?.logo || "/image.jpg"}
                        onError={(e) => {
                          e.currentTarget.src = "/image.jpg";
                        }}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                        alt="--"
                      />{" "}
                      <span style={{ marginTop: "20px" }}>{tr?.name}</span>
                    </td>
                    <td className="text-color">{tr?.account_name}</td>
                    <td className="sub-text">{tr?.bank_code}</td>
                    <td className="sub-text">
                      {tr?.withdrawal && (
                        <>
                          {t("labels.withdraw")} {tr?.deposit && "/"}
                        </>
                      )}
                      {tr?.deposit && <>{t("labels.deposit")}</>}
                    </td>
                    <td>
                      <Link
                        className="btn px-0 mx-1"
                        to={`/edit_bank/${tr.id}`}
                      >
                        <span className="text-color">
                          <i className="bi bi-pen"></i>
                        </span>
                      </Link>
                      <button
                        className="btn px-0 mx-1"
                        onClick={(e) => handleDelete(e, tr.id)}
                      >
                        <span className="text-danger">
                          <i className="bi bi-trash"></i>
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div
              className="no_data text-center rounded my-2 p-3"
              style={{ backgroundColor: "#569a8b" }}
            >
              <h5 className="my-2 text-md text-white">{t("labels.noData")}</h5>
            </div>
          )}
        </div>
      </div>

      {/* pagination  */}
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {/* Previous button */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <a
              className="page-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
              tabIndex="-1"
              aria-disabled={currentPage === 1}
            >
              <i className="fa fa-caret-right"></i>
            </a>
          </li>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
            >
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(i + 1);
                }}
              >
                {i + 1}
              </a>
            </li>
          ))}

          {/* Next button */}
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
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
              }}
              aria-disabled={currentPage === totalPages}
            >
              <i className="fa fa-caret-left"></i>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Banks;

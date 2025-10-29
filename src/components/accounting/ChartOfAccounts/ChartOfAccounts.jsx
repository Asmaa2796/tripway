import React, { useEffect, useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { useTitle } from "../../../context/TitleContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  deleteChartAccounts,
  fetchChartAccounts,
  fetchArchivedChartAccounts,
  createSubAccount,
  restoreRecord,
  moveAccount,
} from "../../../redux/Slices/ChartAccountsSlice";
import { fetchAccountsTree } from "../../../redux/Slices/EasyEntriesSlice";
import { toast as notify } from "react-toastify";
import { toast as hotToast } from "react-hot-toast";
import TableLoader from "../../../pages/TableLoader";

const ChartOfAccounts = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedParent, setSelectedParent] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  // put this near the top with your other useState hooks
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page to 1 when tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);
  const {
    chart_accounts,
    archived,
    isLoading,
    success,
    error,
    successSub,
    errorSub,
    successMove,
    errorMove,
    deleteSuccess,
    deleteError,
    restoreSuccess,
    restoreError,
  } = useSelector((state) => state.chart_accounts);
  const { tree } = useSelector((state) => state.easy_entries);
  useEffect(() => {
    setTitle(t("sidenav.chartOfAccounts"));
    document.title = t("sidenav.chartOfAccounts");
    dispatch(fetchAccountsTree());
    return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language, dispatch]);

  useEffect(() => {
    dispatch(clearState());
    switch (activeTab) {
      case "all":
        dispatch(fetchChartAccounts());
        break;
      case "archived":
        dispatch(fetchArchivedChartAccounts());
        break;
      default:
        break;
    }
  }, [activeTab, dispatch, i18n.language]);

  const getDataByTab = () => {
    switch (activeTab) {
      case "all":
        return chart_accounts;
      case "archived":
        return archived;
      default:
        return [];
    }
  };

  useEffect(() => {
    dispatch(clearState());
    dispatch(fetchChartAccounts());
  }, [dispatch, t, i18n.language, success]);

  // dynamic items per page
  const itemsPerPage = activeTab === "archived" ? 5 : 1;

  // Select correct dataset based on tab
  const dataByTab = getDataByTab() || [];

  // Only top-level accounts for ALL tab, but keep flat for archived
  const topLevelAccounts = activeTab === "archived" ? dataByTab : dataByTab;

  const activeData = filteredData.length > 0 ? filteredData : topLevelAccounts;

  // Total pages
  const totalPages = Math.ceil(activeData.length / itemsPerPage);

  // Paginated slice
  const paginatedData = activeData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm(t("labels.confirmDelete"))) {
      dispatch(deleteChartAccounts(id));
    }
  };
  useEffect(() => {
    if (deleteSuccess) {
      notify.success(t("labels.deleteSuccess"));
      dispatch(fetchChartAccounts());
      dispatch(clearState());
    }
    if (deleteError) {
      notify.error(t("labels.deleteFail"));
      dispatch(clearState());
    }
  }, [deleteSuccess, deleteError, dispatch, t]);
  const handleRestore = (e, id) => {
    e.preventDefault();
    dispatch(restoreRecord({ id }))
      .unwrap()
      .then(() => {
        dispatch(fetchArchivedChartAccounts());
      })
      .catch(() => {});
  };
  // restore
  useEffect(() => {
    if (restoreSuccess) {
      notify.success(t("labels.restoredSuccess"));
      dispatch(fetchArchivedChartAccounts());
      dispatch(clearState());
    }
    if (restoreError) {
      notify.error(t("labels.restoredFail"));
      dispatch(clearState());
    }
  }, [restoreSuccess, restoreError, dispatch, t]);
  // recursive function to render options
  const renderAccountOptions = (accounts, level = 0, excludeId = null) => {
    return accounts.flatMap((acc) => {
      if (acc.id === excludeId) return []; // skip self

      return [
        <option key={acc.id} value={acc.id}>
          {"-".repeat(level * 2)} {acc.name}
        </option>,
        ...(acc.children && acc.children.length > 0
          ? renderAccountOptions(acc.children, level + 1, excludeId)
          : []),
      ];
    });
  };
  const handleMoveAccount = (e, account) => {
    e.preventDefault();
    setSelectedParent(account);
  };
  // modal + button for create sub account
  const handleCreateSubAccount = (e, account) => {
    e.preventDefault();
    setSelectedParent(account);
  };
  // for add sub account
  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    nature_account: "",
  });
  // for move account
  const [moveForm, setMoveForm] = useState({
    new_parent_id: "",
  });

  const handleChangeSub = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeMove = (e) => {
    setMoveForm({
      ...moveForm,
      [e.target.name]: e.target.value,
    });
  };

  // submit for add new sub account
  const handleSubmitCreateSubAccount = (e) => {
    e.preventDefault();
    if (!selectedParent) return;

    const payload = {
      parent_id: selectedParent.parent_id,
      name_ar: formData.name_ar,
      name_en: formData.name_en,
      nature_account: formData.nature_account,
    };

    dispatch(createSubAccount(payload));
    setFormData({ name_ar: "", name_en: "", nature_account: "" });
  };
  // submit for move account
  const handleSubmitMoveAccount = (e) => {
    e.preventDefault();
    if (!selectedParent) return;

    const payload = {
      account_id: selectedParent.id,
      new_parent_id: moveForm.new_parent_id,
    };

    dispatch(moveAccount(payload));
  };
  console.log(chart_accounts);
  useEffect(() => {
    if (successSub) {
      hotToast.success(t("sub_account_added_successfully"));

      setTimeout(() => {
        window.location.reload();
      }, 500);
      setSelectedParent(null);
      setFormData({ name_ar: "", name_en: "", nature_account: "" });
      dispatch(clearState());
      dispatch(fetchChartAccounts());
    }

    if (errorSub) {
      hotToast.error(t("failed_to_add_sub_account"));
      dispatch(clearState());
    }
  }, [successSub, errorSub, dispatch]);
  useEffect(() => {
    if (successMove) {
      hotToast.success(t("account_moved_successfully"));

      setTimeout(() => {
        window.location.reload();
      }, 500);
      setSelectedParent(null);
      setMoveForm({ new_parent_id: "" });
      dispatch(clearState());
      dispatch(fetchChartAccounts());
    }

    if (errorMove) {
      hotToast.error(t("failed_to_move_account"));
      dispatch(clearState());
    }
  }, [successMove, errorMove, dispatch]);
  useEffect(() => {
    const subModal = document.getElementById("subAccountModal");
    const moveModal = document.getElementById("moveAccountModal");

    const handleSubShow = () => {
      setFormData({ name_ar: "", name_en: "", nature_account: "" });
    };

    const handleMoveShow = () => {
      setMoveForm({ new_parent_id: "" });
    };

    subModal?.addEventListener("show.bs.modal", handleSubShow);
    moveModal?.addEventListener("show.bs.modal", handleMoveShow);

    return () => {
      subModal?.removeEventListener("show.bs.modal", handleSubShow);
      moveModal?.removeEventListener("show.bs.modal", handleMoveShow);
    };
  }, []);
  // filter table
  const [filters, setFilters] = useState({
    accountName: "all",
    accountType: "all",
    accountLevel: "all",
  });
  const applyFilter = () => {
    let filtered = [...getDataByTab()];

    const matchesFilter = (item) => {
      // Check account name filter
      if (
        filters.accountName !== "all" &&
        item.id.toString() !== filters.accountName.toString()
      )
        return false;

      // Check account type filter
      if (
        filters.accountType !== "all" &&
        item.account_type !== filters.accountType
      )
        return false;

      // Check account level filter (by id)
      if (
        filters.accountLevel !== "all" &&
        item.id.toString() !== filters.accountLevel.toString()
      )
        return false;

      return true;
    };

    // recursive search because accounts are nested
    const filterTree = (nodes) =>
      nodes
        .map((node) => {
          const children = node.children ? filterTree(node.children) : [];
          if (matchesFilter(node) || children.length > 0) {
            return { ...node, children };
          }
          return null;
        })
        .filter(Boolean);

    const result = filterTree(filtered);

    setFilteredData(result);
    setCurrentPage(1);
  };

  // account type key
  const accountTypeKey = (type) => {
    switch (type) {
      case "income_list":
        return "incomeList";
      case "balance_sheet":
        return "balanceSheet";
      case "internal_income_list":
        return "internalIncomeList";
      default:
        return "undefined";
    }
  };

  const renderRows = (data, level = 0, parentIndex = "") => {
    return data.map((tr, index) => {
      const rowIndex = parentIndex
        ? `${parentIndex}.${index + 1}`
        : `${index + 1}`;

      let iconClass = "bi-folder text-color"; // top-level
      if (level === 1) iconClass = "bi-diagram-2 text-dark";
      if (level >= 2) iconClass = "bi-arrow-return-right highlight-green";

      return (
        <React.Fragment key={tr.id || rowIndex}>
          <tr>
            <td className="sub-text">{rowIndex}</td>

            <td
              className="sub-text"
              style={{ textAlign: i18n.language === "ar" ? "right" : "left" }}
            >
              <span
                style={{
                  [i18n.language === "ar" ? "paddingRight" : "paddingLeft"]: `${
                    level * 20
                  }px`,
                }}
              >
                <i className={`bi ${iconClass} me-2`}></i>&nbsp;
                <Link to="#">{tr?.name}</Link>
              </span>
            </td>

            <td className="sub-text">{tr?.code || "--"}</td>
            <td className="sub-text">{tr?.desc || "--"}</td>
            <td
              className={`sub-text ${
                tr?.account_type === "undefined"
                  ? "highlight-text"
                  : "highlight-blue"
              }`}
            >
              {t(`labels.${accountTypeKey(tr?.account_type)}`) || "--"}
            </td>
            <td
              className={`sub-text fw-bold ${
                tr?.accept_payments === false ? "text-danger" : "text-success"
              }`}
            >
              {tr?.accept_payments === false ? (
                <i className="bi bi-x-circle-fill text-md fw-bold"></i>
              ) : (
                <i className="bi bi-check-circle-fill text-md fw-bold"></i>
              )}
            </td>
            {activeTab !== "archived" && (
              <>
                <td className="d-flex justify-content-center gap-2">
                  <Link
                    className="btn px-1 highlight-green"
                    data-tooltip-id="global-tooltip"
                    data-tooltip-content={t("labels.view")}
                    to={`/show_chart_accounts/${tr.id}`}
                  >
                    <i className="bi bi-eye"></i>
                  </Link>

                  <Link
                    className="btn px-1 text-color"
                    data-tooltip-id="global-tooltip"
                    data-tooltip-content={t("labels.edit")}
                    to={`/edit_chart_accounts/${tr.id}`}
                  >
                    <i className="bi bi-pen"></i>
                  </Link>

                  {tr?.can_delete && (
                    <button
                      className="btn px-1 text-danger"
                      data-tooltip-id="global-tooltip"
                      data-tooltip-content={t("labels.delete")}
                      onClick={(e) => handleDelete(e, tr.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  )}

                  {tr?.can_add_subaccount && (
                    <button
                      className="btn px-1 text-dark"
                      onClick={(e) => handleCreateSubAccount(e, tr)}
                      data-bs-toggle="modal"
                      data-bs-target="#subAccountModal"
                      data-tooltip-id="global-tooltip"
                      data-tooltip-content={t("labels.addSubAccountTo")}
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  )}

                  {tr?.can_move && (
                    <button
                      className="btn px-1 text-info"
                      onClick={(e) => handleMoveAccount(e, tr)}
                      data-bs-toggle="modal"
                      data-bs-target="#moveAccountModal"
                      data-tooltip-id="global-tooltip"
                      data-tooltip-content={t("labels.moveAccount")}
                    >
                      <i className="bi bi-arrows-move"></i>
                    </button>
                  )}
                </td>
              </>
            )}

            {activeTab === "archived" && (
              <>
                <td>
                  <button
                    className="btn btn-lg"
                    data-tooltip-id="global-tooltip"
                    data-tooltip-content={t("btns.restore")}
                    onClick={(e) => handleRestore(e, tr.id)}
                  >
                    <span className="text-primary px-0 mx-1 mb-0">
                      <i className="bi bi-arrow-clockwise"></i>
                    </span>
                  </button>
                </td>
              </>
            )}
          </tr>

          {tr.children &&
            tr.children.length > 0 &&
            renderRows(tr.children, level + 1, rowIndex)}
        </React.Fragment>
      );
    });
  };
  const renderTabButton = (key, label) => (
    <li className="nav-item">
      <button
        className={`nav-link ${activeTab === key ? "active" : ""}`}
        onClick={() => {
          setActiveTab(key);
        }}
      >
        {label}
      </button>
    </li>
  );
  return (
    <>
      <div className="row form-style filter_chart_account_table">
        <div className="col-xl-3 col-lg-3 col-md-6 col-12">
          <label className="text-sm mb-2">{t("labels.accountName")}</label>
          <select
            className="input-div w-100"
            value={filters.accountName}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, accountName: e.target.value }))
            }
          >
            <option value="all">{t("labels.all")}</option>
            {tree &&
              tree.length > 0 &&
              tree?.map((opt) => (
                <option key={opt?.id} value={opt?.id}>
                  {opt?.name}
                </option>
              ))}
          </select>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-6 col-12">
          <label className="text-sm mb-2">{t("labels.accountType")}</label>
          <select
            className="input-div w-100"
            value={filters.accountType}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, accountType: e.target.value }))
            }
          >
            <option value="all">{t("labels.all")}</option>
            <option value="undefined">{t("labels.undefined")}</option>
            <option value="income_list">{t("labels.incomeList")}</option>
            <option value="balance_sheet">{t("labels.balanceSheet")}</option>
            <option value="internal_income_list">
              {t("labels.internalIncomeList")}
            </option>
          </select>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-6 col-12">
          <label className="text-sm mb-2">{t("labels.accountLevel")}</label>
          <select
            className="input-div w-100"
            value={filters.accountLevel}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, accountLevel: e.target.value }))
            }
          >
            <option value="all">{t("labels.all")}</option>
            {chart_accounts &&
              chart_accounts.length > 0 &&
              chart_accounts.map((opt) => (
                <option key={opt?.id} value={opt?.id}>
                  {opt?.name}
                </option>
              ))}
          </select>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-6 col-12">
          <div style={{ textAlign: i18n.language === "ar" ? "left" : "right" }}>
            <button
              className="btn btn-sm text-white mt-5"
              style={{ backgroundColor: "var(--green-color)" }}
              onClick={(e) => {
                e.preventDefault();
                applyFilter();
              }}
            >
              {t("btns.viewResults")}
            </button>
          </div>
        </div>
      </div>
      <div className="my-3">
        <div className="row">
          <div className="col-xl-10 col-lg-10 col-md-10 col-12">
            {/* Tabs */}
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              {renderTabButton("all", t("labels.account_tree"))}
              {renderTabButton("archived", t("labels.archived"))}
            </ul>
          </div>
          <div className="col-xl-2 col-lg-2 col-md-2 col-12">
            <div
              style={{ textAlign: i18n.language === "ar" ? "left" : "right" }}
            >
              <Link to="/add_chart_accounts">
                <span
                  className="btn btn-success btn-sm text-sm px-3"
                  style={{
                    background: "var(--green-color)",
                    marginTop: "8px",
                    fontSize: "14px",
                  }}
                >
                  {t("btns.add")}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="table_wrapper">
        {isLoading ? (
          <TableLoader />
        ) : dataByTab?.length > 0 ? (
          <>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{t("labels.accountName")}</th>
                    <th>{t("labels.code")}</th>
                    <th>{t("labels.description")}</th>
                    <th>{t("labels.accountType")}</th>
                    <th>{t("labels.acceptPayments")}</th>
                    {activeTab !== "archived" && <th></th>}
                    {activeTab === "archived" && <th></th>}
                  </tr>
                </thead>
                <tbody>{renderRows(paginatedData)}</tbody>
              </table>
            </div>
            <Tooltip
              id="global-tooltip"
              place="top"
              className="custom-tooltip"
              style={{ fontSize: "11px", fontWeight: "bold" }}
            />
          </>
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

      {/* sub account modal */}
      <div
        className="modal fade"
        id="subAccountModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form
            className="modal-content form-style"
            onSubmit={handleSubmitCreateSubAccount}
          >
            <div className="modal-header">
              <button
                type="button"
                className="btn-close btn-sm text-xs"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <b className="main-color">
                {t("labels.addSubAccountTo")} : {selectedParent?.name}
              </b>
              <hr />

              <label className="fw-bold text-sm">
                {t("labels.nameArabic")}
              </label>
              <input
                className="input-bg"
                name="name_ar"
                value={formData.name_ar}
                required
                onChange={handleChangeSub}
              />

              <label className="fw-bold text-sm">
                {t("labels.nameEnglish")}
              </label>
              <input
                className="input-bg"
                name="name_en"
                required
                value={formData.name_en}
                onChange={handleChangeSub}
              />

              <label className="fw-bold text-sm">
                {t("labels.natureAccount")}
              </label>
              <select
                className="input-bg"
                name="nature_account"
                value={formData.nature_account}
                onChange={handleChangeSub}
                required
              >
                <option value="" disabled>
                  {t("labels.selectItem")}
                </option>
                <option value="debitor">{t("labels.debitor")}</option>
                <option value="creditor">{t("labels.creditor")}</option>
              </select>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger btn-sm text-sm"
                data-bs-dismiss="modal"
              >
                {t("btns.close")}
              </button>
              <button type="submit" className="btn btn-primary btn-sm text-sm">
                {t("btns.saveChanges")}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* move account modal */}
      <div
        className="modal fade"
        id="moveAccountModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form
            className="modal-content form-style"
            onSubmit={handleSubmitMoveAccount}
          >
            <div className="modal-header">
              <button
                type="button"
                className="btn-close btn-sm text-xs"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <b className="main-color">
                {t("labels.moveAccount")} : {selectedParent?.name}
              </b>
              <hr />

              <label className="fw-bold text-sm">
                {t("labels.mainAccount")}
              </label>
              <select
                className="input-bg"
                name="new_parent_id"
                value={moveForm.new_parent_id}
                onChange={handleChangeMove}
                required
              >
                <option value="" disabled>
                  {t("labels.selectItem")}
                </option>
                {renderAccountOptions(chart_accounts, 0, selectedParent?.id)}
              </select>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger btn-sm text-sm"
                data-bs-dismiss="modal"
              >
                {t("btns.close")}
              </button>
              <button type="submit" className="btn btn-primary btn-sm text-sm">
                {t("btns.saveChanges")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChartOfAccounts;

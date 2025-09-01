import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTitle } from "../../context/TitleContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  clearState,
  deleteEmployees,
  fetchEmployees,
} from "../../redux/Slices/EmployeesSlice";

import { toast } from "react-toastify";
import TableLoader from "../../pages/TableLoader";
import {
  fetchManagements,
  fetchRoles,
  fetchBranches,
  fetchJobsByManagement,
} from "../../redux/Slices/authSlice";

const Employees = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const [isFiltering, setIsFiltering] = useState(false);
  const [activeBranchTab, setActiveBranchTab] = useState("all");

  const { employees, isLoading, success,error } = useSelector(
    (state) => state.employees
  );
  const { managements, jobs, branches, roles } = useSelector(
    (state) => state.auth
  );

  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [selectedManagements, setSelectedManagements] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);

  const employeeOptions =
    employees?.data?.map((emp) => ({ value: emp.id, label: emp.name })) || [];
  const branchOptions =
    branches?.map((branch) => ({ value: branch.id, label: branch.name })) || [];
  const managementOptions =
    managements?.map((man) => ({ value: man.id, label: man.name })) || [];
  const jobOptions =
    jobs?.map((job) => ({ value: job.id, label: job.name })) || [];
  const rolesOptions =
    roles?.map((role) => ({ value: role.id, label: role.name })) || [];
  const statusOptions = [
    { value: true, label: t("labels.active") },
    { value: false, label: t("labels.inactive") },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // filter func
  const filterEmployees = () => {
    const original = employees?.data || [];

    if (!isFiltering) return original;

    let filtered = [...original];

    // Filter by selected employees
    if (selectedEmployees.length) {
      const ids = selectedEmployees.map((emp) => String(emp.value));
      filtered = filtered.filter((emp) => ids.includes(String(emp.id)));
    }

    // Filter by email
    const emailInput = emailRef.current?.value?.trim();
    if (emailInput) {
      filtered = filtered.filter((emp) =>
        emp.email?.toLowerCase().includes(emailInput.toLowerCase())
      );
    }

    // Filter by roles
    if (selectedRoles.length) {
      const roleIds = selectedRoles.map((r) => String(r.value));
      filtered = filtered.filter((emp) =>
        roleIds.includes(String(emp.role_id))
      );
    }

    // Filter by branches
    if (selectedBranches.length) {
      const branchIds = selectedBranches.map((b) => String(b.value));
      filtered = filtered.filter((emp) =>
        branchIds.includes(String(emp.branch_id))
      );
    }

    // Filter by managements
    if (selectedManagements.length) {
      const managementIds = selectedManagements.map((mgt) => String(mgt.value));
      filtered = filtered.filter((emp) =>
        managementIds.includes(String(emp.management_id))
      );

      // If jobs are selected, further filter by job_id
      if (selectedJobs.length) {
        const jobIds = selectedJobs.map((job) => String(job.value));
        filtered = filtered.filter((emp) =>
          jobIds.includes(String(emp.job_id))
        );
      }
    }

    // Filter by status
    if (selectedStatus.length) {
      const statuses = selectedStatus.map((s) => String(s.value));
      filtered = filtered.filter((emp) =>
        statuses.includes(String(emp.status))
      );
    }

    return filtered;
  };

  const filteredEmployees = useMemo(() => {
    return isFiltering ? filterEmployees() : employees?.data || [];
  }, [
    isFiltering,
    employees,
    selectedEmployees,
    selectedBranches,
    selectedManagements,
    selectedJobs,
    selectedRoles,
    selectedStatus,
    jobs,
  ]);
  const employeeList = filteredEmployees.filter((emp) =>
    activeBranchTab === "all"
      ? true
      : String(emp.branch_id) === String(activeBranchTab)
  );

  const totalPages = Math.ceil(employeeList.length / itemsPerPage);
  const paginatedData = employeeList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setTitle(t("sidenav.employees"));
  }, [setTitle, t, i18n.language]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeBranchTab]);

  useEffect(() => {
    dispatch(clearState());
    dispatch(fetchEmployees());
    dispatch(fetchManagements());
    dispatch(fetchBranches());
    dispatch(fetchRoles());
  }, [dispatch, t, i18n.language, success,error]);

  useEffect(() => {
    if (selectedManagements.length) {
      const ids = selectedManagements.map((mgt) => mgt.value);
      dispatch(fetchJobsByManagement(ids));
    }
  }, [selectedManagements]);

  const handleDelete = (e, id) => {
  e.preventDefault();
  if (window.confirm(t("labels.confirmDelete"))) {
    dispatch(deleteEmployees({ user_id: id }));
  }
};
  useEffect(() => {
  if (success) {
    toast.success(t("labels.deleteSuccess"));
    dispatch(fetchEmployees());
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
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.employee")}</label>
            <Select
              isMulti
              classNamePrefix="react-select"
              options={employeeOptions}
              value={selectedEmployees}
              onChange={setSelectedEmployees}
              placeholder={t("labels.employee")}
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.branchTripway")}</label>
            <Select
              isMulti
              classNamePrefix="react-select"
              options={branchOptions}
              value={selectedBranches}
              onChange={setSelectedBranches}
              placeholder={t("labels.branchTripway")}
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.management")}</label>
            <Select
              isMulti
              classNamePrefix="react-select"
              options={managementOptions}
              value={selectedManagements}
              onChange={setSelectedManagements}
              placeholder={t("labels.management")}
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.job")}</label>
            <Select
              isMulti
              isDisabled={!selectedManagements.length}
              classNamePrefix="react-select"
              options={jobOptions}
              value={selectedJobs}
              onChange={setSelectedJobs}
              placeholder={
                selectedManagements.length
                  ? t("labels.job")
                  : t("labels.selectManagmentFirstly")
              }
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.permissions")}</label>
            <Select
              isMulti
              classNamePrefix="react-select"
              options={rolesOptions}
              value={selectedRoles}
              onChange={setSelectedRoles}
              placeholder={t("labels.permissions")}
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.status")}</label>
            <Select
              isMulti
              classNamePrefix="react-select"
              options={statusOptions}
              value={selectedStatus}
              onChange={setSelectedStatus}
              placeholder={t("labels.status")}
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <label className="text-light">{t("labels.email")}</label>
            <input
              type="text"
              name="email"
              ref={emailRef}
              placeholder="example@gmail.com"
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-12 text-center">
            <div>
              <button
                type="button"
                className="btn show_result"
                style={{ marginTop: "45px" }}
                onClick={(e) => {
                  e.preventDefault();
                  setIsFiltering(true);
                  setCurrentPage(1);
                }}
              >
                {t("btns.viewResults")}
              </button>
              <button
                type="button"
                className="btn show_all"
                style={{ marginTop: "45px" }}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedEmployees([]);
                  setSelectedBranches([]);
                  setSelectedManagements([]);
                  setSelectedJobs([]);
                  setSelectedStatus([]);
                  setSelectedRoles([]);
                  if (emailRef.current) emailRef.current.value = "";
                  setIsFiltering(false);
                  setCurrentPage(1);
                }}
              >
                {t("btns.viewAll")}
              </button>
            </div>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-12 text-center">
            <div>
              <Link to="/add_employees">
                <span
                  className="btn btn-warning btn-sm text-sm px-3"
                  style={{ marginTop: "45px" }}
                >
                  {t("labels.add_employees")}
                </span>
              </Link>
              <button
                type="button"
                className="btn btn-success btn-sm text-sm px-3"
                style={{
                  background: "var(--green-color)",
                  marginRight: "5px",
                  marginTop: "45px",
                  fontSize: "14px",
                }}
                data-bs-toggle="modal"
                data-bs-target="#export"
              >
                {t("labels.export_employees")}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Branch Tabs */}
      <ul className="nav nav-tabs my-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeBranchTab === "all" ? "active" : ""}`}
            onClick={() => setActiveBranchTab("all")}
          >
            {t("labels.all")}
          </button>
        </li>
        {branches?.map((branch) => (
          <li className="nav-item" key={branch.id}>
            <button
              className={`nav-link ${
                activeBranchTab === String(branch.id) ? "active" : ""
              }`}
              onClick={() => setActiveBranchTab(String(branch.id))}
            >
              {branch.name}
            </button>
          </li>
        ))}
      </ul>

      {/* Table Section */}
      <div className="table_wrapper">
        {isLoading ? (
          <TableLoader />
        ) : employeeList && employeeList.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t("labels.employmentNumber")}</th>
                  <th>{t("labels.name")}</th>
                  <th>{t("labels.idNumber")}</th>
                  <th>{t("labels.branchName")}</th>
                  <th>{t("labels.managementName")}</th>
                  <th>{t("labels.jobName")}</th>
                  <th>{t("labels.phone")}</th>
                  <th>{t("labels.email")}</th>
                  <th>{t("labels.status")}</th>
                  <th>{t("labels.employmentDate")}</th>
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
                      {tr?.employment_number || "--"}
                    </td>
                    <td className="sub-text">{tr?.name || "--"}</td>
                    <td className="sub-text">{tr?.id_number || "--"}</td>
                    <td className="sub-text">{tr?.branch_name || "--"}</td>
                    <td className="sub-text">{tr?.management_name || "--"}</td>
                    <td className="sub-text">{tr?.job_name || "--"}</td>
                    <td className="sub-text">{tr?.phone || "--"}</td>
                    <td className="sub-text">{tr?.email || "--"}</td>
                    <td
                      className={
                        tr.status === true ? "text-color" : "highlight-text"
                      }
                    >
                      {tr.status === true
                        ? t("labels.active")
                        : t("labels.inactive")}
                    </td>
                    <td className="sub-text">{tr?.employment_date || "--"}</td>

                    <td className="d-flex justify-content-center">
                      <Link className="btn" to={`/show_employee/${tr.id}`}>
                        <span className="text-success px-0 mx-1 mb-0">
                          <i className="bi bi-eye"></i>
                        </span>
                      </Link>
                      <Link className="btn" to={`/edit_employee/${tr.id}`}>
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

      {/* Modal */}
      <div
        className="modal fade"
        id="export"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content border-light">
            <div className="modal-header pb-0 border-0 justify-content-end">
              <button
                type="button"
                className="close btn p-0"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">--</div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn text-white btn-sm"
                style={{
                  background: "var(--green-color)",
                  marginRight: "5px",
                  fontSize: "13px",
                }}
              >
                {t("btns.export")}
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                style={{ fontSize: "13px" }}
                data-bs-dismiss="modal"
              >
                {t("btns.cancel")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Employees;

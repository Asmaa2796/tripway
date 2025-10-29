import React, { useEffect, useState } from "react";
import { useTitle } from "../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { addEmployees, clearState } from "../../redux/Slices/EmployeesSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchAccounts,
  fetchCities,
  fetchRoles,
  fetchManagements,
  fetchAllJobs,
  fetchJobsByManagement,
  fetchCompanies,
  fetchBranches,
} from "../../redux/Slices/authSlice";
const AddEmployees = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const commonSelectProps = {
    className: "react-select-container",
    classNamePrefix: "react-select",
  };

  const { managements, jobs, branches, roles, companies, cities, accounts } =
    useSelector((state) => state.auth);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedManagement, setSelectedManagement] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [companyControlSelect, setCompanyControlSelect] = useState(null);
  const [winchBranchControlSelect, setWinchBranchControlSelect] =
    useState(null);
  const [individualCustomerControl, setIndividualCustomerControl] =
    useState(null);
  const [unregisteredCompaniesControl, setUnregisteredCompaniesControl] =
    useState(null);
  const [companySource, setCompanySource] = useState([]);
  const [generalSupervisor, setGeneralSupervisor] = useState([]);
  const [operationsSupervisor, setOperationsSupervisor] = useState([]);

  const accountsOptions =
    accounts?.map((account) => ({ value: account.id, label: account.name })) ||
    [];
  const citiesOptions =
    cities?.data?.map((city) => ({ value: city.id, label: city.name })) || [];
  const companiesOptions =
    companies?.data?.map((company) => ({
      value: company.id,
      label: company.name,
    })) || [];
  const branchOptions =
    branches?.map((branch) => ({ value: branch.id, label: branch.name })) || [];
  const managementOptions =
    managements?.map((man) => ({ value: man.id, label: man.name })) || [];
  const jobOptions =
    jobs?.map((job) => ({ value: job.id, label: job.name })) || [];
  const rolesOptions =
    roles?.map((role) => ({ value: role.id, label: role.name })) || [];

  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    email: "", // its optional but if filled check if its already exists
    phone: "", // check if its already exists
    password: "",
    image: null, // image
    status: 0, // 1 or 0
    city_id: null,
    employment_number: "",
    department_id: null,
    job_id: null,
    id_number: "",
    employment_date: "",
    stop_date: "",
    id_image: null, // image
    passport_image: null, // image
    employment_image: null, // image
    user_application: 0, // 1 or 0
    company_application: 0, // 1 or 0
    owner_application: 0, // 1 or 0
    company_control: null, // select [all, include, exclude]
    winch_branch_control: null, // select [all, include, exclude]
    individual_customer_control: null, // select [show,hide]
    branch_id: null,
    customize_sector_id: null, // come from fetch companies [fill in store body ,no inputs]
    customize_branch_id: null, // come from fetch companies [fill in store body ,no inputs]
    company_source_id: null, // come from fetch companies [fill in store body ,no inputs]
    general_spervisor_id: null,
    operation_spervisor_id: null,
    control_unregistered_companies: null, // select [show,hide]
    role_id: null,
    parent_id: null,
  });

  const [previews, setPreviews] = useState({
    image: null,
    id_image: null,
    passport_image: null,
    employment_image: null,
  });

  const { isLoading, error, success } = useSelector((state) => state.employees);
  useEffect(() => {
    setTitle(t("labels.add_employees"));
    document.title = t("labels.add_employees");
    dispatch(fetchAccounts());
    dispatch(fetchCities());
    dispatch(fetchRoles());
    dispatch(fetchManagements());
    dispatch(fetchAllJobs());
    dispatch(fetchCompanies());
    dispatch(fetchBranches());
    dispatch(fetchJobsByManagement());
    return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [dispatch, setTitle, t]);

  const handleChange = (e) => {
    const { name, type, checked, files, value } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked ? 1 : 0 }));
    } else if (type === "file") {
      const file = files[0];

      // Validate image type
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/gif",
        "image/svg+xml",
      ];

      if (file && !allowedTypes.includes(file.type)) {
        toast.error(`${t("only_allowed")} jpeg, png, jpg, gif, or svg.`);
        return;
      }

      // Accept and preview valid file
      if (file) {
        setFormData((prev) => ({ ...prev, [name]: file }));

        const previewUrl = URL.createObjectURL(file);
        setPreviews((prev) => {
          if (prev[name]) URL.revokeObjectURL(prev[name]);
          return { ...prev, [name]: previewUrl };
        });
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    // Store previous URLs to clean up
    const previewUrls = Object.values(previews);

    return () => {
      previewUrls.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [previews]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const extractValues = (arr) =>
      Array.isArray(arr) ? arr.map((item) => item?.value).filter(Boolean) : [];

    const data = new FormData();

    // ✅ Set customize_sector_id from companySource only
    const customizeSectorIds = extractValues(companySource);

    // ✅ Set customize_branch_id from selectedBranch (single select)
    const customizeBranchIds = selectedBranch?.value
      ? [selectedBranch.value]
      : [];

    // Store them in formData for validation
    formData.customize_sector_id = customizeSectorIds.join(",");
    formData.customize_branch_id = customizeBranchIds.join(",");

    const requiredFields = [
      "name_ar",
      "name_en",
      "email",
      "stop_date",
      "phone",
      "password",
      "image",
      "city_id",
      "employment_number",
      "department_id",
      "job_id",
      "id_number",
      "employment_date",
      "id_image",
      "passport_image",
      "employment_image",
      "company_control",
      "winch_branch_control",
      "individual_customer_control",
      "branch_id",
      "customize_sector_id",
      "customize_branch_id",
      "company_source_id",
      "general_spervisor_id",
      "operation_spervisor_id",
      "control_unregistered_companies",
      "role_id",
    ];

    const switchFields = [
      "status",
      "user_application",
      "company_application",
      "owner_application",
    ];

    switchFields.forEach((field) => {
      const value = formData[field] ?? 0;
      data.append(field, value);
    });

    const emptyFields = [];
    const filledFields = [];

    const fileFieldsList = [
      "image",
      "id_image",
      "passport_image",
      "employment_image",
    ];

    for (let field of requiredFields) {
      const value = fileFieldsList.includes(field)
        ? formData[field]
        : formData[field] || null;

      const isEmpty =
        value === undefined ||
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0);

      if (isEmpty) {
        emptyFields.push(field);
      } else {
        filledFields.push({ field, value });
      }
    }

    if (emptyFields.length > 0) {
      console.warn("⚠️ Empty required fields:", emptyFields);
      filledFields.forEach(({ field, value }) => {
        let result;
        if (Array.isArray(value)) result = value.map((v) => v?.value);
        else if (typeof value === "object" && value !== null) {
          if ("value" in value) result = value.value;
          else if (value instanceof File) result = value.name;
          else result = "(unknown object)";
        } else result = value;
        console.log(`${field}:`, result);
      });
      toast.error(t("labels.please_fill_all_required_fields"));
      return;
    }

    // Append image files
    fileFieldsList.forEach((field) => {
      if (formData[field]) {
        data.append(field, formData[field]);
      }
    });

    const appendSelect = (key, value) => {
      if (Array.isArray(value)) {
        const joined = value.filter((v) => v).join(",");
        if (joined) data.append(key, joined);
      } else if (value?.value !== undefined) {
        data.append(key, value.value);
      } else if (value !== undefined && value !== null && value !== "") {
        data.append(key, value);
      }
    };

    // Append select-based fields
    appendSelect("department_id", formData.department_id);
    appendSelect("job_id", formData.job_id);
    appendSelect("role_id", selectedRole);
    appendSelect("parent_id", selectedAccount);
    appendSelect("city_id", selectedCity);
    appendSelect("branch_id", selectedBranch);
    appendSelect("company_source_id", extractValues(companySource));
    appendSelect("general_spervisor_id", extractValues(generalSupervisor));
    appendSelect("operation_spervisor_id", extractValues(operationsSupervisor));
    appendSelect("company_control", companyControlSelect);
    appendSelect("winch_branch_control", winchBranchControlSelect);
    appendSelect("individual_customer_control", individualCustomerControl);
    appendSelect(
      "control_unregistered_companies",
      unregisteredCompaniesControl
    );
    appendSelect("customize_sector_id", customizeSectorIds);
    appendSelect("customize_branch_id", customizeBranchIds);

    // Append other fields
    for (const key in formData) {
      if (fileFieldsList.includes(key)) continue;
      const value = formData[key];
      if (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        typeof value !== "object"
      ) {
        data.append(key, value);
      }
    }

    // console.log("✅ Final FormData:");
    // for (let pair of data.entries()) {
    //   if (pair[1] instanceof File) {
    //     console.log(pair[0], pair[1].name, pair[1].type);
    //   } else {
    //     console.log(pair[0], pair[1]);
    //   }
    // }
    dispatch(addEmployees(data));
  };

  useEffect(() => {
    if (success) {
      toast.success(t("labels.addedSuccessfully"), {
        onClose: () => {
          dispatch(clearState());
          navigate("/employees");
          window.location = "/employees";
        },
      });
    }

    if (error) {
      const errorMessage = typeof error === "string" ? error : error?.message;
      console.log("Full error:", errorMessage);

      let translatedMessage;

      if (typeof errorMessage === "string") {
        if (errorMessage.includes("email") && errorMessage.includes("taken")) {
          translatedMessage = t("emailTaken");
        } else if (
          errorMessage.includes("password") &&
          errorMessage.includes("least")
        ) {
          translatedMessage = t("passwordTooShort");
        } else if (
          errorMessage.includes("phone") &&
          errorMessage.includes("taken")
        ) {
          translatedMessage = t("phoneTaken");
        } else if (
          errorMessage.includes("image") &&
          errorMessage.includes("required")
        ) {
          translatedMessage = t("imageRequired");
        } else if (
          errorMessage.includes("email") &&
          errorMessage.includes("required")
        ) {
          translatedMessage = t("emailRequired");
        } else if (
          errorMessage.includes("passport") &&
          errorMessage.includes("required")
        ) {
          translatedMessage = t("passportRequired");
        } else {
          translatedMessage = t("labels.failedToAdd");
        }
      } else {
        translatedMessage = t("labels.failedToAdd");
      }

      toast.error(translatedMessage, {
        onClose: () => dispatch(clearState()),
      });
    }
  }, [success, error, t, dispatch, navigate]);

  return (
    <>
      <div style={{ textAlign: i18n.language === "ar" ? "left" : "right" }}>
        <Link to="/employees" className="btn btn-dark btn-sm text-white">
          {t("btns.back")}{" "}
          <i
            className={`bi bi-arrow-${
              i18n.language === "ar" ? "left" : "right"
            } text-xs`}
          ></i>
        </Link>
      </div>
      <ul className="nav nav-tabs mb-4" id="employeeTabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="basic_info-tab"
            data-bs-toggle="tab"
            data-bs-target="#basic_info"
            type="button"
            role="tab"
            aria-controls="basic_info"
            aria-selected="true"
          >
            {t("labels.basic_info")}
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="employment_info-tab"
            data-bs-toggle="tab"
            data-bs-target="#employment_info"
            type="button"
            role="tab"
            aria-controls="employment_info"
            aria-selected="false"
          >
            {t("labels.employment_info")}
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="supervision-tab"
            data-bs-toggle="tab"
            data-bs-target="#supervision"
            type="button"
            role="tab"
            aria-controls="supervision"
            aria-selected="false"
          >
            {t("labels.supervision")}
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="app_access-tab"
            data-bs-toggle="tab"
            data-bs-target="#app_access"
            type="button"
            role="tab"
            aria-controls="app_access"
            aria-selected="false"
          >
            {t("labels.app_access")}
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="customer_permissions-tab"
            data-bs-toggle="tab"
            data-bs-target="#customer_permissions"
            type="button"
            role="tab"
            aria-controls="customer_permissions"
            aria-selected="false"
          >
            {t("labels.customer_permissions")}
          </button>
        </li>
      </ul>
      {/* form */}
      <form
        onSubmit={handleSubmit}
        className="table_form form-style my-3 p-3 rounded bg-white"
      >
        <div className="tab-content" id="employeeTabsContent">
          <div
            className="tab-pane fade show active"
            id="basic_info"
            role="tabpanel"
            aria-labelledby="basic_info-tab"
          >
            {/* basic info */}
            <div className="row align-items-center">
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">{t("labels.name_ar")}</label>
                <input
                  type="text"
                  className="input-bg"
                  name="name_ar"
                  value={formData.name_ar}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">{t("labels.name_en")}</label>
                <input
                  type="text"
                  className="input-bg"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                />
              </div>

              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">
                  {t("labels.registered_account")}
                </label>
                {/* react-select come from fetch accounts and name="parent_id" - option select_item */}
                <Select
                  {...commonSelectProps}
                  name="parent_id"
                  value={selectedAccount}
                  onChange={(selected) => {
                    setSelectedAccount(selected);
                    setFormData((prev) => ({ ...prev, parent_id: selected }));
                  }}
                  options={accountsOptions}
                  placeholder={t("labels.selectItem")}
                />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">{t("labels.phone")}</label>
                <input
                  type="text"
                  className="input-bg"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">
                  {t("labels.email_optional")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">{t("labels.password")}</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">{t("labels.role")}</label>
                {/* react-select come from fetch roles and name role_id - option select_item */}
                <Select
                  {...commonSelectProps}
                  name="role_id"
                  value={selectedRole}
                  onChange={(selected) => {
                    setSelectedRole(selected);
                    setFormData((prev) => ({ ...prev, role_id: selected }));
                  }}
                  options={rolesOptions}
                  placeholder={t("labels.selectItem")}
                />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">{t("labels.city")}</label>
                {/* react-select come from fetch city name="city_id" - option select_item */}
                <Select
                  {...commonSelectProps}
                  name="city_id"
                  value={selectedCity}
                  onChange={(selected) => {
                    setSelectedCity(selected);
                    setFormData((prev) => ({ ...prev, city_id: selected }));
                  }}
                  options={citiesOptions}
                  placeholder={t("labels.selectItem")}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.avatar")}</label>
                {/* image */}
                <div className="d-flex">
                  <div>
                    <div className="file-input">
                      <input
                        type="file"
                        accept=".jpeg,.jpg,.png,.gif,.svg"
                        name="image"
                        id="image"
                        className="file-input__input"
                        onChange={handleChange}
                      />
                      <label className="file-input__label" htmlFor="image">
                        <i className="bi bi-images mx-2"></i>
                        <span> {t("labels.chooseImage")}</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    {previews.image && (
                      <img
                        src={previews.image}
                        alt="--"
                        style={{
                          maxHeight: "65px",
                          borderRadius: "8px",
                          marginInline: "5px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="text-light">{t("labels.status")}</label>
                {/* switch 1 or 0 */}
                <label className="toggle" htmlFor="status">
                  <input
                    className="toggle-checkbox"
                    type="checkbox"
                    id="status"
                    name="status"
                    checked={formData.status === 1}
                    onChange={handleChange}
                  />
                  <div className="toggle-switch"></div>
                  <span className="toggle-label"></span>
                </label>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="employment_info"
            role="tabpanel"
            aria-labelledby="employment_info-tab"
          >
            {/* employment info */}
            <div className="row align-items-center">
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">
                  {t("labels.employee_number")}
                </label>
                <input
                  type="text"
                  className="input-bg"
                  name="employment_number"
                  value={formData.employment_number}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">{t("labels.management")}</label>
                {/* react-select come from fetch managmnet name="name="department_id" - option select_item */}
                <Select
                  name="department_id"
                  value={formData.department_id || null}
                  onChange={(selected) => {
                    setFormData((prev) => ({
                      ...prev,
                      department_id: selected,
                      job_id: null, // reset job when management changes
                    }));
                    const id = selected?.value;
                    if (id) dispatch(fetchJobsByManagement([id]));
                  }}
                  options={managementOptions}
                  {...commonSelectProps}
                  placeholder={t("labels.selectItem")}
                />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">{t("labels.job")}</label>
                {/* react-select name="city_id" come from fetch job based on managemnt and disabled if no mangmnet selected - option select_item */}
                <Select
                  name="job_id"
                  value={formData.job_id || null}
                  onChange={(selected) =>
                    setFormData((prev) => ({ ...prev, job_id: selected }))
                  }
                  options={jobOptions}
                  {...commonSelectProps}
                  isDisabled={!formData.department_id}
                  placeholder={t("labels.selectItem")}
                />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">{t("labels.national_id")}</label>
                {/* input test */}
                <input
                  type="text"
                  className="input-bg"
                  name="id_number"
                  value={formData.id_number}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">
                  {t("labels.employment_date")}
                </label>
                {/* input date name="employment_date" */}
                <input
                  type="date"
                  name="employment_date"
                  className="form-control"
                  value={formData.employment_date}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">
                  {t("labels.termination_date")}
                </label>
                {/* input date  name="stop_date" disabled if employment_date not filled*/}
                <input
                  type="date"
                  name="stop_date"
                  className="form-control"
                  value={formData.stop_date}
                  onChange={handleChange}
                  disabled={!formData.employment_date}
                  min={formData.employment_date || ""}
                />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">
                  {t("labels.identity_photo")}
                </label>
                {/* id_image */}

                <div className="d-flex">
                  <div>
                    <div className="file-input">
                      <input
                        type="file"
                        accept=".jpeg,.jpg,.png,.gif,.svg"
                        name="id_image"
                        id="id_image"
                        className="file-input__input"
                        onChange={handleChange}
                      />
                      <label className="file-input__label" htmlFor="id_image">
                        <i className="bi bi-images mx-2"></i>
                        <span> {t("labels.chooseImage")}</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    {previews.id_image && (
                      <img
                        src={previews.id_image}
                        alt="--"
                        style={{
                          maxHeight: "65px",
                          marginInline: "5px",
                          display: "inline-block",
                          borderRadius: "8px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">
                  {t("labels.passport_photo")}
                </label>
                {/* passport_image */}

                <div className="d-flex">
                  <div>
                    <div className="file-input">
                      <input
                        type="file"
                        accept=".jpeg,.jpg,.png,.gif,.svg"
                        name="passport_image"
                        id="passport_image"
                        className="file-input__input"
                        onChange={handleChange}
                      />
                      <label
                        className="file-input__label"
                        htmlFor="passport_image"
                      >
                        <i className="bi bi-images mx-2"></i>
                        <span> {t("labels.chooseImage")}</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    {previews.passport_image && (
                      <img
                        src={previews.passport_image}
                        alt="--"
                        style={{
                          maxHeight: "65px",
                          marginInline: "5px",
                          display: "inline-block",
                          borderRadius: "8px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">{t("labels.job_contract")}</label>
                {/* employment_image */}
                <div className="d-flex">
                  <div>
                    <div className="file-input">
                      <input
                        type="file"
                        accept=".jpeg,.jpg,.png,.gif,.svg"
                        name="employment_image"
                        id="employment_image"
                        className="file-input__input"
                        onChange={handleChange}
                      />
                      <label
                        className="file-input__label"
                        htmlFor="employment_image"
                      >
                        <i className="bi bi-images mx-2"></i>
                        <span> {t("labels.chooseImage")}</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    {previews.employment_image && (
                      <img
                        src={previews.employment_image}
                        alt="--"
                        style={{
                          maxHeight: "65px",
                          marginInline: "5px",
                          display: "inline-block",
                          borderRadius: "8px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="supervision"
            role="tabpanel"
            aria-labelledby="supervision-tab"
          >
            {/* supervisors */}
            <div className="row align-items-center">
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">
                  {t("labels.company_source")}
                </label>
                <Select
                  {...commonSelectProps}
                  name="company_source_id"
                  isMulti
                  value={companySource}
                  onChange={(selected) => {
                    setCompanySource(selected);
                    setFormData((prev) => ({
                      ...prev,
                      company_source_id: selected,
                    }));
                  }}
                  options={companiesOptions}
                  placeholder={t("labels.selectItem")}
                />
              </div>

              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">
                  {t("labels.general_supervisor")}
                </label>
                <Select
                  {...commonSelectProps}
                  name="general_spervisor_id"
                  isMulti
                  value={generalSupervisor}
                  onChange={(selected) => {
                    setGeneralSupervisor(selected);
                    setFormData((prev) => ({
                      ...prev,
                      general_spervisor_id: selected,
                    }));
                  }}
                  options={companiesOptions}
                  placeholder={t("labels.selectItem")}
                />
              </div>

              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">
                  {t("labels.operations_supervisor")}
                </label>
                <Select
                  {...commonSelectProps}
                  name="operation_spervisor_id"
                  isMulti
                  value={operationsSupervisor}
                  onChange={(selected) => {
                    setOperationsSupervisor(selected);
                    setFormData((prev) => ({
                      ...prev,
                      operation_spervisor_id: selected,
                    }));
                  }}
                  options={companiesOptions}
                  placeholder={t("labels.selectItem")}
                />
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="app_access"
            role="tabpanel"
            aria-labelledby="app_access-tab"
          >
            {/* apps */}
            <div className="row align-items-center">
              <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                <h4 className="text-dark text-lg fw-bold my-3">
                  {t("labels.client_app")}
                </h4>
                <hr />
                <b className="d-block fw-normal">
                  {t("labels.client_supervisor")}
                </b>
                {/* name="user_application" */}
                {/* switch 1 or 0 */}
                <label className="toggle" htmlFor="user_application">
                  <input
                    className="toggle-checkbox"
                    type="checkbox"
                    name="user_application"
                    id="user_application"
                    checked={formData.user_application === 1}
                    onChange={handleChange}
                  />
                  <div className="toggle-switch"></div>
                  <span className="toggle-label"></span>
                </label>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                <h4 className="text-dark text-lg fw-bold my-3">
                  {t("labels.business_app")}
                </h4>
                <hr />
                <b className="d-block fw-normal">
                  {t("labels.client_supervisor")}
                </b>
                {/* name="company_application" */}
                {/* switch 1 or 0 */}
                <label className="toggle" htmlFor="company_application">
                  <input
                    className="toggle-checkbox"
                    type="checkbox"
                    name="company_application"
                    id="company_application"
                    checked={formData.company_application === 1}
                    onChange={handleChange}
                  />
                  <div className="toggle-switch"></div>
                  <span className="toggle-label"></span>
                </label>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                <h4 className="text-dark text-lg fw-bold my-3">
                  {t("labels.partner_app")}
                </h4>
                <hr />
                <b className="d-block fw-normal">
                  {t("labels.client_supervisor")}
                </b>
                {/* name="owner_application" */}
                {/* switch 1 or 0 */}
                <label className="toggle" htmlFor="owner_application">
                  <input
                    className="toggle-checkbox"
                    type="checkbox"
                    name="owner_application"
                    id="owner_application"
                    checked={formData.owner_application === 1}
                    onChange={handleChange}
                  />
                  <div className="toggle-switch"></div>
                  <span className="toggle-label"></span>
                </label>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="customer_permissions"
            role="tabpanel"
            aria-labelledby="customer_permissions-tab"
          >
            {/* clients */}
            <div className="row align-items-center">
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">
                  {t("labels.control_business_sector")}
                </label>
                {/* react-select come from [all,include,exclude] the name="company_control" - option select_item */}
                <Select
                  {...commonSelectProps}
                  name="company_control"
                  value={companyControlSelect}
                  onChange={(selected) => {
                    setCompanyControlSelect(selected);
                    setFormData((prev) => ({
                      ...prev,
                      company_control: selected,
                    }));
                  }}
                  options={[
                    { value: "all", label: t("labels.all") },
                    { value: "include", label: t("labels.include") },
                    { value: "exclude", label: t("labels.exclude") },
                  ]}
                  placeholder={t("labels.selectItem")}
                />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">
                  {t("labels.business_sector")}
                </label>
                {/* react-select come from fetch companies the name="company_source_id" - option select_item */}
                <Select
                  {...commonSelectProps}
                  name="company_source_id"
                  value={selectedCompanies}
                  onChange={(selected) => {
                    setSelectedCompanies(selected);
                    setFormData((prev) => ({
                      ...prev,
                      company_source_id: selected,
                    }));
                  }}
                  isMulti
                  options={companiesOptions}
                  placeholder={t("labels.selectItem")}
                />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">
                  {t("labels.control_wensh_branches")}
                </label>
                {/* react-select come from [all,include,exclude] the name="winch_branch_control" - option select_item */}
                <Select
                  {...commonSelectProps}
                  name="winch_branch_control"
                  value={winchBranchControlSelect}
                  onChange={(selected) => {
                    setWinchBranchControlSelect(selected);
                    setFormData((prev) => ({
                      ...prev,
                      winch_branch_control: selected,
                    }));
                  }}
                  options={[
                    { value: "all", label: t("labels.all") },
                    { value: "include", label: t("labels.include") },
                    { value: "exclude", label: t("labels.exclude") },
                  ]}
                  placeholder={t("labels.selectItem")}
                />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">{t("labels.wensh_branch")}</label>
                {/* react-select come from fetch branches the name="branch_id" - option select_item */}
                <Select
                  {...commonSelectProps}
                  name="branch_id"
                  value={selectedBranch}
                  onChange={(selected) => {
                    setSelectedBranch(selected);
                    setFormData((prev) => ({ ...prev, branch_id: selected }));
                  }}
                  options={branchOptions}
                  placeholder={t("labels.selectItem")}
                />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">
                  {t("labels.control_individual_clients")}
                </label>
                {/* react-select come from [show,hide] the name="individual_customer_control" - option select_item */}
                <Select
                  {...commonSelectProps}
                  name="individual_customer_control"
                  value={individualCustomerControl}
                  onChange={(selected) => {
                    setIndividualCustomerControl(selected);
                    setFormData((prev) => ({
                      ...prev,
                      individual_customer_control: selected,
                    }));
                  }}
                  options={[
                    { value: "show", label: t("labels.show") },
                    { value: "hide", label: t("labels.hide") },
                  ]}
                  placeholder={t("labels.selectItem")}
                />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="text-light">
                  {t("labels.control_unregistered_sectors")}
                </label>
                {/* react-select come from [show,hide] the name="control_unregistered_companies" - option select_item */}
                <Select
                  {...commonSelectProps}
                  name="control_unregistered_companies"
                  value={unregisteredCompaniesControl}
                  onChange={(selected) => {
                    setUnregisteredCompaniesControl(selected);
                    setFormData((prev) => ({
                      ...prev,
                      control_unregistered_companies: selected,
                    }));
                  }}
                  options={[
                    { value: "show", label: t("labels.show") },
                    { value: "hide", label: t("labels.hide") },
                  ]}
                  placeholder={t("labels.selectItem")}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="btn show_all" disabled={isLoading}>
            {isLoading ? t("labels.loading") : t("btns.add")}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddEmployees;

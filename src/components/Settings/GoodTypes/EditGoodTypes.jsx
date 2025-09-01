import React, { useEffect, useMemo, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  updateGoodTypes,
  goodTypesRecord,
  clearState,
} from "../../../redux/Slices/GoodTypesSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCarDepartment } from "../../../redux/Slices/ServiceTypesSlice";
import { fetchLoadTypes } from "../../../redux/Slices/LoadTypesSlice";
import Select from "react-select";
const EditGoodTypes = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    car_department_id: null,
    load_type_id: null,
    degree_from: "",
    degree_to: "",
    type: "",
  });
  const carDepartment = useSelector(
    (state) => state.serviceTypes.carDepartment
  );
  const { loadTypes } = useSelector((state) => state.loadTypes);
  const { isLoading, error, success, record } = useSelector(
    (state) => state.goodTypes
  );
  useEffect(() => {
    setTitle(`${t("sidenav.goodTypes")} > ${t("labels.edit")}`);
    dispatch(fetchCarDepartment());
    dispatch(fetchLoadTypes());
    dispatch(goodTypesRecord(id));
  }, [setTitle, t, i18n.language, dispatch]);
  useEffect(() => {
    if (record) {
      setFormData({
        name_ar: record?.name_ar || "",
        name_en: record?.name_en || "",
        type: record?.type || "",
        degree_from: record?.degree_from || "",
        degree_to: record?.degree_to || "",
        car_department_id: record?.car_department_id
          ? Number(record.car_department_id)
          : null,
        load_type_id: record?.load_type_id ? Number(record.load_type_id) : null,
      });
    }
  }, [record]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSelectChange = (selectedOption, { name }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : "",
    }));
  };
  const deptList = useMemo(() => {
    if (Array.isArray(carDepartment)) return carDepartment;
    if (Array.isArray(carDepartment?.data?.data))
      return carDepartment.data.data;
    if (Array.isArray(carDepartment?.data)) return carDepartment.data;
    if (Array.isArray(carDepartment?.results)) return carDepartment.results;
    return [];
  }, [carDepartment]);

  const loadTypeOptions =
    loadTypes?.data?.map((load) => ({
      value: load.id,
      label: load.name,
    })) || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearState());
    dispatch(updateGoodTypes({ id, formData }));
  };
  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          dispatch({ type: "goodTypes/clearState" }); // Clear after toast
          navigate("/good_types");
        },
      });
    }

    if (error) {
      toast.error(t("labels.failedToUpdate"), {
        onClose: () => dispatch({ type: "goodTypes/clearState" }),
      });
    }
  }, [success, error, t, dispatch, navigate]);
  return (
    <>
      {/* form */}
      <form
        onSubmit={handleSubmit}
        className="table_form form-style my-3 p-3 rounded bg-white"
      >
        <div className="row align-items-center">
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <label className="text-light">{t("labels.nameArabic")}</label>
            <input
              type="text"
              className="input-bg"
              name="name_ar"
              value={formData.name_ar}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <label className="text-light">{t("labels.nameEnglish")}</label>
            <input
              type="text"
              className="input-bg"
              name="name_en"
              value={formData.name_en}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t("labels.department")}</label>
            {/* car_department_id */}
            <Select
              name="car_department_id"
              options={deptList.map((dept) => ({
                value: dept.id,
                label: i18n.language === "ar" ? dept.name_ar : dept.name_en,
              }))}
              value={
                deptList
                  .map((dept) => ({
                    value: dept.id,
                    label: i18n.language === "ar" ? dept.name_ar : dept.name_en,
                  }))
                  .find((opt) => opt.value === formData.car_department_id) ||
                null
              }
              onChange={(selected) =>
                setFormData((prev) => {
                  const selectedId = selected ? Number(selected.value) : null;

                  // if department is not 2, reset degree + type
                  if (selectedId !== 2) {
                    return {
                      ...prev,
                      car_department_id: selectedId,
                      degree_from: "",
                      degree_to: "",
                      type: "",
                    };
                  }

                  return {
                    ...prev,
                    car_department_id: selectedId,
                  };
                })
              }
              placeholder={t("labels.selectItem")}
              styles={{
                option: (provided) => ({
                  ...provided,
                  fontSize: "12px",
                }),
                singleValue: (provided) => ({
                  ...provided,
                  fontSize: "12px",
                }),
                multiValueLabel: (provided) => ({
                  ...provided,
                  fontSize: "12px",
                }),
              }}
              isClearable
              required
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <label className="text-light">{t("labels.loadType")}</label>
            {/* load_type_id */}
            <Select
              name="load_type_id"
              options={loadTypeOptions}
              value={loadTypeOptions.find(
                (opt) => opt.value === formData.load_type_id
              )}
              onChange={handleSelectChange}
              placeholder={t("labels.selectItem")}
              styles={{
                option: (provided) => ({
                  ...provided,
                  fontSize: "12px",
                }),
                singleValue: (provided) => ({
                  ...provided,
                  fontSize: "12px",
                }),
                multiValueLabel: (provided) => ({
                  ...provided,
                  fontSize: "12px",
                }),
              }}
              isClearable
              required
            />
          </div>
          {Number(formData.car_department_id) === 2 && (
            <>
              <div className="col-xl-4 col-lg-4 col-md-12 col-12">
                <label className="text-light">{t("labels.degree_from")}</label>
                <input
                  type="text"
                  className="input-bg"
                  name="degree_from"
                  value={formData.degree_from}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-12">
                <label className="text-light">{t("labels.degree_to")}</label>
                <input
                  type="text"
                  className="input-bg"
                  name="degree_to"
                  value={formData.degree_to}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-12">
                <label className="text-light">{t("labels.type")}</label>
                <select
                  className="input-bg"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    {t("labels.selectItem")}
                  </option>
                  <option value="refrigerated">
                    {t("labels.refrigerated")}
                  </option>
                  <option value="frozen">{t("labels.frozen")}</option>
                </select>
              </div>
            </>
          )}
        </div>

        <div className="text-center">
          <button className="btn show_all" disabled={isLoading}>
            {isLoading ? t("labels.loading") : t("btns.save")}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditGoodTypes;

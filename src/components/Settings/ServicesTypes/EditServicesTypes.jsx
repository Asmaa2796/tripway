import React, { useEffect, useMemo, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  updateServiceTypes,
  serviceTypesRecord,
  fetchCarDepartment,
  clearState,
} from "../../../redux/Slices/ServiceTypesSlice";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
const EditServicesTypes = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    weight: "",
    dimensions: "",
    car_department_id: "",
    additional_services: [],
    bs_show: 0,
    bs_multiple_orders: 0,
    bs_trip_type: 0,
    bs_load_packaging: 0,
    bs_load_workers: 0,
    bs_unload_workers: 0,
    bs_additional_locations: 0,
    ind_show: 0,
    ind_multiple_orders: 0,
    ind_trip_type: 0,
    ind_load_packaging: 0,
    ind_load_workers: 0,
    ind_unload_workers: 0,
    ind_additional_locations: 0,
  });
  const { carDepartment, record,isLoading, error, success } = useSelector(
    (state) => state.serviceTypes
  );
  console.log(record);
  useEffect(() => {
    setFormData({
      name_ar: record?.name_ar || "",
      name_en: record?.name_en || "",
      weight: record?.weight || "",
      dimensions: record?.dimensions || "",
      bs_show: record?.bs_show,
      bs_multiple_orders: record?.bs_multiple_orders,
      bs_trip_type: record?.bs_trip_type,
      bs_load_packaging: record?.bs_load_packaging,
      bs_load_workers: record?.bs_load_workers,
      bs_unload_workers: record?.bs_unload_workers,
      bs_additional_locations: record?.bs_additional_locations,
      ind_show: record?.ind_show,
      ind_multiple_orders: record?.ind_multiple_orders,
      ind_trip_type: record?.ind_trip_type,
      ind_load_packaging: record?.ind_load_packaging,
      ind_load_workers: record?.ind_load_workers,
      ind_unload_workers: record?.ind_unload_workers,
      ind_additional_locations: record?.ind_additional_locations,
      car_department_id: record?.car_department?.id || "",
      additional_services: record?.additional_services?.map(s => s.id) || []
    });
  }, [record]);
  useEffect(() => {
    setTitle(`${t("labels.servicesTypes")} > ${t("labels.edit")}`);
    document.title = `${t("labels.servicesTypes")} > ${t("labels.edit")}`;
    dispatch(serviceTypesRecord(id));
    dispatch(fetchCarDepartment());
     return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language, dispatch,id]);
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
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

  const parentDept = useMemo(() => {
    const id = Number(formData.car_department_id);
    return deptList.find((d) => Number(d.id) === id) || null;
  }, [deptList, formData.car_department_id]);

  const subDepOptions = useMemo(() => {
    const subs = parentDept?.sub_departments || [];
    return subs.map((s) => ({
      value: Number(s.id),
      label: i18n.language === "ar" ? s.name_ar || s.name : s.name_en || s.name,
    }));
  }, [parentDept, i18n.language]);

  useEffect(() => {
    const allowed = new Set(subDepOptions.map((o) => o.value));
    setFormData((prev) => ({
      ...prev,
      additional_services: (prev.additional_services || []).filter((id) =>
        allowed.has(Number(id))
      ),
    }));
  }, [subDepOptions, setFormData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearState());
    dispatch(updateServiceTypes({id,formData}));
  };
  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          dispatch({ type: "servicesTypes/clearState" });
          navigate("/services_types");
          dispatch(clearState());
        },
      });
    }

    if (error) {
      toast.error(t("labels.failedToUpdate"), {
        onClose: () => dispatch({ type: "servicesTypes/clearState" }),
      });
    }
  }, [success, error, t, dispatch, navigate]);
  return (
    <>
      <div style={{ textAlign: i18n.language === "ar" ? "left" : "right" }}>
        <Link to="/AttachmentsType" className="btn btn-dark btn-sm text-white">
          {t("btns.back")}{" "}
          <i
            className={`bi bi-arrow-${
              i18n.language === "ar" ? "left" : "right"
            } text-xs`}
          ></i>
        </Link>
      </div>
      <div style={{ textAlign: i18n.language === "ar" ? "left" : "right" }}>
        <Link to="/services_types" className="btn btn-dark btn-sm text-white">
          {t("btns.back")}{" "}
          <i
            className={`bi bi-arrow-${
              i18n.language === "ar" ? "left" : "right"
            } text-xs`}
          ></i>
        </Link>
      </div>
      {/* form */}
      <form
        onSubmit={handleSubmit}
        className="table_form form-style my-3 p-3 rounded bg-white"
      >
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
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
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
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
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t("labels.weight")}</label>
            <input
              type="text"
              className="input-bg"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t("labels.dimensions")}</label>
            <input
              type="text"
              className="input-bg"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="text-light">{t("labels.department")}</label>

            <Select
              name="car_department_id"
              value={
                formData.car_department_id
                  ? {
                      value: formData.car_department_id,
                      label:
                        i18n.language === "ar"
                          ? carDepartment?.data?.find(
                              (d) => d.id === formData.car_department_id
                            )?.name_ar
                          : carDepartment?.data?.find(
                              (d) => d.id === formData.car_department_id
                            )?.name_en,
                    }
                  : null
              }
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
              onChange={(selected) =>
                setFormData({
                  ...formData,
                  car_department_id: selected?.value || null,
                  additional_services: [],
                })
              }
              options={carDepartment?.data?.map((dep) => ({
                value: dep.id,
                label: i18n.language === "ar" ? dep.name_ar : dep.name_en,
              }))}
              placeholder={t("labels.selectItem")}
              isClearable
              required
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <label className="text-light">
              {t("labels.additional_services")}
            </label>
            <Select
              isMulti
              required
              name="additional_services"
              value={formData.additional_services
                ?.map((subId) => {
                  const parent = carDepartment?.data?.find(
                    (p) => p.id === formData.car_department_id
                  );
                  const sub = parent?.sub_departments.find(
                    (s) => s.id === subId
                  );
                  return sub
                    ? {
                        value: sub.id,
                        label:
                          i18n.language === "ar" ? sub.name_ar : sub.name_en,
                      }
                    : null;
                })
                .filter(Boolean)}
              onChange={(selected) =>
                setFormData({
                  ...formData,
                  additional_services: selected.map((opt) => opt.value),
                })
              }
              isDisabled={!formData.car_department_id}
              options={
                carDepartment?.data
                  ?.find((p) => p.id === formData.car_department_id)
                  ?.sub_departments?.map((s) => ({
                    value: s.id,
                    label: i18n.language === "ar" ? s.name_ar : s.name_en,
                  })) || []
              }
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
              placeholder={t("labels.selectDepartmentFirst")}
              isClearable
            />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <hr />
          </div>
          {/* Business Sector */}
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <h5 className="text-dark fw-bold text-md">
              {t("labels.business_sector")}
            </h5>
            {[
              { key: "bs_show", label: t("labels.show") },
              {
                key: "bs_multiple_orders",
                label: t("labels.add_multiple_requests"),
              },
              { key: "bs_trip_type", label: t("labels.trip_type") },
              { key: "bs_load_packaging", label: t("labels.cargo_packaging") },
              { key: "bs_load_workers", label: t("labels.loading_workers") },
              {
                key: "bs_unload_workers",
                label: t("labels.unloading_workers"),
              },
              {
                key: "bs_additional_locations",
                label: t("labels.additional_loading_unloading_locations"),
              },
            ].map(({ key, label }) => (
              <div
                className="col-xl-12 col-lg-12 col-md-12 col-12 mt-3"
                key={key}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <label className="text-light d-block">{label}</label>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input no-class"
                      type="checkbox"
                      name={key}
                      checked={!!formData[key]}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Individual Clients */}
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <h5 className="text-dark fw-bold text-md">
              {t("labels.individual_clients")}
            </h5>

            {[
              { key: "ind_show", label: t("labels.show") },
              {
                key: "ind_multiple_orders",
                label: t("labels.add_multiple_requests"),
              },
              { key: "ind_trip_type", label: t("labels.trip_type") },
              { key: "ind_load_packaging", label: t("labels.cargo_packaging") },
              { key: "ind_load_workers", label: t("labels.loading_workers") },
              {
                key: "ind_unload_workers",
                label: t("labels.unloading_workers"),
              },
              {
                key: "ind_additional_locations",
                label: t("labels.additional_loading_unloading_locations"),
              },
            ].map(({ key, label }) => (
              <div
                className="col-xl-12 col-lg-12 col-md-12 col-12 mt-3"
                key={key}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <label className="text-light d-block">{label}</label>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input no-class"
                      type="checkbox"
                      name={key}
                      checked={!!formData[key]}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
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

export default EditServicesTypes;

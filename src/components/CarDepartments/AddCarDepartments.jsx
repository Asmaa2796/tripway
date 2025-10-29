import React, { useEffect, useState } from "react";
import { useTitle } from "../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  addCarDepartment,
  clearState,
} from "../../redux/Slices/CarDepartmentsSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
const AddCarDepartments = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    status: 0,
    sub_departments: [],
  });

  const { isLoading, error, success } = useSelector(
    (state) => state.car_departments
  );

  useEffect(() => {
    setTitle(`${t("sidenav.car_departments")} > ${t("btns.add")}`);
    document.title = `${t("sidenav.car_departments")} > ${t("btns.add")}`;
     return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleSubChange = (index, e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => {
      const updatedSubs = [...prev.sub_departments];
      updatedSubs[index] = {
        ...updatedSubs[index],
        [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
      };
      return { ...prev, sub_departments: updatedSubs };
    });
  };

  const addSubDepartment = () => {
    setFormData((prev) => ({
      ...prev,
      sub_departments: [
        ...prev.sub_departments,
        { name_ar: "", name_en: "", status: 0 },
      ],
    }));
  };

  const removeSubDepartment = (index) => {
    setFormData((prev) => {
      const updatedSubs = [...prev.sub_departments];
      updatedSubs.splice(index, 1);
      return { ...prev, sub_departments: updatedSubs };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearState());
    dispatch(addCarDepartment(formData));
  };

  useEffect(() => {
    if (success) {
      toast.success(t("labels.addedSuccessfully"), {
        onClose: () => {
          dispatch({ type: "car_departments/clearState" });
          navigate("/car_departments");
        },
      });
    }

    if (error) {
      toast.error(t("generic_or_duplicate"), {
        onClose: () => dispatch({ type: "car_departments/clearState" }),
      });
    }
  }, [success, error, t, dispatch, navigate]);

  return (
    <>
    <div style={{ textAlign: i18n.language === "ar" ? "left" : "right" }}>
        <Link to="/car_departments" className="btn btn-dark btn-sm text-white">
          {t("btns.back")}{" "}
          <i
            className={`bi bi-arrow-${
              i18n.language === "ar" ? "left" : "right"
            } text-xs`}
          ></i>
        </Link>
      </div>
    <form
      onSubmit={handleSubmit}
      className="table_form form-style my-3 p-3 rounded bg-white"
    >
      <h5 className="fw-bold text-md main-color">
        <i className="bi bi-collection"></i> {t("labels.main_department")}
      </h5>
      <hr />
      <label className="fw-bold">{t("labels.nameArabic")}</label>
      <input
        type="text"
        className="input-bg"
        name="name_ar"
        value={formData.name_ar}
        onChange={handleChange}
        required
      />
      <label className="fw-bold">{t("labels.nameEnglish")}</label>
      <input
        type="text"
        className="input-bg"
        name="name_en"
        value={formData.name_en}
        onChange={handleChange}
        required
      />
      <div className="d-flex align-items-center mt-2">
        <label className="fw-bold">{t("labels.status")}</label>
        <div className="form-check form-switch mx-2">
          <input
            className="form-check-input no-class"
            type="checkbox"
            id="status"
            name="status"
            checked={formData.status === 1}
            onChange={handleChange}
          />
        </div>
      </div>
      <hr />
      <h5 className="fw-bold text-md main-color">
        <i className="bi bi-diagram-3"></i> {t("labels.sub_car_departments")}
      </h5>

      {formData.sub_departments.map((sub, index) => (
        <div className="row mb-2" key={index}>
          <div className="col-md-4 col-lg-4 col-md-6 col-12">
            <label className="fw-bold">{t("labels.nameArabic")}</label>
            <input
              type="text"
              className="input-bg"
              name="name_ar"
              value={sub.name_ar}
              onChange={(e) => handleSubChange(index, e)}
              required
            />
          </div>
          <div className="col-md-4 col-lg-4 col-md-6 col-12">
            <label className="fw-bold">{t("labels.nameEnglish")}</label>
            <input
              type="text"
              className="input-bg"
              name="name_en"
              value={sub.name_en}
              onChange={(e) => handleSubChange(index, e)}
              required
            />
          </div>
          <div className="col-md-2 col-lg-2 col-md-6 col-12">
            <div className="d-flex" style={{flexDirection:"column",alignItems:"flex-start"}}>
                <label className="fw-bold">{t("labels.status")}</label>
            <div className="form-check form-switch mt-2">
              <input
                className="form-check-input no-class"
                type="checkbox"
                name="status"
                checked={sub.status === 1}
                onChange={(e) => handleSubChange(index, e)}
              />
            </div>
            </div>
          </div>
          <div className="col-md-2 col-lg-2 col-md-6 col-12">
            <button
            style={{width:"35px",height:"35px",paddingTop:"6px"}}
              type="button"
              className="btn btn-danger btn-sm mt-5"
              onClick={() => removeSubDepartment(index)}
            >
              <i className="bi bi-dash"></i>
            </button>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12"><hr /></div>
        </div>
      ))}

      {/* Add More Button */}
      <button
        type="button"
        className="btn btn-primary btn-sm my-2"
        onClick={addSubDepartment}
      >
        <i className="bi bi-plus" style={{marginTop:"2px"}}></i> {t("btns.add")}
      </button>

      {/* Submit */}
      <div className="text-center mt-3">
        <button className="btn show_all" disabled={isLoading}>
          {isLoading ? t("labels.loading") : t("btns.add")}
        </button>
      </div>
    </form>
    </>
  );
};

export default AddCarDepartments;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCompensation,clearState } from "../../../redux/Slices/CompensationCategoriesSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTitle } from "../../../context/TitleContext";

function Addcompensation_categories() {
  const { t, i18n } = useTranslation("global");
  const {setTitle} = useTitle();
  useEffect(() => {
      setTitle(`${t("sidenav.compensationCategories")} > ${t("btns.add")}`);
      document.title = `${t("sidenav.compensationCategories")} > ${t("btns.add")}`;
      return () => {
        document.title = "Tripway | تريپ واي";
      };
    }, [setTitle, t, i18n.language]);
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.compensationCategories
  );
  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCompensation(formData));
  };
  useEffect(() => {
    if (success) {
      toast.success(t("labels.addedSuccessfully"), {
        onClose: () => {
          navigate("/compensation_categories");
          dispatch(clearState());
        },
      });
    }

    if (error) {
      toast.error(t("labels.failedToAdd"), {
        onClose: () => dispatch({ type: "compensationCategories/clearState" }),
      });
    }
  }, [success, error, t, dispatch, navigate]);

  return (
    <>
    <div style={{ textAlign: i18n.language === "ar" ? "left" : "right" }}>
            <Link
              to="/compensation_categories"
              className="btn btn-dark btn-sm text-white"
            >
              {t("btns.back")}{" "}
              <i
                className={`bi bi-arrow-${
                  i18n.language === "ar" ? "left" : "right"
                } text-xs`}
              ></i>
            </Link>
          </div>
      <div style={{ textAlign: i18n.language === "ar" ? "left" : "right" }}>
        <Link
          to="/compensation_categories"
          className="btn btn-dark btn-sm text-white"
        >
          {t("btns.back")}{" "}
          <i
            className={`bi bi-arrow-${
              i18n.language === "ar" ? "left" : "right"
            } text-xs`}
          ></i>
        </Link>
      </div>
      <div>
        <h5 className="my-3" style={{ fontWeight: "bold" }}>
          {t("labels.addNewServiceCategory")}
        </h5>
        <form
          className="form-style bg-white rounded p-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label>{t("labels.nameArabic")}</label>
            <input
              type="text"
              name="name_ar"
              className="input-bg"
              value={formData.name_ar}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>{t("labels.nameEnglish")}</label>
            <input
              type="text"
              name="name_en"
              className="input-bg"
              value={formData.name_en}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-center">
            <button
              className="btn my-2 btn-sm show_all text-white"
              style={{ backgroundColor: "var(--green-color)" }}
              disabled={loading}
            >
              {loading ? t("labels.loading") : t("btns.add")}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Addcompensation_categories;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCompensation,clearState ,fetchRecord} from "../../../redux/Slices/CompensationCategoriesSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
function Editcompensation_categories() {
  const { t, i18n } = useTranslation("global");
  const {id} = useParams();
  const dispatch = useDispatch();
   const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
  });

  const { loading, success, error,record } = useSelector(
    (state) => state.compensationCategories
  );
  useEffect(() => {
    dispatch(fetchRecord(id));
  }, [dispatch,id,i18n.language]);
  useEffect(() => {
    if(record) {
      setFormData({
        name_ar:record?.name_ar,
        name_en:record?.name_en
      })
    }
  }, [record]);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCompensation({id,formData}));
  };
  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          navigate("/compensation_categories");
          dispatch(clearState());
        },
      });
    }

    if (error) {
      toast.error(t("labels.failedToUpdate"), {
        onClose: () => dispatch({ type: "compensationCategories/clearState" }),
      });
    }
  }, [success, error, t, dispatch, navigate]);

  return (
    <div>
      <h5 className="my-3" style={{ fontWeight: "bold" }}>
        {t("labels.addNewServiceCategory")}
      </h5>
      <form className="form-style bg-white rounded p-4" onSubmit={handleSubmit}>
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
            {loading ? t("labels.loading") : t("btns.save")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Editcompensation_categories;
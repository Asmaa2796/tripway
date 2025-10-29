import React, { useEffect, useState } from "react";
import { useTitle } from "../../../context/TitleContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  addGoogleMapLinks,
  clearState,
  fetchGoogleMapLinks,
} from "../../../redux/Slices/GoogleMapLinksSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GoogleMapLinks = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    google_map_short_links: "",
    google_map_long_links: "",
  });

  const { isLoading, error, success, record } = useSelector(
    (state) => state.GoogleMapLinks
  );

  useEffect(() => {
    setTitle(`${t("sidenav.googleMapLinks")}`);
    document.title = `${t("sidenav.googleMapLinks")}`;
    dispatch(fetchGoogleMapLinks());
    return () => {
      document.title = "Tripway | تريپ واي";
    };
  }, [setTitle, t, i18n.language]);
  useEffect(() => {
    if (record) {
      setFormData({
        google_map_short_links: record?.short_links,
        google_map_long_links: record?.long_links,
      });
    }
  }, [record]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearState());
    dispatch(addGoogleMapLinks(formData));
  };

  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          dispatch(clearState());
          window.location.reload();
        },
      });
    }
    if (error) {
      toast.error(t("labels.failedToUpdate"), {
        onClose: () => dispatch(clearState()),
      });
    }
  }, [success, error, dispatch, navigate, t]);

  return (
    <form
      onSubmit={handleSubmit}
      className="table_form form-style my-3 p-3 rounded bg-white shadow"
    >
      <div className="row align-items-center">
        <div className="col-12 mb-3">
          <label htmlFor="google_long_link" className="form-label fw-bold">
            {t("labels.googleLongLink")}
          </label>
          <textarea
            id="google_long_link"
            name="google_map_long_links"
            value={formData.google_map_long_links}
            onChange={handleChange}
            className="form-control input-bg"
            rows="3"
            required
          ></textarea>
        </div>
        <div className="col-12 mb-3">
          <label
            htmlFor="google_shortened_links"
            className="form-label fw-bold"
          >
            {t("labels.googleShortenedLinks")}
          </label>
          <textarea
            id="google_shortened_links"
            name="google_map_short_links"
            value={formData.google_map_short_links}
            onChange={handleChange}
            className="form-control input-bg"
            rows="3"
            required
          ></textarea>
        </div>
      </div>
      <div className="text-center">
        <button type="submit" className="btn save" disabled={isLoading}>
          {isLoading ? t("labels.loading") : t("btns.save")}
        </button>
      </div>
    </form>
  );
};

export default GoogleMapLinks;
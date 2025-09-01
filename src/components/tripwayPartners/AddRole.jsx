import React, { useEffect, useState } from "react";
import { useTitle } from "../../context/TitleContext";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchPermissions, store_role } from "../../redux/Slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddRole = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const { permissions, isLoading, error, success, pagination } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    permission_id: ""
  });
  const [checkedItems, setCheckedItems] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    setTitle(t("labels.addRole"));
  }, [setTitle, t, i18n.language]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchPermissions(currentPage));
  }, [dispatch, currentPage, i18n.language]);

  useEffect(() => {
  if (permissions && permissions.length > 0) {
    setCheckedItems((prevChecked) => {
      const updated = { ...prevChecked };
      permissions.forEach((p) => {
        const id = p.id.toString();
        if (!(id in updated)) {
          updated[id] = false; // default to false if not set before
        }
      });
      return updated;
    });
  }
}, [permissions]);


  const allSelected =
  Object.keys(checkedItems).length > 0 &&
  Object.values(checkedItems).every(Boolean);

  const handleSelectAll = (e) => {
    const { checked } = e.target;
    const updated = Object.keys(checkedItems).reduce((acc, key) => {
      acc[key] = checked;
      return acc;
    }, {});
    setCheckedItems(updated);
  };

  const handlePermissionChange = (e) => {
    const { name, checked } = e.target;
    setCheckedItems((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedPermissionIds = Object.entries(checkedItems)
      .filter(([_, checked]) => checked)
      .map(([id]) => Number(id)); // convert id string → number

    if (selectedPermissionIds.length === 0) {
      alert(t("labels.pleaseSelectAtLeastOnePermission"));
      return;
    }
    const roleData = {
      name: formData.name,
      permission_id: selectedPermissionIds,
    };
    dispatch(store_role(roleData));
  };
  useEffect(() => {
    if (success) {
      toast.success(t("labels.roleAddedSuccessfully"), {
        onClose: () => {
          dispatch({ type: "auth/clearState" }); 
          navigate("/user_permissions");
        },
      });
    }

    if (error) {
      toast.error(error, {
        onClose: () => dispatch({ type: "auth/clearState" }),
      });
    }
  }, [success, error, t, dispatch, navigate]);

  return (
    <form className="table_form form-style div-bg" onSubmit={handleSubmit}>
      <div className="row align-items-center">
        <div className="col-xl-12 col-lg-12 col-md-12 col-12">
          <label className="text-light">{t("sign.name")}</label>
          <input type="text" className="input-bg" name="name" value={formData.name} onChange={handleNameChange} required />
        </div>

        <div className="col-xl-12 col-lg-12 col-md-6 col-12">
          <label className="text-light d-block">{t("labels.permission")}</label>
          <div className="row">
            {permissions?.length > 0 && (
              <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                <label className="styled_checkbox text-color">
                  {t("labels.selectAll")}
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleSelectAll}
                  />{" "}
                </label>
              </div>
            )}

            {permissions?.map((perm) => (
              <div key={perm.id} className="col-xl-4 col-lg-4 col-md-6 col-12">
                <label className="styled_checkbox">
                  {perm.name}
                  <input
                    type="checkbox"
                    name={perm.id.toString()}
                    checked={checkedItems[perm.id] || false}
                    onChange={handlePermissionChange}
                  />{" "}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="col-xl-12 col-lg-12 col-md-12 col-12 text-center">
          <button className="btn px-4 save" type="submit">
            {t("btns.add")}
          </button>
        </div>
      </div>
      <div className="pagination-controls mt-5 mx-auto text-center mb-3">
        <Link
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={!pagination?.prev_page_url}
          className="btn px-4 text-white"
          style={{ background: "rgb(135 143 124)", border: "none" }}
        >
          {t("labels.prev")}
        </Link>
        <span className="mx-2 d-inline">
          {t("labels.page")} {pagination?.current_page || 1} {t("labels.of")} {pagination?.last_page || 1}
        </span>
        <Link
          onClick={() =>
            setCurrentPage((prev) => {
              if (prev < (pagination?.last_page || 1)) {
                return prev + 1;
              }
              return prev;
            })
          }
          disabled={!pagination?.next_page_url || currentPage >= (pagination?.last_page || 1)}
          className="btn px-4 save text-white"
        >
          {t("labels.next")}
        </Link>
      </div>


    </form>
  );
};

export default AddRole;
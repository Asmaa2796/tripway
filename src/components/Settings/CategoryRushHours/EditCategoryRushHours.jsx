import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateRushHour,
  categoryRushHoursRecord,
  clearState,
} from "../../../redux/Slices/CategoryRushHoursSlice";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useTitle } from "../../../context/TitleContext";
const EditCategoryRushHours = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setTitle(`${t("sidenav.category_rush_hours")} > ${t("labels.edit")}`);
    dispatch(categoryRushHoursRecord(id));
  }, [setTitle, t, i18n.language]);
  const [formData, setFormData] = useState({ days: [] });
  const { isLoading, success, record, error } = useSelector(
    (state) => state.category_rush_hours
  );
  useEffect(() => {
    if (record?.days) {
      setFormData({
        days: record.days.map((d) => ({
          day_id: d.day_id,
          day_name: d.day_name,
          slots: d.times?.length
            ? d.times.map((t) => ({
                id: t.id,
                from_time: to24Hour(t.from_time),
                to_time: to24Hour(t.to_time),
              }))
            : [],
        })),
      });
    }
  }, [record]);
  // add new slot
  const handleAddSlot = (dayIndex) => {
    const newDays = [...formData.days];
    newDays[dayIndex].slots.push({ from_time: "", to_time: "" });
    setFormData({ days: newDays });
  };

  // helper to convert "hh:mm AM/PM" -> "HH:mm"
  const to24Hour = (timeStr) => {
    if (!timeStr) return "";
    const [time, modifier] = timeStr.split(" "); // e.g. ["11:00", "PM"]

    if (!modifier) return timeStr; // already 24h

    let [hours, minutes] = time.split(":");
    hours = parseInt(hours, 10);

    if (modifier === "PM" && hours < 12) {
      hours += 12;
    }
    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    return `${String(hours).padStart(2, "0")}:${minutes}`;
  };

  // remove slot
  const handleRemoveSlot = (dayIndex, slotIndex) => {
    const newDays = [...formData.days];
    newDays[dayIndex].slots.splice(slotIndex, 1);
    setFormData({ days: newDays });
  };
  // change slot input
  const handleSlotChange = (dayIndex, slotIndex, field, value) => {
    const newDays = [...formData.days];
    newDays[dayIndex].slots[slotIndex][field] = value;
    setFormData({ days: newDays });
  };
  const hasInvalidSlot = (slots) => {
    return slots.some((s) => s.from_time >= s.to_time);
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();

    for (const day of formData.days) {
      // Check invalid time (from >= to)
      if (hasInvalidSlot(day.slots)) {
        toast.error(t("invalidTimeRange", { day: day.day_name }));
        return;
      }
    }

    const payload = {
      days: formData.days.map((d) => ({
        day_id: String(d.day_id),
        slots: d.slots.map((s) => ({
          from_time: s.from_time,
          to_time: s.to_time,
        })),
      })),
    };

    console.log("sending payload", payload);
    dispatch(updateRushHour({ id, formData: payload }));
  };

  useEffect(() => {
    if (success) {
      toast.success(t("labels.updatedSuccessfully"), {
        onClose: () => {
          dispatch(clearState());
          navigate("/category_rush_hours");
        },
      });
    }

    if (error) {
      toast.error(t("labels.failedToUpdate"), {
        onClose: () => dispatch({ type: "category_rush_hours/clearState" }),
      });
    }
  }, [success, error, t, dispatch, navigate]);

  return (
    <div className="form-style">
      <form onSubmit={handleUpdateCategory} className="bg-white p-4 rounded">
        <h5 className="fw-bold text-md">
          <i className="bi bi-clock text-sm main-color"></i>{" "}
          {record?.car_department_name} - {record?.sub_car_department_name}
        </h5>{" "}
        <hr />
        {formData.days.map((day, dIndex) => (
          <div key={day.day_id} className="rush_hour my-3">
            <h6>{day.day_name}</h6>
            {day.slots.map((slot, sIndex) => (
              <div className="row mb-2" key={sIndex}>
                <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                  <input
                    type="time"
                    value={slot.from_time}
                    onChange={(e) =>
                      handleSlotChange(
                        dIndex,
                        sIndex,
                        "from_time",
                        e.target.value
                      )
                    }
                    className="input-bg"
                  />
                </div>
                <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                  <input
                    type="time"
                    value={slot.to_time}
                    onChange={(e) =>
                      handleSlotChange(
                        dIndex,
                        sIndex,
                        "to_time",
                        e.target.value
                      )
                    }
                    className="input-bg"
                  />
                </div>
                <div className="col-xl-2 col-lg-2 col-md-2 col-12">
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{ marginTop: "7px" }}
                    onClick={() => handleRemoveSlot(dIndex, sIndex)}
                  >
                    -
                  </button>
                </div>
              </div>
            ))}

            {/* Add slot button */}
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => handleAddSlot(dIndex)}
            >
              +
            </button>
            <hr />
          </div>
        ))}
        <div className="text-center my-3">
          <button
            className="btn btn-sm show_all text-white"
            style={{ backgroundColor: "var(--green-color)" }}
            disabled={isLoading}
          >
            {isLoading ? t("labels.loading") : t("btns.save")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategoryRushHours;

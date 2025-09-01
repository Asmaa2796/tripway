import React, { useEffect } from "react";
import { useTitle } from "../../context/TitleContext";
import { useTranslation } from "react-i18next";
import PhoneInput from "../vendors/PhoneInput";
const AddProvider = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle(
      `${t("sidenav.serviceProviders")} > ${t("labels.drivers")} > ${t(
        "btns.add"
      )}`
    );
  }, [setTitle, t, i18n.language]);

  return (
    <>
      {/* form */}
      <form className="table_form form-style">
        {/* Nav tabs */}
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="basicInfo-tab"
              data-bs-toggle="tab"
              href="#basicInfo"
              role="tab"
            >
              {t('labels.mainInfo')}
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="files-tab"
              data-bs-toggle="tab"
              href="#files"
              role="tab"
            >
              {t('labels.attachments')}
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="partner-tab"
              data-bs-toggle="tab"
              href="#partner"
              role="tab"
            >
             {t('labels.tripwayPartner')}
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="branches-tab"
              data-bs-toggle="tab"
              href="#branches"
              role="tab"
            >
              {t('labels.tripwayBranches')}
            </a>
          </li>
        </ul>

        {/* Tab panes */}
        <div className="tab-content mt-3 my-3 py-3 div-bg">
          <div
            className="tab-pane fade show active"
            id="basicInfo"
            role="tabpanel"
          >
            <div className="row align-items-center">
              <div className="col-xl-4 col-lg-6 col-md-12 col-12">
                <label className="text-light">{t('labels.transporterType')}</label>
                <input type="text" className="input-bg" name="main_branch" />
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                <label className="text-light"> {t('labels.idNumber')}</label>
                <input type="text" className="input-bg" name="id_number" />
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                <label className="text-light"> {t('labels.idType')} </label>
                <input type="text" className="input-bg" name="id_type" />
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                <label className="text-light"> {t('labels.issueNumber')}</label>
                <input type="text" className="input-bg" name="issue_number" />
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                <label className="text-light"> {t('labels.sponsorNumberOptional')} </label>
                <input type="text" className="input-bg" name="sponsor_number" />
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                <label className="text-light"> {t('labels.vehicle')} </label>
                <input type="text" className="input-bg" name="vehicle" />
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                <label className="text-light"> {t('labels.birthDate')}</label>
                <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                    <select name="year_type" className="input-bg w-100">
                      <option value="1">{t('labels.birthGregorian')}</option>
                      <option value="2">{t('labels.birthHijri')}</option>
                    </select>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                    <input
                      type="text"
                      className="input-bg"
                      name="year"
                      placeholder={t('labels.year')}
                    />
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                    <input
                      type="text"
                      className="input-bg"
                      name="month"
                      placeholder={t('labels.month')}
                    />
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                    <input
                      type="text"
                      className="input-bg"
                      name="day"
                      placeholder={t('labels.day')}
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                <hr />
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                <h5 className="mb-4" style={{ fontWeight: "bold" }}>
                  {t('labels.driverInfo')}
                </h5>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                <label className="text-light"> {t('labels.nameArabic')} </label>
                <input type="text" className="input-bg" name="nameArabic" />
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                <label className="text-light"> {t('labels.nameEnglish')} </label>
                <input type="text" className="input-bg" name="nameEnglish" />
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                <label className="text-light"> {t('labels.phone')}</label>
                <PhoneInput />
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                <label className="text-light"> {t('labels.email')}</label>
                <input type="text" className="input-bg" name="email" />
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                <label className="text-light"> {t('labels.sponsorName')}</label>
                <input type="text" className="input-bg" name="sponsor_name" />
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                <label className="text-light"> {t('labels.driverBirthDate')} </label>
                <input type="date" className="input-bg" name="driver_birthDate" />
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                <label className="text-light"> {t('labels.gender')}</label>
                <select name="gender" className="input-bg w-100">
                  <option value="1">{t('labels.male')}</option>
                  <option value="2">{t('labels.female')}</option>
                </select>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                <label className="text-light"> {t('labels.nationalityText')}</label>
                <input type="text" className="input-bg" name="nationality_text" />
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                <label className="text-light"> {t('labels.nationality')}</label>
                <select name="nationality" className="input-bg w-100">
                  <option value="1">-</option>
                  <option value="2">-</option>
                </select>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                <label className="text-light"> {t('labels.residenceCityOptional')} </label>
                <select name="residence_city" className="input-bg w-100">
                  <option value="1">-</option>
                  <option value="2">-</option>
                </select>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                <label className="text-light"> {t('labels.idExpiryDate')}</label>
                <input type="date" name="id_expiry_date" className="input-bg" />
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                <label className="text-light"> {t('labels.licenseExpiryDate')}</label>
                <input type="date" name="license_expiry_date" className="input-bg" />
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                <hr />
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                <h5 className="mb-4" style={{ fontWeight: "bold" }}>
                 {t('labels.driverCard')}
                </h5>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                <label className="text-light"> {t('labels.driverCardNumber')}</label>
                <input type="text" name="driver_card_number" className="input-bg" />
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                <label className="text-light"> {t('labels.driverCardStatus')}</label>
                <input type="text" name="driver_card_status" className="input-bg" />
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                <label className="text-light"> {t('labels.driverCardExpiry')}</label>
                <input type="date" name="driver_card_expiry" className="input-bg" />
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                <label className="text-light"> {t('labels.driverCardType')}</label>
                <input type="text" name="driver_card_type" className="input-bg" />
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                <label className="text-light">{t("labels.status")} </label>
                <label className="toggle">
                  <input className="toggle-checkbox" type="checkbox" />
                  <div className="toggle-switch"></div>
                  <span className="toggle-label"></span>
                </label>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="files" role="tabpanel">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                <label style={{fontWeight:"bold"}}> {t('labels.personalPhoto')}</label>
                <div className="file-input">
                  <input
                    type="file"
                    name="file-input"
                    id="file-input"
                    className="file-input__input"
                  />
                  <label className="file-input__label" htmlFor="file-input">
                    <i className="bi bi-images mx-2"></i>
                    <span> {t('labels.chooseImage')}</span>
                  </label>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                <label style={{fontWeight:"bold"}}>{t('labels.personalID')}</label>
                <div className="file-input">
                  <input
                    type="file"
                    name="file-input"
                    id="file-input"
                    className="file-input__input"
                  />
                  <label className="file-input__label" htmlFor="file-input">
                    <i className="bi bi-images mx-2"></i>
                    <span>{t('labels.chooseImage')}</span>
                  </label>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                <label style={{fontWeight:"bold"}}>{t('labels.driverLicense')}</label>
                <div className="file-input">
                  <input
                    type="file"
                    name="file-input"
                    id="file-input"
                    className="file-input__input"
                  />
                  <label className="file-input__label" htmlFor="file-input">
                    <i className="bi bi-images mx-2"></i>
                    <span>{t('labels.chooseImage')}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="partner" role="tabpanel">
            <label className="text-light"> {t('labels.tripwayPartner')} </label>
            <input type="text" name="tripway_partner" className="input-bg" />
          </div>
          <div className="tab-pane fade" id="branches" role="tabpanel">
            <label className="text-light"> {t('labels.followTripwayPartner')} </label>
            <input type="text" name="follow_tripway_partner" className="input-bg" />
          </div>
          <div className="text-center">
            <button className="btn px-4 save">{t("btns.add")}</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddProvider;

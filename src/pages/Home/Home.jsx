import React, { useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { useTitle } from "../../context/TitleContext";
import BarChart from "../../components/charts/BarChart";
import DoughnutCart from "../../components/charts/DoughnutChart";
import CircleChart from "../../components/charts/CircleChart";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import "./home.css";

const StatCard = ({ iconColor, number, img, translationKey }) => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.5 });
  const { t } = useTranslation();

  return (
    <div className="col-xl-4 col-lg-4 col-md-6 col-12" ref={ref}>
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.9}
        glareColor="#fdfdfd"
        glarePosition="all"
        glareBorderRadius="20px"
      >
        <div className="stat_card">
          <div className="icon">
            <i
              className="bi bi-currency-dollar"
              style={{ color: iconColor }}
            ></i>
          </div>
          <h5>
            {inView ? <CountUp start={0} end={number} duration={2} /> : 0}
          </h5>
          <b>{t(translationKey)}</b>
          <img src={img} alt={t(translationKey)} />
        </div>
      </Tilt>
    </div>
  );
};

const Home = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle(t("sidenav.home"));
  }, [setTitle, t, i18n]);

  return (
    <div className="main_content">
      <div className="row justify-content-center">
        <StatCard
          iconColor="#3683FF"
          number={248000}
          translationKey="home.totalSales"
          img="/img/icons/stat1.png"
        />
        <StatCard
          iconColor="#86D02C"
          number={23149}
          translationKey="home.individualCustomers"
          img="/img/icons/stat2.png"
        />
        <StatCard
          iconColor="#FA7146"
          number={13211}
          translationKey="home.serviceProviders"
          img="/img/icons/stat3.png"
        />
        <StatCard
          iconColor="#3683FF"
          number={13211}
          translationKey="home.tripRequests"
          img="/img/icons/stat4.png"
        />
        <StatCard
          iconColor="#FFC107"
          number={13211}
          translationKey="home.completed"
          img="/img/icons/stat5.png"
        />
        <StatCard
          iconColor="#FA7146"
          number={13211}
          translationKey="sidenav.ratings"
          img="/img/icons/stat3.png"
        />

        <div className="col-xl-5 col-lg-5 col-md-12 col-12">
          <div className="div-bg">
            <h5 className="stat-title">
              <span>{t("home.requestStats")}</span>
              <select>
                <option value="all">{t("home.all")}</option>
              </select>
            </h5>
            <DoughnutCart />
            <hr className="border-light mb-3" />
            <ul className="p-0 mb-0 stats list-unstyled">
              <li>
                <span>
                  <i className="bi bi-circle"></i> {t("home.inService")}
                </span>
                <span>68%</span>
              </li>
              <li>
                <span>
                  <i className="bi bi-circle"></i> {t("home.done")}
                </span>
                <span>25%</span>
              </li>
              <li>
                <span>
                  <i className="bi bi-circle"></i> {t("home.cancelled")}
                </span>
                <span>14%</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-xl-7 col-lg-7 col-md-12 col-12">
          <div className="barChart div-bg">
            <h5 className="stat-title">
              <span>{t("home.userStats")}</span>
              <select>
                <option value="annual">{t("home.yearly")}</option>
                <option value="monthly">{t("home.monthly")}</option>
              </select>
            </h5>
            <BarChart />
            <CircleChart />
          </div>
        </div>

        <div className="col-xl-12 col-lg-12 col-md-12 col-12">
          <div className="providers_on_map div-bg mt-4">
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-12 col-12">
                <h5 className="sub-text mb-3">{t("home.providersOnMap")}</h5>
              </div>
              <div className="col-xl-9 col-lg-9 col-md-12 col-12">
                <div className="input-div">
                  <span>
                    <i className="bi bi-search"></i>
                  </span>
                  <input type="text" placeholder={t("home.enterCityName")} />
                </div>
              </div>
              <div className="col-xl-9 col-lg-9 col-md-12 col-12">
                <br />
                <div className="map"></div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-12 col-12">
                <br />
                <select>
                  <option value="">{t("home.undefined")}</option>
                </select>
                <select>
                  <option value="">{t("home.status")}</option>
                </select>
                <ul className="p-0 mb-0 map-ul list-unstyled">
                  <li>
                    <span>
                      <i className="bi bi-circle"></i> {t("home.busy")}
                    </span>
                    <span>68%</span>
                  </li>
                  <li>
                    <span>
                      <i className="bi bi-circle"></i> {t("home.offline")}
                    </span>
                    <span>68%</span>
                  </li>
                  <li>
                    <span>
                      <i className="bi bi-circle"></i> {t("home.online")}
                    </span>
                    <span>68%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
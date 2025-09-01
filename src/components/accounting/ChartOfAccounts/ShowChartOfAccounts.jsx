import React, { useMemo, useRef, useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { useTitle } from "../../../context/TitleContext";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { chartAccountsRecord } from "../../../redux/Slices/ChartAccountsSlice";
import NestedList from "../../../pages/NestedLoader";

const ShowChartOfAccounts = () => {
  const { t, i18n } = useTranslation("global");
  const { setTitle } = useTitle();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { record, isLoading } = useSelector((state) => state.chart_accounts);

  useEffect(() => {
    setTitle(`${t("sidenav.chartOfAccounts")} > ${t("labels.view")}`);
  }, [setTitle, t, i18n.language]);
  useEffect(() => {
    dispatch(chartAccountsRecord(id));
  }, [id, i18n.language]);
  const accountTypeKey = (type) => {
    switch (type) {
      case "income_list":
        return "incomeList";
      case "balance_sheet":
        return "balanceSheet";
      case "internal_income_list":
        return "internalIncomeList";
      default:
        return "undefined";
    }
  };
  const natureAccountKey = (type) => {
    switch (type) {
      case "debitor":
        return "debitor";
      case "creditor":
        return "creditor";
      default:
        return "undefined";
    }
  };
  const toTreeNode = (node) => {
    if (!node) return null;
    const label =
      i18n.language === "ar"
        ? node.name_ar || node.name
        : node.name_en || node.name;
    return {
      name: label || `#${node.id}`,
      attributes: { id: String(node.id) },
      children: (node.children || []).map(toTreeNode),
    };
  };

  const wrapWithParents = (current) => {
    if (!current) return null;
    let root = toTreeNode(current);
    let p = current.parents;
    while (p && (p.name || p.id)) {
      const parentName = p.name || `#${p.id}`;
      root = {
        name: parentName,
        attributes: { id: String(p.id) },
        children: [root],
      };
      p = p.parent;
    }
    return root;
  };

  const treeData = useMemo(
    () => wrapWithParents(record),
    [record, i18n.language]
  );

  const containerRef = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setTranslate({ x: width / 2, y: 100 });
    }
  }, [treeData]);
  return (
    <div style={{ textAlign: i18n.language === "ar" ? "right" : "left" }}>
      {isLoading ? (
        <div className="div-bg"><NestedList/></div>
      ) : (
        <div className="div-bg">
          <h5 className="fw-bold text-md my-3">
            {" "}
            <i
              className={`text-sm bi main-color ${
                i18n.language === "ar"
                  ? "bi-caret-left-fill"
                  : "bi-caret-right-fill"
              }`}
            ></i>{" "}
            {t("labels.account_info")}
          </h5>
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-12 col-12">
              <div className="bg-light my-2 text-sm px-3 py-4 border rounded-2 d-flex justify-content-between align-items-center">
                <span>{t("labels.account_code")}</span>
                <span>{record?.code}</span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-12">
              <div className="bg-light my-2 text-sm px-3 py-4 border rounded-2 d-flex justify-content-between align-items-center">
                <span>{t("labels.account_name")}</span>
                <span className="text-color">
                  {i18n.language === "ar" ? record?.name_ar : record?.name_en}
                </span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-12">
              <div className="bg-light my-2 text-sm px-3 py-4 border rounded-2 d-flex justify-content-between align-items-center">
                <span>{t("labels.mainAccount")}</span>
                <span className="text-color">
                  {record?.parent_name || "--"}
                </span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-12">
              <div className="bg-light my-2 text-sm px-3 py-4 border rounded-2 d-flex justify-content-between align-items-center">
                <span>{t("labels.natureAccount")}</span>
                <span className="text-color">
                  {t(`labels.${natureAccountKey(record?.natutre_account)}`)}
                </span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-12">
              <div className="bg-light my-2 text-sm px-3 py-4 border rounded-2 d-flex justify-content-between align-items-center">
                <span>{t("labels.accountType")}</span>
                <span className="text-color">
                  {t(`labels.${accountTypeKey(record?.account_type)}`)}
                </span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-12">
              <div className="bg-light my-2 text-sm px-3 py-4 border rounded-2 d-flex justify-content-between align-items-center">
                <span>{t("labels.currentBalance")}</span>
                <span className="highlight-text">
                  {record?.balance || "--"}
                </span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-12">
              <div className="bg-light my-2 text-sm px-3 py-4 border rounded-2 d-flex justify-content-between align-items-center">
                <span>{t("labels.acceptPayments")}</span>
                <span
                  className={`${
                    record?.accept_payments === false
                      ? "text-danger"
                      : "text-success"
                  }`}
                >
                  {record?.accept_payments === false ? (
                    <i className="bi bi-x-circle-fill"></i>
                  ) : (
                    <i className="bi bi-check-circle-fill"></i>
                  )}
                </span>
              </div>
            </div>
            <div className="col-xl-8 col-lg-8 col-md-12 col-12">
              <div className="bg-light my-2 text-sm px-3 py-4 border rounded-2 d-flex justify-content-between align-items-center">
                <span>{t("labels.account_desc")}</span>
                <span>
                  {i18n.language === "ar" ? record?.desc_ar : record?.desc_en}
                </span>
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
              <hr />
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
              <div
                ref={containerRef}
                style={{
                  padding: "20px",
                  width: "100%",
                  height: "80vh",
                  direction: i18n.language === "ar" ? "rtl" : "ltr",
                  border: "1px solid #eee",
                  borderRadius: 12,
                }}
              >
                {treeData && (
                  <Tree
                    data={treeData}
                    orientation="vertical"
                    nodeSize={{ x: 220, y: 120 }}
                    translate={translate}
                    renderCustomNodeElement={({ nodeDatum }) => {
                      const depth = nodeDatum.__rd3t?.depth ?? 0;
                      const isRoot = depth === 0;
                      const isParent =
                        nodeDatum.children && nodeDatum.children.length > 0;

                      // background colors
                      let bgColor = "#25a86b"; // child = green
                      if (isParent) bgColor = "#1e8fd4"; // parent = blue
                      if (isRoot) bgColor = "#daac22"; // root = yellow

                      return (
                        <g style={{ cursor: "pointer" }}>
                          <rect
                            rx={10}
                            ry={10}
                            width={180}
                            height={40}
                            x={-90}
                            y={-20}
                            fill={bgColor}
                            stroke="#ccc"
                          />
                          <foreignObject
                            x={-90}
                            y={-20}
                            width={180}
                            height={40}
                          >
                            <div
                              style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Link
                                to={`/show_chart_accounts/${
                                  nodeDatum.attributes?.id ?? nodeDatum.id
                                }`}
                                style={{
                                  color: "white",
                                  width: "100%",
                                  textAlign: "center",
                                  textDecoration: "none",
                                  display: "block",
                                  fontSize: "12px",
                                  fontWeight: "normal",
                                }}
                              >
                                {nodeDatum.name}
                              </Link>
                            </div>
                          </foreignObject>
                        </g>
                      );
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowChartOfAccounts;
"use client";
import {
  Col,
  Row,
  Table,
  Container,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import { db, getAllDocuments } from "utils/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  formatDate,
  formatDatezeroes,
  formatToThreeDigits,
  getMonth,
} from "utils/helper";
import { exportToExcel } from "react-json-to-excel";
import { PageHeading } from "widgets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

import { savePDF } from "@progress/kendo-react-pdf";

const serviceTypeOptions = [
  { value: "SELF", label: "SELF" },
  { value: "SELF_DOM", label: "SELF_DOM" },
  { value: "SELF_INTL", label: "SELF_INTL" },
  { value: "SELF_DUTY_PAID", label: "SELF_DUTY_PAID" },
  { value: "DHL", label: "DHL" },
  { value: "FEDEX", label: "FEDEX" },
  { value: "UPS", label: "UPS" },
  { value: "DPD", label: "DPD" },
  { value: "ARAMEX", label: "ARAMEX" },
  { value: "DELHIVERY", label: "DELHIVERY" },
];
const printType = [
  { value: "Manifest", label: "Manifest" },
  { value: "PDF", label: "PDF" },
  { value: "Bill", label: "Bill" },
  { value: "Contact No", label: "Contact No" },
];
const Settings = () => {
  const [formData, setFormData] = useState({
    invoiceDate: "",
    startDate: "",
    endDate: "",
    userType: "",
    gstType: "Cash",
    af: "",
    serviceType: "",
    name: "",
    printType: "Manifest",
    address: "",
    gstNumber: "",
    ppr: 0,
    pd: 0,
    pdname: "",
    pca: 0,
    pcremark: "",
  });
  const [show1, setShow1] = useState(false);
  const handleClose = () => setShow1(false);
  const [d, setD] = useState();
  const [ud, setUD] = useState([]);
  const [r, setR] = useState(false);
  useEffect(() => {
    (async () => {
      const data = await getAllDocuments("client");
      setD(data);
    })();
  }, []);
  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <Col lg={12} md={12} xs={12}>
        {/* Page header */}
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <PageHeading heading="Manifest / Billing" ismb={false} />

            <div
              style={{
                display: "flex",
                gap: "10px",
                width: "100% !important",

                // justifyContent: "end",
              }}
            >
              {formData.printType === "Manifest" && ud.length ? (
                <>
                  <Button
                    variant="primary"
                    // className="col-md-1"
                    onClick={() => {
                      if (!formData.startDate) {
                        return alert("please select valid date");
                      }

                      const gstList = ud.filter((val) => {
                        return val.clientDetails.gstType === "GST";
                      });
                      const cashList = ud.filter((val) => {
                        return val.clientDetails.gstType === "Cash";
                      });

                      const downloadableGSTJson = gstList.map((item, index) => {
                        return {
                          "Sr. No.": index + 1,
                          Date: item.orderDetails.bookingDate,
                          "Consignee Name": item.orderDetails.personName,
                          "To City": item.orderDetails.city,
                          QTY: 1,
                          CAT: item.orderDetails.serviceType,
                          Weight: item.orderDetails.actualWeight * 1000,
                          "AWB No.": item.orderDetails.forwardingNumber,
                        };
                      });
                      const downloadableCashJson = cashList.map(
                        (item, index) => {
                          return {
                            "Sr. No.": index + 1,
                            Date: item.orderDetails.bookingDate,
                            "Consignee Name": item.orderDetails.personName,
                            "To City": item.orderDetails.city,
                            QTY: 1,
                            CAT: item.orderDetails.serviceType,
                            Weight: item.orderDetails.actualWeight * 1000,
                            "AWB No.": item.orderDetails.forwardingNumber,
                          };
                        }
                      );
                      if (downloadableCashJson.length) {
                        exportToExcel(
                          downloadableCashJson,
                          `manifest_Cash${
                            formData.startDate
                              ? `__${formatDate(formData.startDate)}`
                              : ""
                          }`
                            .replaceAll(".", "_")
                            .replaceAll(" ", "_")
                        );
                      }
                      if (downloadableGSTJson.length) {
                        exportToExcel(
                          downloadableGSTJson,
                          `manifest_GST${
                            formData.startDate
                              ? `__${formatDate(formData.startDate)}`
                              : ""
                          }`
                            .replaceAll(".", "_")
                            .replaceAll(" ", "_")
                        );
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faDownload} height={20} width={20} />
                  </Button>
                </>
              ) : (
                <></>
              )}
              {formData.printType === "Contact No" && ud.length ? (
                <>
                  <Button
                    variant="primary"
                    // className="col-md-1"
                    onClick={() => {
                      if (!formData.startDate) {
                        return alert("please select valid date");
                      }

                      const downloadableJson = ud.map((item, index) => {
                        return {
                          "Sr. No.": index + 1,
                          "Consignee Name": item.orderDetails.personName,
                          "Contact No 1": item.orderDetails.phoneNo,
                          "Contact No 2": item.orderDetails.phoneNo2,
                        };
                      });

                      if (downloadableJson.length) {
                        exportToExcel(
                          downloadableJson,
                          `Contact No List${
                            formData.startDate
                              ? `__${formatDate(formData.startDate)}`
                              : ""
                          }`
                            .replaceAll(".", "_")
                            .replaceAll(" ", "_")
                        );
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faDownload} height={20} width={20} />
                  </Button>
                </>
              ) : (
                <></>
              )}
              {formData.printType === "PDF" && ud.length ? (
                <>
                  <Button
                    variant="primary"
                    // className="col-md-1"
                    onClick={async () => {
                      const content = document.getElementById("printareapdf");
                      const tbtd = content.querySelectorAll(".pdftr td");
                      tbtd.forEach((td) => {
                        td.style.fontSize = "10px";
                      });
                      const thtd = content.querySelectorAll(".pdfth th");
                      thtd.forEach((td) => {
                        td.style.fontSize = "10px";
                      });
                      savePDF(content, {
                        paperSize: "A4",
                        fileName: `${formData.name}${
                          formData.startDate
                            ? `__${formatDate(formData.startDate)}`
                            : ""
                        }`
                          .replaceAll(".", "_")
                          .replaceAll(" ", "_"),
                      });

                      tbtd.forEach((td) => {
                        td.style.fontSize = "15px";
                        td.style.padding = "0px";
                      });

                      thtd.forEach((td) => {
                        td.style.fontSize = "15px";
                        td.style.padding = "0px";
                      });
                    }}
                  >
                    <FontAwesomeIcon icon={faDownload} height={20} width={20} />
                  </Button>
                </>
              ) : (
                <></>
              )}
              {formData.printType === "Bill" && ud.length ? (
                <>
                  <Button
                    variant="primary"
                    // className="col-md-1"
                    onClick={async () => {
                      // window.print();

                      if (
                        !formData.startDate ||
                        !formData.endDate ||
                        !formData.invoiceDate
                      ) {
                        return alert("please select valid date");
                      }

                      const content = document.getElementById("printareapdf");
                      const tbtd = content.querySelectorAll(
                        ".pdftr td,.pdftr th,.pdfth td,.pdfth th"
                      );
                      tbtd.forEach((td) => {
                        td.style.fontSize = "10px";
                      });
                      const thtd = content.querySelectorAll(".pdftr th");
                      thtd.forEach((td) => {
                        td.style.fontSize = "10px";
                      });
                      savePDF(content, {
                        paperSize: "A4",
                        fileName: `${formData.name}${
                          formData.startDate
                            ? `__${getMonth(
                                new Date(formData.startDate).getMonth() + 1
                              )} ${new Date(formData.startDate).getFullYear()}`
                            : ""
                        }${formData.gstType ? `__${formData.gstType}` : ""}${
                          formData.serviceType
                            ? `__${formData.serviceType}`
                            : ""
                        }`
                          .replaceAll(".", "_")
                          .replaceAll(" ", "_"),
                      });

                      tbtd.forEach((td) => {
                        td.style.fontSize = "15px";
                        td.style.padding = "0px";
                      });

                      thtd.forEach((td) => {
                        td.style.fontSize = "15px";
                        td.style.padding = "0px";
                      });
                    }}
                  >
                    <FontAwesomeIcon icon={faDownload} height={20} width={20} />
                  </Button>
                </>
              ) : (
                <></>
              )}
              <Button
                variant="primary"
                // className="col-md-1"
                onClick={() => {
                  setShow1(true);
                }}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </Col>
      {/* General Settings */}
      {formData.printType === "PDF" && ud.length ? (
        <Row className="mt-6" id={"jsx-template"}>
          <Col md={12} xs={12}>
            <Table responsive className="text-nowrap mb-0" id="printareapdf">
              <thead className="table-light">
                <tr className="pdfth">
                  <th className="w-4">NO</th>
                  <th className="w-12">DATE</th>
                  <th className="w-12">AWB No.</th>
                  <th className="w-20">CONSIGNEE NAME</th>
                  <th className="w-20">DESTINATION</th>
                  {/* <th className="text-end">SERVICE TYPE</th> */}
                  <th className="text-end w-4">QTY</th>
                  <th className="text-center w-12">SERVICE</th>
                  <th className="text-end">WEIGHT</th>
                  <th className="text-end ">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {ud?.toReversed().map((item, index) => {
                  return (
                    <tr
                      key={index}
                      style={{
                        cursor: "pointer",
                      }}
                      className={`pdftr`}
                    >
                      <td className="align-middle text-start w-4">
                        {formatToThreeDigits(index + 1)}
                      </td>
                      <td className="align-middle text-start w-12">
                        {formatDatezeroes(item.orderDetails.bookingDate)}
                      </td>
                      <td className="align-middle font-weight-bold text-start w-12">
                        {item.orderId}
                      </td>
                      <td className="align-middle w-20 text-start">
                        {item.orderDetails.personName}
                      </td>
                      <td className="align-start w-20 text-start">
                        {item.orderDetails.city}
                      </td>
                      <td className="align-middle text-end w-4">
                        {item.packageDetails.length}
                      </td>
                      <td className="align-middle text-end w-12">
                        {item.orderDetails.serviceType}
                      </td>
                      <td className="align-middle text-end">
                        {parseFloat(
                          parseInt(item.orderDetails.kg) +
                            parseFloat(item.orderDetails.hkg)
                        ).toFixed(3)}
                      </td>
                      <td className="align-middle text-end">
                        {parseFloat(item.orderDetails.totalAmount).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}

                <tr className="pdfth">
                  <th colSpan={6}></th>
                  <th colSpan={1} className="text-end">
                    Total
                  </th>
                  <th colSpan={1} className="text-end">
                    {" "}
                    {ud
                      .reduce((sum, data) => {
                        if (data.orderDetails.actualWeight) {
                          return (
                            sum +
                            parseInt(data.orderDetails.kg) +
                            parseFloat(data.orderDetails.hkg)
                          );
                        } else {
                          return sum + 0;
                        }
                      }, 0)
                      .toFixed(3)}
                  </th>
                  <th colSpan={1} className="text-end">
                    {ud
                      .reduce((sum, data) => {
                        if (data.orderDetails.totalAmount) {
                          return sum + data.orderDetails.totalAmount;
                        } else {
                          return sum + 0;
                        }
                      }, 0)
                      .toFixed(2)}
                  </th>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      ) : (
        <></>
      )}
      {formData.printType === "Bill" && ud.length ? (
        <Row className="mt-6 ">
          <Col md={12} xs={12}>
            <div id="printareapdf">
              <table responsive className=" table text-wrap mb-0 ">
                <tbody>
                  <tr className="text-center pdfth">
                    <th colSpan={9}>
                      {formData.gstType === "GST"
                        ? "TAX INVOICE"
                        : "CASH INVOICE"}
                    </th>
                  </tr>
                  <tr className="pdfth">
                    <th colSpan={1} className="w-16">
                      Invoice No
                    </th>
                    <td colSpan={4} className="w-50">
                      GCCHO/ST/
                      {ud[0].clientDetails.invoiceno
                        .toString()
                        .padStart(3, "0")}
                      {(() => {
                        const month = new Date(formData.invoiceDate).getMonth(); // 0 for January, 1 for February, ..., 11 for December
                        return (month + 10) % 12 === 0 ? 12 : (month + 10) % 12;
                      })()}
                      {new Date(formData.invoiceDate).getFullYear() % 100}
                    </td>
                    <th colSpan={4} className="text-end w-30">
                      GALAXY CARGO AND COURIER
                    </th>
                  </tr>
                  <tr className=" pdfth">
                    <th colSpan={1} className="w-16">
                      Invoice Date
                    </th>
                    <td colSpan={4} className="w-50">
                      {formatDatezeroes(formData.invoiceDate)}
                    </td>
                    <td colSpan={4} className="text-end w-30">
                      1ST FLOOR, 4 / 2779, SHOP NO. 1,
                    </td>
                  </tr>
                  <tr className="pdfth">
                    <th colSpan={1} className="w-16">
                      Bill Period
                    </th>
                    <td colSpan={4} className="w-50">
                      {formatDate(new Date(formData.startDate))} To{" "}
                      {formatDate(new Date(formData.endDate))}
                    </td>
                    <td colSpan={4} className="text-end w-30">
                      SAFIYA MANJIL, AMKHAS MOHALLA,
                    </td>
                  </tr>
                  <tr className="pdfth">
                    <th colSpan={1} className="w-16">
                      Billed To
                    </th>
                    <td colSpan={4} className="w-50">
                      {formData?.name}
                    </td>
                    <td colSpan={4} className="text-end w-30">
                      BEGAMPURA, SURAT. 395003
                    </td>
                  </tr>
                  <tr className="pdfth">
                    <th colSpan={1} className="w-16">
                      Address
                    </th>
                    <td
                      colSpan={4}
                      className="w-50"
                      style={{
                        textWrap: "wrap",
                      }}
                    >
                      {formData.address}
                    </td>
                    <td colSpan={4} className="text-end w-30">
                      (M) +91 7043499952 / 7043499953
                    </td>
                  </tr>
                  {formData.gstType === "GST" ? (
                    <tr className="pdfth">
                      <th colSpan={1} className="w-16">
                        GSTIN
                      </th>
                      <td colSpan={4} className="w-50">
                        {formData.gstNumber}
                      </td>
                      <td colSpan={4} className="text-end w-30">
                        GSTIN: 24AURPK4427C1ZQ
                      </td>
                    </tr>
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
              <table responsive className=" table text-wrap mb-0 ">
                <tbody>
                  <tr className="pdftr">
                    <th className="text-start w-4">NO</th>
                    <th className="text-start w-12">DATE</th>
                    <th className="text-start w-12">AWB No.</th>
                    <th className="text-start w-20">CONSIGNEE NAME</th>
                    <th className="text-start w-20">DESTINATION</th>
                    <th className="text-end w-4">QTY</th>
                    <th className="text-center w-12">SERVICE</th>
                    <th className="text-end">WEIGHT</th>
                    <th className="text-end">AMOUNT</th>
                  </tr>
                  {ud?.toReversed().map((item, index) => {
                    return (
                      <tr
                        key={index}
                        style={{
                          cursor: "pointer",
                        }}
                        className="pdftr"
                      >
                        <td className="align-start text-start w-4">
                          {formatToThreeDigits(index + 1)}
                        </td>
                        <td className="align-start text-start w-12">
                          {formatDatezeroes(item.orderDetails.bookingDate)}
                        </td>
                        <td className="align-start text-start w-12">
                          {item.orderId}
                        </td>
                        <td className="align-start text-start w-20">
                          {item.orderDetails.personName}
                        </td>
                        <td className="align-start text-start w-20">
                          {item.orderDetails.city}
                        </td>
                        <td className="align-start text-end w-4">
                          {item.packageDetails.length}
                        </td>
                        <td className="align-start text-center  w-12">
                          {item.orderDetails.serviceType}
                        </td>
                        <td className="align-start text-end">
                          {parseFloat(
                            parseInt(item.orderDetails.kg) +
                              parseFloat(item.orderDetails.hkg)
                          ).toFixed(3)}
                        </td>
                        <td className="align-start text-end">
                          {parseFloat(item.orderDetails.totalAmount).toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="pdftr">
                    <th colSpan={4}>
                      {" "}
                      {formData.gstType === "GST" ? "Terms & Conditions" : ""}
                    </th>
                    <th colSpan={3} className="text-end">
                      Total Weight & Amount
                    </th>
                    <td colSpan={1} className="special-td">
                      {" "}
                      {ud
                        .reduce((sum, data) => {
                          if (data.orderDetails.actualWeight) {
                            return (
                              sum +
                              parseInt(data.orderDetails.kg) +
                              parseFloat(data.orderDetails.hkg)
                            );
                          } else {
                            return sum + 0;
                          }
                        }, 0)
                        .toFixed(3)}
                    </td>
                    <td colSpan={1} className="special-td">
                      {ud
                        .reduce((sum, data) => {
                          if (data.orderDetails.totalAmount) {
                            return sum + data.orderDetails.totalAmount;
                          } else {
                            return sum + 0;
                          }
                        }, 0)
                        .toFixed(2)}
                    </td>
                  </tr>
                  {formData.gstType === "GST" ? (
                    <tr className="pdftr">
                      <th
                        colSpan={4}
                      >{`1) All disputes are subject to Surat Jurisdiction.`}</th>
                      <td colSpan={3} className="text-end">
                        {formData?.gstType === "GST" ? "CGST @ 9% " : ""}
                      </td>
                      <td colSpan={1}></td>
                      <td colSpan={1} className="special-td">
                        {formData?.gstType === "GST"
                          ? (
                              (ud.reduce((sum, data) => {
                                if (data.orderDetails.totalAmount) {
                                  return sum + data.orderDetails.totalAmount;
                                } else {
                                  return sum + 0;
                                }
                              }, 0) *
                                9) /
                              100
                            ).toFixed(2)
                          : "-"}
                      </td>
                    </tr>
                  ) : (
                    <></>
                  )}
                  {formData.gstType === "GST" ? (
                    <tr className="pdftr">
                      <th
                        colSpan={4}
                      >{`2) Cheque should be in the favor of "Galaxy Cargo and Courier"`}</th>
                      <td colSpan={3} className="text-end">
                        {formData?.gstType === "GST" ? "SGST @ 9% " : ""}
                      </td>
                      <td colSpan={1}></td>
                      <td colSpan={1} className="special-td">
                        {formData?.gstType === "GST"
                          ? (
                              (ud.reduce((sum, data) => {
                                if (data.orderDetails.totalAmount) {
                                  return sum + data.orderDetails.totalAmount;
                                } else {
                                  return sum + 0;
                                }
                              }, 0) *
                                9) /
                              100
                            ).toFixed(2)
                          : "-"}
                      </td>
                    </tr>
                  ) : (
                    <></>
                  )}
                  {formData.gstType === "GST" ? (
                    <tr className="pdftr">
                      <th colSpan={4}></th>
                      <td colSpan={3} className="text-end">
                        Round Off
                      </td>
                      <td colSpan={1}></td>
                      <td colSpan={1} className="special-td">
                        {(() => {
                          const base = ud.reduce((sum, data) => {
                            if (data.orderDetails.totalAmount) {
                              return sum + data.orderDetails.totalAmount;
                            } else {
                              return sum + 0;
                            }
                          }, 0);
                          const gst = (base * 9) / 100;
                          const total =
                            formData.gstType === "GST"
                              ? base + gst + gst
                              : base;

                          const floor = Math.floor(total);
                          const remain = total - floor;
                          let round;
                          if (remain >= 0.5) {
                            round = 1 - remain;
                          } else {
                            round = 0 - remain;
                          }
                          if (round === 0) {
                            return "-";
                          } else return `${round.toFixed(2)}`;
                        })()}
                      </td>
                    </tr>
                  ) : (
                    <></>
                  )}
                  {formData.pd && formData.pd != 0 ? (
                    <tr className="pdftr">
                      <th colSpan={4}></th>
                      <td colSpan={3} className="text-end">
                        <span
                          style={{
                            textTransform: "capitalize",
                          }}
                        >
                          {formData.pdname}
                        </span>
                      </td>
                      <td colSpan={1}></td>
                      <td colSpan={1} className="special-td">
                        {" "}
                        {`${formData.pd}`}
                      </td>
                    </tr>
                  ) : (
                    <></>
                  )}
                  {formData.pca && formData.pca != 0 ? (
                    <tr className="pdftr">
                      <th colSpan={4}>
                        <span
                          style={{
                            textTransform: "capitalize",
                          }}
                        >
                          Remark : {formData.pcremark ? formData.pcremark : ""}
                        </span>
                      </th>
                      <td colSpan={3} className="text-end">
                        <span
                          style={{
                            textTransform: "capitalize",
                          }}
                        >
                          Parcel Claim Amount
                        </span>
                      </td>
                      <td colSpan={1}></td>
                      <td colSpan={1} className="special-td">
                        {" "}
                        {`- ${formData.pca}`}
                      </td>
                    </tr>
                  ) : (
                    <></>
                  )}
                  {formData.ppr && formData.ppr != 0 ? (
                    <tr className="pdftr">
                      <th colSpan={4}></th>
                      <td colSpan={3} className="text-end">
                        Credit Balance
                      </td>
                      <td colSpan={1}></td>
                      <td colSpan={1} className="special-td">
                        {`- ${formData.ppr}`}
                      </td>
                    </tr>
                  ) : (
                    <></>
                  )}

                  <tr className="pdftr">
                    <th colSpan={4}></th>
                    <th colSpan={3} className="text-end">
                      Amount To Pay{" "}
                    </th>
                    <td colSpan={1}></td>
                    <th colSpan={1} className="special-td">
                      {(() => {
                        const base = ud.reduce((sum, data) => {
                          if (data.orderDetails.totalAmount) {
                            return sum + data.orderDetails.totalAmount;
                          } else {
                            return sum + 0;
                          }
                        }, 0);
                        const gst = (base * 9) / 100;
                        const total =
                          formData.gstType === "GST"
                            ? base + gst + gst
                            : base +
                              parseFloat(formData.pd ? formData.pd : 0) -
                              parseFloat(formData.ppr ? formData.ppr : 0) -
                              parseFloat(formData.pca ? formData.pca : 0);
                        const floor = Math.floor(total);
                        const remain = total - floor;
                        let round;
                        if (remain >= 0.5) {
                          round = 1 - remain;
                        } else {
                          round = 0 - remain;
                        }

                        if (round === 0) {
                          return total.toFixed(2);
                        } else return `${(total + round).toFixed(2)}`;
                      })()}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      ) : (
        <></>
      )}

      {formData.printType === "Manifest" && ud.length ? (
        <Row className="mt-6">
          <Col md={12} xs={12}>
            <Table responsive className="text-nowrap mb-0 printarea">
              <thead className="table-light">
                <tr>
                  <th>SR.NO</th>
                  <th>DATE</th>
                  <th>CONSIGNEE NAME</th>
                  <th>TO CITY</th>
                  <th>QTY</th>
                  <th>CAT</th>
                  <th>AWB No.</th>
                </tr>
              </thead>
              <tbody>
                {ud?.toReversed().map((item, index) => {
                  return (
                    <tr
                      key={index}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <td className="align-middle">
                        {formatToThreeDigits(index + 1)}
                      </td>
                      <td className="align-middle">
                        <span className={`align-middle`}>
                          {formatDatezeroes(item.orderDetails.bookingDate)}
                        </span>
                      </td>
                      <td className="align-middle">
                        <span>{item.orderDetails.personName}</span>
                      </td>
                      <td className="align-middle">
                        <span>{item.orderDetails.city}</span>
                      </td>
                      <td className="align-middle">
                        <div className="avatar-group">1</div>
                      </td>
                      <td className="align-middle">
                        {item.orderDetails.serviceType}
                      </td>
                      <td className="align-middle">
                        {item.orderDetails.forwardingNumber}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      ) : (
        <></>
      )}
      {formData.printType === "Contact No" && ud.length ? (
        <Row className="mt-6">
          <Col md={12} xs={12}>
            <Table responsive className="text-nowrap mb-0 printarea">
              <thead className="table-light">
                <tr>
                  <th>SR.NO</th>
                  <th>CONSIGNEE NAME</th>
                  <th>Contact No 1</th>
                  <th>Contact No 2</th>
                </tr>
              </thead>
              <tbody>
                {ud?.toReversed().map((item, index) => {
                  return (
                    <tr
                      key={index}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <td className="align-middle">
                        {formatToThreeDigits(index + 1)}
                      </td>
                      <td className="align-middle">
                        {item.orderDetails.personName}
                      </td>
                      <td className="align-middle">
                        {item.orderDetails.phoneNo}
                      </td>
                      <td className="align-middle">
                        {item.orderDetails.phoneNo2}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      ) : (
        <></>
      )}
      <Modal show={show1} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Manifest / Bill </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* row */}
            <Row className="mb-3">
              <Form.Label
                className="col-sm-4"
                htmlFor="country"
                style={{
                  textTransform: "capitalize",
                }}
              >
                Select Customer
              </Form.Label>
              <Col md={8} xs={12}>
                <Form.Select
                  id="country"
                  value={formData.userType} // Controlled value from state
                  onChange={(e) => {
                    const f = d.find((d) => {
                      return d._id === e.target.value;
                    });
                    setFormData((val) => ({
                      ...val,
                      userType: e.target.value, // Update serviceOption in state
                      name: e.target.selectedOptions[0].text, // Update serviceOption in state
                      address: `${
                        f?.addressLine1 ? `${f?.addressLine1},` : ""
                      }${f?.addressLine2 ? `${f?.addressLine2},` : ""}${
                        f?.addressLine3 ? `${f?.addressLine3},` : ""
                      }${f?.city ? `${f?.city},` : ""}${
                        f?.state ? `${f?.state},` : ""
                      }${f?.postalCode ? `${f?.postalCode}` : ""}`,
                      gstNumber: f?.gstNumber ? f?.gstNumber : "",
                      gstType: f?.gstType ? f?.gstType : "",
                    }));
                  }}
                >
                  <option value="">All</option> {/* Placeholder option */}
                  {d
                    ?.sort((a, b) => {
                      if (a.companyName < b.companyName) {
                        return -1;
                      }
                      if (a.companyName > b.companyName) {
                        return 1;
                      }
                      return 0;
                    })
                    .map((option) => {
                      return (
                        <option key={option._id} value={option._id}>
                          {option.companyName}
                        </option>
                      );
                    })}
                </Form.Select>
              </Col>
            </Row>{" "}
            {/* <Row className="mb-3">
              <Form.Label
                className="col-sm-4"
                htmlFor="country"
                style={{
                  textTransform: "capitalize",
                }}
              >
                Billing Type
              </Form.Label>
              <Col md={8} xs={12}>
                <Form.Select
                  id="country"
                  value={formData.gstType} // Controlled value from state
                  onChange={(e) => {
                    setFormData((val) => ({
                      ...val,
                      gstType: e.target.value, // Update serviceOption in state
                    }));
                  }}
                >
                  {GstOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>{" "} */}
            <Row className="align-items-center mb-3">
              <Form.Label className="col-sm-4" htmlFor="zipcode">
                Booking Date
              </Form.Label>
              <Col md={4} xs={12}>
                <Form.Control
                  type="Date"
                  id="zipcode"
                  required
                  value={formData.startDate}
                  onChange={(e) => {
                    setFormData((val) => ({
                      ...val,
                      startDate: e.target.value,
                      endDate: e.target.value,
                    }));
                  }}
                />
              </Col>
              <Col md={4} xs={12}>
                <Form.Control
                  type="Date"
                  id="zipcode"
                  required
                  value={formData.endDate}
                  onChange={(e) => {
                    setFormData((val) => ({
                      ...val,
                      endDate: e.target.value,
                    }));
                  }}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label
                className="col-sm-4"
                htmlFor="country"
                style={{
                  textTransform: "capitalize",
                }}
              >
                Service Type
              </Form.Label>
              <Col md={8} xs={12}>
                <Form.Select
                  id="country"
                  value={formData.serviceType} // Controlled value from state
                  onChange={(e) => {
                    setFormData((val) => ({
                      ...val,
                      serviceType: e.target.value, // Update serviceOption in state
                    }));
                  }}
                >
                  <option value="">All</option> {/* Placeholder option */}
                  {serviceTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label
                className="col-sm-4"
                htmlFor="country"
                style={{
                  textTransform: "capitalize",
                }}
              >
                Manifest/Bill
              </Form.Label>
              <Col md={8} xs={12}>
                <Form.Select
                  id="country"
                  value={formData.printType} // Controlled value from state
                  onChange={(e) => {
                    setFormData((val) => ({
                      ...val,
                      printType: e.target.value, // Update serviceOption in state
                    }));
                  }}
                >
                  {printType.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            {formData.printType === "Bill" ? (
              <>
                <Row className="align-items-center mb-3">
                  <Form.Label className="col-sm-4" htmlFor="zipcode">
                    Invoice Date
                  </Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control
                      type="Date"
                      id="zipcode"
                      required
                      value={formData.invoiceDate}
                      onChange={(e) => {
                        setFormData((val) => ({
                          ...val,
                          invoiceDate: e.target.value,
                        }));
                      }}
                    />
                  </Col>
                </Row>
                <Row className="align-items-center mb-3">
                  <Form.Label className="col-sm-4" htmlFor="zipcode">
                    Payment Due
                  </Form.Label>
                  <Col md={4} xs={12}>
                    <Form.Control
                      type="text"
                      id="zipcode"
                      value={formData.pdname}
                      onChange={(e) => {
                        setFormData((val) => ({
                          ...val,
                          pdname: e.target.value,
                        }));
                      }}
                    />
                  </Col>
                  <Col md={4} xs={12}>
                    <Form.Control
                      type="number"
                      id="zipcode"
                      required
                      value={formData.pd}
                      onChange={(e) => {
                        setFormData((val) => ({
                          ...val,
                          pd: e.target.value,
                        }));
                      }}
                    />
                  </Col>
                </Row>
                <Row className="align-items-center mb-3">
                  <Form.Label className="col-sm-4" htmlFor="zipcode">
                    Parcel Claim Amount
                  </Form.Label>
                  <Col md={4} xs={12}>
                    <textarea
                      type="text"
                      id="zipcode"
                      className="form-control"
                      value={formData.pcremark}
                      onChange={(e) => {
                        setFormData((val) => ({
                          ...val,
                          pcremark: e.target.value,
                        }));
                      }}
                    />
                  </Col>
                  <Col md={4} xs={12}>
                    <Form.Control
                      type="number"
                      id="zipcode"
                      required
                      value={formData.pca}
                      onChange={(e) => {
                        setFormData((val) => ({
                          ...val,
                          pca: e.target.value,
                        }));
                      }}
                    />
                  </Col>
                </Row>
                <Row className="align-items-center mb-3">
                  <Form.Label className="col-sm-4" htmlFor="zipcode">
                    Credit Balance
                  </Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control
                      type="number"
                      id="zipcode"
                      required
                      value={formData.ppr}
                      onChange={(e) => {
                        setFormData((val) => ({
                          ...val,
                          ppr: e.target.value,
                        }));
                      }}
                    />
                  </Col>
                </Row>
              </>
            ) : (
              <></>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setFormData({
                startDate: "",
                endDate: "",
                userType: "",
                gstType: "Cash",
                af: "",
                serviceType: "",
                name: "",
                printType: "Manifest",
                address: "",
                gstNumber: "",
                ppr: 0,
                pd: 0,
                pdname: "",
                pca: 0,
                pcremark: "",
              });
              setUD([]);
            }}
          >
            Reset
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
              if (
                formData.printType !== "Manifest" &&
                formData.printType !== "Contact No" &&
                !formData.userType
              ) {
                return alert(
                  "please select user if print type is not manifest"
                );
              }
              if (new Date(formData.startDate) > new Date(formData.endDate)) {
                return alert("wrong date range");
              }
              if (
                !formData.startDate ||
                !formData.endDate ||
                (!formData.invoiceDate && formData.printType == "Bill")
              ) {
                return alert("please select valid date");
              }

              let q = query(collection(db, "order"));
              if (formData.userType) {
                q = query(q, where("clientId", "==", formData.userType));
              }
              if (
                formData.startDate &&
                formData.endDate &&
                formData.startDate <= formData.endDate
              ) {
                q = query(
                  q,
                  where("orderDetails.bookingDate", ">=", formData.startDate),
                  where("orderDetails.bookingDate", "<=", formData.endDate)
                );
              }

              if (formData.serviceType) {
                q = query(
                  q,
                  where("orderDetails.serviceType", "==", formData.serviceType)
                );
              }
              const docSnap = await getDocs(q);
              let d = [];
              docSnap.forEach((element) => {
                const data = element.data();
                d.push(data);
              });
              d = d.sort(
                (a, b) =>
                  new Date(b.orderDetails.bookingDate) -
                  new Date(a.orderDetails.bookingDate)
              );
              setUD(d);
              setShow1(false);
            }}
          >
            Search
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
export default Settings;

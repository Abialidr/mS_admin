// import node module libraries
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  Container,
  Modal,
} from "react-bootstrap";
const countryOptions = [
  { value: "Aaddhar number", label: "Aaddhar number" },
  { value: "Pan number", label: "Pan number" },
];
import { useEffect, useRef, useState } from "react";
import {
  addDocument,
  db,
  getDocumentById,
  handleUpload,
  updateDocument,
} from "utils/firebase";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { collection, getDocs, query, where } from "firebase/firestore";
import { formatDate, getAllFileExtensions } from "utils/helper";
import Head from "next/head";
const shipmentStatuses = [
  { value: "Shipment Booked", label: "Shipment Booked" },
  { value: "In Transit To Destination", label: "In Transit To Destination" },
  { value: "Arrived At Destination", label: "Arrived At Destination" },
  { value: "Out For Delivery", label: "Out For Delivery" },
  { value: "Delivery Pending", label: "Delivery Pending" },
  { value: "Return To Origin", label: "Return To Origin" },
  { value: "Delivered", label: "Delivered" },
];

const Settings = () => {
  const fileRef = useRef(null);
  const router = useRouter();
  const [cid, setId] = useState();
  const [clientDetails, setClientDetails] = useState();
  const [cities, setCities] = useState([]);
  const [remarks, setRemarks] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const getCity = async () => {
    const docSnap = await getDocs(
      query(collection(db, "utils"), where("type", "==", "City"))
    );
    let d = [];
    docSnap.forEach((element) => {
      const data = element.data();
      d.push(data.name);
    });
    d = d?.sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });
    // const data = await getAllDocuments("client");
    setCities(d);
  };
  const getStatus = async () => {
    const docSnap = await getDocs(
      query(collection(db, "utils"), where("type", "==", "Status"))
    );
    let d = [];
    docSnap.forEach((element) => {
      const data = element.data();
      d.push(data.name);
    });
    d = d?.sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });
    // const data = await getAllDocuments("client");
    setStatuses(d);
  };
  const getRemark = async () => {
    const docSnap = await getDocs(
      query(collection(db, "utils"), where("type", "==", "Remark"))
    );
    let d = [];
    docSnap.forEach((element) => {
      const data = element.data();
      d.push(data.name);
    });
    d = d?.sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });
    // const data = await getAllDocuments("client");
    setRemarks(d);
  };
  useEffect(() => {
    (async () => {
      if (router.query.id) {
        const doc2 = await getDocumentById("order", router.query.id);
        setWaD(doc2.status);
        setisDelivered(doc2.isDelivered);
        setSelectedImage(doc2?.reciverSign);
        setClientDetails(doc2);
        setDDAte(doc2?.deliveryDate);
        setRN(doc2?.RecieverName);
        setId(doc2.clientId);
      }
    })();
    getCity();
    getStatus();
    getRemark();
  }, [router.query.id]);
  const [isDelivered, setisDelivered] = useState(false);
  const [file, setFile] = useState(false);
  const [deliveryDate, setDDAte] = useState("");
  const [rn, setRN] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [d, setD] = useState();
  const [type, setType] = useState();
  const [show1, setShow1] = useState(false);
  const handleClose = () => setShow1(false);
  const [WaD, setWaD] = useState([
    {
      date: "",
      time: "",
      status: "",
      city: "",
      remark: "",
    },
  ]);
  return (
    <>
      <Head>
        <title>
          Status of {clientDetails?.clientDetails?.companyName} |{" "}
          {clientDetails?.orderDetails?.personName}
        </title>
        <description>
          Status of {clientDetails?.clientDetails?.companyName} |{" "}
          {clientDetails?.orderDetails?.personName}
        </description>
      </Head>
      <Container fluid className="p-6">
        {/* Page Heading */}
        {/* <PageHeading heading="SHIPPER / From information" /> */}

        {/* General Settings */}
        <Row className="mb-8">
          <Col xl={12} lg={12} md={12} xs={12}>
            <Card>
              <Card.Header className="p-4 bg-white">
                <Row
                  style={{
                    gap: "10px",
                  }}
                >
                  <h4
                    style={{
                      alignSelf: "center",
                      fontWeight: "600",
                      textDecoration: "underline",
                    }}
                    className="mb-0 col-md-7
                "
                  >
                    Update Shipment
                  </h4>
                  <Button
                    variant="primary"
                    className="col-md-1"
                    onClick={async (e) => {
                      setShow1(true);
                      setType("City");
                    }}
                  >
                    Add City
                  </Button>
                  <Button
                    variant="primary"
                    className="col-md-1"
                    onClick={async (e) => {
                      setShow1(true);
                      setType("Status");
                    }}
                  >
                    Add Status
                  </Button>
                  <Button
                    variant="primary"
                    className="col-md-1"
                    onClick={async (e) => {
                      setShow1(true);
                      setType("Remark");
                    }}
                  >
                    Add Remark
                  </Button>

                  <Button
                    variant="primary"
                    className="col-md-1"
                    onClick={async (e) => {
                      const dum = JSON.parse(JSON.stringify(WaD));
                      dum.push({
                        date: new Date().toISOString().split("T")[0],
                        time: new Date()
                          .toTimeString()
                          .split(" ")[0]
                          .slice(0, 5),
                        status: "",
                        city: "",
                        remark: "",
                      });
                      setWaD(dum);
                    }}
                  >
                    Add Row
                  </Button>
                </Row>
              </Card.Header>
              <Card.Body>
                <div>
                  {/* border */}

                  {/* row */}
                  {WaD.map((data, index) => {
                    return (
                      <Row
                        className="mb-2"
                        style={{
                          justifyContent: "center",
                        }}
                        key={index}
                      >
                        <div className="col-md-2">
                          {index == 0 ? (
                            <label htmlFor="fullName">Date</label>
                          ) : (
                            <></>
                          )}
                          <div>
                            <input
                              style={{
                                height: "25px",
                              }}
                              type="date"
                              id="fullName"
                              required
                              value={data.date}
                              onChange={(e) => {
                                const dum = JSON.parse(JSON.stringify(WaD));
                                dum[index].date = e.target.value;
                                setWaD(dum);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-md-2">
                          {index == 0 ? (
                            <label htmlFor="fullName">Time</label>
                          ) : (
                            <></>
                          )}
                          <div>
                            <input
                              style={{
                                height: "25px",
                              }}
                              type="time"
                              id="fullName"
                              required
                              value={data.time}
                              onChange={(e) => {
                                const dum = JSON.parse(JSON.stringify(WaD));
                                dum[index].time = e.target.value;
                                setWaD(dum);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-md-2">
                          {index == 0 ? (
                            <label htmlFor="fullName">City</label>
                          ) : (
                            <></>
                          )}
                          <div>
                            <select
                              style={{
                                height: "25px",
                              }}
                              value={data.city}
                              onChange={(e) => {
                                const dum = JSON.parse(JSON.stringify(WaD));
                                dum[index].city = e.target.value;
                                setWaD(dum);
                              }}
                            >
                              <option value="" disabled selected>
                                Select
                              </option>

                              {cities.map((data) => (
                                <option value={data}>{data}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-2">
                          {index == 0 ? (
                            <label htmlFor="fullName">Status</label>
                          ) : (
                            <></>
                          )}
                          <div>
                            <select
                              style={{
                                width: "100%",
                                height: "25px",
                              }}
                              value={data.status}
                              onChange={(e) => {
                                const dum = JSON.parse(JSON.stringify(WaD));
                                dum[index].status = e.target.value;
                                setWaD(dum);
                              }}
                            >
                              <option value="" disabled selected>
                                Select
                              </option>

                              {statuses.map((data) => (
                                <option value={data}>{data}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-2">
                          {index == 0 ? (
                            <label htmlFor="fullName">Remarks</label>
                          ) : (
                            <></>
                          )}
                          <div>
                            <select
                              style={{
                                width: "100%",
                                height: "25px",
                              }}
                              value={data.remark}
                              onChange={(e) => {
                                const dum = JSON.parse(JSON.stringify(WaD));
                                dum[index].remark = e.target.value;
                                setWaD(dum);
                              }}
                            >
                              <option value="" disabled selected>
                                Select
                              </option>

                              {remarks.map((data) => (
                                <option value={data}>{data}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {WaD.length > 1 ? (
                          <div
                            className="col-md-2"
                            style={{
                              alignSelf: "end",
                              display: "flex",
                              justifyContent: "end",
                            }}
                          >
                            <button
                              style={{
                                background: "transparent",
                                border: "none",
                              }}
                              onClick={() => {
                                const dummy = JSON.parse(JSON.stringify(WaD));
                                dummy.splice(index, 1);
                                setWaD(dummy);
                              }}
                            >
                              <FontAwesomeIcon
                                height={23}
                                color="red"
                                icon={faTrashCan}
                              />
                            </button>
                          </div>
                        ) : (
                          <></>
                        )}
                      </Row>
                    );
                  })}

                  {/* Address Line One */}

                  {/* Zip code */}
                  <Row
                    className="mb-3"
                    style={{
                      border: "1px Solid Black",
                      borderRadius: "8px",
                    }}
                  >
                    <div
                      className="col-md-3"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderRight: "1px Solid Black",
                        padding: "10px",
                      }}
                    >
                      <label
                        style={{
                          textWrap: "nowrap",
                        }}
                      >
                        Status :{" "}
                      </label>
                      <Form.Select
                        className="ml-3"
                        id="country"
                        value={isDelivered}
                        onChange={(e) => {
                          setisDelivered(e.target.value);
                        }}
                      >
                        <option value="">Select</option> {}
                        {shipmentStatuses.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Form.Select>
                      {/* <input
                        type="checkbox"
                        className="ml-3"
                        style={{
                          width: "20px",
                          height: "20px",
                        }}
                        checked={isDelivered}
                        onClick={(e) => {
                          setisDelivered(e.target.checked);
                        }}
                      ></input> */}
                    </div>
                    <div
                      className="col-md-3"
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        padding: "10px",
                        borderRight: "1px Solid Black",
                      }}
                    >
                      <label style={{}}>Delivery Date :</label>
                      <input
                        type="date"
                        className="ml-3 form-control"
                        value={deliveryDate}
                        onChange={(e) => {
                          setDDAte(e.target.value);
                        }}
                      ></input>
                    </div>
                    <div
                      className="col-md-3"
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        padding: "10px",
                        borderRight: "1px Solid Black",
                      }}
                    >
                      <label style={{}}>Reciever Name :</label>
                      <input
                        type="text"
                        className="ml-3 form-control"
                        value={rn}
                        onChange={(e) => {
                          setRN(e.target.value);
                        }}
                      ></input>
                    </div>
                    <div
                      className="col-md-3"
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        padding: "10px",
                        alignItems: "center",
                      }}
                    >
                      <label style={{}}>DRS Image :</label>
                      <img
                        src={selectedImage}
                        onClick={() => {
                          setFile();
                          setSelectedImage("");
                        }}
                        alt="no file uploaded"
                        width={"200px"}
                        style={{
                          border: "1px solid grey",
                        }}
                      ></img>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          fileRef.current.click();
                        }}
                        style={{
                          border: "none",
                          background: "transparent",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faFile}
                          style={{
                            height: "25px",
                            width: "25px",
                          }}
                        />
                      </button>
                      <input
                        style={{
                          display: "none",
                        }}
                        ref={fileRef}
                        type="file"
                        className="ml-3 form-control"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setFile(file);
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setSelectedImage(reader.result); // Set the result as the image source
                            };
                            reader.readAsDataURL(file); // Read the file as a Data URL
                          }
                        }}
                      ></input>
                    </div>
                  </Row>
                  <Row>
                    <Button
                      variant="primary"
                      type="submit"
                      className="col-md-2"
                      onClick={async (e) => {
                        e.preventDefault();
                        try {
                          let reciverSign = "";
                          if (file) {
                            reciverSign = await handleUpload(
                              file,
                              `${clientDetails.clientDetails.personName}-${
                                clientDetails.clientDetails.companyName
                              }-${formatDate(clientDetails.createdAt)}-${
                                clientDetails.orderId
                              }.${getAllFileExtensions(file.name)}`
                            );
                            if (reciverSign === undefined) {
                              return alert("file not uploaded try again");
                            }
                          }
                          const res = await updateDocument(
                            "order",
                            router.query.id,
                            {
                              status: WaD,
                              isDelivered,
                              deliveryDate,
                              RecieverName: rn ? rn : "",
                              reciverSign: file ? reciverSign : "",
                            }
                          );
                          alert("Status updated successfully");
                          // router.push(`/order/${cid}`);
                        } catch (error) {
                          alert("something went wrong");
                        }
                        // if (res.id) {
                        // } else {
                        // }
                      }}
                    >
                      Update
                    </Button>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Modal show={show1} onHide={handleClose} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Add {type}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              className="form-control"
              placeholder={`Add ${type}`}
              id="fullName"
              required
              value={d}
              onChange={(e) => {
                setD(e.target.value);
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={async () => {
                const res = await addDocument("utils", {
                  type,
                  name: d,
                });
                if (res.id) {
                  setD("");
                  getCity();
                  getStatus();
                  getRemark();
                  // setShow1(false);
                } else {
                  alert("something went wrong");
                }
              }}
            >
              Add {type}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Email Settings */}
        {/* <EmailSetting /> */}

        {/* Settings for Preferences */}
        {/* <Preferences /> */}

        {/* Settings for Notifications */}
        {/* <Notifications /> */}

        {/* Delete Your Account */}
        {/* <DeleteAccount /> */}
      </Container>
    </>
  );
};

export default Settings;

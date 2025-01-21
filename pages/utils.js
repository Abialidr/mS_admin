import { Col, Row, Table, Container, Modal, Button } from "react-bootstrap";
import { db, deleteDocument, updateDocument } from "utils/firebase";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { PageHeading } from "widgets";
const Settings = () => {
  const [d, setD] = useState();
  const [ud, setuD] = useState();
  const [remarks, setRemarks] = useState();
  const [r, setR] = useState(false);
  const router = useRouter();
  const [data, setData] = useState("");
  const [id, setId] = useState();
  const [type, setType] = useState();
  const [show1, setShow1] = useState(false);
  const handleClose = () => setShow1(false);
  const getCity = async () => {
    const docSnap = await getDocs(
      query(collection(db, "utils"), where("type", "==", "City"))
    );
    let d = [];
    docSnap.forEach((element) => {
      const data = element.data();
      d.push({
        name: data.name,
        _id: element.id,
      });
    });
    d = d?.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    setuD(d);
  };
  const getStatus = async () => {
    const docSnap = await getDocs(
      query(collection(db, "utils"), where("type", "==", "Status"))
    );
    let d = [];
    docSnap.forEach((element) => {
      const data = element.data();
      d.push({
        name: data.name,
        _id: element.id,
      });
    });
    d = d?.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    setD(d);
  };
  const getRemarks = async () => {
    const docSnap = await getDocs(
      query(collection(db, "utils"), where("type", "==", "Remark"))
    );
    let d = [];
    docSnap.forEach((element) => {
      const data = element.data();
      d.push({
        name: data.name,
        _id: element.id,
      });
    });
    d = d?.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    setRemarks(d);
  };
  useEffect(() => {
    getCity();
    getStatus();
    getRemarks();
  }, [r]);
  return (
    <Container fluid className="p-2">
      {}
      <Row className="mt-2">
        <Col md={4} xs={12}>
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <PageHeading heading="City" ismb={false} />
            </div>
          </div>
        </Col>
        <Col md={4} xs={12} className="mt-2">
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <PageHeading heading="Status" ismb={false} />
            </div>
          </div>
        </Col>
        <Col md={4} xs={12} className="mt-2">
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <PageHeading heading="Remarks" ismb={false} />
            </div>
          </div>
        </Col>
      </Row>
      {}
      <Row className="mt-2">
        <Col md={4} xs={12}>
          <Table responsive className="text-nowrap mb-0  printarea1">
            <thead className="table-light">
              <tr>
                <th>Sr.no</th>
                <th>name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ud?.map((item, index) => {
                return (
                  <tr
                    key={index}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <td className="align-middle">{index + 1}</td>
                    <td className="align-middle">{item.name}</td>
                    <td className="align-middle">
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                        }}
                      >
                        <button
                          style={{
                            background: "transparent",
                            border: "none",
                            boxShadow: "none",
                          }}
                          onClick={() => {
                            setData(item.name);
                            setType("City");
                            setId(item._id);
                            setShow1(true);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faEdit}
                            height={"20px"}
                            width={"20px"}
                            color="#637381"
                          />
                        </button>
                        <button
                          style={{
                            background: "transparent",
                            border: "none",
                            boxShadow: "none",
                          }}
                          onClick={async (e) => {
                            e.preventDefault();
                            await deleteDocument("utils", item._id);
                            setR(!r);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            height={"20px"}
                            width={"20px"}
                            color="#637381"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
        <Col md={4} xs={12}>
          <Table responsive className="text-nowrap mb-0 printarea1">
            <thead className="table-light">
              <tr>
                <th>Sr.n0</th>
                <th>name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {d?.map((item, index) => {
                return (
                  <tr
                    key={index}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <td className="align-middle">{index + 1}</td>
                    <td className="align-middle">{item.name}</td>
                    <td className="align-middle">
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                        }}
                      >
                        <button
                          style={{
                            background: "transparent",
                            border: "none",
                            boxShadow: "none",
                          }}
                          onClick={() => {
                            setData(item.name);
                            setType("Status");
                            setId(item._id);
                            setShow1(true);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faEdit}
                            height={"20px"}
                            width={"20px"}
                            color="#637381"
                          />
                        </button>
                        <button
                          style={{
                            background: "transparent",
                            border: "none",
                            boxShadow: "none",
                          }}
                          onClick={async () => {
                            await deleteDocument("utils", item._id);
                            setR(!r);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            height={"20px"}
                            width={"20px"}
                            color="#637381"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
        <Col md={4} xs={12}>
          <Table responsive className="text-nowrap mb-0 printarea1">
            <thead className="table-light">
              <tr>
                <th>Sr.n0</th>
                <th>name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {remarks?.map((item, index) => {
                return (
                  <tr
                    key={index}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <td className="align-middle">{index + 1}</td>
                    <td className="align-middle">{item.name}</td>
                    <td className="align-middle">
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                        }}
                      >
                        <button
                          style={{
                            background: "transparent",
                            border: "none",
                            boxShadow: "none",
                          }}
                          onClick={() => {
                            setData(item.name);
                            setType("Remarks");
                            setId(item._id);
                            setShow1(true);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faEdit}
                            height={"20px"}
                            width={"20px"}
                            color="#637381"
                          />
                        </button>
                        <button
                          style={{
                            background: "transparent",
                            border: "none",
                            boxShadow: "none",
                          }}
                          onClick={async () => {
                            await deleteDocument("utils", item._id);
                            setR(!r);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            height={"20px"}
                            width={"20px"}
                            color="#637381"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
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
            value={data}
            onChange={(e) => {
              setData(e.target.value);
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
              const res = await updateDocument("utils", id, {
                name: data,
              });
              setData();
              setShow1(false);
              if (type === "City") {
                getCity();
              } else if (type === "Status") {
                getStatus();
              } else {
                getRemarks();
              }
            }}
          >
            Update {type}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
export default Settings;

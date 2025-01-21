import Link from "next/link";
import { Col, Row, Table, Container } from "react-bootstrap";
import { db, deleteDocument, getAllDocuments } from "utils/firebase";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getUserType } from "utils/redux/reducer/authReducer";
import { collection, getDocs, query, where } from "firebase/firestore";
import { PageHeading } from "widgets";
const Settings = () => {
  const [d, setD] = useState();
  const [d1, setD1] = useState();
  const [r, setR] = useState(false);
  const userType = useSelector(getUserType);
  useEffect(() => {
    (async () => {
      const data = await getAllDocuments("products");
      setD(data);
      setD1(data);
    })();
  }, [r]);
  const router = useRouter();
  return (
    <Container fluid className="p-2">
      {}
      <Col lg={12} md={12} xs={12}>
        {}
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <PageHeading heading="Products" ismb={false} />
            <div
              style={{
                display: "flex",
                gap: "10px",
                width: "fit-content",
              }}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                id="fullName"
                required
                onChange={(e) => {
                  const newD = d1.filter((item) => {
                    return (
                      item.companyName
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase()) ||
                      item.personName
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    );
                  });
                  setD(newD);
                }}
              />
              <Link href="/products/add" className="btn btn-primary">
                Create New Products
              </Link>
            </div>
          </div>
        </div>
      </Col>
      {}
      <Row className="mt-2">
        <Col md={12} xs={12}>
          <Table responsive className="text-nowrap mb-0 printarea1">
            <thead className="table-light">
              <tr>
                <th>Sr.n0</th>
                <th>Category</th>
                <th>Tilte</th>
                <th>is Detailed Enable</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {d
                ?.sort((a, b) => {
                  if (a.category < b.category) {
                    return -1;
                  }
                  if (a.category > b.category) {
                    return 1;
                  }
                  return 0;
                })
                ?.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <td className="align-middle">{index + 1}</td>
                      <td className="align-middle">{item.category}</td>
                      <td className="align-middle">{item.cardTitle}</td>
                      <td className="align-middle">
                        <div className="avatar-group">{`${item.isDetailPage}`}</div>
                      </td>
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
                              router.push(`/products/${item._id}`);
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                              height={"20px"}
                              width={"20px"}
                              color="#637381"
                            />
                          </button>
                          {userType === "admin" ? (
                            <button
                              style={{
                                background: "transparent",
                                border: "none",
                                boxShadow: "none",
                              }}
                              onClick={async () => {
                                await deleteDocument("products", item._id);
                                (async () => {
                                  const docSnap = await getDocs(
                                    query(
                                      collection(db, "order"),
                                      where("clientId", "==", item._id)
                                    )
                                  );
                                  docSnap.forEach(async (element) => {
                                    await deleteDocument("order", element.id);
                                  });
                                })();
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
                          ) : (
                            <></>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default Settings;

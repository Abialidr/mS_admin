// import node module libraries
import { Col, Row, Form, Card, Button, Container } from "react-bootstrap";

import { useEffect, useState } from "react";
import { addDocument, getDocumentById, updateDocument } from "utils/firebase";
import { useRouter } from "next/router";
import OrderAddUpdateFields from "pages/components/orderAddUpdateFields";
import Head from "next/head";

const Settings = () => {
  const router = useRouter();
  const [cid, setId] = useState();
  const [clientDetails, setClientDetails] = useState();
  const [clientDetails1, setClientDetails1] = useState();
  useEffect(() => {
    (async () => {
      if (router.query.id) {
        const doc2 = await getDocumentById("order", router.query.id);
        console.log("🚀 ~ file: [id].jsx:18 ~ doc2:", doc2);
        // const doc = await getDocumentById("client", doc2?.clientId);
        setClientDetails(doc2.clientDetails);
        setClientDetails1(doc2);
        setFormData(doc2.orderDetails);
        setWaD(doc2.packageDetails);
        setId(doc2.clientId);
      }
    })();
  }, [router.query.id]);
  const [formData, setFormData] = useState({
    serviceType: "",
    forwardingNumber: "",
    serviceOption: "",
    parcelType: "",
    companyName: "",
    personName: "",
    companyWebsite: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
    email: "",
    phoneNo: "",
    phoneNo2: "",
    bookingDate: "",
    pcs: 1,
    actualWeight: 0,
    volumetricWeight: 0,
    chargebleWeight: 0,
    kg: 0,
    kgammount: 0,
    totalkg: 0,
    hkg: 0,
    hkgamount: 0,
    totalhkg: 0,
    totalAmount: 0,
  });

  console.log("🚀 ~ file: [id].jsx:74 ~ Settings ~ formData:", formData);
  const [WaD, setWaD] = useState([
    {
      actualWeight: 0,
      lcm: 0,
      bcm: 0,
      hcm: 0,
      volumetricWeight: 0,
      chargebleWeight: 0,
    },
  ]);
  const id = router.query.id;
  return (
    <>
      <Head>
        <title>
          Order Edit of {clientDetails1?.clientDetails?.companyName} |{" "}
          {clientDetails1?.orderDetails?.personName}
        </title>
        <description>
          Order Edit of {clientDetails1?.clientDetails?.companyName} |{" "}
          {clientDetails1?.orderDetails?.personName}
        </description>
      </Head>
      <Container fluid className="p-6">
        {/* Page Heading */}
        {/* <PageHeading heading="SHIPPER / From information" /> */}

        {/* General Settings */}
        <Row className="mb-8">
          <Col xl={12} lg={12} md={12} xs={12}>
            <Card>
              <OrderAddUpdateFields
                formData={formData}
                setFormData={setFormData}
                WaD={WaD}
                setWaD={setWaD}
              />
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={{ offset: 0, span: 8 }} xs={12} className="mt-4">
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={async (e) => {
                        e.preventDefault();
                        // const timestamp = new Date().getTime().toString();
                        // const base36String = timestamp.toString(36);
                        // const orderId = base36String
                        // .padEnd(10, "0")
                        // .slice(0, 10);

                        const res = await updateDocument(
                          "order",
                          router.query.id,
                          {
                            clientDetails,
                            orderDetails: formData,
                            packageDetails: WaD,
                          }
                        );
                        // if (res.id) {
                        router.push(`/order/${cid}`);
                        // } else {
                        // alert("something went wrong");
                        // }
                      }}
                    >
                      Update
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

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

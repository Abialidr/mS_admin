// import node module libraries
import { Col, Row, Form, Card, Button, Image } from "react-bootstrap";

// import widget as custom components
import { FormSelect, DropFiles } from "widgets";

const GeneralSetting = () => {
  const countryOptions = [
    { value: "Aaddhar number", label: "Aaddhar number" },
    { value: "Pan number", label: "Pan number" },
  ];

  return (
    <Row className="mb-8">
      <Col xl={12} lg={12} md={12} xs={12}>
        <Card>
          <Card.Body>
            <div>
              {/* border */}
              <div className="mb-6">
                <h4 className="mb-1">SHIPPER / From information</h4>
              </div>
              <Form>
                {/* row */}
                <Row className="mb-3">
                  <label
                    htmlFor="fullName"
                    className="col-sm-4 col-form-label
                    form-label"
                  >
                    Company
                  </label>
                  <div className="col-sm-8 mb-3 mb-lg-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Company"
                      id="fullName"
                      required
                    />
                  </div>
                </Row>
                <Row className="mb-3">
                  <label
                    htmlFor="fullName"
                    className="col-sm-4 col-form-label
                    form-label"
                  >
                    Person Name
                  </label>
                  <div className="col-sm-8 mb-3 mb-lg-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Person Name"
                      id="fullName"
                      required
                    />
                  </div>
                </Row>
                <Row className="mb-3">
                  <label
                    htmlFor="fullName"
                    className="col-sm-4 col-form-label
                    form-label"
                  >
                    Company Website
                  </label>
                  <div className="col-sm-8 mb-3 mb-lg-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Company Website"
                      id="fullName"
                      required
                    />
                  </div>
                </Row>
                <Row className="mb-3">
                  <Form.Label className="col-sm-4" htmlFor="addressLine">
                    Address line 1
                  </Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Enter Address line 1"
                      id="addressLine"
                      required
                    />
                  </Col>
                </Row>

                {/* Address Line Two */}
                <Row className="mb-3">
                  <Form.Label className="col-sm-4" htmlFor="addressLineTwo">
                    Address line 2
                  </Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Enter Address line 2"
                      id="addressLineTwo"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label className="col-sm-4" htmlFor="addressLineTwo">
                    Address line 3
                  </Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Enter Address line 3"
                      id="addressLineTwo"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label className="col-sm-4" htmlFor="addressLine">
                    POST / ZIP CODE
                  </Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Enter POST / ZIP CODE"
                      id="addressLine"
                      required
                    />
                  </Col>
                </Row>

                {/* Address Line Two */}
                <Row className="mb-3">
                  <Form.Label className="col-sm-4" htmlFor="addressLineTwo">
                    city
                  </Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Enter city"
                      id="addressLineTwo"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label className="col-sm-4" htmlFor="addressLineTwo">
                    STATE
                  </Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Enter STATE "
                      id="addressLineTwo"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label className="col-sm-4" htmlFor="addressLineTwo">
                    COUNTRY
                  </Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Enter COUNTRY"
                      id="addressLineTwo"
                      required
                    />
                  </Col>
                </Row>
                {/* row */}
                <Row className="mb-3">
                  <label
                    htmlFor="email"
                    className="col-sm-4 col-form-label
                    form-label"
                  >
                    Email
                  </label>
                  <div className="col-md-8 col-12">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      id="email"
                      required
                    />
                  </div>
                </Row>
                {/* row */}
                <Row className="mb-3">
                  <Form.Label className="col-sm-4" htmlFor="phone">
                    Phone No
                  </Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Enter Phone"
                      id="phone"
                      required
                    />
                  </Col>
                </Row>

                {/* Location */}
                <Row className="mb-3">
                  <Form.Label className="col-sm-4" htmlFor="country">
                    KYC type
                  </Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control
                      as={FormSelect}
                      placeholder="Select"
                      id="country"
                      options={countryOptions}
                    />
                  </Col>
                </Row>

                {/* Address Line One */}

                {/* Zip code */}
                <Row className="align-items-center">
                  <Form.Label className="col-sm-4" htmlFor="zipcode">
                    KYC Number
                    <i className="fe fe-info fs-4 me-2 text-muted icon-xs"></i>
                  </Form.Label>

                  <Col md={8} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Enter KYC Number"
                      id="zipcode"
                      required
                    />
                  </Col>

                  <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4">
                    <Button variant="primary" type="submit">
                      Add SHIPPER / From / Client
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralSetting;

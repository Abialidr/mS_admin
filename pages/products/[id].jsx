"use client";
import { Col, Row, Form, Card, Button, Container } from "react-bootstrap";
import { PageHeading } from "widgets";
const countryOptions = [
  { value: "Aaddhar number", label: "Aaddhar number" },
  { value: "Pan number", label: "Pan number" },
];
const GstOptions = [
  { value: "Cash", label: "Cash" },
  { value: "GST", label: "GST" },
];
import { useEffect, useState } from "react";
import { getDocumentById, handleUpload, updateDocument } from "utils/firebase";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false }); // Ensure to install 'react-quill' library
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { generateUniqueFilename } from "utils/helper";

const Settings = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    category: "",
    mainImage: "",
    cardShortDescription: "",
    cardTitle: "",
    isDetailPage: false,
    image: "",
    subImages: ["", "", "", ""],
    detailPageTitle: "",
    paraAfterMainImage: "",
    paraAfterSubImages: "",
    image: "",
  });
  const [l, setL] = useState(false);
  useEffect(() => {
    (async () => {
      const doc = await getDocumentById("products", router.query.id);
      setFormData(doc);
    })();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission
    setL(true);
    try {
      const {
        category,
        mainImage,
        cardShortDescription,
        cardTitle,
        isDetailPage,
        image,
        subImages,
        detailPageTitle,
        paraAfterMainImage,
        paraAfterSubImages,
      } = formData;

      // Mandatory fields validation
      if (!category) {
        alert("Category is required.");
        return;
      }
      if (!mainImage) {
        alert("Main Image is required.");
        return;
      }
      if (!cardShortDescription) {
        alert("Card Short Description is required.");
        return;
      }
      if (!cardTitle) {
        alert("Card Title is required.");
        return;
      }

      // Conditional validation based on `isDetailPage`
      if (isDetailPage) {
        if (!image) {
          alert("Image is required for Detail Page.");
          return;
        }
        if (!formData.subImages.some((img) => img)) {
          alert("At least one Sub Image is required for the Detail Page.");
          return;
        }
        if (!detailPageTitle) {
          alert("Detail Page Title is required for Detail Page.");
          return;
        }
        if (!paraAfterMainImage) {
          alert("Paragraph After Main Image is required for Detail Page.");
          return;
        }
        if (!paraAfterSubImages) {
          alert("Paragraph After Sub Images is required for Detail Page.");
          return;
        }
      }

      e.preventDefault();
      const f = {
        ...formData,
      };
      // Upload main image
      if (formData.mainImage) {
        f.mainImage =
          typeof formData.mainImage === "string"
            ? formData.mainImage
            : await handleUpload(
                formData.mainImage,
                generateUniqueFilename(formData.mainImage)
              );
      }

      // Upload additional images if isDetailPage is true
      if (formData.isDetailPage) {
        // Upload detail page main image
        if (formData.image) {
          f.image =
            typeof formData.image === "string"
              ? formData.image
              : await handleUpload(
                  formData.image,
                  generateUniqueFilename(formData.image)
                );
        }

        // Upload sub-images
        f.subImages = await Promise.all(
          formData.subImages.map((subImage) =>
            subImage
              ? typeof subImage === "string"
                ? subImage
                : handleUpload(subImage, generateUniqueFilename(subImage))
              : ""
          )
        );
      }

      const res = await updateDocument("products", router.query.id, f);
      console.log("🚀 ~ file: [id].jsx:143 ~ handleSubmit ~ res:", res);
      alert("Form submitted successfully!");
      router.push("/products");
    } catch (error) {
      console.error("Error uploading images:", error);
      throw error;
    } finally {
      setL(false);
    }
    // If all validations pass

    // Submit logic (e.g., API call or database save) goes here
  };
  return (
    <Container fluid className="p-6">
      <PageHeading heading="Products" ismb />
      <Row className="mb-8">
        <Col xl={12} lg={12} md={12} xs={12}>
          <Card>
            <Card.Body>
              <div>
                <Form>
                  {/* Card Title */}
                  <Row className="mb-3 align-items-center">
                    <label
                      htmlFor="isDetailPage"
                      className="col-sm-4 col-form-label form-label"
                    >
                      Is Detail Page
                    </label>
                    <div className="col-sm-8">
                      <Form.Check
                        type="switch"
                        id="isDetailPage"
                        label=""
                        checked={formData.isDetailPage}
                        onChange={(e) => {
                          setFormData((val) => ({
                            ...val,
                            isDetailPage: e.target.checked,
                          }));
                        }}
                      />
                    </div>
                  </Row>

                  {/* Select List */}
                  <Row className="mb-3">
                    <label
                      htmlFor="categorySelect"
                      className="col-sm-4 col-form-label form-label"
                    >
                      Select Category
                    </label>
                    <div className="col-sm-8">
                      <select
                        className="form-control"
                        id="categorySelect"
                        value={formData.category || ""}
                        onChange={(e) => {
                          setFormData((val) => ({
                            ...val,
                            category: e.target.value,
                          }));
                        }}
                      >
                        <option value="" disabled>
                          Select Category
                        </option>
                        <option value="Crane">Crane</option>
                        <option value="Services">Services</option>
                        <option value="SpareParts">Spare Parts</option>
                      </select>
                    </div>
                  </Row>
                  <div
                    style={{
                      paddingBottom: "20px",
                      marginBottom: "20px",
                      borderBottom: "1px zolid grey",
                    }}
                  >
                    <h3>Card Details</h3>

                    <Row className="mb-3">
                      <label
                        htmlFor="cardTitle"
                        className="col-sm-4 col-form-label form-label"
                      >
                        Card Title
                      </label>
                      <div className="col-sm-8 mb-3 mb-lg-0">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Card Title"
                          id="cardTitle"
                          value={formData.cardTitle}
                          onChange={(e) => {
                            setFormData((val) => ({
                              ...val,
                              cardTitle: e.target.value,
                            }));
                          }}
                        />
                      </div>
                    </Row>

                    {/* Card Short Description */}
                    <Row className="mb-3">
                      <label
                        htmlFor="cardShortDescription"
                        className="col-sm-4 col-form-label form-label"
                      >
                        Card Short Description
                      </label>
                      <div className="col-sm-8">
                        <textarea
                          className="form-control"
                          placeholder="Enter Short Description"
                          id="cardShortDescription"
                          value={formData.cardShortDescription}
                          onChange={(e) => {
                            setFormData((val) => ({
                              ...val,
                              cardShortDescription: e.target.value,
                            }));
                          }}
                        />
                      </div>
                    </Row>

                    {/* Main Image */}
                    <Row className="mb-3 align-items-center">
                      <label
                        htmlFor="mainImage"
                        className="col-sm-4 col-form-label form-label"
                      >
                        Card Main Image
                      </label>
                      <div className="col-sm-6">
                        <input
                          type="file"
                          className="form-control"
                          id="mainImage"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setFormData((val) => ({
                                ...val,
                                mainImage: file, // Store the actual file in state
                              }));
                            }
                          }}
                        />
                      </div>

                      <div className="col-sm-2">
                        {formData.mainImage && (
                          <img
                            src={
                              typeof formData.mainImage === "string"
                                ? formData.mainImage
                                : URL.createObjectURL(formData.mainImage)
                            } // Generate preview using object URL
                            alt="Main Preview"
                            style={{
                              marginTop: "10px",
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </div>
                    </Row>
                  </div>
                  {formData.isDetailPage ? (
                    <div
                      style={{
                        paddingBottom: "20px",
                        marginBottom: "20px",
                        borderBottom: "1px zolid grey",
                      }}
                    >
                      <h3>Details Page Info</h3>
                      <Row className="mb-3 align-items-center">
                        <label
                          htmlFor="mainImage"
                          className="col-sm-4 col-form-label form-label"
                        >
                          Main Image
                        </label>
                        <div className="col-sm-6">
                          <input
                            type="file"
                            className="form-control"
                            id="mainImage"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                setFormData((val) => ({
                                  ...val,
                                  image: file, // Store the actual file in state
                                }));
                              }
                            }}
                          />
                        </div>

                        <div className="col-sm-2">
                          {formData.image && (
                            <img
                              src={
                                typeof formData.image === "string"
                                  ? formData.image
                                  : URL.createObjectURL(formData.image)
                              }
                              // Generate preview using object URL
                              alt="Main Preview"
                              style={{
                                marginTop: "10px",
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                              }}
                            />
                          )}
                        </div>
                      </Row>
                      {/* Sub Images */}
                      {formData.subImages.map((image, index) => (
                        <Row key={index} className="mb-3 align-items-center">
                          <label
                            htmlFor={`subImage-${index}`}
                            className="col-sm-4 col-form-label form-label"
                          >
                            Sub Image {index + 1}
                          </label>
                          <div className="col-sm-6">
                            <input
                              type="file"
                              className="form-control"
                              id={`subImage-${index}`}
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  setFormData((val) => {
                                    const newSubImages = [...val.subImages];
                                    newSubImages[index] = file; // Store the actual file in state
                                    return {
                                      ...val,
                                      subImages: newSubImages,
                                    };
                                  });
                                }
                              }}
                            />
                          </div>
                          <div className="col-sm-2">
                            {image && (
                              <img
                                src={
                                  typeof image === "string"
                                    ? image
                                    : URL.createObjectURL(image)
                                }
                                alt={`Sub Preview ${index + 1}`}
                                style={{
                                  marginTop: "10px",
                                  width: "100px",
                                  height: "100px",
                                  objectFit: "cover",
                                }}
                              />
                            )}
                          </div>
                        </Row>
                      ))}

                      {/* Detail Page Title */}
                      <Row className="mb-3">
                        <label
                          htmlFor="detailPageTitle"
                          className="col-sm-4 col-form-label form-label"
                        >
                          Detail Page Title
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Detail Page Title"
                            id="detailPageTitle"
                            value={formData.detailPageTitle}
                            onChange={(e) => {
                              setFormData((val) => ({
                                ...val,
                                detailPageTitle: e.target.value,
                              }));
                            }}
                          />
                        </div>
                      </Row>

                      {/* Paragraph After Main Image */}
                      <Row className="mb-3">
                        <label
                          htmlFor="paraAfterMainImage"
                          className="col-sm-4 col-form-label form-label"
                        >
                          Paragraph After Main Image
                        </label>
                        <div className="col-sm-8">
                          <ReactQuill
                            value={formData.paraAfterMainImage}
                            onChange={(value) => {
                              setFormData((val) => ({
                                ...val,
                                paraAfterMainImage: value,
                              }));
                            }}
                          />
                        </div>
                      </Row>

                      {/* Paragraph After Sub Images */}
                      <Row className="mb-3">
                        <label
                          htmlFor="paraAfterSubImages"
                          className="col-sm-4 col-form-label form-label"
                        >
                          Paragraph After Sub Images
                        </label>
                        <div className="col-sm-8">
                          <ReactQuill
                            value={formData.paraAfterSubImages}
                            onChange={(value) => {
                              setFormData((val) => ({
                                ...val,
                                paraAfterSubImages: value,
                              }));
                            }}
                          />
                        </div>
                      </Row>

                      {/* Submit Button */}
                    </div>
                  ) : (
                    <></>
                  )}
                  <Row className="mb-3">
                    <Col sm={{ offset: 4, span: 8 }}>
                      <Button
                        variant="primary"
                        onClick={async (e) => {
                          handleSubmit(e);
                        }}
                        disabled={l}
                      >
                        {l ? "Loading..." : "Update"}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Settings;

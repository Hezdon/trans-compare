import React from "react";
import styled from "styled-components";

const UploadWrapper = styled.div`
  padding: 0 2em;

  & > * + * {
    margin-top: 2em;
  }

  .title {
    font-size: 1.2rem;
    font-weight: 500;
  }

  .green-bg {
    background-color: #3c3;
    color: #efe;
  }

  .content {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 20px;

    .upload-box {
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 15px;

      label {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;

        span {
          display: inline-block;
          width: 100%;
          min-width: 200px;
          flex: 1;
          height: 40px;
          border: 3px solid #eee;
          border-radius: 7px;
          padding: 0.6em 1em;
        }
      }
    }
  }
`;

export const UploadFilesComponent = ({
  errors,
  values,
  setFieldError,
  setFieldValue
}) => {
  const handleFile = (e, name) => {
    e.persist();
    const file = e.currentTarget.files[0];

    if (!file) setFieldError(name, "Upload a File");

    if (file.size > 300000) {
      setFieldError(name, "File size exceeds maximum size allowed");
      setTimeout(() => setFieldError(name, ""), 1500);
      return;
    }

    if (typeof file !== "undefined") {
      console.log({ file });
      setFieldValue(name, file);
    }
  };

  return (
    <UploadWrapper>
      <h2 className="title">Transaction files</h2>

      {errors?.paymentologyMarkOffFile ? (
        <div className="error-box">{errors.paymentologyMarkOffFile}</div>
      ) : null}
      {errors?.clientMarkOffFile ? (
        <div className="error-box">{errors.clientMarkOffFile}</div>
      ) : null}
      <div className="content">
        <div className="upload-box">
          <label htmlFor="paymentologyMarkOffFile">
            <span>
              {values.paymentologyMarkOffFile?.name ??
                "Select Paymentology Transaction File"}
            </span>

            <div className="btn btn-outline-success" type="button">
              Upload
            </div>
          </label>
          <label htmlFor="clientMarkOffFile">
            <span>
              {values.clientMarkOffFile?.name ||
                "Select Client Transaction File"}
            </span>
            <div className="btn btn-outline-success" type="button">
              Upload
            </div>
          </label>

          <input
            type="file"
            className="visually-hidden"
            accept=".csv"
            id="paymentologyMarkOffFile"
            name="paymentologyMarkOffFile"
            onChange={(e) => handleFile(e, "paymentologyMarkOffFile")}
          />
          <input
            type="file"
            className="visually-hidden"
            accept=".csv"
            id="clientMarkOffFile"
            name="clientMarkOffFile"
            onChange={(e) => handleFile(e, "clientMarkOffFile")}
          />
        </div>

        <button
          style={{ width: "13em" }}
          className="green-bg btn mt-auto "
          type="submit"
        >
          Reconcile Transaction
        </button>
      </div>
    </UploadWrapper>
  );
};

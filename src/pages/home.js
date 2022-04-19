import { useFormik } from "formik";
import React, { useState } from "react";
import { Form } from "reactstrap";
import { StyledHomeWrapper } from "../styles";
import axios from "../config";
import {
  ResultComparisonComponent,
  ResultsMatchingComponent,
  UploadFilesComponent
} from "./components";

export const HomePage = () => {
  // declare state
  const [pageState, setPageState] = useState({
    hasCompared: false,
    hasMatchedResult: false
  });

  const [comparationData, setComparationData] = useState();

  // declare form states with formik
  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {},
    onSubmit: (model, { setSubmitting }) => {
      // onSubmit, call API to compare the result
      // update hasCompared state
      const formData = new FormData();
      formData.append("paymentologyMarkOffFile", model.paymentologyMarkOffFile);
      formData.append("clientMarkOffFile", model.clientMarkOffFile);
      setSubmitting(true);
      axios({
        url: "transaction/reconciliation",
        method: "POST",
        data: formData
      })
        .then(({ data }) => {
          setComparationData(data);
          console.log({ data });
          setPageState((prev) => ({ ...prev, hasCompared: true }));
        })
        .catch((error) => console.log({ error }))
        .finaly(() => setSubmitting(false));
    }
  });

  return (
    <StyledHomeWrapper>
      <Form onSubmit={handleSubmit}>
        <UploadFilesComponent values={values} setFieldValue={setFieldValue} />

        {pageState.hasCompared && values && (
          <ResultComparisonComponent
            values={values}
            setPageState={setPageState}
            comparationData={comparationData}
          />
        )}

        {pageState.hasMatchedResult && (
          <ResultsMatchingComponent comparationData={comparationData} />
        )}
      </Form>
    </StyledHomeWrapper>
  );
};

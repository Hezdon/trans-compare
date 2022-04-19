import React, { useCallback } from "react";
import { Card, CardBody, CardHeader, List } from "reactstrap";
import styled from "styled-components";
import { ItemRow } from "../../utils/item-row";

const PageWrapper = styled.div`
  padding: 0 2em;

  .title {
    font-size: 1.2rem;
    font-weight: 500;
  }

  .green-bg {
    background-color: #3c3;
    color: #efe;
  }

  .content {
    width: 100%;
    padding: 1em 0em;

    .card-box {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 20px;

      & > div {
        flex: 1;
        min-width: 250px;
        max-width: 100%;
      }
    }
  }
`;

export const ResultComparisonComponent = ({
  values,
  setPageState,
  comparationData
}) => {
  console.log({ comparationData });

  const generateData = (data) => [
    {
      key: "totalTransactionNum",
      title: "Total Records",
      content: data.totalTransactionNum
    },
    {
      key: "matchedTransactionNum",
      content: data.matchedTransactionNum,
      title: "Matching Records"
    },
    {
      key: "unmatchedTransactionNum",
      title: "Unmatched Records",
      content: data.unmatchedTransactionNum
    }
  ];

  return (
    <PageWrapper>
      <h2 className="title">Reconciliation Summary</h2>

      <div className="content">
        <div className="card-box">
          <Card>
            <CardHeader className="bold large">
              {values.paymentologyMarkOffFile.name}
            </CardHeader>

            <CardBody>
              <List>
                {generateData(
                  comparationData.paymentologyReconciliationData
                ).map(({ key, title, content }) => (
                  <ItemRow key={key} title={title} content={content} />
                ))}
              </List>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="bold large">
              {values.clientMarkOffFile.name}
            </CardHeader>

            <CardBody>
              <List>
                {generateData(comparationData.clientReconciliationData).map(
                  ({ key, title, content }) => (
                    <ItemRow key={key} title={title} content={content} />
                  )
                )}
              </List>
            </CardBody>
          </Card>
        </div>

        <div className="centered mt-4">
          <button
            type="button"
            onClick={() =>
              setPageState((prev) => ({ ...prev, hasMatchedResult: true }))
            }
            className="btn green-bg"
          >
            Unmatched Report
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

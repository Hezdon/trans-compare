import React, { useMemo, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Nav,
  NavItem,
  NavLink,
  Row,
  Button,
  TabContent,
  Table,
  TabPane
} from "reactstrap";
import styled from "styled-components";

const PageWrapper = styled.div`
  padding: 0 2em;

  .light-blue-bg {
    background-color: #6cf;
    color: #fff;
  }
  .error-msg {
    color: #933;
    font-weight: bold;
  }

  tr:nth-child(odd) > td {
    background-color: #eef6ff;
  }
  tr:nth-child(even) > td {
    background-color: #f6fff6;
  }

  .success-msg {
    color: #393;
    font-weight: bold;
  }

  .content {
    width: 100%;
    padding: 1em 0em;

    .navitem {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      border-bottom: 1px solid rgb(85, 216, 189);
      padding: 0;

      .navlink {
        flex: 1;
        border-radius: 0;
        padding: 1em;
        font-weight: 400;
        min-width: 10em;
        text-align: center;
        cursor: context-menu;
        border-bottom: 2px solid transparent;

        &:hover {
          font-weight: 500;
        }

        &.active {
          border-width: 2px;
          border-top-left-radius: 7px;
          border-top-right-radius: 7px;
          border-color: rgb(85, 216, 189);
          font-weight: 700;

          &::after {
            width: 100%;
          }
        }
      }
    }
  }

  tr th {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const ResultsMatchingComponent = ({ comparationData }) => {
  console.log({ comparationData });
  const [activeTab, setActiveTab] = useState("tutuka");
  const [isViewing, setViewing] = useState(undefined);

  const generateTableBody = (data, withOptions = true) => {
    return (
      <tbody>
        {data.map(
          ({
            transactionID: id,
            suggestedMatchTransactions,
            transactionDate,
            transactionAmount,
            transactionDescription: desc,
            transactionNarrative: narrative
          }) => (
            <tr key={id}>
              <td>{new Date(transactionDate).toLocaleDateString()}</td>
              <td>{id}</td>
              <td>{transactionAmount.toLocaleString()}</td>
              <td
                className={`${desc === "DEDUCT" ? "error-msg" : "success-msg"}`}
              >
                {desc.toLowerCase()}
              </td>
              <td>{narrative}</td>
              {withOptions && (
                <td>
                  <button
                    onClick={() => setViewing(suggestedMatchTransactions)}
                    type="button"
                    className="btn btn-outline-info small light-blue-bg"
                  >
                    View
                  </button>
                </td>
              )}
            </tr>
          )
        )}
      </tbody>
    );
  };

  if (isViewing) {
    const toggle = () => setViewing(undefined);

    return (
      <Modal isOpen toggle={toggle}>
        <ModalHeader className="bold large" toggle={toggle}>
          Priority Level (%): {isViewing.priority}
        </ModalHeader>
        <ModalBody>
          <Table>
            <thead>
              <tr>
                <th>Transaction Date</th>
                <th>Transaction Id</th>
                <th>Transaction Amount</th>
                <th>Description</th>
                <th>Narrative</th>
              </tr>
            </thead>
            {generateTableBody([isViewing.suggestedMatch], false)}
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
          <Button color="secondary" onClick={toggle}>
            Match
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  return (
    <PageWrapper>
      <h2 className="large bold">Unmatched Transaction</h2>

      <div className="content">
        <Nav tabs className="navitem">
          <NavItem>
            <NavLink
              className={`navlink ${activeTab === "tutuka" ? "active" : ""}`}
              onClick={() => setActiveTab("tutuka")}
            >
              {" "}
              Paymentology Transactions
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={`navlink ${activeTab === "client" ? "active" : ""}`}
              onClick={() => setActiveTab("client")}
            >
              Client Transaction
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane tabId="tutuka">
            <Row>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Transaction Date</th>
                    <th>Transaction Id</th>
                    <th>Transaction Amount</th>
                    <th>Description</th>
                    <th>Narrative</th>
                    <th style={{ width: 150 }}>View</th>
                  </tr>
                </thead>
                {generateTableBody(
                  comparationData.paymentologyReconciliationData
                    .unmatchedTransactions
                )}
              </Table>
            </Row>
          </TabPane>
          <TabPane tabId="client">
            <Row>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Transaction Date</th>
                    <th>Transaction Id</th>
                    <th>Transaction Amount</th>
                    <th>Description</th>
                    <th>Narrative</th>
                  </tr>
                </thead>
                {generateTableBody(
                  comparationData.clientReconciliationData.unmatchedTransactions
                )}
              </Table>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    </PageWrapper>
  );
};

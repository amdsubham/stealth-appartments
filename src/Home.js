import React, { useState, useEffect } from "react";
import apartmentLogo from "./default_apartment_logo.jpeg";
import { getAuth, signOut } from "firebase/auth";

import {
  Card,
  Col,
  Row,
  Button,
  Spin,
  Tag,
  Tooltip,
  Popover,
  PageHeader,
  Descriptions,
} from "antd";
import {
  LogoutOutlined,
  RightCircleOutlined,
  HomeOutlined,
  TableOutlined,
  InfoCircleTwoTone,
} from "@ant-design/icons";
import "./App.css";
import _ from "lodash";
import {
  ALL_APPARTMENTS_FETCH_LINK,
  getJSONFromLink,
  openLinkInNewTab,
} from "./utils";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import { apartmentMockData } from "./MockAppData";
import { auth } from "./base";

const renderAppartments = (ApartmentsData) => {
  return ApartmentsData.map((item, index) => (
    <div class="row">
      <div class="column">
        <div class="card">
          <Col className="gutter-row" span={6}>
            <Card
              style={{ width: 300 }}
              title={
                <Tooltip
                  placement="topLeft"
                  title={_.startCase(_.lowerCase(item.title))}
                >
                  <Tag
                    style={{
                      height: "3rem",
                      padding: "0.7rem",
                      fontSize: "0.8rem",
                      textAlign: "center",
                      textOverflow: "ellipsis",
                      whitespace: "nowrap",
                      overflow: "hidden",
                    }}
                    icon={<HomeOutlined />}
                    color="#108ee9"
                  >
                    {_.startCase(_.lowerCase(item.title))}
                  </Tag>
                </Tooltip>
              }
              bordered={false}
              cover={
                <img
                  alt="example"
                  style={{ width: 300, height: 300 }}
                  src={apartmentLogo}
                />
              }
            >
              <p>Address: {item.address}</p>
              <p>Status: Yet to Update</p>
              <p>Rank: {item.rank}</p>
              <p>
                Phone:{" "}
                {_.isEmpty(item.phone) ? "Not Available" : _.get(item, "phone")}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  class="flexEnd"
                  onClick={() => openLinkInNewTab(item.url)}
                  type="link"
                  icon={<RightCircleOutlined />}
                  size="small"
                >
                  View in Map
                </Button>
                <Popover
                  content={
                    <JSONInput
                      id={index}
                      placeholder={item}
                      locale={locale}
                      height="550px"
                    />
                  }
                >
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<InfoCircleTwoTone />}
                  />
                </Popover>
              </div>
            </Card>
          </Col>
        </div>
      </div>
    </div>
  ));
};

const Home = ({ history }) => {
  const auth = getAuth();

  const [ApartmentsData, setApartmentsData] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  useEffect(() => {
    //setPageLoading(true);
    // getJSONFromLink(ALL_APPARTMENTS_FETCH_LINK, function (err, data) {
    //   if (err !== null) {
    //     alert("Something went wrong: " + err);
    //     setPageLoading(false);
    //   } else {
    //     let apartmentData = _.filter(
    //       data,
    //       (item) =>
    //         _.includes(_.join(_.get(item, "categories"), " "), "Apartment") &&
    //         item.countryCode === "IN" &&
    //         item.state === "Odisha"
    //     );
    //     if (_.isEmpty(apartmentData)) {
    //       apartmentData = apartmentMockData;
    //     }
    //     setApartmentsData(apartmentData);
    //     setPageLoading(false);
    //   }
    // });
    setApartmentsData(apartmentMockData);
  }, []);

  return (
    <>
      {pageLoading ? (
        <div class="center_spin">
          <Spin size="large" />
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between	" }}>
            <PageHeader
              className="site-page-header"
              onBack={() => window.history.back()}
              title="Apartment Details"
              subTitle="This Page has only access to PrimePrenures"
              extra={[
                <Button
                  key="2"
                  onClick={() => history.push("/apartmentInTable")}
                  type="ghost"
                  shape="round"
                  icon={<TableOutlined />}
                  size="large"
                >
                  View in Table
                </Button>,
                <Button
                  key="1"
                  onClick={() => {
                    signOut(auth)
                      .then(() => {
                        history.push("/login");
                      })
                      .catch((error) => {
                        console.log("An error happened", error);
                      });
                  }}
                  type="ghost"
                  shape="round"
                  icon={<LogoutOutlined />}
                  size="large"
                >
                  Sign out
                </Button>,
              ]}
            >
              <Descriptions size="small" column={3}>
                <Descriptions.Item label="Role">
                  <Tag color="#f50">Admin</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="User ID">421421</Descriptions.Item>
                <Descriptions.Item label="Last Apartment API Updated">
                  {new Date().toLocaleString()}
                </Descriptions.Item>
                <Descriptions.Item label="Last Firebase API Updated">
                  {new Date().toLocaleString()}
                </Descriptions.Item>
                <Descriptions.Item label="Last User Updated">
                  Subham Routray
                </Descriptions.Item>
              </Descriptions>
            </PageHeader>
          </div>
          <div className="site-card-wrapper">
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {renderAppartments(ApartmentsData)}
            </Row>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
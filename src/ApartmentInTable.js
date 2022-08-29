import React, { Component } from "react";
import { apartmentMockData } from "./MockAppData";
import {
  ALL_APPARTMENTS_FETCH_LINK,
  getIntoTextValuePair,
  getJSONFromLink,
  getWindowDimensions,
} from "./utils";
import { Table, Skeleton, PageHeader } from "antd";
import "./App.css";
import _ from "lodash";

const columns = ({ allCities, allPostal, allStates }) => {
  return [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.length - b.title.length,
      ellipsis: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      filters: allCities,
      onFilter: (value, record) => record.city === value,
      sorter: (a, b) =>
        _.get(a, "city", "").length - _.get(b, "city", "").length,
      sortDirections: ["descend"],
      ellipsis: true,
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      filters: allStates,
      onFilter: (value, record) => record.state === value,
      sorter: (a, b) =>
        _.get(a, "state", "").length - _.get(b, "state", "").length,
      sortDirections: ["descend"],
      ellipsis: true,
    },
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      sorter: (a, b) => a.rank - b.rank,
      ellipsis: true,
    },
    {
      title: "Postal Code",
      dataIndex: "postalCode",
      key: "postalCode",
      filters: allPostal,
      onFilter: (value, record) => record.postalCode === value,
      ellipsis: true,
    },
  ];
};

export default class ApartmentInTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apartmentData: apartmentMockData,
      allCities: [],
      allStates: [],
      allPostal: [],
    };
  }

  componentDidMount() {
    this.setState({ apartmentDataLoading: true });
    getJSONFromLink(ALL_APPARTMENTS_FETCH_LINK, (err, data) => {
      if (err !== null) {
        alert("Something went wrong: " + err);
        this.setState({ apartmentDataLoading: false });
      } else {
        const apartmentData = _.filter(data, (item) =>
          _.includes(_.join(_.get(item, "categories"), " "), "Apartment")
        );
        this.setState({ apartmentData }, () => {
          const { apartmentData } = this.state;
          const allCities = getIntoTextValuePair(
            _.uniq(_.map(apartmentData, (item) => item.city))
          );
          const allStates = getIntoTextValuePair(
            _.uniq(_.map(apartmentData, (item) => item.state))
          );
          const allPostal = getIntoTextValuePair(
            _.uniq(_.map(apartmentData, (item) => item.postalCode))
          );
          this.setState({
            allCities,
            allStates,
            allPostal,
            apartmentDataLoading: false,
          });
        });
      }
    });
  }
  render() {
    const {
      apartmentData,
      allCities,
      allPostal,
      allStates,
      apartmentDataLoading,
    } = this.state;
    const windowResolution = getWindowDimensions();
    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => window.history.back()}
          title="Apartment Details"
          subTitle="This Page has only access to PrimePrenures"
        />
        {apartmentDataLoading ? (
          <div class="center_spin">
            <Skeleton avatar paragraph={{ rows: 10 }} />{" "}
          </div>
        ) : (
          <Table
            columns={columns({ allCities, allPostal, allStates })}
            dataSource={apartmentData}
            onChange={this.handleChange}
            scroll={{
              x: windowResolution.height,
              y: windowResolution.width - 830,
            }}
          />
        )}
      </div>
    );
  }
}
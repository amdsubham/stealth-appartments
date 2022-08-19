import React, { Component } from "react";
import { Card } from "antd";
import pcGif from "./pc_gif.gif";
import { PageHeader } from "antd";
const gridStyle = {
  width: "50%",
  textAlign: "center",
};
export default class Menu extends Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <PageHeader
          onBack={() => null}
          title="Prime Caves Menu"
          subTitle="This is an Admin Portal"
          avatar={{
            src: "https://i.pinimg.com/originals/ce/53/d6/ce53d63a19d8d02448b2156b3b3d05c7.gif",
          }}
        />
        <Card>
          <Card.Grid
            style={gridStyle}
            onClick={() => history.push("/apartmentGallary")}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            Apartment Gallary
          </Card.Grid>
          <Card.Grid
            style={gridStyle}
            onClick={() => history.push("/apartmentInTable")}
          >
            Apartment List
          </Card.Grid>
          <Card.Grid
            style={gridStyle}
            onClick={() => history.push("/manageEvents")}
          >
            Manage Events
          </Card.Grid>
          <Card.Grid style={gridStyle} onClick={() => history.push("/signup")}>
            SignUp
          </Card.Grid>
        </Card>
      </>
    );
  }
}

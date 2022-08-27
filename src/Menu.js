import React, { Component } from "react";
import { Card, Button } from "antd";
import pcGif from "./pc_gif.gif";
import { PageHeader } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { getAuth, signOut } from "firebase/auth";

const gridStyle = {
  width: "50%",
  textAlign: "center",
  backgroundColor: "#F5F5F5 ",
  fontSize: "large",
};
export default class Menu extends Component {
  render() {
    const auth = getAuth();
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
          extra={[
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

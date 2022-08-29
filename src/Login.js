import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { AuthContext } from "./Auth.js";
import "antd/dist/antd.css";
import "./index.css";
import "./App.css";
import { Form, Input, Button, Checkbox, Card, Tag } from "antd";
import { HomeOutlined } from "@ant-design/icons";

const Login = ({ history }) => {
  const auth = getAuth();
  const handleLogin = useCallback(
    async (event) => {
      const { email, password } = event;
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          history.push("/menu");
        })
        .catch((error) => {
          console.log("error:--", error);
        });
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const renderForm = () => (
    <Form
      name="basic"
      labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={handleLogin}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Log In
        </Button>
      </Form.Item>
    </Form>
  );
  return (
    <div>
      <Card>

          <div class="center_spin" >
            <Tag
              style={{
                height: "3rem",
                padding: "0.7rem",
                fontSize: "0.8rem",
                textAlign: "center",
              }}
              icon={<HomeOutlined />}
              color="#108ee9"
            >
              Stealth Apartment Project
              <Tag style={{ marginLeft: "1rem" }} color="error">
                If you are not PrimePrenures. Please Don't Login
              </Tag>
            </Tag>
          </div>
        {renderForm()}
      </Card>
    </div>
  );
};

export default withRouter(Login);

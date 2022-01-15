import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./base.js";
import { AuthContext } from "./Auth.js";
import 'antd/dist/antd.css';
import './index.css';
import './App.css';
import { Form, Input, Button, Checkbox,Card ,Tag} from 'antd';
import { HomeOutlined, } from '@ant-design/icons';
import { bounce } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

const styles = {
  bounce: {
    animation: 'x 1s',
    animationName: Radium.keyframes(bounce, 'bounce')
  }
}

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      const { email, password } = event;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email, password);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const renderForm =()=>(
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
            message: 'Please input your username!',
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
            message: 'Please input your password!',
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
  )
  return (
    <div>
      <Card>
          <StyleRoot>
      <div class="center_spin" style={styles.bounce}>
      <Tag style={{
                  'height': '3rem',
                  'padding': '0.7rem',
                  'fontSize': '0.8rem',
                  'textAlign': 'center'
                }} icon={<HomeOutlined />} color="#108ee9">
                        Stealth Apartment Project   
      
      <Tag style={{marginLeft:'1rem'}}color="error">If you are not Kaushik || Subham || Binod. Please Don't Login</Tag>
                </Tag>

      </div>
    </StyleRoot>
      
     
      {renderForm()}
      </Card>
    </div>
  );
};

export default withRouter(Login);

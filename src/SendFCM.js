import {
  Button,
  Form,
  Input,
  Typography,
  Switch,
  DatePicker,
  TimePicker,
  List,
  Avatar,
  Popover,
  notification,
  PageHeader,
} from "antd";
import axios from "axios";
import getDistance from "geolib/es/getDistance";
import { JSONTree } from "react-json-tree";
// import ReactJson from "react-json-view";
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  addDoc,
} from "firebase/firestore";
import app from "./base";
const { TextArea } = Input;

const db = getFirestore(app);
const { Title } = Typography;

const openNotification = (title, message) => {
  notification.open({
    message: title,
    description: message,
  });
};

const SendFCM = ({ history }) => {
  useEffect(() => {
    fetchEventsServices();
  }, []);
  const [formValues, setFormValues] = useState({});

  const [messageValues, setMessageValues] = useState({});

  const [allUsers, setUsers] = useState([]);
  const onFinish = async (values) => {
    await addDoc(collection(db, "events"), {
      ...values,
      startDate: values.startDate.toDate(),
      endDate: values.endDate.toDate(),
      time: values.time.toDate(),
      pushNotification: values.pushNotification ? true : false,
    }).then((response) => {
      if (response) {
        openNotification("Success", "Event Added Successfully !!");
      } else {
        openNotification("Failed", "Failed to Add Event");
      }
    });

    if (formValues.pushNotification) {
      const body = {
        to: "cAKRmFkpQF2L96aPLxCBtk:APA91bFPd9qQ41K9D0ZtjCqSnBUNIiQqOW5tdSFljUST1sAiF3oOAbDHRcjSCx21NGM_zGEsI0ZjZIwn8_0PAK4xn2M2gDGJKOD43SScnoeEs5-EYhHiHRPLCUaVYug9sUxfnfMHHRgR",
        collapse_key: "type_a",
        data: {
          key_1: messageValues.messageTitle,
          key_2: messageValues.messageBody,
        },
      };
      const configHeaders = {
        "content-type": "application/json",
        authorization:
          "key=AAAAmmOrrB4:APA91bFbe4iSZx6argwHWG_jGzYB_KedOz9KN3Fh7WKEgVt1L8Rpc6oN7vPBTpuwaR971sVtg-aYYPxNyoVZP5Tv0kZR4uZfaNit3ew9k-0ypEbZq5ad7hwjIlGhn8iS26oV2aWYyNGP",
        Accept: "application/json",
      };
      axios({
        url: "https://fcm.googleapis.com/fcm/send",
        method: "post",
        data: body,
        headers: configHeaders,
      });
      openNotification("Success", "Message Sent Successfully");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    openNotification("Failed", "Failed to Add Event");
  };

  const fetchEventsServices = async () => {
    try {
      const list = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
      setUsers(list);
    } catch (e) {
      console.log(e);
    }
  };

  const renderPushNotificationForm = () => {
    return (
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        onValuesChange={(values) =>
          setMessageValues({ ...messageValues, ...values })
        }
        autoComplete="off"
      >
        <Form.Item label="Message Title" name="messageTitle">
          <Input />
        </Form.Item>

        <Form.Item label="Message Body" name="messageBody">
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        ></Form.Item>
      </Form>
    );
  };
  const showPushNotificationForm = () => {
    return (
      <>
        <Title>Push Notification</Title>
        {renderPushNotificationForm()}
        {/* <h1>
          {getDistance(
            { latitude: 28.6517178, longitude: 77.2219388 },
            { latitude: 20.2602964, longitude: 85.8394521 }
          )}
        </h1> */}
        <div
          style={{ maxHeight: "50rem", maxWidth: "50rem", overflow: "scroll" }}
        >
          {allUsers.length > 0 && (
            <List
              itemLayout="horizontal"
              dataSource={allUsers}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.userImg} />}
                    title={
                      <a href="https://ant.design">{`${item.fname} ${item.lname}`}</a>
                    }
                    description={item.email}
                  />
                  {/* <ReactJson src={item} /> */}
                  <Popover
                    content={
                      <div
                        style={{
                          width: "20rem",
                          height: "20rem",
                          overflow: "scroll",
                        }}
                      >
                        <JSONTree data={JSON.stringify(item)} />;
                      </div>
                    }
                    placement="left"
                    title={`${item.fname} ${item.lname}`}
                  >
                    <Button type="primary">Show Details</Button>
                  </Popover>
                </List.Item>
              )}
            />
          )}
        </div>
      </>
    );
  };
  return (
    <>
      <PageHeader
        onBack={() => history.push("/menu")}
        title="Manage Events"
        subTitle="Manage Events and send FCM"
      />
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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        onValuesChange={(values) => setFormValues(values)}
      >
        <Form.Item
          label="Event Name"
          name="eventName"
          rules={[
            {
              required: true,
              message: "Please input your event name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Event Address"
          name="eventAddress"
          rules={[
            {
              required: true,
              message: "Please input your event address!",
            },
          ]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          label="Latitude"
          name="latitude"
          rules={[
            {
              required: true,
              message: "Please input your latitude!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Longitude"
          name="longitude"
          rules={[
            {
              required: true,
              message: "Please input your longitude!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Start Date"
          name="startDate"
          rules={[
            {
              required: true,
              message: "Please input your start date!",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="End Date"
          name="endDate"
          rules={[
            {
              required: true,
              message: "Please input your end date!",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Time"
          name="time"
          rules={[
            {
              required: true,
              message: "Please input your time!",
            },
          ]}
        >
          <TimePicker use12Hours />
        </Form.Item>
        <Form.Item label="Send Push Notification" name="pushNotification">
          <Switch />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          {formValues.pushNotification && showPushNotificationForm()}
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SendFCM;

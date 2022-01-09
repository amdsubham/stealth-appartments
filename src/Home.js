import React from "react";
import app from "./base";
import { Card, Col, Row } from 'antd';
import './App.css';
import {appData} from './mockdata'

const renderAppartments = ()=> {
  return appData.map(item=>(
    <Col span={8}>
    <Card style={{ width: 300 }} title={item.apartment_name} bordered={false}
        cover={<img alt="example"  style={{ width: 300, height:300 }} src={item.image_url} />}
    >
      <p>{item.address}</p>
      <p>Status: Yet to Update</p>
      <p>Tier: {item.tier}</p>
    </Card>
  </Col>
  ))
}


const Home = () => {
  return (
    <>
    <div style={{display:'flex', justifyContent:'space-between	'}}> 
    <h1>Appartments Details</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </div>
      <div className="site-card-wrapper">
    <Row gutter={16}>
{renderAppartments()}
    </Row>
  </div>
    </>
  );
};

export default Home;

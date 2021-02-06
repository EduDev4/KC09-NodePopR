import React from 'react';

import Layout from '../layout';
import { Photo, Textarea } from '../shared';

import { createAdvert } from '../../api/adverts';

import './NewAdvertPage.css';
import { Redirect } from 'react-router-dom';

import { Slider, Switch, Button, Row, Col, InputNumber, Input } from 'antd';
import 'antd/dist/antd.css';

class NewAdvertPage extends React.Component {
  state = {
    advert: { name: '', price: 0, sale: true, photo: '', tags: null },
    error: null,
    createdAdvertId: null,
  };

  handleNameChange = ({ target: { value } }) => {
    this.setState({ advert: { ...this.state.advert, name: value } });
  };

  handlePriceChange = ({ target: { value } }) => {
    this.setState({ advert: { ...this.state.advert, price: value } });
  };

  handleSaleChange = checked => {
    console.log(checked);
    this.setState({ advert: { ...this.state.advert, sale: checked } });
  };

  handleSubmit = async ev => {
    const { advert } = this.state;
    console.log(advert);
    ev.preventDefault();
    try {
      const createdAdvert = await createAdvert(advert);
      console.log(createdAdvert);
      this.setState({ createdAdvertId: createdAdvert.result._id });
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    const {
      advert: { name, price, sale, photo, tags },
      createdAdvertId,
    } = this.state;

    if (createdAdvertId) {
      return <Redirect to={`/advert/${createdAdvertId}`} />;
    }

    return (
      <Layout title="Selling something?">
        <div className="form-wrapper" style={{ borderBottomWidth: 10 }}>
          <div className="form-container">
            <form onSubmit={this.handleSubmit}>
              <Row className="formRow">
                <Col span={12}>
                  Name:{' '}
                  <Input
                    type="text"
                    name="name"
                    value={name ? name : ''}
                    onChange={this.handleNameChange}
                    placeholder="i.e.: Bici"
                  />
                </Col>
              </Row>
              <Row className="formRow">
                <Col span={12}>
                  Price:{' '}
                  <Input
                    type="text"
                    name="price"
                    value={price ? price : ''}
                    onChange={this.handlePriceChange}
                  />
                </Col>
              </Row>
              <Row className="formRow">
                <Col span={5}>
                  <b>On Sale: </b>
                </Col>
                <Col span={5}>
                  <Switch
                    name="sale"
                    size="small"
                    checked={sale}
                    onChange={this.handleSaleChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Button
                    className="submit"
                    type="primary"
                    onClick={this.handleSubmit}
                  >
                    Create Advert
                  </Button>
                </Col>
              </Row>
            </form>
          </div>
        </div>
      </Layout>
    );
  }
}

export default NewAdvertPage;

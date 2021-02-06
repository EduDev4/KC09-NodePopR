import React from 'react';
import T from 'prop-types';
import './NewAdvertPage.css';

import { InputNumber, Switch, Button, Row, Col, Input } from 'antd';
import 'antd/dist/antd.css';
import TagSelect from './TagSelect';
import { InputImage } from '../../shared';

class NewAdvertForm extends React.Component {
  state = {
    name: '',
    price: 0,
    sale: true,
    photo: null,
    tags: [],
  };

  getFormData = () => {
    const { name, price, tags, sale, photo } = this.state;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('sale', sale);
    formData.append('price', price);
    tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });
    if (photo) formData.append('photo', photo);
    return formData;
  };

  handleNameChange = ev => this.setState({ name: ev.target.value });
  handlePriceChange = price => this.setState({ price });
  handleTagsChange = tags => this.setState({ tags });
  handlePhotoChange = photo => this.setState({ photo });
  handleSaleChange = ev => this.setState({ sale: ev.target.checked });

  handleSubmit = ev => {
    const { onSubmit } = this.props;
    ev.preventDefault();
    onSubmit(this.getFormData());
  };

  render() {
    const { name, price, sale, tags } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <Row className="formRow">
          <Col span={20}>
            <InputImage type="file" onChange={this.handlePhotoChange} />
          </Col>
          <Col span={20}>
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
          <Col span={40}>
            Price:{' '}
            <InputNumber
              min="0"
              max="1000000"
              onChange={this.handlePriceChange}
              value={price}
            />
          </Col>
        </Row>
        <Row className="formRow">
          <Col span={24}>
            <TagSelect onChange={this.handleTagsChange} value={tags} />
          </Col>
        </Row>
        <Row className="formRow">
          <Col span={20}>
            <b>On Sale: </b>
          </Col>
          <Col span={20}>
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
            <Button className="submit" htmlType="submit" type="primary">
              Create Advert
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}
NewAdvertForm.propTypes = {
  onSubmit: T.func.isRequired,
};

export default NewAdvertForm;

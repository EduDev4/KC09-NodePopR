import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getAdverts, getAdvertsWithFilters } from '../../../api/adverts';
import Layout from '../../layout';
import Advert from './Advert';

import storage from '../../../utils/storage';

import { Slider, Switch, Button, Row, Col, InputNumber, Input } from 'antd';
import 'antd/dist/antd.css';
import './FilterBar.css';

function AdvertsPage() {
  const previous_filters = storage.get('filters');
  const [adverts, setAdverts] = useState(null);
  const history = useHistory();

  const [submitting, setSubmitting] = useState(false);
  const [disabled, setDisabled] = useState(
    previous_filters && previous_filters.sale ? previous_filters.sale : false,
  );
  const [name, setName] = useState(
    previous_filters && previous_filters.name ? previous_filters.name : null,
  );
  const [minPriceInputValue, setMinPriceInputValue] = useState(
    previous_filters && previous_filters.price
      ? previous_filters.price.split('-')[0]
      : 0,
  );
  const [maxPriceInputValue, setMaxPriceInputValue] = useState(
    previous_filters && previous_filters.price
      ? previous_filters.price.split('-')[1]
      : 30000,
  );
  const [error, setError] = useState(null);

  const onNameChange = value => {
    setName(value.target.value);
  };

  const onMinPriceSliderChange = value => {
    setMinPriceInputValue(value);
  };

  const onMaxPriceSliderChange = value => {
    setMaxPriceInputValue(value);
  };

  const handleDisabledChange = disabled => {
    setDisabled(disabled);
  };

  const handleSubmit = async event => {
    const filters = {
      name: name ? name : null,
      price:
        minPriceInputValue > maxPriceInputValue
          ? `${minPriceInputValue}-${minPriceInputValue}`
          : `${minPriceInputValue}-${maxPriceInputValue}`,
      sale: disabled,
    };

    storage.set('filters', filters);

    const fetchAdverts = async () => {
      const adverts = await getAdvertsWithFilters(filters);
      setAdverts(adverts.result.rows);
    };
    fetchAdverts();

    event.preventDefault();
    setSubmitting(true);
  };

  useEffect(() => {
    //getAdverts().then(setAdverts);
    const fetchAdverts = async () => {
      const adverts = await getAdverts();
      setAdverts(adverts.result.rows);
    };
    fetchAdverts();
    return () => {
      // cancel request
      console.log('cancel request');
    };
  }, []);

  const renderContent = () => {
    if (!adverts) {
      return null;
    }
    if (!adverts.length) {
      return (
        <div>
          <br />
          <br />
          <img
            alt="X"
            height="50"
            height="50"
            src="https://img.icons8.com/ios/50/000000/filter--v2.gif"
          />
          <br />
          <span>No adverts :(</span>
          <br />
          <span>Refine your search</span>
        </div>
      );
    }
    return adverts.map(advert => (
      <Advert key={advert._id} {...advert} history={history} />
    ));
  };

  return (
    <Layout title="¿Qué estás buscando hoy?">
      <div className="filer-container">
        <div className="filer-container-wrapper">
          <form onSubmit={handleSubmit}>
            <Row className="filterRow">
              <Col span={20}>
                <b>Name: </b>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <Input
                  type="text"
                  name="name"
                  value={name ? name : ''}
                  onChange={onNameChange}
                  placeholder="i.e.: Bici"
                />
              </Col>
            </Row>
            <Row className="filterRow">
              <Col span={16}>
                <b>Min. Price: </b>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <Slider
                  min={0}
                  max={30000}
                  onChange={onMinPriceSliderChange}
                  value={minPriceInputValue}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={0}
                  max={30000}
                  style={{ margin: '0 16px' }}
                  value={minPriceInputValue}
                  onChange={onMinPriceSliderChange}
                />
              </Col>
            </Row>
            <Row className="filterRow">
              <Col span={16}>
                <b>Max. Price: </b>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <Slider
                  min={0}
                  max={30000}
                  onChange={onMaxPriceSliderChange}
                  value={maxPriceInputValue}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={0}
                  max={30000}
                  style={{ margin: '0 16px' }}
                  value={maxPriceInputValue}
                  onChange={onMaxPriceSliderChange}
                />
              </Col>
            </Row>
            <Row className="filterRow">
              <Col span={5}>
                <b>On Sale: </b>
              </Col>
              <Col span={5}>
                <Switch
                  size="small"
                  checked={disabled}
                  onChange={handleDisabledChange}
                />
              </Col>
            </Row>
            <Row>
              <Col span={16}></Col>
              <Col span={4}>
                <Button
                  className="submit"
                  type="primary"
                  onClick={handleSubmit}
                >
                  Search
                </Button>
              </Col>
            </Row>
          </form>
          {error && <div className="filter-error">{error.message}</div>}
        </div>
      </div>

      <div className="advertsPage">{renderContent()}</div>
    </Layout>
  );
}

export default AdvertsPage;

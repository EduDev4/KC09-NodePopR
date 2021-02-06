import React from 'react';
import T from 'prop-types';
import Layout from '../../layout';

import { createAdvert } from '../../../api/adverts';
import NewAdvertForm from './NewAdvertForm';
import './NewAdvertPage.css';

import { Alert } from 'antd';
import 'antd/dist/antd.css';

class NewAdvertPage extends React.Component {
  state = {
    error: null,
  };

  handleSubmit = advert => {
    const { history } = this.props;
    this.resetError();
    createAdvert(advert)
      .then(({ result }) => history.push(`/advert/${result._id}`))
      .catch(error => this.setState({ error }));
  };

  resetError = () => this.setState({ error: null });

  render() {
    const { error } = this.state;

    return (
      <Layout title="Selling something?">
        <div className="form-wrapper" style={{ borderBottomWidth: 10 }}>
          <div className="form-container">
            <NewAdvertForm onSubmit={this.handleSubmit} />
            {error && (
              <Alert
                afterClose={this.resetError}
                closable
                message={error}
                showIcon
                type="error"
              />
            )}
          </div>
        </div>
      </Layout>
    );
  }
}

NewAdvertPage.propTypes = {
  history: T.shape({ push: T.func.isRequired }).isRequired,
};

export default NewAdvertPage;

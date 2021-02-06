import React from 'react';
import { Redirect } from 'react-router-dom';
import Photo from '../shared/Photo';
import Layout from '../layout';

import Button from '../shared/Button';

import { getAdvertDetail, deleteAdvert } from '../../api/adverts';
/* import Layout from '../layout'; */

class AdvertPage extends React.Component {
  state = {
    advert: null,
    error: null,
  };

  getAdvertDetail = () => {
    const { advertId } = this.props.match.params;
    getAdvertDetail(advertId)
      .then(advert => this.setState({ advert }))
      .catch(error => this.setState({ error }));
  };

  handleDelete = () => {
    const { advertId } = this.props.match.params;
    deleteAdvert(advertId)
      .then(() => {
        this.setState({ advert: 'deleted' });
      })
      .catch(error => this.setState({ error }));
  };

  componentDidMount() {
    this.getAdvertDetail();
  }

  renderContent = () => {
    const { advert, error } = this.state;

    if (error) {
      return <Redirect to="/404" />;
    }
    if (advert && advert === 'deleted') {
      return <Redirect to="/adverts" />;
    }
    if (!advert || !advert.result) {
      return null;
    }
    return (
      <article>
        <div className="left">
          {
            <Photo
              src={advert && advert.result ? advert.result.photo : ''}
              className="advert-photo"
            />
          }
        </div>
        <div className="right">
          <div className="tweet-header">
            <span className="advert-name">Name: {advert.result.name}</span>
            <span className="tweet-username">{advert.result.price}</span>
          </div>
          <div>
            {advert.result.tags}
            <div className="advert-actions">
              <Button type="secondary" onClick={this.handleDelete}>
                Delete Advert
              </Button>
            </div>
          </div>
        </div>
      </article>
    );
  };

  render() {
    return (
      <Layout title="Advert Detail">
        <div className="AdvertPage">{this.renderContent()}</div>
      </Layout>
    );
  }
}

export default AdvertPage;

import React from 'react';
import { Redirect } from 'react-router-dom';
import Photo from '../../shared/Photo';
import Layout from '../../layout';
import { ConfirmationButton } from '../../shared';
import { DeleteOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import placeholder from '../../../assets/animatedBox.gif';

import { getAdvertDetail, deleteAdvert } from '../../../api/adverts';
/* import Layout from '../layout'; */

class AdvertPage extends React.Component {
  state = {
    advert: null,
    error: null,
  };

  getAdvertDetail = async () => {
    try {
      const { advertId } = this.props.match.params;
      const { result } = await getAdvertDetail(advertId);
      console.log(result);
      if (!result) {
        const error = { message: 'Advert not found' };
        throw error;
      }
      this.setState({ advert: result });
    } catch (error) {
      this.setState({ error });
    }
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
    if (!advert) {
      return null;
    }
    console.log(advert);
    console.log(placeholder);
    return (
      <article>
        <div className="left">
          {
            <Image
              src={advert.photo ? advert.photo : 'error'}
              alt={advert.name}
              width={75}
              height={75}
              fallback={placeholder}
            />
          }
        </div>
        <div className="right">
          <div className="tweet-header">
            <span className="advert-name">Name: {advert.name}</span>
            <span className="tweet-username">{advert.price}</span>
          </div>
          <div>
            {advert.tags}
            <div className="advert-actions">
              <ConfirmationButton
                danger
                icon={<DeleteOutlined />}
                confirmationButtonProps={{
                  title: 'Delete advert?',
                  content: 'Are you sure you want to delete this advert?',
                  okText: 'Yes',
                  cancelText: 'No',
                  okButtonProps: {
                    danger: true,
                  },
                }}
                onConfirm={this.handleDelete}
                style={{ marginTop: 20 }}
                block
              >
                Delete Advert
              </ConfirmationButton>
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

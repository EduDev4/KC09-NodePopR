import React from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../../layout';
import { ConfirmationButton } from '../../shared';
import { DeleteOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import placeholder from '../../../assets/photo-default.png';
import Tags from '../Tags';

import { getAdvertDetail, deleteAdvert } from '../../../api/adverts';
/* import Layout from '../layout'; */

class AdvertPage extends React.Component {
  state = {
    advert: null,
    error: null,
  };

  getAdvertId = () => this.props.match.params.advertId;

  getAdvertDetail = async () => {
    try {
      const { result } = await getAdvertDetail(this.getAdvertId());
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
    const { history } = this.props;
    deleteAdvert(this.getAdvertId()).then(() => history.push('/adverts'));
  };

  componentDidMount() {
    this.getAdvertDetail();
  }

  renderContent = () => {
    const { advert, error } = this.state;
    console.log(error);
    if (error) {
      return <Redirect to="/404" />;
    }
    if (!advert) {
      return null;
    }

    const { name, price, tags, sale, photo } = advert;

    console.log(advert);
    console.log(placeholder);
    return (
      <article>
        <div className="left">
          {
            <Image
              src={photo ? photo : 'error'}
              alt={name}
              width={75}
              height={75}
              fallback={placeholder}
            />
          }
        </div>
        <div className="right">
          <div className="tweet-header">
            <span className="advert-name">Name: {name}</span>
            <span>
              <br />
              Price: {price} €
            </span>
            <span>
              <br />
              {sale ? '[Sale]' : '[Buying]'}
              <br />
            </span>
          </div>
          <div>
            <Tags tags={tags}></Tags>
            <div className="advert-actions">
              <ConfirmationButton
                danger
                icon={<DeleteOutlined />}
                confirmationButtonProps={{
                  title: 'Delete advert?',
                  content: 'This action can not be undone!',
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

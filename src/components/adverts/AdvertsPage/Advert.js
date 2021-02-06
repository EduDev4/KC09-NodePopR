import React from 'react';
/* import formatDistanceToNow from 'date-fns/formatDistanceToNow'; */

import { Image } from 'antd';
import placeholder from '../../../assets/photo-default.png';
import './Adverts.css';
import Tags from '../Tags';

const Advert = ({ name, price, photo, sale, tags, _id, history }) => (
  <article key={_id} onClick={() => history.push(`/advert/${_id}`)}>
    <div className="right">
      <div className="advert-header">
        <span className="advert-name">{sale ? 'On Sale' : 'For Buying'}</span>
        <div>
          <Image
            src={photo ? photo : 'error'}
            alt={name}
            width={75}
            height={75}
            fallback={placeholder}
          />
        </div>

        <span className="advert-name">{name}</span>
        <br></br>
        <span className="advert-username">
          <b>Price</b>: {price}
        </span>
      </div>
      <div>
        <Tags tags={tags}></Tags>
        <div className="advert-actions"></div>
      </div>
    </div>
  </article>
);

export default Advert;

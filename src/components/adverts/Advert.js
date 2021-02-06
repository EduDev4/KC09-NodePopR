import React from 'react';
/* import formatDistanceToNow from 'date-fns/formatDistanceToNow'; */

/* import defaultPhoto from '../../assets/default_profile.png'; */
import './Adverts.css';

const Advert = ({ name, photo, price, sale, tags, _id, history }) => (
  <article key={_id} onClick={() => history.push(`/advert/${_id}`)}>
    <div className="right">
      <div className="advert-header">
        <span className="advert-name">{sale ? 'On Sale' : 'For Buying'}</span>
        <br />
        <br />
        <br />
        <br />
        <br />
        <span className="advert-name">{name}</span>
        <br></br>
        <span className="advert-username">
          <b>Price</b>: {price}
        </span>
      </div>
      <div>
        {tags ? (
          tags.map(tag => <div className="badge">{tag}</div>)
        ) : (
          <div className="badge">Untagged</div>
        )}
        <div className="advert-actions"></div>
      </div>
    </div>
  </article>
);

Advert.defaultProps = {
  content: 'Nothing here!',
};

export default Advert;

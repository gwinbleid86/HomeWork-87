import React from 'react';

import {apiURL} from "../../constants";
import imgNotAvailable from "../../assets/images/img_not_available.jpg"

const styles = {
  width: '150px',
  height: '150px',
  marginRight: '10px'
};

const PostsThumbnail = props => {
  let image = imgNotAvailable;
  if(props.image){
    image = apiURL + '/uploads/' + props.image;
  }
  return <img alt="post" src={image} style={styles} className="img-thumbnail" />

};

export default PostsThumbnail;
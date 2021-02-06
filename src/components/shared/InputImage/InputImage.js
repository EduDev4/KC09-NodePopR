import React from 'react';
import T from 'prop-types';
import { Image, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import placeholder from '../../../assets/photo-default.png';

import './InputImage.css';

class InputImage extends React.Component {
  state = {
    src: placeholder,
  };

  inputRef = React.createRef(null);

  readFile = file => {
    const { onChange } = this.props;
    const setSrc = src =>
      this.setState({ src }, () => {
        if (onChange) onChange(file);
      });

    if (!file) {
      setSrc(placeholder);
    } else {
      const reader = new FileReader();
      reader.onload = function () {
        setSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  handleClick = () => {
    const { src } = this.state;
    const { current: fileInput } = this.inputRef;
    if (src === placeholder) {
      fileInput.click();
    }
  };

  handleDeleteClick = () => {
    const { current: fileInput } = this.inputRef;
    fileInput.value = null;
    this.readFile(null);
  };

  handleChange = ev => {
    const [file] = ev.target.files;
    this.readFile(file);
  };

  render() {
    const { onChange, ...props } = this.props;
    const { src } = this.state;

    const isSrcLoaded = src !== placeholder;

    return (
      <>
        <input
          type="file"
          accept="image/png, image/jpeg, image/gif"
          ref={this.inputRef}
          onChange={this.handleChange}
          style={{ display: 'none' }}
          {...props}
        />
        <div className="container">
          <Image
            className="image"
            fallback={placeholder}
            height={75}
            preview={isSrcLoaded}
            src={src}
            width={75}
            onClick={this.handleClick}
          />
          {isSrcLoaded && (
            <div className="overlay">
              <Button
                type="primary"
                className="button"
                danger
                icon={<DeleteOutlined />}
                onClick={this.handleDeleteClick}
              />
            </div>
          )}
        </div>
      </>
    );
  }
}

InputImage.propTypes = {
  onChange: T.func,
};

export default InputImage;

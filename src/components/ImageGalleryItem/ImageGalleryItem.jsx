import React, { Component } from 'react';

const API_KEY = '34344088-cfac681c64979560ee45228c3';
class ImageGalleryItem extends Component {
  state = {
    galleryList: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchName !== this.props.searchName) {
      fetch(
        `https://pixabay.com/api/?q=${this.props.searchName}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(data => this.setState({ galleryList: data.hits }));
    }
  }

  render() {
    const { galleryList } = this.state;
    return (
      <>
        {galleryList &&
          galleryList.map(gallery => (
            <li key={gallery.id} className="gallery-item">
              <img src={gallery.webformatURL} alt="" />
            </li>
          ))}
      </>
    );
  }
}

export default ImageGalleryItem;

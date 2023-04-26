import React, { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';

const API_KEY = '34344088-cfac681c64979560ee45228c3';

class ImageGalleryItem extends Component {
  state = {
    galleryList: [],
    page: 1,
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchName !== this.props.searchName) {
      this.setState({ loading: true, galleryList: [], page: 1 });
      this.fetchGallery();
    }
  }

  fetchGallery = () => {
    const { searchName } = this.props;
    const { page } = this.state;
    fetch(
      `https://pixabay.com/api/?q=${searchName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(
          new Error(`No images for this request ${searchName}`)
        );
      })
      .then(data => {
        this.setState(prevState => ({
          galleryList: [...prevState.galleryList, ...data.hits],
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  loadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
      () => {
        this.fetchGallery();
      }
    );
  };

  render() {
    const { galleryList, error, loading } = this.state;
    return (
      <>
        {error && <h1>{error.message}</h1>}
        {loading && (
          <div className="spinner">
            <ThreeDots type="Oval" color="#00BFFF" height={80} width={80} />
          </div>
        )}
        {galleryList &&
          galleryList.map(({ id, webformatURL, tags }) => (
            <li key={id} className="gallery-item">
              <img src={webformatURL} alt={tags} />
            </li>
          ))}
        <>
          {galleryList.length > 0 && (
            <button className="load-more-button" onClick={this.loadMore}>
              Load more
            </button>
          )}
        </>
      </>
    );
  }
}

export default ImageGalleryItem;

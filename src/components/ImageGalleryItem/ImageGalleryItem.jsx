import React, { Component } from 'react';
import Modal from 'components/Modal/Modal';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const API_KEY = '34344088-cfac681c64979560ee45228c3';

class ImageGalleryItem extends Component {
  state = {
    galleryList: [],
    page: 1,
    showModal: false,
    modalImage: '',
    loading: false,
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
        return response.json();
      })
      .then(data => {
        if (data.totalHits === 0) {
          return toast.error(`No images for this request ${searchName}`);
        }

        this.setState(prevState => ({
          galleryList: [...prevState.galleryList, ...data.hits],
        }));
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => this.setState({ loading: false }));
  };

  toggleModal = largeImageURL => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      modalImage: largeImageURL,
    }));
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
    const { galleryList, showModal, loading, modalImage } = this.state;
    return (
      <>
        {loading && (
          <div className="spinner">
            <ThreeDots type="Oval" color="#00BFFF" height={80} width={80} />
          </div>
        )}
        {galleryList &&
          galleryList.map(({ id, webformatURL, largeImageURL, tags }) => (
            <li key={id} className="gallery-item">
              <img
                src={webformatURL}
                alt={tags}
                onClick={() => this.toggleModal(largeImageURL)}
              />
            </li>
          ))}
        <>
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={modalImage} alt="" />
            </Modal>
          )}
        </>
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

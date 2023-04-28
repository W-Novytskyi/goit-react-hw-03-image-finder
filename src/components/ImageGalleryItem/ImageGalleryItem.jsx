import React, { Component } from 'react';
import ButtonLoad from 'components/Buttton/Button';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loder/Loader';
import { toast } from 'react-toastify';
import { GalleryItem, Image } from './ImageGalleryItem.styled';

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
        {loading && <Loader />}
        {galleryList &&
          galleryList.map(({ id, webformatURL, largeImageURL, tags }) => (
            <GalleryItem key={id}>
              <Image
                src={webformatURL}
                alt={tags}
                onClick={() => this.toggleModal(largeImageURL)}
              />
            </GalleryItem>
          ))}
        <>
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={modalImage} alt="" />
            </Modal>
          )}
        </>
        <>{galleryList.length > 0 && <ButtonLoad onClick={this.loadMore} />}</>
      </>
    );
  }
}

export default ImageGalleryItem;

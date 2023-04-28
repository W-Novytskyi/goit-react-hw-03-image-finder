import React, { Component } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'App.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import ButtonLoad from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import { toast } from 'react-toastify';

const API_KEY = '34344088-cfac681c64979560ee45228c3';

class App extends Component {
  state = {
    searchName: '',
    galleryList: [],
    page: 1,
    showModal: false,
    modalImage: '',
    loading: false,
  };

  handleFormSubmit = searchName => {
    this.setState({ searchName });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchName !== this.state.searchName) {
      this.setState({ loading: true, galleryList: [], page: 1 });
      this.fetchGallery();
    }
  }

  fetchGallery = () => {
    const { searchName } = this.state;
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
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery>
          {galleryList &&
            galleryList.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                id={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
                toggleModal={this.toggleModal}
              />
            ))}
        </ImageGallery>

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={modalImage} alt="" />
          </Modal>
        )}

        {loading && <Loader />}
        <>{galleryList.length > 0 && <ButtonLoad onClick={this.loadMore} />}</>

        <ToastContainer position="top-left" autoClose={3000} />
      </Container>
    );
  }
}

export default App;

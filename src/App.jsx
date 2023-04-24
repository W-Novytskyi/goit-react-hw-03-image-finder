import React, { Component } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';

class App extends Component {
  // https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

  //   id - уникальный идентификатор
  // webformatURL - ссылка на маленькое изображение для списка карточек
  // largeImageURL - ссылка на большое изображение для модального окнa

  render() {
    return (
      <div>
        <Searchbar />
      </div>
    );
  }
}

export default App;

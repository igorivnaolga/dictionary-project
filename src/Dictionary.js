import React, { useState } from 'react';
import axios from 'axios';
import Results from './Results';
import Photos from './Photos';
import './Dictionary.css';

export default function Dictionary(props) {
  let [keyword, setKeyword] = useState(props.defaultKeyword);
  let [results, setResults] = useState(null);
  let [loaded, setLoaded] = useState(false);
  let [photos, setPhotos] = useState(null);
  const apiKey = `8b6161bt14ab19630e1ac04c485f9o33c`;

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  function handleDictionaryResponse(response) {
    setResults(response.data);
  }

  function handlePhotosResponse(response) {
    setPhotos(response.data.photos);
  }

  function search() {
    //documentation https://www.shecodes.io/learn/apis/dictionary
    let apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${keyword}&key=${apiKey}`;
    axios.get(apiUrl).then(handleDictionaryResponse);

    //documentation https://www.shecodes.io/learn/apis/images
    let imageApiUrl = `https://api.shecodes.io/images/v1/search?query=${keyword}&key=${apiKey}`;
    axios.get(imageApiUrl).then(handlePhotosResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function load() {
    setLoaded(true);
    search();
  }

  if (loaded) {
    return (
      <div className="Dictionary">
        <section>
          <h1>What word do you want to look up?</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="search"
              onChange={handleKeywordChange}
              defaultValue={props.defaultKeyword}
            />
          </form>
          <div className="hint">
            <strong>suggested words: </strong>sunrise, forest, yoga...
          </div>
        </section>
        <Results results={results} />
        <Photos photos={photos} />
      </div>
    );
  } else {
    load();
    return 'Loading';
  }
}

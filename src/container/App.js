import React from 'react';
import {connect} from 'react-redux';
import {
  Header,
  Content,
  Navigation,
  LoadingSpinner
} from '../components';
import Workbench from './Workbench';
import {handlerLanguage} from '../modules/language';
import {
  getTranslImages,
  selecteCanvas,
  minusChapter,
  plusChapter,
  setClearCropox
} from '../modules/images';
import {
  hanlerMarquee,
  handlerToggleAutoClear, 
  handlerToggleAutoOCR,
  handlerToggleAutoTranslate,
  handlerSelectImage,
  setStartNumber
} from '../modules/ui';
import strings from '../contents';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import '../scss/global.css';

function App(props) {
  const {
    contentText,
    marquee,
    switchAutoClear,
    switchAutoOCR,
    switchAutoTranslate,
    language,
    images,
    handlerDropDownItem,
    onToggle,
    selectedImg,
    loading,
    toLastChapter,
    toNextChapter,
    jpgPc,
    chapterPc,
    selectItem,
    openModal,
    selectedImage
  } = props;
  
  const headerProps = {
    contentText,
    marquee,
    switchAutoClear,
    switchAutoOCR,
    switchAutoTranslate, 
    language,
    handlerDropDownItem,
    onToggle,
    openModal,
    selectedImage
  };
  const navigationProps= {
    contentText,
    selectedImg,
    toLastChapter,
    toNextChapter,
    jpgPc,
    chapterPc,
    selectItem,
    images
  };
  
  return (
    <div className="main">
      <Header {...headerProps}/>
      <Content>
        <Navigation {...navigationProps}/>
        <Workbench {...props}/>
      </Content>
      {loading && <LoadingSpinner />}
    </div>
  );
}

const mapStateToProps = (state) => {
  const language = state.languageMoudels.language || "Chinese";
  const contentText = strings.screen[language];
  const images = state.images.imagesCollection;
  const {
    selectedImage, 
    jpgPc,
    chapterPc
  } = state.images;
  const {
    marquee, 
    switchAutoClear = true, 
    switchAutoOCR = true, 
    switchAutoTranslate= true,
    selectedImg = 0,
    loading = false
  } = state.ui;
  
  return {
    language,
    images,
    marquee,
    switchAutoClear,
    switchAutoOCR,
    switchAutoTranslate,
    selectedImg,
    loading,
    jpgPc,
    chapterPc,
    selectedImage,
    contentText
  }
};

const mapDispatchToProps = (dispatch) => {
  dispatch(getTranslImages());
  return {
    handlerDropDownItem: (id, item)=> {
      switch (id) {
        case "language":
          dispatch(handlerLanguage(item));
          break;
        case "marquee":
          dispatch(hanlerMarquee(item));
          break;
        default:
      }
    },
    onToggle: (id, payload)=> {
      switch (id) {
        case 'autoClear':
          dispatch(handlerToggleAutoClear(payload));
          break;
        case 'autoOCR':
          dispatch(handlerToggleAutoOCR(payload));
          break;
        case 'autoTranslate':
          dispatch(handlerToggleAutoTranslate(payload));
          break;
        default:
          break;
      }
    },
    selectItem: (selectedImg, translationOrderId)=> {
      dispatch(setStartNumber(0));
      dispatch(handlerSelectImage(selectedImg));
      dispatch(selecteCanvas(translationOrderId));
      dispatch(setClearCropox());
    },
    toLastChapter: (currentNumber) => {
      dispatch(minusChapter(currentNumber));
    },
    toNextChapter: (currentNumber) => {
      dispatch(plusChapter(currentNumber));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

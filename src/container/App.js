import React from 'react';
import {connect} from 'react-redux';
import {
  Header,
  Content,
  Navigation
} from '../components';
import Workbench from './Workbench';
import {handlerLanguage} from '../modules/language';
import {
  getTranslImages,
  selecteCanvas
} from '../modules/images';
import {
  hanlerMarquee,
  handlerToggleAutoClear, 
  handlerToggleAutoOCR,
  handlerToggleAutoTranslate,
  handlerSelectImage
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
    selectItem
  } = props;
  
  const headerProps = {
    contentText,
    marquee,
    switchAutoClear,
    switchAutoOCR,
    switchAutoTranslate, 
    language,
    handlerDropDownItem,
    onToggle
  };
  const navigationProps= {
    contentText,
    selectedImg,
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
    </div>
  );
}

const mapStateToProps = (state) => {
  const language = state.languageMoudels.language || "English";
  const images = state.images.imagesCollection;
  const {selectedImage} = state.images;
  const {
    marquee, 
    switchAutoClear = true, 
    switchAutoOCR = true, 
    switchAutoTranslate= true,
    selectedImg
  } = state.ui;
  const contentText = strings.screen[language];
  return {
    language,
    images,
    marquee,
    switchAutoClear,
    switchAutoOCR,
    switchAutoTranslate,
    selectedImg,
    selectedImage,
    contentText
  }
};

const mapDispatchToProps = (dispatch) => {
  dispatch(getTranslImages());
  dispatch(selecteCanvas());
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
    selectItem: (selectedImg)=> {
      dispatch(handlerSelectImage(selectedImg));
      dispatch(selecteCanvas());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

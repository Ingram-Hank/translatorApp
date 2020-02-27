import React from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Content,
  Navigation,
  LoadingSpinner
} from '../components';
import Workbench from './Workbench';
import { handlerLanguage } from '../modules/language';
import {
  getTranslImages,
  getFeedBackMessage,
  selecteCanvas,
  minusChapter,
  plusChapter,
  setClearCropox,
  saveData,
  clearSelectedImage
} from '../modules/images';
import {
  hanlerMarquee,
  handlerToggleAutoClear,
  handlerToggleAutoOCR,
  handlerToggleAutoTranslate,
  handlerSelectImage,
  toggleFeedBackMsg,
  setStartNumber,
  openPreviewMoal,
  closePreviewModal,
  setClearPreTranslResult
} from '../modules/ui';
import { mapToObject } from '../utilities';
import strings from '../contents';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import '../scss/global.css';

const buildGroupData = (parms) => {
  const {resultBoxStyleParams = {}, maskTextImgs = {}, resultLayersMap = {}, font = {}} = parms;
  const defaultFont = {
    font_family: "Microsoft YaHei",
    font_size: 12,
    font_color: "rgb(0, 0, 0, .65)",
    hasFontItalic: false,
    hasFontWeight: false,
    text_align: "center"
  };
  const obj = {};
  if(Object.keys(resultBoxStyleParams).length && Object.keys(maskTextImgs).length) {
    Object.keys(resultBoxStyleParams).forEach( key => {
       if(resultLayersMap[key]) {
        obj[key] = {
          mask: maskTextImgs[key][maskTextImgs[key].length - 1],
          position: resultBoxStyleParams[key],
          translText: resultLayersMap[key].translText,
          font: font[key] || defaultFont
        }
       }
    })
  }
  return obj;
}

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
    handlerPreview,
    selectedImage,
    resultData,
    startPreview,
    handlerClosePreview,
    handlerSaveData,
    feedMsg,
    handlerSelectFeedBackMsg,
    handlerToggleFeedBackMsg,
    openFeedBackMsg
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
    selectedImage,
    handlerPreview,
    handlerClosePreview,
    resultData,
    startPreview,
    handlerSaveData,
    feedMsg,
    handlerSelectFeedBackMsg,
    handlerToggleFeedBackMsg,
    openFeedBackMsg
  };
  const navigationProps = {
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
      <Header {...headerProps} />
      <Content>
        <Navigation {...navigationProps} />
        <Workbench {...props} />
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
    chapterPc,
    maskTextImgs = {},
    resultBoxStyleParams = {},
    resultLayers = [],
    feedMsg
  } = state.images;
  const {
    marquee,
    switchAutoClear = true,
    switchAutoOCR = true,
    switchAutoTranslate = true,
    selectedImg = 0,
    loading = false,
    font = {},
    startPreview,
    openFeedBackMsg
  } = state.ui;
  const resultData = buildGroupData({
    resultBoxStyleParams,
    maskTextImgs,
    resultLayersMap: mapToObject(resultLayers, "index"),
    font
  });

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
    maskTextImgs,
    resultBoxStyleParams,
    contentText,
    resultData,
    startPreview,
    feedMsg,
    openFeedBackMsg
  }
};

const mapDispatchToProps = (dispatch) => {
  dispatch(getTranslImages());
  dispatch(getFeedBackMessage());
  return {
    handlerDropDownItem: (id, item) => {
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
    onToggle: (id, payload) => {
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
    selectItem: (selectedImg, translationOrderId) => {
      dispatch(setStartNumber(0));
      dispatch(handlerSelectImage(selectedImg));
      dispatch(selecteCanvas(translationOrderId));
      dispatch(setClearCropox());
      dispatch(setClearPreTranslResult());
    },
    toLastChapter: (currentNumber) => {
      dispatch(minusChapter(currentNumber));
    },
    toNextChapter: (currentNumber) => {
      dispatch(plusChapter(currentNumber));
    },
    handlerPreview: ()=> {
      dispatch(openPreviewMoal())
    },
    handlerClosePreview: ()=> {
      dispatch(closePreviewModal());
    },
    handlerSaveData:(data)=>{
      dispatch(saveData(data))
    },
    handlerSelectFeedBackMsg: (comicTranslationOrderId, orderNo)=> {
      dispatch(getTranslImages({comicTranslationOrderId, orderNo}));
      dispatch(toggleFeedBackMsg(true));
      dispatch(handlerSelectImage(null));
      dispatch(clearSelectedImage());
      dispatch(setClearPreTranslResult());
    },
    handlerToggleFeedBackMsg: (payload)=> {
      dispatch(toggleFeedBackMsg(payload));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

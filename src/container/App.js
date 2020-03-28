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
  handlerToLastChapter,
  handlerToNextChapter,
  setSaveData,
  clearSelectedImage,
  initialTranslPage,
  restoreTranslPic,
  handlerSelectItem,
  abandonSaveAction,
  setResultImgURL
} from '../modules/images';
import {
  hanlerMarquee,
  handlerToggleAutoClear,
  handlerToggleAutoOCR,
  handlerToggleAutoTranslate,
  handlerSelectImage,
  openPreviewMoal,
  closePreviewModal,
  setClearPreTranslResult,
  closeModal
} from '../modules/ui';
import strings from '../contents';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import '../scss/global.css';


function App(props) {
  const {
    contentText,
    marquee,
    modalOpen,
    modalId,
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
    chapterIds,
    comicChapterId,
    selectItem,
    closeModal,
    handlerPreview,
    status,
    imgWidth,
    imgHeight,
    selectedImage,
    selectedTranslImage,
    startPreview,
    handlerClosePreview,
    handlerSaveData,
    getCropedImgURL,
    handlerAbandonSave,
    feedMsg,
    handlerSelectFeedBackMsg,
    handlerRestore,
    lastChapterDisable,
    nextChapterDisable,
    notificationMsg,
    zoomCanvasValue,
    resultImgURL
  } = props;

  const headerProps = {
    contentText,
    marquee,
    modalOpen,
    modalId,
    switchAutoClear,
    switchAutoOCR,
    switchAutoTranslate,
    language,
    handlerDropDownItem,
    onToggle,
    closeModal,
    status,
    imgWidth,
    imgHeight,
    selectedImage,
    selectedTranslImage,
    handlerPreview,
    handlerClosePreview,
    startPreview,
    handlerSaveData,
    getCropedImgURL,
    handlerAbandonSave,
    feedMsg,
    handlerSelectFeedBackMsg,
    handlerRestore,
    notificationMsg,
    resultImgURL,
    scale: zoomCanvasValue
  };
  const navigationProps = {
    contentText,
    selectedImg,
    toLastChapter,
    toNextChapter,
    jpgPc,
    chapterPc,
    chapterIds,
    comicChapterId,
    selectItem,
    images,
    lastChapterDisable,
    nextChapterDisable
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
    selectedTranslImage,
    jpgPc,
    chapterPc,
    chapterIds,
    comicChapterId,
    maskTextImgs = {},
    resultBoxStyleParams = {},
    feedMsg,
    lastChapterDisable,
    nextChapterDisable,
    status,
    imgWidth,
    imgHeight,
    resultImgURL
  } = state.images;
  const {
    marquee,
    modalOpen,
    modalId,
    switchAutoClear = true,
    switchAutoOCR = true,
    switchAutoTranslate = true,
    selectedImg = 0,
    loading = false,
    startPreview,
    notificationMsg,
    zoomCanvasValue = 1
  } = state.ui;
  

  return {
    language,
    images,
    marquee,
    modalOpen,
    modalId,
    switchAutoClear,
    switchAutoOCR,
    switchAutoTranslate,
    selectedImg,
    loading,
    jpgPc,
    chapterPc,
    chapterIds,
    comicChapterId,
    status,
    imgWidth,
    imgHeight,
    selectedImage,
    selectedTranslImage,
    maskTextImgs,
    resultBoxStyleParams,
    contentText,
    startPreview,
    feedMsg,
    lastChapterDisable,
    nextChapterDisable,
    notificationMsg,
    zoomCanvasValue,
    resultImgURL
  }
};

const mapDispatchToProps = (dispatch) => {
  dispatch(initialTranslPage());
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
    closeModal: () => {
      dispatch(closeModal());
    },
    selectItem: (selectedImg, translationOrderId) => {
      dispatch(handlerSelectItem(selectedImg, translationOrderId));
    },
    toLastChapter: () => {
      dispatch(handlerToLastChapter());
    },
    toNextChapter: () => {
      dispatch(handlerToNextChapter());
    },
    handlerPreview: () => {
      dispatch(openPreviewMoal())
    },
    handlerClosePreview: () => {
      dispatch(closePreviewModal());
    },
    handlerAbandonSave: () => {
      dispatch(abandonSaveAction());
    },
    handlerSaveData: () => {
      dispatch(setSaveData());
    },
    getCropedImgURL: ()=> {
      dispatch(setResultImgURL());
    },
    handlerSelectFeedBackMsg: (comicTranslationOrderId, orderNo) => {
      dispatch(getTranslImages({ comicTranslationOrderId, orderNo}));
      dispatch(handlerSelectImage(null));
      dispatch(clearSelectedImage());
      dispatch(setClearPreTranslResult());
    },
    handlerRestore: () => {
      dispatch(restoreTranslPic())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

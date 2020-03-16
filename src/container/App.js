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
  saveData,
  clearSelectedImage,
  initialTranslPage,
  restoreTranslPic,
  handlerSelectItem,
  abandonSaveAction
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
import { mapToObject } from '../utilities';
import strings from '../contents';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import '../scss/global.css';

const buildGroupData = (parms) => {
  const { resultBoxStyleParams = {}, maskTextImgs = {}, resultLayersMap = {}, font = {} } = parms;
  const defaultFont = {
    font_family: "CCWildWords",
    font_size: 16,
    font_color: "rgb(0, 0, 0, .65)",
    hasFontItalic: false,
    hasFontWeight: false,
    text_align: "center"
  };
  const obj = {};
  if (Object.keys(resultBoxStyleParams).length && Object.keys(maskTextImgs).length) {
    Object.keys(resultBoxStyleParams).forEach(key => {
      if (resultLayersMap[key] && maskTextImgs[key]) {
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
    resultData,
    startPreview,
    handlerClosePreview,
    handlerSaveData,
    handlerAbandonSave,
    feedMsg,
    handlerSelectFeedBackMsg,
    handlerRestore,
    lastChapterDisable,
    nextChapterDisable,
    notificationMsg,
    zoomCanvasValue
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
    resultData,
    startPreview,
    handlerSaveData,
    handlerAbandonSave,
    feedMsg,
    handlerSelectFeedBackMsg,
    handlerRestore,
    notificationMsg,
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
    resultLayers = [],
    feedMsg,
    lastChapterDisable,
    nextChapterDisable,
    status,
    imgWidth,
    imgHeight
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
    font = {},
    startPreview,
    notificationMsg,
    zoomCanvasValue = 1
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
    resultData,
    startPreview,
    feedMsg,
    lastChapterDisable,
    nextChapterDisable,
    notificationMsg,
    zoomCanvasValue
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
    handlerSaveData: (data) => {
      dispatch(saveData(data));
    },
    handlerSelectFeedBackMsg: (comicTranslationOrderId, orderNo) => {
      dispatch(getTranslImages({ comicTranslationOrderId, orderNo, isSaveData: false }));
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

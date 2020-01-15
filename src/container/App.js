import React from 'react';
import {connect} from 'react-redux';
import {
  Header,
  Content,
  Navigation,
  Workbench
} from '../components';
import {handlerLanguage} from '../modules/language';
import {
  hanlerMarquee,
  handlerToggleAutoClear, 
  handlerToggleAutoOCR,
  handlerToggleAutoTranslate
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
    handlerDropDownItem,
    onToggle
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
  const contentProps = {

  };
  const navigationProps= {
    contentText
  };
  return (
    <div className="main">
      <Header {...headerProps}/>
      <Content {...contentProps} >
        <Navigation {...navigationProps}/>
        <Workbench />
      </Content>
    </div>
  );
}

const mapStateToProps = (state) => {
  const language = state.languageReducer.language || "Chinese";
  const {
    marquee, 
    switchAutoClear = true, 
    switchAutoOCR = true, 
    switchAutoTranslate= true
  } = state.uiReducer;
  const contentText = strings.screen[language];
  return {
    language,
    marquee,
    switchAutoClear,
    switchAutoOCR,
    switchAutoTranslate,
    contentText
  }
};

const mapDispatchToProps = (dispatch) => {
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
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React from 'react';
import { connect } from 'react-redux';
import {Button, Header} from '../components';
import {handlerLanguage} from '../modules/language';
import {hanlerMarquee} from '../modules/ui';
import strings from '../contents';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

function App(props) {
  const {contentText, marquee, language, handlerDropDownItem} = props;
  const testButtonData = {
    type: 'button',
    onClick: () => {
      alert ("heelllll");
    }
  };
  const headerProps = {
    contentText,
    marquee, 
    language,
    handlerDropDownItem
  };
  return (
    <div className="container-fluid no-padding">
      <Header {...headerProps}/>
      <Button data={testButtonData}>{contentText.welcome}</Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  const language = state.languageReducer.language || "English";
  const marquee = state.uiReducer.marquee;
  const contentText = strings.screen[language];
  return {
    language,
    marquee,
    contentText
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handlerDropDownItem: (id, item)=> {
      if(id === 'language'){
        dispatch(handlerLanguage(item));
      }
      if(id === 'marquee'){
        dispatch(hanlerMarquee(item))
      }
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

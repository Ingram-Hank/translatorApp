import { combineReducers } from 'redux';
import images from './images';
import languageMoudels from './language';
import ui from './ui';
import font from './fontSettings';
import brush from './brushSettings';
import glossary from './glossary';

export default combineReducers({
    images,
    languageMoudels,
    ui,
    font,
    brush,
    glossary
})

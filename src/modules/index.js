import { combineReducers } from 'redux';
import images from './images';
import languageMoudels from './language';
import ui from './ui';
import font from './fontSettings';
import brush from './brushSettings';

export default combineReducers({
    images,
    languageMoudels,
    ui,
    font,
    brush
})

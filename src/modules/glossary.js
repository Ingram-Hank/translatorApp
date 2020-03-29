import * as actions from './actions';
import services from '../services';
import { uiloadingStart, uiloadingComplete } from './ui';

const glossaryReducer = (state = {}, action) => {
    switch (action.type){
        case actions.GLOSSARY_RECEIVED_GLOSSARY_DATA:
            return Object.assign({}, state, { glossaryData: action.payload })
        case actions.GLOSSARY_RECEIVED_ORIGIN_TEXT:
            return Object.assign({}, state, { originText: action.payload })
        case actions.GLOSSARY_RECEIVED_TRANSL_TEXT:
            return Object.assign({}, state, { translText: action.payload })
        default: 
            return state
    }
};

export const receivedGlossaryData = (payload) => ({
    type: actions.GLOSSARY_RECEIVED_GLOSSARY_DATA,
    payload
});

export const receivedOriginText = (payload) => ({
    type: actions.GLOSSARY_RECEIVED_ORIGIN_TEXT,
    payload
});

export const receivedTranslText = (payload) => ({
    type: actions.GLOSSARY_RECEIVED_TRANSL_TEXT,
    payload
});

export const getGlossaryData = (action)=> {
    return (dispatch, getState) => {
        const state = getState();
        const { orderNo } = state.ui;
        const { comicListId } = state.images;
        const { originText, translText } = state.glossary;
        const payload = {
            orderNo,
            comicListId
        };
        if(action) {
            payload.sourceText = originText;
            payload.targetText = translText;
        }
        dispatch(uiloadingStart());
        services.queryGlossary(payload).then(({data})=> {
            dispatch(receivedGlossaryData(data.data));
            dispatch(uiloadingComplete());
        })
    }
}

export const addGlossaryData = ()=> {
    return (dispatch, getState) => {
        const state = getState();
        const { orderNo } = state.ui;
        const { comicListId } = state.images;
        const { originText, translText } = state.glossary;
        const payload = {
            orderNo,
            comicListId,
            termSource: originText,
            termTarget: translText
        }
        dispatch(uiloadingStart());
        services.addGlossary(payload).then(({data})=> {
            dispatch(receivedGlossaryData(data.data));
            dispatch(uiloadingComplete());
        })
    }
}

export const deleteGlossary = (comicListId, orderNo, comicTermId)=> {
    return (dispatch, getState) => {
        dispatch(uiloadingStart());
        services.deleteGlossary({comicListId, orderNo, comicTermId}).then(({data})=> {
            dispatch(receivedGlossaryData(data.data));
            dispatch(uiloadingComplete());
        })
    }
}

export default glossaryReducer;
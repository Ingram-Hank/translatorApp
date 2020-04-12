import http from './service';

export default  {
  getImageData(params){
    const {orderNo, chapterId, comicTranslationOrderId} = params;
    if(chapterId){
      return http.get("/comic/list?orderNo=" + orderNo + "&chapterId=" + chapterId)
    }else if(comicTranslationOrderId){
      return http.get("/comic/list?orderNo=" + orderNo + "&comicTranslationOrderId=" + comicTranslationOrderId)
    }else {
      return http.get("/comic/list?orderNo=" + orderNo)
    }
  },
  getLargeImageData(comicTranslationId){
    return http.get("/comic/getJpg/" + comicTranslationId)
  },
  saveTranslation(payload) {
    return http.post("/comic/saveTranslation/", payload)
  },
  getFeedBackMsg(comicTranslationOrderId, orderNo) {
    if(comicTranslationOrderId) {
      return http.post("/comic/getFeedbackMsg", {comicTranslationOrderId, orderNo})
    }else{
      return http.post("/comic/getFeedbackMsg", {orderNo})
    }
  },
  saveImage(data) {
    return http.post("/comic/saveImg", data)
  },
  clearText(data){
    return http.post("ai/inpainting", data)
  },
  getORC(data){
    return http.post("ai/ocr", data)
  },
  getTranslResult(data){
    return http.post("ai/tm", data)
  },
  queryGlossary(data) {
    return http.post("/comic/term/queryTerm", data)
  },
  addGlossary(data) {
    return http.post("/comic/term/saveTerm", data)
  },
  deleteGlossary(data) {
    return http.post("/comic/term/deleteTerm", data)
  }
}

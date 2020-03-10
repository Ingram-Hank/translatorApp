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
    return http.post("ai/szmc", data)
  },
  getORC(data){
    return http.post("ai/ocr", data)
  },
  getTranslResult(data){
    return http.post("ai/tm", data)
  }
}

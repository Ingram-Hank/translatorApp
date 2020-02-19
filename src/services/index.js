import http from './service';

export default  {
  getImageData(params){
    const {orderNo, chapterId} = params;
    if(chapterId){
      return http.get("/comic/list?"+ orderNo + "&&" + chapterId)
    }
    return http.get("/comic/list?"+ orderNo)
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

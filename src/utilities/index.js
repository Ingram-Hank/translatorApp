
export const deepObjectMerge = (FirstOBJ, SecondOBJ)=> {
    for (var key in SecondOBJ) {
        FirstOBJ[key] = FirstOBJ[key] && FirstOBJ[key].toString() === "[object Object]" ?
            deepObjectMerge(FirstOBJ[key], SecondOBJ[key]) : FirstOBJ[key] = SecondOBJ[key];
    }
    return FirstOBJ;
}

export const getQueryString =  (name)=> {
    let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
    let hash = window.location.hash
    let search = hash.split('?')
    let r = search[1] && search[1].match(reg)
    if (r != null) return r[2]; return ''
}

export const queryString=(url, query)=> {
    let str = []
    for (let key in query) {
      str.push(key + '=' + query[key])
    }
    let paramStr = str.join('&')
    return paramStr ? `${url}?${paramStr}` : url
}
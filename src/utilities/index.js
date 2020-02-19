
export const deepObjectMerge = (FirstOBJ = {}, SecondOBJ)=> {
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

export const $ = (id) => {
    return document.getElementById(id);
};

export const getCss = (o, key) => {
    return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
};


export const getStyle = (o, key) => {
    return Number(getCss(o, key).replace(/px/, ''));
}

export const mapToObject = (array, key) => {
    let obj = {};
    for(let index in array){
        obj[array[index][key]] = array[index]
    }
    
    return obj;
} 
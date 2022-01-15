
import _ from 'lodash'
export const getIntoKeyValuePair = (data)=>_.map(data,item=>({key: item, value: item}))

export const getIntoTextValuePair = (data)=>_.map(data,item=>({text: item, value: item}))

export const openLinkInNewTab = (url) => {
    window.open(url, '_blank').focus();
}

export const getJSONFromLink = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

export const ALL_APPARTMENTS_FETCH_LINK = 'https://api.apify.com/v2/datasets/tUehIOAn1czeYJUxy/items?clean=true&format=json'


export  const getWindowDimensions=()=> {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
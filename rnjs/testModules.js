var ReactNative  = require('react-native');
var {
  ToastAndroid
} = ReactNative;
export function testToastAndroid (msg, cb) {
  var err = null;
  try{
    ToastAndroid.show("Callback收到消息：" + msg, ToastAndroid.SHORT);
  } catch(error) {
    err = error;
  }
  cb(err, msg)
}

export function testPromise (msg) {
  return new Promise(function(resolve, reject) {
    try{
      ToastAndroid.show("Callback收到消息：" + msg, ToastAndroid.SHORT);
      resolve({data: "promise success from :" + msg});
    } catch(error) {
      reject({error: "promise failed from :" + msg})
    }
  })
}
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict';
import React, {Component} from 'react';
var ReactNative  = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View,
    NativeModules,
    ToastAndroid,
    DeviceEventEmitter,
    WebView,
    TouchableHighlight,
    Dimensions,
} = ReactNative;

var Promise = require("bluebird");
// import testModules from "./testModules"; 
var testModules = require("./testModules");

let title = 'React Native界面';

export default class InteractiveDemo extends Component {
    constructor() {
        super();
        this.handleMessage33 = this.handleMessage33.bind(this);
        this.handleMessage44 = this.handleMessage44.bind(this);
    }
    /**
     * 接收原生调用
     */
    componentDidMount() {
        DeviceEventEmitter.addListener('nativeCallRn', (msg) => {
            title = "React Native界面,收到数据：" + global.patchImgNames;
            ToastAndroid.show("发送成功" + msg, ToastAndroid.SHORT);
        })       

        // testModules.testToastAndroid('hello', (msg) => {alert(msg)}) 
        // alert(testModules.testToastAndroid.testToastAndroid.toString())
    }

    /**
     * 调用原生代码
     */
    skipNativeCall(params) {
        let phone =  '18637070949';
        NativeModules.commModule.rnCallNative(phone);
    }

    testPromisify() {
         Promise.promisify(testModules.testToastAndroid)('hello 811').then(function(msg) {
            alert("Promise.promisify: "+ msg)
        })
    }
    /**
     * Callback 通信方式
     */
    callbackComm(msg) {
        NativeModules.commModule.rnCallNativeFromCallback(msg, (result) => {
            ToastAndroid.show("1111CallBack收到消息:" + result, ToastAndroid.SHORT);
        })
    }

    /**
     * Promise 通信方式
     */
    promiseComm(msg) {
        NativeModules.commModule.rnCallNativeFromPromise(msg).then(
            (result) => {
                ToastAndroid.show("Promise收到消息:" + result, ToastAndroid.SHORT)
            }
        ).catch((error) => {
            console.log(error)
        });         
    }

    sendMessage() {
        this.webview.postMessage('message from react-native');
    }

    handleMessage33(event) {
        var rowData = event.nativeEvent.data;
        var jsonData = JSON.parse(rowData);
        var evalFunc =  eval(jsonData.method)

        evalFunc(jsonData.params)
    }

    handleMessage44(event) {
        var rowData = event.nativeEvent.data;
        var jsonData = JSON.parse(rowData);
        var _this = this;
        eval(jsonData.source).then(
            function(data){
                // alert('success:' + data.toString())
                jsonData.code = 1;
                jsonData.resolve = data;
                _this.webview.postMessage(JSON.stringify(jsonData));
                // alert(jsonData.toString())
            },
            function(err){
                // alert('error:' + err.toString())
                jsonData.code = 9;
                jsonData.reject = err.toString();
                _this.webview.postMessage(JSON.stringify(jsonData));
            }
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.native} onPress={() => this.testPromisify()}><Text>发送消息到WebView</Text></TouchableHighlight>
                <WebView style={styles.webview}
                    source={require('./index.html')}
                    ref={webview => this.webview = webview}
                    onMessage={this.handleMessage44}
                />
            </View>
        );
        /*return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    {title}
                </Text>
                <Text style={styles.welcome} onPress={this.evalFunc.bind(this)}>
                    跳转到拨号界面
                </Text>
                <Text style={styles.welcome} onPress={this.callbackComm.bind(this, 'callback发送啦')}>
                    Callback通信方式
                </Text>
                <Text style={styles.welcome} onPress={this.promiseComm.bind(this, 'promise发送啦')}>
                    Promise通信方式
                </Text>
                <Image source={require('./images/ic_1.png')}/>
                <Image source={require('./images/ic_2.png')}/>
                <Image source={require('./images/ic_4.png')}/>
            </View>
        );*/
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    native: {
        height: 50,
        justifyContent: 'center',
    },
    webview: {
        width: Dimensions.get('window').width,
        backgroundColor: '#ccc'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});

AppRegistry.registerComponent('InteractiveDemo', () => InteractiveDemo);

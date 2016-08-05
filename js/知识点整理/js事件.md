浏览器事件分为三个阶段：
1、事件捕获：从根元素html到目标元素的查找阶段
2、事件触发：在目标元素上触发事件
3、事件冒泡：从目标元素到根元素上反向触发阶段

跨浏览器的事件处理函数
```
    var EventUnit = {
        //添加事件,参数(目标元素，事件类型，事件方法)
        addEventHandler: function(ele, type, handler) {
            if(ele.addEventListener) {
                ele.addEventListener(type, handler, false)
            }
            else if(ele.attachEvent) {
                ele.attachEvent('on' + type, handler);
            }
            else {
                ele['on' + type] = handler;
            }
        },
        //移除事件,参数(目标元素，事件类型， 事件方法)
        removeEventHandler: function(ele, type, handler) {
            if(ele.removeEventListener) {
                ele.removerEventListener(type, handler, false);
            }
            else if(ele.detachEvent) {
                ele.detachEvent('on' + type, handler);
            }
            else {
                ele['on' + type] = null;
            }
        },
        //阻止元素默认行为
        preventDefault: function(evt) {
            if(evt.preventDefault) {
                evt.preventDefault();
            }
            else {
                evt.returnValue = false;
            }
        },
        //阻止事件冒泡
        stopPropagation: function(evt) {
            if(evt.stopPropagation) {
                evt.stopPropagation();
            }
            else {
                evt.cancelBubble = true;
            }
        }
    }
    ```

**事件代理**
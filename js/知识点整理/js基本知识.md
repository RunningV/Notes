###1、基本数据类型：
    null、undefined、string、boolean、number、
    引用类型：object、Array、RegExp、Function

###2、判断数据类型typeof、instanceof、Object.prototype.toString.call()、constructor
    1、typeof用于基本数据类型，返回对应的类型，typeof null === ‘Object’,
    不能用于引用类型的判断，对于引用类型的判断一律返回'Object'
    2、instanceof用于判断一个变量是否在指定的原型对象上，返回boolean值，
    用于判断内置对象和自定义属性方法是否在指定的原型对象上，不能用于判断
    基本类型
    3、Object.prototype.toString.call()，调用对象的toString()方法将要处理的
    变量的原始类型转换为字符串形式[Object xxx]，可用于判断基本类型和引用类型
    4、constructor，除null和undefined没有constructor外，其他类型变量都有，封装方法
    `function getConstructorName(obj) {
        return (obj === undefined || obj === null) ? obj :
        (obj.constructor && obj.constructor.name)`

###3、继承
1、使用call、apply绑定函数的作用域到父对象上实现继承，此方式不能继承父对象
prototype上定义的属性和方法
2、prototype原型链继承。将函数的prototype指向父对象的实例上，实现子对象继承
父对象上的属性方法，此时需要将子对象上的.prototype.constructor重新赋值为
子对象名，否则子对象的.prototype.constructor会指向父对象名。
3、使用空对象间接继承，感觉是在第二种的父子对象之间插入一个空对象，空对象的
prototype赋值为父对象的prototype，然后将子对象的prototype指向空对象的实例，
仍需更改子对象的prototype.constructor为自身。封装函数如下：
```
    function extend(Parent, Child) {
        var F = function() {}
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.prototype.constructor = Child;
    }
```
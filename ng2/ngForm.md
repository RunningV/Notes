## ngForm Directive构建表单

1. `angular2`提供了很好的表单构造结构， 比如我们需要如下的提交表单的数据结构：

   ```
   {
     name:  'Jone',

     account:  'Jone@gmail.com',

     mobile:  '12345678',

     password:  '**'
   }
   ```

   ​

   可能我们会想先获取数据然后拼接成这样的结构再提交。

   但是如果你用`ngForm`定义dom结就可以直接获取这样的`JSON`格式结构。

   `form.html`可以这样写：

   ```
   <form #form="ngForm" (ngSubmit)="logForm(form.value)">
     <label>name:</label>
     <input type="text" ngControl="name">

     <label>account:</label>
     <input type="text" ngControl="account">

     <label>mobile:</label>
     <input type="text" ngControl="mobile">

     <label>password</label>
     <input type="text" ngControl="password">

     <button type="submit">Submit</button>
   </form>
   ```

   然后我们在组件`form.component.ts`中定义`logForm`方法：

   ```
   import {Component} from '@angular/core';

   @Component({
     selector: 'my-app',
     templateUrl: 'form.html',
   })

   export class MyFormComponent {
     logForm(value: any) {
       console.log(value);  //在此处你可以得到你想要的JSON结构
     }
   }
   ```

   `logForm()`里的`value`值就是我们想要的`JSON`结构，是不是很容易。

   解释下`html`代码：

   ```
   <form #form="ngForm" (ngSubmit)="logForm(form.value)">
   ```

   `#form` 是`angular`定义dom结构的方法，然后一定要将`#form`赋值为`ngForm`,关于提交的方法可以用`(ngSubmit) || (submit)`都可以。然后`logForm`

   方法传参为`form.value`，即定义的`#form`的`value`。然后在每一个`input`标签绑定`ngControl`属性赋值为你想要的JSON键名即可。

2. 也许你想要更复杂的JSON结构，别怕我们还有`ngControlGroup`没用呢。

   比如JSON结构如下：

   ```
   {
     name: {
     	firstname: 'Xiaoming',
     	lastname: 'Wang'
     },
     materials: {
     	address: 'Shanghan',
     	telphone: '12345678',
     	age: '18',
     	sex: 'male'
     }
   }
   ```

   就是多级结构吧。我们可以用`ngControlGroup`进行分组，html结构如下：

   ```
   <form #form="ngForm" (ngSubmit)="logForm(form.value)"> 
   	<div ngControlGroup="name">
   		<label>name:</label>
   		<input type="text" ngControl="firsename"> 
   		
   		<label>name:</label>
   		<input type="text" ngControl="lastname"> 
   	</div>
   	
   	<div ngControlGroup="materials">
   		<label>address:</label>
   		<input type="text" ngControl="address">
   		
   		<label>name:</label>
   		<input type="telphone" ngControl="telphone">
   		
   		<label>age:</label>
   		<input type="text" ngControl="age">
   		
   		<label>sex:</label>
   		<input type="text" ngControl="sex"> 
   	</div>
   	 <button type="submit">Submit</button>
   </form>
   ```

   使用`ngControl`和`ngControlGroup`可以构建各种复杂的JSON格式数据。这样就不需要我们在拿到input的值后再拼接JSON格式结构了。

   ​
## Validators 验证表单输入是否合法

1. ### **template-driven form** 纯模板结构的表单输入验证

   使用`ngControl`、`ngForm`、`#Var`定义和检查表单的输入规则。不需要在`Component`中写额外的逻辑验证方法。`form-model-tag.html`如下：

   ```
   <form #form="ngForm">
    <div class="form-group">
      <label class="col-sm-2">Name</label>
      <input type="text" class="col-sm-10"
        required
        ngControl="name"
        #name="ngForm"
        placeholder="name">
      <span [hidden]="name.valid">Name is required</span>
    </div>

    <div class="form-group">
      <label class="col-sm-2">Street</label>
      <input type="text" class="col-sm-10"
        minlength="3"
        ngControl="street"
        #street="ngForm"
        placeholder="street">
      <span [hidden]="street.valid">Street is invalid</span>
    </div>

    <div class="form-group">
      <label class="col-sm-2">email</label>
      <input type="email" class="col-sm-10"
        pattern="^[A-Za-z0-9]+\@[A-Za-z0-9]+[.][A-Za-z0-9]{2,5}"
        ngControl="email"
        #email="ngForm"
        placeholder="email">
      <span [hidden]="email.valid">Email is invalid</span>
    </div>

    <div class="form-group">
      <label class="col-sm-2">City</label>
      <input type="text" class="col-sm-10"
        maxlength="10"
        ngControl="city"
        #city="ngForm"
        placeholder="city">
      <span [hidden]="city.valid">city is required</span>
    </div>
    <div class="form-group">
      <label class="col-sm-2">Zip</label>
      <input type="text" class="col-sm-10"
        pattern="[A-Za-z]{5}"
        ngControl="zip"
        #zip="ngForm"
        required
        placeholder="zip">
      <span [hidden]="zip.valid">zip is invalid</span>
    </div>

    <div class="form-group">
      <button [disabled]="form.valid">Submit</button>
    </div>
   </form>
   ```

   然后在定义的组件中直接用`templateUrl`引用此template,就可以，简单代码如下：

   ```
   import {Component} from '@angular/core';

   @Component({
     selector: 'my-app',
     templateUrl: './src/ng-form-model/form-model-tag.html',
   })

   export class MyFormComponent {}
   ```

   这个组件没有定义任何方法，但是你可以看到如下界面：

   ![form-model-tag]( ![form-model-tag](https://github.com/RunningV/Notes/blob/master/img/form-model-tag.png))

   样式什么的就没有写，可以看到我输入不合法的内容后提示就会出现，当输入合法内容时提示会隐藏掉。

   下面以第一个输入项`name`来解读下template代码：

   ```
   <input type="text" class="col-sm-10"
        required
        ngControl="name"
        #name="ngForm"
        placeholder="name">
   <span [hidden]="name.valid">Name is required</span>
   ```

   看重点`input`上设置了3个属性：

   `required` ： 定义此项必填，这里并非input标签的属性，而是angular2内部的属性方法。

   `ngControl="name1"` ： 将`ngControl`赋值为`name1`,检测dom状态的变化。在组件内就是此input的键名。[关于`ngControl`的详解](https://github.com/RunningV/Notes/blob/master/ng2/ngForm.md)。

   ``#name="ngForm"`  ： 用`#`定义此dom节点并赋值为`ngForm`,关于节点名`name`与`ngControl`赋值的键名无关，所以写成`name1`区分。

   `[hidden]="name.valid"` ： 就是根据此节点的`valid`的值显示或隐藏提示功能，这里的`name`就是`#name`定义的此dom节点名。

   这三项属性定义`必须`,才能达到检测次input项是否输入的功能。

   当然，一个input项可以设置多个输入检测，比如此例第三个`email`输入项定义此项必须且要符合正则：

   ```
   pattern="[A-Za-z]{5}"  // 用pattern设置此项要符合的正则
   ngControl="zip"		   // 设置此项的键位zip
   #zip="ngForm"		   // 定义此dom节点为zip="ngForm"
   required               // 用required定义此项必须
   ```
   当然用纯**tempalte-driven**的方式虽然简单，但是并不容易写出更复杂的逻辑验证，而且这也违背了逻辑与dom结构分离的原则。下面介绍 **model-driven form**

2. ### **model-driven form** 表单验证。

   上面说的是模板驱动型，逻辑都是在模板中设置的。现在我们将表单验证放到组件中定义，dom结构`form-model.html`如下：

   ```
   <form class="" novalidate #form="ngForm" [ngFormModel]="myForm" (submit)="logForm(form.value)">
     <div class="form-group">
       <label class="col-sm-2">Name</label>
       <input type="text" class="col-sm-10" placeholder="name" ngControl="name">
       <span [hidden]="isValid('name')">Name is required</span>
     </div>

     <div class="form-group">
       <label class="col-sm-2">Street</label>
       <input type="text" class="col-sm-10" placeholder="street" ngControl="street">
       <span [hidden]="isValid('street')">Street is invalid</span>
     </div>

     <div class="form-group">
       <label class="col-sm-2">email</label>
       <input type="email" class="col-sm-10" placeholder="email" ngControl="email">
       <span [hidden]="isValid('email')">Email is invalid</span>
     </div>

     <div class="form-group">
       <label class="col-sm-2">City</label>
       <input type="text" class="col-sm-10" placeholder="city" ngControl="city">
       <span [hidden]="isValid('city')">city is required</span>
     </div>

     <div class="form-group">
       <label class="col-sm-2">Zip</label>
       <input type="text" class="col-sm-10" placeholder="zip" ngControl="zip">
       <span [hidden]="isValid('zip')">zip is invalid</span>
     </div>

     <div class="form-group">
       <button [disabled]="myForm.valid">Submit</button>
     </div>
   </form>
   ```

   可以看到每个input标签上只设置了`ngControl`属性赋值是此输入项的键名。Component代码如下：

   ```
   import {Component} from '@angular/core';
   import {ControlGroup, Control, Validators} from '@angular/common';

   @Component({
     selector: 'my-app',
     templateUrl: './src/ng-form-model/form-model.html',
   })

   export class MyFormComponent {

     myForm: ControlGroup;

     ngOnInit() {
       this.myForm = new ControlGroup({
         name:   new Control('', Validators.required),
         street: new Control('', Validators.minLength(3)),
         email:  new Control('',
          Validators.pattern('^[A-Za-z0-9]+\@[A-Za-z0-9]+[.]
                 [A-Za-z0-9]{2,5}')),
         city:   new Control('', Validators.maxLength(10)),
         zip:    new Control('', Validators.compose([
           Validators.pattern('[A-Za-z]{5}'),
           Validators.required
         ]))
       });
     }
     logForm(value: any) {
       console.log(this.myForm);
       console.log(value);
     }

     isValid(type): boolean {
       return this.myForm.controls[type].valid;
     }
   }

   ```

   通过`new ControlGroup()`传入对象将逻辑绑定到dom节点上用`ngControl`定义的键名input上。这里用到`Validators`这个组件定义验证输入的规则，比如：

   ```
   email:  new Control('', Validators.pattern('^[A-Za-z0-9]+\@[A-Za-z0-9]+[.][A-Za-z0-9]{2,5}')),
   ```

   new一个Control，用`Validators.pattern()`传入正则匹配email格式。正则的写法要注意：匹配数字或字母用`[A-Za-z0-9]`不能用`[\w]`，否则不起作用。

   如果要绑定多个验证规则可用`Validators.compose()`传入规则数组。比如zip的验证逻辑。

   这种将逻辑定义在组件内的方式和写在模板上的效果是一样的，但是感觉这样写代码逻辑是不是更清晰，你可以在组件内定义更多的方法验证表单输入内容。

3. ### 总结表单验证。

   ##### 1)  `Validators`一共用那些可用的验证逻辑呢，[去查查官网](https://angular.io/docs/ts/latest/api/common/index/Validators-class.html)。

   ```
   class Validators {
   	required(control:AbstractControl) : {[key: string]: boolean}
   	minLength(minLength: number) : ValidatorFn
   	maxLength(maxLength: number) : ValidatorFn
   	pattern(pattern: string) : ValidatorFn
   	nullValidator(c:AbstractControl) : {[key: string]: boolean}
   	compose(validators: ValidatorFn[]) : ValidatorFn
   	composeAsync(validators: AsyncValidatorFn[]) : 
       		AsyncValidatorFn
   }
   ```

   官网关于`Validators`类的定义一共有这7个方法，前四个一目了然。

   `nullValidators`是不需要验证(?半懂)；

   `compose`是传入验证数组；

   `composeAsync`异步绑定验证规则？

   ##### 2) 关于ngControl绑定dom的几种状态

   | 状态                | true       | false        |
   | :---------------- | :--------- | :----------- |
   | Control被访问(focus) | ng-touched | ng-untouched |
   | Control的值被改变      | ng-dirty   | ng-pristine  |
   | Control的值是合法的     | ng-valid   | ng-invalid   |

   这几个值分别在input被`focus`、`input`、`blur`、时触发状态，可以通过它们的值改变提示用户输入信息。也可以通过定义`css` 属性改变提示信息，比如：

   ```
   .ng-valid[required] {
     border-left: 5px solid #42A948;
   }

   .ng-invalid {
     border-left: 5px solid #a94442;
   }
   ```

   这里只用在css中定义`.ng-valid`、`.ng-invalid`这两个类名的样式，就可以显示提示输入的效果，这是为什么呢，你可以在控制台定位到input节点看看，发现只要绑定了ng-control的节点,dom结构是这样的：

   ````
   <input _ngcontent-tji-1="" 
   	class="col-sm-10 ng-dirty ng-valid ng-touched" 		
   	ngcontrol="name" placeholder="name" type="text">
   ````

   angular会自动加入`ng-dirty ng-valid ng-touched`这三个类名，你将输入改一下，会发现这三个类名根据相应的状态自动变为对应的false或true的类名。这样就了然了，有`.ng-valid`类在上面嘛，定义对应得样式自然会显示，只不过这些都是anguar自动为我们加的。

   ##### 3)关于ControlGroup()绑定验证规则，也可以用FormBuilder

   官网查看下`FormBuilder`组件，定义的属性如下：

   ```
   class FormBuilder {
   	group(controlsConfig: {[key: string]: any}, extra?: {[key: 	
   		string]: any}) : ControlGroup
   	control(value: Object, validator?: ValidatorFn, 	
   		asyncValidator?: AsyncValidatorFn) : Control
   	array(controlsConfig: any[], validator?: ValidatorFn, 	
   		asyncValidator?: AsyncValidatorFn) : ControlArray
   }
   ```

   有三个方法：

   `group` ：类型为`ControlGroup`，那就是传入验证对象群组。

   `control`： 类型为`Control`，绑定单个验证对象。

   `array`： 类型为`ControlArray`， 绑定验证数组？

   官网也有例子，[可以去看下就明白](https://angular.io/docs/ts/latest/api/common/index/FormBuilder-class.html)。

   ​


##数据在父组件与子组件之间传递
本章介绍通过Input与Output指令监听事件让数据在父组件与子组件之间传递。
代码如下：
```
import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'child',
  template: `
    <div>
      <form class="form-horizontal">
        <label>Name</label>
        <input type="email" placeholder="text"
              [(ngModel)]="dataToChild.name">

        <label>Email</label>
        <input type="email" placeholder="Email"
              [(ngModel)]="dataToChild.email">

        <label>Password</label>
        <input type="password" placeholder="Password"
              [(ngModel)]="dataToChild.password">
        <label>
           <input type="checkbox"
                  (ngModel)="dataToChild.checke"
                  [checked]="dataToChild.checke"> Remember me
              </label>
        <div class="form-group">
          <button type="submit" class="btn btn-default"
              (click)="sendData(dataToChild)">Sign in</button>
        </div>
      </form>
    </div>
  `
})
class ChildComponent {
  @Input() private dataToChild;     //从父组件导入数据
  @Output() private dataFromChild = new EventEmitter<Object>();  //导出数据

  ngOnInit() {
    console.log(this.dataToChild);
  }

  sendData(data: Object) {
    this.dataFromChild.emit(data);  //通过事件触发注入数据
  }

}

@Component({
  selector: 'my-app',
  template: `
    <div>
      <child
        [dataToChild]="parentData"  //传递数据到子组件
        (dataFromChild)="dataFromChild($event)"  //从子组件接受数据
        ></child>
    </div>
  `,
  directives: [ChildComponent]
})
export class DataFlow {
  private parentData: Object;

  ngOnInit() {
    this.parentData = {
      name: '',
      email: '',
      password: '',
      checke: false,
    }
  }

  dataFromChild(data: Object) {
    console.log(data);
  }
}
```

在这个例子中我们定义了父组件`DataFlow`和子组件`ChildComponent`，父组件模板中包含`<child>`标签，数据正是通过这个标签上的自定义属性传递的。
1. 父组件的`parentData`通过`[dataToChild]="parentData"`绑定传入子组件 `ChildComponent`，在ChildComponent中通过：
    ```
         @Input() private dataToChild;
    ```
    导入`dataToChild`自定义属性，这里导入的变量名必须与child标签传递的属性名一致，否则会报错child标签无xxx属性。通过这种方式接受到父组件传递的数据后就可以在子组件中使用了，这里我们直接将其展示位form表单。

2. 那么子组件如何提交数据变化到父组件呢？这里我们用事件检查的方式提交数据。
    在child标签中还自定义了一个属性：
    ```
    (dataFromChild)="dataFromChild($event)"
    ```
    `()`表明数据流出的，此标签的赋值为`dataFromChild($event)`，可以看到在父组件中有定义：
    ```
        dataFromChild(data: Object) {
            console.log(data);
        }
    ```
    就是直接打印出参数data，但是我们在标签child上引用时传递的参数却是`#event`，这是什么情况？先去子组件看看这个`dataFromChild`是怎么定义的。
    在ChildComponent中用如下代码：
    ```
        @Output() private dataFromChild = new EventEmitter<Object>();
    ```
    导出了dataFromChild属性，它是一个`EventEmitter`事件发射方法。

   在提交数据的`sendData()`方法中用：

    ```
        this.dataFromChild.emit(data);
    ```
    将表单数据又注入进EventEmitter中。然后在父组件中就获取了表单数据。原来这里是通过事件注入检查使父组件获取数据的。 这里我们可以写if语句判断要不要emit()数据到父组件。只有emit了数据父组件才会检测到数据。

3. 这种方式在组件中传递数据的使用场景
    适用于表单提交之类的事件点击后出发相应操作，比如一个独立的登录页，我们可以在子组件中判断数据是否符合基本的规则，然后选择要不要emitt给父组件。然后父组件获取数据进一步判断再发送不同的请求到不同的地址。
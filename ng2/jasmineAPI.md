###Jasmine单元测试常用API
```
    expect(fn).toThrow(e);                   //检查函数是否会抛出异常
    expect(instance).toBe(instance);
    expect(mixed).toBeDefined();             //检查是否定义
    expect(mixed).toBeFalsy();
    expect(number).toBeGreaterThan(number);  //检查变量是否大于
    expect(number).toBeLessThan(number);
    expect(mixed).toBeNull();
    expect(mixed).toBeTruthy();
    expect(mixed).toBeUndefined();
    expect(array).toContain(member);         //检查数组是否包含member元素
    expect(string).toContain(substring);
    expect(mixed).toEqual(mixed);
    expect(mixed).toMatch(pattern);          //匹配正则
```

```
    expect(fn()).toHaveBeenCalled()          //检查监听函数是否被调用过
    expect(fn('a','b')).toHaveBeenCalledWith('a')  //检查监听函数调用的函数信息
    beforeEach(fn)                           //测试前调用，在每个it前执行
    afterEach(fn)                            //在每个测试后被调用
    beforeAll(fn)                            //在所有it执行前调用一次
    afterAll(fn)                             //在所有it执行后调用一次
```

**this**关键字 ：在同一个describe中所有方法中this都相同
禁用describe与it
当在describe和it前面加上x前缀时,可以禁掉当前describe和it测试

当使用xit或者it里不包含函数体时,测试结果会显示挂起spec字样

[参考链接](http://www.ifeenan.com/javascript/2015-02-25-Jasmine%E4%B8%AD%E6%96%87%E6%8C%87%E5%8D%97/)
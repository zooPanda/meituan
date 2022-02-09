# 美团联盟node sdk

## 安装
```shell
    npm install meituan-union
    或
    yarn add meituan-union
```

## 开始使用
```javascript
    import meituan from "meituan-union"
    const mt = new meituan("在美团联盟后台找到你的apikey")
    mt.link(...对应参数).then(res=>{
        if(!res){
            console.log(res.data)
        }
    })
```

## 多说一句
>具体参数要求参考代码提示以及查看联盟官网API文档
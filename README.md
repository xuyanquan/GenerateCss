# GenerateCss for HTML Page


## 说明

生成整个HTML的CSS样式表格式 省去编写完HTML还要编辑粘贴复制CSS类名

需要引入 jquery 和 此文件 GenerateCss.js

## 例子

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
 <head>
  <title> New Document </title>
  <meta charset="utf-8" />
  <meta name="Generator" content="EditPlus">
  <meta name="Author" content="">
  <meta name="Keywords" content="">
  <meta name="Description" content="">
  <script type="text/javascript" src="jquery.min.js"></script>
  <script type="text/javascript" src="GenerateCss.js"></script>  
 </head>

 <body>
    <div class="article-head g-mod-shadow">
        <div class="article-wrap">
            <a href="/" class="article-logo"></a>
            <div class="article-user">
                <a href="#" class="article-name">twotk</a>
                <ul class="article-user-select">
                    <li class="article-user-option"><a href="#" class="optionlink">用户信息</a></li>
                    <li class="article-user-option"><a href="#" class="optionlink">用户信息</a></li>
                    <li class="article-user-option"><a href="#" class="optionlink">用户信息</a></li>
                </ul>
            </div>
        </div>
    </div>
    </body>
</html>
```

生成如下内容
```css
.article-head{ }
.article-head .article-logo{ }
.article-head .article-name{ }
.article-head .article-user{ }
.article-head .article-user-option{ }
.article-head .article-user-select{ }
.article-head .article-user-select .article-user-option{ }
.article-head .article-user-select .optionlink{ }
.article-head .article-wrap{ }
.article-head .optionlink{ }
```

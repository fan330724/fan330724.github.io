<?php
    header('content-type:text/html;charset=utf-8');
    // //api地址与请求参数(.$_GET['wd'])拼接-注意https请求需要到相应版本中php.ini中把extension=php_openssl.dll前面的;删掉，重启服务就可以了。
    // //相关参考文章https://www.jb51.net/article/44524.htm
    $url="https://movie.douban.com/j/subject_suggest?q=".$_GET['wd'];
    $content = file_get_contents($url);
    echo $content;
    
?>
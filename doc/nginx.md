
<!DOCTYPE HTML>
<html lang="" >
    <head>
        <meta charset="UTF-8">
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
        <title>nginx使用 · GitBook</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="">
        <meta name="generator" content="GitBook 3.2.3">
        
        
        
    
    <link rel="stylesheet" href="../gitbook/style.css">

    
            
                
                <link rel="stylesheet" href="../gitbook/gitbook-plugin-highlight/website.css">
                
            
                
                <link rel="stylesheet" href="../gitbook/gitbook-plugin-search/search.css">
                
            
                
                <link rel="stylesheet" href="../gitbook/gitbook-plugin-fontsettings/website.css">
                
            
        

    

    
        
    
        
    
        
    
        
    
        
    
        
    

        
    
    
    <meta name="HandheldFriendly" content="true"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <link rel="apple-touch-icon-precomposed" sizes="152x152" href="../gitbook/images/apple-touch-icon-precomposed-152.png">
    <link rel="shortcut icon" href="../gitbook/images/favicon.ico" type="image/x-icon">

    
    <link rel="next" href="flask.html" />
    
    
    <link rel="prev" href="gitbook.html" />
    

    </head>
    <body>
        
<div class="book">
    <div class="book-summary">
        
            
<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search" />
</div>

            
                <nav role="navigation">
                


<ul class="summary">
    
    

    

    
        
        
    
        <li class="chapter " data-level="1.1" data-path="../">
            
                <a href="../">
            
                    
                    介绍
            
                </a>
            

            
        </li>
    
        <li class="chapter " data-level="1.2" >
            
                <span>
            
                    
                    规范
            
                </span>
            

            
            <ul class="articles">
                
    
        <li class="chapter " data-level="1.2.1" data-path="../规范/接口规范.html">
            
                <a href="../规范/接口规范.html">
            
                    
                    接口规范
            
                </a>
            

            
        </li>
    
        <li class="chapter " data-level="1.2.2" data-path="../规范/服务端代码规范.html">
            
                <a href="../规范/服务端代码规范.html">
            
                    
                    服务端代码规范
            
                </a>
            

            
        </li>
    
        <li class="chapter " data-level="1.2.3" data-path="../规范/checklist.html">
            
                <a href="../规范/checklist.html">
            
                    
                    ML代码提交checklist
            
                </a>
            

            
        </li>
    

            </ul>
            
        </li>
    
        <li class="chapter " data-level="1.3" >
            
                <span>
            
                    
                    工具文档
            
                </span>
            

            
            <ul class="articles">
                
    
        <li class="chapter " data-level="1.3.1" data-path="gitbook.html">
            
                <a href="gitbook.html">
            
                    
                    gitbook使用
            
                </a>
            

            
        </li>
    
        <li class="chapter active" data-level="1.3.2" data-path="nginx.html">
            
                <a href="nginx.html">
            
                    
                    nginx使用
            
                </a>
            

            
        </li>
    
        <li class="chapter " data-level="1.3.3" data-path="flask.html">
            
                <a href="flask.html">
            
                    
                    flask使用
            
                </a>
            

            
        </li>
    

            </ul>
            
        </li>
    

    

    <li class="divider"></li>

    <li>
        <a href="https://www.gitbook.com" target="blank" class="gitbook-link">
            Published with GitBook
        </a>
    </li>
</ul>


                </nav>
            
        
    </div>

    <div class="book-body">
        
            <div class="body-inner">
                
                    

<div class="book-header" role="navigation">
    

    <!-- Title -->
    <h1>
        <i class="fa fa-circle-o-notch fa-spin"></i>
        <a href=".." >nginx使用</a>
    </h1>
</div>




                    <div class="page-wrapper" tabindex="-1" role="main">
                        <div class="page-inner">
                            
<div id="book-search-results">
    <div class="search-noresults">
    
                                <section class="normal markdown-section">
                                
                                <h4 id="&#x4FEE;&#x6539;nginx&#x914D;&#x7F6E;">&#x4FEE;&#x6539;nginx&#x914D;&#x7F6E;</h4>
<pre><code class="lang-bash">vi ~/nginx-1.17.0/nginx/conf/nginx.conf
</code></pre>
<h4 id="&#x542F;&#x52A8;nginx">&#x542F;&#x52A8;nginx</h4>
<pre><code class="lang-bash"><span class="hljs-built_in">cd</span> ~/nginx-1.17.0
sbin/nginx
</code></pre>
<h4 id="&#x5173;&#x95ED;nginx">&#x5173;&#x95ED;nginx</h4>
<pre><code class="lang-bash">ps -A | grep nginx
<span class="hljs-built_in">kill</span> -9 pid
</code></pre>

                                
                                </section>
                            
    </div>
    <div class="search-results">
        <div class="has-results">
            
            <h1 class="search-results-title"><span class='search-results-count'></span> results matching "<span class='search-query'></span>"</h1>
            <ul class="search-results-list"></ul>
            
        </div>
        <div class="no-results">
            
            <h1 class="search-results-title">No results matching "<span class='search-query'></span>"</h1>
            
        </div>
    </div>
</div>

                        </div>
                    </div>
                
            </div>

            
                
                <a href="gitbook.html" class="navigation navigation-prev " aria-label="Previous page: gitbook使用">
                    <i class="fa fa-angle-left"></i>
                </a>
                
                
                <a href="flask.html" class="navigation navigation-next " aria-label="Next page: flask使用">
                    <i class="fa fa-angle-right"></i>
                </a>
                
            
        
    </div>

    <script>
        var gitbook = gitbook || [];
        gitbook.push(function() {
            gitbook.page.hasChanged({"page":{"title":"nginx使用","level":"1.3.2","depth":2,"next":{"title":"flask使用","level":"1.3.3","depth":2,"path":"工具文档/flask.md","ref":"工具文档/flask.md","articles":[]},"previous":{"title":"gitbook使用","level":"1.3.1","depth":2,"path":"工具文档/gitbook.md","ref":"工具文档/gitbook.md","articles":[]},"dir":"ltr"},"config":{"gitbook":"*","theme":"default","variables":{},"plugins":[],"pluginsConfig":{"highlight":{},"search":{},"lunr":{"maxIndexSize":1000000,"ignoreSpecialCharacters":false},"sharing":{"facebook":true,"twitter":true,"google":false,"weibo":false,"instapaper":false,"vk":false,"all":["facebook","google","twitter","weibo","instapaper"]},"fontsettings":{"theme":"white","family":"sans","size":2},"theme-default":{"styles":{"website":"styles/website.css","pdf":"styles/pdf.css","epub":"styles/epub.css","mobi":"styles/mobi.css","ebook":"styles/ebook.css","print":"styles/print.css"},"showLevel":false}},"structure":{"langs":"LANGS.md","readme":"README.md","glossary":"GLOSSARY.md","summary":"SUMMARY.md"},"pdf":{"pageNumbers":true,"fontSize":12,"fontFamily":"Arial","paperSize":"a4","chapterMark":"pagebreak","pageBreaksBefore":"/","margin":{"right":62,"left":62,"top":56,"bottom":56}},"styles":{"website":"styles/website.css","pdf":"styles/pdf.css","epub":"styles/epub.css","mobi":"styles/mobi.css","ebook":"styles/ebook.css","print":"styles/print.css"}},"file":{"path":"工具文档/nginx.md","mtime":"2019-06-25T06:52:52.368Z","type":"markdown"},"gitbook":{"version":"3.2.3","time":"2021-01-19T07:37:17.864Z"},"basePath":"..","book":{"language":""}});
        });
    </script>
</div>

        
    <script src="../gitbook/gitbook.js"></script>
    <script src="../gitbook/theme.js"></script>
    
        
        <script src="../gitbook/gitbook-plugin-search/search-engine.js"></script>
        
    
        
        <script src="../gitbook/gitbook-plugin-search/search.js"></script>
        
    
        
        <script src="../gitbook/gitbook-plugin-lunr/lunr.min.js"></script>
        
    
        
        <script src="../gitbook/gitbook-plugin-lunr/search-lunr.js"></script>
        
    
        
        <script src="../gitbook/gitbook-plugin-sharing/buttons.js"></script>
        
    
        
        <script src="../gitbook/gitbook-plugin-fontsettings/fontsettings.js"></script>
        
    

    </body>
</html>


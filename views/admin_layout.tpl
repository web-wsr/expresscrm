<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
    <link rel="stylesheet" href="/stylesheets/admin.css">
    <link rel="stylesheet" href="/stylesheets/reset.css">
    {% block css %}
    {% endblock %}
</head>

<body>
    <div class="wrapper">
        <div class="page-header">
            <span>{{userInfo.name}}</span>
            <a id="logout" href="/admin/login">退出</a>
        </div>
        <div class="page-body">
            <div class="page-aside">
                <nav class="page-nav">
                    <ul id="page-nav-list">
                        <li id="nav-item" class="nav">
                            <a id="page-nav-item" class="page-nav-item" href="/admin/user">人员管理</a>
                        </li>
                        <li id="nav-item" class="nav">
                            <a id="page-nav-item" class="page-nav-item" href="/admin/clue">线索管理</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="page-content">
                {% block content %}
                {% endblock %}
            </div>
        </div>
        <footer class="page-footer">Copyright © 2019 极客学院体验技术部出品</footer>
    </div>

    {% block js %}
    <script src="/javascripts/jquery-3.7.1.min.js"></script>
    <script src="/javascripts/logout.js"></script>
    <script src="/javascripts/active.js"></script>
    {% endblock %}
</body>

</html>
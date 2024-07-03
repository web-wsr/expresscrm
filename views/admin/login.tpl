{% extends './../layout.tpl' %}

{% block css %}
<link rel="stylesheet" href="/stylesheets/admin_login.css" />
{% endblock %}

{% block content %}
<div class="wrapper">
    <div class="content-section">
        <img src="/images/mercedes-benz-logo-desktop.png" alt="">
    </div>
    <div class="form-section">
        <div class="form-container">
            <div class="form-title">MERCEDES-BENZ</div>
            <div class="form-item">
                <input id="userPhone" type="text" class="form-input" placeholder="请输入你的手机" />
            </div>
            <div class="form-item">
                <input id="userPassword" type="text" class="form-input" placeholder="请输入你的密码" />
            </div>
            <div class="form-item">
                <button id="userSubmit" class="form-button">登录</button>
            </div>
        </div>

    </div>
    <div class="content-footer">Copyright © 2019 极客学院体验技术部出品</div>
</div>
{% endblock %}

{% block js %}
<script src="/javascripts/jquery-3.7.1.min.js"></script>
<script src="/javascripts/login.js"></script>
{% endblock %}
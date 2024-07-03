{% extends './layout.tpl' %}

{% block css %}
<link rel="stylesheet" href="/stylesheets/index.css" />
{% endblock %}

{% block content %}
<div class="wrapper">
    <div class="content-section">
        <img src=" /images/mercedes-benz-logo-desktop.png" alt="">
    </div>
    <h1 class="content-title">预约试驾</h1>
    <div class="form-section">
        <div class="form-container">
            <div class="form-title">愿三叉星辉照亮你的事业和前程</div>
            <div class="form-item">
                <input id="userName" type="text" class="form-input" placeholder="你的姓名" />
            </div>
            <div class="form-item">
                <input id="userPhone" type="text" class="form-input" placeholder="你的电话" />
            </div>
            <div class="form-item">
                <button id="userSubmit" class="form-button">马上抢占名额</button>
            </div>
        </div>
    </div>
    <div class="content-footer">Copyright © 2019 极客学院体验技术部出品</div>
</div>
{% endblock %}

{% block js %}
<script src="/javascripts/jquery-3.7.1.min.js"></script>
<script src="/javascripts/index.js"></script>
{% endblock %}
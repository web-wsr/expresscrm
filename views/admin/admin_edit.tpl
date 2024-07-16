{% extends './../admin_layout.tpl' %}

{% block content %}
<div class="content-title">管理员详情（可编辑）</div>
<div class="content-control">
    <a class="back" href="/admin/admin">返回管理员列表 >></a>
</div>
<div class="form-section">
    <div class="form-item">
        <input id="adminName" type="text" class="form-input" placeholder="请输入姓名" value="{{user.name}}">
    </div>
    <div class="form-item">
        <input id="adminPhone" type="text" class="form-input" placeholder="请输入手机号" value="{{user.phone}}">
    </div>
    <div class="form-item">
        <input id="adminPassword" type="text" class="form-input" placeholder="请输入密码" value="{{user.password}}">
    </div>
</div>
<div class="form-item">
    <select class="form-input" id="adminRole">
        <option value="0">请选择角色</option>
        {% for role in allRoles %}
        <option value="{{role.id}}" {% if currentRoleIds.includes(role.id) %} selected {% endif%}>{{role.name}}</option>
        {% endfor %}
    </select>
</div>
<div class="form-item">
    <input id="adminId" type="text" hidden value="{{user.id}}">
    <button id="adminSubmit" class="form-button">保存管理员</button>
</div>
{% endblock %}

<!-- 引入jquery库和js文件 -->
{% block js %}
<script src="/javascripts/jquery-3.7.1.min.js"></script>
<script src="/javascripts/admin_edit.js"></script>
{% endblock %}
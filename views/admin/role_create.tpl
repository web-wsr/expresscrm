{% extends './../admin_layout.tpl' %}

{% block content %}
<div class="content-title">创建角色</div>
<div class="content-control">
    <a class="back" href="/admin/role">返回角色列表 >></a>
</div>
<div class="form-section">
    <div class="form-item">
        <p class="form-text">英文名称: </p>
        <input id="roleSlug" type="text" class="form-input" placeholder="请输入任务名称">
    </div>
    <div class="form-item">
        <p class="form-text">展示名称: </p>
        <input id="roleName" type="text" class="form-input" placeholder="请输入任务名称">
    </div>
    <div class="form-item">
        <p class="form-text">描述: </p>
        <textarea style="height: 50px;" id="roleDesc" class="form-textarea" placeholder="请输入该角色的描述"></textarea>
    </div>
</div>
<div class="form-premission">
    <h1 class="premission-title">权限信息</h1>

    {% for group in permissionsTransformAll %}
    <div class="premission-content">
        <h1 class="premission-group">{{ group.name }}</h1>
        <div class="premission-list">
            {% for permission in group.children %}
            <div class="premission-item">
                <input type="checkbox" id="{{ permission.id }}" class="premission-checkbox">
                <label for="{{ permission.id }}" class="premission-label">{{ permission.name }}</label>
            </div>
            {% endfor %}
        </div>
    </div>
    {% endfor %}
</div>


<div class="form-item">
    <button id="roleSubmit" class="form-button">创建角色</button>
</div>
{% endblock %}

<!-- 引入jquery库和js文件 -->
{% block js %}
<script src="/javascripts/jquery-3.7.1.min.js"></script>
<script src="/javascripts/role_create.js"></script>
{% endblock %}
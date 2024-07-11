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
        <input id="rolename" type="text" class="form-input" placeholder="请输入任务名称">
    </div>
    <div class="form-item">
        <p class="form-text">描述: </p>
        <textarea style="height: 50px;" id="roleDesc" class="form-textarea" placeholder="请输入该角色的描述"></textarea>
    </div>
</div>
<div class="form-premission">
    <h1 class="premission-title">权限信息</h1>
    <div class="premission-content">
        <h1 class="premission-group">人员管理</h1>
        <div class="premission-list">
            <div class="premission-item">
                <input type="checkbox" id="rolesList" name="premission-checkbox">
                <label for="rolesList" class="premission-label">角色-列表</label>
            </div>
            <div class="premission-item">
                <input type="checkbox" id="rolesCreate" name="premission-checkbox">
                <label for="rolesCreate" class="premission-label">角色-添加</label>
            </div>
            <div class="premission-item">
                <input type="checkbox" id="rolesUpdate" name="premission-checkbox">
                <label for="rolesUpdate" class="premission-label">角色-编辑</label>
            </div>
            <div class="premission-item">
                <input type="checkbox" id="rolesDelete" name="premission-checkbox">
                <label for="rolesDelete" class="premission-label">角色-删除</label>
            </div>
            <div class="premission-item">
                <input type="checkbox" id="rolesShow" name="premission-checkbox">
                <label for="rolesShow" class="premission-label">角色-详情</label>
            </div>
            <div class="premission-item">
                <input type="checkbox" id="personnelList" name="premission-checkbox">
                <label for="personnelList" class="premission-label">人员-列表</label>
            </div>
            <div class="premission-item">
                <input type="checkbox" id="personnelCreate" name="premission-checkbox">
                <label for="personnelCreate" class="premission-label">人员-添加</label>
            </div>
            <div class="premission-item">
                <input type="checkbox" id="personnelDelete" name="premission-checkbox">
                <label for="personnelDelete" class="premission-label">人员-删除</label>
            </div>
            <div class="premission-item">
                <input type="checkbox" id="personnelUpdate" name="premission-checkbox">
                <label for="personnelUpdate" class="premission-label">人员-编辑</label>
            </div>
        </div>
    </div>
    <div class="premission-content">
        <h1 class="premission-group">线索管理</h1>
        <div class="premission-list">
            <div class="premission-item">
                <input type="checkbox" id="clueList" name="premission-checkbox">
                <label for="clueList" class="premission-label">线索-列表</label>
            </div>
            <div class="premission-item">
                <input type="checkbox" id="clueTrack" name="premission-checkbox">
                <label for="clueTrack" class="premission-label">线索-跟踪</label>
            </div>
            <div class="premission-item">
                <input type="checkbox" id="clueCreate" name="premission-checkbox">
                <label for="clueCreate" class="premission-label">线索-记录添加</label>
            </div>
            <div class="premission-item">
                <input type="checkbox" id="clueUpdate" name="premission-checkbox">
                <label for="clueUpdate" class="premission-label">线索-客户编辑</label>
            </div>
        </div>
    </div>
</div>


<div class="form-item">
    <button id="userSubmit" class="form-button">创建角色</button>
</div>
{% endblock %}

<!-- 引入jquery库和js文件 -->
{% block js %}
<script src="/javascripts/jquery-3.7.1.min.js"></script>
<script src="/javascripts/user_create.js"></script>
{% endblock %}
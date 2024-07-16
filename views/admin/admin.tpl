{% extends './../admin_layout.tpl' %}

{% block content %}
<div class="content-title">管理员管理</div>
<div class="content-control">
    <a href="/admin/admin/create">创建管理员</a>
    <div class="content-filter">
        <select class="filter-input" id="adminRole">
            <option value="0">请选择角色</option>
            {% for val in roles %}
            <option value="{{val.id}}">{{val.name}}</option>
            {% endfor%}
        </select>
        <button id="roleFilter" class="filter-button">提交</button>
    </div>
</div>
<div class="content-table">
    <table class="table-container" id="adminTable">
        <thead>
            <tr>
                <th>ID</th>
                <th>姓名</th>
                <th>电话</th>
                <th>角色</th>
                <th>操作</th>
            </tr>
        </thead>

        <tbody>
            {% for val in admins %}
            <tr>
                <td>{{val.id}}</td>
                <td>{{val.name}}</td>
                <td>{{val.phone}}</td>
                {% for role in val.roles %}
                <td>{{role.name}}</td>
                {% endfor%}
                <td>
                    <a href="/admin/admin/{{val.id}}/edit">编辑</a>
                    <a class="delete" data-id="{{val.id}}" href="#">删除</a>
                </td>
            </tr>
            {% endfor%}
        </tbody>
    </table>
</div>
{% endblock %}

{% block js %}
<script src="/javascripts/jquery-3.7.1.min.js"></script>
<script src="/javascripts/admin_filter.js"></script>
<script src="/javascripts/admin_delete.js"></script>
{% endblock %}
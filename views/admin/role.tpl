{% extends './../admin_layout.tpl' %}

{% block content %}
<div class="content-title">角色管理</div>
<div class="content-control">
    <a href="/admin/role/create">创建角色</a>
</div>
<div class="content-table">
    <table class="table-container">
        <trs>
            <th>ID</th>
            <th>名称</th>
            <th>展示名称</th>
            <th>描述</th>
            <th>操作</th>
        </trs>

        {% for val in roles %}
        <tr>
            <td>{{val.id}}</td>
            <td>{{val.slug}}</td>
            <td>{{val.name}}</td>
            <td>{{val.description}}</td>
            <td>
                <a href="/admin/role/{{val.id}}/edit">查看</a>
                <a href="/admin/role/{{val.id}}/edit">删除</a>
            </td>
        </tr>
        {% endfor%}
    </table>
</div>
{% endblock %}
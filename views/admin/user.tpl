{% extends './../admin_layout.tpl' %}

{% block content %}
<div class="content-title">人员管理</div>
<div class="content-control">
    <a href="/admin/user/create">新增人员</a>
</div>
<div class="content-table">
    <table class="table-container">
        <trs>
            <th>ID</th>
            <th>姓名</th>
            <th>电话</th>
            <th>角色</th>
            <th>创建时间</th>
            <th>操作</th>
        </trs>
        <!-- <tr>
            <td>胡歌</td>
            <td>13534567777</td>
            <td>管理员</td>
            <td>2024-6-1</td>
            <td><a href="/admin/user/1/edit">编辑</a></td>
        </tr>
        <tr>
            <td>彭于晏</td>
            <td>13465981111</td>
            <td>管理员</td>
            <td>2024-6-1</td>
            <td><a href="/admin/user/2/edit">编辑</a></td>
        </tr>
        <tr>
            <td>周杰伦</td>
            <td>15623451111</td>
            <td>管理员</td>
            <td>2024-6-1</td>
            <td><a href="/admin/user/3/edit">编辑</a></td>
        </tr> -->
        {% for val in users %}
        <tr>
            <td>{{val.id}}</td>
            <td>{{val.name}}</td>
            <td>{{val.phone}}</td>
            <td>{{val.role_diplay}}</td>
            <td>{{val.created_time_display}}</td>
            <td><a href="/admin/user/{{val.id}}/edit">编辑</a></td>
        </tr>
        {% endfor%}
    </table>
</div>
{% endblock %}
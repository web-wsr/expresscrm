<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
    <link rel="stylesheet" href="/stylesheets/reset.css">
    {% block css%}
    {% endblock %}
</head>

<body>
    {% block content %}
    {% endblock %}

    {% block js %}
    {% endblock %}
</body>

</html>
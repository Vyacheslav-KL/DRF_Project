from django_filters import rest_framework as filters
from .models import Project, ToDo


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class TodoFilter(filters.FilterSet):
    name = filters.UUIDFilter(field_name='user')
    timestamp = filters.DateTimeFilter(field_name='created')

    class Meta:
        model = ToDo
        fields = ['user', 'created']

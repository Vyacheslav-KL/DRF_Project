from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination
from .serializers import *
from .models import Project, ToDo
from .filters import ProjectFilter, TodoFilter


class LimitOfProject(LimitOffsetPagination):
    default_limit = 10


class LimitOfTodo(LimitOffsetPagination):
    default_limit = 20


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = LimitOfProject
    filterset_class = ProjectFilter


class ToDoViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    pagination_class = LimitOfTodo
    filterset_class = TodoFilter

    def destroy(self, request, *args, **kwargs):
        todo = self.get_object()
        todo.active = False
        todo.save()
        return Response(status=status.HTTP_200_OK)

import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from users.models import User
from users.views import UserViewSet
from .views import ProjectViewSet, ToDoViewSet
from .models import Project, ToDo


class TestUserViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/projects/', {
            'name': 'project',
            'users': 'some_user',
            'repository': 'https://github.com/Admin/DRF_Project'
        }, format='json')
        view = ProjectViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_detail(self):
        User.objects.create_superuser(username='user123', email='user@gmail.ru', password='qwerty123456')
        client = APIClient()
        response = client.get('/api/users/1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        User.objects.create_superuser(username='qwerty', email='qwerty@mail.ru', password='qwerty123')
        client = APIClient()
        response = client.put('/api/users/1/', {'name': 'John'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestProject(APITestCase):

    def test_get_list(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_mixer(self):

        User.objects.create_superuser(username='qwerty', email='qwerty@mail.ru', password='qwerty123')
        mixer.blend(Project, users=[1])
        self.client.login(username='qwerty', password='qwerty123')
        response = self.client.post('/api/projects/', {
            'name': 'Project101',
            'users': 1,
            'repository': 'https://github.com/Admin/DRF_Project'
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

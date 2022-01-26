from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken import views
from rest_framework.routers import DefaultRouter
from users.views import *
from todoapp.views import *

router = DefaultRouter()
router.register('get-users', UserViewSet, basename='users')
router.register('projects', ProjectViewSet, basename='project')
router.register('todo', ToDoViewSet, basename='todo')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token),
]

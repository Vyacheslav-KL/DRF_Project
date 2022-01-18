from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.views import *
from todoapp.views import *

router = DefaultRouter()
router.register('get-users', UserViewSet, basename='users')
router.register('projects', ProjectViewSet)
router.register('todo', ToDoViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
]

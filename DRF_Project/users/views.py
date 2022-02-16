from rest_framework import mixins, viewsets
from .serializers import UserSerializer, NewUserSerializer
from .models import User


class UserViewSet(mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  viewsets.GenericViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.request.version == '1.2':
            return NewUserSerializer
        return UserSerializer

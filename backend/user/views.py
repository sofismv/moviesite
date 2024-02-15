from django.shortcuts import render
from .models import User
from .serializers import UserSerializer
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from rest_framework import viewsets, mixins, views, permissions
from rest_framework import exceptions

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def perform_create(self, serializer):
        user = User.objects.create_user(**serializer.validated_data)
        user.set_password(serializer.validated_data['password'])

        return user


class UserCurrent(views.APIView):
  def get(self, request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class FriendSearchViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    def get_queryset(self):
        queryset = User.objects.filter(
            username__icontains=self.request.GET.get('q', '')
        )
        return queryset

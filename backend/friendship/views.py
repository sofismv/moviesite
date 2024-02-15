from django.shortcuts import render
from django.db.models import Q
from .models import Frienship
from .models import User
from .serializers import FrienshipSerializer, UserSerializer
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework import viewsets, status, mixins, permissions, response


class FrienshipViewSet(viewsets.ModelViewSet):
  serializer_class = FrienshipSerializer
  queryset = Frienship.objects.all()

class FriendListView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        if 'user_id' in self.request.query_params:
            user = User.objects.get(id=self.request.query_params['user_id'])
            friendships = Frienship.objects.filter(
                Q(from_user=user) | Q(to_user=user),
                status=Frienship.FrienshipStatus.ACCEPTED.value
            )
            friend_ids = list(set([friendship.to_user.id if friendship.from_user == user else friendship.from_user.id for friendship in friendships]))
            return User.objects.filter(id__in=friend_ids)
        return super().get_queryset()

class RequestView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        if 'user_id' in self.request.query_params:
            user = User.objects.get(id=self.request.query_params['user_id'])
            requests = Frienship.objects.filter(
                to_user=user,
                status=Frienship.FrienshipStatus.PENDING.value
            )
            request_ids = list(set([request.from_user.id for request in requests]))
            return User.objects.filter(id__in=request_ids)
        return super().get_queryset()
    
    @action(detail=True, methods=['post'])
    def accept_request(self, request, pk=None):
        try:
            friendship = Frienship.objects.get(from_user=pk, to_user=request.user)
            print(pk, request.user)
        except Frienship.DoesNotExist:
            return response.Response({'error': 'No pending requests from this user to the current user'}, status=status.HTTP_404_NOT_FOUND)

        friendship.status = 'A'
        friendship.save()

        Frienship.objects.create(from_user=friendship.to_user, to_user=friendship.from_user, status='A')

        return response.Response({'status': 'Friend request accepted'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def send_request(self, request, pk=None):
        to_user = get_object_or_404(User, pk=pk) 
        Frienship.objects.create(from_user=request.user, to_user=to_user, status='P')
        return response.Response({'status': 'Friend request send'}, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['post'])
    def check_request(self, request, pk=None):
        try:
            request = Frienship.objects.get(from_user=request.user, to_user=pk, status='P')
        except Frienship.DoesNotExist:
            return response.Response({"exists": False}, status=200)

        return response.Response({"exists": True}, status=200)



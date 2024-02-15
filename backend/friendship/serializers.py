from rest_framework import serializers
from .models import Frienship
from user.serializers import UserSerializer


class FrienshipSerializer(serializers.ModelSerializer):
    from_user = UserSerializer(read_only=True)
    to_user = UserSerializer(read_only=True)

    class Meta:
        model = Frienship
        fields = ['id', 'from_user', 'to_user', 'status']
from rest_framework import serializers
from .models import WatchList
from user.serializers import UserSerializer
from film.serializers import FilmSerializer

class WatchListSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = WatchList
        fields = ['user', 'film', 'is_watched']
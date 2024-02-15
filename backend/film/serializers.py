from rest_framework import serializers
from .models import Film

class FilmSerializer(serializers.ModelSerializer):

  class Meta:
    model = Film
    fields = ['id', 'title', 'description', 'year', 'duration_min', 'country', 'genre', 'poster']


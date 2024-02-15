from django.shortcuts import render
from .models import Film
from .serializers import FilmSerializer
from rest_framework import viewsets, mixins, permissions, response
from django.db.models import Q
from django.db.models.functions import Upper
from django.http import JsonResponse


class FilmViewSet(viewsets.ModelViewSet):
    serializer_class = FilmSerializer
    queryset = Film.objects.all()

    def get_queryset(self):
        queryset = Film.objects.all()
        id = self.request.query_params.get('id', None)
        if id is not None:
            queryset = queryset.filter(id=id)
        return queryset



class FilmSearchViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Film.objects.filter(title__iregex=request.GET.get('q', ''))
        print(queryset)
        serializer = FilmSerializer(queryset, many=True)
        
        return response.Response(serializer.data)
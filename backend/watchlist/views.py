from django.shortcuts import render
from .models import WatchList
from user.models import User
from film.models import Film
from .serializers import WatchListSerializer
from film.serializers import FilmSerializer
from rest_framework import viewsets, mixins, permissions, response, status
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action, api_view


class WatchListViewSet(viewsets.ModelViewSet):
    serializer_class = WatchListSerializer
    queryset = WatchList.objects.all()

    def get_queryset(self):
        if 'user_id' in self.request.query_params:
            return WatchList.objects.filter(user=self.request.query_params['user_id'], is_watched=False)
        return WatchList.objects.filter(is_watched=False)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        return super().perform_create(serializer)

    @action(detail=True, methods=['post'])
    def check_watchlater(self, request, pk=None):
        try:
            watchlist = WatchList.objects.get(user=request.user, film=pk)
        except WatchList.DoesNotExist:
            return response.Response({"exists": False}, status=200)

        return response.Response({"exists": True}, status=200)

    @action(detail=True, methods=['get'])
    def get_common_watchlist(self, request, pk=None):        
        current_user = request.user
        selected_user = get_object_or_404(User, id=pk)
        print(current_user, selected_user)

        current_user_films = set(WatchList.objects.filter(user=current_user, is_watched=False).values_list('film', flat=True))
        selected_user_films = set(WatchList.objects.filter(user=selected_user, is_watched=False).values_list('film', flat=True))
        print(current_user_films, selected_user_films)

        common_films_ids = current_user_films.intersection(selected_user_films)

        common_films = Film.objects.filter(id__in=common_films_ids)

        serializer = FilmSerializer(common_films, many=True)

        return response.Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def mark_as_watched(self, request, pk=None):
        watchlist_item = get_object_or_404(WatchList, user=request.user, film=pk)
        watchlist_item.is_watched = True
        watchlist_item.save()
        return response.Response({ 'status': 'Film marked as watched.' }, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def remove_from_watchlist(self, request, pk=None):
        watchlist_item = get_object_or_404(WatchList, user=request.user, film=pk)
        watchlist_item.delete()
        return response.Response({ 'status': 'Film removed from watchlist.' }, status=status.HTTP_200_OK)


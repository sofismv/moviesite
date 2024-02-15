"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers
from film.views import FilmViewSet, FilmSearchViewSet
from user.views import UserViewSet, UserCurrent, FriendSearchViewSet
from friendship.views import FrienshipViewSet, FriendListView, RequestView
from watchlist.views import WatchListViewSet

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'film', FilmViewSet)
router.register(r'user', UserViewSet)
router.register(r'friendship', FrienshipViewSet)
router.register(r'friendlist', FriendListView)
router.register(r'request', RequestView)
router.register(r'watchlist', WatchListViewSet)
router.register(r'searchfilm', FilmSearchViewSet, basename='search_film')
router.register(r'searchfriend', FriendSearchViewSet, basename='search_friend')

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/current_user/', UserCurrent.as_view(), name="user_current"),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] + static(settings.STATIC_URL) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

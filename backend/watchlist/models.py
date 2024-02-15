from django.db import models
from user.models import User
from film.models import Film

class WatchList(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    film = models.ForeignKey(Film, on_delete=models.CASCADE)
    is_watched = models.BooleanField()

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'film'], name='unique_user_film'),
        ] 


    def __str__(self) -> str:
        return self.user.username + ' ' + self.film.title


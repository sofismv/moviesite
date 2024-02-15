from django.db import models
from user.models import User

class Frienship(models.Model):

    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friendship_from')
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friendship_to')

    class FrienshipStatus(models.TextChoices):
        PENDING = 'P', 'Pending'
        ACCEPTED = 'A', 'Accepted'

    status = models.CharField(
        max_length=1,
        choices=FrienshipStatus.choices,
        default=FrienshipStatus.PENDING 
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['from_user', 'to_user'], name='unique_friendship'),
        ]  

    def __str__(self) -> str:
        return self.from_user.username + ' ' + self.to_user.username


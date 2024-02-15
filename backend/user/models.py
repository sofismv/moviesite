from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    birth_dt = models.DateField(blank=True, null=True)
    bio = models.CharField(blank=True, max_length=200)
    photo = models.ImageField(upload_to="images/user", blank = True)

    def __str__(self) -> str:
        return self.username
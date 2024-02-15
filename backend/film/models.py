from django.db import models

class Film(models.Model):

    title = models.CharField(blank=True, max_length=100) 
    description = models.CharField(blank=True, max_length=150)
    year = models.IntegerField(blank=True)
    duration_min = models.IntegerField(blank=True)
    country = models.CharField(blank=True, max_length=50)
    genre = models.CharField(blank=True, max_length=100) 
    poster = models.CharField(blank=True, max_length=150) 

    def __str__(self) -> str:
        return self.title
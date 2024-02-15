import csv
from django.core.management import BaseCommand
from film.models import Film

class Command(BaseCommand):
    def handle(self, *args, **options):
        with open('film/management/commands/films.csv', 'r') as csv_file:
            reader = csv.DictReader(csv_file)
            for row in reader:
                Film.objects.get_or_create(
                    title=row['title'],
                    defaults={
                    'description' : row['description'],
                    'year' : row['year'],
                    'duration_min' : row['duration_min'],
                    'country' : row['country'],
                    'genre' : row['genre'],
                    'poster' : row['poster'],
                    }
                )
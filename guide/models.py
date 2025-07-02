from django.db import models
from django.urls import reverse

# Create your models here.

class Quote(models.Model):
    text = models.TextField("Текст цитаты")
    source = models.CharField("Источник", max_length=100)

    def __str__(self):
        return f'{str(self.text)[:40]}... ({self.source})'


class GuidePost(models.Model):
    CATEGORY_CHOICES = [
        ('travel_tips', 'Советы путешественникам'),
        ('historical_facts', 'Исторические факты'),
        ('magical_places', 'Магические места'),
    ]
    
    title = models.CharField("Заголовок", max_length=200)
    content = models.TextField("Основное содержание")
    location = models.CharField("Место", max_length=150)
    category = models.CharField(
        "Категория", 
        max_length=20, 
        choices=CATEGORY_CHOICES,
        default='travel_tips'
    )
    created_at = models.DateTimeField("Дата создания", auto_now_add=True)
    updated_at = models.DateTimeField("Дата обновления", auto_now=True)
    is_published = models.BooleanField("Опубликовано", default=False)
    
    class Meta:
        verbose_name = "Пост гида"
        verbose_name_plural = "Посты гида"
        ordering = ['-created_at']  # Сортировка по дате создания (новые сначала)
    
    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse('guide:post_detail', kwargs={'pk': self.pk})

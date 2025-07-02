from django.contrib import admin
from .models import Quote, GuidePost

# Register your models here.
admin.site.register(Quote)


@admin.register(GuidePost)
class GuidePostAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'location', 'is_published', 'created_at')
    list_filter = ('category', 'is_published', 'created_at')
    search_fields = ('title', 'content', 'location')
    list_editable = ('is_published',)
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('title', 'content', 'location')
        }),
        ('Классификация', {
            'fields': ('category', 'is_published')
        }),
        ('Временные метки', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ('created_at', 'updated_at')

from django.contrib import admin
from .models import Post, PostImage, Author, Profile 

# Allows you to upload/see images directly inside the Post page 
class PostImageInline(admin.TabularInline):
    model = PostImage
    extra = 1

class PostAdmin(admin.ModelAdmin):
    inlines = [PostImageInline]
    list_display = ('title', 'author', 'status', 'published_at')
    prepopulated_fields = {'slug': ('title',)}
    list_display = ('title', 'slug', 'status', 'created_at') # Helpful for verifying

admin.site.register(Post, PostAdmin)
admin.site.register(Author)  # 👈 Added Author
admin.site.register(Profile) # 👈 Added Profile

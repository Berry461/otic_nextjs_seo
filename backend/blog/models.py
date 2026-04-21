from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.utils import timezone
import os
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

# 1. New Author Model
class Author(models.Model):
    name = models.CharField(max_length=100)
    profile_picture = models.ImageField(upload_to='authors/', blank=True, null=True)
    bio = models.TextField(blank=True, help_text="Short bio for the author")

    def __str__(self):
        return self.name

class Post(models.Model):
    # Standard Fields
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=255, unique=True, blank=True, null=True)
    excerpt = models.TextField(max_length=500, blank=True)
    full_content = models.TextField() 
    category = models.CharField(max_length=100, default="General")
    image = models.ImageField(upload_to='blog_images/', blank=True, null=True)

    # Internal User
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='uploaded_posts')

    # Public Author
    author = models.ForeignKey(
        Author, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='posts',
        help_text="Select the author to display on the blog."
    )

    # Status & Scheduling
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    
    published_at = models.DateTimeField(default=timezone.now)
    created_at = models.DateTimeField(auto_now_add=True) 

    # SEO Tags
    tags = models.CharField(max_length=255, blank=True, help_text="Comma-separated tags for SEO")

    class Meta:
        ordering = ['-published_at']

    def save(self, *args, **kwargs):
        # If there is no slug, automatically create one from the title
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

# 👇 NEW: Gallery Image Model 
class PostImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='gallery_images')
    image = models.ImageField(upload_to='post_gallery/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.post.title}"

# Profile model
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    image = models.ImageField(upload_to='blog_images/', default='blog_images/default.jpg')

    def __str__(self):
        return f'{self.user.username} Profile'

@receiver(post_save, sender=Post)
@receiver(post_delete, sender=Post)
def trigger_frontend_build(sender, instance, **kwargs):
    """
    Creates a flag file in the /tmp/ directory whenever a blog is saved or deleted.
    A background script will look for this file to trigger the Vite build.
    """
    flag_path = '/var/www/oticweblog/flags/build_otic_frontend.flag'
    try:
        # Create an empty file
        open(flag_path, 'w').close()
        # Ensure anyone can read/delete it
        os.chmod(flag_path, 0o777)
    except Exception as e:
        print(f"Failed to create build flag: {e}")

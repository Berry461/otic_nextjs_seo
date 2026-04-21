from rest_framework import serializers
from .models import Post, Author, PostImage 

# 1. Serializer for the Author Dropdown
class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'name', 'profile_picture', 'bio']

class PostListSerializer(serializers.ModelSerializer):
    # Keep the author details so your frontend cards look good
    author_name = serializers.SerializerMethodField()
    author_image = serializers.SerializerMethodField()
    author_bio = serializers.ReadOnlyField(source='author.bio')

    class Meta:
        model = Post
        fields = [
            'id', 
            'title', 
            'slug',
            'excerpt',  # Only send the excerpt!
            'category', 
            'image',    # Main thumbnail
            'author_name',   
            'author_image',
            'author_bio',    
            'created_at',
            'status',
            'published_at',
            'tags'
        ]
        lookup_field = 'slug' 

    def get_author_name(self, obj):
        return obj.author.name if obj.author else "Otic Team"

    def get_author_image(self, obj):
        if obj.author and obj.author.profile_picture:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.author.profile_picture.url)
            return obj.author.profile_picture.url
        return None

# 2. Updated Post Serializer
class PostSerializer(serializers.ModelSerializer):
    # Read-Only: For displaying the author details
    # We use SerializerMethodField to customize the output
    author_name = serializers.SerializerMethodField()
    author_image = serializers.SerializerMethodField()
    author_bio = serializers.ReadOnlyField(source='author.bio')
    
    # Write-Only: For accepting the ID from the dropdown form
    author = serializers.PrimaryKeyRelatedField(
        queryset=Author.objects.all(),
        required=False,
        allow_null=True
    )

    # 👇 GALLERY SECTION
    # READ: Returns a list of full URLs for the frontend to display
    gallery_images = serializers.SerializerMethodField()
    
    # WRITE: Accepts a list of files from the upload form
    upload_gallery = serializers.ListField(
        child=serializers.ImageField(max_length=1000000, allow_empty_file=False, use_url=False),
        write_only=True,
        required=False
    )

    class Meta:
        model = Post
        fields = [
            'id', 
            'title', 
            'slug',
            'excerpt', 
            'full_content', 
            'category', 
            'image', 
            'uploaded_by',   
            'author',        
            'author_name',   
            'author_image',
            'author_bio',    
            'created_at',
            'status',
            'published_at',
            'tags',
            'gallery_images', # <--- Must be here
            'upload_gallery'  # <--- Must be here
        ]
        read_only_fields = ['uploaded_by', 'created_at']
        lookup_field = 'slug' 
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }

    # --- HELPER METHODS ---

    def get_author_name(self, obj):
        return obj.author.name if obj.author else "Otic Team"

    def get_author_image(self, obj):
        if obj.author and obj.author.profile_picture:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.author.profile_picture.url)
            return obj.author.profile_picture.url
        return None

    # 👇 This converts the database images into visual Links for the Frontend
    def get_gallery_images(self, obj):
        # This relies on related_name='gallery_images' in your models.py
        images = obj.gallery_images.all()
        request = self.context.get('request')
        
        if request:
            # Returns full URL: http://localhost:8000/media/uploads/pic.jpg
            return [request.build_absolute_uri(img.image.url) for img in images]
        
        # Fallback
        return [img.image.url for img in images]

    # --- CREATE & UPDATE ---

    def create(self, validated_data):
        # 1. Pop the gallery images (files) from the data
        gallery_data = validated_data.pop('upload_gallery', [])
        
        # 2. Create the Post normally
        post = Post.objects.create(**validated_data)

        # 3. Create the PostImage entries
        for image_file in gallery_data:
            PostImage.objects.create(post=post, image=image_file)
        
        return post

    def update(self, instance, validated_data):
        gallery_data = validated_data.pop('upload_gallery', [])
        
        # 1. Update standard fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # 2. Add NEW images to the existing gallery
        for image_file in gallery_data:
            PostImage.objects.create(post=instance, image=image_file)

        return instance

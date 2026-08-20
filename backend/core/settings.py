import os
from pathlib import Path
from dotenv import load_dotenv
from datetime import timedelta

# Load environment variables
load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/6.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv('DEBUG') == 'True'

ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '').split(',')

ALLOWED_HOSTS = [
    'www.oticsurveys.com',
    'oticsurveys.com',
    'localhost',
    '127.0.0.1'
]

CSRF_TRUSTED_ORIGINS = [
    'https://oticsurveys.com',
    'https://www.oticsurveys.com',
]

# Application definition

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",       # Keep for local testing
    "http://localhost:3000",       # Keep for local testing
    "https://oticsurveys.com",    # <--- ADD THIS (Production)
    "https://www.oticsurveys.com" # <--- ADD THIS (Production with www)
]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',  
    'rest_framework',
    'rest_framework_simplejwt',
    'blog',
]



MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'


# Database
# https://docs.djangoproject.com/en/6.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'landmattersdb',      # The full name from Phase 1, Step A
        'USER': 'landmattersuser',       # The full name from Phase 1, Step B
        'PASSWORD': 'Blogback@123', # The password from Phase 1, Step B
        'HOST': '127.0.0.1',            # On cPanel, this is almost always 'localhost'
        'PORT': '5432',                     # Leave empty to use default port
    }
}


# Password validation
# https://docs.djangoproject.com/en/6.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/6.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/6.0/howto/static-files/

STATIC_URL = 'static/'

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60), # Keeps you logged in for 1 hour
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),    # Keeps your refresh token valid for a week
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': False,
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10
}

CORS_ALLOW_CREDENTIALS = True

# CHANGE THESE TO FALSE
SECURE_SSL_REDIRECT = False

# 3. Tell Django not to worry if the request looks like HTTP
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# 4. Make sure this doesn't block local calls
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True



DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

DATA_UPLOAD_MAX_MEMORY_SIZE = 10 * 1024 * 1024  
FILE_UPLOAD_MAX_MEMORY_SIZE = 10 * 1024 * 1024  # 10 MB

STATIC_ROOT = os.path.join(BASE_DIR, 'static')

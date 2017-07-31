from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^auth/signup$', views.post_signup, name='post_signup'),
    url(r'^auth/login$', views.post_login, name='post_login'),
    url(r'^contact$', views.post_contact, name='post_contact'),
    url(r'^savecreditprofile$', views.post_savecreditprofile, name='post_savecreditprofile'),
    url(r'^photoupload$', views.post_photoupload, name='post_photoupload'),
    url(r'^savecontent$', views.post_savecontent, name='post_savecontent'),
    # url(r'^api-token-auth/', obtain_jwt_token),
]

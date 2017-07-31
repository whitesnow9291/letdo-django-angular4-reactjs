from django.contrib import admin

# Register your models here.
from .models import User,Portfolio,Contact,About
admin.site.register(User)
admin.site.register(Portfolio)
admin.site.register(Contact)
admin.site.register(About)
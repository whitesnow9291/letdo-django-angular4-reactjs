from django.db import models

# Create your models here.
class User(models.Model):
    fullname = models.CharField(max_length=120)    
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    right = models.CharField(max_length=64)
    status = models.CharField(max_length=64)
    class Meta:
        db_table  = 'user'
class Portfolio(models.Model):
    photo = models.CharField(max_length=1024)    
    content = models.TextField()
    in_front = models.CharField(max_length=64)
    user = models.ForeignKey(User,db_column='u_id', on_delete=models.CASCADE)
    class Meta:
        db_table  = 'portfolio'
class Contact(models.Model):
    name = models.CharField(max_length=128)    
    address = models.CharField(max_length=256)  
    email = models.EmailField()
    phone_number = models.CharField(max_length=64)
    subject = models.CharField(max_length=128)
    message = models.TextField()
    class Meta:
        db_table  = 'contact'
class About(models.Model):
    gallery = models.CharField(max_length=1024)
    content = models.TextField()
    class Meta:
        db_table  = 'about'
    
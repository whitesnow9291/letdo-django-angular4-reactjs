from django.shortcuts import render
from django.db import IntegrityError
from .models import User
from .models import Portfolio
from .models import Contact
from django.http import JsonResponse
import logging
import json

from rest_framework_jwt.settings import api_settings
from django.conf import settings
from django.core.files.storage import FileSystemStorage


jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
# Create your views here.


def post_signup(request):

    if request.method == 'POST':
        json_data = json.loads(request.body)
        user = User(fullname=json_data['fullname'], email=json_data['email'],
                    password=json_data['password'], right='user', status='pending')
        try:
            result = user.save()
            return JsonResponse({'status': 'ok'})
        except IntegrityError, err:
            return JsonResponse({'status': 'no', 'message': str(err)})


def post_login(request):

    if request.method == 'POST':

        json_data = json.loads(request.body)
        try:
            user = User.objects.get(
                email=json_data['email'], password=json_data['password'])
            print user
            token = {
                'id': user.id,
                'fullname': user.fullname,
                'email': user.email,
                'right': user.right,
                'status': user.status
            }
            return JsonResponse({'status': 'ok', 'token': token})
        except User.DoesNotExist:
            return JsonResponse({'status': 'no', 'message': 'Email or Password not exists'})


def post_contact(request):

    if request.method == 'POST':
        json_data = json.loads(request.body)

        try:
            contact = Contact(name=json_data['name'], email=json_data['email'], address=json_data['address'], phone_number=json_data['phone_number'],
                              message=json_data['message'], subject=json_data['subject'])
            result = contact.save()
            return JsonResponse({'status': 'ok'})
        except IntegrityError, err:
            return JsonResponse({'status': 'no', 'message': str(err)})


def post_savecreditprofile(request):

    if request.method == 'POST':
        json_data = json.loads(request.body)
        header = request.META['HTTP_AUTHORIZATION']
        auth = header.replace('Bearer ', '')
        user = json.loads(auth)

        try:
            User.objects.filter(id=user['id']).update(
                fullname=json_data['fullname'], email=json_data['email'], password=json_data['password'])
            return JsonResponse({'status': 'ok'})
        except IntegrityError, err:
            return JsonResponse({'status': 'no', 'message': str(err)})

def post_photoupload(request):

    if request.method == 'POST' and request.FILES:
        header = request.META['HTTP_AUTHORIZATION']
        auth = header.replace('Bearer ', '')
        user = json.loads(auth)

        myfile = request.FILES['image']
        print myfile
        fs = FileSystemStorage()
        filename = fs.save(myfile.name, myfile)
        uploaded_file_url = fs.url(filename)

        usertbl = User.objects.get(id=user['id'])

        obj, created = Portfolio.objects.update_or_create(user= usertbl, defaults={'photo': uploaded_file_url})
    
        return JsonResponse({'status': 'ok', 'uploaded_file_url': uploaded_file_url})
        
def post_savecontent(request):

    if request.method == 'POST' :
        json_data = json.loads(request.body)
        
        header = request.META['HTTP_AUTHORIZATION']
        auth = header.replace('Bearer ', '')
        user = json.loads(auth)

        usertbl = User.objects.get(id=user['id'])
        print json_data
        obj, created = Portfolio.objects.update_or_create(user= usertbl, defaults={'content':json_data['content'] })
    
        return JsonResponse({'status': 'ok'})

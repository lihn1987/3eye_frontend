from django.http import HttpResponse
from .forms import UploadFileForm
import os
import shutil

import urllib.request
# Imaginary function to handle an uploaded file.
# from somewhere import handle_uploaded_file
 
def hello(request):
    return HttpResponse("Hello world! ") 

def upload(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        print("???")
        print(request.POST)
        print(request.FILES)
        # print(form)
        if form.is_valid():
            write_file(request.FILES['file'], request.POST["hash"])
 
            urllib.request.urlopen('http://eye_chain_api:3000/api/upload_file?hash=%s'%request.POST["hash"])
            return HttpResponse("11111") 
    else:
        form = UploadFileForm()
        print(form)
    return HttpResponse("22222") 

# 如果文件已经存在则不再上传
def write_file(file, hash):
    if not os.path.isfile('./upload/%s'%hash):
        print(not os.path.isfile('./upload/%s'%hash))
        print(os.path.isfile('./upload/%s'%hash))
        with open('./upload/%s.tmp'%hash, 'wb') as destination:
            for chunk in file.chunks():
                destination.write(chunk)
        shutil.move('./upload/%s.tmp'%hash, './upload/%s'%hash)
        print("write new")
    else:
        print("no write")
        
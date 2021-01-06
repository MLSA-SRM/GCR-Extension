import flask as Flask
from flask import Flask, request, jsonify, Response, send_file
from flask_cors import CORS
import os
import json
import sys
import wget
import zipfile
import io
import pathlib
import ssl
import certifi

app = Flask(__name__)
app.use_x_sendfile = True
CORS(app, support_credentials=True)

#-----Routes------

# default api endpoint [TEST]
@app.route('/', methods=['GET'])
def hello_world():
    response = jsonify({'data': 'Default API Endpoint'})
    return response

# return article data sent from ext
ssl._create_default_https_context = ssl._create_unverified_context

@app.route('/RetPost', methods=['POST'])
def return_article_post_test():
    print('called /RetPost')
    req = json.loads(request.data)
    for i in req["URL"]:
        print(i)
        request_zip(i)
    return req

 #download and zip file   
@app.route('/download-zip')
def request_zip(url):
    for _ in url:
        a= os.path.abspath(__file__)
        wget.download(url, a)
    base_path =pathlib.Path(a)
    data = io.BytesIO()
    with zipfile.ZipFile(data, mode='w') as z:
        for f_name in base_path.iterdir():
            z.write(f_name)
    data.seek(0)

    return send_file(
        data,
        mimetype='application/zip',
        as_attachment=True,
        attachment_filename='data.zip'
    
    )
a= os.path.abspath(__file__)
base_path =pathlib.Path(a)
os.remove(base_path)
    
if __name__ == '__main__':
    app.run(debug=True)


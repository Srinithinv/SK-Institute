import urllib.request
import re

url = 'https://pin.it/4SuGLd9lB'

req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    response = urllib.request.urlopen(req)
    html = response.read().decode('utf-8')
    
    matches = re.findall(r'"(https://v1\.pinimg\.com/videos/.*?\.mp4)"', html)
    if not matches:
        matches = re.findall(r'"(https://[^"\'\s]*?\.mp4)"', html)
        
    if matches:
        mp4_url = matches[0].replace('\\/', '/')
        print('Found video URL:', mp4_url)
        urllib.request.urlretrieve(mp4_url, 'public/hero-bg.mp4')
        print('Successfully downloaded to public/hero-bg.mp4')
    else:
        print('No mp4 URL found in page source')
except Exception as e:
    print('Error:', e)

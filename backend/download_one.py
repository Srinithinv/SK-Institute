import sys
from duckduckgo_search import DDGS
import requests
import warnings
warnings.filterwarnings("ignore")

query = sys.argv[1]
filepath = sys.argv[2]

try:
    with DDGS() as ddgs:
        results = list(ddgs.images(query, safesearch='on', size='Large', max_results=3))
        for res in results:
            try:
                img_url = res['image']
                response = requests.get(img_url, timeout=10, headers={'User-Agent': 'Mozilla/5.0'})
                if response.status_code == 200:
                    with open(filepath, 'wb') as f:
                        f.write(response.content)
                    print("SUCCESS")
                    sys.exit(0)
            except Exception:
                continue
    print("FAILED")
except Exception as e:
    print(f"FAILED: {e}")

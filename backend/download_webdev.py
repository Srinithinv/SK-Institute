import os
import requests
from duckduckgo_search import DDGS
import psycopg2
import time

# Connect to database by parsing .env manually
env_vars = {}
with open(os.path.join(os.path.dirname(__file__), '.env')) as f:
    for line in f:
        if line.strip() and not line.startswith('#'):
            key, val = line.strip().split('=', 1)
            env_vars[key] = val

conn = psycopg2.connect(
    dbname=env_vars.get('DB_NAME', 'skinstitute'),
    user=env_vars.get('DB_USER', 'postgres'),
    password=env_vars.get('DB_PASSWORD', 'postgres'),
    host=env_vars.get('DB_HOST', 'localhost'),
    port=env_vars.get('DB_PORT', '5432')
)
cur = conn.cursor()

courses_dir = os.path.join(os.path.dirname(__file__), '../frontend/public/courses')
os.makedirs(courses_dir, exist_ok=True)

def download_image(query, filepath):
    if os.path.exists(filepath):
        print(f"Skipping {filepath} (already exists)")
        return True
        
    print(f"Searching for: {query}")
    try:
        with DDGS() as ddgs:
            results = list(ddgs.images(
                query,
                safesearch='on',
                size='Large',
                layout='Wide',
                max_results=15
            ))
            
            for res in results:
                try:
                    img_url = res['image']
                    response = requests.get(img_url, timeout=10, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
                    if response.status_code == 200:
                        with open(filepath, 'wb') as f:
                            f.write(response.content)
                        print(f"Successfully downloaded image for {query}")
                        return True
                except Exception as e:
                    # Silently continue to next image URL
                    continue
    except Exception as e:
        print(f"DDGS error for {query}: {e}")
    return False

def fix_webdev_images():
    cur.execute("""
        SELECT id, title FROM content_courses 
        WHERE category = 'Web Development'
    """)
    rows = cur.fetchall()
    
    print(f"Found {len(rows)} active courses in Web Development...")
    
    for row in rows:
        course_id = row[0]
        title = row[1]
        
        # specific keywords to ensure high quality
        search_query = f"{title} web development logo aesthetic dark mode"
        
        filename = f"webdev_{course_id}.jpg"
        filepath = os.path.join(courses_dir, filename)
        
        success = download_image(search_query, filepath)
        
        if success:
            cur.execute("UPDATE content_courses SET image_url = %s WHERE id = %s", (f"/courses/{filename}", course_id))
            conn.commit()
            
        time.sleep(1.5) # Be nice to the API

    cur.close()
    conn.close()
    print("Web Development images downloaded and DB updated!")

if __name__ == "__main__":
    fix_webdev_images()

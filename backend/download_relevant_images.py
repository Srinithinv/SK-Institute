import os
import requests
from duckduckgo_search import DDGS
import psycopg2
import time

# Connect to database
conn = psycopg2.connect(
    dbname=os.environ.get('DB_NAME', 'skinstitute'),
    user=os.environ.get('DB_USER', 'postgres'),
    password=os.environ.get('DB_PASSWORD', 'postgres'),
    host=os.environ.get('DB_HOST', 'localhost'),
    port=os.environ.get('DB_PORT', '5432')
)
cur = conn.cursor()

courses_dir = os.path.join(os.path.dirname(__file__), '../frontend/public/courses')
os.makedirs(courses_dir, exist_ok=True)

def download_image(query, filepath):
    if os.path.exists(filepath):
        return True
        
    print(f"Searching for: {query}")
    try:
        with DDGS() as ddgs:
            results = list(ddgs.images(
                query,
                safesearch='on',
                size='Large',
                layout='Wide',
                max_results=3
            ))
            
            for res in results:
                try:
                    img_url = res['image']
                    response = requests.get(img_url, timeout=10, headers={'User-Agent': 'Mozilla/5.0'})
                    if response.status_code == 200:
                        with open(filepath, 'wb') as f:
                            f.write(response.content)
                        print(f"Successfully downloaded image for {query}")
                        return True
                except Exception as e:
                    print(f"Failed one image URL for {query}: {e}")
                    continue
    except Exception as e:
        print(f"DDGS error for {query}: {e}")
    return False

def fix_real_images():
    # Only get the active categories
    cur.execute("""
        SELECT id, title, category FROM content_courses 
        WHERE category IN ('Artificial Intelligence', 'Data Science & Analytics', 'Machine Learning', 'Full Stack Development', 'DevOps')
    """)
    rows = cur.fetchall()
    
    print(f"Found {len(rows)} active courses to download relevant images for...")
    
    for row in rows:
        course_id = row[0]
        title = row[1]
        category = row[2]
        
        filename = f"relevant-{course_id}.jpg"
        filepath = os.path.join(courses_dir, filename)
        
        # Make the search query highly relevant
        query = f"{title} programming technology"
        
        success = download_image(query, filepath)
        
        if success:
            cur.execute("UPDATE content_courses SET image_url = %s WHERE id = %s", (f"/courses/{filename}", course_id))
            conn.commit()
            
        time.sleep(1) # Be nice to the API

    cur.close()
    conn.close()
    print("All relevant images downloaded and DB updated!")

if __name__ == "__main__":
    fix_real_images()

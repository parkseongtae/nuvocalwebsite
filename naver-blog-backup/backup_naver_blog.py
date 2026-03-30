import os
import re
import json
import time
import requests
import feedparser
from bs4 import BeautifulSoup

BLOG_ID = "cha_j212"
RSS_URL = f"https://rss.blog.naver.com/{BLOG_ID}.xml"
BASE_VIEW = "https://blog.naver.com/PostView.naver"

OUT_DIR = os.path.join(os.path.dirname(__file__), "export")
POST_DIR = os.path.join(OUT_DIR, "posts")
IMG_DIR = os.path.join(OUT_DIR, "images")

os.makedirs(POST_DIR, exist_ok=True)
os.makedirs(IMG_DIR, exist_ok=True)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
}


def sanitize_filename(s: str) -> str:
    s = re.sub(r"[\\/:*?\"<>|]+", "_", s)
    return s.strip()[:120]


def download_image(url: str, idx: int) -> str | None:
    try:
        r = requests.get(url, headers=HEADERS, timeout=20)
        if r.status_code == 200:
            ext = ".jpg"
            if "png" in url.lower():
                ext = ".png"
            name = f"img_{int(time.time()*1000)}_{idx}{ext}"
            path = os.path.join(IMG_DIR, name)
            with open(path, "wb") as f:
                f.write(r.content)
            return name
    except Exception:
        return None
    return None


def extract_post(blog_id: str, log_no: str) -> dict | None:
    params = {"blogId": blog_id, "logNo": log_no}
    try:
        r = requests.get(BASE_VIEW, params=params, headers=HEADERS, timeout=20)
        if r.status_code != 200:
            return None
        soup = BeautifulSoup(r.text, "lxml")

        # title
        title_el = soup.select_one(".se-title-text, .pcol1")
        title = title_el.get_text(strip=True) if title_el else f"post_{log_no}"

        # content container (new editor)
        content_el = soup.select_one(".se-main-container")
        if not content_el:
            # fallback (old editor)
            content_el = soup.select_one("#postViewArea")

        if not content_el:
            return None

        # download images and rewrite src
        img_map = {}
        for i, img in enumerate(content_el.select("img")):
            src = img.get("data-lazy-src") or img.get("src")
            if not src:
                continue
            local = download_image(src, i)
            if local:
                img_map[src] = local
                img["src"] = f"../images/{local}"

        # convert to markdown-ish text
        text = []
        for el in content_el.descendants:
            if getattr(el, "name", None) in ["p", "div"]:
                t = el.get_text(strip=True)
                if t:
                    text.append(t)

        body = "\n\n".join(text)

        return {
            "logNo": log_no,
            "title": title,
            "body": body,
        }
    except Exception:
        return None


def main():
    feed = feedparser.parse(RSS_URL)
    items = feed.entries

    results = []

    for it in items:
        link = it.get("link")
        if not link:
            continue

        # extract logNo from link
        m = re.search(r"logNo=(\\d+)", link)
        if not m:
            continue
        log_no = m.group(1)

        data = extract_post(BLOG_ID, log_no)
        if not data:
            continue

        fname = sanitize_filename(data["title"]) + f"_{log_no}.md"
        fpath = os.path.join(POST_DIR, fname)

        with open(fpath, "w", encoding="utf-8") as f:
            f.write(f"# {data['title']}\n\n{data['body']}\n")

        results.append({
            "logNo": log_no,
            "title": data["title"],
            "file": fname,
        })

        print(f"Saved: {fname}")
        time.sleep(1)

    with open(os.path.join(OUT_DIR, "index.json"), "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    print("Done.")


if __name__ == "__main__":
    main()

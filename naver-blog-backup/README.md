# Naver Blog Backup Tool

This folder contains a small backup utility for exporting the public posts from the Naver blog `cha_j212` into Markdown files and local images, then committing the exported content into this repository.

## What it does

- Reads the blog RSS feed for the blog id `cha_j212`
- Downloads each post page
- Extracts the title, published date, and main body
- Downloads post images into a local `images/` folder
- Saves one Markdown file per post under `export/posts/`
- Writes an `index.json` manifest

## Important limitation

Naver can change its HTML structure or block automated requests. If that happens, this script may need selector updates or a logged-in browser session.

## Files

- `backup_naver_blog.py`: main exporter
- `requirements.txt`: Python dependencies

## Run locally

```bash
cd naver-blog-backup
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python backup_naver_blog.py
```

## Output

The script writes files to:

- `naver-blog-backup/export/posts/*.md`
- `naver-blog-backup/export/images/*`
- `naver-blog-backup/export/index.json`

## Commit exported content

```bash
git add naver-blog-backup/export
git commit -m "Add exported Naver blog backup"
git push
```

## Notes

- The RSS endpoint used by the script is `https://rss.blog.naver.com/cha_j212.xml`.
- If you want full-fidelity migration including comments, private posts, or posts not present in RSS, a logged-in browser based exporter is a better fit.

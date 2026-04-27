# Pexels poster thumbnail URL returns HTML, not an image

## What the problem was
The Pexels "free video thumbnail" URL pattern
`https://images.pexels.com/videos/{id}/free-video-{id}.jpg?auto=compress&cs=tinysrgb&w=1920`
returns an HTML redirect/error page rather than a JPEG when fetched via `curl -L`. The `file` command on the downloaded file reports "HTML document text".

## What the fix was
Used Python's `PIL` (Pillow) to generate a proper 1920×1080 black JPEG placeholder:
```python
from PIL import Image
img = Image.new('RGB', (1920, 1080), (0, 0, 0))
img.save('public/hero-poster.jpg', 'JPEG')
```
Added a raw-bytes fallback for environments without Pillow.

## Why it happened
Pexels requires an authenticated session or a specific API endpoint to download video thumbnails programmatically. The public URL works in a browser (which sends cookies/session headers) but not via a bare curl.

## What to watch for in the future
- Always verify downloaded images with `file <path>` before committing — if it says "HTML document text", the URL failed silently.
- For production, replace `public/hero-poster.jpg` with a real frame from the gym's own video, or host a compressed still on Cloudinary.
- Pexels video files themselves (`.mp4`) work fine via direct URL; only their thumbnail endpoints are restricted.

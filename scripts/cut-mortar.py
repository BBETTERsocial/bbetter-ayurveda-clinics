from PIL import Image
from collections import deque

src = r"c:\Users\Grest\Desktop\BBetter-Ayurveda-Clinics\bbetter-ayurvedic-clinic\public\images\hero\mortar-raw.jpg"
out = r"c:\Users\Grest\Desktop\BBetter-Ayurveda-Clinics\bbetter-ayurvedic-clinic\public\images\hero\mortar-mark.png"

im = Image.open(src).convert("RGBA")
w, h = im.size
pix = im.load()

def lum(x, y):
    r, g, b, _ = pix[x, y]
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

# Flood-fill near-black from edges (true cutout)
THRESH = 38
visited = [[False] * w for _ in range(h)]
q = deque()

for x in range(w):
    q.append((x, 0))
    q.append((x, h - 1))
for y in range(h):
    q.append((0, y))
    q.append((w - 1, y))

while q:
    x, y = q.popleft()
    if x < 0 or y < 0 or x >= w or y >= h or visited[y][x]:
        continue
    visited[y][x] = True
    if lum(x, y) > THRESH:
        continue
    r, g, b, _ = pix[x, y]
    # soft alpha by luminance
    L = lum(x, y)
    a = 0 if L < 22 else int(255 * (L - 22) / max(1, THRESH - 22))
    pix[x, y] = (r, g, b, a)
    for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
        if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx]:
            q.append((nx, ny))

# Also knock out remaining very dark isolated bg pockets near edges (second pass luminance)
for y in range(h):
    for x in range(w):
        r, g, b, a = pix[x, y]
        L = 0.2126 * r + 0.7152 * g + 0.0722 * b
        # only soften near-black that is still fully opaque and dark
        if a > 200 and L < 12:
            # keep subject metal (has neighbors that are brighter) — skip if mixed neighborhood
            bright_n = 0
            for nx, ny in ((x + 2, y), (x - 2, y), (x, y + 2), (x, y - 2)):
                if 0 <= nx < w and 0 <= ny < h:
                    if lum(nx, ny) > 50:
                        bright_n += 1
            if bright_n == 0:
                pix[x, y] = (r, g, b, 0)

bbox = im.getbbox()
if bbox:
    pad = 20
    x0 = max(0, bbox[0] - pad)
    y0 = max(0, bbox[1] - pad)
    x1 = min(w, bbox[2] + pad)
    y1 = min(h, bbox[3] + pad)
    im = im.crop((x0, y0, x1, y1))

max_w = 900
if im.width > max_w:
    ratio = max_w / im.width
    im = im.resize((max_w, int(im.height * ratio)), Image.Resampling.LANCZOS)

im.save(out, "PNG", optimize=True)
print("saved", out, im.size, "mode", im.mode)

"""Improve mortar cutout: hard edges, contrast, mute greens toward charcoal botanical."""
from PIL import Image, ImageEnhance, ImageFilter
from collections import deque

src = r"c:\Users\Grest\Desktop\BBetter-Ayurveda-Clinics\bbetter-ayurvedic-clinic\public\images\hero\mortar-raw.jpg"
out = r"c:\Users\Grest\Desktop\BBetter-Ayurveda-Clinics\bbetter-ayurvedic-clinic\public\images\hero\mortar-mark.png"

im = Image.open(src).convert("RGBA")
w, h = im.size
pix = im.load()


def lum(x, y):
    r, g, b, _ = pix[x, y]
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


# Harder edge cutout from black background
THRESH = 42
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
    # Hard alpha — no soft fringe
    pix[x, y] = (0, 0, 0, 0)
    for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
        if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx]:
            q.append((nx, ny))

# Knock remaining near-black pockets
for y in range(h):
    for x in range(w):
        r, g, b, a = pix[x, y]
        if a == 0:
            continue
        L = 0.2126 * r + 0.7152 * g + 0.0722 * b
        if L < 10:
            bright_n = 0
            for nx, ny in ((x + 2, y), (x - 2, y), (x, y + 2), (x, y - 2)):
                if 0 <= nx < w and 0 <= ny < h:
                    rr, gg, bb, aa = pix[nx, ny]
                    if aa > 0 and (0.2126 * rr + 0.7152 * gg + 0.0722 * bb) > 40:
                        bright_n += 1
            if bright_n == 0:
                pix[x, y] = (0, 0, 0, 0)

# Mute neon greens toward charcoal botanical; lift metal blacks slightly
for y in range(h):
    for x in range(w):
        r, g, b, a = pix[x, y]
        if a < 8:
            continue
        # Pull saturated greens toward olive/charcoal
        if g > r + 18 and g > b + 18:
            g = int(g * 0.72 + ((r + b) / 2) * 0.28)
            r = int(r * 0.92)
            b = int(b * 0.88)
        # Crush pure black subject pixels that look muddy — slight lift
        L = 0.2126 * r + 0.7152 * g + 0.0722 * b
        if L < 28 and L > 4:
            lift = 10
            r = min(255, r + lift)
            g = min(255, g + lift)
            b = min(255, b + lift)
        pix[x, y] = (r, g, b, 255 if a > 180 else a)

bbox = im.getbbox()
if bbox:
    pad = 12
    x0 = max(0, bbox[0] - pad)
    y0 = max(0, bbox[1] - pad)
    x1 = min(w, bbox[2] + pad)
    y1 = min(h, bbox[3] + pad)
    im = im.crop((x0, y0, x1, y1))

# Upscale slightly then sharpen for crisp edges
max_w = 1100
if im.width < max_w:
    ratio = max_w / im.width
    im = im.resize((max_w, int(im.height * ratio)), Image.Resampling.LANCZOS)
elif im.width > max_w:
    ratio = max_w / im.width
    im = im.resize((max_w, int(im.height * ratio)), Image.Resampling.LANCZOS)

rgb = im.convert("RGB")
alpha = im.split()[-1]

rgb = ImageEnhance.Contrast(rgb).enhance(1.18)
rgb = ImageEnhance.Sharpness(rgb).enhance(1.55)
rgb = ImageEnhance.Color(rgb).enhance(0.82)
rgb = rgb.filter(ImageFilter.UnsharpMask(radius=1.6, percent=140, threshold=2))

im = Image.merge("RGBA", (*rgb.split(), alpha))
# Clean fringe: any low-alpha edge → hard
pix = im.load()
for y in range(im.height):
    for x in range(im.width):
        r, g, b, a = pix[x, y]
        if a < 40:
            pix[x, y] = (0, 0, 0, 0)
        elif a < 220:
            pix[x, y] = (r, g, b, 255)

im.save(out, "PNG", optimize=True)
print("saved", out, im.size)

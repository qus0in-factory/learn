import collections, json, sys

# wrangler tail --format json 출력의 호출 URL·status 집계. usage: tailsum.py FILE [WIDTH]
text = open(sys.argv[1]).read()
width = int(sys.argv[2]) if len(sys.argv) > 2 else 78
dec, i, events = json.JSONDecoder(), 0, []
while i < len(text):
    while i < len(text) and text[i].isspace():
        i += 1
    if i >= len(text):
        break
    obj, i = dec.raw_decode(text, i)
    events.append(obj)

counts = collections.Counter()
for e in events:
    ev = e.get("event") or {}
    req, res = ev.get("request") or {}, ev.get("response") or {}
    url = req.get("url", "?").split("//", 1)[-1]
    counts[(url[:width], res.get("status"))] += 1
print(f"{len(events)} Worker invocations")
for (url, status), n in sorted(counts.items()):
    print(f"{n:>2}x {status} {url}")

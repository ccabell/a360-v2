"""
Resolve real YouTube video IDs for the 408 youtube_tim_pearce videos by matching
their (artifact-laden) titles against a clean dump of Dr Tim Pearce's channel
(.planning/research/channel_videos.tsv, produced by yt-dlp --flat-playlist).

DB titles carry encoding artifacts: fullwidth punctuation (｜ ： ＂ ？ ！), '_' in
place of apostrophes/slashes, and some are truncated (Shorts with long titles).
Strategy: NFKC-normalize, lowercase, strip to [a-z0-9], then
  1) exact normalized match
  2) prefix match for truncated DB titles (len>=25) that are a prefix of a channel title

Outputs:
  lib/academy/data/video_id_map.json   { db_title: {video_id, channel_title, duration, match} }
  .planning/research/video_id_match_report.txt
"""
import json, os, re, sys, unicodedata, urllib.request, urllib.parse, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
ENV = ROOT / ".env.local"
TSV = ROOT / ".planning" / "research" / "channel_videos.tsv"
OUT_DIR = ROOT / "lib" / "academy" / "data"
REPORT = ROOT / ".planning" / "research" / "video_id_match_report.txt"

def load_env():
    env = {}
    for line in ENV.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        env[k.strip()] = v.strip()
    return env

def norm(s: str) -> str:
    s = unicodedata.normalize("NFKC", s)
    s = s.lower()
    s = re.sub(r"[^a-z0-9]", "", s)
    return s

def fetch_db_titles(url, key):
    # PostgREST paginated pull of all rows; dedupe titles client-side.
    titles, offset, page = set(), 0, 1000
    while True:
        endpoint = f"{url}/rest/v1/youtube_tim_pearce?select=video_title"
        req = urllib.request.Request(endpoint, headers={
            "apikey": key, "Authorization": f"Bearer {key}",
            "Range-Unit": "items", "Range": f"{offset}-{offset+page-1}",
        })
        with urllib.request.urlopen(req, timeout=60) as r:
            rows = json.loads(r.read().decode("utf-8"))
        for row in rows:
            if row.get("video_title"):
                titles.add(row["video_title"])
        if len(rows) < page:
            break
        offset += page
    return sorted(titles)

def main():
    env = load_env()
    url = env.get("RAG_SUPABASE_URL"); key = env.get("RAG_SUPABASE_KEY")
    if not url or not key:
        print("ERROR: RAG_SUPABASE_URL/KEY missing", file=sys.stderr); sys.exit(1)

    # Channel side
    channel = []
    raw = TSV.read_text(encoding="utf-8", errors="replace")
    # yt-dlp wrote literal backslash-t separators, not real tabs.
    sep = "\\t" if "\\t" in raw else "\t"
    for line in raw.splitlines():
        parts = line.split(sep)
        if len(parts) < 2:
            continue
        vid, title = parts[0], parts[1]
        dur = parts[2] if len(parts) > 2 else ""
        channel.append({"video_id": vid, "title": title, "duration": dur, "n": norm(title)})
    chan_by_norm = {c["n"]: c for c in channel}

    db_titles = fetch_db_titles(url, key)

    mapping, matched, prefix, unmatched = {}, 0, 0, []
    for t in db_titles:
        n = norm(t)
        hit = chan_by_norm.get(n)
        mtype = "exact"
        if not hit and len(n) >= 25:
            cands = [c for c in channel if c["n"].startswith(n)]
            if len(cands) == 1:
                hit = cands[0]; mtype = "prefix"
        if hit:
            mapping[t] = {"video_id": hit["video_id"], "channel_title": hit["title"],
                          "duration": hit["duration"], "match": mtype}
            if mtype == "exact": matched += 1
            else: prefix += 1
        else:
            unmatched.append(t)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    (OUT_DIR / "video_id_map.json").write_text(json.dumps(mapping, indent=2, ensure_ascii=False), encoding="utf-8")

    lines = [
        f"DB distinct titles: {len(db_titles)}",
        f"Channel videos: {len(channel)}",
        f"Matched (exact): {matched}",
        f"Matched (prefix/truncated): {prefix}",
        f"TOTAL matched: {matched + prefix}  ({round(100*(matched+prefix)/max(1,len(db_titles)))}%)",
        f"Unmatched: {len(unmatched)}",
        "",
        "--- UNMATCHED TITLES ---",
        *unmatched,
    ]
    REPORT.write_text("\n".join(lines), encoding="utf-8")
    print("\n".join(lines[:6]))

if __name__ == "__main__":
    main()

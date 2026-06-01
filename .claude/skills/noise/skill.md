# Add Noise Entry

Add a new daily song record to `_data/noise.json`.

## Usage

```
/noise spotify_url=<url>  [date=<YYYY-MM-DD>] [quote=<text>]
/noise song_name=<name>   [date=<YYYY-MM-DD>] [quote=<text>]
```

**Parameters**

| Parameter    | Required | Description |
|--------------|----------|-------------|
| `spotify_url` | one of   | Full Spotify track URL |
| `song_name`   | one of   | Free-text song/artist name to search for |
| `date`        | no       | ISO date (default: today) |
| `quote`       | no       | Short note about the song (prompted if omitted) |

## Steps

1. Parse args from the user's invocation:
   - Exactly one of `spotify_url` or `song_name` must be provided; fail clearly if neither or both are given.
   - **If `spotify_url`**: use it directly.
   - **If `song_name`**: web-search for the track, find its official Spotify track page, and use that as `spotify_url`. Show the user the matched artist + title and ask them to confirm before continuing.
   - Use `date` if provided; otherwise default to today in `YYYY-MM-DD` format.
   - Use `quote` if provided; otherwise prompt the user for one before continuing.

2. Fetch album cover via Spotify's public oEmbed endpoint (no auth needed):
   ```
   GET https://open.spotify.com/oembed?url=<spotify_url>
   ```
   Parse the JSON response and extract `thumbnail_url` as the `cover` value.
   If the fetch fails, ask the user to paste the cover image URL manually.

3. Read `_data/noise.json`.

4. Check that no entry already exists for the target date. If one does, tell the user and stop.

5. Build the new record:
   ```json
   {
     "date": "<date>",
     "spotify": "<spotify_url>",
     "cover": "<thumbnail_url>",
     "quote": "<quote>"
   }
   ```

6. Insert the record so the array stays sorted by `date` descending (newest first).

7. Write the updated array back to `_data/noise.json` with 2-space indentation.

8. Confirm to the user: print the new record and the total entry count.

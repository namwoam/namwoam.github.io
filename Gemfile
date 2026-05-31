source "https://rubygems.org"

# Jekyll version compatible with GitHub Pages
gem "jekyll", "~> 3.9.3"

# This is the default theme for new Jekyll sites
gem "minima", "~> 2.5"

# GitHub Pages gem (optional, includes all GitHub Pages dependencies)
gem "github-pages", group: :jekyll_plugins

# Ruby 2.6 does not support ffi 1.17.4+
gem "ffi", "~> 1.16"

# Jekyll plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-seo-tag"
  gem "jekyll-figure"
  gem "jekyll-paginate-v2"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

gem "webrick", "~> 1.9"

# Ruby 3.4+ removed csv from default gems; Jekyll 3.9.x requires it
gem "csv"

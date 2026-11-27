ruby '~> 3.2.0'
source 'https://rubygems.org'

# activesupport 6.1 uses Logger without requiring it, and concurrent-ruby 1.3.5+
# no longer loads it for us. Bundler requires gems in Gemfile order, so this
# must stay above middleman.
gem 'logger'

# Middleman
gem 'middleman', '~> 4.5'
gem 'middleman-syntax', '~> 3.0.0'
gem 'middleman-autoprefixer', '~> 2.7.0'
gem 'middleman-sprockets', '4.1.0' # Be explicit about versioning here as the latest version of middleman sprokets breaks sass https://github.com/middleman/middleman/issues/2302
gem 'rouge', '~> 2.0.5'
gem 'redcarpet', '~> 3.5.1'
gem 'nokogiri', '~> 1.15.7'

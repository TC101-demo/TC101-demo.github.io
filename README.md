# IAPR TC10/11 Resources

This is a prototype website for dataset and tools listing from IAPR technical committees 10 and 11.

This website is powered by Jekyll and some Bootstrap, Bootwatch.

Copyright TC10/11. Code released under the MIT License.

Please visit https://tc101-demo.github.io to see the live version of the website.



## Website development

### Automated deployment
Thanks to the integration with [GitHub Actions](https://docs.github.com/actions), the website is automatically recompiled and published at https://tc101-demo.github.io when any change is pushed to the master branch.

This can be configured by authorized users under the "Pages" tabs in the setting pages of the repository.

### Local development
It is also possible to build and run the website locally to perform and review changes before publishing them.
To do so, you will need a working Ruby distribution (with dev headers to enable native extensions) to start with, because we rely on the [Jekyll](https://jekyllrb.com/) static site builder.

With Debian/Ubuntu, the command should be:
```shell
sudo apt update
sudo apt install ruby-dev build-essential
```

Then, according to Jekyll documentation, you can install Jekyll and its dependencies with:
```shell
gem install bundler jekyll
```
Build native extensions can take a couple of minutes, but this needs to be done only once.

Before you can compile and run the website, you need to install the website-specific dependencies using:
```shell
cd TC101-demo.github.io
bundle install
```

Finally, you can compile and run a local web server with live-reload enabled using:
```shell
# If not already in the web site root directory
cd TC101-demo.github.io
bundle exec jekyll serve --livereload
```

Voilà! Your local copy of the website should be available at http://127.0.0.1:4000/.
Any change you make should be reflected in the live version within a couple of seconds.

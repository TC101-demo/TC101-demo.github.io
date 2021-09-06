---
title: Prototype ready for testing
tags: release
layout: post
date: 2021-09-05 16:00:00 +0200
---
Please have a look at this alpha version of this new dataset listing and let us know if we are doing things in the right direction.

After many discussions and several unsuccessful attempts, we are pleased to share this new prototype to [gather feedback]({% link _pages/feedback.html %}).

The main motivations for working on this prototype were the following:

- Some users expressed difficulties in submitting new content and maintenance of the current code became difficult. Time had come to explore alternative to the honorable, 10-year-old platform that we are currently using.
- We want to enable anyone to contribute on any part of the website, would it be to submit a dataset they created or not, to fix some content or even to edit some code. Levering GitHub accounts and features, like the ability to submit issues easily, should lead to a more inclusive process.
- Hosting of large dataset become more and more challenging on lab hosting while massive platforms like [Zenodo](https://zenodo.org) now offer free, large and durable hosting for research material.
- Security issues are getting harder to cope with and static hosting using GitHub pages offers secure and fast content delivery.

We selected GitHub Pages early in our process for hosting, and deliberately chose to drop support for dataset hosting as other platforms ([Zenodo](https://zenodo.org) in particular for which we have a [dedicated community](https://zenodo.org/communities/iapr-tc11/)) are providing much better alternatives that we recommend using.
This implies a static hosting, which is reasonable in our case as most of the content is based on "dataset cards" and, in the future "open software cards" that we tried to formalize as simple Markdown files.
Notably, this would also remove the need to register and login to download files, and we think this is a better thing for dissemination.

We experimented with several static site generators, and ended up using [Jekyll](https://jekyllrb.com/) because of its ease of use, flexibility and great GitHub integration.
We also realized that zero knowledge about Ruby is necessary to use Jekyll, lowering even more its entry cost.
We also tried [MkDocs](https://www.mkdocs.org/) and [HUGO](https://gohugo.io/) but did not manage to get the features we were expecting in a reasonable amount of time.

We hope that the result of our recent efforts, done in parallel with our day-to-day research and teaching, will be of some use to you.
If this project is of some interest to you, please do not hesitate to provide some [feedback]({% link _pages/feedback.html %}) and get in touch with us [through GitHub](https://github.com/TC101-demo) or by sending as an email to `tc101-demo(at)googlegroups.com`!
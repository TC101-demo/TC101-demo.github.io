---
title: "Submit new item"
layout: text
excerpt: "Submit new items to our listing using this webpage."
sitemap: false
permalink: /submit
---

# Submit a new item to our listing
**Currently, we only offer the option to submit new datasets.** *We will soon support the possibility to submit software.*

If you want to **fix a dataset or any other page**, please suggest changes on GitHub using the <a class="btn btn-default" role="button" href="{{ site.github_edit_base_url }}/{{ page.path }}"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit this page</a> link on top of each page.
You can also <a class="btn btn-default" role="button" target="_blank" href="https://github.com/TC101-demo/TC101-demo.github.io/issues/new/choose"><span class="glyphicon glyphicon-bell" aria-hidden="true"></span> Create an issue</a> to report any problem or suggest improvements, and of course you can review and suggest changes for [any part of the code used to generate this website](https://github.com/TC101-demo/TC101-demo.github.io).
We also welcome any contribution to [documentation](https://github.com/TC101-demo/TC101-demo.github.io/wiki), [issue triage](https://github.com/TC101-demo/TC101-demo.github.io/issues), or any other aspect you can think of.

## Dataset Upload
**Please note that we do not provide support for dataset hosting.**  
This is intended as services like [Zenodo](https://zenodo.org/) provide great functionality for this purpose: free hosting up to 50GB, DOIs, versioning, GitHub repository archival, [fast and reliable serving](https://about.zenodo.org/infrastructure/), and [much more](https://help.zenodo.org/features/). We also have a [dedicated community](https://zenodo.org/communities/iapr-tc11/): just select the ["new upload"](https://zenodo.org/deposit/new?c=iapr-tc11) button on Zenodo or click below.

<a class="btn btn-success" href="https://zenodo.org/deposit/new?c=iapr-tc11" role="button" target="_blank"><span class="glyphicon glyphicon-open" aria-hidden="true"></span> New Upload to Zenodo</a>


## Submission options
There are **3 ways to submit a new item**, please select your preferred one.  
**You do not need to be the author** of a dataset to submit it: every contribution is welcome to make this listing as exhaustive and useful as possible.

1. **[Create a Pull Request (PR) on GitHub](#1-create-a-pull-request-on-github)**  
   This is the **fastest** option to publish a dataset, but it **requires familiarity with GitHub PR workflow** (and a GitHub account).
2. **[Create an Issue on GitHub](#2-create-an-issue-on-github)**  
   This is a **fast** option which does not require extensive GitHub mastery, by it still **requires a GitHub account** and will put more work in curators' hands.
<!-- 3. **[Fill our online form](#3-fill-our-online-form)** **FIXME do we have a reliable solution for this? (with support for thumbnail upload)**  
   This option is fairly simple as you just need to answer questions. Processing time will be longer though. -->
3. **[Email dataset curators](#3-email-dataset-curators) at `tc101-demo(at)googlegroups.com`**  
   This is probably the **simplest** option, but also the one which require more work from curators; it **may take up to a week to complete** the publishing.

The detailed procedure for each option is detailed in the rest of this page.

### 1. Create a Pull Request on GitHub
This option requires some experience with the fork/pull-request model which is commonly used on GitHub.
We recommend you read GitHub's documentation about [How to create a pull request (PR) from a fork](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork).

If you select this option, please complete the following steps:
1. [**Fork** the repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo) located at [https://github.com/TC101-demo/TC101-demo.github.io](https://github.com/TC101-demo/TC101-demo.github.io).
2. **Copy** the file `submission_templates/new_dataset.md.tpl` to `_datasets/{DATASETID}_{DATASETVERSION}.md` where
   - `{DATASETID}` is the name of your dataset, exemple: `myDataset`
   - `{DATASETVERSION}` is the version of your dataset, example: `1` (chose 1 by default)
3. **Edit** the content of the newly created file to fill required content.
4. **Put at least one image** under a new directory named `images/{DATASETID}_{DATASETVERSION}` to use as a thumbnail.  
   *Example: if the path of the image is `images/{DATASETID}_{DATASETVERSION}/thumbnail.jpg`, then use the following line in the front matter of your dataset page: `thumbnail: images/{DATASETID}_{DATASETVERSION}/thumbnail.jpg`*
5. **Submit** the Pull Request to us.

### 2. Create an Issue on GitHub
Simply click the button below and fill the form.

Please make sure you attached a thumbnail image to the new issue!

<a class="btn btn-success" href="#" role="button" target="_blank"><span class="glyphicon glyphicon-open" aria-hidden="true"></span> New Issue for New Dataset</a>

<!-- ### 3. Fill our online form
**Any option here?** -->

### 3. Email dataset curators
If you select this option, please complete the following steps:
1. **Download** the template for dataset pages here: <a class="btn btn-default" role="button" target="_blank" href="/submission_templates/new_dataset.md.tpl"><span class="glyphicon glyphicon-save" aria-hidden="true"></span> Dataset page template </a>
2. **Edit** this document and save it with a name containing your dataset short identifier and version, like `myDataset_1.md`. Please use UTF8 encoding.
3. **Create a thumbnail image** to represent your dataset.
4. **Email** us at `tc101-demo(at)googlegroups.com` with the subject "New dataset submission {dataset name}" and the two files (page and image) attached.

<br>

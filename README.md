# Test website for IAPR TC10/11 dataset and software listing

This is a demo listing to prepare the future dataset and software listing and gather feedback.

**This is not an official IAPR project.**

## Expected use-cases and features under test
- **Website**  
   ↳ [GitHub Pages](https://pages.github.com/)
- **Dataset listing**  
   ↳ [GitHub Pages](https://pages.github.com/) as well
- **Team organization and communication**  
   ↳ [Teams](https://docs.github.com/en/organizations/collaborating-with-your-team) and Project features
- **Interaction with community**  
   ↳ Issues, Discussions and Wikis
- **Code, tools and data sharing**  
   ↳ Repositories, packages, releases (with additional files)


## Quick help for website maintainers

There are two ways to update the website:

- Using the online tools: no installation required, very fast and easy, just need a GitHub account and some basic knowledge about Markdown.
- Testing locally: more knowledge required but faster correction of problems.

### All-automated, online option
1. Edit the markdown pages using GitHub's online interface, and commit changes to the `main` branch.
2. Continuous integration (GitHub Actions) will automatically be launched to build and deploy website content.
3. If any error occurs, you will need to review the build logs or use the local/manual option (see next section).

### Local build and manual deploy
1. Install [MkDocs](https://www.mkdocs.org/) and other Python requirements using `pip install -r requirements.txt`.
2. Clone this repository.
3. Create/update/delete pages under `docs/`.
4. Run `mkdocs serve` and open up `http://127.0.0.1:8000/` in your browser to check the results.
5. When happy with your changes, then deploy your changes with `mkdocs gh-deploy` (no continuous integration for now).
6. Do not forget to commit your changes with `git add ...`, `git commit ...` and `git push`!


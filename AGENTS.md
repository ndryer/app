# Repository Instructions for Codex Agents

## Scope
These instructions apply to the entire repository.

## Testing
- Run Python tests with `pytest` from the repository root.
- Run front-end tests by executing `npm test` inside the `frontend/` directory.

## Linting and Formatting
- Format Python code with `black` and sort imports with `isort`.
- Check code style with `flake8` and type hints with `mypy`.
- Ensure these commands pass before committing:
  ```bash
  black .
  isort .
  flake8 .
  mypy .
  ```

## Commit Messages
- Use the imperative mood in commit subject lines.
- Keep the subject under 72 characters.
- If additional context is helpful, add a body separated from the subject by a blank line.

## Pull Requests
- Summarize your changes at a high level.
- Include references to relevant code using file path citations.
- Note the results of the required test commands.

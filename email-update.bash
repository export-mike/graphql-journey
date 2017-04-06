git filter-branch --commit-filter '
              GIT_AUTHOR_EMAIL="m@mikejam.es";
              git commit-tree "$@";
              git commit-tree "$@";
      ' HEAD

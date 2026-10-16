# Operations

How the website gets built, deployed, rolled back and kept healthy.

## Deployment

- **Environments**:
  - **Local**: `bash scripts/build-site.sh`, then serve `dist/` (see README "Run it locally").
  - **Production**: Cloudflare Pages project `whisker-and-wrench`, served at https://whiskerandwrench.com and https://whisker-and-wrench.pages.dev.
- **Deployment Procedure**: push to `main`. The `Site` workflow (`.github/workflows/site.yml`) builds `dist/`, runs `scripts/test-site.sh` and lychee, then runs `wrangler pages deploy dist` with the pinned wrangler version. Nothing else deploys the site.
- **Approvals / Gates**: the deploy job only runs after the `check` job passes on a push to `main`, and only when the `CLOUDFLARE_ACCOUNT_ID` repo variable and `CLOUDFLARE_API_TOKEN` repo secret exist. The job uses the GitHub `production` environment, so you can add required reviewers there later if you want a manual gate.
- **Rollback**: in the Cloudflare dashboard go to Workers & Pages > `whisker-and-wrench` > Deployments, open the last good deployment, and choose **Rollback to this deployment**. Then `git revert` the bad commit on `main` so the next deploy doesn't bring it back.

### One-time Cloudflare setup

1. **Pages project**: `npx wrangler@4.146.0 login --scopes account:read user:read pages:write offline_access --use-keyring` (asks only for Pages access and keeps the login in the OS keychain), then `npx wrangler@4.146.0 pages project create whisker-and-wrench --production-branch main`.
2. **API token for GitHub Actions**: Cloudflare dashboard > My Profile > API Tokens > Create Token > Custom token. Permission: **Account > Cloudflare Pages > Edit**, scoped to your account only. Save it as the repo secret: `gh secret set CLOUDFLARE_API_TOKEN` (paste when prompted).
3. **Account ID**: `npx wrangler@4.146.0 whoami` shows it. Save it as a repo variable: `gh variable set CLOUDFLARE_ACCOUNT_ID --body <id>`.
4. **Custom domain**: Workers & Pages > `whisker-and-wrench` > Custom domains > Set up a custom domain > `whiskerandwrench.com`. Because the zone is on Cloudflare DNS, Cloudflare adds the one CNAME record it needs for the apex and issues the certificate. Repeat for `www.whiskerandwrench.com` if you want `www` to work too. No other DNS records are touched.

### Secrets and config

| Name | Kind | Where | Purpose |
| --- | --- | --- | --- |
| `CLOUDFLARE_API_TOKEN` | Secret | GitHub repo secrets | Lets the deploy job upload to Pages. Pages:Edit only. Rotate yearly or if leaked. |
| `CLOUDFLARE_ACCOUNT_ID` | Variable (not secret) | GitHub repo variables | Tells wrangler which account. Also the switch that turns the deploy job on. |

## Monitoring & Observability

- **Logs**: GitHub Actions run logs for builds and deploys. Cloudflare dashboard > Workers & Pages > `whisker-and-wrench` > Deployments for each deploy's build log.
- **Metrics**: Cloudflare Web Analytics can be turned on per site in the dashboard (free, no cookies). Not enabled yet.
- **Alerts**: GitHub emails the repo owner when a workflow fails. Lychee runs on every push, so a dead external link shows up as a red `Site` run.

## Safe Operations

- **Backup/Restore**: the site is fully rebuilt from Git on every deploy. Git and GitHub are the backup. Cloudflare keeps every past deployment for rollback.
- **Maintenance Mode**: not needed for a static site. To take it down fast, remove the custom domain in the Pages project.
- **Stateful Changes**: none. There is no database or user data.
- **DNS**: only change records for `whiskerandwrench.com` that the Pages custom-domain flow creates. Ask Eric before touching anything else in the zone.

## Incident Response

1. Identify the impact (site down, wrong content, broken page).
2. Check the latest `Site` workflow run and the Cloudflare Deployments list.
3. Roll back in Cloudflare (above) if a deploy caused it.
4. Fix forward on `main` with a revert or a fix commit.
5. For a significant incident, write a postmortem from
   `constitution/templates/docs/INCIDENT_POSTMORTEM.md` into
   `docs/incidents/<YYYY-MM-DD>-<slug>.md` and turn its corrective actions
   into `TODO.md` items.

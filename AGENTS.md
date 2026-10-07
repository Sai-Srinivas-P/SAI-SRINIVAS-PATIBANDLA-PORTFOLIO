<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Portfolio conventions
- All portfolio content (projects, skills, certifications, profiles, contact) lives in `src/lib/portfolio-data.ts` — edit data there, never hardcode content in components.
- Theme tokens are defined in `src/styles.css` :root; components use semantic tokens only so site-wide palette changes remain consistent.
- Shared portfolio presentation and motion rules live in global semantic CSS, while the hero and project detail layouts use scoped classes; this keeps every page visually consistent without duplicating style logic.
- Decorative wallpapers use the shared Wallpaper component with bundled image imports and semantic overlays so sections and detail pages share accessible presentation without duplicating assets.

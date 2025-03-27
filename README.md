## ToDo

- [x] Migrate to sveltekit 2
- [x] Change how theme colors are handled
- [x] Theme switcher works in dev but not in prod. It returns to the default theme after a reload
- [ ] Fetch only the first n items from google sheets
- [x] update toast store
- [ ] Try to use route grouping to make home header and directory header separate
- [ ] Error handling for all fetch requests to handle empty fields
- [ ] add user select none to hero image
- [x] abstract the user-name placeholder function
- [x] abstract view-transition to a directive
- [ ] Tests for calender functions
- [ ] make icons efficient.
- [x] Abstract the clipboard to a directive
- [x] Animate pane and crisp menu

- [x] General
  - [x] prevent zoom on double tap
- [x] Prof
  - [x] disclosure dropdown marker remove
  - [x] search input clear button removal on off focus
  - [x] empty search message
- [x] Amenity page
  - [x] remove stale data message
  - [ ] random overlap before admin section
- [ ] Clubs
  - [ ] random overlap in the list
- [x] Convert all theme elements to light-dark() css function
- [x] change theme to use color-scheme css property

### Find a deleted file in git history

```bash
git log --all --full-history -- "**/attendance/+page.svelte"
```

### Add a icon

1. Find the icon in "https://fonts.google.com/icons"
2. Copy the icon name
3. Add the icon to the icon list in `src/hooks.server.ts`
4. use it in `data-icon` attribute in the html or in css but don't forget to add the font-family to the css class

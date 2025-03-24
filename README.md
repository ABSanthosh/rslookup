## ToDo

- [x] Migrate to sveltekit 2
- [ ] Change how theme colors are handled
- [x] Theme switcher works in dev but not in prod. It returns to the default theme after a reload
- [ ] Fetch only the first n items from google sheets
- [x] update toast store
- [ ] Error handling for all fetch requests to handle empty fields
- [ ] Try to use route grouping to make home header and directory header separate
- [ ] add user select none to hero image 

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
- [ ] change theme to use color-scheme css property


### Find a deleted file in git history

```bash
git log --all --full-history -- "**/attendance/+page.svelte"
```

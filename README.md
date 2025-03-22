## ToDo

- [ ] Migrate to sveltekit 2
- [ ] Change how theme colors are handled
- [ ] Theme switcher works in dev but not in prod. It returns to the default theme after a reload
- [ ] Fetch only the first n items from google sheets
- [ ] update toast store
- [ ] Error handling for all fetch requests to handle empty fields
- [ ] Try to use route grouping to make home header and directory header separate

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
- [ ] Convert all theme elements to light-dark() css function
- [ ] change theme to use color-scheme css property

1. Merge professors and labs
2. Rename the resources section as "Documents and Resources"

3. Please make attendance calculator and merge both attendance and GPA calc sections

4. Change the order of sections - Professors, Documents and Resources, GPA and Attendance Calculator, Amenities, Academic Helpdesk, Student Council, Clubs, Events
5. archive you've it was good change i agree, but ig u forgot to inform us, just let us know beforehand next time anything else ?
6. Revamp the credits page - divide it into 2 sections. one section has only formal/official bodies such as Santosh, Aryan, Academic Affairs Secretaries. and if we get any contribution from Cultural Committee or Campus affairs, we can include. The second section is student contributions, which only involves the names of students who've contributed towards the website. simple

### Find a deleted file in git history

```bash
git log --all --full-history -- "**/attendance/+page.svelte"
```

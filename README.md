Build Command:

```
eas build -p android --profile preview
```

## TODO

### PRIORITY

- [x] Fix state delete bug.

### END PRIORITY

- [ ] Overall.
  - [x] Add backup revalidation in case the socket client/server is experiencing trouble.
  - [ ] Revalidate the jobs.
- [ ] Job section.
  - [x] When group deleted or removed, remove the groups jobs.
  - [x] Notify other particapants when job is posted.
  - [ ] Job information slideup.
    - [x] Show the job info.
      - [x] Fetch the volunteer info.
    - [ ] Remove a volunteer button (For owner and volunteer).
    - [ ] Private notes.
    - [ ] Chat section.
      - [ ] Overall chat with everyone in the group.
      - [ ] Chat with the job issuer.
  - [ ] Job title text overflow.
  - [x] Remove the unavailable jobs from the available jobs section.

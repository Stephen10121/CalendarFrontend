Build Command:

```
eas build -p android --profile preview
```

## TODO

- [ ] Overall.
  - [x] Add backup revalidation in case the socket client/server is experiencing trouble.
  - [x] Revalidate the jobs.
  - [ ] Add the notification toggle button in settings.
- [ ] Job section.
  - [x] Convert the jobs store to job store by date.
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
  - [x] Job title text overflow.
  - [x] Remove the unavailable jobs from the available jobs section.

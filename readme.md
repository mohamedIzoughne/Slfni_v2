now the problem I face is with

the loan should have the amount as integer not character in DB
I don't know why when I create a lending/borrowing I don't get all the loans when entering loan items for specific user loans page

- create relation stuff table and sync that to the other parts: created in case of lending for the same time, updated in case of creating a new lending, deleted in case of settling loans
- settle loans api endpoint and frontend

- when clicking add in loans > index.js, it should redirect to the add loan page
- should have events section
- should have a section for each event
-
- what if someone settled down all loans, then he wants to add a new loan?
- what if a user sent multiple settle down requests, should we insert notifications multiple times if user has made a mistake or he didn't understand quite well?
- we should have a better UI when settling down
- I should be consistent about what format of the date I use in database

## things to work now

<!-- - remove notification button -->

<!-- - fix the home -->

<!-- - events design: event details, create an event -->

<!-- - link the front and back of design -->

<!-- dark mode -->

<!-- - fix colors- -->

<!-- - add some components to be better -->
<!-- - have the ability changing name and ity ousername -->

<!-- - add the ability for scanning -->

- fix the introduction, what comes first, maybe we should choose language, choosing image and username, maybe the onBoarding comes first before sign up r log in
  <!-- - change images for notifications, onboarding and other stuff -->
  <!-- - make the search clickable, when you search, also have a similar screen for search -->
    <!-- - don't add new notification for the same event/loan with the same action and the same user if it already exists: add a unique constraint to the table -->
    <!-- - fix all needed stuff in context and async storage, refresh token -->
- you forgot that icon for the user: use defaultSource or whatever I don't remember, there is also a smooth effect of lists to put in.
- error refreshing token no token provided, authorization denied
<!-- - notifications: you should detect if there are new notifications or not -->
- you should not have 0h, instead you should have something else like minutes or other thing(this is for notification, maybe there are other places that have it)
- test the app more and more, then give it for someone to test it with you like abdelmoula, then fix all problems in the app

- to test very well, give expectations that are a little bit strange. for example: what if there was a notification about an event but then the member is removed from the event, should we still show the notification?: removing the member -> removing all his notifications
- Updating should not have a problem with eventId, userId, type constraint: als see other types
- it looks like sometiumes it saves theme but other times it doesn't: theme, ...
- change the UI for the event details
- The ui for the buttons in events/loans screens
- you should stay on "verify email" if the user didn't verify yet. also let the user re sign up in case his account is not yet verified

### Fixes after testing

- don't add new notification for the same event/loan with the same action and the same user if it already exists: add a unique constraint to the table
- some times we don't want to start with an uppercase character
- make it an apk, test it
- we should have a better splash screen, better design and to wait until we import/get data from the storage.

## Important for the published app:

- a calculator: maybe have a model where you can calculate, although this will pose another problem, think about this option
- arabic
- add all needed integration tests
- logging out

## Amazing but not important for the initial published app:

- offline mode
- - The idea that I have right now is to sync data when the user gets out of the app
- - I also remember that I should do some debounce when storing the settings to the database

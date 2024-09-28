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

- link the front and back of design
- settings
- notifications: you should detect if there are new notifications or not
- fix all needed stuff in context and async storage, refresh token
- make it an apk, test it

## Important for the published app:

- theme
- a calculator
- arabic
- add all needed integration tests
- logging out
- I forgot something
- qr code

## Amazing but not important for the initial published app:

- offline mode

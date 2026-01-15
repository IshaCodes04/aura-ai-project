*Helloo! It's time to create frontend yaaayy!!*

- created register ui
- created login ui
- created about ui
- created pricing ui
- created home ui

*Use Google Auth*

* Overall flow like this :- 

User clicks "Continue with Google"
→ Google OAuth popup
→ Google se user data (email, name, photo)
→ Backend verify karega
→ MongoDB me user save/update
→ JWT / session create
→ Frontend ko user data milega
→ Redirect to /chat
→ Chat UI me:
   - Top right initial (I → user initial)
   - Sidebar footer name (Isha Dev → real user name)
   - Greeting (Good morning / evening / night)

*Setup Google OAuth in backend*

- go to passport.js and select google 0auth strategy
- install npm install passport-google-oauth20 in backend
- install npm i passport
- create config folder and passport.js file 
- we need to do some changes in user.model.js add avatart or googleId
- 


*Deployment*

- for frontend = npm run build 
- then ek dist folder milega = usme 3 files milengi index.html , index css or index js
- then backend m ek public folder create krna h uske bd sari files usme add on kr deni h 
# NumberLingo 💯 🎓

I choose to make a simple webapp that lets you quiz numbers in different languages. It uses the google cloud translate API to translate randomly generated numbers from english to a language you want to learn.

Install the dependencies with `npm install` or `yarn install`. To start the webapp just run `npm start` or `yarn start` and it should open the browser. (If it do not open the web page then navigate to http://localhost:3000)

Start on the home page and select a language and then choose a number range that you want to learn from. Then you will be taken to the quiz screen. Here you will see some text in the language you chose (hopefully, it sometimes translates it to just integer numbers and not the word representation).

You then continue until you complete all the 10 questions. Then you will get a score and a opportunity to look at your mistakes. Now you can choose to continue or going back to the main screen by selecting the header logo/going back in browser history/go to the root url.
  
The webapp is also capable of saving your progress in the localstorage so if you leave by accident or want to continue where you left of earlier. You can also see the previous sessions on the home screen if there are any available.

For this project to work you need to have the api key in the .env.json file.

Because of the __heavy use of emoji's__ it looks best on a system with good emoji support like __Mac os__, some newer versions of Windows or __mobile__
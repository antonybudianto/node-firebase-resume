# Node Firebase Resume

Generate a PDF resume based on your Firebase data

## How to use
1. Clone this repo
2. Obtain your Firebase service key JSON file, name it `key.json` and put it in the root of this project
3. Import `examples/sample.json` into your Firebase Realtime Database and edit it as you wish
4. Run `npm start`
5. Your PDF will be generated on `dist` folder

## Custom
You can add your own custom template as you wish on `src/template` and then update `src/util/template.js` to use your template file.

You also can adjust the data as you want on `src/index.js`

## License
MIT

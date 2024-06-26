# Goal

Have an Angular 18 Project with jest-extended running

Helpful resources:
- https://github.com/angular/angular-cli/issues/25434
- https://medium.com/@ayushgrwl365/jesting-your-angular-app-simplifying-unit-testing-with-jest-324f5bb9e2df
- https://rathoreaparna678.medium.com/moving-angular-cli-to-jest-and-web-test-runner-d2966e1c5802

# Step by step setup documentation

Working on Windows using NVM (Node version manager)
- Download the installer (.exe) here https://github.com/coreybutler/nvm-windows/releases
- After installation open CMD and execute
  - `nvm install 20.14.0`
  - `nvm use 20.14.0`

Angular setup
- Create C:\projects and navigate there, open CMD
- Execute in this directory (see https://angular.io/guide/setup-local)
  - `npm install -g @angular/cli`
  - `ng --version`
    - prints out "18.0.3"
  - `ng new jest-extended-angular`
  - `cd ./jest-extended-angular`
  - `ng test`
    - Doesn't work as I don't have Chrome installed ;) 


Visual Studio Code
- Open C:\projects\jest-extended-angular
- CMD
  - `npm i -D jest jest-environment-jsdom`
  - `npm i --save-dev @types/jest`
- modified angular.json
- modified tsconfig.spec.json
- CMD
  - `npm test`
     - this worked → 3 Tests passed

Adding jest-extended
- CMD
  - `npm install --save-dev jest-extended`
- added test case inside src\app\app.component.spec.ts
  - `it('should apply jest-extended matcher', () => { expect(true).toBeTrue(); })`
- created jest.config.js
- created testSetup.js (see https://jest-extended.jestcommunity.dev/docs/getting-started/setup)
- CMD
  - `npm test`
    - the new test doesn't work but VS Code is happy ...

Trying another approach
- CMD
  - `npm install --save-dev jest ts-jest @types/jest`
  - `npm i -D @angular-builders/jest@18.0.0-beta.3`
- modified angular.json (see https://www.npmjs.com/package/@angular-builders/jest/v/18.0.0-beta.3)
- CMD
  - `ng test`
    - this actually worked → 4 tests passed
- Removed karma and jasmine from package.json
  - Deleted node_modules and package.json
  - Executed `npm install` from CMD
- VS Code is unhappy now and marks `.toBeTrue()` as unknown
  - Modified tsconfig.json by adding
    - `"files": ["node_modules/jest-extended/types/index.d.ts"]`
  - VS Code is happy again
- Tested `ng test --watch` successfully
- Starting app `ng serve` and visiting http://localhost:4200/ works

Other stuff
- Was seeing we have paths configured in the tsconfig.json on one of my clients
- Made jest-extended and paths live in harmony
- Summary
  - global.d.ts → added `import 'jest-extended';` is needed for Visual Studio Code to recognize extended matchers
  - tsconfig.json → removed "files" and added "paths" (they don't work co-existend for one reason or another)
  - jest.config.js → added module mappers so the paths added in tsconfig.json are resolved (as jest is not aware of paths on runtime)
  - added "jest-extended" to "types" in tsconfig.spec.json to ensure the extended matchers are recognized at compile time `ng test`

Issue "toHaveBeenCalledOnceWith"
- How do migrate this matcher? jest-extended has `toHaveBeenCalledExactlyOnceWith`
- But what is if our project has this jasmine matcher in use 1000 times???
- Solution: Extending jest-extended with "custom matchers" 
  - File [matchers.d.ts](./src/matchers.d.ts) was created for namespace declaration which seems to satisfy the compiler and VS Code
  - Updated file [testSetup.js](./testSetup.js) by providing the function for usage
// @ts-check
// import { defineConfig, devices } from '@playwright/test';
// import { on } from 'node:cluster';
// import { trace } from 'node:console';
// import { use } from 'react';

const { devices } = require("@playwright/test");
const { permission } = require("node:process");

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
//export default defineConfig
  const config=({
  testDir: './tests',
  retries:1,
  //workers:3,
  timeout:30*1000,

  expect:{
      timeout:5000
  },
  reporter:'html',
  projects:
  [ 
    {
      name:'safari',
      use:{
      browserName:'webkit',  
      headless: false,
      ...devices['iPhone 11 Pro'],
      screenshot:'on',
      trace:'on',
      }
    },
    {
      name:'chrome',
      use:{
       browserName:'chromium',
headless: false,
//by seeting ignoreHttps property this will click on advanced buttons & accept ssl certicates for us--So when you say ignore this error, then it will just help you to learn.
//Even the website is not history devious and accepts the SSL certificate.
ignoreHttpsErrors:true,
//And sometimes you will see it pop up on the screen asking a allow to know your location.If
//  you want to automatically handle that, pop up by play wright set property as below.
Permissions:['geolocation'],
//to generate a video on failure of test video property is used.
video:'retain-on-failure',
screenshot:'on',
//viewport option is used to set the window size in which we want to open the browser,if not provided it will open with default size.
viewport:{width:720,height:720},
      },

    }



  ]
  

});
//export default config
module.exports=config;
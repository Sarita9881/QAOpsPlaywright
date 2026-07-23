// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { on } from 'node:cluster';
import { trace } from 'node:console';

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
  timeout:30*1000,
  expect:{
      timeout:5000
  },
  reporter:'html',
  use: {

browserName:'chromium',
//browserName:'firefox'
//browserName:'webkit',
headless: false,
screenshot:'on',
//If you're on trace, no matter the test is passed, are fail for every test case you will see trace.
//You will see the traces if you off then you will not see any traces though they are failed.
trace:'on', // on ,off or retain-on-failure',

//If you give this property, then the traces will get generated only if there is a failure.
//trace:'retain-on-failure',


  },

});
//export default config
module.exports=config;
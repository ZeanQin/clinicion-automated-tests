import {loginURL, userName, password} from './lib/LoginDetails.js';
import {expect} from 'chai';
import {Selector} from 'testcafe';
import {ClientFunction} from 'testcafe';
import {querySelector} from './lib/Functions.js';

// initialise hospital properties
const hospitalNamePrefix = 'TestCafe Hosptial - ';
const hospitalNamePostfix = Math.random().toString(36).substr(2, 9);
const hospitalName = hospitalNamePrefix + hospitalNamePostfix;
const portalURL =  hospitalNamePostfix + '.qa.clinicion.com';
const emailSignature = 'Welcome to ' + hospitalName;

var pageURL; 

fixture ('Communities')
  .page(loginURL)
  .beforeEach( async t => {
    await t
    .typeText('#UserName', userName)
    .typeText('#Password', password)
    .click('.btn-login');

  });

//// test community listing
//test('Listing Hosptials', async t => {
//  expect((await t.select('#Title')).value).to.equal('Hospitals');
//});

// test community creation
test('Creating Hosptial', async t => {
  await t.navigateTo('/Community/Create')
  await t
    .typeText(await querySelector('#Name'), hospitalName)
    .typeText(await querySelector('#PortalUri'), portalURL)
    .typeText(await querySelector('#EmailSignature'), emailSignature);
  
  var culture = ClientFunction(() => document
    .getElementById('Culture').selectedIndex=94);
  var timezone = ClientFunction(() => document
    .getElementById('Timezone').selectedIndex=113);
  var colour = ClientFunction(() => document
    .getElementById('ColourClass').value='team-colours-01');

  await culture();
  await timezone();
  await colour();
 
  await t.click('#main-content > section:nth-child(2) > div > section > form > div > div:nth-child(13) > div > ul > li.team-colours-01');
  await t.click('body > div.container > section > footer > ul > li:nth-child(1) > a');

  expect((await querySelector('#main-content > section:nth-child(2) > div.col-lg-12 > section > div.panel-heading > span')).innerText.trim(), hospitalName);
});


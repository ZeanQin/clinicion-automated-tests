import {loginURL, userName, password} from './lib/LoginDetails.js';
import {expect} from 'chai';
import {Selector} from 'testcafe';
import {ClientFunction} from 'testcafe';

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

  expect((await t.select('#Title')).value).to
    .equal('Assess in Unit...');
  
  await t.navigateTo('/Communities');
  expect((await t.select('#Title')).value).to.equal('Hospitals');
  });

// test community listing
test('Listing Hosptials', async t => {
  expect((await t.select('#Title')).value).to.equal('Hospitals');
});

// test community creation
test('Creating Hosptial', async t => {
  await t.click('.action-bar-create');
  expect((await t.select('#Title')).value).to
    .equal('Create a new Hospital');

  var culture = ClientFunction(() => document
    .getElementById('Culture').selectedIndex=94);
  var colour = ClientFunction(() => document
    .getElementById('ColourClass').value='team-colours-01');

  await t
  .typeText('#Name', hospitalName)
  .typeText('#PortalUri', portalURL)
  .typeText('#EmailSignature', emailSignature);
  
  await culture();
  await t.click('.team-colours-01');
  await colour();
 
  await t.click('.post-action'); 

  expect((await t.select('.panel-heading span')).innerText.trim())
    .to.equal(hospitalName);

  // get current community URL
  const getPathName = ClientFunction(() => window.location.pathname);
  pageURL = await getPathName();
});

// testing hospital details page
test('List Hospital Details', async t => {
  await t.navigateTo(pageURL);
});

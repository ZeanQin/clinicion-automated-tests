import {querySelector} from './lib/Functions.js';
import {loginURL, userName, password} from './lib/LoginDetails.js';
import {expect} from 'chai';
import {Selector} from 'testcafe';
import {ClientFunction} from 'testcafe';

const forumTitle = 'Automatically Generated Question By TestCafe';
const sampleTexts = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'; 
var pageURL;

fixture ('Forum')
  .page(loginURL)
  .beforeEach( async t => {
    await t
    .typeText('#UserName', userName)
    .typeText('#Password', password)
    .click('.btn-login')
    .navigateTo('/Workspace/Questions');
  });

test('Listing Forum', async t => {
  expect((await t.select('#Title')).value).to.equal('Discuss');
});

test('Adding New Question', async t => {
  await t.click('.action-bar-create');

  const setShareScope = ClientFunction(() => document
    .getElementById('MembershipId').selectedIndex=1);
  await setShareScope();
  await t.typeText('#Name', forumTitle);
  await t.typeText('#Description', sampleTexts);
  await t.click(await querySelector('body > div.container > section > footer > ul > li:nth-child(1) > a'));

  expect((await t.select('#Title')).value).to
  .equal('Automatically Generated Question By TestCafe');
  
  const getPathName = ClientFunction(() => window.location.pathname);
  pageURL = await getPathName();
});

test('Posting Comments', async t => {
  await t.navigateTo(pageURL);

  await t
  .typeText('#Body', sampleTexts)
  .click(await querySelector('#main-content > section:nth-child(2) > div > section > div > div.conversation > div.new-comment > div > div > form > button'));

  expect((await t.select('#Title')).value).to.equal(forumTitle);
});

import {loginURL, userName, password} from './lib/LoginDetails.js';
import {expect} from 'chai';
import {Selector} from 'testcafe';
import {ClientFunction} from 'testcafe';

const forumTitle = 'Automatically Generated Question By TestCafe';
const sampleTexts = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'; 

fixture ('Forum')
  .page(loginURL)
  .beforeEach( async t => {
    await t
    .typeText('#UserName', userName)
    .typeText('#Password', password)
    .click('.btn-login');

    expect((await t.select('#Title')).value).to
    .equal('Assess in Unit...');

    await t.navigateTo('/Workspace/Questions');
    expect((await t.select('#Title')).value).to.equal('Discuss');
  });

test('Listing Forum', async t => {
  expect((await t.select('#Title')).value).to.equal('Discuss');
});

test('Adding New Question', async t => {
  await t.click('.action-bar-create');
  const getPathName = ClientFunction(() => window.location.pathname);
  var pageURL = await getPathName();
  expect(pageURL).to.equal('/Workspace/Questions/Create');

  const setShareScope = ClientFunction(() => document
    .getElementById('MembershipId').selectedIndex=1);
  await setShareScope();
  await t.typeText('#Name', forumTitle);
  await t.typeText('#Description', sampleTexts);
  await t.click('.post-action');

  expect((await t.select('#Title')).value).to
  .equal('Automatically Generated Question By TestCafe');
});

test('Posting Comments', async t => {
  const getPathName = ClientFunction(() => window.location.pathname);
  var pageURL = await getPathName();
  expect(pageURL).to.equal('/Workspace/Questions/Create');

  const getFirstQuestion = Selector(() => document
    .getElementsByClassName('load-more-list')[0].rows[1]);

  await t.click(getFirstQuestion());

  expect((await t.select('#Title')).value).to.equal(forumTitle);

  await t
  .typeText('#Body', sampleTexts)
  .click(Selector(() => document.getElementsByName('submitPost')[0]));

  expect((await t.select('#Title')).value).to.equal(forumTitle);
});

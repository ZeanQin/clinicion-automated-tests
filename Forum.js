import {expect} from 'chai';
import {Selector} from 'testcafe';
import {ClientFunction} from 'testcafe';

const forumTitle = 'Automatically Generated Question By TestCafe';
const sampleTexts = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'; 

fixture ('Forum')
  .page('http://qa.clinicion.com')
  .beforeEach( async t => {
    await t
    .typeText('#UserName', 'me@zean.be')
    .typeText('#Password', 'qiN...4A')
    .click('.btn-login');

    expect((await t.select('#Title')).value).to
    .equal('Assess Team');

    await t.navigateTo('/Workspace/Questions');
    expect((await t.select('#Title')).value).to.equal('Discuss');
  });

test('Listing Forum', async t => {
  expect((await t.select('#Title')).value).to.equal('Discuss');
});

test('Adding New Question', async t => {
  await t.click('.action-bar-create');
  expect((await t.select('#Title')).value).to
  .equal('Create a new question');

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
  expect((await t.select('#Title')).value).to.equal('Discuss');

  const getFirstQuestion = Selector(() => document
    .getElementsByClassName('load-more-list')[0].rows[1]);

  await t.click(getFirstQuestion());

  expect((await t.select('#Title')).value).to.equal(forumTitle);

  await t
  .typeText('#Body', sampleTexts)
  .click(Selector(() => document.getElementsByName('submitPost')[0]));

  expect((await t.select('#Title')).value).to.equal(forumTitle);
});

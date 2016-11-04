import {expect} from 'chai';
import {Selector} from 'testcafe';

fixture ('Profile')
    .page('http://qa.clinicion.com')
    .beforeEach( async t => {
      await t
      .typeText('#UserName', 'testcafe@zean.be')
      .typeText('#Password', 'qiN...4A')
      .click('.btn-login');
    });

test('Updating Profile', async t => {
  // make sure we are on the landing page
  expect((await t.select('#Title')).value).to.equal('Assess Team');

  // navigate to profile page and check the state
  await t.click('.user-title a');
  expect((await t.select('.action-bar-update i span')).innerText).to
    .equal('Update');

  // click on the update button and check the page state 
  await t.click('.action-bar-update');
  expect((await t.select('.post-action i span')).innerText).to.equal('Save');
  expect((await t.select('#Title')).value).to.equal('Update Profile');

  // save changes and check the page state
  await t.click('.post-action i span');
  expect((await t.select('.action-bar-update i span')).innerText).to.equal('Update');
});

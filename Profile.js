import {querySelector} from './lib/Functions.js';
import {loginURL, userName, password} from './lib/LoginDetails.js';
import {expect} from 'chai';
import {Selector} from 'testcafe';

fixture('Profile')
    .page(loginURL)
    .beforeEach( async t => {
      await t
      .typeText('#UserName', userName)
      .typeText('#Password', password)
      .click('.btn-login');

      // go to the profile page
      await t.click(await querySelector('body > div.container > section > div.main-menu > section > div > a'));
    });

test('Updating Profile', async t => {
  // expect an update button
  expect((await querySelector('body > div.container > section > footer > ul > li:nth-child(2) > a > i > span')).innerText).to.equal('Update');

  await t.click(await querySelector('body > div.container > section > footer > ul > li:nth-child(2) > a'));
  await t.click(await querySelector('body > div.container > section > footer > ul > li:nth-child(1) > a'));
  
  // now we are back on the profile page. expect the update button again
  expect((await querySelector('body > div.container > section > footer > ul > li:nth-child(2) > a > i > span')).innerText).to.equal('Update');

});

test('Updating Settings', async t => {
  // expect the settings button
  expect((await querySelector('body > div.container > section > footer > ul > li:nth-child(3) > a > i > span')).innerText).to.equal('Settings');

  await t.click(await querySelector('body > div.container > section > footer > ul > li:nth-child(3) > a'));
  await t.click(await querySelector('body > div.container > section > footer > ul > li:nth-child(1) > a'));
  
  // now we are back on the profile page. expect the update button again
  expect((await querySelector('body > div.container > section > footer > ul > li:nth-child(3) > a > i > span')).innerText).to.equal('Settings');
});

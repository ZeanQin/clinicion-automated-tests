import {loginURL, userName, password} from './lib/LoginDetails.js';
import {querySelector} from './lib/Functions.js';
import {expect} from 'chai';
import {Selector} from 'testcafe';

fixture('Admin')
  .page(loginURL)
  .beforeEach( async t => {
    await t
    .typeText('#UserName', userName)
    .typeText('#Password', password)
    .click('.btn-login');
    
    // go to admin listing page
    await t.click(await querySelector('body > div.container > section > div.main-menu > section > ul > li:nth-child(16) > a'));
  });

test('Updating JobTypes', async t => {
  await t.navigateTo('/JobTypes/Index');
  var btn_txt = (await querySelector('body > div.container > section > footer > ul > li:nth-child(1) > a > i > span')).innerText;
  expect(btn_txt).to.equal('Update');

  await t.click('.action-bar-update');
  await t.click(await querySelector('body > div.container > section > footer > ul > li:nth-child(1) > a'));
  expect(btn_txt).to.equal('Update');
});

test('Updating Email Settings', async t => {
  await t.navigateTo('/Email/Settings/Edit');
  // check to make sure that we are on the edit page
  var btn_txt = (await querySelector('body > div.container > section > footer > ul > li:nth-child(1) > a > i > span')).innerText;
  expect(btn_txt).to.equal('Save');

  await t.click(await querySelector('body > div.container > section > footer > ul > li:nth-child(1) > a'));
  expect((await querySelector('#main-content > section:nth-child(2) > div > section > div.panel-heading')).innerText).to.equal('Fine');
});


test('Updating Email Templates', async t => {
  await t.navigateTo('/Email/Templates');
  var lnk = (await querySelector('#main-content > section:nth-child(2) > div > section > div.panel-body > table > tbody > tr:nth-child(1) > td:nth-child(1) > a'));
  await t.click(lnk);
  await t.click(await querySelector('body > div.container > section > footer > ul > li:nth-child(1) > a'));
  expect((await querySelector('#Title')).value).to.equal('Email Templates');
});

test('Updating Roles', async t => {
  await t.navigateTo('/Roles/Templates');
  await t.click(await querySelector('#main-content > section:nth-child(2) > div > section > div > table:nth-child(2) > tbody > tr:nth-child(3) > td > a'));
  await t.click(await querySelector('body > div.container > section > footer > ul > li:nth-child(1) > a'));
  expect((await querySelector('#main-content > section:nth-child(2) > div > section > header')).innerText).to.equal('Role Templates');
});

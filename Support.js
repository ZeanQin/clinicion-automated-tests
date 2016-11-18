import {querySelector} from './lib/Functions.js';
import {loginURL, userName, password} from './lib/LoginDetails.js';
import {expect} from 'chai';
import {Selector} from 'testcafe';

fixture('Support')
    .page(loginURL)
    .beforeEach( async t => {
      await t
      .typeText('#UserName', userName)
      .typeText('#Password', password)
      .click('.btn-login');
    });

test('Submitting Support Request', async t => {
  await t
    .click(await querySelector('body > div.container > section > div.main-menu > section > ul > li:nth-child(17) > a'))
    .typeText(await querySelector('#Body'), 'Auto generated question by testcafe, no need to respond.')
    .click(await querySelector('#support-modal > div.modal-dialog > div > form > div.modal-footer > ul > li:nth-child(2) > a'));
});

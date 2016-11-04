import {expect} from 'chai';
import {Selector} from 'testcafe';
import {ClientFunction} from 'testcafe';

const partialHosptialTitle = 'TestCafe Hosptial';
const sampleTexts = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'; 

fixture ('Forum')
  .page('http://qa.clinicion.com')
  .beforeEach( async t => {
    await t
    .typeText('#UserName', 'testcafe@zean.be')
    .typeText('#Password', 'qiN...4A')
    .click('.btn-login');

  expect((await t.select('#Title')).value).to
    .equal('Assess Team');
  
  await t.navigateTo('/Communities');
  expect((await t.select('#Title')).value).to.equal('Hospitals');
  });

test('Listing Hosptials', async t => {
  expect((await t.select('#Title')).value).to.equal('Hospitals');
});

test('Creating Hosptial', async t => {
  await t.click('.action-bar-create');
  expect((await t.select('#Title')).value).to.equal('Create a new Hospital');

  var hospitalNamePostFix = Math.random().toString(36).substr(2, 9);
  var hospitalName = partialHosptialTitle + ' - ' +  hospitalNamePostFix;
  var portalURL = hospitalNamePostFix + '.qa.clinicion.com';
  var emailSignature = 'Welcome to ' + hospitalName;
  var culture = ClientFunction(() => document
    .getElementById('Culture').selectedIndex=94);
  var colour = ClientFunction(() => document
    .getElementById('ColourClass').value='team-colours-01');

  await t
  .typeText('#Name', hospitalName)
  .typeText('#PortalUri', portalURL)
  .typeText('#EmailSignature', emailSignature);
  
  await culture();
  await colour();
 
  await t.click('.post-action'); 

  expect((await t.select('.panel-heading span')).innerText.trim()).to.equal(hospitalName);



});


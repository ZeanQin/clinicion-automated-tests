import {expect} from 'chai';
import {Selector} from 'testcafe';

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

  await Selector(() => document.getElementById('MembershipId').selectedIndex=1);
  await t.typeText('#Name', 'Automatically Generated Question By TestCafe');
  await t.typeText('#Description', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.');
  await t.click('.post-action');

  //expect((await t.select('#Title')).value).to
  //.equal('Automatically Generated Question By TestCafe');
});

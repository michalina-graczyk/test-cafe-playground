import { Selector } from 'testcafe'

const firstNameInput = 'input[name="first_name"]'
const lastNameInput = 'input[name="last_name"]'
const emailInput = 'input[name="email"]'
const commentTextarea = 'textarea[name="message"]'

const submitButton = 'input[type="submit"]'
const resetButton = 'input[type="reset"]'

const contactFormSuccessMessageHeader = '#contact_reply h1'
const errorPageBody = 'body'

const firstNameText = 'TestName'
const lastNameText = 'LastName'
const validEmailText = 'test@test.pl'
const invalidEmailText = 'invalid@'
const commentText = 'tralalalala'

fixture`Contact form`
  .page`http://webdriveruniversity.com/Contact-Us/contactus.html`

test('Fill all fields correctly', async t => {
  await t
    .typeText(firstNameInput, firstNameText)
    .typeText(lastNameInput, lastNameText)
    .typeText(emailInput, validEmailText)
    .typeText(commentTextarea, commentText)
    .click(submitButton)

  await t.expect(Selector(contactFormSuccessMessageHeader).textContent).contains('Thank You for your Message!')
})

test('Submit with empty fields', async t => {
  await t
    .click(submitButton)

  await t
    .expect(Selector(errorPageBody).textContent).contains('Error: all fields are required')
    .expect(Selector(errorPageBody).textContent).contains('Error: Invalid email address')
})

test('Submit with incorrect email', async t => {
  await t
    .typeText(firstNameInput, firstNameText)
    .typeText(lastNameInput, lastNameText)
    .typeText(emailInput, invalidEmailText)
    .typeText(commentTextarea, commentText)
    .click(submitButton)

  await t.expect(Selector(errorPageBody).textContent).contains('Error: Invalid email address')
})

test('Reset fields', async t => {
  await t
    .typeText(firstNameInput, firstNameText)
    .typeText(lastNameInput, lastNameText)
    .typeText(emailInput, validEmailText)
    .typeText(commentTextarea, commentText)
    .click(resetButton)

  await t
    .expect(Selector(firstNameInput).textContent).eql('')
    .expect(Selector(lastNameInput).textContent).eql('')
    .expect(Selector(emailInput).textContent).eql('')
    .expect(Selector(commentTextarea).textContent).eql('')
})
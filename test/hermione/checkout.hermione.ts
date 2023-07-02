describe('Тестирование чекаута', () => {
  afterEach(function()  {
    this.browser.mockClearAll()
    this.browser.execute(() => {
      window.localStorage.clear()
    })
    this.browser.refresh()
  })
  beforeEach(async function () {
    const productsMock = await this.browser.mock('**/products')
    productsMock.respond([
      {
        id: 0,
        name: 'Macbook Air M2 (2023)',
        price: 170000,
        color: 'Space Grey',
        material: 'Aluminum',
        description: 'Dorogo, ochen\''
      },
      {
        id: 1,
        name: 'Macbook Pro M2 (2023)',
        price: 250000,
        color: 'Silver',
        material: 'Aluminum',
        description: 'Esche dorozhe'
      },
      {
        id: 2,
        name: 'IPhone 7',
        price: 20000,
        color: 'Space Grey',
        material: 'Aluminum',
        description: 'IProne 7'
      },
      {
        id: 3,
        name: 'IPhone 12',
        price: 100000,
        color: 'Black',
        material: 'Metal',
        description: 'IPhone 12'
      }
    ])
    const productMock1 = await this.browser.mock('**/products/0')
    productMock1.respond({
      id: 0,
      name: 'Macbook Air M2 (2023)',
      price: 170000,
      color: 'Space Grey',
      material: 'Aluminum',
      description: 'Dorogo, ochen\''
    })
    const productMock2 = await this.browser.mock('**/products/1')
    productMock2.respond({
      id: 1,
      name: 'Macbook Pro M2 (2023)',
      price: 250000,
      color: 'Silver',
      material: 'Aluminum',
      description: 'Esche dorozhe'
    },)
  })
  it('Корректно выглядит чекаут', async function () {
    const checkout = await this.browser.mock('**/checkout', {method: 'POST'})
    checkout.respond({
      id: 1
    })
    const [page] = await (await this.browser.getPuppeteer()).pages()
    await this.browser.setWindowSize(1920, 1080)
    await this.browser.url('http://localhost:3000/hw/store/catalog/0')
    await page.waitForSelector('.ProductDetails-AddToCart')
    await page.click('.ProductDetails-AddToCart')
    await this.browser.url('http://localhost:3000/hw/store/cart')
    await page.type('#f-name', 'name')
    await page.type('#f-phone', '+79990118888')
    await page.type('#f-address', 'address')
    await page.click('.Form-Submit')
    await this.browser.assertView('plane', '.Cart-SuccessMessage', {ignoreElements: '.Cart-Number'})
    await checkout.restore()
  });
  it('Корректно выводится номер', async function () {
    const [page] = await (await this.browser.getPuppeteer()).pages()
    await this.browser.setWindowSize(1920, 1080)
    await page.goto('http://localhost:3000/hw/store/catalog/0')
    await page.waitForSelector('.ProductDetails-AddToCart')
    await page.click('.ProductDetails-AddToCart')
    await this.browser.url('http://localhost:3000/hw/store/cart')
    await page.type('#f-name', 'name')
    await page.type('#f-phone', '+79990118888')
    await page.type('#f-address', 'address')
    await page.click('.Form-Submit')
    await page.waitForSelector('.Cart-Number')
    const number = await page.$('.Cart-Number')
    expect(await number.evaluate(el => el.textContent.length)).toEqual(1)
  });
})
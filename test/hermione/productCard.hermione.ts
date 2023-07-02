describe('Тестирование страниц товара', function () {
  afterEach(async function() {
    await this.browser.mockClearAll()
  })
  beforeEach(async function() {
    const productMock = await this.browser.mock('**/products/0')
    productMock.respond({
      id: 0,
      name: 'Mock Product 1',
      price: 1000,
      color: 'black',
      material: 'silver',
      description: 'Mock 1'
    },)
  })
  it('Корректно выводится имя товара', async function () {
    await this.browser.setWindowSize(1920, 1080)
    await this.browser.url('http://localhost:3000/hw/store/catalog/0')
    await this.browser.assertView('plain', '.Application > div', {
      ignoreElements: [
        '.Image',
        '.ProductDetails-Description',
        '.ProductDetails-Price',
        '.ProductDetails-AddToCart',
        'dl'
      ]
    })
  });
  it('Корректно выводится описание товара', async function () {
    await this.browser.setWindowSize(1920, 1080)
    await this.browser.url('http://localhost:3000/hw/store/catalog/0')
    await this.browser.assertView('plain', '.Application > div', {
      ignoreElements: [
        '.Image',
        '.ProductDetails-Name',
        '.ProductDetails-Price',
        '.ProductDetails-AddToCart',
        'dl'
      ]
    })
  });
  it('Корректно выводится цена товара', async function () {
    await this.browser.setWindowSize(1920, 1080)
    await this.browser.url('http://localhost:3000/hw/store/catalog/0')
    await this.browser.assertView('plain', '.Application > div', {
      ignoreElements: [
        '.Image',
        '.ProductDetails-Name',
        '.ProductDetails-Description',
        '.ProductDetails-AddToCart',
        'dl'
      ]
    })
  });
  it('Корректно выводится кнопка добавления в корзину товара', async function () {
    await this.browser.setWindowSize(1920, 1080)
    await this.browser.url('http://localhost:3000/hw/store/catalog/0')
    await this.browser.assertView('plain', '.Application > div', {
      ignoreElements: [
        '.Image',
        '.ProductDetails-Name',
        '.ProductDetails-Price',
        '.ProductDetails-Description',
        'dl'
      ]
    })
  });
  it('В списке продуктов отображается "Item in cart"', async function () {
    await this.browser.setWindowSize(1920, 1080)
    await this.browser.url('http://localhost:3000/hw/store/catalog/0')
    const [page] = await (await this.browser.getPuppeteer()).pages()
    await page.waitForSelector('.ProductDetails-AddToCart')
    await page.click('.ProductDetails-AddToCart')
    await this.browser.url('http://localhost:3000/hw/store/catalog')
    expect(await page.$('[data-testid="0"] .CartBadge')).not.toBeNull()
  });
  it('Корректно отображается "Item in cart"', async function () {
    await this.browser.setWindowSize(1920, 1080)
    await this.browser.url('http://localhost:3000/hw/store/catalog/0')
    const [page] = await (await this.browser.getPuppeteer()).pages()
    await page.waitForSelector('.ProductDetails-AddToCart')
    await page.click('.ProductDetails-AddToCart')
    await this.browser.url('http://localhost:3000/hw/store/catalog')
    await this.browser.assertView('plain', '.ProductItem', {ignoreElements: [
        '.card-body *:not(.CartBadge)'
      ]})
  });
});
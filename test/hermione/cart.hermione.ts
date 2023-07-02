describe('Тестирование отображений данных корзины (рухнувшие тесты необходимо запустить вручную)', () => {
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
  it('При добавлении одного продукта в хедере количество равно 1', async function () {
    await this.browser.setWindowSize(1920, 1080)
    const [page] = await (await this.browser.getPuppeteer()).pages()
    await this.browser.url('http://localhost:3000/hw/store/catalog/0')
    await page.waitForSelector('.ProductDetails-AddToCart')
    await page.click('.ProductDetails-AddToCart')
    await page.waitForSelector('[href^="/hw/store/cart"]')
    const cartLink = await page.$('[href^="/hw/store/cart"]')
    expect(await cartLink.evaluate(el => el.textContent)).toEqual('Cart (1)')
  });
  it('При добавлении двух разных продуктов в хедере количество равно 2', async function () {
    const [page] = await (await this.browser.getPuppeteer()).pages()
    await this.browser.setWindowSize(1920, 1080)
    await page.goto(`http://localhost:3000/hw/store/catalog/0`)
    await page.waitForSelector('.Product button')
    await page.click('.Product button')
    await page.goto(`http://localhost:3000/hw/store/catalog/1`)
    await page.waitForSelector('.Product button')
    await page.click('.Product button')
    await page.waitForSelector('[href^="/hw/store/cart"]')
    const cartLink = await page.$('[href^="/hw/store/cart"]')
    expect(await cartLink.evaluate(el => el.textContent)).toEqual('Cart (2)')
  });
  it('Корректный вид пустой корзины', async function () {
    const [page] = await (await this.browser.getPuppeteer()).pages()
    await this.browser.setWindowSize(1920, 1080)
    await this.browser.url(`http://localhost:3000/hw/store/cart`)
    await page.waitForSelector('.Application > div')
    await this.browser.assertView('plane', '.Application > div')
  });
  it('Форма по дефолту коректна', async function () {
    const [page] = await (await this.browser.getPuppeteer()).pages()
    await this.browser.setWindowSize(1920, 1080)
    await this.browser.url(`http://localhost:3000/hw/store/catalog/0`)
    await page.waitForSelector('.ProductDetails-AddToCart')
    await page.click('.ProductDetails-AddToCart')
    await this.browser.url(`http://localhost:3000/hw/store/cart`)
    await page.waitForSelector('.Cart > .row:nth-child(3)')
    await this.browser.assertView('plane', '.Cart > .row:nth-child(3)')
  });
  it('Форма выводит ошибки при отправке пустой формы', async function () {
    const [page] = await (await this.browser.getPuppeteer()).pages()
    await this.browser.setWindowSize(1920, 1080)
    await this.browser.url(`http://localhost:3000/hw/store/catalog/0`)
    await page.waitForSelector('.ProductDetails-AddToCart')
    await page.click('.ProductDetails-AddToCart')
    await this.browser.url(`http://localhost:3000/hw/store/cart`)
    await page.waitForSelector('.Form-Submit')
    await page.click('.Form-Submit')
    await page.waitForTimeout(200)
    await this.browser.assertView('plane', '.Cart > .row:nth-child(3)')
  });
  it('Инпут телефонного номера выдает ошибку при вводе неправильного номера', async function () {
    const [page] = await (await this.browser.getPuppeteer()).pages()
    await this.browser.setWindowSize(1920, 1080)
    await this.browser.url(`http://localhost:3000/hw/store/catalog/0`)
    await page.waitForSelector('.ProductDetails-AddToCart')
    await page.click('.ProductDetails-AddToCart')
    await this.browser.url(`http://localhost:3000/hw/store/cart`)
    await page.waitForSelector('.Cart > .row:nth-child(3)')
    await page.type('#f-phone', 'bad tel')
    await page.click('.Form-Submit')
    await page.waitForTimeout(200)
    await this.browser.assertView('plane', '.Form > div:nth-child(2)')
  });
  it('Инпут телефонного номера НЕ выдает ошибку при вводе неправильного номера', async function () {
    const [page] = await (await this.browser.getPuppeteer()).pages()
    await this.browser.setWindowSize(1920, 1080)
    await this.browser.url(`http://localhost:3000/hw/store/catalog/0`)
    await page.waitForSelector('.ProductDetails-AddToCart')
    await page.click('.ProductDetails-AddToCart')
    await this.browser.url(`http://localhost:3000/hw/store/cart`)
    await page.waitForSelector('.Cart > .row:nth-child(3)')
    await page.type('#f-phone', '+78005553535')
    await page.click('.Form-Submit')
    await page.waitForTimeout(200)
    await this.browser.assertView('plane', '.Form > div:nth-child(2)')
  });
  it('При обновлении страницы корзина не обновляется', async function () {
    await this.browser.setWindowSize(1920, 1080)
    const [page] = await (await this.browser.getPuppeteer()).pages()
    await this.browser.url('http://localhost:3000/hw/store/catalog/0')
    await page.waitForSelector('.ProductDetails-AddToCart')
    await page.click('.ProductDetails-AddToCart')
    await this.browser.url('http://localhost:3000/hw/store/catalog/1')
    await page.waitForSelector('.ProductDetails-AddToCart')
    await page.click('.ProductDetails-AddToCart')
    await this.browser.url('http://localhost:3000/hw/store/cart')
    await page.reload()
    await page.waitForSelector('[href^="/hw/store/cart"]')
    await this.browser.assertView('plain', 'body', {ignoreElements: 'nav.navbar'})
  });
  it('Добавленные товары отображаются в корзине', async function () {
    await this.browser.setWindowSize(1920, 1080)
    const [page] = await (await this.browser.getPuppeteer()).pages()
    await this.browser.url('http://localhost:3000/hw/store/catalog/0')
    await page.waitForSelector('.ProductDetails-AddToCart')
    await page.click('.ProductDetails-AddToCart')
    await this.browser.url('http://localhost:3000/hw/store/catalog/1')
    await page.waitForSelector('.ProductDetails-AddToCart')
    await page.click('.ProductDetails-AddToCart')
    await this.browser.url('http://localhost:3000/hw/store/cart')
    await this.browser.assertView('rowOne', 'tbody > tr:first-child', {ignoreElements: ['td', 'th']})
    await this.browser.assertView('rowTwo', 'tbody > tr:last-child', {ignoreElements: ['td', 'th']})
  });
  it('Отображается индекс товара', async function () {
    await this.browser.setWindowSize(1920, 1080)
    const [page] = await (await this.browser.getPuppeteer()).pages()
    await this.browser.url('http://localhost:3000/hw/store/catalog/0')
    await page.waitForSelector('.ProductDetails-AddToCart')
    await page.click('.ProductDetails-AddToCart')
    await this.browser.url('http://localhost:3000/hw/store/cart')
    expect(await this.browser.$('.Cart-Index')).not.toBeNull()
  });
  it('Отображается название товара', async function () {
    await this.browser.setWindowSize(1920, 1080)
    const [page] = await (await this.browser.getPuppeteer()).pages()
    await this.browser.url('http://localhost:3000/hw/store/catalog/0')
    await page.waitForSelector('.ProductDetails-AddToCart')
    await page.click('.ProductDetails-AddToCart')
    await this.browser.url('http://localhost:3000/hw/store/cart')
    expect(await this.browser.$('.Cart-Name')).not.toBeNull()
  });
  it('Отображается количество товара', async function () {
    await this.browser.setWindowSize(1920, 1080)
    const [page] = await (await this.browser.getPuppeteer()).pages()
    await this.browser.url('http://localhost:3000/hw/store/catalog/0')
    await page.waitForSelector('.ProductDetails-AddToCart')
    await page.click('.ProductDetails-AddToCart')
    await this.browser.url('http://localhost:3000/hw/store/cart')
    expect(await this.browser.$('.Cart-Count')).not.toBeNull()
  });
  it('Отображается общая сумма товара', async function () {
    await this.browser.setWindowSize(1920, 1080)
    const [page] = await (await this.browser.getPuppeteer()).pages()
    await this.browser.url('http://localhost:3000/hw/store/catalog/0')
    await page.waitForSelector('.ProductDetails-AddToCart')
    await page.click('.ProductDetails-AddToCart')
    await this.browser.url('http://localhost:3000/hw/store/cart')
    expect(await this.browser.$('.Cart-Total')).not.toBeNull()
  });
  it('Отображается общая сумма заказа', async function () {
    await this.browser.setWindowSize(1920, 1080)
    const [page] = await (await this.browser.getPuppeteer()).pages()
    await this.browser.url('http://localhost:3000/hw/store/catalog/0')
    await page.waitForSelector('.ProductDetails-AddToCart')
    await page.click('.ProductDetails-AddToCart')
    await this.browser.url('http://localhost:3000/hw/store/catalog/1')
    await page.waitForSelector('.ProductDetails-AddToCart')
    await page.click('.ProductDetails-AddToCart')
    await this.browser.url('http://localhost:3000/hw/store/cart')
    await this.browser.assertView('plain', '.Cart-OrderPrice')
  });
  it('Отображается кнопка очистки корзины', async function () {
    await this.browser.setWindowSize(1920, 1080)
    const [page] = await (await this.browser.getPuppeteer()).pages()
    await this.browser.url('http://localhost:3000/hw/store/catalog/0')
    await page.waitForSelector('.ProductDetails-AddToCart')
    await page.click('.ProductDetails-AddToCart')
    await this.browser.url('http://localhost:3000/hw/store/cart')
    expect(await this.browser.$('.Cart-Clear')).not.toBeNull()
  });
  it('Корзина очищается после нажатия кнопки', async function () {
    await this.browser.setWindowSize(1920, 1080)
    const [page] = await (await this.browser.getPuppeteer()).pages()
    await this.browser.url('http://localhost:3000/hw/store/catalog/0')
    await page.waitForSelector('.ProductDetails-AddToCart')
    await page.click('.ProductDetails-AddToCart')
    await this.browser.url('http://localhost:3000/hw/store/cart')
    await page.waitForSelector('.Cart-Clear')
    await page.click('.Cart-Clear')
    await this.browser.assertView('plain', '.Application > div')
  });
  it('Отображается корректная ссылка на католог в корзине', async function () {
    await this.browser.setWindowSize(1920, 1080)
    const [page] = await (await this.browser.getPuppeteer()).pages()
    await this.browser.url('http://localhost:3000/hw/store/cart')
    const link = await page.$('.Cart a')
    expect(await link.evaluate(el => el.href)).toEqual('http://localhost:3000/hw/store/catalog')
  });
  it('Добавленный продукт увелич количество при повторном добавлении', async function () {
    await this.browser.setWindowSize(1920, 1080)
    const [page] = await (await this.browser.getPuppeteer()).pages()
    await this.browser.url('http://localhost:3000/hw/store/catalog/0')
    await page.waitForSelector('.ProductDetails-AddToCart')
    await page.click('.ProductDetails-AddToCart')
    await page.click('.ProductDetails-AddToCart')
    await this.browser.url('http://localhost:3000/hw/store/cart')
    await page.waitForSelector('.Cart-Count')
    expect(await (await this.browser.$('.Cart-Count')).getText()).toEqual('2')
  });
})